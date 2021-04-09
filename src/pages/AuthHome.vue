<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-form @submit="createUser">
        <h5 class="q-ma-md">
          {{ isConnexion ? 'Connexion' : 'Inscription' }} :
        </h5>
        <q-input
          v-model="email"
          outlined
          label="Email"
          class="q-ma-md"
        />
        <q-input
          v-model="password"
          outlined
          label="Password"
          type="password"
          class="q-ma-md"
        />
        <q-btn
          type="submit"
          class="q-ma-md"
        >
          {{ isConnexion ? 'Connexion' : 'Inscription' }}
        </q-btn>
        <br>
        <div
          class="q-ma-md cursor-pointer"
          @click="isConnexion = !isConnexion"
        >
          <small>{{ isConnexion ? 'incription' : 'connexion' }}</small>
        </div>
      </q-form>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageAuthHome',
  data () {
    return {
      email: '',
      password: '',
      isConnexion: true
    }
  },
  computed: {
    // does not seem to be used
    // users () {
    //   return this.$store.getters['users/users']
    // },
    isConnected () {
      return this.$store.getters['users/isConnected']
    },
    error () {
      return this.$store.getters['users/error']
    }
  },
  watch: {
    isConnected () {
      this.$router.push({
        name: 'home'
      })
    },
    error (newVal) {
      if (newVal) {
        this.$q.notify({ position: 'top-right', message: newVal, color: 'red' })
        this.$store.commit('users/resetError')
      }
    }
  },
  methods: {
    createUser () {
      if (this.isConnexion) {
        this.$store.dispatch('users/connect', [this.email, this.password])
      } else {
        this.$store.dispatch('users/create', [this.email, this.password])
      }
      // this.$router.push('/home')
    }
  }
}
</script>
