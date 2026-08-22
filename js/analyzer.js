/* =====================================================================
   LLD Enterprises — Standalone deal analyzer
   Same underwriting engine as the deal desk (js/deals-data.js), driven by
   free-form inputs instead of a docket record.
   ===================================================================== */

(function () {
  'use strict';

  const D = window.LLD && window.LLD.Deals;
  const form = document.getElementById('an-form');
  if (!D || !form) return;

  const usd = (n) => (n < 0 ? '-$' : '$') + Math.round(Math.abs(n)).toLocaleString('en-US');
  const pct = (n, dp) => (n * 100).toFixed(dp == null ? 1 : dp) + '%';
  const $ = (id) => document.getElementById(id);

  const FIELDS = [
    'purchase', 'rehab', 'arv', 'rent', 'taxes', 'hoa',
    'down', 'rate', 'term', 'hold', 'closing', 'selling',
    'vacancy', 'maintenance', 'mgmt', 'capex', 'insurance', 'refi'
  ];

  const PRESET = {
    purchase: 95000, rehab: 42000, arv: 215000, rent: 1750, taxes: 4900, hoa: 0,
    down: 25, rate: 7.95, term: 30, hold: 6, closing: 2.5, selling: 7,
    vacancy: 7, maintenance: 6, mgmt: 8, capex: 5, insurance: 0.55, refi: 75
  };

  function readForm() {
    const v = {};
    FIELDS.forEach((k) => {
      const el = $('in-' + k);
      const n = Number(el.value);
      v[k] = isFinite(n) && el.value.trim() !== '' ? n : 0;
    });
    return v;
  }

  /** Map the form onto a synthetic property + assumption override. */
  function build(v) {
    const property = {
      openingBid: Math.max(1, v.purchase),
      rehab: Math.max(0, v.rehab),
      arv: Math.max(1, v.arv),
      marketRent: Math.max(0, v.rent),
      taxes: Math.max(0, v.taxes),
      hoa: Math.max(0, v.hoa)
    };
    const over = {
      downPct: v.down / 100,
      ratePct: v.rate / 100,
      termYears: Math.max(1, v.term),
      holdMonths: Math.max(0, v.hold),
      closingPct: v.closing / 100,
      sellingPct: v.selling / 100,
      vacancyPct: v.vacancy / 100,
      maintenancePct: v.maintenance / 100,
      mgmtPct: v.mgmt / 100,
      capexPct: v.capex / 100,
      insuranceRate: v.insurance / 100,
      refiLtv: v.refi / 100
    };
    return { property, over };
  }

  /* ---------- sensitivity grid ---------- */
  function sensitivity(property, over, axis) {
    const arvSteps = [-0.10, -0.05, 0, 0.05, 0.10];
    const rehabSteps = [-0.25, -0.125, 0, 0.125, 0.25];
    const rateSteps = [-0.0100, -0.0050, 0, 0.0050, 0.0100];
    const rentSteps = [-0.10, -0.05, 0, 0.05, 0.10];

    if (axis === 'flip') {
      const head = rehabSteps.map((r) => `<th class="num">${r === 0 ? 'Base' : (r > 0 ? '+' : '') + (r * 100).toFixed(1).replace('.0', '') + '%'}</th>`).join('');
      const rows = arvSteps.map((a) => {
        const cells = rehabSteps.map((r) => {
          const u = D.underwrite(property, Object.assign({}, over, {
            arv: property.arv * (1 + a),
            rehab: property.rehab * (1 + r)
          }));
          return `<td class="num ${u.flipProfit >= 0 ? 'pos' : 'neg'}">${usd(u.flipProfit)}</td>`;
        }).join('');
        return `<tr><th>${a === 0 ? 'Base ARV' : (a > 0 ? '+' : '') + (a * 100).toFixed(0) + '% ARV'}</th>${cells}</tr>`;
      }).join('');
      return `<table class="comps"><thead><tr><th>ARV \\ Rehab</th>${head}</tr></thead><tbody>${rows}</tbody></table>`;
    }

    const head = rentSteps.map((r) => `<th class="num">${r === 0 ? 'Base' : (r > 0 ? '+' : '') + (r * 100).toFixed(0) + '%'}</th>`).join('');
    const rows = rateSteps.map((rt) => {
      const cells = rentSteps.map((rn) => {
        const u = D.underwrite(property, Object.assign({}, over, {
          ratePct: over.ratePct + rt,
          rent: property.marketRent * (1 + rn)
        }));
        const d = u.dscr || 0;
        return `<td class="num ${d >= 1.25 ? 'pos' : d < 1 ? 'neg' : ''}">${d ? d.toFixed(2) + 'x' : '—'}</td>`;
      }).join('');
      const label = rt === 0 ? 'Base rate' : (rt > 0 ? '+' : '') + (rt * 10000).toFixed(0) + ' bps';
      return `<tr><th>${label}</th>${cells}</tr>`;
    }).join('');
    return `<table class="comps"><thead><tr><th>Rate \\ Rent</th>${head}</tr></thead><tbody>${rows}</tbody></table>`;
  }

  /* ---------- render ---------- */
  function render() {
    const v = readForm();
    const { property, over } = build(v);
    const u = D.underwrite(property, over);

    /* headline */
    const strategies = [
      { key: 'flip', label: 'Flip', ok: u.flipProfit > 20000 && u.mao > u.price, note: `${usd(u.flipProfit)} net profit` },
      { key: 'rental', label: 'Buy & Hold', ok: u.cashFlowMonthly > 150 && u.dscr >= 1.15, note: `${usd(u.cashFlowMonthly)}/mo at ${u.dscr ? u.dscr.toFixed(2) + 'x' : '—'}` },
      { key: 'brrrr', label: 'BRRRR', ok: u.cashOut > 0 && u.cashLeftIn < u.cashInvested * 0.5, note: `${usd(Math.max(0, u.cashOut))} back out` }
    ];
    const fits = strategies.filter((s) => s.ok);

    $('out-hero').innerHTML = `
      <p class="lbl">All-in basis</p>
      <p class="big">${usd(u.allIn)}</p>
      <p class="sub">${pct(u.allIn / u.arv, 0)} of exit value &middot; ${usd(u.cashInvested)} cash in</p>`;

    $('out-verdict').className = 'verdict ' + (fits.length >= 2 ? 'go' : fits.length === 1 ? 'watch' : 'pass');
    const names = fits.map((s) => s.label);
    const nameList = names.length > 1 ? names.slice(0, -1).join(', ') + ' and ' + names[names.length - 1] : names[0];
    $('out-verdict').textContent = fits.length
      ? `Clears as ${nameList} — maximum allowable offer ${usd(u.mao)} against a ${usd(u.price)} price.`
      : `No strategy clears at ${usd(u.price)}. The 70% rule caps this at ${usd(u.mao)}.`;

    $('out-strats').innerHTML = strategies.map((s) => `
      <div class="stat">
        <span>${s.label}</span>
        <strong class="${s.ok ? 'pos' : 'neg'}" style="font-size:1rem">${s.ok ? 'Clears' : 'Fails'}</strong>
        <small>${s.note}</small>
      </div>`).join('');

    $('out-key').innerHTML = `
      <div><dt>Equity spread</dt><dd class="${u.equitySpread >= 0 ? 'pos' : 'neg'}">${usd(u.equitySpread)}</dd></div>
      <div><dt>Equity as % of exit</dt><dd>${pct(u.equityPct, 0)}</dd></div>
      <div><dt>Max allowable offer (70%)</dt><dd>${usd(u.mao)}</dd></div>
      <div><dt>Headroom vs. price</dt><dd class="${u.mao - u.price >= 0 ? 'pos' : 'neg'}">${usd(u.mao - u.price)}</dd></div>`;

    $('out-acq').innerHTML = `
      <div><dt>Purchase price</dt><dd>${usd(u.price)}</dd></div>
      <div><dt>Rehab budget</dt><dd>${usd(u.rehab)}</dd></div>
      <div><dt>Closing costs</dt><dd>${usd(u.closing)}</dd></div>
      <div><dt>Holding carry (${u.assumptions.holdMonths} mo)</dt><dd>${usd(u.holdingCarry)}</dd></div>
      <div><dt>All-in basis</dt><dd>${usd(u.allIn)}</dd></div>
      <div><dt>Down payment</dt><dd>${usd(u.down)}</dd></div>
      <div><dt>Acquisition loan</dt><dd>${usd(u.loan)}</dd></div>
      <div><dt>Monthly debt service</dt><dd>${usd(u.monthlyDebt)}</dd></div>
      <div><dt>Total cash invested</dt><dd>${usd(u.cashInvested)}</dd></div>`;

    $('out-ops').innerHTML = `
      <div><dt>Gross scheduled income</dt><dd>${usd(u.gsi)}</dd></div>
      <div><dt>Vacancy loss</dt><dd>-${usd(u.vacancy)}</dd></div>
      <div><dt>Effective gross income</dt><dd>${usd(u.egi)}</dd></div>
      <div><dt>Operating expenses</dt><dd>-${usd(u.opex)}</dd></div>
      <div><dt>Net operating income</dt><dd>${usd(u.noi)}</dd></div>
      <div><dt>Annual debt service</dt><dd>-${usd(u.annualDebt)}</dd></div>
      <div><dt>Monthly cash flow</dt><dd class="${u.cashFlowMonthly >= 0 ? 'pos' : 'neg'}">${usd(u.cashFlowMonthly)}</dd></div>
      <div><dt>DSCR</dt><dd>${u.dscr ? u.dscr.toFixed(2) + 'x' : '—'}</dd></div>
      <div><dt>Yield on cost</dt><dd>${pct(u.yieldOnCost)}</dd></div>
      <div><dt>Cash-on-cash return</dt><dd class="${u.cashOnCash >= 0 ? 'pos' : 'neg'}">${pct(u.cashOnCash)}</dd></div>
      <div><dt>Gross rent multiplier</dt><dd>${u.grm ? u.grm.toFixed(1) + 'x' : '—'}</dd></div>
      <div><dt>Rent-to-price (1% rule)</dt><dd>${pct(u.onePctRule, 2)}</dd></div>`;

    $('out-exit').innerHTML = `
      <div><dt>Exit value (ARV)</dt><dd>${usd(u.arv)}</dd></div>
      <div><dt>Selling costs</dt><dd>-${usd(u.sellingCosts)}</dd></div>
      <div><dt>All-in basis</dt><dd>-${usd(u.allIn)}</dd></div>
      <div><dt>Net profit on resale</dt><dd class="${u.flipProfit >= 0 ? 'pos' : 'neg'}">${usd(u.flipProfit)}</dd></div>
      <div><dt>Return on cash invested</dt><dd class="${u.flipRoi >= 0 ? 'pos' : 'neg'}">${pct(u.flipRoi, 0)}</dd></div>
      <div><dt>Refinance loan (${pct(u.assumptions.refiLtv, 0)} LTV)</dt><dd>${usd(u.refiLoan)}</dd></div>
      <div><dt>Cash returned at refinance</dt><dd class="${u.cashOut >= 0 ? 'pos' : 'neg'}">${usd(u.cashOut)}</dd></div>
      <div><dt>Capital left in the deal</dt><dd>${usd(Math.max(0, u.cashLeftIn))}</dd></div>
      <div><dt>Post-refi cash flow</dt><dd class="${u.refiCashFlow >= 0 ? 'pos' : 'neg'}">${usd(u.refiCashFlow)}/mo</dd></div>
      <div><dt>Post-refi DSCR</dt><dd>${u.refiDscr ? u.refiDscr.toFixed(2) + 'x' : '—'}</dd></div>`;

    $('out-sens-flip').innerHTML = sensitivity(property, over, 'flip');
    $('out-sens-hold').innerHTML = sensitivity(property, over, 'hold');
  }

  /* ---------- prefill from the deal desk ---------- */
  const picker = $('an-load');
  if (picker) {
    const deals = D.load()
      .filter((p) => p.marketRent > 0 && p.status !== 'sold')
      .sort((a, b) => b.score - a.score)
      .slice(0, 25);

    picker.innerHTML = '<option value="">Start from a blank file…</option>' +
      deals.map((p) => `<option value="${p.id}">${p.address}, ${p.city} — ${usd(p.openingBid)} (score ${p.score})</option>`).join('');

    picker.addEventListener('change', () => {
      const p = deals.find((x) => x.id === picker.value);
      if (!p) return;
      $('in-purchase').value = p.openingBid;
      $('in-rehab').value = p.rehab;
      $('in-arv').value = p.arv;
      $('in-rent').value = p.marketRent;
      $('in-taxes').value = p.taxes;
      $('in-hoa').value = p.hoa || 0;
      $('an-source-note').textContent =
        `Loaded ${p.address}, ${p.city} — ${p.sourceLabel}, ${p.conditionLabel}, ${p.occupancyLabel}. Sample data.`;
      render();
    });
  }

  form.addEventListener('input', render);

  const resetBtn = $('an-reset');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      FIELDS.forEach((k) => { $('in-' + k).value = PRESET[k]; });
      if (picker) picker.value = '';
      $('an-source-note').textContent = 'Worked example: a moderate-rehab single family in a $1,750/mo rent market.';
      render();
    });
  }

  render();
})();
