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
  ['contact', 'Contact'],
];

/* Paths that were once live and now live elsewhere. A link in someone's
   inbox should land, not 404. */
const MOVED = { preferred: 'fund' };

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
<meta name="theme-color" content="#15171a">
<link rel="icon" href="data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%2315171a%22%2F%3E%3Ctext%20x%3D%2216%22%20y%3D%2222%22%20font-family%3D%22Georgia%2Cserif%22%20font-weight%3D%22600%22%20font-size%3D%2218%22%20text-anchor%3D%22middle%22%20fill%3D%22%23ffffff%22%3ET%3C%2Ftext%3E%3C%2Fsvg%3E">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Source+Serif+4:ital,opsz,wght@0,8..60,400;0,8..60,600;1,8..60,400&family=Public+Sans:wght@500;600&family=IBM+Plex+Mono:wght@400;500&display=swap">
<link rel="stylesheet" href="${r}assets/site.css">
</head>
<body>

<header class="mast">
  <div class="wrap">
    <a class="wordmark" href="${r}">Trident<small>A Pursuit Lending Partners company</small></a>
    <nav aria-label="Sections">
      ${links}
    </nav>
  </div>
</header>

<main>
${p.body(r)}
</main>

<footer class="foot">
  <div class="wrap">
    <span>&copy; 2026 Trident. Not an offer; see the <a href="${r}legal/">disclosures</a>. Newly formed, no assets under management.</span>
    <span><a href="${r}desk/">Deal room</a> &middot; partners only</span>
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
