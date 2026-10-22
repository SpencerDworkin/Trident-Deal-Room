module.exports = {
  path: 'markets',
  nav: 'markets',
  title: 'Markets — Trident',
  description: 'Where Trident buys: six New Jersey counties with their medians, Fair Market Rents and modelled yields. Where Trident raises: family offices in NY, NJ, PA, CT and FL.',
  body: r => `
  <section class="phead">
    <div class="wrap">
      <p class="eyebrow">Markets</p>
      <h1>Buying in New Jersey. Raising along the corridor.</h1>
      <p class="lead">Trident buys where the foreclosure process is judicial, public and calendared, and where the housing
        authority pays enough to carry a modest home. It raises from family offices within a few hours&rsquo; drive of the
        properties, plus Florida, where many of them winter.</p>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">Where we buy</p>
          <h2>Six counties live. Two more coming.</h2>
          <p class="side">Each county is modelled on its own median value and its own Fair Market Rent against the 5%
            unlevered hurdle.</p>
        </div>
        <div class="prose">
          <p>Every county carries two numbers that matter: the <strong>median value</strong>, which is the denominator of
            the screen, and the <strong>three-bedroom Fair Market Rent</strong>, which is what the housing authority will pay
            and therefore what the property can yield. A county whose FMR cannot clear 5% on a reasonable basis is
            excluded from the voucher strategy, however good its discounts look.</p>
          <p>Coverage means the sheriff&rsquo;s calendar is being pulled and screened. Two counties are not yet live because
            their sheriffs publish differently; both are being brought on.</p>
        </div>
      </div>

      <div class="tbl-wrap tw">
        <table class="t">
          <tr><th>County</th><th class="r">Filings on calendar</th><th class="r">Median value</th><th class="r">3-BR FMR</th><th>Voucher strategy</th><th>Coverage</th></tr>
          <tr><td><b>Monmouth</b></td><td class="r num">102</td><td class="r num">$700,000</td><td class="r num">$3,480</td><td><span class="pill ok">In</span></td><td><span class="pill ok">Live</span></td></tr>
          <tr><td><b>Middlesex</b></td><td class="r num">105</td><td class="r num">$540,000</td><td class="r num">&mdash;</td><td><span class="pill ok">In</span></td><td><span class="pill ok">Live</span></td></tr>
          <tr><td><b>Bergen</b></td><td class="r num">84</td><td class="r num">$690,000</td><td class="r num">&mdash;</td><td><span class="pill ok">In</span></td><td><span class="pill ok">Live</span></td></tr>
          <tr><td><b>Mercer</b></td><td class="r num">59</td><td class="r num">$430,000</td><td class="r num">$2,600</td><td><span class="pill ok">In</span></td><td><span class="pill ok">Live</span> &middot; manual list</td></tr>
          <tr><td><b>Hunterdon</b></td><td class="r num">28</td><td class="r num">$590,000</td><td class="r num">&mdash;</td><td><span class="pill ok">In</span></td><td><span class="pill ok">Live</span></td></tr>
          <tr><td><b>Burlington</b></td><td class="r num">90</td><td class="r num">$420,000</td><td class="r num">$1,980</td><td><span class="pill warn">Out &mdash; 3.98%</span></td><td><span class="pill ok">Live</span></td></tr>
          <tr><td><b>Ocean</b></td><td class="r num">&mdash;</td><td class="r num">&mdash;</td><td class="r num">$3,480</td><td><span class="pill ok">In &mdash; models highest</span></td><td><span class="pill">Coming</span></td></tr>
          <tr><td><b>Somerset</b></td><td class="r num">&mdash;</td><td class="r num">&mdash;</td><td class="r num">&mdash;</td><td><span class="pill ok">In</span></td><td><span class="pill">Coming</span></td></tr>
        </table>
        <p class="tcap">Filings as of the current pull. Medians are county-level residential figures used as the screen&rsquo;s
          denominator; every property is independently valued before a bid. FMR is the HUD FY2026 three-bedroom Fair Market
          Rent where loaded. Burlington is screened but excluded from the voucher strategy because it models at 3.98%
          against the 5% hurdle at its FMR; a Burlington file only works on another exit.</p>
      </div>
    </div>
  </section>

  <section class="sec paper">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">Why New Jersey</p>
          <h2>The process is public, and the stock is right.</h2>
        </div>
        <div class="prose">
          <p><strong>Judicial foreclosure.</strong> Every sale follows a court judgment, so the debt figure the screen runs on is
            a court record rather than a lender&rsquo;s estimate. Sales are calendared weeks ahead by county sheriffs, which
            is what makes a disciplined pre-bid process possible at all.</p>
          <p><strong>One-to-four unit housing stock.</strong> The counties Trident covers are dense with exactly the modest,
            detached and small-multi homes that voucher holders are looking for and that housing authorities inspect
            and approve readily.</p>
          <p><strong>Fair Market Rents that carry a modest basis.</strong> In most of the covered counties the three-bedroom
            FMR supports a 5% unlevered yield on the basis the screen produces. Where it does not, the county is out,
            and the table says so.</p>
          <p><strong>Beginning here, not ending here.</strong> The method is not specific to New Jersey. Any judicial-foreclosure
            state with public sale calendars and a functioning voucher program is a candidate, and the screen is built to be
            pointed at a new county by loading its median and its FMR. New Jersey is where the book is; the ambition is
            national.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="band">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">Where we raise</p>
          <h2>Family offices, within reach of the properties.</h2>
        </div>
        <div class="prose">
          <p>Trident is raising preferred equity from family offices in <strong>New York, New Jersey, Pennsylvania,
            Connecticut and Florida</strong> &mdash; the first four because an allocator who can drive to a property in an
            afternoon is an allocator who understands what they own, and Florida because a good many of them are there
            for part of the year.</p>
          <p>The offering is private, to accredited investors and qualified purchasers, with a minimum of $1,000,000. We
            are not raising from the public, and we would rather have a small number of investors who have walked a
            property than a large number who have read a deck.</p>
        </div>
      </div>
      <div class="terms">
        <div class="term"><div class="k">New York</div><div class="v">Family offices</div></div>
        <div class="term"><div class="k">New Jersey</div><div class="v">Family offices</div><div class="n">Where the properties are.</div></div>
        <div class="term"><div class="k">Pennsylvania</div><div class="v">Family offices</div></div>
        <div class="term"><div class="k">Connecticut</div><div class="v">Family offices</div></div>
        <div class="term wide"><div class="k">Florida</div><div class="v">Family offices</div><div class="n">Many of the same families, part of the year.</div></div>
      </div>
      <div class="acts"><a class="cta" href="${r}contact/">Request the memorandum</a><a class="cta ghost" href="${r}preferred/">The preferred terms</a></div>
    </div>
  </section>
`,
};
