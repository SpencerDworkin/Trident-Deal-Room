module.exports = {
  path: 'contact',
  nav: 'contact',
  title: 'Request the materials — Trident',
  description: 'Request the Trident private placement memorandum and the current screened book, and arrange a call with both principals.',
  body: r => `
  <section class="dochead">
    <div class="wrap">
      <p class="label">Request the materials</p>
      <h1>Write to a principal.</h1>
      <p class="lead">There is no form and no gate. An email reaches Spencer Dworkin directly. Within a day you will have the
        confidential private placement memorandum and the current screened book; then a call with both principals, built
        around the questions the materials raised rather than a presentation.</p>
    </div>
  </section>

  <section class="write" style="border-top:0;padding-top:0">
    <div class="wrap">
      <a class="mail" href="mailto:sgd3210@gmail.com?subject=Trident%20%E2%80%94%20fund%20materials&body=Please%20send%20the%20memorandum%20and%20the%20current%20book.%0A%0AName%3A%0AFamily%20office%20%2F%20firm%3A%0AState%3A%0A">sgd3210@gmail.com</a>
      <p class="also">Subject line &ldquo;Trident &mdash; fund materials&rdquo; reaches the right inbox fastest.</p>
    </div>
  </section>

  <section class="sec">
    <div class="wrap"><div class="sec-n"><span class="n">1</span>
      <div>
        <h2>What happens next</h2>
        <dl class="rows" style="margin-top:18px">
          <div><dt>Within a day</dt><dd>The memorandum and the current screened book &mdash; every filing in the covered counties, how the screen sorted it, and the files being worked.</dd></div>
          <div><dt>Then</dt><dd>A call with both principals. We walk through specific files on the calendar and show how the ceiling on each was set.</dd></div>
          <div><dt>If it fits</dt><dd>Accredited-investor or qualified-purchaser verification, subscription documents, and your commitment to the fund. Capital is drawn as files clear the screen and the checklist.</dd></div>
        </dl>
      </div>
    </div></div>
  </section>

  <section class="sec">
    <div class="wrap"><div class="sec-n"><span class="n">2</span>
      <div class="prose">
        <h2>Who we are raising from</h2>
        <p>Family offices and accredited investors in New York, New Jersey, Pennsylvania, Connecticut and Florida, by private
          placement, with a minimum commitment of $1,000,000. Write from anywhere; those are the states we are organised to
          raise in. The <a href="${r}fund/">fund page</a> sets out the structure and the <a href="${r}legal/">disclosures</a>
          the risks.</p>
      </div>
    </div></div>
  </section>

  <nav class="cont"><div class="wrap"><a href="${r}fund/">The fund &rarr;</a> <a href="${r}strategy/">Strategy &rarr;</a> <a href="${r}method/">Method &rarr;</a></div></nav>
`,
};
