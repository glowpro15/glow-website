// Content (projects, models, reels, studio, contact details) lives in content/*.json
// and is edited from the dashboard. This file only holds the site structure and fixed copy.
const CONTENT = ['site', 'home', 'works', 'studio', 'models', 'reels', 'sections'];
const DATA = Object.fromEntries(CONTENT.map((name) => [name, {}]));

// Fixed site structure. Sections added from the dashboard are appended by groups().
const NAV = [
  {
    id: 'production', href: 'production.html', label: { ar: 'البروداكشن', en: 'Production' },
    items: [
      { id: 'studio', href: 'production.html#studio', label: { ar: 'الاستوديو', en: 'Studio' } },
      { id: 'models', href: 'production.html#models', label: { ar: 'الموديلز', en: 'Models' } },
      { id: 'reels', href: 'production.html#reels', label: { ar: 'الريلز', en: 'Reels' } },
    ],
  },
  // Marketing services, and any extra production sections, come from content/sections.json.
  { id: 'marketing', href: 'marketing.html', label: { ar: 'الماركتينج', en: 'Marketing' }, items: [] },
];

// English copy. The Arabic copy lives in the HTML and is captured on load.
const EN = {
  'title.home': 'Glow Production | Marketing and Production', 'title.production': 'Production | Glow Production',
  'title.marketing': 'Marketing | Glow Production', 'title.contact': 'Contact us | Glow Production',
  'hero.eyebrow': 'Marketing × Production',
  'hero.title': 'We make brands glow.',
  'hero.lead': 'A marketing agency and production house under one roof. Strategy, ideas, filming and distribution with one team.',
  'cta.production': 'Production', 'cta.marketing': 'Marketing', 'cta.reel': 'Play showreel', 'cta.contact': 'Contact us',
  'doors.title': 'What do you need?',
  'doors.lead': 'Pick what fits. If you need both, one team does it all.',
  'work.title': 'The work talks.',
  'steps.title': 'How we work',
  'step.1': 'Understand', 'step.1d': 'Brand, audience and goal',
  'step.2': 'Create', 'step.2d': 'Idea, script and plan',
  'step.3': 'Make', 'step.3d': 'Filming, editing and design',
  'step.4': 'Launch and measure', 'step.4d': 'Media, results and tuning',
  'band.title': 'Got an idea? Send it.',
  'prod.tag': 'Production', 'prod.title': 'Production', 'prod.lead': 'An equipped studio, models for your shoot, and reels ready to publish.',
  'studio.tag': 'Studio', 'studio.title': 'Production stays in-house.', 'studio.cta': 'Book the studio',
  'studio.cam': 'Cameras', 'studio.light': 'Lighting', 'studio.edit': 'Editing', 'studio.sound': 'Sound',
  'models.title': 'Models', 'models.cta': 'Request a model',
  'reels.title': 'Reels', 'reels.cta': 'Reels for my brand',
  'mkt.tag': 'Marketing', 'mkt.title': 'Marketing', 'mkt.lead': 'Five services that work together, from defining the message to measuring the result.',
  'mkt.band': 'Not sure where to start?',
  'contact.title': 'Contact us', 'contact.lead': "Write what you know. If it isn't clear yet, we'll work it out together.",
  'contact.phone': 'Mobile and WhatsApp', 'contact.email': 'Email', 'contact.address': 'Address', 'contact.social': 'Follow us',
  'f.name': 'Name', 'f.company': 'Company', 'f.phone': 'Mobile or WhatsApp', 'f.type': 'What do you need?',
  'f.notes': 'Tell us about the project', 'f.send': 'Send on WhatsApp',
};

