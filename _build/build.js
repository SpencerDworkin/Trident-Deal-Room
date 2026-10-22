#!/usr/bin/env node
/* Assemble the Trident site.
 *
 * Each page in ./pages exports { path, nav, title, description, body }, where
 * body is a function of the relative prefix back to the site root — '' for
 * the home page, '../' for everything else — so every link and asset works
 * whether the site is served from a sub-path or a domain of its own.
 *
 * The shell is the Pursuit house style: paper field, one serif voice, a fixed
 * rail on the left, hairline rules. Trident is a Pursuit Lending Partners
 * company and its site reads as the parent's does.
 *
 *   node _build/build.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(__dirname, f), 'utf8');

const PAGES = ['home', 'what-we-do', 'how-we-buy', 'where', 'investors', 'about', 'contact', 'legal']
  .map(n => require('./pages/' + n));

/* [slug, label, icon] — the icon is a 24-box line drawing, stroked in currentColor. */
const NAV = [
  ['', 'Home', '<path d="M3 11l9-8 9 8"/><path d="M5 10v10h14V10"/>'],
  ['what-we-do', 'What we do', '<path d="M3 21h8"/><path d="M7 21v-4"/><path d="M13.5 4.5l6 6-5 5-6-6z"/><path d="M11 10l-7 7"/>'],
  ['how-we-buy', 'How we buy', '<path d="M4 6h3M4 12h3M4 18h3M10 6h10M10 12h10M10 18h10"/>'],
  ['where', 'Where', '<path d="M12 21s7-6.5 7-11a7 7 0 0 0-14 0c0 4.5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/>'],
  ['investors', 'Investors', '<path d="M3 21h18M5 21V10M9 21V10M15 21V10M19 21V10M3 10l9-6 9 6"/>'],
  ['about', 'About', '<circle cx="9" cy="8" r="3.5"/><path d="M2.5 20a6.5 6.5 0 0 1 13 0"/><path d="M16 4a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-5-6.3"/>'],
  ['contact', 'Contact', '<path d="M3 6h18v12H3z"/><path d="M3 7l9 6 9-6"/>'],
];

/* Paths that were once live and now live elsewhere. A link in someone's
   inbox should land, not 404. */
const MOVED = {
  preferred: 'investors',
  fund: 'investors',
  strategy: 'what-we-do',
  method: 'how-we-buy',
  markets: 'where',
  principals: 'about',
};

