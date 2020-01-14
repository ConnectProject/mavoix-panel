<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-btn @click="$router.push({ name: 'home' })">
        Connexion avec github
      </q-btn>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'AuthPage'
}
</script>
