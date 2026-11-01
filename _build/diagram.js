/* The sourcing pipeline, drawn twice: a row for desktop, a column for phones. */
const STAGES = [
  ['Calendars', 'Every scheduled sale, six county sheriffs, pulled daily'],
  ['Dockets', 'Case, judgment amount, plaintiff, sale date and every adjournment'],
  ['Records', 'Assessor value, county median, HUD Fair Market Rent, lender identity'],
  ['Score & refuse', 'Nine written rules. Debt ÷ median. 37% refused before a person looks'],
  ['Ranked book', 'A shortlist with the reasons attached, handed to the principals'],
  ['Underwrite & bid', 'Title, liens, occupancy, ceiling. A principal attends. The model never bids'],
];
const esc = s => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
function row() {
  const n = STAGES.length, W = 1200, bw = 170, gap = (W - n * bw) / (n - 1), H = 150;
  let out = `<svg class="pipe row" viewBox="0 0 ${W} ${H}" role="img" aria-label="The sourcing pipeline, from county calendars to a bid">`;
  STAGES.forEach(([t, d], i) => {
    const x = i * (bw + gap), human = i === n - 1;
    out += `<g class="${human ? 'st human' : 'st'}"><rect x="${x}" y="0" width="${bw}" height="${H}" rx="3"/>`;
    out += `<text class="n" x="${x + 14}" y="30">0${i + 1}</text><text class="t" x="${x + 14}" y="58">${esc(t)}</text>`;
    const words = d.split(' '); let line = '', ly = 82; const lines = [];
    for (const w of words) { if ((line + ' ' + w).trim().length > 24) { lines.push(line.trim()); line = w; } else line += ' ' + w; }
    lines.push(line.trim());
    lines.slice(0, 4).forEach(l => { out += `<text class="d" x="${x + 14}" y="${ly}">${esc(l)}</text>`; ly += 17; });
    out += `</g>`;
    if (i < n - 1) out += `<path class="arrow" d="M${x + bw + 4} ${H / 2} h${gap - 8}"/><path class="head" d="M${x + bw + gap - 10} ${H / 2 - 5} l8 5 l-8 5 z"/>`;
  });
  return out + `</svg>`;
}
function column() {
  const n = STAGES.length, W = 360, bh = 96, gap = 26, H = n * bh + (n - 1) * gap;
  let out = `<svg class="pipe col" viewBox="0 0 ${W} ${H}" role="img" aria-label="The sourcing pipeline, from county calendars to a bid">`;
  STAGES.forEach(([t, d], i) => {
    const y = i * (bh + gap), human = i === n - 1;
    out += `<g class="${human ? 'st human' : 'st'}"><rect x="0" y="${y}" width="${W}" height="${bh}" rx="3"/>`;
    out += `<text class="n" x="14" y="${y + 26}">0${i + 1}</text><text class="t" x="52" y="${y + 26}">${esc(t)}</text>`;
    const words = d.split(' '); let line = '', ly = y + 50; const lines = [];
    for (const w of words) { if ((line + ' ' + w).trim().length > 44) { lines.push(line.trim()); line = w; } else line += ' ' + w; }
    lines.push(line.trim());
    lines.slice(0, 2).forEach(l => { out += `<text class="d" x="14" y="${ly}">${esc(l)}</text>`; ly += 17; });
    out += `</g>`;
    if (i < n - 1) out += `<path class="arrow" d="M${W / 2} ${y + bh + 3} v${gap - 8}"/><path class="head" d="M${W / 2 - 5} ${y + bh + gap - 9} l5 8 l5 -8 z"/>`;
  });
  return out + `</svg>`;
}
module.exports = { pipeline: () => `<div class="pipeline">${row()}${column()}</div>` };
