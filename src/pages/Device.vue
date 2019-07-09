<template>
  <q-page class="flex q-pa-md">
  </q-page>
</template>

<script>
export default {
  name: 'PageAllDevices',
  data () {
    return {
    }
  },
  methods: {
    loadDevices () {
    },
    newDevice () {
      this.$router.push({
        name: 'devices-new'
      })
    }
  }
}
</script>
