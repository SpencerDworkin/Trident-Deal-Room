module.exports = {
  path: 'contact',
  nav: 'contact',
  title: 'Contact · Trident',
  description: 'Contact a Trident principal. Qualified investors receive the private placement memorandum, a presentation of the platform and a meeting with both principals.',
  body: r => `
  <section class="phead" style="background-image:url(${r}assets/img/hero-street.webp)"><div class="wrap">
    <p class="kicker">Contact</p>
    <h1>Speak with a principal.</h1>
    <p class="lead">Every inquiry reaches Spencer Dworkin and Ayush Patel directly.</p>
    <a class="mail" href="mailto:sgd3210@gmail.com?subject=Trident">sgd3210@gmail.com</a>
    <p class="also">Trident, a Patel Legacy Properties company.</p>
  </div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">Investors</p><h2>What happens next</h2></div>
    <div>
      <dl class="rows">
        <div><dt>Within a business day</dt><dd>A reply from a principal and a time to speak.</dd></div>
        <div><dt>Materials</dt><dd>Qualified investors receive the private placement memorandum and a presentation of the platform and the current pipeline.</dd></div>
        <div><dt>Meeting</dt><dd>A conversation with both principals, built around your questions.</dd></div>
        <div><dt>Subscription</dt><dd>Investor verification, subscription documents and commitment.</dd></div>
      </dl>
      <p class="cap" style="margin-top:14px">Trident Fund I is offered by invitation to accredited investors and qualified purchasers in New Jersey, New York,
        Pennsylvania, Connecticut and Florida. Minimum commitment $1,000,000. <a href="${r}investors/">The fund &rarr;</a></p>
    </div>
  </div></div></section>

  <section class="scene alt"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">Partners</p><h2>Counsel, title, housing authorities and owners</h2></div>
    <div class="prose">
      <p>If you are an attorney, a title company, a housing authority, a contractor or a property owner who would like to
        work with Trident, the same address reaches the same people.</p>
    </div>
  </div></div></section>

  <nav class="cont"><div class="wrap"><a href="${r}what-we-do/">Strategy &rarr;</a> <a href="${r}investors/">The Fund &rarr;</a> <a href="${r}about/">About &rarr;</a></div></nav>
`,
};
