<template>
  <q-layout>
    <q-header>
      <a class="title-link" href="/">MaVoix</a>

      <nav class="nav-links">
        <router-link :to="{ name: 'HomePage' }">ACCUEIL</router-link>
        <router-link :to="{ name: 'ImageGalleryPage' }">GALERIE D'IMAGES</router-link>
        <router-link :to="{ name: 'HomePage' }">DEVICES</router-link>
        <router-link :to="{ name: 'HomePage' }">TABS</router-link>
      </nav>

      <button class="logout-button" type="button" @click="logout()">
        SE DÉCONNECTER
      </button>
    </q-header>

    <q-page-container>
      <main>
        <router-view />
      </main>
    </q-page-container>

    <q-footer>
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
    </q-footer>
  </q-layout>
</template>

<script>
import Parse from 'parse'

export default {
  name: 'MainLayout',
  beforeCreate() {
    if (!Parse.User.current()) {
      this.$router.replace({
        name: 'LoginPage'
      })
    }
  },
  methods: {
    logout() {
      // Reset vuex store
      this.$store.commit('reset')
      Parse.User.logOut()
      this.$router.push({
        name: 'LoginPage'
      })
    },
  }
}
</script>

<style scoped>
header {
  background-color: var(--white);
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

.logout-button {
  color: var(--black);
  letter-spacing: 1px;
  background: none;
  border: none;
}

main {
  padding: var(--spacing);
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

.pasteur-location {
  border: 2px solid var(--red);
  border-radius: 50%;
}

address {
  display: flex;
  flex-flow: column wrap;
}

ul {
  list-style: none;
  border-left: 2px solid var(--red);
}

li {
  margin-bottom: 4px;
}

a {
  color: var(--white);
}
</style>
