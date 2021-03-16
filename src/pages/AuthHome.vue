<template>
  <q-page class="flex flex-center">
    <q-card>
      <h5 class="q-ma-md">{{ isConnexion ? 'Connexion' : 'Inscription'}} :</h5>
      <q-input outlined label="Email" v-model="email" class="q-ma-md"></q-input>
      <q-input outlined label="Password" type="password" v-model="password" class="q-ma-md"></q-input>
      <q-btn @click="createUser" class="q-ma-md">
        {{ isConnexion ? 'Connexion' : 'Inscription'}}
      </q-btn>
      <br/>
      <div class="q-ma-md cursor-pointer" @click="isConnexion = !isConnexion"><small>{{ isConnexion ? 'incription' : 'connexion' }}</small></div>
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
    isConnected (newValue, oldValue) {
      this.$router.push({
        name: 'home'
      })
    },
    error (newVal, oldVal) {
      this.$q.notify({ position: 'top-right', message: newVal, color: 'blue' })
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
