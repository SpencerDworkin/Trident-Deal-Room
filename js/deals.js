/* =====================================================================
   LLD Enterprises — On-Market deal browser
   Filter rail, results (grid / list / table / map), and the analysis panel.
   Depends on js/deals-data.js.
   ===================================================================== */

(function () {
  'use strict';

  const D = window.LLD && window.LLD.Deals;
  if (!D || !document.getElementById('wk-results')) return;

  /* ---------- formatting ---------- */
  const usd = (n) => (n < 0 ? '-$' : '$') + Math.round(Math.abs(n)).toLocaleString('en-US');
  const usdK = (n) => {
    const a = Math.abs(n);
    const sign = n < 0 ? '-' : '';
    if (a >= 1e6) return sign + '$' + (a / 1e6).toFixed(a >= 1e7 ? 1 : 2) + 'M';
    if (a >= 1e3) return sign + '$' + Math.round(a / 1e3) + 'K';
    return sign + '$' + Math.round(a);
  };
  const pct = (n, dp) => (n * 100).toFixed(dp == null ? 1 : dp) + '%';
  const int = (n) => Math.round(n).toLocaleString('en-US');
  const TODAY = new Date('2026-08-22T12:00:00Z');

  function dateLabel(isoStr) {
    const d = new Date(isoStr + 'T12:00:00Z');
    return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
  }
  function daysUntil(isoStr) {
    return Math.round((new Date(isoStr + 'T12:00:00Z') - TODAY) / 86400000);
  }
  function esc(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  }

  const TYPE_ICON = {
    'single-family': '&#127968;', 'multi-family': '&#127970;', 'townhouse': '&#127967;',
    'condo': '&#127976;', 'mixed-use': '&#127974;', 'commercial': '&#127981;', 'land': '&#127795;'
  };

  const STRAT_LABEL = { flip: 'Flip', rental: 'Buy &amp; Hold', brrrr: 'BRRRR' };

  const CITY_COORDS = {
    Rochester: [43.161, -77.610], Irondequoit: [43.212, -77.580], Greece: [43.210, -77.693],
    Gates: [43.152, -77.700], Henrietta: [43.058, -77.612], Brighton: [43.146, -77.564],
    Webster: [43.212, -77.428], Penfield: [43.130, -77.457], Chili: [43.089, -77.767],
    Spencerport: [43.188, -77.803], Fairport: [43.099, -77.442], 'East Rochester': [43.112, -77.487],
    Hilton: [43.288, -77.795], Brockport: [43.214, -77.939], Canandaigua: [42.887, -77.281],
    Geneva: [42.869, -76.978], Victor: [42.982, -77.409], Newark: [43.046, -77.095],
    Macedon: [43.069, -77.300], Sodus: [43.238, -77.060], Batavia: [42.998, -78.187],
    'Le Roy': [42.978, -77.988], Avon: [42.911, -77.745], Geneseo: [42.795, -77.816],
    Albion: [43.246, -78.194], Medina: [43.220, -78.388]
  };

  /* =====================================================================
     State
     ===================================================================== */
  const DEFAULT_FILTERS = {
    q: '',
    counties: [], types: [], sources: [], statuses: [], conditions: [], occupancy: [], strategies: [],
    priceMin: null, priceMax: null,
    bedsMin: 0, sqftMin: 0, yearMin: 0,
    scoreMin: 0, cashflowMin: null, roiMin: null, equityMin: 0,
    withinDays: 0
  };

  /** Fresh copy — the array fields must not be shared with DEFAULT_FILTERS,
      or pushing onto a filter list would mutate the reset template. */
  function freshFilters() {
    const f = Object.assign({}, DEFAULT_FILTERS);
    Object.keys(f).forEach((k) => { if (Array.isArray(f[k])) f[k] = f[k].slice(); });
    return f;
  }

  const state = {
    all: [],
    tab: 'on-market',
    view: 'grid',
    sort: 'score-desc',
    page: 1,
    perPage: 12,
    filters: freshFilters(),
    saved: loadSaved(),
    active: null,        // property currently open in the panel
    override: null       // live analyzer overrides for the open property
  };

  function loadSaved() {
    try {
      const raw = localStorage.getItem('lld.saved.deals');
      return new Set(raw ? JSON.parse(raw) : []);
    } catch (e) { return new Set(); }
  }
  function persistSaved() {
    try { localStorage.setItem('lld.saved.deals', JSON.stringify([...state.saved])); } catch (e) { /* private mode */ }
  }

  /* ---------- underwrite cache ---------- */
  const uCache = new Map();
  function uw(p) {
    if (!uCache.has(p.id)) uCache.set(p.id, D.underwrite(p));
    return uCache.get(p.id);
  }

  /* =====================================================================
     Filtering / sorting
     ===================================================================== */
  const TAB_PREDICATE = {
    'on-market': (p) => p.status !== 'sold',
    'auctions': (p) => (p.source === 'sheriff-sale' || p.source === 'tax-foreclosure') && p.status !== 'sold',
    'off-market': (p) => p.source === 'off-market' || p.source === 'pre-foreclosure' || p.source === 'probate',
    'saved': (p) => state.saved.has(p.id),
    'sold': (p) => p.status === 'sold'
  };

  function matches(p, skip) {
    const f = state.filters;
    const u = uw(p);

    if (skip !== 'q' && f.q) {
      const hay = (p.address + ' ' + p.city + ' ' + p.zip + ' ' + p.county + ' ' + p.id + ' ' +
        p.typeLabel + ' ' + p.sourceLabel + ' ' + p.parcel + ' ' + p.caseNumber).toLowerCase();
      if (!f.q.toLowerCase().split(/\s+/).every((t) => hay.includes(t))) return false;
    }
    if (skip !== 'counties' && f.counties.length && !f.counties.includes(p.county)) return false;
    if (skip !== 'types' && f.types.length && !f.types.includes(p.type)) return false;
    if (skip !== 'sources' && f.sources.length && !f.sources.includes(p.source)) return false;
    if (skip !== 'statuses' && f.statuses.length && !f.statuses.includes(p.status)) return false;
    if (skip !== 'conditions' && f.conditions.length && !f.conditions.includes(p.condition)) return false;
    if (skip !== 'occupancy' && f.occupancy.length && !f.occupancy.includes(p.occupancy)) return false;
    if (skip !== 'strategies' && f.strategies.length && !f.strategies.some((s) => p.strategies.includes(s))) return false;

    if (f.priceMin != null && p.openingBid < f.priceMin) return false;
    if (f.priceMax != null && p.openingBid > f.priceMax) return false;
    if (f.bedsMin && p.beds < f.bedsMin) return false;
    if (f.sqftMin && p.sqft < f.sqftMin) return false;
    if (f.yearMin && p.year < f.yearMin) return false;
    if (f.scoreMin && p.score < f.scoreMin) return false;
    if (f.equityMin && u.equityPct * 100 < f.equityMin) return false;
    if (f.cashflowMin != null && u.cashFlowMonthly < f.cashflowMin) return false;
    if (f.roiMin != null && u.cashOnCash * 100 < f.roiMin) return false;
    if (f.withinDays) {
      const d = daysUntil(p.auctionDate);
      if (d < 0 || d > f.withinDays) return false;
    }
    return true;
  }

  function tabPool() {
    return state.all.filter(TAB_PREDICATE[state.tab] || (() => true));
  }

  function results(skip) {
    return tabPool().filter((p) => matches(p, skip));
  }

  const SORTERS = {
    'score-desc': (a, b) => b.score - a.score,
    'auction-asc': (a, b) => a.auctionDate.localeCompare(b.auctionDate),
    'price-asc': (a, b) => a.openingBid - b.openingBid,
    'price-desc': (a, b) => b.openingBid - a.openingBid,
    'equity-desc': (a, b) => uw(b).equitySpread - uw(a).equitySpread,
    'cashflow-desc': (a, b) => uw(b).cashFlowMonthly - uw(a).cashFlowMonthly,
    'roi-desc': (a, b) => uw(b).cashOnCash - uw(a).cashOnCash,
    'cap-desc': (a, b) => uw(b).capRate - uw(a).capRate,
    'newest': (a, b) => b.listedDate.localeCompare(a.listedDate)
  };

  /* =====================================================================
     Filter rail
     ===================================================================== */
  const railEl = document.getElementById('wk-rail');

  function facet(key, items, labelOf, valueOf) {
    const pool = tabPool().filter((p) => matches(p, key));
    return items.map((it) => {
      const v = valueOf(it);
      return {
        value: v,
        label: labelOf(it),
        count: pool.filter((p) => facetValue(key, p) === v).length
      };
    }).filter((o) => o.count > 0 || state.filters[key].includes(o.value));
  }

  function facetValue(key, p) {
    return { counties: p.county, types: p.type, sources: p.source, statuses: p.status, conditions: p.condition, occupancy: p.occupancy }[key];
  }

  function checkboxGroup(key, options) {
    return options.map((o) => `
      <label class="f-opt">
        <input type="checkbox" data-facet="${key}" value="${esc(o.value)}"${state.filters[key].includes(o.value) ? ' checked' : ''}>
        <span>${o.label}</span>
        <span class="f-tally">${o.count}</span>
      </label>`).join('');
  }

  function group(id, title, bodyHtml, collapsed) {
    return `
      <div class="f-group${collapsed ? ' collapsed' : ''}" data-group="${id}">
        <button class="f-head" type="button" aria-expanded="${!collapsed}">
          <span>${title}</span><span class="chev">&#9660;</span>
        </button>
        <div class="f-body">${bodyHtml}</div>
      </div>`;
  }

  function renderRail() {
    const f = state.filters;
    const counties = [...new Set(state.all.map((p) => p.county))].sort();

    railEl.innerHTML = `
      <div class="rail-top">
        <h2>Filters</h2>
        <button class="rail-reset" type="button" id="rail-reset">Reset all</button>
      </div>

      ${group('strategy', 'Strategy fit', `
        <div class="seg" role="group" aria-label="Strategy fit">
          ${['flip', 'rental', 'brrrr'].map((s) => `
            <button type="button" data-strategy="${s}" class="${f.strategies.includes(s) ? 'on' : ''}">${STRAT_LABEL[s]}</button>`).join('')}
        </div>
        <label class="f-label" for="f-score">Minimum deal score</label>
        <div class="f-readout" id="f-score-out">${f.scoreMin || 'Any'}</div>
        <input class="f-slider" type="range" id="f-score" min="0" max="95" step="5" value="${f.scoreMin}">
      `)}

      ${group('price', 'Opening bid', `
        <div class="f-row">
          <input class="f-input" type="number" id="f-price-min" placeholder="Min" value="${f.priceMin != null ? f.priceMin : ''}">
          <span class="dash">&ndash;</span>
          <input class="f-input" type="number" id="f-price-max" placeholder="Max" value="${f.priceMax != null ? f.priceMax : ''}">
        </div>
      `)}

      ${group('source', 'Deal source', checkboxGroup('sources',
        facet('sources', D.SOURCES, (t) => t.label, (t) => t.key)))}

      ${group('county', 'County', checkboxGroup('counties',
        facet('counties', counties, (c) => c, (c) => c)))}

      ${group('type', 'Property type', checkboxGroup('types',
        facet('types', D.TYPES, (t) => t.label, (t) => t.key)))}

      ${group('auction', 'Auction window', `
        <select class="f-select" id="f-within">
          <option value="0"${!f.withinDays ? ' selected' : ''}>Any date</option>
          <option value="7"${f.withinDays === 7 ? ' selected' : ''}>Next 7 days</option>
          <option value="14"${f.withinDays === 14 ? ' selected' : ''}>Next 14 days</option>
          <option value="30"${f.withinDays === 30 ? ' selected' : ''}>Next 30 days</option>
          <option value="60"${f.withinDays === 60 ? ' selected' : ''}>Next 60 days</option>
          <option value="90"${f.withinDays === 90 ? ' selected' : ''}>Next 90 days</option>
        </select>
      `, true)}

      ${group('returns', 'Return thresholds', `
        <label class="f-label" for="f-equity">Min. equity spread (% of ARV)</label>
        <div class="f-readout" id="f-equity-out">${f.equityMin ? f.equityMin + '%' : 'Any'}</div>
        <input class="f-slider" type="range" id="f-equity" min="0" max="60" step="5" value="${f.equityMin}">
        <label class="f-label" for="f-cf">Min. monthly cash flow</label>
        <input class="f-input" type="number" id="f-cf" placeholder="Any" value="${f.cashflowMin != null ? f.cashflowMin : ''}">
        <label class="f-label" for="f-roi">Min. cash-on-cash (%)</label>
        <input class="f-input" type="number" id="f-roi" placeholder="Any" value="${f.roiMin != null ? f.roiMin : ''}">
      `, true)}

      ${group('condition', 'Condition', checkboxGroup('conditions',
        facet('conditions', D.CONDITIONS, (t) => t.label, (t) => t.key)), true)}

      ${group('occupancy', 'Occupancy', checkboxGroup('occupancy',
        facet('occupancy', D.OCCUPANCY, (t) => t.label, (t) => t.key)), true)}

      ${group('status', 'Sale status', checkboxGroup('statuses',
        facet('statuses', D.STATUSES, (t) => t.label, (t) => t.key)), true)}

      ${group('physical', 'Building', `
        <label class="f-label" for="f-beds">Minimum beds</label>
        <select class="f-select" id="f-beds">
          ${[0, 2, 3, 4, 5, 6].map((n) => `<option value="${n}"${f.bedsMin === n ? ' selected' : ''}>${n ? n + '+' : 'Any'}</option>`).join('')}
        </select>
        <label class="f-label" for="f-sqft">Minimum sq ft</label>
        <input class="f-input" type="number" id="f-sqft" placeholder="Any" value="${f.sqftMin || ''}">
        <label class="f-label" for="f-year">Built after</label>
        <input class="f-input" type="number" id="f-year" placeholder="Any" value="${f.yearMin || ''}">
      `, true)}

      <button class="rail-done" type="button" id="rail-done">Show results</button>
    `;
  }

  /** The rail is a slide-over below 900px; keep the scrim and scroll lock in step. */
  function setRail(open) {
    railEl.classList.toggle('open', open);
    const scrim = document.getElementById('rail-scrim');
    if (scrim) scrim.classList.toggle('on', open);
    document.body.style.overflow = open && window.innerWidth <= 900 ? 'hidden' : '';
  }

  /* ---------- rail events (delegated; survives re-render) ---------- */
  railEl.addEventListener('click', (e) => {
    if (e.target.id === 'rail-done') { setRail(false); return; }

    const head = e.target.closest('.f-head');
    if (head) { head.closest('.f-group').classList.toggle('collapsed'); return; }

    if (e.target.id === 'rail-reset') {
      state.filters = freshFilters();
      state.page = 1;
      const box = document.getElementById('wk-q');
      if (box) box.value = '';
      renderAll();
      return;
    }

    const strat = e.target.closest('[data-strategy]');
    if (strat) {
      const s = strat.dataset.strategy;
      const list = state.filters.strategies;
      const i = list.indexOf(s);
      if (i > -1) list.splice(i, 1); else list.push(s);
      state.page = 1;
      renderAll();
    }
  });

  railEl.addEventListener('change', (e) => {
    const t = e.target;
    if (t.dataset.facet) {
      const list = state.filters[t.dataset.facet];
      const i = list.indexOf(t.value);
      if (t.checked && i === -1) list.push(t.value);
      if (!t.checked && i > -1) list.splice(i, 1);
      state.page = 1;
      renderAll();
      return;
    }
    const numOrNull = (el) => (el.value.trim() === '' ? null : Number(el.value));
    switch (t.id) {
      case 'f-price-min': state.filters.priceMin = numOrNull(t); break;
      case 'f-price-max': state.filters.priceMax = numOrNull(t); break;
      case 'f-cf': state.filters.cashflowMin = numOrNull(t); break;
      case 'f-roi': state.filters.roiMin = numOrNull(t); break;
      case 'f-sqft': state.filters.sqftMin = Number(t.value) || 0; break;
      case 'f-year': state.filters.yearMin = Number(t.value) || 0; break;
      case 'f-beds': state.filters.bedsMin = Number(t.value) || 0; break;
      case 'f-within': state.filters.withinDays = Number(t.value) || 0; break;
      default: return;
    }
    state.page = 1;
    renderAll();
  });

  /* live slider readouts without a full re-render on every tick */
  railEl.addEventListener('input', (e) => {
    if (e.target.id === 'f-score') {
      document.getElementById('f-score-out').textContent = Number(e.target.value) || 'Any';
    } else if (e.target.id === 'f-equity') {
      const v = Number(e.target.value);
      document.getElementById('f-equity-out').textContent = v ? v + '%' : 'Any';
    }
  });
  railEl.addEventListener('change', (e) => {
    if (e.target.id === 'f-score') { state.filters.scoreMin = Number(e.target.value); state.page = 1; renderAll(); }
    if (e.target.id === 'f-equity') { state.filters.equityMin = Number(e.target.value); state.page = 1; renderAll(); }
  });

  /* =====================================================================
     Active-filter chips
     ===================================================================== */
  const chipsEl = document.getElementById('wk-chips');

  function labelFor(key, value) {
    const table = {
      sources: D.SOURCES, types: D.TYPES, conditions: D.CONDITIONS,
      occupancy: D.OCCUPANCY, statuses: D.STATUSES
    }[key];
    if (table) { const hit = table.find((t) => t.key === value); return hit ? hit.label : value; }
    if (key === 'strategies') return STRAT_LABEL[value];
    return value;
  }

  function renderChips() {
    const f = state.filters;
    const chips = [];
    ['sources', 'counties', 'types', 'conditions', 'occupancy', 'statuses', 'strategies'].forEach((k) => {
      f[k].forEach((v) => chips.push({ k, v, text: labelFor(k, v) }));
    });
    if (f.priceMin != null) chips.push({ k: 'priceMin', text: 'Bid ≥ ' + usdK(f.priceMin) });
    if (f.priceMax != null) chips.push({ k: 'priceMax', text: 'Bid ≤ ' + usdK(f.priceMax) });
    if (f.scoreMin) chips.push({ k: 'scoreMin', text: 'Score ≥ ' + f.scoreMin });
    if (f.equityMin) chips.push({ k: 'equityMin', text: 'Equity ≥ ' + f.equityMin + '%' });
    if (f.cashflowMin != null) chips.push({ k: 'cashflowMin', text: 'Cash flow ≥ ' + usd(f.cashflowMin) + '/mo' });
    if (f.roiMin != null) chips.push({ k: 'roiMin', text: 'CoC ≥ ' + f.roiMin + '%' });
    if (f.bedsMin) chips.push({ k: 'bedsMin', text: f.bedsMin + '+ beds' });
    if (f.sqftMin) chips.push({ k: 'sqftMin', text: int(f.sqftMin) + '+ sq ft' });
    if (f.yearMin) chips.push({ k: 'yearMin', text: 'Built after ' + f.yearMin });
    if (f.withinDays) chips.push({ k: 'withinDays', text: 'Auction within ' + f.withinDays + ' days' });
    if (f.q) chips.push({ k: 'q', text: '“' + f.q + '”' });

    chipsEl.innerHTML = chips.length
      ? chips.map((c) => `<span class="wk-chip">${esc(c.text)}<button type="button" data-clear="${c.k}"${c.v ? ` data-val="${esc(c.v)}"` : ''} aria-label="Remove filter">&times;</button></span>`).join('') +
        `<span class="wk-chip" style="border-style:dashed"><button type="button" data-clear="__all" aria-label="Clear all filters">&times;</button>Clear all</span>`
      : '';
  }

  chipsEl.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-clear]');
    if (!btn) return;
    const k = btn.dataset.clear;
    if (k === '__all') {
      state.filters = freshFilters();
      document.getElementById('wk-q').value = '';
    } else if (Array.isArray(state.filters[k])) {
      const list = state.filters[k];
      list.splice(list.indexOf(btn.dataset.val), 1);
    } else if (k === 'q') {
      state.filters.q = '';
      document.getElementById('wk-q').value = '';
    } else {
      state.filters[k] = DEFAULT_FILTERS[k];
    }
    state.page = 1;
    renderAll();
  });

  /* =====================================================================
     Results
     ===================================================================== */
  const resultsEl = document.getElementById('wk-results');
  const countEl = document.getElementById('wk-count');
  const pagerEl = document.getElementById('wk-pager');

  function scoreClass(s) { return s >= 75 ? 's-hi' : s >= 58 ? 's-mid' : 's-lo'; }
  function ringColor(s) { return s >= 75 ? '#3ecf8e' : s >= 58 ? '#e0a33a' : '#e06a62'; }

  function card(p) {
    const u = uw(p);
    const dd = daysUntil(p.auctionDate);
    const saved = state.saved.has(p.id);
    const cf = u.cashFlowMonthly;
    return `
      <article class="deal-card" data-id="${p.id}">
        <div class="dc-media">
          <span>${TYPE_ICON[p.type] || '&#127968;'}</span>
          <div class="dc-badges">
            <span class="badge src-${p.source}">${p.sourceLabel}</span>
            ${p.status !== 'scheduled' && p.status !== 'on-market' ? `<span class="badge st-${p.status}">${p.statusLabel}</span>` : ''}
          </div>
          <div class="score-ring" style="--score:${p.score};--ring-color:${ringColor(p.score)}" title="Composite deal score">
            <span>${p.score}<small>score</small></span>
          </div>
          <span class="dc-auction${dd >= 0 && dd <= 14 ? ' soon' : ''}">
            ${dd < 0 ? 'Sale passed' : dd === 0 ? 'Auction today' : 'Auction in ' + dd + 'd'} &middot; ${dateLabel(p.auctionDate)}
          </span>
          <button class="dc-save${saved ? ' on' : ''}" type="button" data-save="${p.id}" aria-label="${saved ? 'Remove from watchlist' : 'Add to watchlist'}" title="Watchlist">${saved ? '&#9733;' : '&#9734;'}</button>
        </div>
        <div class="dc-body">
          <h3 class="dc-addr">${esc(p.address)}</h3>
          <p class="dc-sub">${esc(p.city)}, ${p.state} ${p.zip}<br><span class="dc-ref">${p.county} County &middot; File ${p.id}</span></p>
          <div class="dc-specs">
            <span>${p.typeLabel}</span>
            ${p.beds ? `<span><b>${p.beds}</b> bd</span><span><b>${p.baths}</b> ba</span>` : ''}
            ${p.sqft ? `<span><b>${int(p.sqft)}</b> sf</span>` : ''}
            <span>Built <b>${p.year}</b></span>
          </div>
          <div class="dc-figs">
            <div class="fig"><span>Opening bid</span><strong>${usd(p.openingBid)}</strong></div>
            <div class="fig"><span>Est. ARV</span><strong>${usd(p.arv)}</strong></div>
            <div class="fig"><span>Rehab budget</span><strong>${usd(p.rehab)}</strong></div>
            <div class="fig"><span>Equity spread</span><strong class="${u.equitySpread >= 0 ? 'pos' : 'neg'}">${usd(u.equitySpread)}</strong></div>
          </div>
          <div class="dc-metrics">
            <span class="metric ${cf >= 200 ? 'good' : cf < 0 ? 'bad' : ''}">Cash flow <b>${usd(cf)}/mo</b></span>
            <span class="metric ${u.dscr >= 1.25 ? 'good' : u.dscr < 1 ? 'bad' : ''}">DSCR <b>${u.dscr ? u.dscr.toFixed(2) + 'x' : '—'}</b></span>
            <span class="metric">Yield on cost <b>${pct(u.capRate)}</b></span>
            <span class="metric ${u.cashOnCash >= 0.12 ? 'good' : u.cashOnCash < 0 ? 'bad' : ''}">CoC <b>${pct(u.cashOnCash, 0)}</b></span>
          </div>
          ${p.strategies.length ? `<div class="strat-tags">${p.strategies.map((s) => `<span class="strat">${STRAT_LABEL[s]}</span>`).join('')}</div>` : ''}
          <div class="dc-actions">
            <button class="btn-sm" type="button" data-open="${p.id}">Run analysis</button>
            <button class="btn-sm ghost" type="button" data-save="${p.id}">${saved ? 'Saved' : 'Watch'}</button>
          </div>
        </div>
      </article>`;
  }

  function tableView(list) {
    return `
      <div class="wk-table-wrap">
        <table class="wk-table">
          <thead><tr>
            <th>Property</th><th>Source</th><th>Type</th>
            <th class="num">Opening bid</th><th class="num">ARV</th><th class="num">Rehab</th>
            <th class="num">Equity</th><th class="num">Cash flow</th><th class="num">DSCR</th>
            <th class="num">CoC</th><th>Auction</th><th class="num">Score</th>
          </tr></thead>
          <tbody>
            ${list.map((p) => {
              const u = uw(p);
              return `<tr data-open="${p.id}">
                <td><span class="t-addr">${esc(p.address)}</span><span class="t-sub">${esc(p.city)}, NY ${p.zip} &middot; ${p.id}</span></td>
                <td>${p.sourceLabel}</td>
                <td>${p.typeLabel}</td>
                <td class="num">${usd(p.openingBid)}</td>
                <td class="num">${usd(p.arv)}</td>
                <td class="num">${usd(p.rehab)}</td>
                <td class="num ${u.equitySpread >= 0 ? 'pos' : 'neg'}">${usd(u.equitySpread)}</td>
                <td class="num ${u.cashFlowMonthly >= 0 ? 'pos' : 'neg'}">${usd(u.cashFlowMonthly)}</td>
                <td class="num">${u.dscr ? u.dscr.toFixed(2) + 'x' : '—'}</td>
                <td class="num">${pct(u.cashOnCash, 0)}</td>
                <td>${dateLabel(p.auctionDate)}</td>
                <td class="num"><span class="pill-score ${scoreClass(p.score)}">${p.score}</span></td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>`;
  }

  function mapView(list) {
    const groups = {};
    list.forEach((p) => { (groups[p.city] = groups[p.city] || []).push(p); });
    const minLat = 42.75, maxLat = 43.35, minLng = -78.45, maxLng = -76.92;

    const pins = Object.keys(groups)
      .map((city) => {
        const [lat, lng] = CITY_COORDS[city] || [43.1, -77.6];
        const bids = groups[city].map((p) => p.openingBid).sort((a, b) => a - b);
        return {
          city,
          n: groups[city].length,
          med: bids[Math.floor(bids.length / 2)],
          /* geographic anchor, as a percentage of the panel */
          gx: 5 + ((lng - minLng) / (maxLng - minLng)) * 90,
          gy: 6 + (1 - (lat - minLat) / (maxLat - minLat)) * 80
        };
      })
      .sort((a, b) => a.n - b.n)   // busiest municipalities paint last, on top
      .map((n) => `<button class="map-cluster" type="button" data-city="${esc(n.city)}"
          data-gx="${n.gx.toFixed(2)}" data-gy="${n.gy.toFixed(2)}"
          style="left:${n.gx.toFixed(2)}%;top:${n.gy.toFixed(2)}%">
          ${n.n} · ${esc(n.city)}<small>median bid ${usdK(n.med)}</small>
        </button>`).join('');

    return `<div class="wk-map">${pins}
      <p class="map-note">Schematic county view — ${Object.keys(groups).length} municipalities, ${list.length} filings. Positions are approximate and spread apart for legibility. Click a cluster to filter the list to that municipality.</p>
    </div>`;
  }

  /* The Rochester metro packs a dozen municipalities into a few miles, so the
     labels are relaxed apart against their measured boxes once they render. */
  function relaxMap() {
    const wrap = resultsEl.querySelector('.wk-map');
    if (!wrap) return;
    const W = wrap.clientWidth;
    const H = wrap.clientHeight - 38;              // keep clear of the caption
    const GAP = 5;
    const nodes = [...wrap.querySelectorAll('.map-cluster')].map((el) => {
      const r = el.getBoundingClientRect();
      return {
        el,
        hw: r.width / 2 + GAP,
        hh: r.height / 2 + GAP,
        x: (Number(el.dataset.gx) / 100) * W,
        y: (Number(el.dataset.gy) / 100) * H
      };
    });

    for (let pass = 0; pass < 160; pass++) {
      let moved = false;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i], b = nodes[j];
          const dx = b.x - a.x, dy = b.y - a.y;
          const ox = a.hw + b.hw - Math.abs(dx);
          const oy = a.hh + b.hh - Math.abs(dy);
          if (ox <= 0 || oy <= 0) continue;
          moved = true;
          if (ox < oy) {
            const push = (ox / 2 + 0.5) * (dx < 0 ? -1 : 1);
            a.x -= push; b.x += push;
          } else {
            const push = (oy / 2 + 0.5) * (dy < 0 ? -1 : 1);
            a.y -= push; b.y += push;
          }
        }
      }
      nodes.forEach((n) => {
        n.x = Math.max(n.hw, Math.min(W - n.hw, n.x));
        n.y = Math.max(n.hh, Math.min(H - n.hh, n.y));
      });
      if (!moved) break;
    }

    nodes.forEach((n) => {
      n.el.style.left = ((n.x / W) * 100).toFixed(2) + '%';
      n.el.style.top = n.y.toFixed(1) + 'px';
    });
  }

  function renderResults() {
    const list = results().sort(SORTERS[state.sort]);
    const total = list.length;
    const pages = Math.max(1, Math.ceil(total / state.perPage));
    if (state.page > pages) state.page = pages;

    countEl.innerHTML = total
      ? `<b>${int(total)}</b> ${total === 1 ? 'property' : 'properties'}${total > state.perPage && state.view !== 'map' ? ` &middot; showing ${(state.page - 1) * state.perPage + 1}&ndash;${Math.min(total, state.page * state.perPage)}` : ''}`
      : 'No matches';

    if (!total) {
      resultsEl.innerHTML = `
        <div class="wk-empty">
          <div class="big">&#128269;</div>
          <h3>No properties match these filters</h3>
          <p>Loosen a threshold or widen the auction window. The watchlist and saved searches keep working while the docket refreshes.</p>
          <button class="btn btn-primary" type="button" id="empty-reset">Reset filters</button>
        </div>`;
      pagerEl.innerHTML = '';
      return;
    }

    if (state.view === 'map') {
      resultsEl.innerHTML = mapView(list);
      pagerEl.innerHTML = '';
      requestAnimationFrame(relaxMap);
      return;
    }

    const page = list.slice((state.page - 1) * state.perPage, state.page * state.perPage);

    if (state.view === 'table') {
      resultsEl.innerHTML = tableView(page);
    } else {
      resultsEl.innerHTML = `<div class="deal-grid${state.view === 'list' ? ' list' : ''}">${page.map(card).join('')}</div>`;
    }

    /* pager */
    if (pages > 1) {
      const nums = [];
      for (let i = 1; i <= pages; i++) {
        if (i === 1 || i === pages || Math.abs(i - state.page) <= 1) nums.push(i);
        else if (nums[nums.length - 1] !== '…') nums.push('…');
      }
      pagerEl.innerHTML =
        `<button type="button" data-page="${state.page - 1}"${state.page === 1 ? ' disabled' : ''}>&larr; Prev</button>` +
        nums.map((n) => (n === '…'
          ? `<button type="button" disabled>…</button>`
          : `<button type="button" data-page="${n}" class="${n === state.page ? 'on' : ''}">${n}</button>`)).join('') +
        `<button type="button" data-page="${state.page + 1}"${state.page === pages ? ' disabled' : ''}>Next &rarr;</button>`;
    } else {
      pagerEl.innerHTML = '';
    }
  }

  resultsEl.addEventListener('click', (e) => {
    if (e.target.id === 'empty-reset') {
      state.filters = freshFilters();
      document.getElementById('wk-q').value = '';
      state.page = 1;
      renderAll();
      return;
    }
    const saveBtn = e.target.closest('[data-save]');
    if (saveBtn) {
      e.stopPropagation();
      toggleSave(saveBtn.dataset.save);
      return;
    }
    const cluster = e.target.closest('[data-city]');
    if (cluster) {
      document.getElementById('wk-q').value = cluster.dataset.city;
      state.filters.q = cluster.dataset.city;
      state.view = 'grid';
      state.page = 1;
      renderAll();
      return;
    }
    const opener = e.target.closest('[data-open]') || e.target.closest('.deal-card');
    if (opener) openPanel(opener.dataset.open || opener.dataset.id);
  });

  pagerEl.addEventListener('click', (e) => {
    const b = e.target.closest('[data-page]');
    if (!b) return;
    state.page = Number(b.dataset.page);
    renderResults();
    document.getElementById('wk-shell').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });

  function toggleSave(id) {
    if (state.saved.has(id)) state.saved.delete(id); else state.saved.add(id);
    persistSaved();
    renderAll();
    if (state.active && state.active.id === id) syncPanelSaveButton();
  }

  /* =====================================================================
     Toolbar + tabs
     ===================================================================== */
  const qEl = document.getElementById('wk-q');
  let qTimer;
  qEl.addEventListener('input', () => {
    clearTimeout(qTimer);
    qTimer = setTimeout(() => {
      state.filters.q = qEl.value.trim();
      state.page = 1;
      renderAll();
    }, 180);
  });

  document.getElementById('wk-sort').addEventListener('change', (e) => {
    state.sort = e.target.value;
    state.page = 1;
    renderResults();
  });

  document.getElementById('wk-views').addEventListener('click', (e) => {
    const b = e.target.closest('[data-view]');
    if (!b) return;
    state.view = b.dataset.view;
    [...e.currentTarget.querySelectorAll('button')].forEach((x) => x.classList.toggle('on', x === b));
    state.page = 1;
    renderResults();
  });

  document.getElementById('wk-tabs').addEventListener('click', (e) => {
    const b = e.target.closest('[data-tab]');
    if (!b) return;
    state.tab = b.dataset.tab;
    state.page = 1;
    renderAll();
  });

  const railToggle = document.getElementById('rail-toggle');
  if (railToggle) {
    railToggle.addEventListener('click', () => setRail(!railEl.classList.contains('open')));
    const scrim = document.getElementById('rail-scrim');
    if (scrim) scrim.addEventListener('click', () => setRail(false));
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && railEl.classList.contains('open')) setRail(false);
    });
    window.addEventListener('resize', () => {
      if (window.innerWidth > 900 && railEl.classList.contains('open')) setRail(false);
      if (state.view === 'map') relaxMap();
    });
  }

  function renderTabs() {
    document.querySelectorAll('#wk-tabs [data-tab]').forEach((b) => {
      const key = b.dataset.tab;
      b.classList.toggle('active', key === state.tab);
      const c = b.querySelector('.tab-count');
      if (c) c.textContent = state.all.filter(TAB_PREDICATE[key]).length;
    });
  }

  function renderKpis() {
    const pool = tabPool();
    const set = (id, v) => { const el = document.getElementById(id); if (el) el.textContent = v; };
    set('kpi-active', int(state.all.filter((p) => p.status !== 'sold').length));
    const soon = state.all.filter((p) => { const d = daysUntil(p.auctionDate); return d >= 0 && d <= 30 && p.status !== 'sold'; });
    set('kpi-soon', int(soon.length));
    const spreads = pool.map((p) => uw(p).equitySpread).filter((n) => n > 0);
    set('kpi-equity', spreads.length ? usdK(spreads.reduce((a, b) => a + b, 0) / spreads.length) : '—');
    set('kpi-saved', int(state.saved.size));
  }

  /* =====================================================================
     Detail panel
     ===================================================================== */
  const panel = document.getElementById('dp');
  const backdrop = document.getElementById('dp-backdrop');

  function openPanel(id) {
    const p = state.all.find((x) => x.id === id);
    if (!p) return;
    state.active = p;
    state.override = null;
    renderPanel();
    panel.classList.add('open');
    backdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
    panel.querySelector('.dp-close').focus();
  }

  function closePanel() {
    panel.classList.remove('open');
    backdrop.classList.remove('open');
    document.body.style.overflow = '';
    state.active = null;
  }

  backdrop.addEventListener('click', closePanel);
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && state.active) closePanel(); });

  function syncPanelSaveButton() {
    const b = panel.querySelector('[data-panel-save]');
    if (!b || !state.active) return;
    const on = state.saved.has(state.active.id);
    b.textContent = on ? '★ On watchlist' : '☆ Add to watchlist';
    b.classList.toggle('ghost', !on);
  }

  function agentRows(p) {
    return D.AGENT_NAMES.map((a) => {
      const v = Math.round(p.agentScores[a.key]);
      return `<div class="agent-row">
        <div class="a-name">${a.label}<small>${a.blurb}</small></div>
        <div class="a-bar"><i style="width:${v}%;background:${ringColor(v)}"></i></div>
        <div class="a-val">${v}</div>
      </div>`;
    }).join('');
  }

  function waterfall(u) {
    const max = Math.max(u.arv, u.allIn + u.sellingCosts);
    const bar = (label, value, color) => `
      <div class="wf-row">
        <span class="wf-lbl">${label}</span>
        <span class="wf-track"><i style="width:${Math.max(1, Math.min(100, (Math.abs(value) / max) * 100)).toFixed(1)}%;background:${color}"></i></span>
        <span class="wf-val">${usd(value)}</span>
      </div>`;
    return `<div class="wf">
      ${bar('Resale (ARV)', u.arv, '#12724a')}
      ${bar('Purchase', -u.price, '#800020')}
      ${bar('Rehab', -u.rehab, '#9a5b06')}
      ${bar('Closing', -u.closing, '#3d4450')}
      ${bar('Holding carry', -u.holdingCarry, '#3d4450')}
      ${bar('Selling costs', -u.sellingCosts, '#3d4450')}
      ${bar('Net profit', u.flipProfit, u.flipProfit >= 0 ? '#12724a' : '#b3261e')}
    </div>`;
  }

  function verdictBlock(u, p) {
    const bidVsMao = u.mao - u.price;
    let cls = 'pass', text;
    if (u.dscr >= 1.2 && u.cashFlowMonthly > 150 && bidVsMao > 0) {
      cls = 'go';
      text = `Clears both screens — bid up to ${usd(u.mao)} (${usd(bidVsMao)} of headroom above the current price) and the hold still services debt at ${u.dscr.toFixed(2)}x.`;
    } else if (bidVsMao > 0 || u.cashFlowMonthly > 0) {
      cls = 'watch';
      text = `Partial clear — maximum allowable offer is ${usd(u.mao)} against a ${usd(u.price)} basis. ${u.dscr ? 'DSCR lands at ' + u.dscr.toFixed(2) + 'x. ' : ''}Verify scope before committing.`;
    } else {
      text = `Does not clear at ${usd(u.price)}. The 70% rule caps this file at ${usd(u.mao)}${u.cashFlowMonthly < 0 ? ` and the hold runs ${usd(Math.abs(u.cashFlowMonthly))}/mo negative` : ''}.`;
    }
    void p;
    return `<div class="verdict ${cls}">${text}</div>`;
  }

  function renderPanel() {
    const p = state.active;
    const u = D.underwrite(p, state.override || undefined);
    const base = uw(p);
    const dd = daysUntil(p.auctionDate);
    const comps = D.compsFor(p);
    const compAvgPsf = Math.round(comps.reduce((s, c) => s + c.psf, 0) / comps.length);
    const saved = state.saved.has(p.id);

    panel.innerHTML = `
      <div class="dp-head">
        <div class="top">
          <div>
            <h2>${esc(p.address)}</h2>
            <p class="addr-sub">${esc(p.city)}, ${p.state} ${p.zip} &middot; ${p.county} County &middot; File ${p.id}</p>
          </div>
          <button class="dp-close" type="button" aria-label="Close">&times;</button>
        </div>
        <div class="dp-head-badges">
          <span class="badge src-${p.source}">${p.sourceLabel}</span>
          <span class="badge st-${p.status}">${p.statusLabel}</span>
          <span class="badge">${p.typeLabel}</span>
          <span class="badge">${p.conditionLabel}</span>
          <span class="badge">${p.occupancyLabel}</span>
          <span class="badge">Score ${p.score}</span>
        </div>
        <div class="dp-tabs" role="tablist">
          <button class="dp-tab active" type="button" data-pane="overview">Overview</button>
          <button class="dp-tab" type="button" data-pane="underwriting">Underwriting</button>
          <button class="dp-tab" type="button" data-pane="sale">Sale &amp; title</button>
          <button class="dp-tab" type="button" data-pane="review">Agent review</button>
          <button class="dp-tab" type="button" data-pane="comps">Comps</button>
        </div>
      </div>

      <div class="dp-body">
        <!-- OVERVIEW -->
        <section class="dp-pane active" data-pane="overview">
          <div class="panel">
            <h3>Headline economics</h3>
            <div class="stat-row">
              <div class="stat"><span>Opening bid</span><strong>${usd(p.openingBid)}</strong><small>${p.sourceLabel}</small></div>
              <div class="stat"><span>Estimated ARV</span><strong>${usd(p.arv)}</strong><small>${p.sqft ? '$' + Math.round(p.arv / p.sqft) + '/sf' : 'land value'}</small></div>
              <div class="stat"><span>Rehab budget</span><strong>${usd(p.rehab)}</strong><small>${p.conditionLabel}</small></div>
              <div class="stat"><span>Equity spread</span><strong class="${base.equitySpread >= 0 ? 'pos' : 'neg'}">${usd(base.equitySpread)}</strong><small>${pct(base.equityPct, 0)} of ARV</small></div>
            </div>
          </div>

          <div class="panel">
            <h3>Platform read</h3>
            <p class="prose">${esc(p.summary)}</p>
          </div>

          <div class="panel">
            <h3>Upside</h3>
            <ul class="bullets up">${p.upside.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
          </div>

          <div class="panel">
            <h3>Risk flags</h3>
            <ul class="bullets risk">${p.risks.map((x) => `<li>${esc(x)}</li>`).join('')}</ul>
          </div>

          <div class="panel">
            <h3>Property record</h3>
            <dl class="kv">
              <div><dt>Property type</dt><dd>${p.typeLabel}${p.units > 1 ? ' (' + p.units + ' units)' : ''}</dd></div>
              <div><dt>Beds / baths</dt><dd>${p.beds || '—'} / ${p.baths || '—'}</dd></div>
              <div><dt>Living area</dt><dd>${p.sqft ? int(p.sqft) + ' sq ft' : '—'}</dd></div>
              <div><dt>Lot size</dt><dd>${int(p.lotSqft)} sq ft</dd></div>
              <div><dt>Year built</dt><dd>${p.year}</dd></div>
              <div><dt>Condition read</dt><dd>${p.conditionLabel}</dd></div>
              <div><dt>Occupancy</dt><dd>${p.occupancyLabel}</dd></div>
              <div><dt>Annual taxes</dt><dd>${usd(p.taxes)}</dd></div>
              ${p.hoa ? `<div><dt>HOA / common charge</dt><dd>${usd(p.hoa)}/mo</dd></div>` : ''}
              <div><dt>Market rent</dt><dd>${p.marketRent ? usd(p.marketRent) + '/mo' : '—'}</dd></div>
              <div><dt>Parcel / SBL</dt><dd>${p.parcel}</dd></div>
              <div><dt>Days on docket</dt><dd>${p.daysOnMarket}</dd></div>
            </dl>
          </div>
        </section>

        <!-- UNDERWRITING -->
        <section class="dp-pane" data-pane="underwriting">
          <div class="panel">
            <h3>Live assumptions</h3>
            <div class="calc-grid" id="calc">
              <div class="calc-field">
                <label for="c-purchase">Purchase price <b id="c-purchase-v">${usd(u.price)}</b></label>
                <input type="range" id="c-purchase" min="${Math.round(p.openingBid * 0.5)}" max="${Math.round(p.openingBid * 2)}" step="500" value="${Math.round(u.price)}">
              </div>
              <div class="calc-field">
                <label for="c-rehab">Rehab budget <b id="c-rehab-v">${usd(u.rehab)}</b></label>
                <input type="range" id="c-rehab" min="0" max="${Math.max(20000, Math.round(p.rehab * 2.5))}" step="500" value="${Math.round(u.rehab)}">
              </div>
              <div class="calc-field">
                <label for="c-arv">Exit value (ARV) <b id="c-arv-v">${usd(u.arv)}</b></label>
                <input type="range" id="c-arv" min="${Math.round(p.arv * 0.6)}" max="${Math.round(p.arv * 1.4)}" step="1000" value="${Math.round(u.arv)}">
              </div>
              <div class="calc-field">
                <label for="c-rent">Monthly rent <b id="c-rent-v">${usd(u.rent)}</b></label>
                <input type="range" id="c-rent" min="0" max="${Math.max(1200, Math.round((p.marketRent || 1000) * 1.8))}" step="25" value="${Math.round(u.rent)}">
              </div>
              <div class="calc-field">
                <label for="c-down">Down payment <b id="c-down-v">${pct(u.assumptions.downPct, 0)}</b></label>
                <input type="range" id="c-down" min="0" max="100" step="5" value="${Math.round(u.assumptions.downPct * 100)}">
              </div>
              <div class="calc-field">
                <label for="c-rate">Interest rate <b id="c-rate-v">${pct(u.assumptions.ratePct, 2)}</b></label>
                <input type="range" id="c-rate" min="400" max="1400" step="5" value="${Math.round(u.assumptions.ratePct * 10000)}">
              </div>
              <div class="calc-field">
                <label for="c-hold">Hold before exit <b id="c-hold-v">${u.assumptions.holdMonths} mo</b></label>
                <input type="range" id="c-hold" min="1" max="24" step="1" value="${u.assumptions.holdMonths}">
              </div>
              <div class="calc-field">
                <label for="c-refi">Refinance LTV <b id="c-refi-v">${pct(u.assumptions.refiLtv, 0)}</b></label>
                <input type="range" id="c-refi" min="50" max="85" step="1" value="${Math.round(u.assumptions.refiLtv * 100)}">
              </div>
            </div>
            <div id="calc-verdict">${verdictBlock(u, p)}</div>
            <p style="margin-top:.75rem"><button class="btn-sm ghost" type="button" id="calc-reset">Reset to platform assumptions</button></p>
          </div>

          <div id="calc-out">${underwritingPanes(p, u)}</div>
        </section>

        <!-- SALE & TITLE -->
        <section class="dp-pane" data-pane="sale">
          <div class="panel">
            <h3>Auction</h3>
            <div class="stat-row">
              <div class="stat"><span>Sale date</span><strong>${dateLabel(p.auctionDate)}</strong><small>${dd < 0 ? 'passed' : dd === 0 ? 'today' : 'in ' + dd + ' days'}</small></div>
              <div class="stat"><span>Time</span><strong>${p.auctionTime}</strong><small>local</small></div>
              <div class="stat"><span>Deposit</span><strong>${p.depositPct}%</strong><small>certified funds at hammer</small></div>
              <div class="stat"><span>Status</span><strong>${p.statusLabel}</strong><small>${p.sourceLabel}</small></div>
            </div>
          </div>
          <div class="panel">
            <h3>Filing detail</h3>
            <dl class="kv">
              <div><dt>Plaintiff</dt><dd>${esc(p.plaintiff)}</dd></div>
              <div><dt>Plaintiff's counsel</dt><dd>${esc(p.attorney)}</dd></div>
              <div><dt>Index number</dt><dd>${p.caseNumber}</dd></div>
              <div><dt>Judgment amount</dt><dd>${usd(p.judgment)}</dd></div>
              <div><dt>Upset / opening bid</dt><dd>${usd(p.openingBid)}</dd></div>
              <div><dt>Lien position</dt><dd>${p.lienPosition}</dd></div>
              <div><dt>Title risk read</dt><dd>${p.titleRisk.charAt(0).toUpperCase() + p.titleRisk.slice(1)}</dd></div>
              <div><dt>Redemption</dt><dd>${p.redemption}</dd></div>
              <div><dt>Sale venue</dt><dd style="text-align:right">${esc(p.saleVenue)}</dd></div>
            </dl>
          </div>
          <div class="panel">
            <h3>Bidder checklist</h3>
            <ul class="bullets">
              <li>Order a title rundown and confirm which junior liens are extinguished by the referee's deed.</li>
              <li>Confirm ${p.depositPct}% deposit in certified funds and the balance-due window with the referee.</li>
              <li>Verify with the plaintiff's counsel that the sale has not been adjourned within 24 hours of the hammer.</li>
              <li>Search open code violations and unpaid water and sewer charges &mdash; these survive the sale.</li>
              ${p.occupancy !== 'vacant' ? '<li>Budget counsel and time for a holdover proceeding to obtain possession.</li>' : '<li>Confirm the property is secured and winterized before closing.</li>'}
            </ul>
          </div>
        </section>

        <!-- AGENT REVIEW -->
        <section class="dp-pane" data-pane="review">
          <div class="panel">
            <h3>Composite score &mdash; ${p.score} / 100</h3>
            ${agentRows(p)}
          </div>
          <div class="panel">
            <h3>Strategy fit</h3>
            ${['flip', 'rental', 'brrrr'].map((s) => {
              const on = p.strategies.includes(s);
              const detail = s === 'flip'
                ? `Net profit ${usd(base.flipProfit)} after ${usd(base.sellingCosts)} selling costs; maximum allowable offer ${usd(base.mao)}.`
                : s === 'rental'
                  ? `${usd(base.cashFlowMonthly)}/mo cash flow at ${base.dscr ? base.dscr.toFixed(2) + 'x' : '—'} DSCR, ${pct(base.capRate)} yield on cost.`
                  : `Refi at ${pct(base.assumptions.refiLtv, 0)} LTV pulls ${usd(Math.max(0, base.cashOut))} back out, leaving ${usd(Math.max(0, base.cashLeftIn))} in the deal.`;
              return `<div style="padding:.7rem 0;border-bottom:1px solid var(--p-line)">
                <div style="display:flex;align-items:center;gap:.5rem;margin-bottom:.2rem">
                  <strong style="font-family:Inter,sans-serif;font-size:.95rem">${STRAT_LABEL[s]}</strong>
                  <span class="metric ${on ? 'good' : 'bad'}"><b>${on ? 'Fits' : 'Does not fit'}</b></span>
                </div>
                <p style="font-size:.86rem;color:var(--p-muted)">${detail}</p>
              </div>`;
            }).join('')}
          </div>
          <div class="panel">
            <h3>How this score is built</h3>
            <p class="prose">Seven review agents each score the file independently, then the composite weights them toward the factors that actually decide a distressed purchase: valuation (26%), rentability (18%), condition (16%), financing (15%), exit (12%), title (8%), and sourcing freshness (5%). Every input is recomputed from the underwriting model above, so changing an assumption changes the score inputs it depends on.</p>
          </div>
        </section>

        <!-- COMPS -->
        <section class="dp-pane" data-pane="comps">
          <div class="panel">
            <h3>Recent sales within 1.5 miles</h3>
            <table class="comps">
              <thead><tr>
                <th>Address</th><th class="num">Beds</th><th class="num">Sq ft</th>
                <th class="num">Sold</th><th class="num">$/sf</th><th class="num">Date</th><th class="num">Mi.</th>
              </tr></thead>
              <tbody>
                ${comps.map((c) => `<tr>
                  <td>${esc(c.address)}</td>
                  <td class="num">${c.beds}</td>
                  <td class="num">${int(c.sqft)}</td>
                  <td class="num">${usd(c.soldPrice)}</td>
                  <td class="num">$${c.psf}</td>
                  <td class="num">${dateLabel(c.soldDate)}</td>
                  <td class="num">${c.distance}</td>
                </tr>`).join('')}
              </tbody>
            </table>
          </div>
          <div class="panel">
            <h3>Valuation bridge</h3>
            <dl class="kv">
              <div><dt>Comp average $/sf</dt><dd>$${compAvgPsf}</dd></div>
              <div><dt>Subject sq ft</dt><dd>${p.sqft ? int(p.sqft) : '—'}</dd></div>
              <div><dt>Indicated value</dt><dd>${p.sqft ? usd(compAvgPsf * p.sqft) : '—'}</dd></div>
              <div><dt>Modeled ARV</dt><dd>${usd(p.arv)}</dd></div>
              <div><dt>Variance to comps</dt><dd class="${p.sqft && p.arv >= compAvgPsf * p.sqft ? 'pos' : 'neg'}">${p.sqft ? usd(p.arv - compAvgPsf * p.sqft) : '—'}</dd></div>
            </dl>
            <p class="prose" style="margin-top:.9rem;font-size:.86rem;color:var(--p-muted)">Comparables are condition-adjusted to a renovated standard. A wide variance against the comp average usually means the condition read, not the market, is doing the work &mdash; re-scope before bidding.</p>
          </div>
        </section>
      </div>

      <div class="dp-foot">
        <button class="btn-sm ghost" type="button" data-panel-save>${saved ? '★ On watchlist' : '☆ Add to watchlist'}</button>
        <button class="btn-sm ghost" type="button" id="dp-copy">Copy deal summary</button>
        <span class="foot-note">Sample data &mdash; verify with the county docket.</span>
        <a class="btn-sm" href="contact.html" style="text-decoration:none;display:inline-block">Request the full file</a>
      </div>
    `;

    wirePanel(p);
  }

  function underwritingPanes(p, u) {
    return `
      <div class="panel">
        <h3>Acquisition &amp; basis</h3>
        <dl class="kv">
          <div><dt>Purchase price</dt><dd>${usd(u.price)}</dd></div>
          <div><dt>Rehab budget</dt><dd>${usd(u.rehab)}</dd></div>
          <div><dt>Closing costs (${pct(u.assumptions.closingPct, 1)})</dt><dd>${usd(u.closing)}</dd></div>
          <div><dt>Holding carry (${u.assumptions.holdMonths} mo)</dt><dd>${usd(u.holdingCarry)}</dd></div>
          <div><dt>All-in basis</dt><dd>${usd(u.allIn)}</dd></div>
          <div><dt>Basis as % of ARV</dt><dd>${pct(u.allIn / u.arv, 0)}</dd></div>
          <div><dt>Down payment</dt><dd>${usd(u.down)}</dd></div>
          <div><dt>Acquisition loan</dt><dd>${usd(u.loan)}</dd></div>
          <div><dt>Total cash in</dt><dd>${usd(u.cashInvested)}</dd></div>
        </dl>
      </div>

      <div class="panel">
        <h3>Stabilized operations</h3>
        <div class="stat-row" style="margin-bottom:1rem">
          <div class="stat"><span>NOI</span><strong>${usd(u.noi)}</strong><small>annual</small></div>
          <div class="stat"><span>Cash flow</span><strong class="${u.cashFlowMonthly >= 0 ? 'pos' : 'neg'}">${usd(u.cashFlowMonthly)}</strong><small>per month</small></div>
          <div class="stat"><span>DSCR</span><strong>${u.dscr ? u.dscr.toFixed(2) + 'x' : '—'}</strong><small>${u.dscr >= 1.25 ? 'above lender floor' : u.dscr >= 1.1 ? 'thin' : 'below floor'}</small></div>
          <div class="stat"><span>Cash-on-cash</span><strong class="${u.cashOnCash >= 0 ? 'pos' : 'neg'}">${pct(u.cashOnCash)}</strong><small>year one</small></div>
        </div>
        <dl class="kv">
          <div><dt>Gross scheduled income</dt><dd>${usd(u.gsi)}</dd></div>
          <div><dt>Vacancy (${pct(u.assumptions.vacancyPct, 0)})</dt><dd>-${usd(u.vacancy)}</dd></div>
          <div><dt>Effective gross income</dt><dd>${usd(u.egi)}</dd></div>
          <div><dt>Operating expenses</dt><dd>-${usd(u.opex)}</dd></div>
          <div><dt>Annual debt service</dt><dd>-${usd(u.annualDebt)}</dd></div>
          <div><dt>Yield on cost</dt><dd>${pct(u.yieldOnCost)}</dd></div>
          <div><dt>Gross rent multiplier</dt><dd>${u.grm ? u.grm.toFixed(1) + 'x' : '—'}</dd></div>
          <div><dt>Rent-to-price (1% rule)</dt><dd>${pct(u.onePctRule, 2)}</dd></div>
        </dl>
      </div>

      <div class="panel">
        <h3>Resale exit</h3>
        ${waterfall(u)}
        <dl class="kv" style="margin-top:1rem">
          <div><dt>Return on cash invested</dt><dd class="${u.flipRoi >= 0 ? 'pos' : 'neg'}">${pct(u.flipRoi, 0)}</dd></div>
          <div><dt>Maximum allowable offer (70%)</dt><dd>${usd(u.mao)}</dd></div>
          <div><dt>Headroom vs. current price</dt><dd class="${u.mao - u.price >= 0 ? 'pos' : 'neg'}">${usd(u.mao - u.price)}</dd></div>
        </dl>
      </div>

      <div class="panel">
        <h3>BRRRR refinance</h3>
        <dl class="kv">
          <div><dt>Refinance loan (${pct(u.assumptions.refiLtv, 0)} LTV)</dt><dd>${usd(u.refiLoan)}</dd></div>
          <div><dt>Payoff of acquisition loan</dt><dd>-${usd(u.loan)}</dd></div>
          <div><dt>Cash returned at refi</dt><dd class="${u.cashOut >= 0 ? 'pos' : 'neg'}">${usd(u.cashOut)}</dd></div>
          <div><dt>Capital left in the deal</dt><dd>${usd(Math.max(0, u.cashLeftIn))}</dd></div>
          <div><dt>Post-refi cash flow</dt><dd class="${u.refiCashFlow >= 0 ? 'pos' : 'neg'}">${usd(u.refiCashFlow)}/mo</dd></div>
          <div><dt>Post-refi DSCR</dt><dd>${u.refiDscr ? u.refiDscr.toFixed(2) + 'x' : '—'}</dd></div>
        </dl>
      </div>`;
  }

  function wirePanel(p) {
    panel.querySelector('.dp-close').addEventListener('click', closePanel);

    panel.querySelector('.dp-tabs').addEventListener('click', (e) => {
      const b = e.target.closest('[data-pane]');
      if (!b) return;
      panel.querySelectorAll('.dp-tab').forEach((x) => x.classList.toggle('active', x === b));
      panel.querySelectorAll('.dp-pane').forEach((x) => x.classList.toggle('active', x.dataset.pane === b.dataset.pane));
      panel.querySelector('.dp-body').scrollTop = 0;
    });

    panel.querySelector('[data-panel-save]').addEventListener('click', () => toggleSave(p.id));

    const copyBtn = panel.querySelector('#dp-copy');
    copyBtn.addEventListener('click', () => {
      const u = D.underwrite(p, state.override || undefined);
      const text = [
        `${p.address}, ${p.city}, NY ${p.zip} (${p.county} County) — file ${p.id}`,
        `${p.sourceLabel} · ${p.statusLabel} · auction ${dateLabel(p.auctionDate)} at ${p.auctionTime}`,
        `Opening bid ${usd(p.openingBid)} | ARV ${usd(u.arv)} | Rehab ${usd(u.rehab)} | All-in ${usd(u.allIn)}`,
        `Equity spread ${usd(u.equitySpread)} (${pct(u.equityPct, 0)}) | MAO ${usd(u.mao)}`,
        `NOI ${usd(u.noi)} | Cash flow ${usd(u.cashFlowMonthly)}/mo | DSCR ${u.dscr ? u.dscr.toFixed(2) + 'x' : '—'} | CoC ${pct(u.cashOnCash)}`,
        `Index ${p.caseNumber} · parcel ${p.parcel} · plaintiff ${p.plaintiff}`,
        `Composite score ${p.score}/100. Sample data — verify against the county docket before bidding.`
      ].join('\n');
      const done = () => { copyBtn.textContent = 'Copied'; setTimeout(() => { copyBtn.textContent = 'Copy deal summary'; }, 1800); };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done, done);
      } else { done(); }
    });

    /* --- live analyzer --- */
    const calc = panel.querySelector('#calc');
    const out = panel.querySelector('#calc-out');
    const verdict = panel.querySelector('#calc-verdict');

    function readCalc() {
      return {
        purchase: Number(panel.querySelector('#c-purchase').value),
        rehab: Number(panel.querySelector('#c-rehab').value),
        arv: Number(panel.querySelector('#c-arv').value),
        rent: Number(panel.querySelector('#c-rent').value),
        downPct: Number(panel.querySelector('#c-down').value) / 100,
        ratePct: Number(panel.querySelector('#c-rate').value) / 10000,
        holdMonths: Number(panel.querySelector('#c-hold').value),
        refiLtv: Number(panel.querySelector('#c-refi').value) / 100
      };
    }

    let raf;
    calc.addEventListener('input', () => {
      state.override = readCalc();
      const u = D.underwrite(p, state.override);
      panel.querySelector('#c-purchase-v').textContent = usd(u.price);
      panel.querySelector('#c-rehab-v').textContent = usd(u.rehab);
      panel.querySelector('#c-arv-v').textContent = usd(u.arv);
      panel.querySelector('#c-rent-v').textContent = usd(u.rent);
      panel.querySelector('#c-down-v').textContent = pct(u.assumptions.downPct, 0);
      panel.querySelector('#c-rate-v').textContent = pct(u.assumptions.ratePct, 2);
      panel.querySelector('#c-hold-v').textContent = u.assumptions.holdMonths + ' mo';
      panel.querySelector('#c-refi-v').textContent = pct(u.assumptions.refiLtv, 0);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        out.innerHTML = underwritingPanes(p, u);
        verdict.innerHTML = verdictBlock(u, p);
      });
    });

    panel.querySelector('#calc-reset').addEventListener('click', () => {
      state.override = null;
      renderPanel();
      panel.querySelectorAll('.dp-tab').forEach((x) => x.classList.toggle('active', x.dataset.pane === 'underwriting'));
      panel.querySelectorAll('.dp-pane').forEach((x) => x.classList.toggle('active', x.dataset.pane === 'underwriting'));
    });
  }

  /* =====================================================================
     Boot
     ===================================================================== */
  function renderAll() {
    renderTabs();
    renderKpis();
    renderRail();
    renderChips();
    renderResults();
  }

  function skeletons(n) {
    return `<div class="deal-grid">${Array.from({ length: n }, () => `
      <div class="skel"><div class="bar m"></div><div class="b">
        <div class="bar" style="height:16px;width:70%"></div>
        <div class="bar" style="height:12px;width:45%"></div>
        <div class="bar" style="height:44px"></div>
        <div class="bar" style="height:30px"></div>
      </div></div>`).join('')}</div>`;
  }

  resultsEl.innerHTML = skeletons(6);
  setTimeout(() => {
    state.all = D.load();
    renderAll();
  }, 260);
})();
