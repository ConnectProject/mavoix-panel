<style lang="stylus" scoped>
.card
  min-width 140px
  min-height 130px
.rounded-borders{
  border-radius 4px !important
}
.relative{
  position relative !important
}

</style>

<template>
  <q-dialog
    ref="dialog"
    :value="opened"
    class="q-gutter-xs"
    full-width
    full-height
    message="$t('assets.chooseImages')"
    @hide="onDialogHide"
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
        class="scroll row"
      >
        <q-card
          v-for="(asset, index) in assetsEditable"
          :key="index"
          class="card col-2 q-ma-md"
        >
          <q-img
            v-if="asset.url"
            class="fit rounded-borders cursor-pointer"
            :ratio="16 / 9"
            :src="asset.url"
            contain
            basic
            @click="asset.isSelected = !asset.isSelected"
          />
          <div class="absolute-right q-mt-sm q-mr-sm">
            <q-checkbox v-model="asset.isSelected" />
          </div>
          <q-input
            v-model="asset.name"
            class="absolute-bottom"
            label="Name"
            style="background-color:rgba(255,255,255,0.7)"
            filled
            @click="editAsset(asset)"
            @keyup.enter="saveAsset(asset.name)"
          />
          <q-btn
            color="primary"
            class="absolute-bottom-right q-mb-sm q-mr-md"
            round
            dense
            flat
            icon="play_arrow"
            :disable="ttsEnabled == false"
            @click="tts.speak({ text: asset.name })"
          />
        </q-card>
      </q-card-section>

      <q-separator />

      <q-card-actions align="right">
        <q-btn
          flat
          :label="$t('generic.cancel')"
          color="red"
          @click="cancel"
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
export default {
  name: 'DialogAssetsManager',
  data () {
    return {
      search: '',
      assetsEditable: [],
      assetsToAdd: []
    }
  },
  computed: {
    route () {
      return this.$route.params.assets
    },

    /**
     * @return {boolean} true if the dialog should be opened
     */
    opened () {
      return this.$store.getters['tabEditor/itemChoiceOpened']
    },

    /**
     * @return {boolean} if assets are loading
     */
    loading () {
      return this.$store.getters['assetsManager/loading']
    },

    /**
     * @return {boolean} the tts plugin
     */
    tts () {
      return this.$store.getters['global/tts']
    },

    /**
     * @return {boolean} true if tts is enabled
     */
    ttsEnabled () {
      return this.$store.getters['global/ttsEnabled']
    },

    /**
     * @return {Object} all assets
     */
    assets () {
      return this.$store.getters['assetsManager/all']
    },

    /**
     * @return {Object} assets that contain the search query
     */
    assetsSorted () {
      return this.$store.getters['assetsManager/all'].filter((elem) => (this.search === '' || elem.name.toUpperCase().includes(this.search.toUpperCase())))
    } // ,
    /**
     * Return true if assets manager opened to select asset, false if its to manage assets
     * Never called
     */
    // selectMode () {
    //   return this.$store.getters['assetsManager/selectMode']
    // }
  },
  watch: {
    assets (to, from) {
      this.assetsEditable = to.map(function (el) {
        var o = Object.assign({}, el)
        o.isSelected = false

        return o
      })
    }
  },

  /**
   * We create a version of the assets with a boolean editable so we can decide which assets to add to a given tab
   * @returns {void}
   */
  mounted () {
    this.$store.dispatch('assetsManager/loadAssets').then(() => {
      this.assetsEditable = this.assets.map(function (el) {
        var o = Object.assign({}, el)
        o.isSelected = false

        return o
      })
    })
  },
  methods: {
    editAsset (asset) {
      this.$store.commit('assetsManager/editAsset', asset)
    },
    saveAsset (name) {
      this.$store.commit('assetsManager/editingAssetSetName', name)
      this.$store.dispatch('assetsManager/saveEditingAsset')
      document.activeElement.blur()
      this.$q.notify({ position: 'top-right', message: this.$t('assetsManager.nameSave') + name, color: 'blue' })
    },
    eraseAsset (asset) {
      this.$store.commit('assetsManager/editAsset', asset)
      this.$store.dispatch('assetsManager/destroyEditingAsset')
    },

    /**
     * Reset assets editable and close dialog
     * @returns {void}
     */
    cancel () {
      this.assetsEditable = this.assetsEditable.map(function (el) {
        var o = Object.assign({}, el)
        o.isSelected = false

        return o
      })
      this.$store.commit('tabEditor/closeItemChoice', {})
    },

    /**
     * Add selected items to the tab
     * @returns {void}
     */
    addSelectedItems () {
      this.assetsToAdd = this.assetsEditable.filter(function (el) { return el.isSelected }).map(function (el) {
        var o = Object.assign({}, el)
        delete o.isSelected

        return o
      })
      this.$store.commit('tabEditor/pushItems', this.assetsToAdd)
      this.cancel()
    },

    /**
     * Call to hide the dialog
     * these two next are important (Quasar's Dialog behavior)
     * @returns {void}
     */
    hide () {
      this.$refs.dialog.hide()
    },
    onDialogHide () {
      // required to be emitted
      // when QDialog emits "hide" event
      this.$store.commit('tabEditor/closeItemChoice', {})
    },
    // onCancel () {
    //   if (!this.selectMode) this.$router.back()
    //   this.$store.commit('assetsManager/close')
    // },
    /**
     * Call to upload a file
     * @returns {void}
     */
    onUploadFile () {
      this.$refs.invisibleFileInput.click()
    },

    /**
     * When a file has been uploaded create the asset
     * @returns {void}
     */
    onInputFile ({ target: { files } }) {
      if (files.length > 0) {
        let file = ''
        const {length} = files
        for (let i = 0; i < files.length; i++) {
          file = files[i]
          this.$store.dispatch('assetsManager/uploadFile', file)
        }
        if (length > 1) {
          this.$q.notify({ position: 'top-right', message: length + this.$t('dnd.filesSaved'), color: 'blue' })
        } else {
          this.$q.notify({ position: 'top-right', message: this.$t('dnd.fileSaved'), color: 'blue' })
        }
      }
    }
  }
}
</script>
