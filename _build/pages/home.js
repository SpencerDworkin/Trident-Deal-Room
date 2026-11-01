const SEAL = `<svg class="seal" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="sc" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" stroke-width="1"/><text font-family="Inter, sans-serif" font-size="11.5" letter-spacing="2.6" fill="currentColor"><textPath href="#sc">TRIDENT · PRIVATE REAL ESTATE INVESTMENT · NEW JERSEY · EST. 2026 ·</textPath></text><g transform="translate(100 100) scale(1.9)" fill="currentColor"><path d="M-1.4 -8 h2.8 v22 h-2.8z"/><path d="M-9 -6 c0 6 3 9 7.6 10.2 v-2.9 c-3-1-4.8-3.2-4.8-7.3z"/><path d="M9 -6 c0 6-3 9-7.6 10.2 v-2.9 c3-1 4.8-3.2 4.8-7.3z"/><path d="M0 -14 l2.6 5 h-5.2z"/><path d="M-9 -10.5 l2.4 4.5 h-4.8z"/><path d="M9 -10.5 l2.4 4.5 h-4.8z"/><path d="M-6 14 h12 v2.4 h-12z"/></g></svg>`;

module.exports = {
  path: '',
  nav: '',
  title: 'Trident · Private commercial real estate',
  description: 'Trident is a private real estate investment company. We buy well priced mixed use and retail property in New Jersey and nearby, one deal at a time, with a small group of private investors. A Patel Legacy Properties company.',
  body: r => `
  <section class="hero" style="background-image:url(${r}assets/img/hero-street.webp)"><div class="wrap">
    <div class="copy">
      <h1>one good property at a time</h1>
      <p class="lede">Trident is a private real estate investment company. We buy well priced mixed use and retail property
        in New Jersey and the surrounding states, deal by deal, with a small group of investors we know.</p>
      <div class="actions"><a class="btn" href="${r}what-we-do/">How We Work</a><a class="btn" href="${r}contact/">Contact</a></div>
    </div>
    ${SEAL}
  </div></section>

  <section class="band"><div class="wrap">
    <p class="kicker">Who We Are</p>
    <h2 style="margin-top:10px">Operators, with our own capital in every deal.</h2>
    <p class="lead">Trident is a Patel Legacy Properties company. We find commercial property that is priced below what it is
      worth, buy it with our own money alongside a few investors, and run it for income. Our technology finds the deals.
      Our experience decides which ones to buy.</p>
  </div></section>

  <section class="scene center"><div class="wrap">
    <p class="kicker">What We Buy</p>
    <h2>Mixed use and retail, close to home.</h2>
    <div class="tiles">
      <article class="tile"><p class="kicker">Mixed Use</p><h3>Storefronts with apartments above</h3><p>Buildings on established main streets where a shop pays the ground floor and homes pay the rest. Two kinds of income under one roof.</p></article>
      <article class="tile"><p class="kicker">Retail</p><h3>Neighborhood and single tenant retail</h3><p>Small centers and single tenant buildings with tenants people visit every week. Bought at a price that works on the rent in place.</p></article>
      <article class="tile"><p class="kicker">Where</p><h3>New Jersey and nearby</h3><p>Our home market first, and New York, Pennsylvania and Connecticut as the right properties appear. We buy where we can drive to the building.</p></article>
    </div>
  </div></section>

  <section class="scene alt"><div class="wrap"><div class="split r2">
    <div>
      <p class="kicker">How We Work</p>
      <h2 style="margin-top:10px">Find it. Underwrite it. Buy it well.</h2>
      <div class="prose" style="margin-top:18px">
        <p><strong>We see more than a listing feed.</strong> Our own software reads public records and the market across our
          area every day and flags the property that is priced below its worth, often before it is widely marketed.</p>
        <p><strong>A principal underwrites every deal.</strong> We walk the building, read the leases, set the price we will
          pay and do not go above it.</p>
        <p><strong>We invest alongside our partners.</strong> Our own capital goes into every deal on the same terms. Patel
          Legacy Properties operates the property. Distributions come from income.</p>
      </div>
      <div class="actions"><a class="btn" href="${r}what-we-do/">Our Approach</a></div>
    </div>
    <figure class="photo"><img src="${r}assets/img/hero-street.webp" alt="A New Jersey street at dusk" loading="lazy"></figure>
  </div></div></section>

  <section class="scene center"><div class="wrap">
    <p class="kicker">Principals</p>
    <h2>Two principals. You deal with us directly.</h2>
    <div class="people">
      <div class="person"><div class="mono">SD</div><div><h3>Spencer Dworkin</h3><p class="role">Principal</p><p>Built the Trident platform. Leads sourcing, data and underwriting.</p></div></div>
      <div class="person"><div class="mono">AP</div><div><h3>Ayush Patel</h3><p class="role">Principal · Patel Legacy Properties</p><p>Real estate owner and operator in the Northeast. Leads acquisitions, operations and investor relations.</p></div></div>
    </div>
    <div class="actions" style="justify-content:center"><a class="btn btn-solid" href="${r}about/">About Us</a></div>
  </div></section>

  <section class="band navy"><div class="wrap">
    <p class="kicker">Investing With Us</p>
    <h2 style="margin-top:10px">A small group, one deal at a time.</h2>
    <p class="lead">We bring a small number of private investors into each property we buy. Most are people we know or have
      been introduced to. If that is you, we would like to hear from you.</p>
    <div class="actions onnavy" style="justify-content:center"><a class="btn" href="${r}contact/">Get in Touch</a></div>
  </div></section>
`,
};
