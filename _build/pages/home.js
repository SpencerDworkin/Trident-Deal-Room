const { chart, N } = require('../chart');

module.exports = {
  path: '',
  nav: 'home',
  title: 'Trident',
  description: 'Trident buys one-to-four-unit homes at New Jersey sheriff\'s sales, priced against recorded debt rather than market value, and holds them under voucher tenancy. Raising a first fund from family offices.',
  body: r => `
  <section class="dochead">
    <div class="wrap">
      <p class="label">New Jersey sheriff&rsquo;s-sale acquisition</p>
      <h1>At a sheriff&rsquo;s sale the opening bid is the debt, not the house. We buy where the two are furthest apart.</h1>
      <p class="lead">Trident acquires one-to-four-unit homes at New Jersey sheriff&rsquo;s sales and holds them under
        Housing Choice Voucher tenancy. It is raising a first fund from family offices.</p>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <p class="label">Every residential filing on the covered calendars, by recorded debt as a share of county median value</p>
      <div class="chart">${chart()}</div>
      <p class="cap">${N} filings with a published judgment across Bergen, Burlington, Hunterdon, Mercer, Middlesex and Monmouth at the
        current pull. The foreclosing lender opens the bidding at its judgment. Left of 0.4 the judgment is under forty cents
        on the dollar of the county median; the screen refuses everything from 0.8 up. Median: 0.65.</p>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <dl class="rows">
        <div><dt>Strategy</dt><dd>Acquire 1&ndash;4 unit residential property at New Jersey sheriff&rsquo;s sales, screened on recorded debt against county median value. Hold under voucher tenancy for income.</dd></div>
        <div><dt>Vehicle</dt><dd>A private fund. Properties bought for cash &mdash; the auction takes certified funds, so there is no lender ahead of investors.</dd></div>
        <div><dt>Minimum commitment</dt><dd class="num">$1,000,000</dd></div>
        <div><dt>Investors</dt><dd>Family offices and accredited investors in New York, New Jersey, Pennsylvania, Connecticut and Florida.</dd></div>
        <div><dt>Reporting</dt><dd>Quarterly, property by property, from the same book the principals run the business from.</dd></div>
        <div><dt>Status</dt><dd>Newly formed. No assets under management. Raising the first fund.</dd></div>
      </dl>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="sec-n"><span class="n">&sect;</span>
        <div class="prose">
          <p>Trident has no track record and will not pretend to one. What it has is a buy box written as rules, run on every
            filing the same way, and a current book of ${N} filings that shows how it sorts: 96 at a deep discount, 143
            refused, the rest somewhere between. The pages that follow set out the <a href="${r}strategy/">strategy</a>, the
            <a href="${r}fund/">fund</a>, the <a href="${r}method/">method</a> in full, and the <a href="${r}markets/">counties</a>
            with their numbers.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="write">
    <div class="wrap">
      <p class="label" style="margin-bottom:12px">Request the materials</p>
      <p>Write to a principal. You will get the private placement memorandum, the current screened book, and a call with both
        of us.</p>
      <a class="mail" href="mailto:sgd3210@gmail.com?subject=Trident%20%E2%80%94%20fund%20materials">sgd3210@gmail.com</a>
      <p class="also">Spencer Dworkin and Ayush Patel, principals.</p>
    </div>
  </section>
`,
};
