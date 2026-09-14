import {
  copyFile,
  lstat,
  mkdir,
  readdir,
  readFile,
  rm,
  writeFile,
} from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, '..');
const previewsDirectory = path.join(repositoryRoot, 'previews');
const distributionDirectory = path.join(repositoryRoot, 'dist');
const cnamePath = path.join(repositoryRoot, 'CNAME');

const slugPattern = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const reservedSlugs = new Set(['cname']);
const previewStatuses = new Set(['prospect', 'contacted', 'won', 'lost', 'promoted', 'archived']);
const internalNames = new Set([
  '.git',
  'design',
  'internal',
  'preview.json',
  'prompts',
  'research',
]);

const rootPage = `<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex,nofollow,noarchive">
  <title>LocalUp — Ambiente de demonstração</title>
  <style>
    :root { color-scheme: light; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; }
    body { min-height: 100vh; margin: 0; display: grid; place-items: center; background: #f5f7f9; color: #0b2f58; }
    main { max-width: 38rem; padding: 2rem; text-align: center; }
    p { color: #486174; line-height: 1.6; }
  </style>
</head>
<body>
  <main>
    <h1>Ambiente de demonstração LocalUp</h1>
    <p>Os previews são acessados somente por seus links individuais.</p>
  </main>
</body>
</html>
`;

function fail(message) {
  throw new Error(`Preview build: ${message}`);
}

async function requireFile(filePath, label) {
  let stats;
  try {
    stats = await lstat(filePath);
  } catch {
    fail(`${label} não encontrado: ${path.relative(repositoryRoot, filePath)}`);
  }

  if (stats.isSymbolicLink() || !stats.isFile()) {
    fail(`${label} deve ser um arquivo regular: ${path.relative(repositoryRoot, filePath)}`);
  }
}

async function requireDirectory(directoryPath, label) {
  let stats;
  try {
    stats = await lstat(directoryPath);
  } catch {
    fail(`${label} não encontrado: ${path.relative(repositoryRoot, directoryPath)}`);
  }

  if (stats.isSymbolicLink() || !stats.isDirectory()) {
    fail(`${label} deve ser uma pasta regular: ${path.relative(repositoryRoot, directoryPath)}`);
  }
}

async function readJson(filePath, label) {
  await requireFile(filePath, label);
  try {
    return JSON.parse(await readFile(filePath, 'utf8'));
  } catch (error) {
    fail(`${label} contém JSON inválido: ${error.message}`);
  }
}

