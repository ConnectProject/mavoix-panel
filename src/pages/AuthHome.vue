<template>
  <q-page class="login">
    <img class="mavoix" src="/mavoix.png" alt="">

    <section class="login-card">
      <h1>
        <span class="red">L</span>
        <span class="yellow">O</span>
        <span class="green">G</span>
        <span class="grey">I</span>
        <span class="brown">N</span>
      </h1>

      <form class="login-form" @keyup.enter="createUser()">
        <label for="login-email">Email</label>
        <input
          v-model="email"
          id="login-email"
          type="email">

        <label for="login-password">Password</label>
        <input
          v-model="password"
          id="login-password"
          type="password">

        <button
          type="button"
          @click="createUser()">
          LOG IN
        </button>
      </form>

      <div class="no-account">
        <span>Don't have any account ? </span>
        <a href="">Register</a>
      </div>
    </section>
  </q-page>
</template>

<script>
export default {
  name: 'PageAuthHome',
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
  letter-spacing: 8px;
  margin: 0;
}

h1 .red {
  color: var(--red);
}

h1 .yellow {
  color: var(--yellow);
}

h1 .green {
  color: var(--green);
}

h1 .grey {
  color: var(--grey);
}

h1 .brown {
  color: var(--brown);
}

.login-form {
  display: flex;
  flex-flow: column wrap;
  gap: 8px;
  width: 400px;
}

a {
  color: var(--green);
  font-weight: bold;
}
</style>
