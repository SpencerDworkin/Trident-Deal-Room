module.exports = {
  path: 'about',
  nav: 'about',
  title: 'About · Trident',
  description: 'Trident is a Patel Legacy Properties company led by principals Spencer Dworkin and Ayush Patel.',
  body: r => `
  <section class="phead" style="background-image:url(${r}assets/img/hero-street.webp)"><div class="wrap">
    <p class="kicker">About</p>
    <h1>A small firm, run by its owners.</h1>
    <p class="lead">Trident is a Patel Legacy Properties company, formed in 2026 to buy commercial property in New Jersey and
      the surrounding states with a small group of private investors. There are two principals, and they are the people
      you will deal with.</p>
  </div></section>

  <section class="scene"><div class="wrap">
    <div class="sechead"><p class="kicker">Principals</p><h2>Who we are</h2></div>
    <div class="people">
      <div class="person"><div class="mono">SD</div><div><h3>Spencer Dworkin</h3><p class="role">Principal</p><p>Spencer built the software Trident uses to find property and leads sourcing, data and underwriting. Before Trident he founded an artificial intelligence consulting practice working with businesses across industries.</p><p><a href="mailto:sgd3210@gmail.com?subject=Trident">sgd3210@gmail.com</a></p></div></div>
      <div class="person"><div class="mono">AP</div><div><h3>Ayush Patel</h3><p class="role">Principal · Patel Legacy Properties</p><p>Ayush is a principal of Patel Legacy Properties, a real estate owner and operator in the Northeast. He leads acquisitions, operations and investor relations, and his team manages every property Trident buys.</p></div></div>
    </div>
  </div></section>

  <section class="scene alt"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">Patel Legacy Properties</p><h2>The operating company</h2></div>
    <div class="prose">
      <p>Patel Legacy Properties owns and operates real estate across the Northeast. Its experience in buying, improving
        and managing property is the foundation Trident is built on. Trident is a separate company with its own
        technology and its own deals; Patel Legacy Properties operates what Trident buys.</p>
    </div>
  </div></div></section>

  <section class="scene"><div class="wrap"><div class="split r3 start">
    <div class="sh"><p class="kicker">How We Think</p><h2>Three rules</h2></div>
    <div class="prose">
      <p><strong>Our money goes in first.</strong> We invest in every deal on the same terms as our partners.</p>
      <p><strong>Price is the strategy.</strong> A good building at the wrong price is a bad investment. We would rather miss
        ten than overpay for one.</p>
      <p><strong>Say it plainly.</strong> Our investors get a straight report every quarter and a principal on the phone
        when they want one.</p>
    </div>
  </div></div></section>

  <section class="band" style="background-image:url(${r}assets/img/hero-street.webp)"><div class="wrap">
    <p class="kicker">Contact</p>
    <h2 style="margin-top:12px">Talk to a principal.</h2>
    <a class="mail" href="mailto:sgd3210@gmail.com?subject=Trident">sgd3210@gmail.com</a>
  </div></section>
`,
};
