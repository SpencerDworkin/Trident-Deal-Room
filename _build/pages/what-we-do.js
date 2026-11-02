const { pipeline } = require('../diagram');

module.exports = {
  path: 'what-we-do',
  nav: 'what-we-do',
  title: 'Approach · Trident National',
  description: 'How Trident finds, underwrites, buys and operates mixed use and retail property in New Jersey and nearby, one deal at a time.',
  body: r => `
  <section class="phead" style="background-image:url(${r}assets/img/hero-street.webp)"><div class="wrap">
    <p class="kicker">Approach</p>
    <h1>Buy well. Operate well. Repeat.</h1>
    <p class="lead">We do not run a fund and we do not chase volume. We buy one commercial property at a time, at a price that
      works on the income in place, and we hold it. The discipline is simple to state and hard to keep, which is why it
      is the whole business.</p>
  </div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">What We Buy</p><h2>The case for Class B retail</h2></div>
    <div class="prose">
      <p><strong>Owned by amateurs.</strong> Much of it is held by small landlords who under manage, leaving rents below
        market and operations loose. Professional leasing, cosmetic work and a better tenant mix create value without a
        construction loan.</p>
      <p><strong>Cannot be replaced.</strong> Building new costs three times or more the price of an existing Class B
        building, and the sites are already taken. Nobody is building the competition.</p>
      <p><strong>Well located.</strong> These buildings sit where people already are: near homes, highways, hospitals and
        campuses, in established corridors with construction barriers.</p>
      <p><strong>Tenants people visit.</strong> We favor service tenants with a reason to be in the building every week,
        leases below market with term remaining, a guarantor behind them and increases built in. Underused parking can
        carry ancillary income on smaller deals.</p>
      <p>Alongside retail we buy mixed use buildings on main streets and, selectively, houses sold through the courts
        where the lot is worth more than the house.</p>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap">
    <div class="sechead"><p class="kicker">A Deal, Start to Finish</p><h2>Four steps, in the same order every time</h2></div>
    ${pipeline()}
  </div></section>

  <section class="scene alt"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">01</p><h2>Finding the deal</h2></div>
    <div class="prose">
      <p>Most good commercial property in our area never reaches a listing site at a good price. It changes hands through
        estates, lenders, courts, tired owners and quiet brokers. We built our own software to watch all of that. It reads
        public records and the market across New Jersey and the surrounding states every day and flags property that is
        priced below what it is worth.</p>
      <p>That gives us a steady stream of real opportunities to look at, instead of waiting for a call. It does not decide
        anything. People do that.</p>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">02</p><h2>Underwriting</h2></div>
    <div class="prose">
      <p>A principal walks every building we consider. We read the leases, check the tenants, inspect the roof and the
        systems, and price the work that needs doing. From that we set the price we will pay. It is written down before
        we make an offer and it does not move because someone else wants the building.</p>
      <p>We buy on the income that exists today. If a deal only works on rent that is not there yet, it is not a deal for us.</p>
    </div>
  </div></div></section>

  <section class="scene alt"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">03</p><h2>Buying and operating</h2></div>
    <div class="prose">
      <p>Each property is bought in its own entity with our own capital and a small group of investors. We manage the
        building ourselves: leasing, tenants, maintenance, the roof. Investors receive distributions from
        the property&rsquo;s income and a plain report on how it is doing.</p>
      <p>We hold for income. We sell when it is the right thing for the property and the people who own it with us, not
        because a calendar says so.</p>
    </div>
  </div></div></section>

  <section class="scene alt"><div class="wrap">
    <div class="sechead"><p class="kicker">Pipeline</p><h2>What we are working on</h2>
      <p class="lead">Three properties in Mercer and Middlesex counties are in underwriting. Addresses, records and our
        analysis are shared with qualified investors in person.</p></div>
    <ul class="pipe-list">
      <li><b>86,000 SF health club on seven acres</b><span>Mercer County. A single story building with 300 parking spaces on a regional retail corridor, across from a major mall, leased to a fitness operator and a hospital system. In a court supervised sale with a judgment well above the assessed value.</span></li>
      <li><b>Corner lot with a second buildable parcel</b><span>Middlesex County. A house on a large lakeside corner lot where a subdivision creates a second lot. The house alone does not justify the price; the land does.</span></li>
      <li><b>House beside a highway outparcel</b><span>Middlesex County. An estate owned house on a small lot directly behind a national fast food outparcel on a state highway. An assemblage play, not a rental.</span></li>
    </ul>
  </div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">04</p><h2>What we will not do</h2></div>
    <div class="prose">
      <p>We will not pay for a story. We will not borrow in a way that puts the building at risk if a tenant leaves. We will
        not promise what a property will earn before it earns it. And we will not take money from people we have not sat
        down with.</p>
    </div>
  </div></div></section>

  <nav class="cont"><div class="wrap"><a href="${r}about/">About Us &rarr;</a> <a href="${r}contact/">Contact &rarr;</a></div></nav>
`,
};
