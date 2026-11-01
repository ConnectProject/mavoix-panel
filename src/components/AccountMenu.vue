<template>
  <span class="account-menu">
    <template v-if="username">
      <a
        href="#"
        class="account-link"
        @click.prevent="dialogOpen = true"
      >{{ username }}</a>
      (<a
        href="#"
        class="account-link"
        @click.prevent="onLogout"
      >{{ $t('logoutLabel') }}</a>)
      <dialog-account
        v-model="dialogOpen"
        @deleted="onDeleted"
      />
    </template>
    <router-link
      v-else
      :to="{ name: 'home' }"
      class="account-link"
    >{{ $t('auth.login') }}</router-link>
  </span>
</template>

<script>
import Parse from 'parse'

import DialogAccount from '~/components/dialogs/Account'

export default {
  name: 'AccountMenu',
  components: { DialogAccount },
  data () {
    return { username: null, dialogOpen: false }
  },
  watch: {
    $route: {
      immediate: true,
      handler () {
        this.refresh()
      }
    },
    dialogOpen (open) {
      if (!open) {
        this.refresh()
      }
    }
  },
  methods: {
    refresh () {
      const user = Parse.User.current()
      this.username = user ? user.getUsername().split('@')[0] : null
    },
    onLogout () {
      this.$store.commit('reset')
      Parse.User.logOut()
      this.refresh()
      this.$router.push({ path: '/' }).catch(() => null)
    },
    onDeleted () {
      this.refresh()
      this.$router.push({ path: '/' }).catch(() => null)
    }
  }
}
</script>

<style scoped>
.account-menu {
  margin-left: 16px;
  white-space: nowrap;
}
.account-link {
  color: inherit;
  text-decoration: underline;
  cursor: pointer;
}
</style>
