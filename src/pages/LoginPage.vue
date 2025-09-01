<template>
  <q-page class="login">
    <img
      class="mavoix"
      src="/mavoix.png"
      alt=""
    >

    <section class="login-card">
      <h1>
        <colored-text text="CONNEXION" />
      </h1>

      <form
        class="login-form"
        @keyup.enter="createUser()"
      >
        <label for="login-email">Email</label>
        <input
          id="login-email"
          v-model="email"
          type="email"
        >

        <label for="login-password">Mot de passe</label>
        <input
          id="login-password"
          v-model="password"
          type="password"
        >

        <button
          type="button"
          @click="createUser()"
        >
          SE CONNECTER
        </button>
      </form>

      <div>
        <span>Vous n'avez pas de compte ? </span>
        <router-link :to="{ name: 'RegisterPage' }">
          Inscription
        </router-link>
      </div>
    </section>
  </q-page>
</template>

<script>
import ColoredText from "../components/ColoredText"

export default {
  name: 'LoginPage',
  components: {
    ColoredText
  },
  data() {
    return {
      email: '',
      password: '',
      isConnexion: true
    }
  },
  computed: {
    error() {
      return this.$store.getters['users/error']
    }
  },
  watch: {
    error(newVal) {
      if (newVal) {
        this.$q.notify({ position: 'top-right', message: newVal, color: 'red' })
        this.$store.commit('users/resetError')
      }
    }
  },
  methods: {
    createUser() {
      if (this.isConnexion) {
        this.$store.dispatch('users/connect', [this.email, this.password])
      } else {
        this.$store.dispatch('users/create', [this.email, this.password])
      }
    }
  }
}
</script>

<style scoped>
.login {
  align-items: center;
  background: linear-gradient(180deg, var(--white) 50%, var(--pink) 100%);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}

.mavoix {
  height: 600px;
}

.login-card {
  align-items: center;
  background-color: var(--white);
  border-radius: 20px;
  border: 4px solid var(--red);
  display: flex;
  flex-flow: column wrap;
  gap: 16px;
  padding: 64px;
}

h1 {
  font-size: 64px;
  font-weight: bold;
  letter-spacing: 8px;
  margin: 0;
}

.login-form {
  display: flex;
  flex-flow: column wrap;
  gap: 16px;
  width: 400px;
}

a {
  color: var(--green);
  font-weight: bold;
}
</style>
