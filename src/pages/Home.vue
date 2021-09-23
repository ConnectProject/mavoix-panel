<template>
  <q-page class="flex flex-center">
    <div>
      <h3> Bienvenue sur Ma Voix {{ username }}</h3>

      <!-- If the query is loading -->
      <list-item-loading v-if="$store.state.users.loading" />
      <div v-else>
        <p v-if="connectUserId">
          Connect user ID: {{ connectUserId }}<br>
          <a
            href="javascript:void(0)"
            @click="unlinkFromConnect"
          >
            Se déconnecter
          </a>
        </p>
        <p v-else>
          Non connecté à Connect<br>
          <a
            :href="authorizeUri"
          >Se connecter</a>
        </p>
      </div>
    </div>
  </q-page>
</template>

<script>
import ListItemLoading from '~/components/ListItemLoading'
import Parse from 'parse'

export default {
  name: 'PageHome',
  filters: {
    // capitalize: function (value) {
    //   if (!value) return ''
    //   value = value.toString()

    //   return value.charAt(0).toUpperCase() + value.slice(1)
    // }
  },
  components: {
    ListItemLoading
  },
  data () {
    return {
      redirectUri: `${window.location.origin}/home`
    }
  },
  computed: {
    authorizeUri() {
      return `${process.env.CONNECT_URL}/authorize?client_id=${process.env.CONNECT_CLIENT_ID}&redirect_uri=${this.redirectUri}`
    },
    username() {
      return Parse.User.current()?.getUsername()
    },
    connectUserId () {
      return this.$store.state.users.connectUserId
    }
  },
  created () {
    const authorizationCode = this.$router.currentRoute.query.authorization_code
    if (authorizationCode) {
      const params = {authorizationCode, redirectUri: this.redirectUri}
      Parse.Cloud.run("linkWithConnect", params).then(({connectUserId}) => {
        this.$store.commit('users/setConnectUserId', connectUserId)
      })
        .catch((err) => {
          console.error(err)
          this.$q.notify({ position: 'top-right', message: "Erreur lors de la connexion à connect: " + err.message, color: 'red' })
        })
      this.$router.replace({name:'home'})
    }
  },
  methods: {
    unlinkFromConnect() {
      Parse.Cloud.run("unlinkFromConnect").then(() => {
        this.$store.commit('users/setConnectUserId', null)
      })
    }
  }
}
</script>

<style>
</style>
