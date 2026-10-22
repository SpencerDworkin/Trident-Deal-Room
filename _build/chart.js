/* The distribution chart: every residential filing on the covered calendars,
 * placed by its recorded debt as a share of county median value. Drawn from
 * counts, not from the book itself — the book carries names and stays out of
 * this repository. Counts are recomputed from the book at each pull.
 */
const BINS = [16, 18, 24, 38, 44, 46, 45, 43, 31, 28, 15, 10, 9, 13, 8, 8, 3, 3, 4, 3, 2, 6]; // 0.0–0.1 … 2.0–2.1, last is 2.1+
const N = BINS.reduce((a, b) => a + b, 0); // 417

function chart() {
  const W = 1000, H = 300, L = 30, R = 12, T = 40, B = 40;
  const iw = W - L - R, ih = H - T - B;
  const bw = iw / BINS.length;
  const max = Math.max(...BINS);
  const y = v => T + ih - (v / max) * ih;
  const x = i => L + i * bw;

  const cls = i => i < 4 ? 'bar' : i < 6 ? 'bar mid' : i < 8 ? 'bar thin' : 'bar out';
  const bars = BINS.map((v, i) =>
    `<rect class="${cls(i)}" x="${(x(i) + 1.5).toFixed(1)}" y="${y(v).toFixed(1)}" width="${(bw - 3).toFixed(1)}" height="${(ih - (y(v) - T)).toFixed(1)}"/>`).join('');

  const rules = [4, 6, 8, 10].map(i =>
    `<line class="rule" x1="${x(i).toFixed(1)}" x2="${x(i).toFixed(1)}" y1="${T - 6}" y2="${T + ih}"/>`).join('');

  const ticks = [[0, '0'], [4, '0.4'], [6, '0.6'], [8, '0.8'], [10, '1.0'], [15, '1.5'], [20, '2.0+']].map(([i, t]) =>
    `<text x="${x(i).toFixed(1)}" y="${T + ih + 18}" text-anchor="${i === 0 ? 'start' : 'middle'}">${t}</text>`).join('');

  const sum = (a, b) => BINS.slice(a, b).reduce((s, v) => s + v, 0);
  const label = (a, b, t, k) =>
    `<text class="k ${k}" x="${((x(a) + x(b)) / 2).toFixed(1)}" y="${T - 16}" text-anchor="middle">${t} <tspan class="mono">${sum(a, b)}</tspan></text>`;

  return `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="Distribution of ${N} residential filings by recorded debt as a share of county median value">
    <line class="ax" x1="${L}" x2="${W - R}" y1="${T + ih}" y2="${T + ih}"/>
    ${rules}${bars}${ticks}
    ${label(0, 4, 'Deep discount', 'kk')}${label(4, 6, 'Discount', '')}${label(6, 8, 'Possible', '')}${label(8, BINS.length, 'Refused', 'ko')}
    <text x="${W - R}" y="${T + ih + 34}" text-anchor="end">recorded debt ÷ county median value</text>
  </svg>`;
}

module.exports = { chart, N, BINS };
