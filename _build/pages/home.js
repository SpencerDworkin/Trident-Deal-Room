const SEAL = `<svg class="seal" viewBox="0 0 240 240" aria-hidden="true">
  <defs><path id="sealArc" d="M120,120 m-92,0 a92,92 0 1,1 184,0 a92,92 0 1,1 -184,0"/></defs>
  <circle cx="120" cy="120" r="112" fill="none" stroke="#fff" stroke-width="2"/>
  <circle cx="120" cy="120" r="104" fill="none" stroke="#fff" stroke-width="1"/>
  <circle cx="120" cy="120" r="74" fill="none" stroke="#fff" stroke-width="1"/>
  <text font-family="Inter,system-ui,sans-serif" font-size="11.5" font-weight="600" letter-spacing="3.2" fill="#fff"><textPath href="#sealArc" startOffset="0">TRIDENT &#183; NEW JERSEY SHERIFF&#8217;S SALES &#183; RESIDENTIAL &#183; EST. 2026 &#183;</textPath></text>
  <g transform="translate(120 118) scale(.95)" fill="none" stroke="#fff" stroke-width="5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M0 42V8"/><path d="M-26 0c0 12 11 16 26 16s26-4 26-16"/><path d="M-26 0V-28M0 -8V-36M26 0V-28"/><path d="M-12 36h24"/>
  </g>
  <g transform="translate(120 118) scale(.95)" fill="#fff"><polygon points="-36,-24 -26,-46 -16,-24"/><polygon points="-10,-32 0,-54 10,-32"/><polygon points="16,-24 26,-46 36,-24"/></g>
</svg>`;

