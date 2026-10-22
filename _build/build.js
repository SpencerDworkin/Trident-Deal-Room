#!/usr/bin/env node
/* Assemble the Trident site.
 *
 * Each page in ./pages exports { path, nav, title, description, body }, where
 * body is a function of the relative prefix back to the site root — '' for
 * the home page, '../' for everything else — so every link and asset works
 * whether the site is served from a sub-path or a domain of its own.
 *
 * Output: index.html at the root and <path>/index.html for each inner page,
 * plus assets/site.css. This directory starts with an underscore, so the
 * host's Jekyll pass leaves it out of the published site.
 *
 *   node _build/build.js
 */
const fs = require('fs');
const path = require('path');

const ROOT = path.resolve(__dirname, '..');
const read = f => fs.readFileSync(path.join(__dirname, f), 'utf8');

const PAGES = ['home', 'strategy', 'fund', 'method', 'markets', 'principals', 'contact', 'legal']
  .map(n => require('./pages/' + n));

const NAV = [
  ['strategy', 'Strategy'],
  ['fund', 'The fund'],
  ['method', 'Method'],
  ['markets', 'Markets'],
  ['principals', 'Principals'],
];

/* Paths that were once live and now live elsewhere. A link in someone's
   inbox should land, not 404. */
const MOVED = { preferred: 'fund' };

const FAVICON = 'data:image/svg+xml,' + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">' +
  '<rect width="32" height="32" rx="6" fill="#0d1520"/>' +
  '<text x="16" y="23" font-size="19" text-anchor="middle" fill="#7fb0e0">Ψ</text></svg>');

const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function shell(p) {
  const r = p.path ? '../' : '';
  const cur = k => (p.nav === k ? ' aria-current="page"' : '');
  const links = NAV.map(([k, t]) => `<a href="${r}${k}/"${cur(k)}>${t}</a>`).join('\n      ');

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${esc(p.title)}</title>
<meta name="description" content="${esc(p.description)}">
<meta name="theme-color" content="#0d1520">
<link rel="icon" href="${FAVICON}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Public+Sans:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Source+Serif+4:opsz,wght@8..60,400;8..60,600;8..60,700&family=IBM+Plex+Mono:wght@400;500;600&display=swap">
<link rel="stylesheet" href="${r}assets/site.css">
</head>
<body>

<header class="nav">
  <div class="nav-in">
    <a class="brand" href="${r}"><span class="g">&#936;</span>TRIDENT<small>A Pursuit Lending Partners company</small></a>
    <nav class="links" aria-label="Sections">
      ${links}
    </nav>
    <a class="cta ghost" href="${r}contact/">Request the materials</a>
  </div>
</header>
<nav class="subnav" aria-label="Sections">
  <div class="wrap">
    ${NAV.map(([k, t]) => `<a href="${r}${k}/"${cur(k)}>${t}</a>`).join('\n    ')}
    <a href="${r}contact/"${cur('contact')}>Contact</a>
  </div>
</nav>

<main>
${p.body(r)}
</main>

<footer class="foot">
  <div class="wrap">
    <div class="foot-grid">
      <div>
        <div class="brand"><span class="g">&#936;</span>TRIDENT<small>A Pursuit Lending Partners company</small></div>
        <p class="legal"><b>Not an offer.</b> This site is informational. Any offering of interests in the fund is made only to
          accredited investors and qualified purchasers, only by confidential private placement memorandum, and only where
          permitted. Trident is newly formed and has no operating history or assets under management. Figures describing
          the screened book describe the screen, not returns. <a href="${r}legal/">Full disclosures</a>.</p>
      </div>
      <div>
        <h4>The program</h4>
        <ul>
          <li><a href="${r}strategy/">Strategy</a></li>
          <li><a href="${r}fund/">The fund</a></li>
          <li><a href="${r}method/">Method</a></li>
          <li><a href="${r}markets/">Markets</a></li>
        </ul>
      </div>
      <div>
        <h4>The firm</h4>
        <ul>
          <li><a href="${r}principals/">Principals</a></li>
          <li><a href="${r}contact/">Request the materials</a></li>
          <li><a href="${r}legal/">Disclosures</a></li>
          <li><a href="${r}desk/">Deal room &middot; partners only</a></li>
        </ul>
      </div>
    </div>
    <div class="row">
      <span>&copy; 2026 Trident &middot; A Pursuit Lending Partners company</span>
      <span>New York &middot; New Jersey &middot; Pennsylvania &middot; Connecticut &middot; Florida</span>
    </div>
  </div>
</footer>

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
