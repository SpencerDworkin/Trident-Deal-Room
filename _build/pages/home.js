const { chart, N } = require('../chart');

module.exports = {
  path: '',
  nav: '',
  title: 'Trident · buys homes at New Jersey sheriff\'s sales, priced against the debt, held for the rent',
  description: 'Trident is a Pursuit Lending Partners company that acquires one-to-four-unit homes at New Jersey sheriff\'s sales, where the opening bid is the lender\'s judgment rather than the house\'s value, and holds them under Housing Choice Voucher tenancy.',
  body: r => `
  <section class="hero"><div class="wrap">
    <div class="heroGrid">
      <div class="heroCopy">
        <p class="eyebrow">Trident &middot; a Pursuit Lending Partners company</p>
        <h1 class="h1">Bought at the courthouse.<br>Priced against the debt.<br><em>Held for the rent.</em></h1>
        <p class="lede">Trident acquires one-to-four-unit homes at New Jersey sheriff&rsquo;s sales, where the opening bid is
          the lender&rsquo;s judgment rather than the house&rsquo;s value, and holds them under Housing Choice Voucher
          tenancy. <b>Six counties. One written screen, run on every filing, every day.</b></p>
        <div class="actions">
          <a class="btn btn-solid" href="${r}what-we-do/">What we do</a>
          <a class="btn" href="${r}investors/">For investors</a>
        </div>
        <p class="note">Newly formed and raising a first fund from family offices in New York, New Jersey, Pennsylvania,
          Connecticut and Florida. <a href="${r}contact/">Talk to a principal.</a></p>
      </div>

      <figure class="window">
        <figcaption class="windowBar">
          <span class="dot" aria-hidden="true"></span>
          <span class="windowName">sheriff&rsquo;s calendars &middot; six counties &middot; ${N} residential filings</span>
          <span class="windowTag">Current pull</span>
        </figcaption>
        <div class="windowBody"><div class="chart">${chart()}</div></div>
        <div class="windowFoot"><b>Every residential filing on the covered calendars</b>, by recorded debt as a share of
          county median value. Left of 0.4 the lender&rsquo;s judgment is under forty cents on the dollar of the county
          median. The screen refuses everything from 0.8 up.</div>
      </figure>
    </div>

    <p class="provenance">
      <span class="provTag">Real figures</span>
      <span><b>Every number on this site is from Trident&rsquo;s own screened book</b> &mdash; the filings on the county
        calendars at the current pull, run through the same rules. They describe the screen, not acquisitions. Trident has
        no operating history and no assets under management. Nothing here is an offer; see the
        <a href="${r}legal/">disclosures</a>.</span>
    </p>
  </div></section>

  <section class="thesis"><div class="wrap">
    <p class="t">At a sheriff&rsquo;s sale the opening bid is the debt, <span>not the house.</span></p>
    <p class="thesisNote">The judgment is what the borrower owes, not what the home is worth. The two can be compared in
      advance, from public records, for every scheduled sale, before anyone walks into the room. Trident does that every
      day, and buys only where they are furthest apart.</p>
  </div></section>

  <section class="scene compact"><div class="wrap">
    <p class="kicker">What we do</p>
    <h2 style="margin-top:12px">Screen. Buy. Hold.</h2>
    <p class="lead">Three jobs, in that order, done the same way for every property.</p>
    <div class="grid3">
      <div class="gcard">
        <span class="kicker">01 &middot; Screen</span>
        <h3>Every filing, the same rules</h3>
        <p>Each scheduled sale in six counties is pulled daily, matched against a nine-rule buy box and scored on recorded
          debt against county median value. At the current pull the screen refuses 37% of the calendar on sight.</p>
      </div>
      <div class="gcard">
        <span class="kicker">02 &middot; Buy</span>
        <h3>For cash, to a written ceiling</h3>
        <p>Title, valuation, occupancy and liens are worked on a dated checklist before the sale. A principal attends,
          bids to a ceiling set from the underwriting, and stops there. Twenty percent at the gavel, the balance in thirty
          days.</p>
      </div>
      <div class="gcard">
        <span class="kicker">03 &middot; Hold</span>
        <h3>Voucher tenancy, for income</h3>
        <p>Each home is brought to the housing authority&rsquo;s inspection standard and leased to a Housing Choice Voucher
          holder. The authority pays the larger part of the rent directly, every month. Trident does not flip.</p>
      </div>
    </div>
    <p class="cap" style="margin-top:24px"><a href="${r}what-we-do/">What we do, in full &rarr;</a> &nbsp;&middot;&nbsp;
      <a href="${r}how-we-buy/">How we buy &rarr;</a></p>
  </div></section>

  <section class="scene"><div class="wrap">
    <div class="split">
      <div class="sh">
        <span class="kicker">The firm today</span>
        <h2>Where it stands</h2>
      </div>
      <div>
        <p class="prose">Trident is new. It has a method, a book, two principals and no track record, and it says so. The
          figures below are the state of the screen at the current pull of the county calendars.</p>
        <div class="bigstats">
          <div class="bigstat"><div class="n">468</div><div class="l">filings on the calendars of six New Jersey counties</div></div>
          <div class="bigstat"><div class="n out">37%</div><div class="l">refused by the screen before any work is done</div></div>
          <div class="bigstat"><div class="n">96</div><div class="l">filings at a deep discount: debt under 0.4 of the county median</div></div>
          <div class="bigstat"><div class="n">10</div><div class="l">items on the pre-bid checklist; nine block the bid</div></div>
        </div>
        <p class="cap" style="margin-top:22px">Six counties live: Bergen, Burlington, Hunterdon, Mercer, Middlesex and Monmouth. Ocean and Somerset are being
          brought on. <a href="${r}where/">Where we buy &rarr;</a></p>
      </div>
    </div>
  </div></section>

  <section class="scene"><div class="wrap">
    <div class="split">
      <div class="sh">
        <span class="kicker">The company</span>
        <h2>A Pursuit Lending Partners company</h2>
      </div>
      <div class="prose">
        <p>Trident is a subsidiary of Pursuit Lending Partners and is run by its two principals, Spencer Dworkin and Ayush
          Patel, who screen every filing, read every title, set every ceiling and stand at every sale themselves. There is
          no acquisitions team between the firm and the courthouse.</p>
        <p>It is national in ambition and New Jersey in practice. Any judicial-foreclosure state with public sale calendars
          and a working voucher program is a candidate; the screen is pointed at a new county by loading its median value
          and its Fair Market Rent. New Jersey is where the book is.</p>
        <div class="actions" style="margin-top:22px"><a class="btn" href="${r}about/">About the firm</a></div>
      </div>
    </div>
  </div></section>

  <section class="scene finale"><div class="wrap">
    <p class="kicker">Contact</p>
    <h2 style="margin-top:12px">Talk to a principal.</h2>
    <p class="lead">An email reaches Spencer Dworkin directly. Investors receive the confidential memorandum and the current
      screened book, then a call with both principals.</p>
    <a class="mail" href="mailto:sgd3210@gmail.com?subject=Trident">sgd3210@gmail.com</a>
  </div></section>
`,
};
