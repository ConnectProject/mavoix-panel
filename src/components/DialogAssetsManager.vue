<style lang="stylus" scoped>
.image-upload-wrapper
  display hidden
</style>

<template>
  <q-dialog class="relative-position" :value="opened" maximized persistent>
    <q-card>
      <!-- Top bar -->
      <q-bar class="bg-accent">
        <q-space />
        <q-btn dense flat icon="close" color="white" @click="onCancel">
          <q-tooltip content-class="bg-white text-primary">Close</q-tooltip>
        </q-btn>
      </q-bar>

      <!-- Add asset button -->
      <q-btn fab icon="add" class="absolute-bottom-right q-ma-md" color="primary" @click="uploadFile"/>
    </q-card>

    <!-- Image upload invisible wrapper -->
    <div class="image-upload-wrapper">
      <input type="file" ref="invisibleFileInput"/>
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogAssetsManager',
  computed: {
    opened () {
      return this.$store.getters['assets/dialogOpened']
    }
  },
  methods: {
    onCancel () {
      this.$store.commit('assets/closeDialog')
    },
    uploadFile () {
      this.$refs['invisibleFileInput'].click()
    }
  }
}
</script>
