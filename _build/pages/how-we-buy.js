const { pipeline } = require('../diagram');

module.exports = {
  path: 'how-we-buy',
  nav: 'how-we-buy',
  title: 'The Platform · Trident',
  description: 'Trident\'s proprietary platform reads public records across its markets daily, identifies residential assets priced below value, and ranks them for underwriting by the principals.',
  body: r => `
  <section class="phead" style="background-image:url(${r}assets/img/hero-street.webp)"><div class="wrap">
    <p class="kicker">The Platform</p>
    <h1>A platform that reads the whole market.</h1>
    <p class="lead">Real estate has always rewarded whoever sees the opportunity first. Trident built a proprietary
      platform so that we see all of them. It gathers public records across our markets every day, identifies the
      assets where price and value have come apart, and ranks them for our principals to underwrite.</p>
  </div></section>

  <section class="scene"><div class="wrap">
    <div class="sechead">
      <p class="kicker">The Platform</p>
      <h2>From data to ownership</h2>
      <p class="lead">Two stages are software. Three are people. The line between them is deliberate.</p>
    </div>
    ${pipeline()}
  </div></section>

  <section class="scene alt"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">01</p><h2>Comprehensive coverage</h2></div>
    <div class="prose">
      <p>The opportunities we pursue are recorded in public, but they are recorded in dozens of places, in inconsistent
        forms, on timelines that change without notice. Following them by hand means following a fraction of them.</p>
      <p>Our platform follows all of them. It gathers the records continuously, reconciles them into a single view of every
        asset in our markets, and refreshes that view every day. When a date moves or a new opportunity appears, we know
        the same day.</p>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">02</p><h2>Proprietary intelligence</h2></div>
    <div class="prose">
      <p>Coverage alone is noise. The value of the platform is in what it does with the records: measuring, for every asset,
        how far the price on offer sits from what the home is worth, and setting aside the many cases where an apparent
        discount is not real.</p>
      <p>The models apply the same written standards to every asset, every time. Nothing is favored because someone likes
        it. The output is a ranked set of opportunities with the reasoning attached, ready for a principal to open.</p>
    </div>
  </div></div></section>

  <section class="scene alt"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">03</p><h2>Human judgment</h2></div>
    <div class="prose">
      <p>No model commits our capital. A principal underwrites each opportunity the platform surfaces: title, condition,
        occupancy, value and exit. From that work a ceiling is set, in writing, before any commitment is made. If the
        underwriting does not support the price, we pass.</p>
      <p>This is the division of labor we believe in. Software is better than people at reading everything. People are
        better than software at deciding what to own.</p>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">04</p><h2>Built to extend</h2></div>
    <div class="prose">
      <p>The platform was built for New Jersey and designed for the Northeast. Adding a market is a matter of connecting
        its records, not rebuilding the system. As the fund grows, so does the ground the platform covers.</p>
      <p>Our data sources, models and criteria are proprietary. We present the platform to qualified investors in person
        and describe it in detail in the private placement memorandum.</p>
    </div>
  </div></div></section>

  <section class="band"><div class="wrap">
    <p class="kicker">In Short</p>
    <h2 style="margin-top:10px">The platform proposes. People commit capital.</h2>
    <p class="lead">That sentence governs everything we do. It is why our deal flow is proprietary and why our discipline
      never depends on a good day in the room.</p>
    <div class="actions onnavy" style="justify-content:center"><a class="btn" href="${r}investors/">Invest With Us</a><a class="btn" href="${r}contact/">Contact Us</a></div>
  </div></section>

  <nav class="cont"><div class="wrap"><a href="${r}what-we-do/">Strategy &rarr;</a> <a href="${r}investors/">Investors &rarr;</a> <a href="${r}about/">Team &rarr;</a></div></nav>
`,
};
