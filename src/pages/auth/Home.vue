<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-input outlined label="Username" v-model="email" class="q-ma-md"></q-input>
      <q-input outlined label="Password" v-model="password" class="q-ma-md"></q-input>
      <q-btn @click="$router.push({ name: 'home' })" class="q-ma-md">
        Connexion
      </q-btn>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: 'PageAuthHome',
  data () {
    return {
      username: '',
      password: ''
    }
  }
}
</script>
