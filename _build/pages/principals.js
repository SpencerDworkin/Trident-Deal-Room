module.exports = {
  path: 'principals',
  nav: 'principals',
  title: 'Principals — Trident',
  description: 'Trident is a subsidiary of Pursuit Lending Partners, run by two principals who source, screen and bid every property themselves.',
  body: r => `
  <section class="phead">
    <div class="wrap">
      <p class="eyebrow">The principals</p>
      <h1>Two principals, one book, every sale attended.</h1>
      <p class="lead">Trident is a subsidiary of Pursuit Lending Partners. It is run by its two principals, who screen every
        filing, read every title, set every ceiling and stand at every sale themselves. Investors report to the same book
        the principals work from each morning.</p>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">Who</p>
          <h2>The people bidding your capital.</h2>
        </div>
        <div class="prose">
          <p>There is no acquisitions team between you and the courthouse. The two people below decide what gets bid on,
            how much, and when to walk away &mdash; and their own capital sits beneath yours in the stack, so they live with
            the consequences first.</p>
        </div>
      </div>
      <div class="people">
        <div class="person">
          <div class="mark">SD</div>
          <h3>Spencer Dworkin</h3>
          <div class="role">Principal</div>
          <a href="mailto:sgd3210@gmail.com?subject=Trident">sgd3210@gmail.com</a>
        </div>
        <div class="person">
          <div class="mark">AP</div>
          <h3>Ayush Patel</h3>
          <div class="role">Principal</div>
        </div>
      </div>
    </div>
  </section>

  <section class="sec paper">
    <div class="wrap">
      <div class="sec-head">
        <div>
          <p class="eyebrow">How we operate</p>
          <h2>Small by design.</h2>
        </div>
        <div class="prose">
          <p><strong>The screen is code.</strong> The buy box is written as rules with numbers in them and run on every filing
            in every covered county. Neither principal can override a verdict for a property they like; the rules change
            for everyone or not at all.</p>
          <p><strong>Every file carries the checklist.</strong> Ten items, nine of them blocking, each with a date that hangs
            off the sale. A file with a blocking item open on sale day is not bid on.</p>
          <p><strong>A principal attends every sale.</strong> Ceilings are set from the underwriting three days out and written
            down. The person in the room is the person who set the number, and the number does not move.</p>
          <p><strong>Investors see the working book.</strong> Reporting is not a summary prepared for investors; it is the
            book itself, quarterly, property by property. There is nothing to reconcile because there is only one
            document.</p>
          <p><strong>Pursuit Lending Partners.</strong> Trident is a subsidiary of PLP and draws on its lending and real-estate
            underwriting background. The sheriff&rsquo;s-sale program is Trident&rsquo;s own, with its own vehicle and its own
            capital.</p>
        </div>
      </div>
    </div>
  </section>

  <section class="sec">
    <div class="wrap">
      <div class="cbox">
        <div>
          <p class="eyebrow">Talk to us</p>
          <h2>A conversation, not a deck.</h2>
          <p class="prose" style="margin-top:16px">Write and you will hear from a principal, not a placement agent. You will
            get the memorandum and the current book, and a call with both of us.</p>
          <div class="acts">
            <a class="cta lg" href="${r}contact/">Request the materials</a>
            <a class="cta ghost lg" href="${r}method/">Read the method first</a>
          </div>
        </div>
        <div class="where">
          <div class="k">Trident</div>
          <div class="states">A Pursuit Lending Partners company</div>
          <p>New Jersey sheriff&rsquo;s-sale acquisition. Preferred equity from family offices in NY, NJ, PA, CT and FL.</p>
        </div>
      </div>
    </div>
  </section>
`,
};