const UI = {
  ar: {
    skip: 'انتقل للمحتوى', contact: 'تواصل معنا', all: 'الكل', unsure: 'لسه مش متأكد', ask: 'اطلب الخدمة',
    invalid: 'من فضلك اكتب الاسم ورقم الموبايل.',
    sent: 'فتحنالك واتساب. دوس إرسال هناك عشان الرسالة توصلنا.',
    noNumber: 'رقم الواتساب لسه متضافش للموقع، فالرسالة متبعتتش.',
    waName: 'الاسم', waCompany: 'الشركة', waPhone: 'الموبايل', waService: 'الخدمة', waNotes: 'التفاصيل',
    wa: 'كلمنا على واتساب', book: 'احجز', play: 'شغّل الفيديو',
    waHello: 'أهلًا، عاوز أعرف تفاصيل أكتر عن خدماتكم.', waStudio: 'أهلًا، عاوز أحجز الاستوديو.', waModel: 'أهلًا، عاوز أحجز موديل',
    modelsSoon: 'بنجهّز صفحة الموديلز. ابعتلنا نوع التصوير ونرشحلك الموديل المناسب.',
    reelsSoon: 'الريلز جاية هنا قريب. لحد ما تتضاف، شوف أحدث شغلنا على:',
  },
  en: {
    skip: 'Skip to content', contact: 'Contact us', all: 'All', unsure: 'Not sure yet', ask: 'Request this service',
    invalid: 'Please add your name and mobile number.',
    sent: 'WhatsApp is open. Press send there so your message reaches us.',
    noNumber: 'The WhatsApp number has not been added to the site yet, so nothing was sent.',
    waName: 'Name', waCompany: 'Company', waPhone: 'Mobile', waService: 'Service', waNotes: 'Details',
    wa: 'Chat on WhatsApp', book: 'Book', play: 'Play video',
    waHello: "Hi, I'd like to know more about your services.", waStudio: "Hi, I'd like to book the studio.", waModel: "Hi, I'd like to book a model",
    modelsSoon: "We're preparing our models page. Tell us about your shoot and we'll suggest the right model.",
    reelsSoon: 'Reels are coming here soon. Until then, see our latest work on:',
  },
};

