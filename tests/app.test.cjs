const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const app = fs.readFileSync(path.join(root, 'js/app.js'), 'utf8');

// Adaptador mínimo para testar os dados e eventos sem instalar um DOM ou navegador.
// Não substitui a avaliação visual de layout e acessibilidade no navegador.
class Element {
  constructor(tag, attributes = {}) {
    this.tagName = tag;
    this.attributes = attributes;
    this.children = [];
    this.dataset = {};
    this.events = {};
    this.value = '';
    Object.assign(this, attributes);
    this.className = attributes.class || '';
    for (const key of Object.keys(attributes)) {
      if (key.startsWith('data-')) this.dataset[key.slice(5)] = attributes[key];
    }
    this.classList = {
      add: (name) => {
        this.className += ` ${name}`;
      },
    };
  }
  set textContent(text) {
    this.value = String(text);
    this.children = [];
  }
  get textContent() {
    return this.value + this.children.map((child) => child.textContent).join('');
  }
  append(...children) {
    this.children.push(...children);
  }
  appendChild(child) {
    this.append(child);
    return child;
  }
  replaceChildren(...children) {
    this.children = children;
  }
  setAttribute(key, value) {
    this.attributes[key] = value;
  }
  removeAttribute(key) {
    delete this.attributes[key];
  }
  get hash() {
    return this.href?.startsWith('#') ? this.href : '';
  }
  getBoundingClientRect() {
    return { top: this.top ?? Number.POSITIVE_INFINITY };
  }
  addEventListener(type, callback) {
    this.events[type] = callback;
  }
}

function run({ missingConfig = false, phone, browserEvents = false } = {}) {
  const elements = Array.from(html.matchAll(/<([a-z][\w-]*)\b([^>]*)>/gi), (match) => {
    const attributes = Object.fromEntries(
      Array.from(match[2].matchAll(/([\w-]+)(?:="([^"]*)")?/g), (attr) => [attr[1], attr[2] || ''])
    );
    return new Element(match[1], attributes);
  });
  const document = {
    getElementById: (id) => elements.find((el) => el.id === id),
    createElement: (tag) => {
      const el = new Element(tag);
      elements.push(el);
      return el;
    },
    createTextNode: (value) => ({ textContent: value }),
    querySelectorAll: (selector) =>
      elements.filter((el) =>
        selector.startsWith('.')
          ? el.className.split(/\s+/).includes(selector.slice(1))
          : selector.slice(1, -1) in el.attributes ||
            (selector === '[data-track]' && el.dataset.track)
      ),
  };
  const window = {};
  if (browserEvents) {
    window.innerHeight = 800;
    window.listeners = {};
    window.addEventListener = (type, callback) => {
      (window.listeners[type] ||= []).push(callback);
    };
    window.requestAnimationFrame = (callback) => callback();
  }
  const sandbox = { document, window, Intl, Date };
  if (!missingConfig) {
    vm.runInNewContext(fs.readFileSync(path.join(root, 'js/config.js'), 'utf8'), sandbox);
    if (phone !== undefined) sandbox.window.CTI_CONFIG.whatsappNumero = phone;
  }
  vm.runInNewContext(app, sandbox);
  return { document, elements, sandbox };
}

test('todos os CTAs de contato usam o número oficial e mensagem preenchida', () => {
  const { elements, document } = run();
  const links = elements.filter(
    (el) => el.tagName === 'a' && el.href?.startsWith('https://wa.me/')
  );
  assert.equal(links.length, 18);
  for (const link of links) {
    const url = new URL(link.href);
    assert.equal(url.pathname, '/5521987557044');
    assert.ok(url.searchParams.get('text')?.startsWith('Olá!'));
    assert.equal(link.target, '_blank');
    assert.equal(link.rel, 'noopener noreferrer');
  }
  for (const id of ['hero-cta', 'experimental-cta', 'final-link']) {
    const message = new URL(document.getElementById(id).href).searchParams.get('text');
    assert.match(message, /minhas 3 aulas experimentais gratuitas/);
  }
});

test('cada plano renderiza seu valor e consulta com período e frequência corretos', () => {
  const { document, sandbox } = run();
  const cards = document.getElementById('planos-grid').children;
  assert.equal(cards.length, 4);
  sandbox.window.CTI_CONFIG.planos.forEach((plan, i) => {
    const card = cards[i];
    const link = card.children.find((el) => el.tagName === 'a');
    const message = new URL(link.href).searchParams.get('text');
    assert.ok(card.textContent.includes(`R$ ${plan.preco}`));
    assert.ok(message.includes(plan.periodo.toLowerCase()));
    assert.ok(message.includes(plan.frequencia));
    assert.ok(message.includes(String(plan.preco)));
    assert.ok(link.attributes['aria-label'].startsWith('Consultar plano '));
    if (plan.periodo === 'TRIMESTRAL') assert.ok(card.textContent.includes('Consulte condições.'));
  });
  assert.equal(document.getElementById('planos-fallback').hidden, true);
});

test('as sete turmas permitem consultar uma vaga no horário escolhido', () => {
  const { document, sandbox } = run();
  const items = document.getElementById('lista-horarios').children;
  assert.equal(items.length, 7);
  sandbox.window.CTI_CONFIG.horarios.forEach((time, i) => {
    const link = items[i].children[0];
    assert.equal(link.textContent, time);
    assert.ok(new URL(link.href).searchParams.get('text').includes(`turma das ${time}`));
    assert.ok(link.attributes['aria-label'].includes(time));
  });
  assert.equal(document.getElementById('horarios-fallback').hidden, true);
});

test('mapa e Instagram preservam os destinos da configuração', () => {
  const { document, sandbox } = run();
  const cfg = sandbox.window.CTI_CONFIG;
  for (const id of ['mapa-link', 'mapa-footer']) {
    assert.equal(
      new URL(document.getElementById(id).href).searchParams.get('query'),
      cfg.endereco.mapsQuery
    );
  }
  for (const id of ['instagram-header', 'instagram-quick', 'instagram-footer']) {
    assert.equal(document.getElementById(id).href, cfg.instagramUrl);
  }
});

test('configuração ausente preserva os contatos e as alternativas estáticas', () => {
  const { document } = run({ missingConfig: true });
  assert.equal(document.getElementById('hero-cta').href, 'https://wa.me/5521987557044');
  assert.notEqual(document.getElementById('planos-fallback').hidden, true);
  assert.notEqual(document.getElementById('horarios-fallback').hidden, true);
  assert.equal(document.getElementById('fontes-marca').media, 'all');
});

test('número inválido preserva o fallback de contato pelo Instagram', () => {
  const { document, sandbox } = run({ phone: 'inválido' });
  assert.equal(document.getElementById('hero-cta').href, sandbox.window.CTI_CONFIG.instagramUrl);
});

test('a medição de cliques permanece opcional e não envia dados sem integração', () => {
  const { document, sandbox } = run();
  const link = document.getElementById('hero-cta');
  assert.doesNotThrow(() => link.events.click());
  const calls = [];
  sandbox.window.gtag = (...args) => calls.push(args);
  link.events.click();
  assert.equal(calls.length, 1);
  assert.equal(calls[0][1], 'cti_click');
  assert.equal(calls[0][2].destino, 'aulas_gratis_hero');
});

test('navegação tem destinos válidos e mantém horários antes dos planos', () => {
  const nav = html.match(/<nav class="section-nav"[^>]*>([\s\S]*?)<\/nav>/)[1];
  assert.deepEqual(
    Array.from(nav.matchAll(/<a\b[^>]*href="(#[^"]+)"/g), (match) => match[1]),
    ['#conheca-cti', '#horarios', '#planos', '#localizacao']
  );
  const ids = Array.from(html.matchAll(/\bid="([^"]+)"/g), (match) => match[1]);
  assert.equal(ids.length, new Set(ids).size, 'IDs devem ser únicos');
  for (const match of html.matchAll(/\bhref="#([^"]+)"/g)) {
    assert.ok(ids.includes(match[1]), 'Destino interno ausente: ' + match[1]);
  }
  assert.ok(html.indexOf('id="conheca-cti"') < html.indexOf('id="horarios"'));
  assert.ok(html.indexOf('id="horarios"') < html.indexOf('id="planos"'));
  assert.ok(html.indexOf('id="planos"') < html.indexOf('id="localizacao"'));
  assert.equal(Array.from(html.matchAll(/<h1\b/g)).length, 1);
  const header = html.match(/<header class="site-header"[^>]*>([\s\S]*?)<\/header>/)[1];
  assert.ok(header.includes('id="primary-nav"'));
  assert.ok(header.includes('id="menu-toggle"'));
  assert.ok(header.includes('id="instagram-header"'));
  assert.ok(!header.includes('brand-text'));
});

