<template>
  <q-dialog :value="opened">
    <p>Hey</p>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogAssetEdit',
  computed: {
    opened () {
      return true
    }
  }
}
</script>