const MARK = `<svg class="mark" viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" stroke-width="7" stroke-linecap="round" stroke-linejoin="round"><path d="M50 96V62"/><path d="M24 56c0 12 11 16 26 16s26-4 26-16"/><path d="M24 56V26M50 50V18M76 56V26"/><path d="M38 88h24"/></g><g fill="currentColor"><polygon points="14,30 24,10 34,30"/><polygon points="40,22 50,2 60,22"/><polygon points="66,30 76,10 86,30"/></g></svg>`;

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function shell(p) {
  const r = p.path ? '../' : '';
  const on = k => (p.nav === k ? ' class="on" aria-current="page"' : '');
  const rail = NAV.filter(([k]) => k).map(([k, t]) =>
    `<a href="${r}${k}/"${on(k)}>${t}</a>`).join('\n      ');
  const strip = NAV.map(([k, t]) => `<a href="${r}${k ? k + '/' : ''}"${on(k)}>${t}</a>`).join('');
  const foot = NAV.filter(([k]) => k).map(([k, t]) => `<a href="${r}${k}/">${t}</a>`).join('');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Trident">
<meta property="og:title" content="${esc(p.title)}">
<meta property="og:description" content="${esc(p.description)}">
<meta property="og:image" content="${r}assets/img/hero-street.jpg">
<meta name="theme-color" content="#0b1a2b">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%20100%20100%22%3E%3Crect%20width%3D%22100%22%20height%3D%22100%22%20fill%3D%22%230b1a2b%22%2F%3E%3Cg%20fill%3D%22none%22%20stroke%3D%22%23c9a86f%22%20stroke-width%3D%227%22%20stroke-linecap%3D%22round%22%3E%3Cpath%20d%3D%22M50%2090V62%22%2F%3E%3Cpath%20d%3D%22M26%2056c0%2012%2010%2016%2024%2016s24-4%2024-16%22%2F%3E%3Cpath%20d%3D%22M26%2056V28M50%2050V22M74%2056V28%22%2F%3E%3C%2Fg%3E%3Cg%20fill%3D%22%23c9a86f%22%3E%3Cpolygon%20points%3D%2217%2C32%2026%2C14%2035%2C32%22%2F%3E%3Cpolygon%20points%3D%2241%2C26%2050%2C8%2059%2C26%22%2F%3E%3Cpolygon%20points%3D%2265%2C32%2074%2C14%2083%2C32%22%2F%3E%3C%2Fg%3E%3C%2Fsvg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;1,400&family=Manrope:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="${r}assets/site.css">
</head>
<body>

<header class="top${p.path ? '' : ''}" id="top">
  <div class="wrap">
    <a class="brand" href="${r}" aria-label="Trident home">${MARK}<span><b>Trident</b><i>A Pursuit Lending Partners company</i></span></a>
    <nav aria-label="Sections">
      ${rail}
    </nav>
    <a class="tcta" href="${r}contact/">Contact</a>
    <button class="burger" type="button" aria-label="Menu" aria-expanded="false" aria-controls="mnav"><svg viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
  </div>
</header>
<nav class="mnav" id="mnav" aria-label="Sections">${strip}<a class="tcta" href="${r}contact/">Contact</a></nav>

<main>
${p.body(r)}
</main>

<footer>
  <div class="wrap">
    <div>
      <a class="brand" href="${r}">${MARK}<span><b>Trident</b><i>A Pursuit Lending Partners company</i></span></a>
      <p class="fabout">A private real estate investment firm acquiring one-to-four-unit homes at New Jersey sheriff&rsquo;s sales and holding them under Housing Choice Voucher tenancy.</p>
    </div>
    <div class="fcol"><h4>Firm</h4>${foot}</div>
    <div class="fcol"><h4>Investors</h4><a href="${r}investors/">The fund</a><a href="${r}contact/">Request the memorandum</a><a href="${r}legal/">Disclosures</a><a href="mailto:sgd3210@gmail.com?subject=Trident">sgd3210@gmail.com</a></div>
    <p class="legal">&copy; 2026 Trident. Nothing on this website constitutes an offer to sell, or a solicitation of an offer to buy, any security or interest in any fund. Any offering is made only by a confidential private placement memorandum to accredited investors and qualified purchasers. Trident is newly formed and has no operating history and no assets under management. Figures describing the screened book describe Trident&rsquo;s screening process applied to public foreclosure calendars; they are not a record of acquisitions or returns. <a href="${r}legal/">Full disclosures.</a></p>
  </div>
</footer>

<script>
(function(){
  var top=document.getElementById('top'),b=document.querySelector('.burger'),m=document.getElementById('mnav');
  function onScroll(){top.classList.toggle('solid',window.scrollY>40)}
  window.addEventListener('scroll',onScroll,{passive:true});onScroll();
  document.querySelectorAll('.photo img').forEach(function(i){i.addEventListener('error',function(){i.classList.add('missing')});if(i.complete&&i.naturalWidth===0)i.classList.add('missing')});
  b.addEventListener('click',function(){var o=m.classList.toggle('open');b.setAttribute('aria-expanded',o);top.classList.toggle('solid',o||window.scrollY>40);document.body.style.overflow=o?'hidden':''});
})();
</script>
</body>
</html>
`;
}

fs.mkdirSync(path.join(ROOT, 'assets'), { recursive: true });
fs.writeFileSync(path.join(ROOT, 'assets', 'site.css'), read('site.css'));

for (const p of PAGES) {
  const out = p.path ? path.join(ROOT, p.path, 'index.html') : path.join(ROOT, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const html = shell(p);
  // Liquid syntax in the output would be mangled by the host; keep it out.
  if (/\{\{|\{%/.test(html)) { console.error(`REFUSING ${p.path || '/'}: Liquid-like braces in output`); process.exit(1); }
  fs.writeFileSync(out, html);
  console.log(`${(p.path || '/').padEnd(12)} ${(html.length / 1024).toFixed(0).padStart(3)}KB  ${p.title}`);
}

for (const [from, to] of Object.entries(MOVED)) {
  const out = path.join(ROOT, from, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta http-equiv="refresh" content="0; url=../${to}/">
<meta name="robots" content="noindex">
<link rel="canonical" href="../${to}/">
<title>Trident</title>
</head>
<body><p>This page has moved to <a href="../${to}/">../${to}/</a>.</p></body>
</html>
`);
  console.log(`${from.padEnd(12)}   → ${to}/  (redirect)`);
}
