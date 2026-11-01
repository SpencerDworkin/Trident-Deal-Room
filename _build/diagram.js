/* The platform at a glance. Drawn as a row for desktop and a column for phones. */
const STAGES = [
  ['Data', 'Public records across our markets, gathered and refreshed daily'],
  ['Intelligence', 'Proprietary models identify where price and value diverge'],
  ['Underwriting', 'Every opportunity is reviewed by a principal before capital moves'],
  ['Acquisition', 'All cash. Priced to a ceiling set in advance, never in the room'],
  ['Operations', 'Stabilized and leased for durable, government supported income'],
];
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function wrap(d, max) { const out = []; let line = ''; for (const w of d.split(' ')) { if ((line + ' ' + w).trim().length > max) { out.push(line.trim()); line = w; } else line += ' ' + w; } out.push(line.trim()); return out; }
function row() {
  const n = STAGES.length, W = 1200, bw = 206, gap = (W - n * bw) / (n - 1), H = 150;
  let out = `<svg class="pipe row" viewBox="0 0 ${W} ${H}" role="img" aria-label="The Trident platform, from data to operations">`;
  STAGES.forEach(([t, d], i) => {
    const x = i * (bw + gap), human = i >= 2;
    out += `<g class="${human ? 'st human' : 'st'}"><rect x="${x}" y="0" width="${bw}" height="${H}" rx="3"/>`;
    out += `<text class="n" x="${x + 16}" y="30">0${i + 1}</text><text class="t" x="${x + 16}" y="58">${esc(t)}</text>`;
    let ly = 82; wrap(d, 29).slice(0, 4).forEach(l => { out += `<text class="d" x="${x + 16}" y="${ly}">${esc(l)}</text>`; ly += 17; });
    out += `</g>`;
    if (i < n - 1) out += `<path class="arrow" d="M${x + bw + 4} ${H / 2} h${gap - 8}"/><path class="head" d="M${x + bw + gap - 10} ${H / 2 - 5} l8 5 l-8 5 z"/>`;
  });
  return out + `</svg>`;
}
function column() {
  const n = STAGES.length, W = 360, bh = 96, gap = 26, H = n * bh + (n - 1) * gap;
  let out = `<svg class="pipe col" viewBox="0 0 ${W} ${H}" role="img" aria-label="The Trident platform, from data to operations">`;
  STAGES.forEach(([t, d], i) => {
    const y = i * (bh + gap), human = i >= 2;
    out += `<g class="${human ? 'st human' : 'st'}"><rect x="0" y="${y}" width="${W}" height="${bh}" rx="3"/>`;
    out += `<text class="n" x="14" y="${y + 26}">0${i + 1}</text><text class="t" x="52" y="${y + 26}">${esc(t)}</text>`;
    let ly = y + 50; wrap(d, 44).slice(0, 2).forEach(l => { out += `<text class="d" x="14" y="${ly}">${esc(l)}</text>`; ly += 17; });
    out += `</g>`;
    if (i < n - 1) out += `<path class="arrow" d="M${W / 2} ${y + bh + 3} v${gap - 8}"/><path class="head" d="M${W / 2 - 5} ${y + bh + gap - 9} l5 8 l5 -8 z"/>`;
  });
  return out + `</svg>`;
}
module.exports = { pipeline: () => `<div class="pipeline">${row()}${column()}</div>` };
