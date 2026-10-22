module.exports = {
  path: 'strategy',
  nav: 'strategy',
  title: 'Strategy — Trident',
  description: 'How a New Jersey sheriff\'s sale sets its price, why Trident bids against recorded debt rather than market value, the process from screen to deed, and the voucher-backed exit.',
  body: r => `
  <section class="phead">
    <div class="wrap">
      <p class="eyebrow">The strategy</p>
      <h1>The opening bid is the debt. Everything follows from that.</h1>
      <p class="lead">A sheriff&rsquo;s sale is the one place in residential real estate where the price is set by a number
        on a court record rather than by a seller&rsquo;s expectations. Trident&rsquo;s whole method is built to find the
        filings where that number is far below the house, and to buy only those.</p>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">How a sheriff&rsquo;s sale works</p>
          <h2>Judicial foreclosure, in public, on a calendar.</h2>
          <p class="side">New Jersey is a judicial-foreclosure state: a lender cannot take a house without a court
            judgment, and the sale that follows is run by the county sheriff and advertised in advance.</p>
        </div>
        <div class="prose">
          <p>When a mortgage defaults in New Jersey the lender sues, obtains a <strong>final judgment of foreclosure</strong>
            for what it is owed &mdash; principal, interest, fees and costs &mdash; and the court issues a writ directing the
            county sheriff to sell the property at public auction. The sale is scheduled weeks out and listed on the
            county&rsquo;s calendar with the case number, the address, the plaintiff and the judgment amount.</p>
          <p>At the auction the lender opens the bidding at its judgment, or at an &ldquo;upset&rdquo; figure it announces.
            Anyone may bid above it. The winner pays <strong>twenty percent in certified funds at the gavel</strong> and the
            balance within thirty days. The former owner has ten days to redeem. Then the sheriff&rsquo;s deed is delivered,
            and the buyer owns what the sale conveyed &mdash; and what it did not extinguish.</p>
          <p>None of this is hidden. The judgment is on the docket; the sale is on the calendar; the plaintiff is named.
            A buyer who reads the record before the sale knows the price floor before walking in.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="sec paper">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">Why the debt, not the market</p>
          <h2>Where equity was built, the gap is the opportunity.</h2>
        </div>
        <div class="prose">
          <p>The judgment is the borrower&rsquo;s debt, not the house&rsquo;s worth. A house bought in 2004 and foreclosed in
            2026 may carry a judgment of $120,000 against a county median of $540,000. The lender will bid to its
            $120,000 and is generally content to be made whole. A house bought in 2022 with 3% down carries a judgment at
            or above what it would sell for; the lender bids to that, and there is nothing to win.</p>
          <p>So the single most useful number about a filing is <strong>recorded debt as a fraction of county median
            value</strong>. Trident computes it for every scheduled sale in its counties and sorts the calendar by it.
            Below 40% is a deep discount. Forty to sixty is a discount. Sixty to eighty is possible. Above eighty there is
            no margin for a title, occupancy or make-ready surprise, and the screen refuses the file.</p>
          <p>This is not a thesis that the market is wrong. It is an observation that <strong>the auction&rsquo;s reserve
            price is set by a different variable than the asset&rsquo;s value</strong>, and that the two can be compared
            in advance from public records. The <a href="${r}method/">method page</a> shows how the current book sorts.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">The process</p>
          <h2>From the calendar to the deed.</h2>
          <p class="side">Every property runs the same sequence. The dates hang off the sale date, so when a sale is
            adjourned the whole schedule moves with it.</p>
        </div>
        <div class="prose">
          <p>Each step below is a line on a checklist that every file carries. Nine of the ten block a bid until they are
            done; the tenth is a courtesy to ourselves. A file that reaches the sale date with an open blocking item does
            not get bid on, whatever the discount.</p>
        </div>
      </div>

      <div class="steps">
        <div class="step">
          <div class="when">Daily<small>every county, every pull</small></div>
          <div><h3>Screen the calendar</h3>
            <p>Every scheduled sale is pulled from the county sheriff&rsquo;s list, matched against the buy box, and scored
              on debt to median. Changes between pulls &mdash; a new sale date, a changed judgment, a dismissal &mdash; are
              recorded as events, so an adjournment is a fact on the file rather than a surprise at the courthouse.</p></div>
        </div>
        <div class="step">
          <div class="when">T&minus;21 days</div>
          <div><h3>Order the sixty-year title search</h3>
            <p>Senior liens, municipal charges and federal tax liens survive the sheriff&rsquo;s deed. Whatever the search
              finds is carried in the basis, not discovered afterwards. No search, no bid.</p></div>
        </div>
        <div class="step">
          <div class="when">T&minus;14 days</div>
          <div><h3>Independent valuation</h3>
            <p>County medians and assessor data are estimates, not appraisals. The exit value is confirmed before a
              deposit is exposed, and the ratio is recomputed against the confirmed figure.</p></div>
        </div>
        <div class="step">
          <div class="when">T&minus;10 days</div>
          <div><h3>Municipal search, occupancy, and first-refusal status</h3>
            <p>Open code violations, unpaid water and sewer, and vacant-property registration ride with the parcel. Occupancy
              is established &mdash; vacant, tenanted or owner-occupied &mdash; because there is no interior access before
              the sale and New Jersey is a good-cause eviction state. And the Community Wealth Preservation Program is
              checked: a foreclosed owner-occupant may take the property at the opening bid, which ends the file.</p></div>
        </div>
        <div class="step">
          <div class="when">T&minus;7 days</div>
          <div><h3>Read the title and set the lien reserve</h3>
            <p>What the deed extinguishes is separated from what survives it. The surviving total is added to the basis and
              the bid ceiling is recomputed. Several files end here.</p></div>
        </div>
        <div class="step">
          <div class="when">T&minus;3 days</div>
          <div><h3>Set the ceiling and the walk-away</h3>
            <p>From the underwriting, not from the room. The ceiling is the bid at which the property still clears a 5%
              unlevered yield on the county&rsquo;s Fair Market Rent after acquisition costs, surviving liens, make-ready
              and carry. It is written down, and it is never raised at the auction.</p></div>
        </div>
        <div class="step">
          <div class="when">T&minus;1 day</div>
          <div><h3>Confirm the sale is going forward</h3>
            <p>Plaintiff&rsquo;s counsel is called within twenty-four hours of the sale. Adjournments are not re-advertised,
              and a bidder who shows up for a sale that has moved has learned something the hard way. Certified funds are
              staged the day before.</p></div>
        </div>
        <div class="step sale">
          <div class="when">Sale day</div>
          <div><h3>Bid to the ceiling, and no further</h3>
            <p>A principal attends every sale. If bidding passes the walk-away, we stop. The deposit is twenty percent of
              the winning bid, in certified funds, at the gavel.</p></div>
        </div>
        <div class="step">
          <div class="when">T+10 days</div>
          <div><h3>Redemption lapses</h3>
            <p>The former owner&rsquo;s right to redeem expires. Until it does, the deposit rides.</p></div>
        </div>
        <div class="step">
          <div class="when">T+30 days</div>
          <div><h3>Balance paid, deed delivered</h3>
            <p>The remaining eighty percent is paid and the sheriff&rsquo;s deed is recorded. Missing the window forfeits
              the deposit, which is why the funds are committed before the bid, not after.</p></div>
        </div>
        <div class="step">
          <div class="when">After</div>
          <div><h3>Make-ready, inspection, lease</h3>
            <p>Possession is resolved according to what the occupancy screen found. The property is brought to the housing
              authority&rsquo;s inspection standard, inspected, and leased to a voucher holder. From that point the rent is
              paid substantially by the authority, on its schedule.</p></div>
        </div>
      </div>
    </div>
  </section>

  <section class="band">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">The exit</p>
          <h2>Held for yield, under Housing Choice Vouchers.</h2>
        </div>
        <div class="prose">
          <p>Trident does not flip. Each property is converted to tenancy under the federal Housing Choice Voucher program,
            in which the local housing authority pays the larger part of the rent directly to the owner each month and the
            tenant pays the remainder. The rent is anchored to the county&rsquo;s published Fair Market Rent.</p>
          <p>The appeal is not a premium rent. It is <strong>the reliability of the payer and the length of the tenancy</strong>.
            A voucher tenant who has found a home that passes inspection tends to stay; the authority&rsquo;s share arrives
            whether or not the tenant has had a good month. For an income strategy that is the point.</p>
          <p>Every county is modelled on its own Fair Market Rent against a 5% unlevered stabilised yield. A county that
            cannot clear the hurdle at its FMR is excluded from the voucher strategy, whatever its discounts &mdash;
            Burlington currently models at 3.98% and is out. The <a href="${r}markets/">markets page</a> shows each
            county&rsquo;s figures.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">What survives the sale</p>
          <h2>The risks, and what the process does about each.</h2>
          <p class="side">A sheriff&rsquo;s deed conveys the property subject to whatever the judgment did not extinguish.
            The discount is real only after these are priced.</p>
        </div>
        <div class="prose">
          <p>These are not footnotes. They are the reason the checklist exists, and the reason 37% of the current book is
            refused before anyone looks at a photograph. The complete list of risk factors is in the
            <a href="${r}legal/">disclosures</a>; these are the ones the process is built around.</p>
        </div>
      </div>

      <div class="risks">
        <div class="risk">
          <h3>Surviving liens</h3>
          <p class="r">A first-mortgage foreclosure wipes out junior liens but not senior ones. Municipal charges, unpaid
            water and sewer, and federal tax liens with their redemption periods can all survive the deed.</p>
          <p class="h"><b>Handled by</b> the sixty-year search at T&minus;21 and the lien reserve at T&minus;7. Surviving
            totals are added to the basis before the ceiling is set.</p>
        </div>
        <div class="risk">
          <h3>It was never a first mortgage</h3>
          <p class="r">A filing with recorded debt at 6% of county median is more likely a subordinate lien, a private
            judgment or an association action &mdash; in which case the senior mortgage survives, and the discount is an
            illusion.</p>
          <p class="h"><b>Handled by</b> a hard floor at $20,000 and a flag on any ratio below 12%, with the title search
            as the final word on lien position.</p>
        </div>
        <div class="risk">
          <h3>Owner-occupant first refusal</h3>
          <p class="r">New Jersey&rsquo;s Community Wealth Preservation Program allows a foreclosed owner-occupant to take
            the property at the lender&rsquo;s opening bid with a small deposit. If exercised, the third-party bidder gets
            nothing.</p>
          <p class="h"><b>Handled by</b> an occupancy and CWPP check at T&minus;10. Owner-occupied files are
            screened for first-refusal exposure before deposit funds are committed.</p>
        </div>
        <div class="risk">
          <h3>Occupancy and possession</h3>
          <p class="r">There is no interior access before the sale. The property may be occupied by the former owner, a
            tenant, or someone with no right at all, and New Jersey is a good-cause eviction state.</p>
          <p class="h"><b>Handled by</b> an exterior and records-based occupancy screen, with cash-for-keys and writ
            timelines priced into make-ready before the ceiling is set, not after the deed.</p>
        </div>
        <div class="risk">
          <h3>Condition unseen</h3>
          <p class="r">The interior is not inspected before purchase. Make-ready cost is an estimate until the door opens.</p>
          <p class="h"><b>Handled by</b> a make-ready allowance in every ceiling calculation and a yield hurdle that leaves
            room for the estimate to be wrong. The screen prefers deeper discounts partly for this reason.</p>
        </div>
        <div class="risk">
          <h3>Adjournment</h3>
          <p class="r">Sales are routinely adjourned, often without re-advertisement. A bidder who stages funds for a sale
            that does not happen has tied up capital for nothing; one who misses a rescheduled sale has lost the file.</p>
          <p class="h"><b>Handled by</b> the daily pull, which records every date change as an event and moves the
            schedule, and the call to plaintiff&rsquo;s counsel at T&minus;1.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="next">
    <div class="wrap">
      <div class="cols">
        <div class="col"><div class="k">NEXT</div><h3>The fund</h3><p>How capital moves through the fund, the terms, and what reporting looks like.</p><a class="more" href="${r}fund/">The fund &rarr;</a></div>
        <div class="col"><div class="k">NEXT</div><h3>The method</h3><p>Every rule in the buy box, the current book, the refusals, the lenders and the checklist.</p><a class="more" href="${r}method/">Method &rarr;</a></div>
        <div class="col"><div class="k">NEXT</div><h3>The counties</h3><p>Where we buy, with each county&rsquo;s median, Fair Market Rent and modelled yield.</p><a class="more" href="${r}markets/">Markets &rarr;</a></div>
      </div>
    </div>
  </section>
`,
};
