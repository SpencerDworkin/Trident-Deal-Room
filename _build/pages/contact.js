module.exports = {
  path: 'contact',
  nav: 'contact',
  title: 'Contact · Trident',
  description: 'Reach a Trident principal directly. Investors receive the private placement memorandum and the current screened book, then a call with both principals.',
  body: r => `
  <section class="phead" style="background-image:url(${r}assets/img/hero-street.jpg)"><div class="wrap">
    <p class="kicker">Contact</p>
    <h1>Write to a principal.</h1>
    <p class="lead">There is no form and no gate. An email reaches Spencer Dworkin directly.</p>
    <a class="mail" href="mailto:sgd3210@gmail.com?subject=Trident">sgd3210@gmail.com</a>
    <p class="also">Spencer Dworkin and Ayush Patel, principals. Trident, a Pursuit Lending Partners company.</p>
  </div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">Investors</p><h2>What happens next</h2></div>
    <div>
      <p class="prose">Write with &ldquo;fund materials&rdquo; in the subject line and this is the sequence.</p>
      <dl class="rows">
        <div><dt>Within a day</dt><dd>The confidential private placement memorandum and the current screened book &mdash; every filing in the covered counties, how the screen sorted it, and the files being worked.</dd></div>
        <div><dt>Then</dt><dd>A call with both principals, built around the questions the materials raised rather than a presentation. We walk through specific files on the calendar and show how the ceiling on each was set.</dd></div>
        <div><dt>If it fits</dt><dd>Accredited-investor or qualified-purchaser verification, subscription documents, and your commitment to the fund. Capital is drawn as files clear the screen and the checklist.</dd></div>
      </dl>
      <p class="cap" style="margin-top:14px">Family offices and accredited investors in New York, New Jersey, Pennsylvania, Connecticut and Florida, by
        private placement, with a minimum commitment of $1,000,000. <a href="${r}investors/">The fund &rarr;</a></p>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">Everyone else</p><h2>Counsel, title, housing authorities, sellers</h2></div>
    <div class="prose">
      <p>If you are plaintiff&rsquo;s counsel on a scheduled sale, a title company, a housing authority, a contractor who
        does make-ready to inspection standard, or an owner who would rather sell before the sale than at it, the same
        address reaches the same people.</p>
    </div>
  </div></div></section>

  <nav class="cont"><div class="wrap"><a href="${r}what-we-do/">What we do &rarr;</a> <a href="${r}investors/">Investors &rarr;</a> <a href="${r}about/">About &rarr;</a></div></nav>
`,
};
