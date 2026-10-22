module.exports = {
  path: 'where',
  nav: 'where',
  title: 'Where · Trident',
  description: 'Where Trident buys: six New Jersey counties with their medians, Fair Market Rents and modelled yields, two more coming on, and why New Jersey first.',
  body: r => `
  <section class="phead" style="background-image:url(${r}assets/img/aerial.jpg)"><div class="wrap">
    <p class="kicker">Where</p>
    <h1>Six New Jersey counties today. Two more coming on. National in ambition.</h1>
    <p class="lead">Trident buys where the foreclosure process is judicial, public and calendared, and where the housing
      authority pays enough to carry a modest home. Each county is screened on its own median value and its own Fair
      Market Rent.</p>
  </div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">01</p><h2>The counties</h2></div>
    <div>
      <p class="prose">Each county carries two numbers that matter: the median value, which is the denominator of the
        screen, and the three-bedroom Fair Market Rent, which is what the housing authority will pay and so what the
        property can yield. A county whose FMR cannot clear 5% on a reasonable basis is excluded from the voucher
        strategy, however good its discounts look. Two counties are not yet live because their sheriffs publish
        differently; both are being brought on.</p>
      <div class="tw"><table class="t">
        <tr><th>County</th><th class="r">On calendar</th><th class="r">Median value</th><th class="r">3-BR FMR</th><th>Voucher strategy</th><th>Coverage</th></tr>
        <tr><td><b>Monmouth</b></td><td class="r num">102</td><td class="r num">$700,000</td><td class="r num">$3,480</td><td>In</td><td>Live</td></tr>
        <tr><td><b>Middlesex</b></td><td class="r num">105</td><td class="r num">$540,000</td><td class="r num soft">&mdash;</td><td>In</td><td>Live</td></tr>
        <tr><td><b>Bergen</b></td><td class="r num">84</td><td class="r num">$690,000</td><td class="r num soft">&mdash;</td><td>In</td><td>Live</td></tr>
        <tr><td><b>Mercer</b></td><td class="r num">59</td><td class="r num">$430,000</td><td class="r num">$2,600</td><td>In</td><td>Live, manual list</td></tr>
        <tr><td><b>Hunterdon</b></td><td class="r num">28</td><td class="r num">$590,000</td><td class="r num soft">&mdash;</td><td>In</td><td>Live</td></tr>
        <tr><td><b>Burlington</b></td><td class="r num">90</td><td class="r num">$420,000</td><td class="r num">$1,980</td><td class="out">Out &mdash; models at 3.98%</td><td>Live</td></tr>
        <tr><td><b>Ocean</b></td><td class="r num soft">&mdash;</td><td class="r num soft">&mdash;</td><td class="r num">$3,480</td><td>In &mdash; models highest</td><td class="soft">Coming</td></tr>
        <tr><td><b>Somerset</b></td><td class="r num soft">&mdash;</td><td class="r num soft">&mdash;</td><td class="r num soft">&mdash;</td><td>In</td><td class="soft">Coming</td></tr>
      </table></div>
      <p class="cap" style="margin-top:12px">Filings as of the current pull. Medians are county-level residential figures used as the screen&rsquo;s
        denominator; every property is independently valued before a bid. FMR is the HUD FY2026 three-bedroom Fair Market
        Rent where loaded. Burlington is screened but excluded from the voucher strategy; a Burlington file only works on
        another exit.</p>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">02</p><h2>Why New Jersey first</h2></div>
    <div class="prose">
      <p><strong>Judicial foreclosure.</strong> Every sale follows a court judgment, so the debt figure the screen runs on
        is a court record rather than a lender&rsquo;s estimate, and sales are calendared weeks ahead by county sheriffs.
        That is what makes a disciplined pre-bid process possible.</p>
      <p><strong>The housing stock.</strong> The covered counties are dense with exactly the modest detached and small-multi
        homes that voucher holders look for and housing authorities approve readily.</p>
      <p><strong>Fair Market Rents that carry a modest basis.</strong> In most covered counties the three-bedroom FMR
        supports a 5% unlevered yield on the basis the screen produces. Where it does not, the county is out, and the
        table says so.</p>
      <p><strong>A short drive.</strong> The principals attend every sale in person and walk every property the firm owns.
        A county within reach of both is a county that can be run properly.</p>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">03</p><h2>Beginning here, not ending here</h2></div>
    <div class="prose">
      <p>Any judicial-foreclosure state with public sale calendars and a functioning voucher program is a candidate, and
        the screen is pointed at a new county by loading its median value and its Fair Market Rent. The rules do not
        change from one county to the next; only the two numbers do.</p>
      <p>New Jersey is where the book is. The firm raises along the same corridor &mdash; from family offices in New York,
        New Jersey, Pennsylvania and Connecticut, and in Florida, where many of the same families spend part of the year.
        <a href="${r}investors/">For investors &rarr;</a></p>
    </div>
  </div></div></section>

  <nav class="cont"><div class="wrap"><a href="${r}investors/">Investors &rarr;</a> <a href="${r}how-we-buy/">How we buy &rarr;</a> <a href="${r}contact/">Contact &rarr;</a></div></nav>
`,
};
