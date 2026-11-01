const { pipeline } = require('../diagram');
const SEAL = `<svg class="seal" viewBox="0 0 200 200" aria-hidden="true"><defs><path id="sc" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"/></defs><circle cx="100" cy="100" r="96" fill="none" stroke="currentColor" stroke-width="1.5"/><circle cx="100" cy="100" r="62" fill="none" stroke="currentColor" stroke-width="1"/><text font-family="Inter, sans-serif" font-size="11.5" letter-spacing="2.6" fill="currentColor"><textPath href="#sc">TRIDENT · PRIVATE REAL ESTATE INVESTMENT · EST. 2026 · RESIDENTIAL ·</textPath></text><g transform="translate(100 100) scale(1.9)" fill="currentColor"><path d="M-1.4 -8 h2.8 v22 h-2.8z"/><path d="M-9 -6 c0 6 3 9 7.6 10.2 v-2.9 c-3-1-4.8-3.2-4.8-7.3z"/><path d="M9 -6 c0 6-3 9-7.6 10.2 v-2.9 c3-1 4.8-3.2 4.8-7.3z"/><path d="M0 -14 l2.6 5 h-5.2z"/><path d="M-9 -10.5 l2.4 4.5 h-4.8z"/><path d="M9 -10.5 l2.4 4.5 h-4.8z"/><path d="M-6 14 h12 v2.4 h-12z"/></g></svg>`;