module.exports = {
  path: '',
  nav: '',
  title: 'Trident · An AI-sourced residential real estate fund',
  description: 'Trident is raising a private fund that uses AI to source one-to-four-unit homes at New Jersey sheriff\'s sales, priced against recorded debt rather than market value, and holds them under Housing Choice Voucher tenancy. A Patel Legacy Properties company.',
  body: r => `
  <section class="hero" style="background-image:url(${r}assets/img/hero-street.webp)">
    <div class="wrap">
      ${SEAL}
      <div class="copy">
        <h1>AI-sourced real estate investing</h1>
        <p class="lede">We are raising a fund that buys homes our AI finds at New Jersey sheriff&rsquo;s sales, priced
          against the debt rather than the market, and holds them for income.</p>
        <div class="actions onnavy">
          <a class="btn" href="${r}investors/">Invest With Us</a>
          <a class="btn" href="${r}how-we-buy/">How It Works</a>
        </div>
      </div>
    </div>
  </section>

  <section class="band"><div class="wrap">
    <h2>Who We Are</h2>
    <p class="lead">Trident is a residential real estate fund with an AI sourcing engine. Our models read every county
      sheriff&rsquo;s calendar in New Jersey each day, pull the docket, the judgment and the assessor record behind every
      filing, and rank the homes where the lender&rsquo;s opening bid sits furthest below what the house is worth. Our
      principals underwrite the shortlist, attend the sale, and hold what we buy under Housing Choice Voucher tenancy.
      We are a Patel Legacy Properties company.</p>
    <div class="actions onnavy" style="justify-content:center"><a class="btn" href="${r}what-we-do/">Read About Us</a></div>
  </div></section>

  <section class="figures"><div class="wrap">
    <div class="f"><div class="n">468</div><div class="l">Filings read and scored by our models on the current pull</div></div>
    <div class="f"><div class="n">37<sup>%</sup></div><div class="l">Of the calendar the models refuse before a person opens the file</div></div>
    <div class="f"><div class="n">96</div><div class="l">Homes surfaced at a deep discount: debt under 0.4 of county median</div></div>
    <div class="f"><div class="n">6</div><div class="l">New Jersey counties covered daily; two more coming on</div></div>
    <p class="asof">Current pull of the county sheriffs&rsquo; calendars. Figures describe the sourcing engine, not acquisitions.</p>
  </div></section>

  <section class="scene center"><div class="wrap">
    <p class="kicker">What We Do</p>
    <h2 style="margin-top:10px">Source. Underwrite. Hold.</h2>
    <p class="lead">The AI does the reading. The principals do the buying. The fund does the holding.</p>
    <div class="tiles" style="text-align:left">
      <a class="tile" href="${r}how-we-buy/">
        <span class="k">01 &middot; Source</span>
        <h3>AI reads every filing</h3>
        <p>Every scheduled sale in six counties is pulled daily. The models match each filing to its docket, judgment, plaintiff and assessor value, score it on recorded debt against county median, and refuse the files where the discount is an illusion.</p>
        <span class="more">How it works</span>
      </a>
      <a class="tile" href="${r}what-we-do/">
        <span class="k">02 &middot; Underwrite</span>
        <h3>People buy, to a written ceiling</h3>
        <p>Title, liens, occupancy and valuation are worked on a dated checklist for every shortlisted home. A principal sets the ceiling from the underwriting, attends the sale in person, and stops at the number.</p>
        <span class="more">Strategy</span>
      </a>
      <a class="tile" href="${r}investors/">
        <span class="k">03 &middot; Hold</span>
        <h3>Voucher tenancy, for income</h3>
        <p>Each home is brought to the housing authority&rsquo;s inspection standard and leased to a Housing Choice Voucher holder. The authority pays the larger part of the rent directly, every month. Investors see the same book we run on.</p>
        <span class="more">For investors</span>
      </a>
    </div>
  </div></section>

  <section class="scene alt"><div class="wrap"><div class="split">
    <div>
      <p class="kicker">Why Work with Us</p>
      <h2 style="margin-top:10px">Deal flow is the edge.</h2>
      <div class="prose" style="margin-top:18px">
        <p><strong>Nobody else reads the whole calendar.</strong> Hundreds of sales are scheduled every month across our
          counties. A person can open a few dozen files. Our models read all of them, every day, and hand the principals
          a ranked shortlist with the reasons attached.</p>
        <p><strong>The price is set by a court record, not a seller.</strong> At a sheriff&rsquo;s sale the lender opens
          the bidding at its judgment. The AI&rsquo;s job is to find the filings where that number sits far below the
          house; our job is to confirm it and buy.</p>
        <p><strong>Cash, discipline, and a person in the room.</strong> No lender at the table, a ceiling written down
          before the sale, and a principal standing at every auction. The model proposes; it never bids.</p>
      </div>
      <div class="actions"><a class="btn" href="${r}how-we-buy/">How the AI Sources Deals</a></div>
    </div>
    <figure class="photo"><img src="${r}assets/img/hero-street.webp" alt="A street of modest homes in New Jersey at dusk" loading="lazy"></figure>
  </div></div></section>

  <section class="band navy"><div class="wrap">
    <p class="kicker">Investments</p>
    <h2 style="margin-top:10px">Trident Fund I</h2>
    <p class="lead">An AI-sourced residential fund. Invitation-only basis &middot; Accredited investors and qualified
      purchasers only &middot; Private placement &middot; Minimum commitment $1,000,000. Raising from family offices in
      New York, New Jersey, Pennsylvania, Connecticut and Florida.</p>
    <a class="mail" href="mailto:sgd3210@gmail.com?subject=Trident%20Fund%20I%20%E2%80%94%20materials">sgd3210@gmail.com</a>
    <div class="actions onnavy" style="justify-content:center"><a class="btn" href="${r}investors/">The Fund</a><a class="btn" href="${r}legal/">Disclosures</a></div>
  </div></section>

  <section class="band"><div class="wrap">
    <h2>Markets</h2>
    <p class="lead">The engine covers Bergen, Burlington, Hunterdon, Mercer, Middlesex and Monmouth today, with Ocean and
      Somerset coming on. Any judicial-foreclosure state with public calendars is a county away. We raise along the
      corridor.</p>
    <div class="states"><span>NJ</span><span>NY</span><span>PA</span><span>CT</span><span>FL</span></div>
    <div class="actions onnavy" style="justify-content:center"><a class="btn" href="${r}where/">Where We Buy</a></div>
  </div></section>

  <section class="scene"><div class="wrap">
    <div class="sechead" style="text-align:center;margin:0 auto">
      <p class="kicker">Leadership</p>
      <h2>Two principals. Every sale attended.</h2>
    </div>
    <div class="people">
      <div class="person"><div class="mono">SD</div><div><h3>Spencer Dworkin</h3><div class="role">Principal</div><p>Built the sourcing engine. Underwrites the shortlist, sets the ceilings and stands at the sale. <a href="mailto:sgd3210@gmail.com?subject=Trident">sgd3210@gmail.com</a></p></div></div>
      <div class="person"><div class="mono">AP</div><div><h3>Ayush Patel</h3><div class="role">Principal &middot; Patel Legacy Properties</div><p>Real estate operator across the Northeast. Underwrites the shortlist, sets the ceilings and stands at the sale.</p></div></div>
    </div>
  </div></section>
`,
};
