<template>
  <q-dialog
    ref="dialog"
    v-model="opened"
    class="q-gutter-xs"
    full-width
    full-height
    message="$t('assets.chooseImages')"
  >
    <q-card>
      <q-card-section>
        <div class="text-h6">
          {{ $t('assets.select') }}
        </div>
      </q-card-section>

      <q-separator />

      <q-card-section
        style="max-height: calc(100% - 120px)"
        class="scroll"
      >
        <assets-manager
          ref="assetsManager"
          select-mode
        />
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          flat
          :label="$t('generic.cancel')"
          color="red"
          @click="close"
        />
        <q-btn
          flat
          :label="$t('generic.add')"
          color="primary"
          @click="addSelectedItems"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
  <!-- Image upload invisible wrapper -->
</template>

<script>
import AssetsManager from '~/pages/AssetsManager.vue'

export default {
  name: 'DialogItemChoice',
  components: {
    AssetsManager
  },
  data () {
    return {
      opened: false
      // search: '',
      // assetsEditable: [],
      // assetsToAdd: []
    }
  },
  computed: {
    route () {
      return this.$route.params.assets
    },

    /**
     * @return {boolean} true if the dialog should be opened
     * Never used
     */
    // opened () {
    //   return this.$store.getters['tabEditor/itemChoiceOpened']
    // },

    /**
     * @return {boolean} if assets are loading
     */
    // loading () {
    //   return this.$store.getters['assetsManager/loading']
    // },

    /**
     * @return {boolean} the tts plugin
     */
    // tts () {
    //   return this.$store.getters['global/tts']
    // },

    /**
     * @return {boolean} true if tts is enabled
     */
    // ttsEnabled () {
    //   return this.$store.getters['global/ttsEnabled']
    // },

    // /**
    //  * @return {Object} all assets
    //  */
    // assets () {
    //   return this.$store.getters['assetsManager/all']
    // },

    /**
     * @return {Object} assets that contain the search query
     */
    // assetsSorted () {
    //   return this.$store.getters['assetsManager/all'].filter((elem) => (this.search === '' || elem.name.toUpperCase().includes(this.search.toUpperCase())))
    // },
    /**
     * Return true if assets manager opened to select asset, false if its to manage assets
     * Never called
     */
    // selectMode () {
    //   return this.$store.getters['assetsManager/selectMode']
    // }
  },
  // watch: {
  //   assets (to, from) {
  //     this.assetsEditable = to.map(function (el) {
  //       var o = Object.assign({}, el)
  //       o.isSelected = false

  //       return o
  //     })
  //   }
  // },

  /**
   * We create a version of the assets with a boolean editable so we can decide which assets to add to a given tab
   * @returns {void}
   */
  // mounted () {
  //   this.$store.dispatch('assetsManager/loadAssets').then(() => {
  //     this.assetsEditable = this.assets.map(function (el) {
  //       var o = Object.assign({}, el)
  //       o.isSelected = false

  //       return o
  //     })
  //   })
  // },
  methods: {
    // editAsset (asset) {
    //   this.$store.commit('assetsManager/editAsset', asset)
    // },
    // saveAsset (name) {
    //   this.$store.commit('assetsManager/editingAssetSetName', name)
    //   this.$store.dispatch('assetsManager/saveEditingAsset')
    //   document.activeElement.blur()
    //   this.$q.notify({ position: 'top-right', message: this.$t('assetsManager.nameSave') + name, color: 'blue' })
    // },
    // eraseAsset (asset) {
    //   this.$store.commit('assetsManager/editAsset', asset)
    //   this.$store.dispatch('assetsManager/destroyEditingAsset')
    // },

    /**
     * Reset assets editable and close dialog
     * @returns {void}
     */
    close () {
      // this.assetsEditable = this.assetsEditable.map(function (el) {
      //   var o = Object.assign({}, el)
      //   o.isSelected = false

      //   return o
      // })
      this.opened = false
      // this.$store.commit('tabEditor/closeItemChoice', {})
    },

    /**
     * Add selected items to the tab
     * @returns {void}
     */
    addSelectedItems () {
      const { assets } = this.$refs.assetsManager
      const { selectedAssets } = this.$refs.assetsManager
      this.assetsToAdd = assets.filter(el =>
        selectedAssets.indexOf(el.id) > -1
      )
      this.$store.commit('tabEditor/pushItems', this.assetsToAdd)
      this.close()
    },

    /**
     * Call to hide the dialog
     * these two next are important (Quasar's Dialog behavior)
     * @returns {void}
     */
    // hide () {
    //   this.$refs.dialog.hide()
    // },
    // onDialogHide () {
    //   // required to be emitted
    //   // when QDialog emits "hide" event
    //   this.$store.commit('tabEditor/closeItemChoice', {})
    // },
    // onCancel () {
    //   if (!this.selectMode) this.$router.back()
    //   this.$store.commit('assetsManager/close')
    // },
    /**
     * Call to upload a file
     * @returns {void}
     */
    // onUploadFile () {
    //   this.$refs.invisibleFileInput.click()
    // },

    /**
     * When a file has been uploaded create the asset
     * Never used
     * @returns {void}
     */
    // onInputFile ({ target: { files } }) {
    //   this.$store.dispatch('assetsManager/uploadFiles', {files})
    // }
  }
}
</script>

<style lang="stylus" scoped>
// .card
//   min-width 140px
//   min-height 130px

// .rounded-borders
//   border-radius 4px !important

// .relative
//   position relative !important
</style>
