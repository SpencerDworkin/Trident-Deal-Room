/* =====================================================================
   LLD Enterprises — Deal Engine: sample dataset + underwriting math
   ---------------------------------------------------------------------
   NOTE: Every property record produced here is SAMPLE DATA generated
   deterministically in the browser for demonstration of the platform UI.
   None of it represents a real foreclosure filing, judgment, docket
   number, or auction. Wire `LLD.Deals.load()` to a live feed before use.
   ===================================================================== */

(function (global) {
  'use strict';

  /* ---------- deterministic PRNG (mulberry32) ---------- */
  function rng(seed) {
    return function () {
      seed |= 0;
      seed = (seed + 0x6D2B79F5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  /* ---------- reference tables ---------- */
  const PLACES = [
    { city: 'Rochester',      zip: '14613', county: 'Monroe',     tier: 0.72 },
    { city: 'Rochester',      zip: '14621', county: 'Monroe',     tier: 0.66 },
    { city: 'Rochester',      zip: '14611', county: 'Monroe',     tier: 0.70 },
    { city: 'Rochester',      zip: '14620', county: 'Monroe',     tier: 0.95 },
    { city: 'Rochester',      zip: '14607', county: 'Monroe',     tier: 1.12 },
    { city: 'Irondequoit',    zip: '14617', county: 'Monroe',     tier: 1.02 },
    { city: 'Greece',         zip: '14616', county: 'Monroe',     tier: 1.00 },
    { city: 'Gates',          zip: '14624', county: 'Monroe',     tier: 0.98 },
    { city: 'Henrietta',      zip: '14467', county: 'Monroe',     tier: 1.10 },
    { city: 'Brighton',       zip: '14618', county: 'Monroe',     tier: 1.28 },
    { city: 'Webster',        zip: '14580', county: 'Monroe',     tier: 1.18 },
    { city: 'Penfield',       zip: '14526', county: 'Monroe',     tier: 1.22 },
    { city: 'Chili',          zip: '14428', county: 'Monroe',     tier: 1.04 },
    { city: 'Spencerport',    zip: '14559', county: 'Monroe',     tier: 1.05 },
    { city: 'Fairport',       zip: '14450', county: 'Monroe',     tier: 1.26 },
    { city: 'East Rochester', zip: '14445', county: 'Monroe',     tier: 1.06 },
    { city: 'Hilton',         zip: '14468', county: 'Monroe',     tier: 1.01 },
    { city: 'Brockport',      zip: '14420', county: 'Monroe',     tier: 0.92 },
    { city: 'Canandaigua',    zip: '14424', county: 'Ontario',    tier: 1.20 },
    { city: 'Geneva',         zip: '14456', county: 'Ontario',    tier: 0.88 },
    { city: 'Victor',         zip: '14564', county: 'Ontario',    tier: 1.30 },
    { city: 'Newark',         zip: '14513', county: 'Wayne',      tier: 0.84 },
    { city: 'Macedon',        zip: '14502', county: 'Wayne',      tier: 1.00 },
    { city: 'Sodus',          zip: '14551', county: 'Wayne',      tier: 0.78 },
    { city: 'Batavia',        zip: '14020', county: 'Genesee',    tier: 0.86 },
    { city: 'Le Roy',         zip: '14482', county: 'Genesee',    tier: 0.90 },
    { city: 'Avon',           zip: '14414', county: 'Livingston', tier: 1.00 },
    { city: 'Geneseo',        zip: '14454', county: 'Livingston', tier: 1.03 },
    { city: 'Albion',         zip: '14411', county: 'Orleans',    tier: 0.74 },
    { city: 'Medina',         zip: '14103', county: 'Orleans',    tier: 0.76 }
  ];

  const STREETS = [
    'Bidwell Terrace', 'Dewey Avenue', 'Lake Avenue', 'Ridgeway Avenue', 'Emerson Street',
    'Clifford Avenue', 'Portland Avenue', 'Hudson Avenue', 'Genesee Park Boulevard',
    'Thurston Road', 'Chili Avenue', 'Culver Road', 'Winton Road', 'Monroe Avenue',
    'Highland Avenue', 'Titus Avenue', 'Norton Street', 'Seneca Avenue', 'Merchants Road',
    'Empire Boulevard', 'Browncroft Boulevard', 'Elmwood Avenue', 'Mount Hope Avenue',
    'Jefferson Road', 'Buffalo Road', 'Long Pond Road', 'Latta Road', 'Maiden Lane',
    'Whitney Road', 'Turk Hill Road', 'Fairport Nine Mile Point Road', 'Plank Road',
    'Salt Road', 'Ontario Street', 'Church Street', 'Maple Avenue', 'Walnut Street',
    'Prospect Street', 'Sycamore Lane', 'Orchard Drive', 'Woodbine Avenue', 'Garson Avenue',
    'Parsells Avenue', 'Colvin Street', 'Barrington Street', 'Rosewood Terrace',
    'Glide Street', 'Verona Street', 'Sawyer Street', 'Immel Street'
  ];

  const PLAINTIFFS = [
    'Genesee Valley Savings Bank', 'Lakeshore Mortgage Trust, Series 2019-3',
    'Empire State Federal Credit Union', 'Cascade Loan Servicing LLC',
    'Ironwood Residential Capital', 'Five Star Community Bank',
    'Harborview Asset Trust 2018-A', 'Riverbend Mortgage Corporation',
    'Nationwide Home Loan Servicing', 'Monroe County Treasurer (Tax Lien)',
    'Summit Ridge Funding LLC', 'Bay Point Credit Union'
  ];

  const ATTORNEYS = [
    'Halloran & Pike LLP', 'Westbrook Legal Group', 'Cornerstone Foreclosure Counsel',
    'Danforth, Reyes & Moss', 'Lakeside Title Attorneys PC'
  ];

  const SALE_VENUES = {
    Monroe:     'Hall of Justice, 99 Exchange Blvd, Rochester, NY',
    Ontario:    'Ontario County Courthouse, 27 N Main St, Canandaigua, NY',
    Wayne:      'Wayne County Courthouse, 26 Church St, Lyons, NY',
    Genesee:    'Genesee County Courts Facility, 1 W Main St, Batavia, NY',
    Livingston: 'Livingston County Courthouse, 2 Court St, Geneseo, NY',
    Orleans:    'Orleans County Courthouse, 1 S Main St, Albion, NY'
  };

  const TYPES = [
    { key: 'single-family', label: 'Single Family', weight: 46 },
    { key: 'multi-family',  label: 'Multi-Family',  weight: 24 },
    { key: 'townhouse',     label: 'Townhouse',     weight: 9 },
    { key: 'condo',         label: 'Condo',         weight: 7 },
    { key: 'mixed-use',     label: 'Mixed Use',     weight: 6 },
    { key: 'commercial',    label: 'Commercial',    weight: 5 },
    { key: 'land',          label: 'Land',          weight: 3 }
  ];

  const SOURCES = [
    { key: 'sheriff-sale',   label: 'Sheriff Sale',     weight: 38 },
    { key: 'tax-foreclosure',label: 'Tax Foreclosure',  weight: 16 },
    { key: 'reo',            label: 'Bank-Owned / REO', weight: 15 },
    { key: 'pre-foreclosure',label: 'Pre-Foreclosure',  weight: 14 },
    { key: 'probate',        label: 'Probate / Estate', weight: 10 },
    { key: 'off-market',     label: 'Off-Market',       weight: 7 }
  ];

  const CONDITIONS = [
    { key: 'teardown',  label: 'Tear-Down',        rehabPsf: [62, 95], weight: 6 },
    { key: 'heavy',     label: 'Heavy Rehab',      rehabPsf: [38, 62], weight: 22 },
    { key: 'moderate',  label: 'Moderate Rehab',   rehabPsf: [20, 38], weight: 34 },
    { key: 'light',     label: 'Cosmetic',         rehabPsf: [8, 20],  weight: 28 },
    { key: 'turnkey',   label: 'Rent Ready',       rehabPsf: [2, 8],   weight: 10 }
  ];

  const OCCUPANCY = [
    { key: 'vacant',   label: 'Vacant',           weight: 42 },
    { key: 'tenant',   label: 'Tenant-Occupied',  weight: 26 },
    { key: 'owner',    label: 'Owner-Occupied',   weight: 22 },
    { key: 'unknown',  label: 'Occupancy Unknown',weight: 10 }
  ];

  const STATUSES = [
    { key: 'on-market',  label: 'On Market' },
    { key: 'scheduled',  label: 'Auction Scheduled' },
    { key: 'postponed',  label: 'Postponed' },
    { key: 'pending',    label: 'Under Contract' },
    { key: 'sold',       label: 'Sold' }
  ];

  const AGENT_NAMES = [
    { key: 'sourcing',   label: 'Sourcing Agent',    blurb: 'Docket + auction feed coverage and filing freshness' },
    { key: 'valuation',  label: 'Valuation Agent',   blurb: 'ARV from paired comps, adjusted for condition' },
    { key: 'condition',  label: 'Condition Agent',   blurb: 'Scope and rehab budget from permits, photos, age' },
    { key: 'rentability',label: 'Rentability Agent', blurb: 'Market rent, absorption, and tenant demand depth' },
    { key: 'financing',  label: 'Financing Agent',   blurb: 'DSCR eligibility and bridge-to-perm takeout fit' },
    { key: 'title',      label: 'Title Agent',       blurb: 'Lien position, junior liens, and survivability' },
    { key: 'exit',       label: 'Exit Agent',        blurb: 'Resale velocity and buyer pool at target price' }
  ];

  /* ---------- helpers ---------- */
  function weighted(rand, list) {
    const total = list.reduce((s, x) => s + x.weight, 0);
    let r = rand() * total;
    for (const item of list) {
      r -= item.weight;
      if (r <= 0) return item;
    }
    return list[list.length - 1];
  }

  const pick = (rand, arr) => arr[Math.floor(rand() * arr.length)];
  const between = (rand, lo, hi) => lo + rand() * (hi - lo);
  const roundTo = (n, step) => Math.round(n / step) * step;

  function addDays(base, days) {
    const d = new Date(base.getTime());
    d.setDate(d.getDate() + days);
    return d;
  }
  const iso = (d) => d.toISOString().slice(0, 10);

  /* =====================================================================
     Underwriting engine — all card / detail numbers derive from this,
     so changing an assumption anywhere recomputes everything downstream.
     ===================================================================== */

  const DEFAULT_ASSUMPTIONS = {
    downPct: 0.25,          // acquisition down payment
    ratePct: 0.0795,        // bridge / DSCR note rate
    termYears: 30,
    closingPct: 0.025,      // buyer-side closing on acquisition
    holdMonths: 6,          // rehab + season before refi or resale
    sellingPct: 0.07,       // commission + seller closing on resale
    vacancyPct: 0.07,
    maintenancePct: 0.06,
    mgmtPct: 0.08,
    capexPct: 0.05,
    insuranceRate: 0.0055,  // annual, as % of ARV
    refiLtv: 0.75,          // BRRRR cash-out ceiling
    flipRule: 0.70          // classic 70% MAO rule
  };

  function monthlyPayment(principal, annualRate, years) {
    if (principal <= 0) return 0;
    const r = annualRate / 12;
    const n = years * 12;
    if (r === 0) return principal / n;
    return (principal * r) / (1 - Math.pow(1 + r, -n));
  }

  /**
   * Full underwrite for one property.
   * @param {object} p        property record
   * @param {object} [over]   assumption overrides (from the deal analyzer)
   */
  function underwrite(p, over) {
    const a = Object.assign({}, DEFAULT_ASSUMPTIONS, over || {});
    const price = Math.max(1, over && over.purchase != null ? over.purchase : p.openingBid);
    const rehab = Math.max(0, over && over.rehab != null ? over.rehab : p.rehab);
    const arv = Math.max(1, over && over.arv != null ? over.arv : p.arv);
    const rent = Math.max(0, over && over.rent != null ? over.rent : p.marketRent);

    /* --- acquisition --- */
    const closing = price * a.closingPct;
    const insurance = arv * a.insuranceRate;
    const holdingCarry = (price * a.ratePct / 12 + p.taxes / 12 + insurance / 12 + 180) * a.holdMonths;
    const allIn = price + rehab + closing + holdingCarry;

    const down = price * a.downPct;
    const loan = price - down;
    const cashInvested = down + rehab + closing + holdingCarry;

    /* --- rental / hold --- */
    const gsi = rent * 12;
    const vacancy = gsi * a.vacancyPct;
    const egi = gsi - vacancy;
    const opex = p.taxes + insurance + gsi * (a.maintenancePct + a.mgmtPct + a.capexPct) + (p.hoa || 0) * 12;
    const noi = egi - opex;

    const pmt = monthlyPayment(loan, a.ratePct, a.termYears);
    const annualDebt = pmt * 12;
    const cashFlowMonthly = (noi - annualDebt) / 12;
    const dscr = annualDebt > 0 ? noi / annualDebt : null;
    const capRate = allIn > 0 ? noi / allIn : 0;
    const yieldOnCost = allIn > 0 ? noi / allIn : 0;
    const cashOnCash = cashInvested > 0 ? (noi - annualDebt) / cashInvested : 0;
    const grm = gsi > 0 ? allIn / gsi : 0;
    const onePctRule = price > 0 ? rent / price : 0;

    /* --- flip --- */
    const sellingCosts = arv * a.sellingPct;
    const flipProfit = arv - allIn - sellingCosts;
    const flipRoi = allIn > 0 ? flipProfit / (cashInvested || allIn) : 0;
    const mao = arv * a.flipRule - rehab;

    /* --- BRRRR --- */
    const refiLoan = arv * a.refiLtv;
    const cashOut = refiLoan - loan;
    const cashLeftIn = cashInvested - Math.max(0, cashOut);
    const refiPmt = monthlyPayment(refiLoan, a.ratePct, a.termYears);
    const refiCashFlow = (noi - refiPmt * 12) / 12;
    const refiDscr = refiPmt > 0 ? noi / (refiPmt * 12) : null;

    /* --- equity --- */
    const equitySpread = arv - (price + rehab);
    const equityPct = arv > 0 ? equitySpread / arv : 0;

    return {
      assumptions: a,
      price, rehab, arv, rent,
      closing, insurance, holdingCarry, allIn, down, loan, cashInvested,
      gsi, vacancy, egi, opex, noi,
      monthlyDebt: pmt, annualDebt, cashFlowMonthly, dscr, capRate, yieldOnCost,
      cashOnCash, grm, onePctRule,
      sellingCosts, flipProfit, flipRoi, mao,
      refiLoan, cashOut, cashLeftIn, refiCashFlow, refiDscr,
      equitySpread, equityPct
    };
  }

  /* ---------- deal score: blended agent verdicts ---------- */
  function scoreDeal(p, u) {
    const clamp = (n) => Math.max(0, Math.min(100, n));
    const flipMargin = u.arv > 0 ? u.flipProfit / u.arv : 0;
    const s = {
      sourcing:    clamp(52 + (p.daysOnMarket < 14 ? 32 : p.daysOnMarket < 45 ? 16 : 0) + (p.source === 'off-market' ? 8 : 0)),
      valuation:   clamp(28 + u.equityPct * 130),
      condition:   clamp({ turnkey: 92, light: 80, moderate: 63, heavy: 42, teardown: 22 }[p.condition]),
      rentability: clamp(15 + u.onePctRule * 4200),
      financing:   clamp(u.dscr ? 26 + (u.dscr - 0.9) * 125 : 38),
      title:       clamp(p.titleRisk === 'low' ? 88 : p.titleRisk === 'medium' ? 62 : 34),
      exit:        clamp(22 + flipMargin * 250)
    };
    const weights = { valuation: 0.26, rentability: 0.18, condition: 0.16, financing: 0.15, exit: 0.12, title: 0.08, sourcing: 0.05 };
    const overall = Object.keys(weights).reduce((sum, k) => sum + s[k] * weights[k], 0);
    return { agents: s, overall: Math.round(overall) };
  }

  function strategiesFor(p, u, score) {
    const out = [];
    if (u.flipProfit > 22000 && u.equityPct > 0.22) out.push('flip');
    if (u.cashFlowMonthly > 175 && (u.dscr || 0) >= 1.15) out.push('rental');
    if (u.cashLeftIn < u.cashInvested * 0.45 && u.equityPct > 0.25) out.push('brrrr');
    if (!out.length && score.overall >= 62) out.push('rental');
    return out;
  }

  /* ---------- narrative built from the computed numbers ---------- */
  const fmtUsd0 = (n) => '$' + Math.round(n).toLocaleString('en-US');

  function buildNarrative(p, u, score) {
    const cond = CONDITIONS.find((c) => c.key === p.condition).label.toLowerCase();
    const lead = `${p.typeLabel} in ${p.city} sourced through ${p.sourceLabel} with an opening bid of ${fmtUsd0(p.openingBid)} against a modeled ARV of ${fmtUsd0(p.arv)}.`;
    const work = `Condition read is ${cond}; the scope carries a ${fmtUsd0(p.rehab)} budget, putting the all-in basis near ${fmtUsd0(u.allIn)} including carry and closing.`;
    const hold = u.dscr
      ? `At ${fmtUsd0(p.marketRent)}/mo market rent the hold pencils to ${fmtUsd0(u.noi)} NOI, a ${(u.capRate * 100).toFixed(1)}% yield on cost and ${u.dscr.toFixed(2)}x DSCR.`
      : `Rental modeling is limited on this asset class.`;
    const exit = u.flipProfit > 0
      ? `Resale exit clears roughly ${fmtUsd0(u.flipProfit)} after ${fmtUsd0(u.sellingCosts)} in selling costs.`
      : `Resale exit does not clear at the current bid — this one only works as a hold or below ${fmtUsd0(u.mao)}.`;
    const verdict = score.overall >= 78
      ? 'Ranked in the top band of the current auction calendar.'
      : score.overall >= 62
        ? 'Workable at or near the opening bid; discipline required above it.'
        : 'Marginal — bid only well under the modeled maximum.';
    return [lead, work, hold, exit, verdict].join(' ');
  }

  function buildRisks(p, u, rand) {
    const risks = [];
    if (p.occupancy === 'owner' || p.occupancy === 'tenant') {
      risks.push(`${p.occupancyLabel}: budget for a holdover proceeding and 60–120 days to possession.`);
    }
    if (p.occupancy === 'unknown') risks.push('Occupancy unverified — no interior access before sale.');
    if (p.titleRisk !== 'low') risks.push('Junior liens and unpaid municipal charges require a full title rundown before bidding.');
    if (p.condition === 'heavy' || p.condition === 'teardown') risks.push('Rehab budget is an exterior-only estimate; interior scope can move materially.');
    if (u.dscr && u.dscr < 1.15) risks.push(`DSCR of ${u.dscr.toFixed(2)}x is below most agency-adjacent lender floors.`);
    if (p.taxes / Math.max(1, p.arv) > 0.032) risks.push('Effective tax load is above the county median and compresses NOI.');
    if (p.source === 'sheriff-sale') risks.push('Sale is subject to adjournment or cancellation up to the auction date.');
    if (!risks.length) risks.push('No material flags surfaced by the review agents on this file.');
    return risks.slice(0, 4);
  }

  function buildUpside(p, u) {
    const up = [];
    if (u.equityPct > 0.3) up.push(`Modeled equity spread of ${fmtUsd0(u.equitySpread)} (${(u.equityPct * 100).toFixed(0)}% of ARV) at the opening bid.`);
    if (u.onePctRule >= 0.009) up.push(`Rent-to-price ratio of ${(u.onePctRule * 100).toFixed(2)}% clears the 1% screen.`);
    if (u.cashLeftIn < u.cashInvested * 0.4) up.push(`A ${(u.assumptions.refiLtv * 100).toFixed(0)}% LTV refinance recovers most of the capital, leaving ${fmtUsd0(Math.max(0, u.cashLeftIn))} in the deal.`);
    if (p.type === 'multi-family') up.push('Unit mix supports staggered turnover — rents can be reset without full vacancy.');
    if (p.condition === 'turnkey' || p.condition === 'light') up.push('Light scope means rent can start inside 45 days of possession.');
    if (!up.length) up.push('Upside depends on winning materially below the opening bid.');
    return up.slice(0, 4);
  }

  /* =====================================================================
     Dataset generation
     ===================================================================== */

  function generate(count, seed) {
    const rand = rng(seed || 20260822);
    const today = new Date('2026-08-22T12:00:00Z');
    const out = [];

    for (let i = 0; i < count; i++) {
      const place = pick(rand, PLACES);
      const type = weighted(rand, TYPES);
      const source = weighted(rand, SOURCES);
      const condition = weighted(rand, CONDITIONS);
      const occ = weighted(rand, OCCUPANCY);

      /* physical */
      const isMulti = type.key === 'multi-family';
      const units = isMulti ? Math.floor(between(rand, 2, 5)) : 1;
      const baseSqft = type.key === 'land' ? 0
        : type.key === 'commercial' ? roundTo(between(rand, 2400, 12000), 100)
        : type.key === 'mixed-use' ? roundTo(between(rand, 2600, 6500), 50)
        : isMulti ? roundTo(between(rand, 1700, 3600), 25)
        : type.key === 'condo' ? roundTo(between(rand, 750, 1500), 25)
        : roundTo(between(rand, 900, 2600), 25);
      const beds = type.key === 'land' || type.key === 'commercial' ? 0
        : isMulti ? units * 2 + (rand() > 0.6 ? 1 : 0)
        : Math.max(2, Math.round(baseSqft / 620));
      const baths = type.key === 'land' || type.key === 'commercial' ? 0
        : isMulti ? units : Math.max(1, Math.round(beds * 0.6 * 2) / 2);
      const year = Math.round(between(rand, 1895, 2012));
      const lotSqft = roundTo(between(rand, 3200, type.key === 'land' ? 60000 : 14000), 100);

      /* valuation */
      const psfBase = type.key === 'land' ? 0
        : type.key === 'commercial' ? between(rand, 48, 96)
        : between(rand, 82, 152);
      const arv = type.key === 'land'
        ? roundTo(lotSqft * between(rand, 1.4, 5.2) * place.tier, 1000)
        : roundTo(baseSqft * psfBase * place.tier, 1000);

      const rehabPsf = between(rand, condition.rehabPsf[0], condition.rehabPsf[1]);
      const rehab = type.key === 'land'
        ? roundTo(between(rand, 4000, 22000), 500)
        : roundTo(baseSqft * rehabPsf, 500);

      /* the discount the distress channel actually produces */
      const discount = {
        'sheriff-sale': between(rand, 0.44, 0.96),
        'tax-foreclosure': between(rand, 0.24, 0.72),
        'reo': between(rand, 0.62, 1.02),
        'pre-foreclosure': between(rand, 0.64, 1.00),
        'probate': between(rand, 0.56, 0.94),
        'off-market': between(rand, 0.58, 0.92)
      }[source.key];
      const openingBid = roundTo(Math.max(6000, (arv - rehab) * discount), 500);
      const judgment = roundTo(openingBid * between(rand, 0.85, 1.6), 500);

      /* carry */
      const taxes = roundTo(arv * between(rand, 0.021, 0.038), 50);
      const hoa = type.key === 'condo' ? roundTo(between(rand, 140, 385), 5) : 0;
      const rentPsf = type.key === 'land' ? 0
        : type.key === 'commercial' ? between(rand, 0.55, 1.15)
        : between(rand, 0.95, 1.65);
      const marketRent = type.key === 'land' ? 0 : roundTo(baseSqft * rentPsf * (isMulti ? 1.18 : 1) * place.tier, 25);

      /* filing */
      const auctionOffset = Math.round(between(rand, 3, 112));
      const auctionDate = addDays(today, auctionOffset);
      const daysOnMarket = Math.round(between(rand, 1, 96));
      const listedDate = addDays(today, -daysOnMarket);

      let status = 'on-market';
      const roll = rand();
      if (source.key === 'sheriff-sale' || source.key === 'tax-foreclosure') {
        status = roll < 0.08 ? 'postponed' : roll < 0.14 ? 'pending' : roll < 0.18 ? 'sold' : 'scheduled';
      } else {
        status = roll < 0.10 ? 'pending' : roll < 0.14 ? 'sold' : 'on-market';
      }

      const titleRoll = rand();
      const titleRisk = titleRoll < 0.5 ? 'low' : titleRoll < 0.85 ? 'medium' : 'high';

      const streetNo = Math.round(between(rand, 4, 3980));
      const street = pick(rand, STREETS);

      const p = {
        id: 'LLD-' + (4100 + i),
        address: `${streetNo} ${street}`,
        city: place.city,
        state: 'NY',
        zip: place.zip,
        county: place.county,
        type: type.key,
        typeLabel: type.label,
        source: source.key,
        sourceLabel: source.label,
        status,
        statusLabel: STATUSES.find((s) => s.key === status).label,
        condition: condition.key,
        conditionLabel: condition.label,
        occupancy: occ.key,
        occupancyLabel: occ.label,
        units,
        beds, baths,
        sqft: baseSqft,
        lotSqft,
        year,
        openingBid,
        judgment,
        arv,
        rehab,
        taxes,
        hoa,
        marketRent,
        titleRisk,
        lienPosition: source.key === 'tax-foreclosure' ? 'Tax Lien — Superior' : '1st Mortgage',
        plaintiff: pick(rand, PLAINTIFFS),
        attorney: pick(rand, ATTORNEYS),
        caseNumber: `E2026-${String(Math.round(between(rand, 1000, 9899))).padStart(5, '0')}`,
        parcel: `${Math.round(between(rand, 100, 189))}.${String(Math.round(between(rand, 10, 89)))}-${Math.round(between(rand, 1, 6))}-${Math.round(between(rand, 1, 88))}`,
        auctionDate: iso(auctionDate),
        auctionTime: pick(rand, ['9:00 AM', '9:30 AM', '10:00 AM', '1:00 PM']),
        saleVenue: SALE_VENUES[place.county],
        depositPct: pick(rand, [10, 10, 10, 20]),
        listedDate: iso(listedDate),
        daysOnMarket,
        redemption: source.key === 'tax-foreclosure'
          ? 'Redemption expired at judgment'
          : 'No statutory post-sale redemption (NY)'
      };

      const u = underwrite(p);
      const score = scoreDeal(p, u);
      p.score = score.overall;
      p.agentScores = score.agents;
      p.strategies = strategiesFor(p, u, score);
      p.summary = buildNarrative(p, u, score);
      p.risks = buildRisks(p, u, rand);
      p.upside = buildUpside(p, u);

      out.push(p);
    }
    return out;
  }

  /* ---------- comps (derived, deterministic per property) ---------- */
  function compsFor(p) {
    const rand = rng(p.address.length * 977 + p.openingBid);
    return Array.from({ length: 4 }, (_, i) => {
      const deltaSqft = Math.round(p.sqft * between(rand, -0.16, 0.18)) || 0;
      const sqft = Math.max(500, p.sqft + deltaSqft);
      const psf = (p.arv / Math.max(1, p.sqft)) * between(rand, 0.88, 1.14);
      return {
        address: `${Math.round(between(rand, 6, 2900))} ${pick(rand, STREETS)}`,
        city: p.city,
        sqft,
        beds: Math.max(1, p.beds + Math.round(between(rand, -1, 1.4))),
        soldPrice: roundTo(sqft * psf, 1000),
        psf: Math.round(psf),
        soldDate: iso(addDays(new Date('2026-08-22T12:00:00Z'), -Math.round(between(rand, 20, 330)))),
        distance: Number(between(rand, 0.1, 1.4).toFixed(2))
      };
    }).sort((a, b) => a.distance - b.distance);
  }

  /* ---------- public API ---------- */
  global.LLD = global.LLD || {};
  global.LLD.Deals = {
    PLACES, TYPES, SOURCES, CONDITIONS, OCCUPANCY, STATUSES, AGENT_NAMES,
    DEFAULT_ASSUMPTIONS,
    generate,
    underwrite,
    scoreDeal,
    compsFor,
    monthlyPayment,
    /** Swap this for a fetch() against the live docket feed. */
    load: function () { return generate(84, 20260822); }
  };
})(window);
