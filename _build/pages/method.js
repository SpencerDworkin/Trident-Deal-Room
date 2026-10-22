module.exports = {
  path: 'method',
  nav: 'method',
  title: 'Method — Trident',
  description: 'The buy box as rules, the current screened book, what gets refused and why, who is filing, and the ten-item pre-bid checklist every property carries.',
  body: r => `
  <section class="phead">
    <div class="wrap">
      <p class="eyebrow">The method</p>
      <h1>The buy box is code. It runs on every filing, the same way, every time.</h1>
      <p class="lead">Trident has no track record to show you. What it has is a method that cannot be bent for a property we
        happen to like, and a current book that shows exactly how it sorts. This page is that method in full.</p>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">The buy box</p>
          <h2>Nine rules. No exceptions.</h2>
          <p class="side">Each rule is a pure function of the filing&rsquo;s own data. Same input, same verdict, always.</p>
        </div>
        <div class="prose">
          <p>A screen that lives in someone&rsquo;s head drifts. This one is written down as rules with numbers in them, and
            every filing on every county calendar is run through the same rules in the same order. A principal cannot
            override the verdict; the only way to change it is to change the rule, for everyone, and say so.</p>
        </div>
      </div>

      <div class="tbl-wrap tw">
        <table class="t">
          <tr><th style="width:36px">#</th><th>Rule</th><th>Threshold</th><th>Verdict</th></tr>
          <tr><td class="num">1</td><td><b>Hard ceiling.</b> Above this it is not a modest home.</td><td class="num">$1,500,000</td><td><span class="pill">Routed to commercial</span></td></tr>
          <tr><td class="num">2</td><td><b>Hard floor.</b> Below this it is a tax, association or utility lien, not a first mortgage.</td><td class="num">$20,000</td><td><span class="pill warn">Refused</span></td></tr>
          <tr><td class="num">3</td><td><b>Association plaintiff.</b> A condominium or homeowners association is foreclosing its own lien, which sits behind the mortgage.</td><td>Plaintiff name</td><td><span class="pill warn">Refused</span></td></tr>
          <tr><td class="num">4</td><td><b>Unit marker in the address.</b> Likely a condominium or multi-unit; the program is 1&ndash;4 unit residential.</td><td>Address</td><td><span class="pill warn">Refused</span></td></tr>
          <tr><td class="num">5</td><td><b>Debt above county median.</b> The lender bids to its own debt; there is no discount to win.</td><td class="num">&gt; 100%</td><td><span class="pill warn">Refused</span></td></tr>
          <tr><td class="num">6</td><td><b>Thin band.</b> No margin for a title, occupancy or make-ready surprise.</td><td class="num">80&ndash;100%</td><td><span class="pill warn">Refused</span></td></tr>
          <tr><td class="num">7</td><td><b>Core debt band.</b> Where the modest home lives; flagged, not required.</td><td class="num">$40,000&ndash;$250,000</td><td><span class="pill ok">Flag: core</span></td></tr>
          <tr><td class="num">8</td><td><b>Discount bands.</b> Deep below 40%; discount to 60%; possible to 80%.</td><td class="num">40 / 60 / 80%</td><td><span class="pill ok">Included, banded</span></td></tr>
          <tr><td class="num">9</td><td><b>Voucher hurdle.</b> The county must clear 5% unlevered on its own Fair Market Rent.</td><td class="num">5.0%</td><td><span class="pill ok">County-level gate</span></td></tr>
        </table>
        <p class="tcap">A filing with no published judgment is included with a flag rather than refused, because the judgment
          figure sits on the county detail page rather than the sale list and is pulled file by file. It is resolved before
          any bid.</p>
      </div>
    </div>
  </section>

  <section class="sec paper">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">The current book</p>
          <h2>How 468 filings sort.</h2>
          <p class="side">Six New Jersey counties, every scheduled sale on their calendars at the last pull.</p>
        </div>
        <div class="prose">
          <p>This is not a sample. It is every filing in the covered counties, run through the rules above. The figures
            change with each pull as sales are added, adjourned and withdrawn; the proportions have been stable.</p>
        </div>
      </div>

      <div class="figs four">
        <div class="fig"><div class="v">468</div><div class="l">filings on the calendars</div></div>
        <div class="fig"><div class="v">21</div><div class="l">routed to commercial &mdash; above the $1.5M ceiling</div></div>
        <div class="fig refuse"><div class="v">175</div><div class="l">refused by the buy box &mdash; 37% of the book</div></div>
        <div class="fig"><div class="v">272</div><div class="l">included for work &mdash; 58% of the book</div></div>
      </div>

      <div class="tbl-wrap tw">
        <table class="t">
          <tr><th>Band</th><th>Recorded debt as a share of county median</th><th class="r">Filings</th><th class="r">Share</th></tr>
          <tr><td><b>Deep discount</b></td><td>At or below 40%</td><td class="r num">96</td><td class="r num">21%</td></tr>
          <tr><td><b>Discount</b></td><td>40% to 60%</td><td class="r num">90</td><td class="r num">19%</td></tr>
          <tr><td><b>Possible</b></td><td>60% to 80%</td><td class="r num">88</td><td class="r num">19%</td></tr>
          <tr><td><b>Thin</b> &mdash; refused</td><td>80% to 100%</td><td class="r num">59</td><td class="r num">13%</td></tr>
          <tr><td><b>Above the asset</b> &mdash; refused</td><td>Over 100%</td><td class="r num">84</td><td class="r num">18%</td></tr>
          <tr><td><b>Unbanded</b></td><td>No ratio yet: judgment or median pending</td><td class="r num">30</td><td class="r num">6%</td></tr>
        </table>
        <p class="tcap">Band counts exclude the 21 commercial routings. <b>123</b> filings sit in the $40,000&ndash;$250,000 core band.
          Shares are of the 447 residential filings.</p>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="split">
        <div>
          <p class="eyebrow">The refusals</p>
          <h3>175 files the screen would not let us bid on.</h3>
          <p class="prose" style="font-size:15px">The refusals matter as much as the buys. A sheriff&rsquo;s sale forgives
            nothing: senior liens, municipal charges and tax liens survive the deed. The screen exists to keep us out of
            the files where the discount is an illusion.</p>
        </div>
        <ul class="xlist">
          <li><span><b>Debt above the county median.</b> The lender bids to its own debt; there is no discount to win.</span><span class="c">84</span></li>
          <li><span><b>Thin margins.</b> Between 80% and 100% of median there is no room for a title, occupancy or make-ready surprise.</span><span class="c">59</span></li>
          <li><span><b>Association plaintiffs.</b> A condominium or homeowners association foreclosing its own lien, which sits behind the mortgage. Median ratio on these files: 0.08, which is the tell.</span><span class="c">20</span></li>
          <li><span><b>Unit markers in the address.</b> Likely condominium or multi-unit; outside the 1&ndash;4 unit program.</span><span class="c">11</span></li>
          <li><span><b>Below the $20,000 floor.</b> A tax, association or utility lien rather than a first mortgage.</span><span class="c">1</span></li>
        </ul>
      </div>
    </div>
  </section>

  <section class="sec paper">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">Who is filing</p>
          <h2>The plaintiff tells you the discount before you open the file.</h2>
          <p class="side">Raw plaintiff strings on county calendars are truncated and inconsistent; Trident normalises them
            to the institution behind the filing.</p>
        </div>
        <div class="prose">
          <p>Some lenders foreclose on loans that were paid down for years; others on loans written at the top of the
            market with little equity. The median debt-to-value of a lender&rsquo;s filings is therefore a fast first read on
            whether its files are worth opening. <strong>One lender accounts for nearly a fifth of the current calendar
            and its files are thin.</strong> Another&rsquo;s are not.</p>
        </div>
      </div>

      <div class="tbl-wrap tw">
        <table class="t">
          <tr><th>Plaintiff</th><th class="r">Filings</th><th class="r">Share of calendar</th><th class="r">Median debt / value</th><th>Read</th></tr>
          <tr><td><b>U.S. Bank</b></td><td class="r num">85</td><td class="r num">19%</td><td class="r num">0.77</td><td>Thin. Most sit in the 60&ndash;100% bands.</td></tr>
          <tr><td><b>Wells Fargo</b></td><td class="r num">31</td><td class="r num">7%</td><td class="r num">0.58</td><td>Worth opening. Older loans, more equity.</td></tr>
          <tr><td><b>Lakeview Loan Servicing</b></td><td class="r num">20</td><td class="r num">4%</td><td class="r num">0.65</td><td>Mixed.</td></tr>
          <tr><td><b>Condominium and homeowners associations</b></td><td class="r num">20</td><td class="r num">4%</td><td class="r num">0.08</td><td>Refused on sight. The ratio gives it away.</td></tr>
          <tr><td><b>Deutsche Bank</b></td><td class="r num">15</td><td class="r num">3%</td><td class="r num">0.83</td><td>Thin.</td></tr>
          <tr><td><b>Wilmington Savings Fund Society</b></td><td class="r num">14</td><td class="r num">3%</td><td class="r num">0.61</td><td>Worth opening.</td></tr>
        </table>
        <p class="tcap">126 distinct institutions behind the 447 residential filings. Plaintiffs are named as they appear
          on public foreclosure dockets. A median is a description of a lender&rsquo;s calendar, not a prediction about any
          single file.</p>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="split">
        <div>
          <p class="eyebrow">The pre-bid checklist</p>
          <h3>Ten items on every file. Nine of them block the bid.</h3>
          <p class="prose" style="font-size:15px">Each item has a due date that hangs off the sale date, so an adjournment
            moves the whole list. A file that reaches sale day with a blocking item open does not get bid on. That rule
            has no exception either.</p>
          <p class="prose" style="font-size:13.5px;margin-top:14px;color:var(--mut)">T&minus;21 means twenty-one days before the sale.</p>
        </div>
        <ul class="check">
          <li><span class="box"></span><span><span class="t">Order the sixty-year title search</span><span class="d">Senior liens, municipal charges and federal tax liens survive the deed. Whatever the search finds is carried in the basis.</span></span><span class="lead-days">T&minus;21</span></li>
          <li><span class="box"></span><span><span class="t">Independent valuation</span><span class="d">Assessor-derived values are estimates, not appraisals. Confirm the exit before a deposit is exposed.</span></span><span class="lead-days">T&minus;14</span></li>
          <li><span class="box"></span><span><span class="t">Search open code violations and municipal charges</span><span class="d">Unpaid water and sewer, vacant-property registration and open violations ride with the parcel.</span></span><span class="lead-days">T&minus;10</span></li>
          <li><span class="box"></span><span><span class="t">Screen occupancy</span><span class="d">Vacant, tenanted or owner-occupied. No interior access before the sale; good-cause eviction state. Price possession into make-ready now.</span></span><span class="lead-days">T&minus;10</span></li>
          <li><span class="box"></span><span><span class="t">Check owner-occupant first refusal</span><span class="d">Under the Community Wealth Preservation Program a foreclosed owner-occupant may take the property at the opening bid. Confirm before committing funds.</span></span><span class="lead-days">T&minus;10</span></li>
          <li><span class="box"></span><span><span class="t">Read the title and set the lien reserve</span><span class="d">Separate what the deed extinguishes from what survives it. Add the surviving total to the basis and recompute the ceiling.</span></span><span class="lead-days">T&minus;7</span></li>
          <li class="soft"><span class="box"></span><span><span class="t">Confirm bidder registration and county sale terms</span><span class="d">Deposit form, balance window and registration vary by county sheriff. The one item that does not block.</span></span><span class="lead-days">T&minus;5</span></li>
          <li><span class="box"></span><span><span class="t">Set the bid ceiling and the walk-away</span><span class="d">From the underwriting, not from the room. The ceiling is never raised at the auction.</span></span><span class="lead-days">T&minus;3</span></li>
          <li><span class="box"></span><span><span class="t">Stage certified funds for the deposit</span><span class="d">Twenty percent of the winning bid, at the gavel.</span></span><span class="lead-days">T&minus;2</span></li>
          <li><span class="box"></span><span><span class="t">Confirm the sale has not been adjourned</span><span class="d">Call plaintiff&rsquo;s counsel within twenty-four hours of the sale. Adjournments are not re-advertised.</span></span><span class="lead-days">T&minus;1</span></li>
        </ul>
      </div>
    </div>
  </section>

  <section class="band">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">The four dates</p>
          <h2>Everything hangs off the sale.</h2>
        </div>
        <div class="prose">
          <p>Four statutory dates govern every file, and all four are derived from the sale date: the <strong>title search
            back</strong> seven days before; the <strong>sale</strong> itself; <strong>redemption lapsing</strong> ten days after;
            the <strong>balance due</strong> thirty days after. When a sale is adjourned, the whole set moves.</p>
          <p>Trident tracks each as a dated obligation on the file, not as a note in a calendar. Twenty percent of the bid
            is committed at the gavel and rides until redemption lapses; missing the thirty-day balance forfeits it. The
            funds for the balance are therefore in hand before the bid, not arranged after it.</p>
        </div>
      </div>
      <div class="terms">
        <div class="term"><div class="k">T &minus; 7 days</div><div class="v">Title search back</div><div class="n">Lien reserve set; ceiling recomputed.</div></div>
        <div class="term"><div class="k">T</div><div class="v">Sheriff&rsquo;s sale</div><div class="n">20% in certified funds at the gavel.</div></div>
        <div class="term"><div class="k">T + 10 days</div><div class="v">Redemption lapses</div><div class="n">The former owner&rsquo;s right to redeem expires.</div></div>
        <div class="term"><div class="k">T + 30 days</div><div class="v">Balance due</div><div class="n">80% paid; sheriff&rsquo;s deed delivered. Missing it forfeits the deposit.</div></div>
      </div>
      <p class="fine">Figures on this page are from the current screened book and describe Trident&rsquo;s screen. They are not
        a record of acquisitions and are not indicative of returns.</p>
    </div>
  </section>

  <section class="next">
    <div class="wrap">
      <div class="cols">
        <div class="col"><div class="k">NEXT</div><h3>The counties</h3><p>Each county&rsquo;s median, Fair Market Rent, modelled yield and coverage status.</p><a class="more" href="${r}markets/">Markets &rarr;</a></div>
        <div class="col"><div class="k">NEXT</div><h3>The fund</h3><p>How capital moves through the fund, and what the terms are.</p><a class="more" href="${r}fund/">The fund &rarr;</a></div>
        <div class="col"><div class="k">NEXT</div><h3>The memorandum</h3><p>Request it, with the current book and a call with both principals.</p><a class="more" href="${r}contact/">Request the materials &rarr;</a></div>
      </div>
    </div>
  </section>
`,
};