test('menu móvel abre e fecha sem perder os destinos de navegação', () => {
  const { document } = run();
  const header = document.getElementById('site-header');
  const toggle = document.getElementById('menu-toggle');
  assert.equal(header.dataset.menuReady, 'true');
  assert.equal(toggle.attributes['aria-expanded'], 'false');
  toggle.events.click();
  assert.equal(header.dataset.menuOpen, 'true');
  assert.equal(toggle.attributes['aria-expanded'], 'true');
  document.querySelectorAll('[data-section-link]')[0].events.click();
  assert.equal(header.dataset.menuOpen, 'false');
  assert.equal(toggle.attributes['aria-expanded'], 'false');
});

test('navegação destaca a seção que ocupa a área de leitura', () => {
  const { document, sandbox } = run({ browserEvents: true });
  document.getElementById('conheca-cti').top = -500;
  document.getElementById('horarios').top = 100;
  document.getElementById('planos').top = 950;
  document.getElementById('localizacao').top = 1800;
  sandbox.window.listeners.scroll[0]();
  const links = document.querySelectorAll('[data-section-link]');
  assert.equal(links[1].attributes['aria-current'], 'location');
  assert.equal(links[0].attributes['aria-current'], undefined);
  document.getElementById('planos').top = 120;
  sandbox.window.listeners.scroll[0]();
  assert.equal(links[2].attributes['aria-current'], 'location');
  assert.equal(links[1].attributes['aria-current'], undefined);
});

test('rodapé exibe o crédito com o Instagram da Lima Digital', () => {
  const { elements } = run();
  const link = elements.find((el) => el.href === 'https://www.instagram.com/ld_limadigital/');
  assert.ok(link);
  assert.equal(link.target, '_blank');
  assert.equal(link.rel, 'noopener noreferrer');
  assert.match(html, /Desenvolvido por\s*<a[\s\S]*?>LIMA DIGITAL<\/a/);
});

test('imagens, ícones, scripts e estilos locais referenciados existem', () => {
  const local = [];
  for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) {
    if (!/^(?:https?:|data:|#)/.test(match[1])) local.push(match[1]);
  }
  for (const match of html.matchAll(/\bsrcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) {
      local.push(candidate.trim().split(/\s+/)[0]);
    }
  }
  for (const file of local) {
    assert.ok(fs.existsSync(path.join(root, file)), 'Arquivo local ausente: ' + file);
  }
});
