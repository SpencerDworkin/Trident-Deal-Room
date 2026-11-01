const { pipeline } = require('../diagram');
const SEAL = `<svg class="seal" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="sc" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" stroke-width="1"/><text font-family="Inter, sans-serif" font-size="11.5" letter-spacing="2.6" fill="currentColor"><textPath href="#sc">TRIDENT · PRIVATE REAL ESTATE INVESTMENT · NORTHEAST · EST. 2026 ·</textPath></text><g transform="translate(100 100) scale(1.9)" fill="currentColor"><path d="M-1.4 -8 h2.8 v22 h-2.8z"/><path d="M-9 -6 c0 6 3 9 7.6 10.2 v-2.9 c-3-1-4.8-3.2-4.8-7.3z"/><path d="M9 -6 c0 6-3 9-7.6 10.2 v-2.9 c3-1 4.8-3.2 4.8-7.3z"/><path d="M0 -14 l2.6 5 h-5.2z"/><path d="M-9 -10.5 l2.4 4.5 h-4.8z"/><path d="M9 -10.5 l2.4 4.5 h-4.8z"/><path d="M-6 14 h12 v2.4 h-12z"/></g></svg>`;

module.exports = {
  path: '',
  nav: '',
  title: 'Trident · Technology driven residential real estate investing',
  description: 'Trident is a private real estate investment firm that uses proprietary artificial intelligence to identify and acquire mispriced residential assets across the Northeast, for cash, and hold them for durable income. A Patel Legacy Properties company.',
  body: r => `
  <section class="hero" style="background-image:url(${r}assets/img/hero-street.webp)"><div class="wrap">
    <div class="copy">
      <h1>technology driven real estate investing</h1>
      <p class="lede">Trident is a private investment firm that uses proprietary artificial intelligence to identify and
        acquire residential real estate below its value, for cash, and hold it for durable income.</p>
      <div class="actions"><a class="btn" href="${r}investors/">Invest With Us</a><a class="btn" href="${r}what-we-do/">Our Approach</a></div>
    </div>
    ${SEAL}
  </div></section>

  <section class="band"><div class="wrap">
    <p class="kicker">Who We Are</p>
    <h2 style="margin-top:10px">A new kind of real estate firm, built on an old discipline.</h2>
    <p class="lead">Trident pairs a proprietary sourcing platform with hands on operating experience across the Northeast. Our
      technology reads the market continuously and surfaces the opportunities others miss. Our principals underwrite each
      one, acquire it for cash, and operate it for income. We never buy on momentum and we never use leverage.</p>
    <p class="lead" style="margin-top:14px">We are a Patel Legacy Properties company.</p>
  </div></section>

  <section class="figures"><div class="wrap">
    <div><b>100<sup>%</sup></b><span>All cash acquisitions. No lender at the table.</span></div>
    <div><b>0</b><span>Leverage at the fund or the property.</span></div>
    <div><b>Daily</b><span>Market coverage by our proprietary platform.</span></div>
    <div><b>5</b><span>States in which we raise and invest: NJ, NY, PA, CT and FL.</span></div>
  </div></section>

  <section class="scene center"><div class="wrap">
    <p class="kicker">What We Do</p>
    <h2>Source. Acquire. Operate.</h2>
    <div class="tiles">
      <article class="tile"><p class="kicker">01</p><h3>Source</h3><p>Our platform reads public records across our markets every day and identifies residential assets where the price on offer sits well below the value of the home. Most of the market never sees these opportunities. We see all of them.</p></article>
      <article class="tile"><p class="kicker">02</p><h3>Acquire</h3><p>A principal underwrites every opportunity and sets a ceiling in advance. We buy for cash, at a structural discount, and we walk away when the number is wrong. Discipline is the strategy.</p></article>
      <article class="tile"><p class="kicker">03</p><h3>Operate</h3><p>Homes are stabilized and leased for long term, government supported income. Distributions come from rent, not from a sale, which is why we are patient about when we sell.</p></article>
    </div>
  </div></section>

  <section class="band navy"><div class="wrap">
    <p class="kicker">The Platform</p>
    <h2 style="margin-top:10px">Intelligence first. Judgment always.</h2>
    <p class="lead wide">Our technology does what no team of analysts can: it reads the whole market, every day, and ranks what
      it finds. Our principals do what no model should: they decide. The platform proposes. People commit capital.</p>
    ${pipeline()}
    <div class="actions onnavy" style="justify-content:center"><a class="btn" href="${r}how-we-buy/">The Technology</a></div>
  </div></section>

  <section class="scene alt"><div class="wrap"><div class="split r2">
    <div>
      <p class="kicker">Why Trident</p>
      <h2 style="margin-top:10px">An edge you can explain.</h2>
      <div class="prose" style="margin-top:18px">
        <p><strong>We buy at a structural discount, not a negotiated one.</strong> Our opportunities are priced by
          process, not by a seller. That is where the margin comes from, and it does not depend on the market going up.</p>
        <p><strong>We see more than anyone else in our markets.</strong> Comprehensive coverage, refreshed daily, means
          we are never waiting for a broker to call. Deal flow is the scarcest thing in real estate, and ours is proprietary.</p>
        <p><strong>We hold without leverage.</strong> Unlevered ownership and government supported rent make for income
          that does not flinch when credit tightens.</p>
        <p><strong>We are operators.</strong> The people who built the platform and the people who run the homes are
          the people you will meet. There is no layer between you and the decision.</p>
      </div>
      <div class="actions"><a class="btn" href="${r}investors/">The Fund</a></div>
    </div>
    <figure class="photo"><img src="${r}assets/img/hero-street.webp" alt="A street of homes in the Northeast at dusk" loading="lazy"></figure>
  </div></div></section>

  <section class="band navy"><div class="wrap">
    <p class="kicker">Investments</p>
    <h2 style="margin-top:10px">Trident Fund I</h2>
    <p class="lead">Trident Fund I is offered on an invitation only basis to accredited investors and qualified purchasers
      through a private placement. The fund acquires residential real estate across the Northeast using our proprietary
      sourcing platform, holds it without leverage, and distributes income quarterly. Minimum commitment $1,000,000.</p>
    <p class="lead" style="margin-top:14px">We welcome inquiries from family offices and private investors in New Jersey,
      New York, Pennsylvania, Connecticut and Florida.</p>
    <div class="actions onnavy" style="justify-content:center"><a class="btn" href="${r}investors/">The Fund</a><a class="btn" href="${r}contact/">Request the Memorandum</a></div>
  </div></section>

  <section class="band"><div class="wrap">
    <p class="kicker">Markets</p>
    <h2 style="margin-top:10px">The Northeast corridor.</h2>
    <p class="lead">We invest where the fundamentals are durable: dense, supply constrained markets with deep rental demand and
      strong public support for housing. New Jersey is our home market, and our platform is built to extend across the
      corridor.</p>
    <div class="states"><span>NJ</span><span>NY</span><span>PA</span><span>CT</span><span>FL</span></div>
  </div></section>

  <section class="scene center"><div class="wrap">
    <p class="kicker">Leadership</p>
    <h2>Two principals. One standard.</h2>
    <div class="people">
      <div class="person"><div class="mono">SD</div><div><h3>Spencer Dworkin</h3><p class="role">Principal</p><p>Built the Trident platform. Leads technology, sourcing and underwriting.</p></div></div>
      <div class="person"><div class="mono">AP</div><div><h3>Ayush Patel</h3><p class="role">Principal · Patel Legacy Properties</p><p>Real estate operator across the Northeast. Leads acquisitions, operations and investor relations.</p></div></div>
    </div>
    <div class="actions" style="justify-content:center"><a class="btn btn-solid" href="${r}about/">About Trident</a></div>
  </div></section>
`,
};
