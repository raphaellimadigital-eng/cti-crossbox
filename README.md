# CTI CrossBox — Landing page para link da bio

Landing page responsiva e estática do CTI CrossBox, seguindo o kit de marca enviado: preto `#0B0A0A`, vermelho `#E1251B`, detalhes amarelos `#F5C21B`, títulos Big Shoulders, textos Instrument Sans, números DM Mono. Não exige framework nem dependências para publicar.

## O que está pronto

- CTA com WhatsApp oficial **(21) 98755-7044** e mensagem pronta para agendar **3 aulas experimentais gratuitas**.
- Condições: apenas novos alunos, acompanhamento, agendamento por WhatsApp ou direct, sem compromisso de matrícula.
- Horários **segunda a sexta: 07h, 08h, 17h, 18h, 19h, 20h, 21h**.
- Planos **mensais:** 3x por semana R$ 100; 5x por semana R$ 125.
- Planos **trimestrais:** 3x por semana R$ 250; 5x por semana R$ 325.
- Campanha **ex-alunos: 20% de desconto no primeiro mês**.
- Endereço, link para o Maps e Instagram.
- Botões dos planos enviam para o WhatsApp o plano e o preço escolhidos.
- Duas fotos reais do CTI, otimizadas para celular, com cantos arredondados.
- Cabeçalho compacto: logo original e navegação em uma linha no desktop; menu acessível no celular, com destaque da seção visível.
- Botões em formato de cápsula com altura mínima de 56px, estados de foco e ícones padronizados. Cards e painéis com cantos arredondados, espaçamentos consistentes e movimento discreto ao passar o cursor.
- Crédito no rodapé com link para o Instagram da Lima Digital.
- Condições da experiência inicial em um bloco expansível, sem repetir a oferta em várias seções.
- Cada horário permite consultar a vaga pelo WhatsApp com a turma preenchida.
- Logo transparente enviado pelo CTI, com versões WebP responsivas, favicon e imagem de compartilhamento.
- Atalho de teclado para o conteúdo, foco visível, áreas de toque ampliadas e alternativas de contato sem JavaScript.
- Sem coleta de dados no site e sem cookies de marketing.

O diagnóstico, as prioridades e os limites de validação estão em [docs/diagnostico-ux.md](docs/diagnostico-ux.md) e [docs/relatorio-otimizacao.md](docs/relatorio-otimizacao.md).

As cinco etapas de evolução estão implementadas. O estado atual e os testes finais estão em [docs/etapas-2-a-5.md](docs/etapas-2-a-5.md). A revisão de usabilidade desta versão será feita manualmente pelo responsável.

**Importante:** valores trimestrais são exibidos exatamente como informados, sem afirmar se são à vista, em parcelas ou valor mensal. Confirme a condição de pagamento com o CTI antes de veicular campanhas pagas. Também confirme a localização exibida no Google Maps.

## Estrutura

```text
CTI-CrossBox/
├── index.html
├── styles.css
├── favicon.ico          # Logo do CTI para a aba do navegador
├── js/
│   ├── config.js        # WhatsApp, horários, preços, mensagens, endereço
│   └── app.js           # Links, planos, horários e eventos de clique
├── assets/
│   ├── logo-cti.png     # Alternativa PNG transparente otimizada
│   ├── logo-cti-*.webp  # Variantes de 96, 192, 384 e 640px
│   ├── cti-favicon-*.png # Ícones de 32 e 192px
│   ├── apple-touch-icon.png
│   ├── cti-compartilhamento.jpg # Prévia social 1200 × 630px
│   ├── treino-cti*.webp # Primeira foto em tamanhos responsivos
│   ├── box-cti*.webp    # Segunda foto em tamanhos responsivos
│   └── ...              # Assets originais preservados
├── docs/
│   ├── kit-da-marca-original.png
│   └── destaques-instagram.md
├── tests/               # Configuração e comportamento dos links/cards
├── AGENTS.md             # Instruções para usar o Codex
├── netlify.toml
└── package.json
```

## Abrir no VS Code / Codex

Extraia o ZIP para `C:\Projetos\CTI-CrossBox`. Depois, no PowerShell:

```powershell
cd C:\Projetos\CTI-CrossBox
code .
```

Para abrir uma prévia local sem publicar o site:

```powershell
npm.cmd run preview
```

Acesse **http://127.0.0.1:4173**. O servidor fica disponível somente neste computador e serve apenas os arquivos públicos do site. Use `Ctrl+C` no terminal para encerrá-lo. Também é possível abrir `index.html` diretamente ou usar a extensão **Live Server** do VS Code.

Para validar:

```powershell
npm.cmd test
```

O projeto não exige `npm install` para funcionar.

## Alterar preços ou horários

Edite **somente** `js/config.js`. Os cards dos planos são gerados automaticamente pelo JavaScript. Por exemplo:

```javascript
whatsappNumero: '5521987557044',
horarios: ['07h', '08h', '17h', '18h', '19h', '20h', '21h'],
```

Rode `npm test` após alterar valores. Para renovar a campanha de desconto ou regra de aula experimental, ajuste também o texto do `index.html` (consulte `AGENTS.md`).

## Melhor publicação: GitHub + Netlify

**1.** Crie um repositório privado ou público `cti-crossbox` no GitHub (preferencialmente em conta do cliente, ou com transferência de titularidade planejada). No terminal:

```powershell
git init
git add .
git commit -m "Cria landing page CTI CrossBox"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/cti-crossbox.git
git push -u origin main
```

**2.** Entre no Netlify e escolha **Add new project → Import an existing project → GitHub**. Selecione o repositório.

- Build command: **deixe vazio**.
- Publish directory: `.` (raiz do projeto).
- Site name: tente `cti-crossbox` ou outro nome disponível.

**3.** Confirme links em celular e coloque a URL gerada em **Instagram → Editar perfil → Links**.

**4.** Mais tarde, se o CTI desejar, registre domínio próprio e aponte o DNS para o Netlify.

**Recomendação de propriedade:** a conta do Netlify, o domínio e o repositório devem ser do CTI, e a Lima Digital deve possuir acesso de colaborador. Isso evita dependência do prestador de serviço.

## Pendências para uma versão ainda melhor

- Concluir a revisão manual de usabilidade no celular e no desktop, conforme combinado com o responsável.
- Usar URL absoluta de `assets/cti-compartilhamento.jpg` em `og:image` após definir o domínio; adicionar `canonical` e `og:url` com o endereço real publicado.
- Conferir em aparelhos Android/iPhone e no navegador interno do Instagram; medir Core Web Vitals no ambiente publicado.
- Confirmar regras de uso do desconto e modalidades abrangidas, se houver exceções.

## Estatísticas

Os botões têm `data-track`. O código dispara eventos `cti_click` **somente se** Google Analytics (`gtag`) for integrado posteriormente. Nenhum rastreamento é ativado por padrão.
# cti-crossbox