function requireRobotsMeta(html, slug) {
  const robotsMeta = (html.match(/<meta\b[^>]*>/gi) ?? []).find((tag) =>
    /\bname\s*=\s*["']robots["']/i.test(tag),
  );
  const content = robotsMeta?.match(/\bcontent\s*=\s*["']([^"']*)["']/i)?.[1] ?? '';
  const directives = new Set(content.toLowerCase().split(',').map((item) => item.trim()));

  for (const directive of ['noindex', 'nofollow', 'noarchive']) {
    if (!directives.has(directive)) {
      fail(`${slug}/public/index.html precisa declarar robots ${directive}.`);
    }
  }
}

function validateManifest(manifest, slug) {
  if (!manifest || typeof manifest !== 'object' || Array.isArray(manifest)) {
    fail(`${slug}/preview.json deve conter um objeto JSON.`);
  }
  if (manifest.slug !== slug) {
    fail(`${slug}/preview.json deve declarar slug "${slug}".`);
  }
  for (const property of ['company_name', 'status', 'created_at']) {
    if (typeof manifest[property] !== 'string' || manifest[property].trim() === '') {
      fail(`${slug}/preview.json precisa do campo textual "${property}".`);
    }
  }
  if (!Array.isArray(manifest.sources)) {
    fail(`${slug}/preview.json precisa do array "sources".`);
  }
  if (!previewStatuses.has(manifest.status)) {
    fail(`${slug}/preview.json contém status inválido.`);
  }
  for (const [index, source] of manifest.sources.entries()) {
    if (!source || typeof source !== 'object' || Array.isArray(source)) {
      fail(`${slug}/preview.json contém uma fonte inválida na posição ${index}.`);
    }
    for (const property of ['type', 'url']) {
      if (typeof source[property] !== 'string' || source[property].trim() === '') {
        fail(`${slug}/preview.json: a fonte ${index} precisa do campo textual "${property}".`);
      }
    }
  }
}

function validateBrandTokens(tokens, slug) {
  if (!tokens || typeof tokens !== 'object' || Array.isArray(tokens)) {
    fail(`${slug}/design/brand-tokens.json deve conter um objeto JSON.`);
  }
  for (const property of ['brand', 'colors', 'typography', 'visual_language']) {
    if (!tokens[property] || typeof tokens[property] !== 'object' || Array.isArray(tokens[property])) {
      fail(`${slug}/design/brand-tokens.json precisa do objeto "${property}".`);
    }
  }
  for (const property of ['name', 'segment']) {
    if (typeof tokens.brand[property] !== 'string' || tokens.brand[property].trim() === '') {
      fail(`${slug}/design/brand-tokens.json: brand precisa do campo textual "${property}".`);
    }
  }
  for (const property of ['primary', 'secondary', 'accent', 'background', 'surface', 'text', 'muted']) {
    if (typeof tokens.colors[property] !== 'string' || tokens.colors[property].trim() === '') {
      fail(`${slug}/design/brand-tokens.json: colors precisa do campo textual "${property}".`);
    }
  }
  for (const property of ['display', 'body']) {
    if (typeof tokens.typography[property] !== 'string' || tokens.typography[property].trim() === '') {
      fail(`${slug}/design/brand-tokens.json: typography precisa do campo textual "${property}".`);
    }
  }
}

async function validatePreview(entry, seenSlugs) {
  const slug = entry.name;
  const normalizedSlug = slug.toLowerCase();

  if (!slugPattern.test(slug)) {
    fail(`slug inválido "${slug}"; use letras minúsculas, números e hífens.`);
  }
  if (reservedSlugs.has(normalizedSlug) || seenSlugs.has(normalizedSlug)) {
    fail(`colisão de slug detectada: "${slug}".`);
  }
  seenSlugs.add(normalizedSlug);

  const previewRoot = path.join(previewsDirectory, slug);
  const manifestPath = path.join(previewRoot, 'preview.json');
  const designDirectory = path.join(previewRoot, 'design');
  const briefPath = path.join(designDirectory, 'design-brief.md');
  const tokensPath = path.join(designDirectory, 'brand-tokens.json');
  const publicDirectory = path.join(previewRoot, 'public');
  const indexPath = path.join(publicDirectory, 'index.html');

  await requireDirectory(designDirectory, `${slug}/design`);
  await requireDirectory(publicDirectory, `${slug}/public`);
  await requireFile(briefPath, `${slug}/design/design-brief.md`);
  await requireFile(indexPath, `${slug}/public/index.html`);

  const manifest = await readJson(manifestPath, `${slug}/preview.json`);
  const tokens = await readJson(tokensPath, `${slug}/design/brand-tokens.json`);
  validateManifest(manifest, slug);
  validateBrandTokens(tokens, slug);

  const brief = await readFile(briefPath, 'utf8');
  if (brief.trim() === '') {
    fail(`${slug}/design/design-brief.md não pode estar vazio.`);
  }

  const html = await readFile(indexPath, 'utf8');
  requireRobotsMeta(html, slug);
  if (!/\bdata-localup-preview-disclosure(?:\s|=|>)/i.test(html)) {
    fail(`${slug}/public/index.html precisa da divulgação marcada com data-localup-preview-disclosure.`);
  }

  return { slug, publicDirectory };
}

function isInternalName(name) {
  const normalized = name.toLowerCase();
  const stem = path.parse(normalized).name;
  return internalNames.has(normalized) || internalNames.has(stem) || normalized.includes('prompt');
}

async function copyPublicTree(sourceDirectory, targetDirectory, relativeParts = []) {
  await mkdir(targetDirectory, { recursive: true });
  const entries = await readdir(sourceDirectory, { withFileTypes: true });

  for (const entry of entries) {
    if (isInternalName(entry.name)) {
      fail(`arquivo interno dentro de public/: ${[...relativeParts, entry.name].join('/')}`);
    }
    if (entry.isSymbolicLink()) {
      fail(`links simbólicos não são permitidos em public/: ${[...relativeParts, entry.name].join('/')}`);
    }

    const sourcePath = path.join(sourceDirectory, entry.name);
    const targetPath = path.join(targetDirectory, entry.name);

    if (entry.isDirectory()) {
      await copyPublicTree(sourcePath, targetPath, [...relativeParts, entry.name]);
    } else if (entry.isFile()) {
      await copyFile(sourcePath, targetPath);
    } else {
      fail(`tipo de arquivo não suportado em public/: ${[...relativeParts, entry.name].join('/')}`);
    }
  }
}

async function main() {
  await requireDirectory(previewsDirectory, 'previews');
  await requireFile(cnamePath, 'CNAME');

  const cname = (await readFile(cnamePath, 'utf8')).trim();
  if (cname !== 'preview.localup.net.br') {
    fail('CNAME deve conter exatamente preview.localup.net.br.');
  }

  const entries = await readdir(previewsDirectory, { withFileTypes: true });
  const seenSlugs = new Set();
  const previews = [];

  for (const entry of entries) {
    if (entry.name === '.gitkeep') continue;
    if (!entry.isDirectory() || entry.isSymbolicLink()) {
      fail(`item inesperado em previews/: ${entry.name}`);
    }
    previews.push(await validatePreview(entry, seenSlugs));
  }

  await rm(distributionDirectory, { recursive: true, force: true });
  await mkdir(distributionDirectory, { recursive: true });
  await writeFile(path.join(distributionDirectory, 'index.html'), rootPage, 'utf8');
  await writeFile(path.join(distributionDirectory, 'robots.txt'), 'User-agent: *\nDisallow: /\n', 'utf8');
  await copyFile(cnamePath, path.join(distributionDirectory, 'CNAME'));

  for (const preview of previews) {
    await copyPublicTree(
      preview.publicDirectory,
      path.join(distributionDirectory, preview.slug),
      [preview.slug],
    );
  }

  console.log(`Built ${previews.length} preview(s) into dist/.`);
}

main().catch((error) => {
  console.error(error.message);
  process.exitCode = 1;
});
