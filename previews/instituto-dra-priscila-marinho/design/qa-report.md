# PREVIEW — Sophistication Pass e Visual QA

## Resultado
APROVADO para publicação como demonstração de prospecção em 15/09/2026.
Direção sustentada pelo logo enviado e pelas áreas da bio; fidelidade visual ao feed completo permanece não avaliável.

## Sophistication Pass executado
- Preservado o logo original sem redesenhar ou ampliar além de 150px; faixas cinza do screenshot ocultadas apenas pelo recorte de layout.
- Revistos ritmo de espaços, largura de leitura e equilíbrio entre hero preto e seções marfim.
- Áreas em três linhas editoriais, sem cards, ícones, sombras ou gradientes.
- Contorno oval discreto inspirado na circularidade do monograma; decorativo e oculto para leitores de tela.
- Corrigida rolagem horizontal no tablet causada pela extensão de overflow do contorno rotacionado. A contenção fica no próprio elemento, sem esconder overflow global para mascarar problemas.
- Corrigido espaçamento das frases quando quebras de linha são ocultadas no celular.
- Refinada copy institucional para linguagem direta; sem procedimentos inferidos, superlativos, promessas ou credenciais.
- Hero mobile centrado na tipografia; inscrição ornamental removida em telas pequenas para preservar clareza.

## Visual QA manual
Capturas integrais de desktop 1440px e mobile 390px renderizadas em Microsoft Edge headless e inspecionadas visualmente.
- Identidade: preto/dourado, logo real e tipografia clássica conectam a página ao material fornecido.
- Reconhecimento do Instagram: conteúdo confirmado pela bio; estética fundamentada no logo. Não afirmar análise de fotografia ou cores recorrentes do feed.
- Hero: hierarquia clara do nome, mensagem editorial e áreas; sem mockup ou foto substituta.
- Tipografia: duas famílias locais, itálico pontual, contraste de escala deliberado.
- Composição: seções alternadas com estrutura variada, filetes discretos, sem repetição de containers.
- Mobile: títulos legíveis, margens consistentes, áreas sem cards; menu expansível.
- Personalização: nome/assinatura, marca original e geometria circular derivada do monograma. Uma marca de outra paleta/linguagem visual exigiria nova direção. Limite: sem fotos do instituto, a diferenciação fotográfica não é possível.
- Apresentação comercial: concluída e publicável como primeira proposta; produção depende de validação factual e assets melhores.

## QA técnico e responsivo
Microsoft Edge 153.0.4234.32, automatizado com Playwright.
Larguras testadas: 320, 390, 540, 768, 1024 e 1440px.
- Sem rolagem horizontal em todas as larguras.
- Zero imagens quebradas, erros de console, erros JavaScript ou respostas locais >=400 no carregamento.
- Fontes locais carregadas e um único h1.
- Links internos apontam para IDs existentes.
- Menu mobile abre/fecha, fecha após navegação e responde a Escape devolvendo foco ao botão.
- Navegação permanece disponível com JavaScript desativado.
- Preferência de movimento reduzido respeitada.
- Foco de teclado visível, skip link, marca/links rotulados; contorno decorativo fora da árvore acessível.
- CTA principal aponta para https://localup.net.br/; destino retornou HTTP 200 e título institucional correto.
- Meta robots noindex,nofollow,noarchive; disclosure LocalUp presente e legível.
- Zero formulários, analytics ou integrações de leads.
- Manifesto e design ausentes de dist e retornam 404 no servidor do artefato.
- Raiz genérica não contém slug nem listagem; robots.txt contém Disallow: /.

## Performance e integridade
- HTML/CSS/JS estáticos, sem framework e sem dependências no navegador.
- Três arquivos WOFF2 locais (aproximadamente 86KB), logo 22KB; fontes críticas preloaded.
- Logo possui dimensões explícitas; imagem abaixo da dobra lazy-loaded.
- Links externos usam noopener/noreferrer e aviso acessível de nova aba.
- Fontes obtidas de Google Fonts; licenças SIL OFL preservadas em assets.
- Revisão de conteúdo/diff: sem números, depoimentos, resultados, certificados, endereço ou contatos não confirmados; sem segredos.
- Build existente aprovado: somente public/ entra no artefato.

## Evidência local
Capturas e resultados automatizados: pasta temporária localup-priscila-qa (fora do repositório e da publicação).

## Limites e validação antes de produção
- Logo disponível em apenas 150×150; obter vetor/original.
- Sem fotos institucionais ou prints suficientes para avaliar o feed completo.
- Nome de tratamentos, formação/registro, cidade, contatos, horários, equipe e copy precisam de confirmação.
- Fotos de procedimentos sem descrição não usadas para inferência de tratamentos/resultados.

---

## Histórico adicional — refinamento premium (15/09/2026)

Resultado: APROVADO. O histórico acima foi preservado. Escopo: index.html, styles.css, script.js e assets/grain.svg em public/, mais esta atualização de relatório expressamente solicitada. Brief, tokens, manifesto, build e infraestrutura permanecem iguais.