module.exports = {
  path: '',
  nav: '',
  title: 'Trident · Residential real estate, bought below value',
  description: 'Trident is a technology driven residential real estate investment firm. Our proprietary platform identifies homes priced well below their value; we acquire them for cash and hold them for durable, government supported income. A Patel Legacy Properties company.',
  body: r => `
  <section class="hero" style="background-image:url(${r}assets/img/hero-street.webp)"><div class="wrap">
    <div class="copy">
      <h1>residential real estate, bought below value</h1>
      <p class="lede">Trident is a technology driven real estate investment firm. Our proprietary platform finds homes priced
        well below what they are worth. We acquire them for cash and hold them for durable, government supported income.</p>
      <div class="actions"><a class="btn" href="${r}investors/">Invest With Us</a><a class="btn" href="${r}where/">Why Now</a></div>
    </div>
    ${SEAL}
  </div></section>

  <section class="band"><div class="wrap">
    <p class="kicker">Who We Are</p>
    <h2 style="margin-top:10px">Institutional discipline. Proprietary deal flow. No leverage.</h2>
    <p class="lead">Trident brings together a proprietary sourcing platform and an experienced residential operator. The platform
      reads the market continuously and surfaces opportunities that never reach a listing. Our principals underwrite each
      one, acquire it for cash and operate it for income. We invest our own capital alongside our investors.</p>
    <p class="lead" style="margin-top:14px">A Patel Legacy Properties company.</p>
  </div></section>

  <section class="figures"><div class="wrap">
    <div class="f"><div class="n">+25<sup>%</sup></div><div class="l">Growth in completed U.S. foreclosure auctions, year over year, third quarter 2026. The highest volume since early 2020.</div></div>
    <div class="f"><div class="n">66<sup>%</sup></div><div class="l">Average price paid at foreclosure auction as a share of estimated retail value, second quarter 2026.</div></div>
    <div class="f"><div class="n">6<sup>th</sup></div><div class="l">New Jersey&rsquo;s rank among states by foreclosure rate in 2025. The highest rate in the nation in December.</div></div>
    <div class="f"><div class="n">$38<sup>B</sup></div><div class="l">Federal Housing Choice Voucher budget for fiscal 2026. The program that pays the greater part of our rent.</div></div>
    <p class="asof">Sources: Auction.com Auction Market Dispatch, Q2 and Q3 2026; ATTOM Year End 2025 U.S. Foreclosure Market Report; U.S. Department of Housing and Urban Development, FY2026 appropriation. Market data, not a projection of any return.</p>
  </div></section>

  <section class="scene center"><div class="wrap">
    <p class="kicker">Why Trident</p>
    <h2>Four things we can say in a sentence each.</h2>
    <div class="tiles four">
      <article class="tile"><p class="kicker">Deal Flow</p><h3>We see the whole market</h3><p>Our platform reads public records across our markets every day and ranks every opportunity. We are not waiting for a broker to call. Our deal flow is proprietary and it is continuous.</p></article>
      <article class="tile"><p class="kicker">Basis</p><h3>We buy below value</h3><p>The homes we acquire are priced by a court supervised process, not by a willing seller. The margin is captured on the day we buy. Our returns do not depend on a rising market.</p></article>
      <article class="tile"><p class="kicker">Income</p><h3>We hold without leverage</h3><p>Unlevered ownership and rent paid largely by housing authorities on a published schedule. No refinancing risk, no lender covenants, no forced sales in a downturn.</p></article>
      <article class="tile"><p class="kicker">Alignment</p><h3>We invest alongside you</h3><p>The principals commit their own capital on the same terms. Every investor has direct access to both principals and property level reporting every quarter.</p></article>
    </div>
  </div></section>

  <section class="band navy"><div class="wrap">
    <p class="kicker">Why Now</p>
    <h2 style="margin-top:10px">The field is clearing.</h2>
    <p class="lead wide">Foreclosure volume in the United States has risen for seven consecutive quarters. The Northeast has the
      deepest housing shortage in the country and builds the least. And from January 2027, federal law bars the largest
      institutional investors from buying one and two unit homes, including at foreclosure. Disciplined private capital,
      operating below that threshold, has rarely had less competition for the assets we pursue.</p>
    <div class="actions onnavy" style="justify-content:center"><a class="btn" href="${r}where/">The Opportunity</a></div>
  </div></section>

  <section class="scene alt"><div class="wrap"><div class="split r2">
    <div>
      <p class="kicker">Strategy</p>
      <h2 style="margin-top:10px">Source. Acquire. Operate.</h2>
      <div class="prose" style="margin-top:18px">
        <p><strong>Source.</strong> The platform identifies residential assets of one to four units where the price on offer
          sits well below value, and ranks them for underwriting.</p>
        <p><strong>Acquire.</strong> A principal underwrites each opportunity, sets a ceiling in advance and buys for cash.
          When the number is wrong, we pass.</p>
        <p><strong>Operate.</strong> Homes are brought to inspection standard and leased for the long term under tenancies
          supported by public housing programs. Distributions come from rent.</p>
      </div>
      <div class="actions"><a class="btn" href="${r}what-we-do/">Our Strategy</a></div>
    </div>
    <figure class="photo"><img src="${r}assets/img/hero-street.webp" alt="A street of homes at dusk" loading="lazy"></figure>
  </div></div></section>

  <section class="band"><div class="wrap">
    <p class="kicker">The Platform</p>
    <h2 style="margin-top:10px">Intelligence first. Judgment always.</h2>
    <p class="lead wide">Our technology does what no team of analysts can: it reads the whole market, every day, and ranks what
      it finds. Our principals do what no model should: they decide. The platform proposes. People commit capital.</p>
    ${pipeline()}
    <div class="actions onnavy" style="justify-content:center"><a class="btn" href="${r}how-we-buy/">The Platform</a></div>
  </div></section>

  <section class="scene center"><div class="wrap">
    <p class="kicker">Leadership</p>
    <h2>Two principals. Direct access.</h2>
    <div class="people">
      <div class="person"><div class="mono">SD</div><div><h3>Spencer Dworkin</h3><p class="role">Principal</p><p>Founder of the Trident platform. Leads technology, data and underwriting.</p></div></div>
      <div class="person"><div class="mono">AP</div><div><h3>Ayush Patel</h3><p class="role">Principal · Patel Legacy Properties</p><p>Residential owner and operator in the Northeast. Leads acquisitions, operations and investor relations.</p></div></div>
    </div>
    <div class="actions" style="justify-content:center"><a class="btn btn-solid" href="${r}about/">Meet the Team</a></div>
  </div></section>

  <section class="band navy"><div class="wrap">
    <p class="kicker">Trident Fund I</p>
    <h2 style="margin-top:10px">Invest with us.</h2>
    <p class="lead">Trident Fund I is a private, unlevered residential real estate fund offered to accredited investors and qualified
      purchasers. Minimum commitment $1,000,000. We welcome family offices and private investors wherever they are.</p>
    <div class="actions onnavy" style="justify-content:center"><a class="btn" href="${r}investors/">Investor Overview</a><a class="btn" href="${r}contact/">Schedule a Call</a></div>
  </div></section>
`,
};
