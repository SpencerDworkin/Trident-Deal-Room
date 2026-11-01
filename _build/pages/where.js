module.exports = {
  path: 'where',
  nav: 'where',
  title: 'Markets · Trident',
  description: 'Trident invests across the Northeast corridor, beginning in New Jersey, and raises capital from family offices and private investors in New Jersey, New York, Pennsylvania, Connecticut and Florida.',
  body: r => `
  <section class="phead" style="background-image:url(${r}assets/img/hero-street.webp)"><div class="wrap">
    <p class="kicker">Markets</p>
    <h1>The Northeast corridor.</h1>
    <p class="lead">We invest where demand is deep, supply is constrained and public support for housing is strong. The
      corridor from New York through New Jersey, Pennsylvania and Connecticut is the most durable rental market in the
      country, and it is where our principals have operated for years.</p>
  </div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">01</p><h2>Why the Northeast</h2></div>
    <div class="prose">
      <p>The Northeast builds less housing than it needs and has done so for decades. Its towns are established, its
        neighborhoods are stable, and its rental demand is the deepest in America. The same conditions that make it hard
        to build here make what already exists valuable, and make a home bought below value a durable asset.</p>
      <p>Public support for housing is also at its strongest here. Housing authorities across the corridor pay reliable,
        published rents for modest homes, which is the income our strategy is built on.</p>
    </div>
  </div></div></section>

  <section class="scene alt"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">02</p><h2>New Jersey first</h2></div>
    <div class="prose">
      <p>New Jersey is our home market and the first market the platform covers in full. It is the most densely populated
        state in the country, sits between two of its largest cities, and has a large and consistent flow of the
        opportunities we pursue. Our principals know its towns, its courthouses and its housing authorities firsthand.</p>
      <p>We are active across the state's most populous counties and expanding our coverage steadily.</p>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">03</p><h2>Extending across the corridor</h2></div>
    <div class="prose">
      <p>The platform was designed to add markets without rebuilding. As Trident Fund I deploys, we expect to extend into
        neighboring markets in New York, Pennsylvania and Connecticut where the same fundamentals hold. Each market is
        added only when our coverage of it is complete and our principals can underwrite there with the same confidence they
        have at home.</p>
    </div>
  </div></div></section>

  <section class="band"><div class="wrap">
    <p class="kicker">Where We Raise</p>
    <h2 style="margin-top:10px">Family offices and private investors.</h2>
    <p class="lead">Trident Fund I is offered to accredited investors and qualified purchasers in New Jersey, New York,
      Pennsylvania, Connecticut and Florida, by invitation.</p>
    <div class="states"><span>NJ</span><span>NY</span><span>PA</span><span>CT</span><span>FL</span></div>
    <div class="actions onnavy" style="justify-content:center"><a class="btn" href="${r}investors/">The Fund</a></div>
  </div></section>

  <nav class="cont"><div class="wrap"><a href="${r}investors/">The Fund &rarr;</a> <a href="${r}how-we-buy/">The Technology &rarr;</a> <a href="${r}contact/">Contact &rarr;</a></div></nav>
`,
};
