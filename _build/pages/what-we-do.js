module.exports = {
  path: 'what-we-do',
  nav: 'what-we-do',
  title: 'What we do · Trident',
  description: 'How a New Jersey sheriff\'s sale sets its price, why Trident bids against recorded debt rather than market value, the process from calendar to deed, and the voucher-backed hold.',
  body: r => `
  <section class="phead" style="background-image:url(${r}assets/img/hero-street.webp)"><div class="wrap">
    <p class="kicker">What we do</p>
    <h1>The opening bid is the debt. Everything Trident does follows from that.</h1>
    <p class="lead">A sheriff&rsquo;s sale is the one place in residential property where the price is set by a number on a
      court record rather than by a seller. Trident finds the filings where that number sits far below the house, buys
      only those, and holds them for the rent.</p>
  </div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">01</p><h2>How a sheriff&rsquo;s sale works</h2></div>
    <div class="prose">
      <p>New Jersey is a judicial-foreclosure state. A lender that wants to take a house must sue, obtain a <strong>final
        judgment of foreclosure</strong> for what it is owed &mdash; principal, interest, fees and costs &mdash; and have the
        court direct the county sheriff to sell the property at public auction. The sale is scheduled weeks out and listed
        on the county&rsquo;s calendar with the case number, the address, the plaintiff and the judgment amount.</p>
      <p>At the auction the lender opens the bidding at its judgment, or at an &ldquo;upset&rdquo; figure it announces, and
        anyone may bid above it. The winner pays twenty percent in certified funds at the gavel and the balance within
        thirty days. The former owner has ten days to redeem. Then the sheriff&rsquo;s deed is delivered, and the buyer owns
        what the sale conveyed &mdash; and what it did not extinguish.</p>
      <p>None of this is hidden. The judgment is on the docket, the sale is on the calendar, the plaintiff is named. A
        buyer who reads the record knows the price floor before walking in.</p>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">02</p><h2>Why the debt, not the market</h2></div>
    <div class="prose">
      <p>The judgment is the borrower&rsquo;s debt, not the house&rsquo;s worth. A house bought in 2004 and foreclosed in 2026
        may carry a judgment of $120,000 against a county median of $540,000; the lender bids to its $120,000 and is
        generally content to be made whole. A house bought in 2022 with three percent down carries a judgment at or above
        what it would sell for; the lender bids to that, and there is nothing to win.</p>
      <p>So the single most useful number about a filing is <strong>recorded debt as a fraction of county median
        value</strong>. Trident computes it for every scheduled sale in its counties and sorts the calendar by it. Below
        0.4 is a deep discount; 0.4 to 0.6 a discount; 0.6 to 0.8 possible. From 0.8 up there is no margin for a title,
        occupancy or make-ready surprise, and the screen refuses the file.</p>
      <p>This is not a claim that the market is wrong. It is an observation that the auction&rsquo;s reserve price is set
        by a different variable than the asset&rsquo;s value, and that the two can be compared in advance from public
        records. <a href="${r}how-we-buy/">How the current book sorts &rarr;</a></p>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">03</p><h2>From the calendar to the deed</h2></div>
    <div>
      <p class="prose">Every property runs the same sequence. The dates hang off the sale date, so when a sale is adjourned
        the whole schedule moves. Nine of the ten checklist items block a bid until done; a file that reaches sale day
        with one open is not bid on, whatever the discount.</p>
      <ul class="ruled steps">
        <li><span class="when">Daily<small>every pull</small></span><span><b>Screen the calendar.</b><span class="d">Every scheduled sale is pulled from the county sheriff, matched against the buy box, and scored on debt to median. A changed date or judgment is recorded as an event on the file, so an adjournment is a fact rather than a surprise at the courthouse.</span></span></li>
        <li><span class="when">T&minus;21</span><span><b>Order the sixty-year title search.</b><span class="d">Senior liens, municipal charges and federal tax liens survive the sheriff&rsquo;s deed. Whatever the search finds is carried in the basis, not discovered afterwards.</span></span></li>
        <li><span class="when">T&minus;14</span><span><b>Independent valuation.</b><span class="d">County medians and assessor data are estimates. The exit value is confirmed before a deposit is exposed, and the ratio recomputed.</span></span></li>
        <li><span class="when">T&minus;10</span><span><b>Municipal search, occupancy, first-refusal status.</b><span class="d">Open violations and unpaid utilities ride with the parcel. Occupancy is established from the outside, because there is no interior access and New Jersey is a good-cause eviction state. And the Community Wealth Preservation Program is checked: a foreclosed owner-occupant may take the property at the opening bid, which ends the file.</span></span></li>
        <li><span class="when">T&minus;7</span><span><b>Read the title, set the lien reserve.</b><span class="d">What the deed extinguishes is separated from what survives. The surviving total goes into the basis and the ceiling is recomputed. Several files end here.</span></span></li>
        <li><span class="when">T&minus;3</span><span><b>Set the ceiling and the walk-away.</b><span class="d">From the underwriting, not the room: the bid at which the property still clears a 5% unlevered yield on the county&rsquo;s Fair Market Rent after surviving liens, make-ready and carry. Written down. Never raised at the auction.</span></span></li>
        <li><span class="when">T&minus;1</span><span><b>Confirm the sale is going forward.</b><span class="d">Plaintiff&rsquo;s counsel is called. Adjournments are not re-advertised. Certified funds are staged.</span></span></li>
        <li class="sale"><span class="when">Sale</span><span><b>Bid to the ceiling, and no further.</b><span class="d">A principal attends. If bidding passes the walk-away, we stop. Twenty percent of the winning bid at the gavel.</span></span></li>
        <li><span class="when">T+10</span><span><b>Redemption lapses.</b><span class="d">Until it does, the deposit rides.</span></span></li>
        <li><span class="when">T+30</span><span><b>Balance paid, deed delivered.</b><span class="d">Missing the window forfeits the deposit, which is why the funds are in hand before the bid.</span></span></li>
        <li><span class="when">After</span><span><b>Make-ready, inspection, lease.</b><span class="d">Possession is resolved according to what the occupancy screen found. The property is brought to the housing authority&rsquo;s inspection standard and leased to a voucher holder.</span></span></li>
      </ul>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">04</p><h2>The hold: Housing Choice Vouchers</h2></div>
    <div class="prose">
      <p>Trident does not flip. Each property is leased under the federal Housing Choice Voucher program, in which the
        local housing authority pays the larger part of the rent directly to the owner each month and the tenant pays the
        remainder. The rent is anchored to the county&rsquo;s published Fair Market Rent.</p>
      <p>The appeal is not a premium rent. It is the reliability of the payer and the length of the tenancy. A voucher
        tenant who has found a home that passes inspection tends to stay, and the authority&rsquo;s share arrives whether
        or not the tenant has had a good month.</p>
      <p>Every county is modelled on its own Fair Market Rent against a 5% unlevered stabilised yield. A county that
        cannot clear the hurdle at its FMR is excluded from the voucher strategy whatever its discounts; Burlington
        currently models at 3.98% and is out. <a href="${r}where/">Each county&rsquo;s figures &rarr;</a></p>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">05</p><h2>What survives the sale</h2></div>
    <div>
      <p class="prose">A sheriff&rsquo;s deed conveys the property subject to whatever the judgment did not extinguish. The
        discount is real only after these are priced. Each is paired with the step that handles it; the
        <a href="${r}legal/">disclosures</a> list the risks in full.</p>
      <ul class="ruled">
        <li><span><b>Surviving liens.</b><span class="d">Senior mortgages, municipal charges, unpaid utilities and federal tax liens can all survive the deed. &mdash; The sixty-year search at T&minus;21 and the lien reserve at T&minus;7; surviving totals go into the basis before the ceiling is set.</span></span></li>
        <li><span><b>It was never a first mortgage.</b><span class="d">Debt at six percent of median is likelier a subordinate lien, a private judgment or an association action, with the senior mortgage surviving. &mdash; A $20,000 floor, a flag below 0.12, and the title search as the final word on position.</span></span></li>
        <li><span><b>Owner-occupant first refusal.</b><span class="d">Under New Jersey&rsquo;s Community Wealth Preservation Program a foreclosed owner-occupant may take the property at the opening bid. &mdash; Checked at T&minus;10 before funds are committed.</span></span></li>
        <li><span><b>Occupancy and possession.</b><span class="d">No interior access before the sale; a good-cause eviction state. &mdash; An exterior and records-based occupancy screen, with possession costs priced into make-ready before the ceiling is set.</span></span></li>
        <li><span><b>Condition unseen.</b><span class="d">Make-ready is an estimate until the door opens. &mdash; A make-ready allowance in every ceiling and a yield hurdle that leaves room for the estimate to be wrong.</span></span></li>
        <li><span><b>Adjournment.</b><span class="d">Sales move, often without re-advertisement. &mdash; The daily pull records every date change and moves the schedule; the call to counsel at T&minus;1 catches the rest.</span></span></li>
      </ul>
    </div>
  </div></div></section>

  <nav class="cont"><div class="wrap"><a href="${r}how-we-buy/">How we buy &rarr;</a> <a href="${r}where/">Where &rarr;</a> <a href="${r}investors/">Investors &rarr;</a></div></nav>
`,
};
