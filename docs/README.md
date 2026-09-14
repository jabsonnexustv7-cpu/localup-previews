# Operação dos previews LocalUp

Este repositório hospeda previews de prospecção. Ele não hospeda o site institucional da LocalUp nem sites de produção de clientes.

## Estrutura de um preview

```text
previews/<slug>/
├── preview.json
├── design/
│   ├── design-brief.md
│   └── brand-tokens.json
└── public/
    ├── index.html
    ├── styles.css
    ├── script.js
    └── assets/
```

`preview.json` e `design/` são documentos internos. Somente `public/` é copiado para `dist/<slug>/` e enviado ao GitHub Pages.

## Gate PREVIEW

1. Pesquisar apenas fontes públicas e oficiais da empresa.
2. Registrar as fontes e fatos no `preview.json`.
3. Criar `design/design-brief.md` e `design/brand-tokens.json` antes do HTML.
4. Traduzir a identidade observada para uma direção web própria; não reutilizar automaticamente a estética da LocalUp.
5. Não inventar avaliações, números, resultados, credenciais ou dados comerciais.
6. Manter leads e analytics desativados.
7. Incluir no HTML `<meta name="robots" content="noindex,nofollow,noarchive">`.
8. Incluir uma divulgação discreta marcada com `data-localup-preview-disclosure`.
9. Executar Sophistication Pass, Visual QA e QA responsivo antes de publicar.

O build também gera `robots.txt` com bloqueio global. A página raiz é genérica e nunca lista prospects.

## Manifesto mínimo

O `preview.json` deve conter `slug`, `company_name`, `status`, `sources` e `created_at`. O slug usa somente letras minúsculas, números e hífens e precisa coincidir com o nome da pasta.

## Promoção para PRODUCTION

Quando um preview for aprovado, ele se torna a fonte de verdade visual. Crie um repositório próprio de produção, carregue a implementação pública e os artefatos de design aprovados, valide textos/imagens/dados com materiais oficiais e somente então retire `noindex`, configure domínio, SEO, Analytics/Search Console e integração de leads autorizada. Não reconstrua o projeto do zero sem uma razão explícita.

