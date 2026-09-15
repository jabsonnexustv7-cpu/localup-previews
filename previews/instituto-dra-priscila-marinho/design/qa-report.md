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
