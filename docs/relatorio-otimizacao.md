# Relatório de otimização — CTI CrossBox

**Registro histórico da primeira otimização.** A evolução posterior com fotos reais, reorganização em cinco etapas e resultados dos testes finais está em [etapas-2-a-5.md](etapas-2-a-5.md). Os testes visuais descritos abaixo se referem à versão anterior; a usabilidade da versão final será revisada manualmente pelo responsável.

Alterações aplicadas em 25/10/2026 no projeto existente em `C:\Projetos\CTI-CrossBox`. Arquitetura preservada: HTML, CSS e JavaScript, sem novas dependências de produção, sem etapa de build e sem publicação automática.

## Correção solicitada pelo responsável

- Oferta atualizada para **3 aulas grátis** em toda a página, no WhatsApp e na documentação comercial.
- Logo do CTI configurado como favicon ICO e PNG em múltiplos tamanhos e ícone para iPhone.
- Setas decorativas removidas; botões e links receberam estados de destaque mais claros.
- Correção revalidada em 375px e 1280px, sem rolagem horizontal, e 14 testes aprovados. Mensagens dos três CTAs experimentais conferidas com a oferta de três aulas. Favicon ICO, PNGs e ícone Apple responderam com HTTP 200 e os tipos de arquivo corretos.

## O que mudou e por quê

- Navegação no início da página para aulas experimentais, planos, horários e localização: acesso direto às informações procuradas por quem chega pelo Instagram.
- Textos de conteúdo maiores, hierarquia mais clara e espaçamentos consistentes. Mantidos os quatro planos visíveis, sem filtros ou abas que acrescentem etapas.
- Links de ação com pelo menos 44px de altura declarada no CSS; links de planos e horários têm 50px. A conferência no Chrome não encontrou links visíveis com alvo inferior a 44 × 44px nas larguras de 375, 768 e 1280px.
- Os sete horários agora consultam a equipe pelo WhatsApp com a turma escolhida já escrita. Trata-se de uma consulta de vaga, não de confirmação automática de agendamento.
- Atalho “Pular para o conteúdo”, landmarks de cabeçalho/navegação/conteúdo/rodapé, foco visível, redução de movimento, suporte a cores forçadas e nomes acessíveis distintos nos planos.
- Ícones SVG consistentes, incorporados ao HTML, sem biblioteca ou requisições extras.
- Logo transparente fornecido pelo responsável em substituição ao recorte provisório. Somente as margens transparentes foram removidas; o desenho da marca foi preservado. Criadas variantes WebP e alternativa PNG.
- Fontes de marca carregadas sem bloquear o CSS local, com menos pesos solicitados e alternativas do sistema. Dimensões das imagens declaradas para reservar espaço.
- Imagem de compartilhamento 1200 × 630px com o logo, favicon próprio e descrição alternativa nos metadados sociais.
- CSS organizado por seção, com base mobile e breakpoints progressivos, removendo as declarações conflitantes de tamanho do título.
- Se a configuração não carregar, os contatos estáticos continuam disponíveis. Planos e horários oferecem instruções alternativas em vez de áreas vazias.

## Dados preservados

WhatsApp, Instagram, endereço, horários, quatro preços e desconto de ex-alunos foram mantidos. A quantidade da oferta experimental em `js/config.js`, nos textos da página, metadados e mensagens foi corrigida para **3 aulas grátis**, conforme orientação posterior do responsável. Não foram acrescentadas condições de pagamento trimestral. Todas as seções existentes foram mantidas. Não foram inventadas fotos, depoimentos ou informações comerciais.

Os links, planos, horários, desconto exibido e dias de funcionamento são preenchidos a partir da configuração. Contatos estáticos no HTML continuam como alternativa em caso de falha de JavaScript.

## Verificações concluídas

