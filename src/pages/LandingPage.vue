<template>
  <div>
    <header>
      <a class="title-link" href="/">MaVoix</a>

      <nav class="nav-links">
        <router-link :to="{ name: 'home' }">MAVOIX PANEL</router-link>
        <a href="https://mavoix.connect-project.io/app">THE APPLICATION</a>
        <router-link :to="{ name: 'LandingPage' }">DOCUMENTATION</router-link>
        <router-link :to="{ name: 'LandingPage' }">ABOUT US</router-link>
      </nav>
    </header>

    <main>
      <section>
        <div class="section-text">
          <h2>MaVoix</h2>
          <p>
            MaVoix is an open source application enabling non-verbal persons to communicate using images.<br>MaVoix is integrated with Connect, an open database for sharing public, anonymous data among assistive applications. Using MaVoix we work together to make image-based communication better.
          </p>
        </div>
        <img
          class="mavoix-img"
          src="/mavoix.png"
          alt="Logo of MaVoix">
      </section>

      <section>
        <img
          class="connect-img"
          src="/connect-db.png"
          alt="Logo of MaVoix">
        <div class="section-text">
          <h2>Sharing is caring</h2>
          <p>
            MaVoix is an open source application enabling non-verbal persons to communicate using images.<br>MaVoix is integrated with Connect, an open database for sharing public, anonymous data among assistive applications. Using MaVoix we work together to make image-based communication better.
          </p>
        </div>
      </section>

      <section>
        <div class="section-text">
          <h2>Data for insight</h2>
          <p>
            MaVoix is an open source application enabling non-verbal persons to communicate using images.<br>MaVoix is integrated with Connect, an open database for sharing public, anonymous data among assistive applications. Using MaVoix we work together to make image-based communication better.
          </p>
        </div>
        <img
          class="data-img"
          src="/data.svg"
          alt="Logo of MaVoix">
      </section>
    </main>

    <footer>
      <a href="https://www.google.fr/maps/place/Institut+Pasteur/@48.8403549,2.3090896,17z/data=!3m1!4b1!4m5!3m4!1s0x47e670376abf4b5b:0xe831277d10f68655!8m2!3d48.8403549!4d2.3112783">
        <img
          class="pasteur-location"
          src="/institut-pasteur-location.png"
          alt="Go to the Institut Pasteur location on Google Maps">
      </a>

      <address>
        <a href="https://www.pasteur.fr">
          <img
            src="/institut-pasteur-logo.webp"
            width="143"
            height="39"
            alt="The logo of the Institut Pasteur">
        </a>
        <a href="https://www.google.fr/maps/place/Institut+Pasteur/@48.8403549,2.3090896,17z/data=!3m1!4b1!4m5!3m4!1s0x47e670376abf4b5b:0xe831277d10f68655!8m2!3d48.8403549!4d2.3112783">
          25-28 Rue du Dr Roux, <br>
          75015 Paris
        </a>
        <a href="tel:0145688000">
          01 45 68 80 00
        </a>
      </address>

      <ul>
        <li><a href="https://www.pasteur.fr/fr/institut-pasteur">L'Institut Pasteur</a></li>
        <li><a href="https://www.pasteur.fr/fr/nos-missions">Nos missions</a></li>
        <li><a href="https://www.pasteur.fr/fr/nous-soutenir">Nous soutenir</a></li>
        <li><a href="https://www.pasteur.fr/fr/centre-medical">Centre médical</a></li>
      </ul>

      <ul>
        <li><a href="https://faireundon.pasteur.fr/">Faites un don</a></li>
        <li><a href="https://www.pasteur.fr/fr/presse">Espace presse</a></li>
        <li><a href="https://www.pasteur.fr/fr/mentions-legales">Mentions légales</a></li>
        <li><a href="https://www.pasteur.fr/fr/credits">Credits</a></li>
      </ul>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'LandingPage'
}
</script>

<style scoped>
header {
  display: flex;
  flex-flow: row wrap;
  align-items: center;
  align-content: center;
  justify-content: space-between;
  height: 64px;
  padding: 0 16px;
  border-bottom: 1px solid var(--grey);
}

.title-link {
  color: var(--black);
  font-size: 32px;
  font-family: var(--title-font);
}

.nav-links {
  display: flex;
  gap: var(--spacing-large);
  font-weight: bold;
}

.nav-links a {
  color: var(--black);
  letter-spacing: 1px;
}

section {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: calc(var(--spacing-large) * 3);
  padding: var(--spacing-large);
}

.section-text {
  margin: auto 0;
  width: min(600px, 100%);
  font-size: 18px;
}

.mavoix-img {
  height: 600px;
}

.connect-img {
  height: 500px;
}

.data-img {
  height: 500px;
  width: 600px;
}

footer {
  background-color: var(--green);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-transform: uppercase;
  font-weight: bold;
  padding: 16px;
}

footer .pasteur-location {
  border: 2px solid var(--red);
  border-radius: 50%;
}

footer address {
  display: flex;
  flex-flow: column wrap;
}

footer ul {
  list-style: none;
  border-left: 2px solid var(--red);
}

footer li {
  margin-bottom: 4px;
}

footer a {
  color: var(--white);
}
</style>
