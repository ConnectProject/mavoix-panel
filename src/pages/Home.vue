<template>
  <q-page class="flex flex-center">
    <h3> Bienvenue sur Ma Voix {{ $store.state.users.user.name | capitalize }}</h3>
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageHome',
  filters: {
    capitalize: function (value) {
      if (!value) return ''
      value = value.toString()

      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  }
}
</script>
