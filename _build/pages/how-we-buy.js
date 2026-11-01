const { chart, N } = require('../chart');
const { pipeline } = require('../diagram');

module.exports = {
  path: 'how-we-buy',
  nav: 'how-we-buy',
  title: 'Technology · Trident',
  description: 'How Trident\'s AI sources deals: the data the models read every day, the nine rules they apply, the funnel from 468 filings to a ranked shortlist, what they refuse and why, who is filing, and the human underwriting that follows.',
  body: r => `
  <section class="phead" style="background-image:url(${r}assets/img/hero-street.webp)"><div class="wrap">
    <p class="kicker">Technology</p>
    <h1>How the AI sources deals.</h1>
    <p class="lead">Every day the engine pulls each scheduled sale from six county sheriffs, pulls the docket and judgment
      behind it, matches the address to the assessor record and the county median, reads the plaintiff, applies a written
      buy box in the same order to every file, and ranks what survives. A person reviews every shortlisted file. A person
      bids. The model never does.</p>
  </div></section>

  <section class="scene"><div class="wrap">
    <div class="sechead">
      <p class="kicker">The Pipeline</p>
      <h2>From the county calendar to a bid, in six stages</h2>
      <p class="lead">Five stages are software and run every day without anyone asking. The sixth is two people and a
        courthouse.</p>
    </div>
    ${pipeline()}
  </div></section>

  <section class="scene alt"><div class="wrap">
    <div class="sechead">
      <p class="kicker">What the Models Read</p>
      <h2>Six sources, joined on every filing</h2>
      <p class="lead">None of this is private data. All of it is scattered, slow to read by hand, and worthless until it is
        joined. The engine joins it.</p>
    </div>
    <div class="sources">
      <div><h3>County sheriff calendars</h3><p>Every scheduled sale in Bergen, Burlington, Hunterdon, Mercer, Middlesex and Monmouth, pulled daily. A changed date, a withdrawn sale or a new filing is recorded as an event on the file, so an adjournment is a fact, not a surprise at the courthouse.</p></div>
      <div><h3>Court dockets and judgments</h3><p>The final judgment of foreclosure is the number the lender opens the bidding at. It sits on the county detail page, not the sale list. The engine pulls it file by file and carries it on every record.</p></div>
      <div><h3>Plaintiff identity</h3><p>Lender names on county calendars are truncated and inconsistent. The engine normalises them to 126 institutions, so it can say that one bank files a fifth of the calendar and its files are thin.</p></div>
      <div><h3>Assessor records and county medians</h3><p>Every address is matched to its assessor value and its county&rsquo;s median residential value. Recorded debt divided by county median is the single most useful number about a filing, and the engine computes it for all of them.</p></div>
      <div><h3>HUD Fair Market Rents</h3><p>The rent a housing authority will pay for a three-bedroom home, by county. A county whose rent cannot clear a 5% unlevered yield on the basis the screen produces is excluded, whatever its discounts.</p></div>
      <div><h3>Address signals</h3><p>Unit markers, association plaintiffs and judgments below the $20,000 floor are the tells of a condominium, a subordinate lien or a tax lien dressed as a first mortgage. The engine refuses them on sight.</p></div>
    </div>
  </div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">01</p><h2>The buy box</h2></div>
    <div>
      <p class="prose">Nine rules, in order, applied to every filing by the models. A principal cannot override a verdict for a
        property they like; the only way to change it is to change the rule, for everyone, and say so.</p>
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
      <p class="cap" style="margin-top:12px">A filing with no published judgment is included with a flag rather than refused; the judgment is pulled file by
        file before any bid.</p>
    </div>
  </div></div></section>

  <section class="scene alt"><div class="wrap">
    <div class="sechead">
      <p class="kicker">02 &middot; The Funnel</p>
      <h2>What the engine did with the current calendar</h2>
      <p class="lead">Every filing on six county calendars at the last pull, as the models scored it. Not a sample, and not
        a projection.</p>
    </div>
    <div class="funnel">
      <div><div class="v">468</div><div class="l">filings pulled from six county calendars</div></div>
      <div><div class="v">447</div><div class="l">residential; 21 routed to commercial above $1.5M</div></div>
      <div><div class="v">272</div><div class="l">survive the nine rules; 175 refused, 37%</div></div>
      <div><div class="v">123</div><div class="l">in the $40,000&ndash;$250,000 core band</div></div>
      <div><div class="v">96</div><div class="l">at a deep discount: recorded debt under 0.4 of county median. The shortlist starts here.</div></div>
    </div>
    <div class="chart">${chart()}</div>
    <p class="cap" style="margin-top:10px">${N} residential filings with a published judgment, by recorded debt as a share of county median value. Left of
      0.4 the lender&rsquo;s judgment is under forty cents on the dollar of the county median; the models refuse everything
      from 0.8 up.</p>
    <div class="tw"><table class="t">
      <tr><th>Band</th><th>Recorded debt &divide; county median</th><th class="r">Filings</th><th class="r">Share</th></tr>
      <tr><td><b>Deep discount</b></td><td>at or below 0.4</td><td class="r num">96</td><td class="r num">21%</td></tr>
      <tr><td><b>Discount</b></td><td>0.4 to 0.6</td><td class="r num">90</td><td class="r num">19%</td></tr>
      <tr><td><b>Possible</b></td><td>0.6 to 0.8</td><td class="r num">88</td><td class="r num">19%</td></tr>
      <tr><td class="out"><b>Thin</b> &mdash; refused</td><td>0.8 to 1.0</td><td class="r num">59</td><td class="r num">13%</td></tr>
      <tr><td class="out"><b>Above the asset</b> &mdash; refused</td><td>over 1.0</td><td class="r num">84</td><td class="r num">18%</td></tr>
      <tr><td class="soft">Unbanded</td><td class="soft">no ratio yet; judgment or median pending</td><td class="r num soft">30</td><td class="r num soft">6%</td></tr>
    </table></div>
  </div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">03</p><h2>What the models refuse, and why</h2></div>
    <div>
      <p class="prose">A sheriff&rsquo;s sale forgives nothing: senior liens, municipal charges and tax liens survive the deed.
        The refusals exist to keep the principals out of the files where the discount is an illusion, before anyone
        spends an hour on them.</p>
      <ul class="ruled">
        <li><span><b>Debt above the county median.</b><span class="d">The lender bids to its own debt; there is no discount to win.</span></span><span class="c out">84</span></li>
        <li><span><b>Thin.</b><span class="d">Between 0.8 and 1.0 there is no room for a title, occupancy or make-ready surprise.</span></span><span class="c out">59</span></li>
        <li><span><b>Association plaintiffs.</b><span class="d">A condominium or homeowners association foreclosing its own lien. Median ratio on these files is 0.08, which is the tell.</span></span><span class="c out">20</span></li>
        <li><span><b>Unit markers in the address.</b><span class="d">Likely condominium or multi-unit; outside the program.</span></span><span class="c out">11</span></li>
        <li><span><b>Below the $20,000 floor.</b><span class="d">A tax, association or utility lien rather than a first mortgage.</span></span><span class="c out">1</span></li>
      </ul>
    </div>
  </div></div></section>

  <section class="scene alt"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">04</p><h2>Who is filing</h2></div>
    <div>
      <p class="prose">Because the engine normalises plaintiff names, it can read a lender&rsquo;s whole calendar at once. Some
        lenders foreclose on loans paid down for years; others on loans written at the top of the market with little
        equity. The median debt-to-value of a lender&rsquo;s filings is a fast first read on whether its files are worth
        opening. One lender accounts for nearly a fifth of the calendar, and its files are thin.</p>
      <div class="tw"><table class="t">
        <tr><th>Plaintiff</th><th class="r">Filings</th><th class="r">Share</th><th class="r">Median ratio</th><th>Read</th></tr>
        <tr><td><b>U.S. Bank</b></td><td class="r num">85</td><td class="r num">19%</td><td class="r num">0.77</td><td>Thin. Most sit between 0.6 and 1.0.</td></tr>
        <tr><td><b>Wells Fargo</b></td><td class="r num">31</td><td class="r num">7%</td><td class="r num">0.58</td><td>Worth opening. Older loans, more equity.</td></tr>
        <tr><td><b>Lakeview Loan Servicing</b></td><td class="r num">20</td><td class="r num">4%</td><td class="r num">0.65</td><td>Mixed.</td></tr>
        <tr><td><b>Condominium and homeowners associations</b></td><td class="r num">20</td><td class="r num">4%</td><td class="r num">0.08</td><td class="out">Refused on sight.</td></tr>
        <tr><td><b>Deutsche Bank</b></td><td class="r num">15</td><td class="r num">3%</td><td class="r num">0.83</td><td>Thin.</td></tr>
        <tr><td><b>Wilmington Savings Fund Society</b></td><td class="r num">14</td><td class="r num">3%</td><td class="r num">0.61</td><td>Worth opening.</td></tr>
      </table></div>
      <p class="cap" style="margin-top:12px">126 institutions behind the 447 residential filings. Plaintiffs are named as they appear on public dockets. A
        median describes a lender&rsquo;s calendar, not any single file.</p>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">05</p><h2>What the AI hands over</h2></div>
    <div>
      <p class="prose">Every shortlisted file reaches the principals as a record, not a tip: the address, the judgment, the
        plaintiff and its calendar-wide read, the ratio and its band, the county&rsquo;s Fair Market Rent and the yield at a
        given ceiling, every date change since the file first appeared, and a ten-item checklist with a date hanging off
        the sale. Nine of the ten block the bid. A file that reaches sale day with a blocking item open is not bid on.</p>
      <ul class="ruled steps">
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
      <dl class="rows">
        <div><dt>T &minus; 7</dt><dd>Title search back. Lien reserve set; ceiling recomputed.</dd></div>
        <div><dt>T</dt><dd>Sheriff&rsquo;s sale. Twenty percent in certified funds at the gavel.</dd></div>
        <div><dt>T + 10</dt><dd>Redemption lapses. The former owner&rsquo;s right to redeem expires.</dd></div>
        <div><dt>T + 30</dt><dd>Balance due. Eighty percent paid; sheriff&rsquo;s deed delivered.</dd></div>
      </dl>
    </div>
  </div></div></section>

  <section class="scene alt"><div class="wrap">
    <div class="sechead">
      <p class="kicker">06</p>
      <h2>What the AI does not do</h2>
      <p class="lead">The claim is sourcing, and it is a strong one. It is not a claim that software owns a house.</p>
    </div>
    <ul class="nots">
      <li><b>It does not bid.</b> Ceilings are set by a principal from the underwriting and written down. The person in the room is the person who set the number.</li>
      <li><b>It does not replace the title search.</b> The models flag the tells of a subordinate lien; a sixty-year search at T&minus;21 is the final word on position.</li>
      <li><b>It does not predict returns.</b> It sorts a public calendar against a written rule. Figures on this site describe that sort, not acquisitions, rents or results.</li>
    </ul>
    <p class="cap" style="margin-top:22px">Trident is newly formed, with no operating history or assets under management. See the
      <a href="${r}legal/">disclosures</a>, including model and data risk.</p>
  </div></section>

  <nav class="cont"><div class="wrap"><a href="${r}investors/">The Fund &rarr;</a> <a href="${r}what-we-do/">Strategy &rarr;</a> <a href="${r}contact/">Contact &rarr;</a></div></nav>
`,
};
