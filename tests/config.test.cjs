const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const vm = require('node:vm');
const path = require('node:path');
const root = path.join(__dirname, '..');
const sandbox = { window: {} };
vm.runInNewContext(fs.readFileSync(path.join(root, 'js/config.js'), 'utf8'), sandbox);
const config = sandbox.window.CTI_CONFIG;

test('WhatsApp oficial tem o formato internacional informado', () => {
  assert.equal(config.whatsappNumero, '5521987557044');
  assert.match(config.whatsappNumero, /^55\d{10,11}$/);
});
test('horários informados estão definidos de segunda a sexta', () => {
  assert.deepEqual(Array.from(config.horarios), ['07h', '08h', '17h', '18h', '19h', '20h', '21h']);
  assert.equal(config.dias, 'Segunda a sexta');
});
test('planos e preços estão corretos', () => {
  assert.deepEqual(
    Array.from(config.planos, (p) => [p.periodo, p.frequencia, p.preco]),
    [
      ['MENSAL', '3x por semana', 100],
      ['MENSAL', '5x por semana', 125],
      ['TRIMESTRAL', '3x por semana', 250],
      ['TRIMESTRAL', '5x por semana', 325],
    ]
  );
});
test('aula experimental e desconto para ex-alunos estão definidos', () => {
  assert.equal(config.experimental.quantidade, 3);
  assert.match(config.mensagens.experimental, /minhas 3 aulas experimentais gratuitas/);
  assert.equal(config.experimental.apenasNovosAlunos, true);
  assert.equal(config.experimental.precisaAgendar, true);
  assert.equal(config.experimental.compromisso, false);
  assert.equal(config.exAlunoDesconto, 20);
  assert.equal(config.exAlunoCondicao, 'primeiro mês');
});
test('endereço e instagram declarados', () => {
  assert.match(config.instagramUrl, /^https:\/\/www\.instagram\.com\//);
  assert.ok(config.endereco.mapsQuery.includes('Belford Roxo'));
});
test('arquivos e seções essenciais existem', () => {
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  for (const ref of [
    'styles.css',
    'js/config.js',
    'js/app.js',
    'assets/logo-cti.png',
    'id="planos"',
    'id="horarios"',
    'id="experimental"',
  ]) {
    assert.ok(html.includes(ref), `Referência ausente: ${ref}`);
  }
});
