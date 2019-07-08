<template>
  <q-page class="flex q-pa-md">
    <!-- If query is loading -->
    <loading v-if="loading" />

    <!-- If the query return 0 results -->
    <h2 v-else-if="devices.length < 1">Pas d'appareils trouvés</h2>

    <!-- If the query returned 1 or more results -->
    <div v-else>
    </div>

    <!-- Click to add a new device -->
    <fab
      icon="add"
      :onClick="newDevice"
    />
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageAllDevices',
  data () {
    return {
      loading: true, // True if the query has not been completed yet
      devices: [] // Fetched devices
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
  },
  mounted () {
    this.loadDevices()
  }
}
</script>
