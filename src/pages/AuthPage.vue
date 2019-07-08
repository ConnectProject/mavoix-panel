<template>
  <q-page class="flex flex-center">
    <q-btn v-on:click="$router.push({ name: 'devices-all' })">Connexion avec github</q-btn>
  </q-page>
</template>

<script>
export default {
  name: 'AuthPage'
}
</script>
