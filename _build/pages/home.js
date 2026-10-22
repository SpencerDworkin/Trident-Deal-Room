module.exports = {
  path: '',
  nav: 'home',
  title: 'Trident',
  description: 'Trident acquires one-to-four-unit homes at New Jersey sheriff\'s sales, priced against recorded debt rather than market value, and funds the program with preferred equity from family offices.',
  body: r => `
  <section class="hero">
    <div class="wrap hero-grid">
      <div>
        <p class="eyebrow">New Jersey sheriff&rsquo;s-sale acquisition</p>
        <h1>Residential property, bought at the courthouse and priced against <em>the debt</em> &mdash; not the market.</h1>
        <p class="lead">Trident acquires one-to-four-unit homes at New Jersey sheriff&rsquo;s sales, where the opening bid
          is set by what the borrower owes rather than what the house is worth, and converts them to stable,
          voucher-backed tenancy. We are raising preferred equity from family offices to fund the program.</p>
        <div class="acts">
          <a class="cta lg" href="${r}preferred/">How the preferred works</a>
          <a class="cta ghost lg" href="${r}contact/">Request the materials</a>
        </div>
      </div>

      <div class="ledger" aria-label="At a glance">
        <div class="h">At a glance</div>
        <dl>
          <div class="row"><dt>Strategy</dt><dd>Sheriff&rsquo;s-sale acquisition of 1&ndash;4 unit residential, New Jersey</dd></div>
          <div class="row"><dt>Basis</dt><dd>Recorded debt, not market value</dd></div>
          <div class="row"><dt>Exit</dt><dd>Housing Choice Voucher tenancy, held for yield</dd></div>
          <div class="row key"><dt>Capital</dt><dd>Preferred equity, senior to Trident&rsquo;s own</dd></div>
          <div class="row key"><dt>Minimum</dt><dd><span class="num">$1,000,000</span></dd></div>
          <div class="row"><dt>Investors</dt><dd>Family offices &mdash; NY &middot; NJ &middot; PA &middot; CT &middot; FL</dd></div>
          <div class="row"><dt>Status</dt><dd>Newly formed. Raising first capital.</dd></div>
        </dl>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">The strategy</p>
          <h2>Where the price is set by the debt.</h2>
        </div>
        <div class="prose">
          <p>At a sheriff&rsquo;s sale the foreclosing lender opens the bidding at its judgment &mdash; the balance of
            the loan, interest and costs. Where a borrower has paid the mortgage down, or bought long ago, that figure
            sits well below what the house would bring on the open market. <strong>The gap is the opportunity, and it
            is visible before the sale</strong>: the judgment is public record.</p>
          <p>Trident screens every scheduled sale across six New Jersey counties against county median values and bids
            only where recorded debt sits at a deep discount to value. The number comes off the docket, not from a broker.</p>
        </div>
      </div>

      <div class="cols">
        <div class="col">
          <div class="k">01 &mdash; SCREEN</div>
          <h3>Priced on the record</h3>
          <p>Every filing is scored on the ratio of recorded debt to county median. Below 40% is a deep discount. Above
            80% we refuse. Above 100% the lender will bid to its own debt and there is no discount to win.</p>
          <a class="more" href="${r}method/">The method &rarr;</a>
        </div>
        <div class="col">
          <div class="k">02 &mdash; BID</div>
          <h3>Bought with a ceiling</h3>
          <p>A bid ceiling is set before the sale from the yield the property can carry, and it is never raised in the
            room. Twenty percent in certified funds at the gavel; the balance in thirty days; redemption lapses in ten.</p>
          <a class="more" href="${r}strategy/">The process &rarr;</a>
        </div>
        <div class="col">
          <div class="k">03 &mdash; HOLD</div>
          <h3>Held for yield</h3>
          <p>Properties are converted to Housing Choice Voucher tenancy &mdash; rent paid substantially by the housing
            authority, on a schedule. Each is underwritten to a 5% unlevered yield on the county&rsquo;s Fair Market Rent
            before any lift is assumed.</p>
          <a class="more" href="${r}markets/">Where we buy &rarr;</a>
        </div>
      </div>
    </div>
  </section>

  <section class="band">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">For family offices</p>
          <h2>Preferred equity, senior to our own.</h2>
        </div>
        <div class="prose">
          <p>We are funding the program with preferred equity. Preferred sits ahead of Trident&rsquo;s common: it earns
            <strong>a fixed preferred return before Trident takes anything</strong>, and Trident&rsquo;s own capital absorbs
            the first loss.</p>
          <p>The return is contractual rather than a share of upside, which is the point. It is built for an allocator
            who wants real-estate exposure with a defined coupon and a defined place in the stack, not an operator&rsquo;s
            promote.</p>
        </div>
      </div>
      <div class="terms">
        <div class="term"><div class="k">Instrument</div><div class="v">Preferred equity in the acquisition vehicle</div></div>
        <div class="term"><div class="k">Position</div><div class="v">Senior to Trident common</div><div class="n">Trident&rsquo;s capital takes the first loss.</div></div>
        <div class="term"><div class="k">Return</div><div class="v">Fixed preferred return</div><div class="n">Stated in the offering memorandum. Accrues if unpaid; paid before any distribution to common.</div></div>
        <div class="term"><div class="k">Minimum investment</div><div class="v"><span class="num">$1,000,000</span></div></div>
      </div>
      <div class="acts">
        <a class="cta" href="${r}preferred/">The full terms and the stack</a>
        <a class="cta ghost" href="${r}contact/">Request the memorandum</a>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">The discipline</p>
          <h2>A buy box written as rules, applied to every filing.</h2>
        </div>
        <div class="prose">
          <p>Trident does not have a track record to show you yet, and will not pretend to. What it has is a method that
            runs the same way on every filing, and the current book is the evidence. <strong>Every rule in the buy box is
            a line of code</strong>, so the screen cannot be bent for a property we happen to like.</p>
        </div>
      </div>

      <div class="figs">
        <div class="fig"><div class="v">468</div><div class="l">filings screened across six New Jersey counties in the current book</div></div>
        <div class="fig refuse"><div class="v">37<small>%</small></div><div class="l">refused by the buy box &mdash; 175 filings the screen would not let us bid on</div></div>
        <div class="fig"><div class="v">96</div><div class="l">at a deep discount: recorded debt at or below 40% of the county median</div></div>
        <div class="fig"><div class="v">123</div><div class="l">in the core band, $40,000 to $250,000 of recorded debt</div></div>
        <div class="fig"><div class="v">126</div><div class="l">distinct lenders behind the filings; one of them accounts for nearly a fifth of the calendar</div></div>
        <div class="fig"><div class="v">10</div><div class="l">pre-bid checklist items on every property; nine of them block the bid until done</div></div>
      </div>
      <p class="fig-note">From the current screened book. These figures describe the screen, not returns.</p>
      <div class="acts" style="margin-top:28px"><a class="cta ghost" href="${r}method/">Every rule, every refusal, the whole checklist &rarr;</a></div>
    </div>
  </section>

  <section class="sec paper">
    <div class="wrap">
      <div class="cbox">
        <div>
          <p class="eyebrow">Request the materials</p>
          <h2>We will send the memorandum and walk you through the book.</h2>
          <p class="prose" style="margin-top:16px">If you are a family office or an accredited investor considering a preferred
            equity allocation, write to us. You will get the private placement memorandum, the current screened book, and a
            conversation with both principals &mdash; not a deck.</p>
          <div class="acts">
            <a class="cta lg" href="${r}contact/">Request the memorandum</a>
            <a class="cta ghost lg" href="${r}principals/">Who we are</a>
          </div>
        </div>
        <div class="where">
          <div class="k">Where we are raising</div>
          <div class="states">New York &middot; New Jersey &middot; Pennsylvania &middot; Connecticut &middot; Florida</div>
          <p>Family offices and accredited investors. Minimum preferred investment $1,000,000.</p>
        </div>
      </div>
    </div>
  </section>
`,
};
