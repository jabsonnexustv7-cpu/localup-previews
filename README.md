# LocalUp Previews

Infraestrutura compartilhada para previews de prospecção da LocalUp.

Cada preview futuro deve seguir a convenção documentada em [`docs/README.md`](docs/README.md). Os arquivos internos ficam em `previews/<slug>/design/` e no manifesto `preview.json`; somente o conteúdo de `previews/<slug>/public/` entra no artefato publicado.

## Build local

```bash
npm ci
npm run build
```

O build recria `dist/`, gera uma raiz genérica sem listagem de prospects, bloqueia indexação e publica cada site em `dist/<slug>/`.

