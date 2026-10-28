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
  title: 'Trident · Residential real estate investment at New Jersey sheriff\'s sales',
  description: 'Trident is a Patel Legacy Properties company that acquires one-to-four-unit homes at New Jersey sheriff\'s sales, priced against recorded debt rather than market value, and holds them under Housing Choice Voucher tenancy.',
  body: r => `
  <section class="hero" style="background-image:url(${r}assets/img/hero-street.webp)">
    <div class="wrap">
      ${SEAL}
      <div class="copy">
        <h1>residential real estate investment</h1>
        <p class="lede">We are committed to buying modest homes at New Jersey sheriff&rsquo;s sales and holding them for our investors.</p>
        <div class="actions onnavy">
          <a class="btn" href="${r}contact/">Contact Us</a>
          <a class="btn" href="${r}about/">About Trident</a>
        </div>
      </div>
    </div>
  </section>

  <section class="band"><div class="wrap">
    <h2>Who We Are</h2>
    <p class="lead">Trident acquires one-to-four-unit homes at New Jersey sheriff&rsquo;s sales, where the opening bid is the
      lender&rsquo;s judgment rather than the house&rsquo;s value, and holds them under Housing Choice Voucher tenancy.
      Our expertise encompasses foreclosure-calendar screening, title and lien underwriting, and voucher-tenancy
      management across six New Jersey counties. We are a Patel Legacy Properties company.</p>
    <div class="actions onnavy" style="justify-content:center"><a class="btn" href="${r}what-we-do/">Read About Us</a></div>
  </div></section>

  <section class="figures"><div class="wrap">
    <div class="f"><div class="n">468</div><div class="l">Filings screened on the calendars of six New Jersey counties</div></div>
    <div class="f"><div class="n">37<sup>%</sup></div><div class="l">Of the calendar refused by our screen before any work is done</div></div>
    <div class="f"><div class="n">96</div><div class="l">Filings at a deep discount: recorded debt under 0.4 of county median</div></div>
    <div class="f"><div class="n">10</div><div class="l">Items on our pre-bid checklist; nine of them block the bid</div></div>
    <p class="asof">Current pull of the county sheriffs&rsquo; calendars. Figures describe the screen, not acquisitions.</p>
  </div></section>

  <section class="scene center"><div class="wrap">
    <p class="kicker">What We Do</p>
    <h2 style="margin-top:10px">Screen. Buy. Hold.</h2>
    <p class="lead">Three jobs, in that order, done the same way for every property.</p>
    <div class="tiles" style="text-align:left">
      <a class="tile" href="${r}how-we-buy/">
        <span class="k">01 &middot; Screen</span>
        <h3>Every filing, the same rules</h3>
        <p>Each scheduled sale in six counties is pulled daily, matched against a nine-rule buy box and scored on recorded debt against county median value.</p>
        <span class="more">How we buy</span>
      </a>
      <a class="tile" href="${r}what-we-do/">
        <span class="k">02 &middot; Buy</span>
        <h3>For cash, to a written ceiling</h3>
        <p>Title, valuation, occupancy and liens are worked on a dated checklist before the sale. A principal attends, bids to a ceiling set from the underwriting, and stops there.</p>
        <span class="more">What we do</span>
      </a>
      <a class="tile" href="${r}investors/">
        <span class="k">03 &middot; Hold</span>
        <h3>Voucher tenancy, for income</h3>
        <p>Each home is brought to the housing authority&rsquo;s inspection standard and leased to a Housing Choice Voucher holder. The authority pays the larger part of the rent directly, every month.</p>
        <span class="more">For investors</span>
      </a>
    </div>
  </div></section>

  <section class="scene alt"><div class="wrap"><div class="split">
    <div>
      <p class="kicker">Why Work with Us</p>
      <h2 style="margin-top:10px">Discipline is the product.</h2>
      <div class="prose" style="margin-top:18px">
        <p><strong>The screen is written down.</strong> Nine rules with numbers in them, run on every filing in every covered
          county in the same order. Neither principal can override a verdict for a property they like.</p>
        <p><strong>Cash, not debt.</strong> A sheriff&rsquo;s sale takes twenty percent at the gavel and the balance in thirty
          days, in certified funds. There is no lender at the table and no lender ahead of investors.</p>
        <p><strong>A principal at every sale.</strong> The ceiling is set from the underwriting three days out and written
          down. The person in the room is the person who set the number, and the number does not move.</p>
      </div>
      <div class="actions"><a class="btn" href="${r}how-we-buy/">How We Buy</a></div>
    </div>
    <figure class="photo"><img src="${r}assets/img/hero-street.webp" alt="Stone steps and columned entrance of a county courthouse" loading="lazy"></figure>
  </div></div></section>

  <section class="band navy"><div class="wrap">
    <p class="kicker">Investments</p>
    <h2 style="margin-top:10px">Trident Fund I</h2>
    <p class="lead">Invitation-only basis &middot; Accredited investors and qualified purchasers only &middot; Private
      placement &middot; Minimum commitment $1,000,000. Raising from family offices in New York, New Jersey, Pennsylvania,
      Connecticut and Florida.</p>
    <a class="mail" href="mailto:sgd3210@gmail.com?subject=Trident%20%E2%80%94%20fund%20materials">sgd3210@gmail.com</a>
    <div class="actions onnavy" style="justify-content:center"><a class="btn" href="${r}investors/">The Fund</a><a class="btn" href="${r}legal/">Disclosures</a></div>
  </div></section>

  <section class="band"><div class="wrap">
    <h2>Markets</h2>
    <p class="lead">We buy in New Jersey &mdash; Bergen, Burlington, Hunterdon, Mercer, Middlesex and Monmouth, with Ocean and
      Somerset coming on &mdash; and raise along the corridor.</p>
    <div class="states"><span>NJ</span><span>NY</span><span>PA</span><span>CT</span><span>FL</span></div>
    <div class="actions onnavy" style="justify-content:center"><a class="btn" href="${r}where/">Where We Buy</a></div>
  </div></section>

  <section class="scene"><div class="wrap">
    <div class="sechead" style="text-align:center;margin:0 auto">
      <p class="kicker">Leadership</p>
      <h2>Two principals. Every sale attended.</h2>
    </div>
    <div class="people">
      <div class="person"><div class="mono">SD</div><div><h3>Spencer Dworkin</h3><div class="role">Principal</div><p>Screens the calendar, reads the titles, sets the ceilings and stands at the sale. <a href="mailto:sgd3210@gmail.com?subject=Trident">sgd3210@gmail.com</a></p></div></div>
      <div class="person"><div class="mono">AP</div><div><h3>Ayush Patel</h3><div class="role">Principal &middot; Patel Legacy Properties</div><p>Screens the calendar, reads the titles, sets the ceilings and stands at the sale.</p></div></div>
    </div>
  </div></section>
`,
};
