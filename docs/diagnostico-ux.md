# Diagnóstico e priorização — CTI CrossBox

Análise de 25/10/2026, feita antes das alterações. Escopo: evoluir a landing page existente, sem framework, sem alterar dados comerciais.

## Base encontrada

- HTML estático, CSS próprio e JavaScript sem dependências de produção.
- `js/config.js` concentra contatos, horários, planos e mensagens; `js/app.js` monta cards e links com `textContent`, sem injetar HTML dos dados.
- Cinco acessos rápidos, oferta experimental, quatro planos, campanha para ex-alunos, horários, localização e chamada final já funcionavam.
- Seis testes de configuração aprovados antes da implementação.
- Identidade definida no kit: preto, vermelho, off-white, Big Shoulders, Instrument Sans e DM Mono. Não há fotografias de treino independentes autorizadas no projeto.

## Prioridades

| Achado | Ação | Impacto | Esforço | Risco |
| --- | --- | --- | --- | --- |
| Textos de 8–11px no celular e links pequenos nos planos | Aumentar legibilidade e áreas de toque para pelo menos 44px | Alto | Baixo | Baixo |
| Acessos principais só depois do hero | Adicionar navegação compacta para planos, horários e localização | Alto | Baixo | Baixo |
| Horários são texto sem ação | Permitir consultar uma turma no WhatsApp com o horário preenchido | Alto | Baixo | Baixo |
| Não há atalho para pular ao conteúdo | Adicionar skip link e foco visível, respeitando redução de movimento | Alto | Baixo | Baixo |
| Logo provisório RGB de 147 × 156px ampliado no desktop | Usar o PNG transparente enviado em variantes otimizadas, preservando o desenho | Médio | Baixo | Baixo |
| CSS minificado, regras duplicadas de título e tamanhos conflitantes | Reorganizar estilos existentes e consolidar breakpoints | Médio | Médio | Médio |
| Fonte remota bloqueia a folha de estilo; muitos pesos solicitados | Carregar fontes sem bloquear o CSS local e limitar os pesos utilizados | Médio | Baixo | Baixo |
| Sem configuração, o script falha; sem JS, planos e horários ficam vazios | Preservar contatos estáticos e oferecer mensagens alternativas claras | Médio | Baixo | Baixo |
| Rótulos dos links dos planos são iguais | Incluir período e frequência no nome acessível | Médio | Baixo | Baixo |
| Metadados de compartilhamento apontam para o kit, não para a marca | Gerar imagem social própria com o logo e dados já confirmados | Médio | Baixo | Baixo |

## Preservação

Mantidos: WhatsApp `5521987557044`, Instagram, endereço, horários, preços e condições; todas as seções e caminhos existentes. O nome e os valores dos planos permanecem em `config.js`. Nenhuma condição de pagamento trimestral foi presumida. Nenhum depoimento ou fotografia foi inventado.

## Critérios de validação

Executar `npm.cmd test`, verificar sintaxe, destinos internos e externos, mensagens de WhatsApp, dados renderizados, alternativas sem JavaScript, contraste e responsividade. A conformidade WCAG completa e os Core Web Vitals de campo dependem de avaliação no ambiente publicado.

Referências: [WCAG 2.2](https://www.w3.org/TR/WCAG22/), [tamanho mínimo de alvo](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum/) e [prioridade de recursos](https://web.dev/articles/fetch-priority).
