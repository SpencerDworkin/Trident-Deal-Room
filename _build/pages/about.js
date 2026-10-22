module.exports = {
  path: 'about',
  nav: 'about',
  title: 'About · Trident',
  description: 'Trident is a Pursuit Lending Partners company run by two principals, Spencer Dworkin and Ayush Patel, who screen every filing, set every ceiling and attend every sale themselves.',
  body: r => `
  <section class="phead" style="background-image:url(${r}assets/img/hero-street.jpg)"><div class="wrap">
    <p class="kicker">About</p>
    <h1>Two principals. One book. Every sale attended.</h1>
    <p class="lead">Trident is a subsidiary of Pursuit Lending Partners. It is run by its two principals, who screen every
      filing, read every title, set every ceiling and stand at every sale themselves. There is no acquisitions team
      between the firm and the courthouse.</p>
  </div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">01</p><h2>The principals</h2></div>
    <div>
      <dl class="rows" style="margin-top:0">
        <div><dt>Spencer Dworkin</dt><dd>Principal<small><a href="mailto:sgd3210@gmail.com?subject=Trident">sgd3210@gmail.com</a></small></dd></div>
        <div><dt>Ayush Patel</dt><dd>Principal</dd></div>
      </dl>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">02</p><h2>How the firm operates</h2></div>
    <div class="prose">
      <p><strong>The screen is code.</strong> The buy box is written as rules with numbers in them and run on every filing in
        every covered county. Neither principal can override a verdict for a property they like; the rules change for
        everyone or not at all.</p>
      <p><strong>Every file carries the checklist.</strong> Ten items, nine of them blocking, each with a date that hangs
        off the sale. A file with a blocking item open on sale day is not bid on.</p>
      <p><strong>A principal attends every sale.</strong> Ceilings are set from the underwriting three days out and written
        down. The person in the room is the person who set the number, and the number does not move.</p>
      <p><strong>Investors see the working book.</strong> Reporting is not a summary prepared for investors; it is the book
        itself, quarterly, property by property.</p>
      <p><strong>The principals invest in the fund.</strong> On the same terms as other investors.</p>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">03</p><h2>Pursuit Lending Partners</h2></div>
    <div class="prose">
      <p>Trident draws on Pursuit Lending Partners&rsquo; lending and real-estate underwriting background: reading a title,
        sizing a lien, pricing a make-ready, setting a number and holding to it. The sheriff&rsquo;s-sale business is
        Trident&rsquo;s own, with its own vehicle and its own capital.</p>
      <p>The firm is newly formed. It has no operating history and no assets under management, and it would rather say so
        on its own website than have you find out on a call.</p>
    </div>
  </div></div></section>

  <section class="band" style="background-image:url(${r}assets/img/hero-street.jpg)"><div class="wrap">
    <p class="kicker">Contact</p>
    <h2 style="margin-top:12px">Write and you will hear from a principal.</h2>
    <p class="lead">Not a placement agent, not an inbox someone else reads.</p>
    <a class="mail" href="mailto:sgd3210@gmail.com?subject=Trident">sgd3210@gmail.com</a>
  </div></section>
`,
};