### Refinamentos e Sophistication Pass
- Entrada única por IntersectionObserver: fade e translateY de 14px no hero, nos títulos de seção e nas linhas de áreas. Sequência em intervalos de 90ms; transições de 650ms com curva suave. Sem bibliotecas de animação.
- Contorno estático substituído por SVG de linha fina, derivado do círculo do monograma, com dois arcos e pequenos detalhes simétricos. Traçado de 1,8s, com atrasos de 180/300ms; termina e permanece estático. Sem rotação contínua, foto, mockup ou redesenho do logo. Gráfico decorativo aria-hidden/focusable=false.
- Hover das áreas com tinta dourada a 3,5% e deslocamento de 4px do número, restritos a mouse/ponteiro preciso. Linhas não se tornam botões fictícios.
- Underline dos text-links se expande da esquerda; setas têm deslocamento de 2px. CTA ganha alteração discreta de cor/borda e elevação de 2px. Foco visível mantido.
- Grain SVG tileável 128×128, opacidade de 3,5% dentro do próprio asset, no fundo preto. Seções marfim opacas permanecem sem textura. Sem overlays sobre controles ou texto.
- Container do logo agora é picture com proporção estável, object-fit:contain e largura máxima de apresentação de 150px (130px no mobile). A classe brand-logo__image--legacy concentra o recorte central do screenshot atual, sem posição absoluta ou offsets em pixels. Para receber o original em vetor/alta resolução, trocar src/dimensões intrínsecas e remover somente essa classe; o container e o layout permanecem estáveis. PNG original e fontes locais não foram alterados.
- Inspeção das novas capturas integrais de desktop 1440px e mobile 390px: composição, espaçamento, tipografia e estrutura editorial preservados; textura e detalhes contidos. Sem cards, sombras, gradientes, novas fotos ou alterações de copy.

### Rechecagem Playwright — Microsoft Edge 153.0.4234.32

| Largura | scrollWidth | Imagens quebradas | Erros de console/JS | Revelações ao rolar |
| --- | --- | --- | --- | --- |
| 320px | 320px | 0 | 0 | Aprovadas |
| 390px | 390px | 0 | 0 | Aprovadas |
| 540px | 540px | 0 | 0 | Aprovadas |
| 768px | 768px | 0 | 0 | Aprovadas |
| 1024px | 1024px | 0 | 0 | Aprovadas |
| 1440px | 1440px | 0 | 0 | Aprovadas |

- Cada elemento foi trazido à viewport; classe de espera removida e opacity=1 confirmado. Sem overflow antes ou depois das entradas. Efeitos não usam translateX no container da linha.
- Hero observado durante a entrada, com transições ativas; SVG observado com stroke-dashoffset intermediário de aproximadamente 0,951 e depois 0, confirmando o traçado real.
- Delays das áreas verificados: 0/90/180ms. Hover do número: matrix com translateX=4px; underline expandido até escala 1; CTA com translateY=-2px, todos verificados no navegador.
- Menu mobile: abrir/fechar, aria-expanded, navegação por âncoras e Escape com retorno de foco ao botão aprovados nas três larguras mobile. Skip link e outlines mantidos.
- prefers-reduced-motion: sem classes de espera, sem traçado, sem transições/deslocamentos de hover e sem scroll suave. Preferência alterada durante a visita também cancela os efeitos e revela todo o conteúdo.
- JavaScript desativado: navegação e conteúdo disponíveis; desenho estático. IntersectionObserver indisponível: conteúdo continua visível. Foco em link com revelação pendente remove a espera e mantém opacity=1; CSS focus-within assegura visibilidade imediata.
- Simulação de futuro logo SVG 300×100 no desktop e mobile: container manteve exatamente largura/altura e object-fit:contain, sem modificar o asset atual.
- Fontes locais carregadas, imagens com dimensões, links internos válidos e único h1 mantidos. Zero falhas de recursos locais no carregamento das seis viewports.
- Links externos mantêm noopener/noreferrer e descrição acessível de nova aba. Sem scripts externos, formulário, analytics ou captação.

### Contraste e garantias de publicação
- Contraste de texto validado >=4,5:1: dourado sobre preto com textura/hover conservador 9,23:1; texto muted no mesmo fundo 9,88:1; dourado no marfim 5,88:1; muted no marfim 5,63:1; texto do CTA no hover 10,53:1; seta dourada no hover do CTA 5,54:1. Filetes/grain são decorativos e não carregam informação.
- Meta noindex,nofollow,noarchive e disclosure LocalUp mantidos literalmente; nenhum dado empresarial novo.
- Artefato validado: manifesto/brief/tokens ausentes e retornando 404, raiz sem listagem e robots.txt com Disallow: /.
- npm run build e git diff --check aprovados. Asset novo contém apenas SVG estático, sem scripts/fontes/imagens remotos.
- Capturas e scripts de verificação ficam na pasta temporária localup-priscila-refinement-qa, fora do repositório e da publicação. Nenhuma evidência interna foi inserida em public/.
- Limitações anteriores (logo de baixa resolução, feed incompleto, ausência de fotos institucionais e validação de dados para produção) seguem aplicáveis.