- `npm.cmd test`: **14 testes aprovados**, incluindo os seis testes originais de configuração.
- Execução de `app.js` em adaptador de DOM de teste: 18 links de WhatsApp com o número oficial e mensagem preenchida; quatro planos; sete consultas de horários; mapa; Instagram; configuração ausente; número inválido; medição opcional de cliques; destaque do dia no fuso de São Paulo.
- `node --check js/app.js` e `node --check js/config.js`: sintaxe válida.
- HTML analisado com o parser da biblioteca padrão do Python: estrutura balanceada, IDs únicos, um título principal, um elemento `main` e 13 referências internas válidas, incluindo os símbolos SVG.
- Conferidos 12 links externos estáticos com `target="_blank"` e `rel="noopener noreferrer"`; recursos locais e variantes de imagens existem. Os destinos gerados de mapa/Instagram são os da configuração.
- Dimensões intrínsecas do PNG e da imagem social conferidas. A imagem social foi inspecionada visualmente.
- HTML, CSS e JavaScript formatados com Prettier já disponível no ambiente. Nenhum pacote foi instalado no projeto.
- Revisão visual no Chrome com viewports de **320 × 568, 375 × 812, 768 × 1024 e 1280 × 900px**. Conferidos chamada inicial, comparação de planos e horários. Não foi identificada rolagem horizontal. Em 320px foi ajustado o espaçamento do hero para manter o botão completo na primeira dobra, sem reduzir os textos de conteúdo.
- Medição do botão principal: limite inferior em aproximadamente 563px na tela de 320 × 568, 620px em 375 × 812, 691px em 768 × 1024 e 733px em 1280 × 900. O CTA ficou inteiramente visível nesses cenários.
- Navegação por teclado: `Shift+Tab` exibe o atalho para pular o cabeçalho; `Enter` transfere o foco para `main`; o próximo `Tab` alcança o CTA principal.
- Clique real na turma das 07h abriu a página oficial do WhatsApp com o perfil **Cti Crossbox**, número `5521987557044` e mensagem com o horário correto. Nenhuma mensagem foi enviada.
- Nenhum erro do código do site nos logs capturados. O Chrome registrou um erro de uma extensão instalada, com origem `chrome-extension://`, sem relação com os scripts do projeto.
- Adicionado `npm.cmd run preview`: servidor em `127.0.0.1:4173`, restrito aos arquivos públicos da página. Verificados GET e HEAD, bloqueio de POST e resposta 404 para documentação, ferramentas e caminhos fora da lista permitida. Isso permite revisar sem publicar ou expor arquivos de trabalho.

Capturas: [celular 320px](validacao/mobile-320.jpg), [celular 375px](validacao/mobile-375.jpg), [tablet 768px](validacao/mobile-768.jpg), [desktop 1280px](validacao/desktop-1280.jpg), [planos no celular](validacao/planos-375.jpg), [planos no desktop](validacao/planos-1280.jpg) e [horários no celular](validacao/horarios-375.jpg).

### Contraste calculado para combinações principais

| Uso | Relação | Referência aplicada |
| --- | --- | --- |
| Texto de conteúdo sobre superfície escura | 11,10:1 | 4,5:1 |
| Texto de apoio sobre superfície escura | 7,85:1 | 4,5:1 |
| Rótulo vermelho claro sobre fundo escuro | 7,19:1 | 4,5:1 |
| Texto branco sobre o botão vermelho escuro | 5,93:1 | 4,5:1 |
| Título grande vermelho sobre o fundo da chamada final | 3,53:1 | 3:1 |
| Texto escuro no aviso amarelo “grátis” | 11,28:1 | 4,5:1 |

Cálculos feitos sobre as cores sólidas declaradas. Não constituem auditoria completa de conformidade WCAG 2.2 AA.

### Recursos de imagem

| Recurso | Tamanho aproximado |
| --- | --- |
| PNG original fornecido | 1,25 MB |
| Logo WebP de 96px | 5,9 KB |
| Logo WebP de 192px | 14,3 KB |
| Logo WebP de 384px | 31,3 KB |
| Logo WebP de 640px | 52,1 KB |
| PNG alternativo de 640px | 71,6 KB |
| Imagem social | 56 KB |

O cabeçalho seleciona a variante conforme a densidade de tela; a imagem maior do painel é destinada ao desktop. Esses tamanhos são de arquivos locais, não medições de desempenho de rede. HTML, CSS e os dois scripts somam aproximadamente 12,3 KB quando comprimidos com gzip no teste local, sem contar fontes e imagens.

## Limites da validação e próximas melhorias

A inspeção pelo protocolo `file://` foi bloqueada inicialmente. A revisão foi concluída em uma prévia HTTP local permitida, com servidor ligado somente a `127.0.0.1` e restrito aos arquivos públicos do site. A página não foi publicada. As capturas e medições locais complementam os testes automatizados; não representam testes em aparelhos físicos ou em todos os navegadores.

Recomenda-se complementar a revisão em aparelhos Android, iPhone e no navegador interno do Instagram, incluindo zoom, orientação horizontal e leitor de tela. Validar também a abertura dos aplicativos de WhatsApp e mapas nesses dispositivos. LCP, INP e CLS de campo continuam pendentes do ambiente publicado; os testes locais não permitem afirmar esses resultados. Não foram enviadas mensagens ou feitas reservas durante os testes.

Quando o domínio real estiver definido, preencher `og:image` com URL absoluta, adicionar `canonical` e `og:url` e conferir a prévia de compartilhamento. Medir Core Web Vitals no ambiente publicado antes de afirmar ganho de desempenho. Fotos reais autorizadas do box e dos treinos podem enriquecer a apresentação posteriormente.

Referências usadas: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [tamanho de alvos](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum/) e [prioridade de carregamento](https://web.dev/articles/fetch-priority).
