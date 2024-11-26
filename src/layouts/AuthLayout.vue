<template>
  <q-layout view="hHh lpR fFf">
    <q-header class="bg-grey text-white">
      <q-toolbar>
        <q-toolbar-title>
          MaVoix
        </q-toolbar-title>
        <list-item-loading v-if="$store.state.users.loading" />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer>
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
export default {
  name: 'LayoutAuth'
}
</script>

<style scoped>
.q-footer {
  background-color: var(--green);
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  text-transform: uppercase;
  font-weight: bold;
  padding: 16px;

  &::before {
    content: url(/institut-pasteur-location.png);
  }
}

address {
  display: flex;
  flex-flow: column wrap;
}

ul {
  list-style: none;
  border-left: 2px solid  var(--red);
}

li {
  margin-bottom: 4px;
}

a {
  color: var(--white);
}
</style>
