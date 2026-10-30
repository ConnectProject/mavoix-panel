<template>
  <q-page
    class="flex flex-center"
    :style="{ background: $route.query.code ? lastTabColor : '' }"
  >
    <!-- coming back from Connect: the layout links the account and moves on to a tab -->
    <div v-if="!$route.query.code">
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
import Parse from 'parse'

import ListItemLoading from '~/components/ListItemLoading'
import { connectAuthorizeUri, connectRedirectUri } from '~/utils/connect'
import { getLastTabColor } from '~/utils/mavoixNavigation'

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
      lastTabColor: getLastTabColor(),
      redirectUri: connectRedirectUri()
    }
  },
  computed: {
    authorizeUri () {
      return connectAuthorizeUri()
    },
    username () {
      return Parse.User.current()?.getUsername()
    },
    connectUserId () {
      return this.$store.state.users.connectUserId
    }
  },
  methods: {
    unlinkFromConnect () {
      Parse.Cloud.run('unlinkFromConnect').then(() => {
        this.$store.commit('users/setConnectUserId', null)
      })
    }
  }
}
</script>

<style>
</style>