const SHAPES = ['wedge', 'diamond', 'vee', 'arrow'];
// Sections from the dashboard: a page, a title, and some text, points or media to show.
// Each keeps its id (used in links and the contact form) or gets one from its English title.
const FIXED_IDS = new Set(['studio', 'models', 'reels', 'services', 'work', 'main', 'top']);
function sectionsFor(pageId) {
  const used = new Set(FIXED_IDS);
  return list(DATA.sections.sections).map((s, n) => {
    const slug = String(s.id || s.title_en || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    let id = slug && !used.has(slug) ? slug : `section-${n + 1}`;
    while (used.has(id)) id += '-x';
    used.add(id);
    return { ...s, id };
  }).filter((s) => s.page === pageId && !s.hide && s.title
    && (s.intro || list(s.points).length || list(s.items).length));
}
const groups = () => NAV.map((g) => ({
  ...g,
  items: [...g.items, ...sectionsFor(g.id).map((s) => ({
    id: s.id, href: `${g.href}#${s.id}`, label: { ar: s.title, en: s.title_en || s.title },
  }))],
}));
const allItems = () => groups().flatMap((g) => g.items);
const labelOf = (id) => allItems().find((i) => i.id === id)?.label[lang] ?? '';
const $ = (id) => document.getElementById(id);
const each = (selector, fn) => document.querySelectorAll(selector).forEach(fn);

const root = document.documentElement;
const page = document.body.dataset.page;
let lang = 'ar';
let filter = 'all';

// Content is typed by people, so it is always escaped, and links must be web addresses or site paths.
const esc = (value) => String(value ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const safeUrl = (value) => {
  const url = String(value ?? '').trim();
  return /^(https?:\/\/|\/(?!\/)|[\w-]+\/)/i.test(url) ? url : '';
};
// Arabic field, or its _en twin in English when it is filled in.
const tx = (item, key) => (lang === 'en' && item?.[`${key}_en`]) || item?.[key] || '';
const list = (value) => (Array.isArray(value) ? value : []);

// Edit mode: the owner opens the site once with ?edit to show a pencil on every editable part
// (it is remembered on that device; ?edit=off turns it off). Pencils only open the dashboard,
// which asks for the GitHub sign-in, so seeing them gives no one access.
// Each pencil opens its own section: the name matches an entry in .pages.yml.
const DASHBOARD = 'https://app.pagescms.org/glowpro15/glow-website/main/file';
const EDITING = (() => {
  const q = new URLSearchParams(location.search).get('edit');
  try {
    if (q === 'off') localStorage.removeItem('glow-edit');
    else if (q !== null) localStorage.setItem('glow-edit', '1');
    return localStorage.getItem('glow-edit') === '1';
  } catch (e) { return q !== null && q !== 'off'; }
})();
const EDIT_LABELS = {
  works: 'الأعمال', models: 'الموديلز', reels: 'الريلز', studio: 'الاستوديو',
  home: 'العملاء والأرقام', site: 'بيانات التواصل والشوريل', sections: 'الأقسام والخدمات',
};
// A content section shows when it has something; in edit mode it also shows empty, marked for the owner.
const showIf = (el, ok) => {
  el.hidden = !ok && !EDITING;
  el.classList.toggle('is-empty', !ok);
};

// Shared header, footer and video dialog
document.body.insertAdjacentHTML('afterbegin', `
  <a class="skip" href="#main" id="skip"></a>
  <header class="header" id="header">
    <a class="logo" href="index.html" aria-label="Glow Production">
      <img id="logoImg" alt="" hidden onerror="this.dataset.bad = this.getAttribute('src'); this.hidden = true">
      <span class="logo__text"><i></i><b>GLOW</b> PRODUCTION</span>
    </a>
    <nav class="nav" id="nav"></nav>
    <div class="header__actions">
      <button class="lang" id="lang" type="button" aria-label="Switch language"></button>
      <a class="btn btn--small" href="contact.html" id="headerContact"></a>
      <button class="menu" id="menu" type="button" aria-expanded="false" aria-controls="nav" aria-label="Menu"><span></span><span></span></button>
    </div>
  </header>`);
document.body.insertAdjacentHTML('beforeend', `
  <footer class="footer">
    <p class="footer__big">GLOW</p>
    <div class="footer__map" id="footerMap"></div>
    <div class="footer__row">
      <p><a class="address" id="footerAddress" target="_blank" rel="noopener"></a></p>
      <p><a id="footerEmail" dir="ltr"></a></p>
      <p class="social" id="footerSocial"></p>
      <p>© ${new Date().getFullYear()} Glow Production</p>
    </div>
  </footer>
  <dialog class="dialog" id="video">
    <button class="dialog__close" id="videoClose" type="button" aria-label="Close">×</button>
    <div class="dialog__frame" id="videoFrame"></div>
  </dialog>
  <a class="wa" id="wa">
    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>`);

if (EDITING) {
  root.classList.add('is-editing');
  each('[data-edit]', (el) => {
    el.insertAdjacentHTML('afterbegin', `<a class="edit-pin" href="${DASHBOARD}/${el.dataset.edit}" target="_blank" rel="noopener">✎ عدّل ${EDIT_LABELS[el.dataset.edit]}</a>`);
  });
  document.body.insertAdjacentHTML('beforeend', '<div class="edit-bar">وضع التعديل شغال <a href="?edit=off">اقفله</a></div>');
}

const translatable = [...document.querySelectorAll('[data-i18n]')];
translatable.forEach((el) => { el.dataset.ar = el.textContent; });

function store(value) {
  try { localStorage.setItem('glow-lang', value); } catch (e) { /* storage unavailable */ }
}
function saved() {
  try { return localStorage.getItem('glow-lang'); } catch (e) { return null; }
}

const whatsapp = () => String(DATA.site.whatsapp || '').replace(/\D/g, '');
function waLink(text) {
  return `https://wa.me/${whatsapp()}?text=${encodeURIComponent(text)}`;
}

// Points a link at WhatsApp with a ready message, or at the contact form if there is no number.
function book(link, type, text) {
  const on = Boolean(whatsapp());
  link.href = on ? waLink(text) : `contact.html?type=${type}`;
  link.target = on ? '_blank' : '';
  link.rel = on ? 'noopener' : '';
}

// YouTube's sharpest widescreen thumbnail first; smaller ones only when a video has no HD version.
const ytThumbs = (id) => ['maxresdefault', 'hq720', 'mqdefault'].map((n) => `https://i.ytimg.com/vi/${id}/${n}.jpg`);
// A card image: an uploaded photo (one source) or a list of thumbnails tried in order.
// YouTube answers a missing size with a 120px grey placeholder, so a tiny image also moves on.
function cardImg(sources, alt = '') {
  const [first, ...rest] = Array.isArray(sources) ? sources : [sources];
  const next = rest.length ? ` data-next="${esc(rest.join(' '))}" onerror="nextThumb(this)" onload="if (this.naturalWidth <= 120) nextThumb(this)"` : '';
  return `<img class="card__img" src="${esc(first)}" alt="${esc(alt)}" loading="lazy"${next}>`;
}
function nextThumb(img) {
  const [next, ...rest] = (img.dataset.next || '').split(' ').filter(Boolean);
  if (!next) { img.onload = null; return; }
  img.dataset.next = rest.join(' ');
  img.src = next;
}

// Turns a YouTube, Vimeo, Instagram or TikTok link into a player. Anything else opens in a new tab.
function player(url) {
  let m;
  if ((m = url.match(/(?:youtube\.com\/(?:watch\?(?:.*&)?v=|shorts\/|embed\/|live\/)|youtu\.be\/)([\w-]{11})/))) {
    return { src: `https://www.youtube-nocookie.com/embed/${m[1]}?autoplay=1&rel=0`, tall: /\/shorts\//.test(url), thumb: ytThumbs(m[1]) };
  }
  if ((m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/))) return { src: `https://player.vimeo.com/video/${m[1]}?autoplay=1` };
  if ((m = url.match(/instagram\.com\/(?:[\w.]+\/)?(?:reels?|p|tv)\/([\w-]+)/))) return { src: `https://www.instagram.com/p/${m[1]}/embed/`, tall: true };
  if ((m = url.match(/tiktok\.com\/@[\w.-]+\/video\/(\d+)/))) return { src: `https://www.tiktok.com/embed/v2/${m[1]}`, tall: true };
  return null;
}

const dialog = $('video');
function openVideo(url) {
  const link = safeUrl(url);
  if (!link) return;
  const p = player(link);
  if (!p) { window.open(link, '_blank', 'noopener'); return; }
  const frame = document.createElement('iframe');
  frame.src = p.src;
  frame.title = UI[lang].play;
  frame.allow = 'autoplay; fullscreen; picture-in-picture; encrypted-media';
  frame.allowFullscreen = true;
  $('videoFrame').replaceChildren(frame);
  dialog.classList.toggle('dialog--tall', Boolean(p.tall));
  dialog.showModal();
}
document.addEventListener('click', (e) => {
  const trigger = e.target.closest('[data-video]');
  if (trigger) openVideo(trigger.dataset.video);
});
$('videoClose').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
dialog.addEventListener('close', () => $('videoFrame').replaceChildren());

function renderChrome() {
  const ui = UI[lang];
  book($('wa'), 'unsure', ui.waHello);
  // Logo uploaded from the dashboard; until there is one, the text logo shows.
  const logo = safeUrl(DATA.site.logo);
  const img = $('logoImg');
  if (logo && img.getAttribute('src') !== logo) img.src = logo;
  img.hidden = !logo || img.dataset.bad === logo;
  $('wa').setAttribute('aria-label', ui.wa);
  $('wa').title = ui.wa;
  $('skip').textContent = ui.skip;
  $('headerContact').textContent = ui.contact;
  $('lang').textContent = lang === 'ar' ? 'EN' : 'ع';
  $('nav').innerHTML = groups().map((g) => `
    <div class="nav__group">
      <a class="nav__top" href="${g.href}"${page === g.id ? ' aria-current="page"' : ''}>${g.label[lang]}</a>
      <div class="nav__panel">${g.items.map((i) => `<a href="${i.href}">${i.label[lang]}</a>`).join('')}</div>
    </div>`).join('') + `<a class="nav__top nav__contact" href="contact.html">${ui.contact}</a>`;
  $('footerMap').innerHTML = groups().map((g) => `
    <div><a class="footer__head" href="${g.href}">${g.label[lang]}</a>
    ${g.items.map((i) => `<a href="${i.href}">${i.label[lang]}</a>`).join('')}</div>`).join('')
    + `<div><a class="footer__head" href="contact.html">${ui.contact}</a></div>`;
}

// Contact details from content/site.json, in the footer and on the contact page.
function renderContact() {
  const s = DATA.site;
  const show = (el, ok) => { (el.closest('.contact-list > div') || el.parentElement).hidden = !ok; };
  const number = whatsapp();
  each('#contactPhone', (a) => {
    a.textContent = s.phone || (number && `+${number}`);
    a.href = `tel:+${number}`;
    show(a, Boolean(number));
  });
  const email = /^[^\s@]+@[^\s@]+$/.test(s.email || '') ? s.email : '';
  each('#footerEmail, #contactEmail', (a) => {
    a.textContent = email;
    a.href = `mailto:${email}`;
    show(a, Boolean(email));
  });
  const address = tx(s, 'address');
  each('#footerAddress, #contactAddress', (a) => {
    a.textContent = address;
    const map = safeUrl(s.map);
    if (map) a.href = map; else a.removeAttribute('href');
    show(a, Boolean(address));
  });
  const social = [['Instagram', s.instagram], ['Facebook', s.facebook], ['TikTok', s.tiktok], ['YouTube', s.youtube]]
    .map(([name, url]) => [name, safeUrl(url)]).filter(([, url]) => url);
  each('#footerSocial, #contactSocial', (box) => {
    box.innerHTML = social.map(([name, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${name}</a>`).join('');
    show(box, social.length > 0);
  });
}

function renderHome() {
  if (page !== 'home') return;
  const s = DATA.site, h = DATA.home;
  const reel = $('showreel');
  reel.hidden = !safeUrl(s.showreel);
  reel.dataset.video = safeUrl(s.showreel);

  const clients = list(h.clients).filter((c) => c.name || c.logo);
  showIf($('clients'), clients.length > 0);
  if (clients.length) {
    const one = clients.map((c) => (safeUrl(c.logo)
      ? `<img src="${esc(safeUrl(c.logo))}" alt="${esc(c.name)}" loading="lazy">`
      : `<span>${esc(c.name)}</span>`)).join('');
    // Repeat the logos so the moving strip never shows a gap.
    const set = one.repeat(Math.ceil(8 / clients.length));
    $('clientsTrack').innerHTML = `<div class="clients__set">${set}</div><div class="clients__set" aria-hidden="true">${set}</div>`;
  }

  const stats = list(h.stats).filter((x) => x.number);
  $('stats').hidden = !stats.length;
  $('stats').innerHTML = stats.map((x) => `<div><b>${esc(x.number)}</b><span>${esc(tx(x, 'label'))}</span></div>`).join('');
  const quote = tx(h, 'quote');
  $('quote').hidden = !quote;
  $('quoteText').textContent = quote;
  $('quoteBy').textContent = h.quote_by || '';
  showIf($('proof'), stats.length > 0 || Boolean(quote));
}

function renderWork() {
  const grid = $('grid');
  if (!grid) return;
  const ui = UI[lang];
  const works = list(DATA.works.works).filter((w) => w.title);
  showIf($('work'), works.length > 0);
  const cats = [...new Set(works.map((w) => w.category).filter(labelOf))];
  if (filter !== 'all' && !cats.includes(filter)) filter = 'all';
  const box = $('filters');
  box.innerHTML = '';
  box.hidden = cats.length < 2;
  ['all', ...cats].forEach((id) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = id === 'all' ? ui.all : labelOf(id);
    b.setAttribute('aria-pressed', String(id === filter));
    b.addEventListener('click', () => { filter = id; renderWork(); });
    box.append(b);
  });
  grid.innerHTML = works.map((w, n) => ({ w, n })).filter(({ w }) => filter === 'all' || w.category === filter)
    .map(({ w, n }) => mediaCard(w, n, { tag: labelOf(w.category), meta: [w.client, tx(w, 'result')], wide: w.big && filter === 'all' }))
    .join('');
}

// One project or media card: photo (or the video's own thumbnail), title, and a play button for videos.
function mediaCard(item, n, { tag = '', meta = [], wide = false } = {}) {
  const video = safeUrl(item.video);
  const image = safeUrl(item.image) || (video && player(video)?.thumb) || '';
  const title = tx(item, 'title');
  const info = meta.filter(Boolean).map(esc).join(' · ');
  return `
    <article class="card card--${n % 3 === 1 ? 'yellow' : 'dark'}${image ? ' card--photo' : ''}${wide ? ' card--wide' : ''}" style="--poly:var(--${SHAPES[n % 4]})">
      ${image ? cardImg(image) : '<span class="card__art"></span>'}
      <div class="card__body">
        ${tag ? `<span class="card__cat">${esc(tag)}</span>` : ''}
        ${title ? `<h3>${esc(title)}</h3>` : ''}
        ${info ? `<span class="card__meta">${info}</span>` : ''}
      </div>
      ${video ? `<button class="card__link" type="button" data-video="${esc(video)}" aria-label="${esc(title ? `${UI[lang].play}: ${title}` : UI[lang].play)}"><span class="reel__icon"></span></button>` : ''}
    </article>`;
}

const mediaGrid = (items) => {
  const media = list(items).filter((i) => safeUrl(i.image) || safeUrl(i.video));
  return media.length ? `<div class="grid section-media">${media.map((i, n) => mediaCard(i, n)).join('')}</div>` : '';
};
const pointsList = (s) => {
  const points = (lang === 'en' && list(s.points_en).length ? list(s.points_en) : list(s.points)).filter(Boolean);
  return points.length ? `<ul>${points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>` : '';
};

function renderSubnav() {
  const box = $('subnav');
  if (!box) return;
  const group = groups().find((g) => g.id === page);
  const items = group.items.filter((i) => !$(i.id)?.hidden);
  box.hidden = items.length < 2;
  box.innerHTML = items.map((i) => `<a href="#${i.id}">${i.label[lang]}</a>`).join('');
}

function renderServices() {
  const box = $('services');
  if (!box || page !== 'marketing') return;
  const services = sectionsFor('marketing');
  showIf(box, services.length > 0);
  box.innerHTML = services.map((s, n) => `
    <article class="svc" id="${s.id}">
      <span class="svc__num">${String(n + 1).padStart(2, '0')}</span>
      <div><h2>${esc(tx(s, 'title'))}</h2>${tx(s, 'intro') ? `<p class="lead">${esc(tx(s, 'intro'))}</p>` : ''}</div>
      <div>
        ${pointsList(s)}
        <a class="btn btn--ghost btn--small" href="contact.html?type=${s.id}">${UI[lang].ask}</a>
      </div>
      ${mediaGrid(s.items)}
    </article>`).join('');
}

// Extra production sections added from the dashboard (Podcast, for example), after the reels.
function renderExtraSections() {
  const box = $('extraSections');
  if (!box) return;
  const extra = sectionsFor('production');
  showIf(box, extra.length > 0);
  box.innerHTML = extra.map((s, n) => `
    <section class="section extra${n % 2 ? ' section--dark' : ''}" id="${s.id}">
      <div class="section__head">
        <div><h2>${esc(tx(s, 'title'))}</h2>${tx(s, 'intro') ? `<p class="lead">${esc(tx(s, 'intro'))}</p>` : ''}</div>
        <a class="btn${n % 2 ? '' : ' btn--ghost'}" href="contact.html?type=${s.id}">${UI[lang].ask}</a>
      </div>
      ${pointsList(s) ? `<div class="extra__points">${pointsList(s)}</div>` : ''}
      ${mediaGrid(s.items)}
    </section>`).join('');
}

function renderProduction() {
  if (page !== 'production') return;
  const ui = UI[lang];

  const st = DATA.studio;
  const photos = list(st.photos).map(safeUrl).filter(Boolean).slice(0, 4);
  $('studioPhotos').classList.toggle('studio__art--photos', photos.length > 0);
  $('studioPhotos').innerHTML = photos.map((src) => `<img src="${esc(src)}" alt="" loading="lazy">`).join('');
  let gear = 0;
  each('[data-gear]', (row) => {
    const value = tx(st, row.dataset.gear);
    row.querySelector('dd').textContent = value;
    row.hidden = !value;
    if (value) gear += 1;
  });
  $('gear').hidden = !gear;
  book($('studioBook'), 'studio', ui.waStudio);

  const models = list(DATA.models.models).filter((m) => m.name || m.photo);
  // Models and reels always show; until they have content, a short note stands in.
  $('models').hidden = false;
  $('modelsGrid').innerHTML = models.length ? '' : `<p class="empty-note">${ui.modelsSoon}</p>`;
  $('modelsGrid').innerHTML += models.map((m, n) => {
    const photo = safeUrl(m.photo);
    return `
      <article class="model model--${n % 3 === 1 ? 'yellow' : 'dark'}${photo ? ' model--photo' : ''}" style="--poly:var(--${SHAPES[n % 4]})">
        ${photo ? `<img class="card__img" src="${esc(photo)}" alt="${esc(m.name)}" loading="lazy">` : '<span class="card__art"></span>'}
        <div class="card__body"><h3>${esc(m.name)}</h3>${tx(m, 'work') ? `<p>${esc(tx(m, 'work'))}</p>` : ''}</div>
        <a class="btn btn--small">${ui.book}</a>
      </article>`;
  }).join('');
  $('modelsGrid').querySelectorAll('.btn').forEach((link, n) => {
    const name = models[n].name;
    book(link, 'models', name ? `${ui.waModel} (${name})` : ui.waModel);
  });

  const reels = list(DATA.reels.reels).filter((r) => safeUrl(r.url));
  $('reels').hidden = false;
  const social = [['Instagram', DATA.site.instagram], ['TikTok', DATA.site.tiktok], ['YouTube', DATA.site.youtube]]
    .map(([name, url]) => [name, safeUrl(url)]).filter(([, url]) => url);
  $('reelsGrid').innerHTML = reels.length ? '' : `<p class="empty-note">${ui.reelsSoon}
    <span class="social">${social.map(([name, url]) => `<a href="${esc(url)}" target="_blank" rel="noopener">${name}</a>`).join('')}</span></p>`;
  $('reelsGrid').innerHTML += reels.map((r, n) => {
    const url = safeUrl(r.url);
    const cover = safeUrl(r.cover) || player(url)?.thumb || '';
    const title = tx(r, 'title');
    return `
      <button class="reel-card reel-card--${n % 2 ? 'beige' : 'yellow'}${cover ? ' reel-card--photo' : ''}" type="button" data-video="${esc(url)}" aria-label="${esc(title ? `${ui.play}: ${title}` : ui.play)}">
        ${cover ? cardImg(cover) : ''}
        <span class="reel__icon" aria-hidden="true"></span>
        ${title ? `<span class="reel-card__title">${esc(title)}</span>` : ''}
      </button>`;
  }).join('');
}

function renderTypeOptions() {
  const select = $('typeSelect');
  if (!select) return;
  const asked = new URLSearchParams(location.search).get('type');
  const current = (select.dataset.touched && select.value) || asked || select.value || 'unsure';
  select.onchange = () => { select.dataset.touched = '1'; };
  select.innerHTML = groups().map((g) => `
    <optgroup label="${g.label[lang]}">
      ${g.items.map((i) => `<option value="${i.id}">${i.label[lang]}</option>`).join('')}
    </optgroup>`).join('') + `<option value="unsure">${UI[lang].unsure}</option>`;
  select.value = allItems().some((i) => i.id === current) ? current : 'unsure';
}

function render() {
  root.lang = lang;
  root.dir = lang === 'ar' ? 'rtl' : 'ltr';
  translatable.forEach((el) => {
    el.textContent = lang === 'ar' ? el.dataset.ar : (EN[el.dataset.i18n] ?? el.dataset.ar);
  });
  renderChrome();
  renderContact();
  renderDoors();
  renderHome();
  renderWork();
  renderServices();
  renderProduction();
  renderExtraSections();
  renderSubnav();
  renderTypeOptions();
}

function setLang(next) {
  lang = next;
  render();
  if ($('formMsg')) $('formMsg').textContent = '';
  store(next);
}

function renderDoors() {
  const box = $('doors');
  if (!box) return;
  box.innerHTML = groups().map((g, n) => `
    <article class="door door--${n ? 'yellow' : 'dark'}">
      <h3><a href="${g.href}">${g.label[lang]}</a></h3>
      <ul>${g.items.map((i) => `<li><a href="${i.href}">${i.label[lang]}</a></li>`).join('')}</ul>
    </article>`).join('');
}

$('lang').addEventListener('click', () => setLang(lang === 'ar' ? 'en' : 'ar'));

// Mobile menu
const menu = $('menu');
const nav = $('nav');
function toggleMenu(open) {
  menu.setAttribute('aria-expanded', String(open));
  nav.classList.toggle('is-open', open);
  document.body.style.overflow = open ? 'hidden' : '';
}
menu.addEventListener('click', () => toggleMenu(menu.getAttribute('aria-expanded') !== 'true'));
nav.addEventListener('click', (e) => { if (e.target.closest('a')) toggleMenu(false); });

// Header background: solid on inner pages, and after scrolling on the home page
const onScroll = () => $('header').classList.toggle('is-solid', page !== 'home' || window.scrollY > 40);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px' });
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-in'));
}

// Contact form: opens WhatsApp with the visitor's details as a ready-to-send message.
function whatsappUrl(form) {
  const ui = UI[lang];
  const select = form.elements.type;
  const rows = [
    [ui.waName, form.elements.name.value],
    [ui.waCompany, form.elements.company.value],
    [ui.waPhone, form.elements.phone.value],
    [ui.waService, select.options[select.selectedIndex].text],
    [ui.waNotes, form.elements.notes.value],
  ];
  const text = rows.filter(([, v]) => v.trim()).map(([k, v]) => `${k}: ${v.trim()}`).join('\n');
  return waLink(text);
}

const form = $('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    let ok = true;
    form.querySelectorAll('[required]').forEach((f) => {
      const bad = !f.value.trim();
      f.classList.toggle('is-bad', bad);
      if (bad) ok = false;
    });
    if (!ok) { $('formMsg').textContent = UI[lang].invalid; return; }
    if (!whatsapp()) { $('formMsg').textContent = UI[lang].noNumber; return; }
    window.open(whatsappUrl(form), '_blank', 'noopener');
    $('formMsg').textContent = UI[lang].sent;
  });
  form.addEventListener('input', (e) => {
    if (e.target.value.trim()) e.target.classList.remove('is-bad');
  });
}

lang = saved() === 'en' ? 'en' : 'ar';
render();

// Load the content files, then draw the parts of the page that use them.
Promise.all(CONTENT.map((name) => fetch(`content/${name}.json`, { cache: 'no-cache' })
  .then((r) => (r.ok ? r.json() : {}))
  .catch(() => ({}))
  .then((json) => { DATA[name] = json && typeof json === 'object' ? json : {}; })))
  .then(() => {
    render();
    // Sections drawn from content exist only now, so jump to the requested one.
    if (location.hash) {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target) target.scrollIntoView();
    }
  });
