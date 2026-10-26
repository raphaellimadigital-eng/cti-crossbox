(() => {
  'use strict';
  // O CSS local tem prioridade; as fontes da marca carregam em seguida.
  const fonts = document.getElementById('fontes-marca');
  if (fonts) fonts.media = 'all';

  const header = document.getElementById('site-header');
  const menuToggle = document.getElementById('menu-toggle');
  const sectionLinks = Array.from(document.querySelectorAll('[data-section-link]'));
  if (header && menuToggle) {
    header.dataset.menuReady = 'true';
    const setMenuOpen = (open) => {
      header.dataset.menuOpen = String(open);
      menuToggle.setAttribute('aria-expanded', String(open));
      menuToggle.setAttribute(
        'aria-label',
        open ? 'Fechar menu de navegação' : 'Abrir menu de navegação'
      );
    };
    setMenuOpen(false);
    menuToggle.addEventListener('click', () => setMenuOpen(header.dataset.menuOpen !== 'true'));
    sectionLinks.forEach((link) => link.addEventListener('click', () => setMenuOpen(false)));
    if (typeof document.addEventListener === 'function') {
      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && header.dataset.menuOpen === 'true') {
          setMenuOpen(false);
          menuToggle.focus();
        }
      });
      document.addEventListener('click', (event) => {
        if (header.dataset.menuOpen === 'true' && !header.contains(event.target))
          setMenuOpen(false);
      });
    }
    if (typeof window.addEventListener === 'function') {
      window.addEventListener('resize', () => {
        if (window.innerWidth > 700 && header.dataset.menuOpen === 'true') setMenuOpen(false);
      });
    }
  }

  if (sectionLinks.length && typeof window.addEventListener === 'function') {
    const sections = sectionLinks.map((link) => document.getElementById(link.hash.slice(1)));
    const updateActive = () => {
      const marker = window.innerHeight * 0.38;
      let activeId = '';
      sections.forEach((section) => {
        if (section && section.getBoundingClientRect().top <= marker) activeId = section.id;
      });
      sectionLinks.forEach((link) => {
        if (link.hash.slice(1) === activeId) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });
    };
    let pending = false;
    const scheduleActive = () => {
      if (pending) return;
      pending = true;
      window.requestAnimationFrame(() => {
        pending = false;
        updateActive();
      });
    };
    window.addEventListener('scroll', scheduleActive, { passive: true });
    window.addEventListener('resize', scheduleActive);
    window.addEventListener('hashchange', scheduleActive);
    updateActive();
  }

  const cfg = window.CTI_CONFIG;
  // Links estáticos e alternativas continuam acessíveis se a configuração não carregar.
  if (!cfg) return;

  const $ = (id) => document.getElementById(id);
  const validPhone = (phone) => /^\d{12,13}$/.test(String(phone || '').trim());

  function whatsapp(message) {
    if (!validPhone(cfg.whatsappNumero)) return cfg.instagramUrl;
    return `https://wa.me/${String(cfg.whatsappNumero).trim()}?text=${encodeURIComponent(message)}`;
  }
  function setHref(id, href) {
    const el = $(id);
    if (el) el.href = href;
  }
  function externalLink(link, href, track, label) {
    link.href = href;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.dataset.track = track;
    link.setAttribute('aria-label', label);
    return link;
  }

  ['hero-cta', 'experimental-cta', 'final-link'].forEach((id) =>
    setHref(id, whatsapp(cfg.mensagens.experimental))
  );
  setHref('whatsapp-link', whatsapp(cfg.mensagens.contato));
  setHref('planos-fallback-link', whatsapp(cfg.mensagens.contato));
  setHref('confirmar-link', whatsapp(cfg.mensagens.horarios));
  setHref('ex-aluno-cta', whatsapp(cfg.mensagens.exAluno));
  ['instagram-header', 'instagram-quick', 'instagram-footer'].forEach((id) =>
    setHref(id, cfg.instagramUrl)
  );

  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(cfg.endereco.mapsQuery)}`;
  ['mapa-link', 'mapa-footer'].forEach((id) => setHref(id, mapsUrl));
  if ($('endereco-completo'))
    $('endereco-completo').textContent = `${cfg.endereco.linha1} · ${cfg.endereco.linha2}`;
  if ($('ano')) $('ano').textContent = new Date().getFullYear();
  if ($('desconto-valor')) $('desconto-valor').textContent = cfg.exAlunoDesconto;
  if ($('desconto-condicao')) $('desconto-condicao').textContent = cfg.exAlunoCondicao;
  document.querySelectorAll('[data-dias]').forEach((el) => {
    el.textContent = cfg.dias.toLocaleLowerCase('pt-BR');
  });
  if ($('instagram-footer'))
    $('instagram-footer').textContent = `@${cfg.instagramUsuario.toUpperCase()}`;

  const horarios = $('lista-horarios');
  if (horarios) {
    horarios.replaceChildren(
      ...cfg.horarios.map((horario) => {
        const item = document.createElement('li');
        const link = externalLink(
          document.createElement('a'),
          whatsapp(`${cfg.mensagens.horarios} Tenho interesse na turma das ${horario}. Há vaga?`),
          `horario_${horario}`,
          `Consultar vaga às ${horario} pelo WhatsApp`
        );
        link.className = 'time-chip button button-time';
        link.textContent = horario;
        item.appendChild(link);
        return item;
      })
    );
    if ($('horarios-fallback')) $('horarios-fallback').hidden = cfg.horarios.length > 0;
  }

  const grid = $('planos-grid');
  const brl = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    maximumFractionDigits: 0,
  });
  if (grid)
    grid.replaceChildren(
      ...cfg.planos.map((plano) => {
        const card = document.createElement('article');
        card.className = 'plan-card';
        const top = document.createElement('div');
        top.className = 'plan-top';
        const period = document.createElement('span');
        period.textContent = plano.periodo;
        top.append(period);
        const frequency = document.createElement('h3');
        frequency.textContent = plano.frequencia;
        const price = document.createElement('strong');
        price.className = 'plan-price';
        const currency = document.createElement('span');
        currency.className = 'plan-currency';
        currency.textContent = 'R$';
        const amount = document.createElement('span');
        amount.textContent = new Intl.NumberFormat('pt-BR').format(plano.preco);
        price.append(currency, document.createTextNode(' '), amount);
        const note = document.createElement('p');
        note.textContent =
          plano.periodo === 'TRIMESTRAL'
            ? 'Plano de três meses. Consulte condições.'
            : 'Plano mensal.';
        const link = externalLink(
          document.createElement('a'),
          whatsapp(
            `Olá! Vim pelo Instagram e tenho interesse no plano ${plano.periodo.toLowerCase()} de ${plano.frequencia} (${brl.format(plano.preco)}). Como faço para me matricular?`
          ),
          `plano_${plano.id}`,
          `Consultar plano ${plano.periodo.toLowerCase()}, ${plano.frequencia}, ${brl.format(plano.preco)}, pelo WhatsApp`
        );
        link.className = 'plan-cta button button-secondary';
        link.textContent = 'Consultar plano';
        card.append(top, frequency, price);
        if (plano.periodo === 'TRIMESTRAL') card.append(note);
        card.append(link);
        return card;
      })
    );
  if (grid && $('planos-fallback')) $('planos-fallback').hidden = cfg.planos.length > 0;

  // A medição só é disparada caso Google Analytics tenha sido instalado futuramente.
  document.querySelectorAll('[data-track]').forEach((link) => {
    link.addEventListener('click', () => {
      if (typeof window.gtag === 'function')
        window.gtag('event', 'cti_click', { destino: link.dataset.track });
    });
  });
})();
