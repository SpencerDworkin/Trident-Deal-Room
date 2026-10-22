module.exports = {
  path: '',
  nav: '',
  title: 'Trident · Residential real estate investment at New Jersey sheriff\'s sales',
  description: 'Trident is a Pursuit Lending Partners company that acquires one-to-four-unit homes at New Jersey sheriff\'s sales, priced against recorded debt rather than market value, and holds them under Housing Choice Voucher tenancy.',
  body: r => `
  <section class="hero" style="background-image:url(${r}assets/img/hero-street.jpg)">
    <div class="wrap">
      <p class="eyebrow">Trident &middot; Residential real estate investment</p>
      <h1>Homes bought at the courthouse, <em>held for the rent.</em></h1>
      <p class="lede">Trident acquires one-to-four-unit homes at New Jersey sheriff&rsquo;s sales, where the opening bid is
        the lender&rsquo;s judgment rather than the house&rsquo;s value, and holds them under Housing Choice Voucher
        tenancy. Six counties. One written screen, run on every filing.</p>
      <div class="actions onnavy">
        <a class="btn btn-solid" href="${r}what-we-do/">What we do</a>
        <a class="btn" href="${r}investors/">For investors</a>
      </div>
      <p class="note">A Pursuit Lending Partners company. Newly formed; raising a first fund from family offices.</p>
    </div>
    <span class="scroll" aria-hidden="true">Scroll</span>
  </section>

  <section class="figures"><div class="wrap">
    <div class="f"><div class="n">468</div><div class="l">filings screened on the calendars of six New Jersey counties</div></div>
    <div class="f"><div class="n">37<sup>%</sup></div><div class="l">of the calendar refused by the screen before any work is done</div></div>
    <div class="f"><div class="n">96</div><div class="l">filings at a deep discount: recorded debt under 0.4 of county median</div></div>
    <div class="f"><div class="n">10</div><div class="l">items on the pre-bid checklist; nine of them block the bid</div></div>
    <p class="asof">Current pull of the county sheriffs&rsquo; calendars. Figures describe the screen, not acquisitions.</p>
  </div></section>

  <section class="scene"><div class="wrap"><div class="split">
    <div>
      <p class="kicker">The firm</p>
      <h2 style="margin-top:18px">A sheriff&rsquo;s sale sets its price from a court record, not a seller.</h2>
      <p class="lead">The lender opens the bidding at its judgment. The judgment is what the borrower owes, not what the
        house is worth, and the two can be compared in advance, from public records, for every scheduled sale. Trident
        does that every day across six counties and buys only where they are furthest apart.</p>
      <div class="actions"><a class="btn" href="${r}what-we-do/">How it works</a></div>
    </div>
    <figure class="photo"><img src="${r}assets/img/courthouse.jpg" alt="Stone steps and columned entrance of a county courthouse" loading="lazy"><span class="frame"></span></figure>
  </div></div></section>

  <section class="scene alt tight"><div class="wrap">
    <div class="sechead">
      <p class="kicker">What we do</p>
      <h2>Screen. Buy. Hold.</h2>
    </div>
    <div class="tiles">
      <a class="tile" href="${r}how-we-buy/" style="background-image:url(${r}assets/img/aerial.jpg)">
        <span class="k">01 &middot; Screen</span>
        <h3>Every filing, the same rules</h3>
        <p>Each scheduled sale in six counties is pulled daily, matched against a nine-rule buy box and scored on recorded debt against county median value.</p>
        <span class="more">How we buy</span>
      </a>
      <a class="tile" href="${r}what-we-do/" style="background-image:url(${r}assets/img/courthouse.jpg)">
        <span class="k">02 &middot; Buy</span>
        <h3>For cash, to a written ceiling</h3>
        <p>Title, valuation, occupancy and liens are worked on a dated checklist before the sale. A principal attends, bids to a ceiling set from the underwriting, and stops there.</p>
        <span class="more">What we do</span>
      </a>
      <a class="tile" href="${r}investors/" style="background-image:url(${r}assets/img/two-family.jpg)">
        <span class="k">03 &middot; Hold</span>
        <h3>Voucher tenancy, for income</h3>
        <p>Each home is brought to the housing authority&rsquo;s inspection standard and leased to a Housing Choice Voucher holder. The authority pays the larger part of the rent directly, every month.</p>
        <span class="more">For investors</span>
      </a>
    </div>
  </div></section>

  <section class="scene navy"><div class="wrap"><div class="split r3 start">
    <div class="sh">
      <p class="kicker">Approach</p>
      <h2>Discipline is the product.</h2>
    </div>
    <div class="prose">
      <p><strong>The screen is written down.</strong> The buy box is nine rules with numbers in them, run on every filing in
        every covered county in the same order. Neither principal can override a verdict for a property they like; the
        rules change for everyone or not at all.</p>
      <p><strong>Cash, not debt.</strong> A sheriff&rsquo;s sale takes twenty percent at the gavel and the balance in thirty
        days, in certified funds. There is no lender at the table and no lender ahead of investors on the properties.</p>
      <p><strong>A principal at every sale.</strong> The ceiling is set from the underwriting three days out and written
        down. The person in the room is the person who set the number, and the number does not move.</p>
      <p><strong>Cash that waits.</strong> Some quarters there will be more capital than qualifying sales. The fund holds it
        rather than bending the screen to spend it.</p>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap">
    <div class="sechead">
      <p class="kicker">Where</p>
      <h2>Six New Jersey counties today. National in ambition.</h2>
      <p class="lead">Bergen, Burlington, Hunterdon, Mercer, Middlesex and Monmouth are live; Ocean and Somerset are being
        brought on. Any judicial-foreclosure state with public sale calendars and a working voucher program is a
        candidate.</p>
    </div>
    <div class="split" style="margin-top:44px">
      <figure class="photo wide"><img src="${r}assets/img/aerial.jpg" alt="Aerial view of a suburban New Jersey neighborhood" loading="lazy"><span class="frame"></span></figure>
      <div>
        <div class="tw" style="margin-top:0"><table class="t">
          <tr><th>County</th><th class="r">On calendar</th><th class="r">Median value</th><th>Voucher strategy</th></tr>
          <tr><td><b>Monmouth</b></td><td class="r num">102</td><td class="r num">$700,000</td><td>In</td></tr>
          <tr><td><b>Middlesex</b></td><td class="r num">105</td><td class="r num">$540,000</td><td>In</td></tr>
          <tr><td><b>Bergen</b></td><td class="r num">84</td><td class="r num">$690,000</td><td>In</td></tr>
          <tr><td><b>Mercer</b></td><td class="r num">59</td><td class="r num">$430,000</td><td>In</td></tr>
          <tr><td><b>Hunterdon</b></td><td class="r num">28</td><td class="r num">$590,000</td><td>In</td></tr>
          <tr><td><b>Burlington</b></td><td class="r num">90</td><td class="r num">$420,000</td><td class="out">Out &mdash; models at 3.98%</td></tr>
        </table></div>
        <div class="actions" style="margin-top:24px"><a class="btn" href="${r}where/">All counties and figures</a></div>
      </div>
    </div>
  </div></section>

  <section class="scene alt"><div class="wrap">
    <div class="sechead">
      <p class="kicker">Leadership</p>
      <h2>Two principals. Every sale attended.</h2>
    </div>
    <div class="people">
      <div class="person"><div class="mono">SD</div><div><h3>Spencer Dworkin</h3><div class="role">Principal</div><p>Screens the calendar, reads the titles, sets the ceilings and stands at the sale. <a href="mailto:sgd3210@gmail.com?subject=Trident">sgd3210@gmail.com</a></p></div></div>
      <div class="person"><div class="mono">AP</div><div><h3>Ayush Patel</h3><div class="role">Principal</div><p>Screens the calendar, reads the titles, sets the ceilings and stands at the sale.</p></div></div>
    </div>
    <p class="cap" style="margin-top:22px">Trident is a subsidiary of Pursuit Lending Partners and draws on its lending and real-estate underwriting background. <a href="${r}about/">About the firm &rarr;</a></p>
  </div></section>

  <section class="band" style="background-image:url(${r}assets/img/two-family.jpg)"><div class="wrap">
    <p class="kicker">Investors</p>
    <h2 style="margin-top:18px">Trident is raising its first fund.</h2>
    <p class="lead">From family offices and accredited investors in New York, New Jersey, Pennsylvania, Connecticut and
      Florida, by private placement. Write to a principal for the confidential memorandum and the current screened book.</p>
    <a class="mail" href="mailto:sgd3210@gmail.com?subject=Trident%20%E2%80%94%20fund%20materials">sgd3210@gmail.com</a>
    <div class="actions onnavy"><a class="btn" href="${r}investors/">The fund</a></div>
  </div></section>
`,
};
