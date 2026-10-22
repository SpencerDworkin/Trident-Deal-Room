const { chart, N } = require('../chart');

module.exports = {
  path: 'method',
  nav: 'method',
  title: 'Method — Trident',
  description: 'The buy box as nine rules, how the current book of filings sorts, what is refused and why, who is filing, the ten-item pre-bid checklist, and the four statutory dates.',
  body: r => `
  <section class="dochead">
    <div class="wrap">
      <p class="label">Method</p>
      <h1>The buy box is written as rules. It runs on every filing, the same way, every time.</h1>
      <p class="lead">Trident has no track record to show you. What it has is a method that cannot be bent for a property we
        happen to like, and a current book that shows exactly how it sorts.</p>
    </div>
  </section>

  <section class="sec">
    <div class="wrap"><div class="sec-n"><span class="n">1</span>
      <div>
        <h2>The buy box</h2>
        <p class="prose">A screen that lives in someone&rsquo;s head drifts. This one is written down with numbers in it and run
          on every filing in every covered county in the same order. A principal cannot override a verdict; the only way to
          change it is to change the rule, for everyone, and say so.</p>
        <div class="tw"><table class="t">
          <tr><th style="width:30px">#</th><th>Rule</th><th>Threshold</th><th>Verdict</th></tr>
          <tr><td class="num soft">1</td><td><b>Hard ceiling.</b> Above this it is not a modest home.</td><td class="num">$1,500,000</td><td class="soft">Routed to commercial</td></tr>
          <tr><td class="num soft">2</td><td><b>Hard floor.</b> Below this it is a tax, association or utility lien, not a first mortgage.</td><td class="num">$20,000</td><td class="out">Refused</td></tr>
          <tr><td class="num soft">3</td><td><b>Association plaintiff.</b> A condominium or homeowners association foreclosing its own lien, which sits behind the mortgage.</td><td>Plaintiff name</td><td class="out">Refused</td></tr>
          <tr><td class="num soft">4</td><td><b>Unit marker in the address.</b> Likely condominium or multi-unit; outside the 1&ndash;4 unit program.</td><td>Address</td><td class="out">Refused</td></tr>
          <tr><td class="num soft">5</td><td><b>Debt above county median.</b> The lender bids to its own debt; there is no discount to win.</td><td class="num">&gt; 1.0</td><td class="out">Refused</td></tr>
          <tr><td class="num soft">6</td><td><b>Thin band.</b> No margin for a title, occupancy or make-ready surprise.</td><td class="num">0.8 &ndash; 1.0</td><td class="out">Refused</td></tr>
          <tr><td class="num soft">7</td><td><b>Core debt band.</b> Where the modest home lives. Flagged, not required.</td><td class="num">$40,000 &ndash; $250,000</td><td>Flag</td></tr>
          <tr><td class="num soft">8</td><td><b>Discount bands.</b> Deep below 0.4; discount to 0.6; possible to 0.8.</td><td class="num">0.4 / 0.6 / 0.8</td><td>Banded</td></tr>
          <tr><td class="num soft">9</td><td><b>Voucher hurdle.</b> The county must clear 5% unlevered on its own Fair Market Rent.</td><td class="num">5.0%</td><td>County gate</td></tr>
        </table></div>
        <p class="cap" style="margin-top:12px">A filing with no published judgment is included with a flag rather than refused; the judgment sits on the
          county detail page, not the sale list, and is pulled file by file before any bid.</p>
      </div>
    </div></div>
  </section>

  <section class="sec">
    <div class="wrap"><div class="sec-n"><span class="n">2</span>
      <div>
        <h2>How the current book sorts</h2>
        <p class="prose">Every filing on the calendars of six counties at the last pull, run through the rules above. Not a
          sample.</p>
        <div class="chart">${chart()}</div>
        <p class="cap">${N} residential filings with a published judgment, by recorded debt as a share of county median value.</p>
        <div class="strip">
          <div><div class="v">468</div><div class="l">filings on the calendars</div></div>
          <div><div class="v">21</div><div class="l">routed to commercial, above $1.5M</div></div>
          <div><div class="v r">175</div><div class="l">refused &mdash; 37% of the book</div></div>
          <div><div class="v">272</div><div class="l">included for work &mdash; 58%</div></div>
          <div><div class="v">123</div><div class="l">in the $40,000&ndash;$250,000 core band</div></div>
        </div>
        <div class="tw"><table class="t">
          <tr><th>Band</th><th>Recorded debt &divide; county median</th><th class="r">Filings</th><th class="r">Share</th></tr>
          <tr><td><b>Deep discount</b></td><td>at or below 0.4</td><td class="r num">96</td><td class="r num">21%</td></tr>
          <tr><td><b>Discount</b></td><td>0.4 to 0.6</td><td class="r num">90</td><td class="r num">19%</td></tr>
          <tr><td><b>Possible</b></td><td>0.6 to 0.8</td><td class="r num">88</td><td class="r num">19%</td></tr>
          <tr><td class="out"><b>Thin</b> &mdash; refused</td><td>0.8 to 1.0</td><td class="r num">59</td><td class="r num">13%</td></tr>
          <tr><td class="out"><b>Above the asset</b> &mdash; refused</td><td>over 1.0</td><td class="r num">84</td><td class="r num">18%</td></tr>
          <tr><td class="soft">Unbanded</td><td class="soft">no ratio yet; judgment or median pending</td><td class="r num soft">30</td><td class="r num soft">6%</td></tr>
        </table></div>
        <p class="cap" style="margin-top:12px">Shares are of the 447 residential filings; the 21 commercial routings are excluded.</p>
      </div>
    </div></div>
  </section>

  <section class="sec">
    <div class="wrap"><div class="sec-n"><span class="n">3</span>
      <div>
        <h2>What was refused, and why</h2>
        <p class="prose">A sheriff&rsquo;s sale forgives nothing: senior liens, municipal charges and tax liens survive the
          deed. The refusals exist to keep us out of the files where the discount is an illusion.</p>
        <ul class="ruled" style="margin-top:22px">
          <li><span><b>Debt above the county median.</b><span class="d">The lender bids to its own debt; there is no discount to win.</span></span><span class="c out">84</span></li>
          <li><span><b>Thin.</b><span class="d">Between 0.8 and 1.0 there is no room for a title, occupancy or make-ready surprise.</span></span><span class="c out">59</span></li>
          <li><span><b>Association plaintiffs.</b><span class="d">A condominium or homeowners association foreclosing its own lien. Median ratio on these files is 0.08, which is the tell.</span></span><span class="c out">20</span></li>
          <li><span><b>Unit markers in the address.</b><span class="d">Likely condominium or multi-unit; outside the program.</span></span><span class="c out">11</span></li>
          <li><span><b>Below the $20,000 floor.</b><span class="d">A tax, association or utility lien rather than a first mortgage.</span></span><span class="c out">1</span></li>
        </ul>
      </div>
    </div></div>
  </section>

  <section class="sec">
    <div class="wrap"><div class="sec-n"><span class="n">4</span>
      <div>
        <h2>Who is filing</h2>
        <p class="prose">Some lenders foreclose on loans paid down for years; others on loans written at the top of the market
          with little equity. The median debt-to-value of a lender&rsquo;s filings is a fast first read on whether its files
          are worth opening. One lender accounts for nearly a fifth of the calendar, and its files are thin.</p>
        <div class="tw"><table class="t">
          <tr><th>Plaintiff</th><th class="r">Filings</th><th class="r">Share</th><th class="r">Median ratio</th><th>Read</th></tr>
          <tr><td><b>U.S. Bank</b></td><td class="r num">85</td><td class="r num">19%</td><td class="r num">0.77</td><td>Thin. Most sit between 0.6 and 1.0.</td></tr>
          <tr><td><b>Wells Fargo</b></td><td class="r num">31</td><td class="r num">7%</td><td class="r num">0.58</td><td>Worth opening. Older loans, more equity.</td></tr>
          <tr><td><b>Lakeview Loan Servicing</b></td><td class="r num">20</td><td class="r num">4%</td><td class="r num">0.65</td><td>Mixed.</td></tr>
          <tr><td><b>Condominium and homeowners associations</b></td><td class="r num">20</td><td class="r num">4%</td><td class="r num">0.08</td><td class="out">Refused on sight.</td></tr>
          <tr><td><b>Deutsche Bank</b></td><td class="r num">15</td><td class="r num">3%</td><td class="r num">0.83</td><td>Thin.</td></tr>
          <tr><td><b>Wilmington Savings Fund Society</b></td><td class="r num">14</td><td class="r num">3%</td><td class="r num">0.61</td><td>Worth opening.</td></tr>
        </table></div>
        <p class="cap" style="margin-top:12px">126 institutions behind the 447 residential filings, normalised from the truncated strings on county calendars.
          Plaintiffs are named as they appear on public dockets. A median describes a lender&rsquo;s calendar, not any single file.</p>
      </div>
    </div></div>
  </section>

  <section class="sec">
    <div class="wrap"><div class="sec-n"><span class="n">5</span>
      <div>
        <h2>The pre-bid checklist</h2>
        <p class="prose">Ten items on every file, each with a date that hangs off the sale. Nine block the bid. A file that
          reaches sale day with a blocking item open is not bid on.</p>
        <ul class="ruled steps" style="margin-top:22px">
          <li><span class="when">T&minus;21</span><span><b>Order the sixty-year title search.</b><span class="d">Senior liens, municipal charges and federal tax liens survive the deed.</span></span></li>
          <li><span class="when">T&minus;14</span><span><b>Independent valuation.</b><span class="d">Assessor-derived values are estimates. Confirm the exit before a deposit is exposed.</span></span></li>
          <li><span class="when">T&minus;10</span><span><b>Search open code violations and municipal charges.</b><span class="d">Unpaid water and sewer, vacant-property registration and open violations ride with the parcel.</span></span></li>
          <li><span class="when">T&minus;10</span><span><b>Screen occupancy.</b><span class="d">Vacant, tenanted or owner-occupied. No interior access; good-cause eviction state. Price possession into make-ready now.</span></span></li>
          <li><span class="when">T&minus;10</span><span><b>Check owner-occupant first refusal.</b><span class="d">Under the Community Wealth Preservation Program a foreclosed owner-occupant may take the property at the opening bid.</span></span></li>
          <li><span class="when">T&minus;7</span><span><b>Read the title, set the lien reserve.</b><span class="d">What the deed extinguishes, separated from what survives. The surviving total goes into the basis.</span></span></li>
          <li><span class="when">T&minus;5<small>does not block</small></span><span><b>Confirm bidder registration and county sale terms.</b><span class="d">Deposit form, balance window and registration vary by county sheriff.</span></span></li>
          <li><span class="when">T&minus;3</span><span><b>Set the ceiling and the walk-away.</b><span class="d">From the underwriting, not the room. Never raised at the auction.</span></span></li>
          <li><span class="when">T&minus;2</span><span><b>Stage certified funds.</b><span class="d">Twenty percent of the winning bid, at the gavel.</span></span></li>
          <li><span class="when">T&minus;1</span><span><b>Confirm the sale has not been adjourned.</b><span class="d">Call plaintiff&rsquo;s counsel. Adjournments are not re-advertised.</span></span></li>
        </ul>
      </div>
    </div></div>
  </section>

  <section class="sec">
    <div class="wrap"><div class="sec-n"><span class="n">6</span>
      <div>
        <h2>The four dates</h2>
        <p class="prose">All four are derived from the sale date, so when a sale is adjourned the set moves together. Twenty
          percent of the bid is committed at the gavel and rides until redemption lapses; missing the thirty-day balance
          forfeits it. The funds for the balance are in hand before the bid, not arranged after.</p>
        <dl class="rows" style="margin-top:22px">
          <div><dt class="num">T &minus; 7</dt><dd>Title search back. Lien reserve set; ceiling recomputed.</dd></div>
          <div><dt class="num">T</dt><dd>Sheriff&rsquo;s sale. Twenty percent in certified funds at the gavel.</dd></div>
          <div><dt class="num">T + 10</dt><dd>Redemption lapses. The former owner&rsquo;s right to redeem expires.</dd></div>
          <div><dt class="num">T + 30</dt><dd>Balance due. Eighty percent paid; sheriff&rsquo;s deed delivered.</dd></div>
        </dl>
        <p class="cap" style="margin-top:14px">Figures on this page are from the current screened book and describe the screen. They are not a record of
          acquisitions and not indicative of returns.</p>
      </div>
    </div></div>
  </section>

  <nav class="cont"><div class="wrap"><a href="${r}markets/">Markets &rarr;</a> <a href="${r}fund/">The fund &rarr;</a> <a href="${r}contact/">Request the materials &rarr;</a></div></nav>
`,
};
