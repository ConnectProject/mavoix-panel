<template>
  <q-page class="register">
    <img class="mavoix" src="/mavoix.png" alt="">

    <section class="register-card">
      <h1>
        <span class="red">R</span>
        <span class="yellow">E</span>
        <span class="green">G</span>
        <span class="grey">I</span>
        <span class="brown">S</span>
        <span class="red">T</span>
        <span class="yellow">E</span>
        <span class="green">R</span>
      </h1>

      <form class="register-form" @keyup.enter="createUser()">
        <label for="register-email">Email</label>
        <input
          v-model="email"
          id="register-email"
          type="email">

        <label for="register-password">Choose a password</label>
        <input
          v-model="password"
          id="register-password"
          type="password">

        <label for="register-password-again">Enter your password again</label>
        <input
          v-model="passwordAgain"
          id="register-password-again"
          type="password">

        <button
          type="button"
          @click="createUser()">
          REGISTER
        </button>
      </form>

      <div>
        <span>You already have an account ? </span>
        <router-link :to="{ name: 'LoginPage' }">
          Log in
        </router-link>
      </div>
    </section>
  </q-page>
</template>

<script>
export default {
  name: 'RegisterPage',
  data() {
    return {
      email: '',
      password: '',
      passwordAgain: ''
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
      if (this.password === this.passwordAgain) {
        this.$store.dispatch('users/create', [this.email, this.password])
      } else {
        this.$q.notify({
          position: 'top-right',
          message: 'Passwords must be identical',
          color: 'red'
        })
      }
    }
  }
}
</script>

<style scoped>
.register {
  align-items: center;
  background: linear-gradient(180deg, var(--white) 50%, var(--yellow) 100%);
  display: flex;
  flex-flow: row wrap;
  justify-content: space-evenly;
}

.mavoix {
  height: 600px;
}

.register-card {
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
  font-weight: bold;
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

.register-form {
  display: flex;
  flex-flow: column wrap;
  gap: 8px;
  width: 400px;
}

input:invalid {
  border-color: var(--red);
}

a {
  color: var(--green);
  font-weight: bold;
}
</style>
