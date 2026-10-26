# Instruções para Codex — CTI CrossBox

Projeto: mini landing page/link da bio, sem framework, com HTML, CSS e JavaScript. Diretório-alvo no Windows: `C:\Projetos\CTI-CrossBox`.

## Regras

1. Preservar identidade do kit em `docs/kit-da-marca-original.png`: 70% preto, 25% vermelho/off-white, no máximo 5% amarelo. Usar amarelo só em avisos e no detalhe superior de barra vermelha.
2. Títulos: Big Shoulders; corpo: Instrument Sans; elementos técnicos: DM Mono. Fundo escuro, textura granulada sutil. Evitar blocos claros, textos pequenos ilegíveis, excesso de amarelo e estética bombeiro.
3. Priorizar UX mobile (link da bio do Instagram). O CTA **2 aulas grátis** deve aparecer na primeira dobra sempre que possível.
4. Não inventar depoimentos, fotos de alunos, preços, dias de treino, números ou promoções. Utilizar fotos reais autorizadas.
5. WhatsApp, endereço, horários e preços: fonte única em `js/config.js`. O JavaScript em `js/app.js` gera links e cards a partir dos dados.
6. Dados vigentes enviados pelo responsável: número `5521987557044`; horários seg–sex 07, 08, 17–21h; mensal 3x R$100, 5x R$125; trimestral 3x R$250, 5x R$325; ex-alunos 20% no primeiro mês; 2 aulas experimentais grátis agendadas e sem compromisso para alunos novos.
7. Não afirmar que valores trimestrais são por mês, à vista ou parcelados, pois a forma de cobrança não foi informada.
8. Antes de finalizar edições, executar `npm test` e verificar visualização em largura 375px e 1280px.
9. As mensagens e botões levam sempre ao WhatsApp oficial informado, com texto pré-preenchido para facilitar o atendimento. Links externos: `target="_blank"` e `rel="noopener noreferrer"`.

## Onde editar

- Texto institucional, chamadas e estrutura: `index.html`.
- Identidade visual e responsividade: `styles.css`.
- Planos, contatos, horários, endereço: `js/config.js`.
- Montagem dos planos, links e chips: `js/app.js`.
- Testes: `tests/config.test.cjs`.

## Teste e publicação

```powershell
npm test
```

Publicação sugerida: GitHub + Netlify, site estático sem build, diretório de publicação `.`. Conferir no celular WhatsApp, preços, horários, geolocalização e links antes de disponibilizar no Instagram.
