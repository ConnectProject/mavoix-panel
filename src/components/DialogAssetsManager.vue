<style lang="stylus" scoped>
.image-upload-wrapper
  display hidden
.asset-card
  max-width 250px
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

      <div class="row q-col-gutter-none" v-if="!loading">
        <q-card
          v-for="(asset, index) in assets"
          :key="index"
          class="col-2 q-ma-md">
          <img :src="asset.get('parseFile')._url"/>
          <q-card-section>
            <p>{{ asset.get('name') }}</p>
          </q-card-section>
          <q-card-actions align="right">
            <q-btn flat color="negative">Supprimer</q-btn>
          </q-card-actions>
        </q-card>
      </div>

      <!-- Add asset button -->
      <q-btn
        fab
        icon="add"
        class="absolute-bottom-right q-ma-md"
        color="primary"
        @click="onUploadFile"
      />
    </q-card>

    <!-- Image upload invisible wrapper -->
    <div class="image-upload-wrapper">
      <input type="file" ref="invisibleFileInput" @input="onInputFile" />
    </div>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogAssetsManager',
  computed: {
    opened () {
      return this.$store.getters['assets/dialogOpened']
    },
    loading () {
      return this.$store.getters['assets/loading']
    },
    assets () {
      return this.$store.getters['assets/all']
    }
  },
  methods: {
    onCancel () {
      this.$store.commit('assets/closeDialog')
    },
    onUploadFile () {
      this.$refs['invisibleFileInput'].click()
    },
    onInputFile ({ target: { files } }) {
      if (files.length > 0) {
        const file = files[0]
        this.$store.dispatch('assets/uploadFile', file)
      }
    }
  }
}
</script>
