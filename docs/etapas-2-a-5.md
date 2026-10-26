# Evolução por etapas — CTI CrossBox

Concluída em 26/10/2026. As cinco etapas estão integradas na mesma página estática, mantendo HTML, CSS e JavaScript sem novas dependências de produção.

## Etapa 2 — Conheça o CTI

- Utilizada a segunda foto enviada, `IMG_9028.jpg`, em versões WebP responsivas e JPEG alternativo; o arquivo original não foi alterado.
- Apresentação curta do espaço, com contato direto com a equipe.
- Os cartões grandes de acesso rápido e o bloco extenso de oferta deram lugar à apresentação do box, a atalhos compactos e às condições da experiência em um componente nativo `details/summary`.
- Mantidas as três aulas gratuitas para novos alunos, agendamento por WhatsApp ou direct e ausência de compromisso de matrícula.
- No desenvolvimento da etapa 2, a expansão pelo teclado e por fragmento foi conferida no Chrome. Após a integração final, a revisão de usabilidade fica com o responsável, conforme solicitado.

## Etapa 3 — Horários

- Horários colocados antes dos planos, com título direto e painel arredondado.
- As sete turmas continuam geradas por `config.js`; cada horário abre consulta de vaga pelo WhatsApp com a turma preenchida.
- Removidos o gráfico decorativo da semana e os slogans. Nenhuma disponibilidade de vaga foi presumida.

## Etapa 4 — Planos

- Quatro combinações visíveis, sem abas ou filtros: mensal/trimestral, 3x/5x por semana.
- Cards arredondados, sem numeração decorativa e com botão “Consultar plano”.
- Removido o texto redundante “Plano mensal” dos cards mensais. Os trimestrais mantêm a orientação de consultar condições.
- Preços, desconto de ex-alunos e condição do primeiro mês preservados. Não foram acrescentadas condições de cobrança trimestral.

## Etapa 5 — Localização e fechamento

- Endereço, mapa e agendamento reunidos em um único fechamento arredondado.
- Retirado o bloco final que repetia o convite e a oferta; permanece um CTA curto e consistente com a abertura.
- Menu principal organizado em box, horários, planos e localização. Os links de mapa e Instagram continuam disponíveis junto à apresentação do CTI.

## Dados e arquitetura preservados

`js/config.js` permanece a fonte dos contatos, preços, horários, dias e desconto. Nenhuma informação comercial foi alterada nesta integração. As duas fotos vieram do responsável, sem geração de pessoas, cenas ou depoimentos.

## Testes finais

Executados somente após concluir a implementação das etapas 3, 4 e 5, conforme solicitado:

- `npm.cmd test`: **15 testes aprovados**.
- Conferidos 18 links de WhatsApp com número oficial e mensagens preenchidas, quatro planos, sete turmas, mapa, Instagram, contatos alternativos e medição opcional de cliques.
- Validada a ordem das seções, unicidade dos IDs e existência de todos os destinos internos e recursos locais.
- HTML analisado: estrutura balanceada, cinco seções, um `main`, um `h1`; links externos protegidos e dimensões dos arquivos de imagem compatíveis com o HTML.
- Sintaxe dos scripts validada com `node --check`; HTML/CSS/JS aprovados pelo Prettier.
- Prévia local, scripts, estilos, fotos e favicon responderam HTTP 200.

O teste antigo de destaque do dia foi removido junto com o gráfico decorativo. Ele não se aplicava mais à interface. Foram incluídas verificações de navegação e recursos locais.

Esses testes automatizados não simulam a experiência completa de um navegador ou leitor de tela. **A revisão de usabilidade desta versão será feita manualmente pelo responsável.** Não foi realizada nova navegação automatizada para a integração final. Medições de Core Web Vitals em uso real dependem do ambiente publicado.

## Revisão manual

Abra `http://127.0.0.1:4173/` e atualize com `Ctrl+F5`. Se necessário, inicie a prévia na pasta do projeto com `npm.cmd run preview`.

Confira no celular e no desktop o fluxo de agendamento, as consultas por horário/plano, a abertura das condições da experiência, o mapa e o Instagram. O site continua local, sem publicação na internet.
