/* How a deal moves through Trident. A row on desktop, a column on phones. */
const STAGES = [
  ['Source', 'Our platform reads the market daily and flags property priced below its worth'],
  ['Underwrite', 'A principal walks the property, reads the leases and sets the price we will pay'],
  ['Acquire', 'We close with our own capital and a small group of investors we know'],
  ['Operate', 'Patel Legacy Properties manages the asset. Distributions come from income'],
];
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function wrap(d, max) { const out = []; let line = ''; for (const w of d.split(' ')) { if ((line + ' ' + w).trim().length > max) { out.push(line.trim()); line = w; } else line += ' ' + w; } out.push(line.trim()); return out; }
function row() {
  const n = STAGES.length, W = 1200, bw = 264, gap = (W - n * bw) / (n - 1), H = 150;
  let out = `<svg class="pipe row" viewBox="0 0 ${W} ${H}" role="img" aria-label="How a deal moves through Trident">`;
  STAGES.forEach(([t, d], i) => {
    const x = i * (bw + gap), human = i >= 1;
    out += `<g class="${human ? 'st human' : 'st'}"><rect x="${x}" y="0" width="${bw}" height="${H}" rx="3"/>`;
    out += `<text class="n" x="${x + 16}" y="30">0${i + 1}</text><text class="t" x="${x + 16}" y="58">${esc(t)}</text>`;
    let ly = 82; wrap(d, 38).slice(0, 4).forEach(l => { out += `<text class="d" x="${x + 16}" y="${ly}">${esc(l)}</text>`; ly += 17; });
    out += `</g>`;
    if (i < n - 1) out += `<path class="arrow" d="M${x + bw + 4} ${H / 2} h${gap - 8}"/><path class="head" d="M${x + bw + gap - 10} ${H / 2 - 5} l8 5 l-8 5 z"/>`;
  });
  return out + `</svg>`;
}
function column() {
  const n = STAGES.length, W = 360, bh = 96, gap = 26, H = n * bh + (n - 1) * gap;
  let out = `<svg class="pipe col" viewBox="0 0 ${W} ${H}" role="img" aria-label="How a deal moves through Trident">`;
  STAGES.forEach(([t, d], i) => {
    const y = i * (bh + gap), human = i >= 1;
    out += `<g class="${human ? 'st human' : 'st'}"><rect x="0" y="${y}" width="${W}" height="${bh}" rx="3"/>`;
    out += `<text class="n" x="14" y="${y + 26}">0${i + 1}</text><text class="t" x="52" y="${y + 26}">${esc(t)}</text>`;
    let ly = y + 50; wrap(d, 44).slice(0, 2).forEach(l => { out += `<text class="d" x="14" y="${ly}">${esc(l)}</text>`; ly += 17; });
    out += `</g>`;
    if (i < n - 1) out += `<path class="arrow" d="M${W / 2} ${y + bh + 3} v${gap - 8}"/><path class="head" d="M${W / 2 - 5} ${y + bh + gap - 9} l5 8 l5 -8 z"/>`;
  });
  return out + `</svg>`;
}
module.exports = { pipeline: () => `<div class="pipeline">${row()}${column()}</div>` };
