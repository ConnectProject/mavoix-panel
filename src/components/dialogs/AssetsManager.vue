<style lang="stylus" scoped>
.image-upload-wrapper
  display hidden
.asset-card
  cursor pointer
  transition 0.2s
  opacity 1
.asset-card:hover
  opacity 0.3
.action-icon-wrapper
  opacity 0
  transition 0.3s
.action-icon-wrapper:hover
  opacity 1
.action-icon
  font-size 3em
input[type='file']
  position fixed
  left 100%
  top 100%
</style>

<template>
  <q-page-container v-if="opened" class="relative-position" :value="opened" style="padding-left: 0px; padding-top: 80px">

    <q-page class="row" v-if="!loading">

        <!-- Assets -->
        <q-card
          v-for="(asset, index) in assets"
          :key="index"
          @click="() => onActionAsset(asset)"
          class="col-2 q-ma-md asset-card">
          <q-img :ratio="16 / 9" :src="asset.file._url" basic>
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ asset.name }}
            </div>
            <div class="absolute fit flex justify-center items-center text-center action-icon-wrapper">
              <q-icon :name="selectMode ? 'done' : 'edit'" class="action-icon" size="xl" />
            </div>
          </q-img>
        </q-card>

        <!-- Add asset button -->
        <q-fab
            class="fixed-bottom-right q-ma-md"
            direction="up"
            color="accent"
          >
          <q-fab-action @click="onUploadFile" color="primary" icon="attach_file" />
          <q-fab-action color="primary" icon="cloud" />
          <q-fab-action color="primary" icon="camera" />
        </q-fab>

        <!-- Image upload invisible wrapper -->
        <div v-if="!selectMode" class="image-upload-wrapper">
          <input type="file" ref="invisibleFileInput" @input="onInputFile" />
        </div>

        <!-- Asset edit dialog -->
        <asset-edit v-if="!selectMode"/>

        <!-- Filters form -->
        <q-page-sticky
          expand
          position="top"
        >
          <q-toolbar class="bg-white">
            <q-form class="row q-ma-md">
              <q-input outlined label="Nom">
                <template v-slot:append>
                  <q-icon name="search" />
                </template>
              </q-input>
            </q-form>
          </q-toolbar>
        </q-page-sticky>

    </q-page>
  </q-page-container>
</template>

<script>
import AssetEdit from './AssetEdit'

export default {
  name: 'DialogAssetsManager',
  components: {
    AssetEdit
  },
  computed: {
    /**
     * Return true if the dialog should be opened
     */
    opened () {
      return this.$store.getters['assetsManager/opened']
    },
    /**
     * Return true if assets are loading
     */
    loading () {
      return this.$store.getters['assetsManager/loading']
    },
    /**
     * Return all assets
     */
    assets () {
      return this.$store.getters['assetsManager/all']
    },
    /**
     * Return true if assets manager opened to select asset, false if its to manage assets
     */
    selectMode () {
      return this.$store.getters['assetsManager/selectMode']
    }
  },
  methods: {
    /**
     * Call to cancel
     */
    onCancel () {
      if (!this.selectMode) this.$router.back()
      this.$store.commit('assetsManager/close')
    },
    /**
     * Call to upload a file
     */
    onUploadFile () {
      this.$refs['invisibleFileInput'].click()
    },
    /**
     * When a file has been uploaded create the asset
     */
    onInputFile ({ target: { files } }) {
      if (files.length > 0) {
        const file = files[0]
        this.$store.dispatch('assetsManager/uploadFile', file)
      }
    },
    /**
     * When clicking on the asset select it or edit it
     */
    onActionAsset (asset) {
      if (this.selectMode) {
        this.$store.commit('assetsManager/selectAsset', asset)
      } else {
        this.$store.commit('assetsManager/editAsset', asset)
      }
    }
  }
}
</script>
