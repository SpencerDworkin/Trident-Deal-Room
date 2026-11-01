module.exports = {
  path: 'contact',
  nav: 'contact',
  title: 'Contact · Trident',
  description: 'Reach a Trident principal directly.',
  body: r => `
  <section class="phead" style="background-image:url(${r}assets/img/hero-street.webp)"><div class="wrap">
    <p class="kicker">Contact</p>
    <h1>Talk to a principal.</h1>
    <p class="lead">Email reaches Spencer Dworkin and Ayush Patel directly. Tell us a little about yourself and how you found
      us, and one of us will reply within a business day.</p>
    <a class="mail" href="mailto:sgd3210@gmail.com?subject=Trident">sgd3210@gmail.com</a>
    <p class="also">Trident, a Patel Legacy Properties company. New Jersey.</p>
  </div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">Investors</p><h2>If we have met</h2></div>
    <div class="prose">
      <p>We bring a small group of private investors into each property we buy, and we only work with people we have sat
        down with. If we have met, or someone we both know has introduced us, write and we will set up a time to talk.
        Opportunities are shared privately, with full documents, once we know each other.</p>
    </div>
  </div></div></section>

  <section class="scene alt"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">Owners and Brokers</p><h2>If you have a building</h2></div>
    <div class="prose">
      <p>If you own or represent mixed use or retail property in New Jersey or nearby and want a straightforward buyer
        who can move, the same address reaches the same people.</p>
    </div>
  </div></div></section>

  <nav class="cont"><div class="wrap"><a href="${r}what-we-do/">Approach &rarr;</a> <a href="${r}about/">About Us &rarr;</a></div></nav>
`,
};
