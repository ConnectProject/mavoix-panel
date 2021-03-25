<style lang="stylus" scoped>
.content-start
  padding-left 0px !important
  padding-top 90px !important // set to avoid that images are hindered by the search form
.image-upload-wrapper
  display hidden
input[type='file']
  position fixed
  left 100%
  top 100%
.card{
  max-height 120px
}
.rounded-borders{
  border-radius 4px !important
}
.card .erase{
  opacity 0
  transition 0.2s
}
.card:hover .erase{
  opacity 1
}
</style>

<template>
  <q-page
    class="row content-start"
    v-if="!loading"
  >
    <!-- Assets -->
    <q-card
      v-for="(asset, index) in assetsSorted"
      :key="index"
      class="card col-2 q-ma-md"
    >
      <q-img
        v-if="asset.url"
        class="fit rounded-borders"
        :ratio="16 / 9"
        :src="asset.url"
        basic
      />
      <div class="erase absolute-right q-mt-sm q-mr-sm">
        <q-btn
          round
          class="q-mr-xs"
          dense
          color="red"
          size="q-pa-sm"
          icon="delete"
          @click="eraseAsset(asset)"
        >
          <q-tooltip>
            {{ $t('generic.delete') }}
          </q-tooltip>
        </q-btn>
      </div>
      <q-input
        class="absolute-bottom"
        v-model="asset.name"
        label="Name"
        style="background-color:rgba(255,255,255,0.7)"
        filled
        @click="editAsset(asset)"
        @keyup.enter="saveAsset(asset.name)"
      >
        <template v-slot:append>
          <q-btn
            round
            dense
            color="blue"
            size="m"
            icon="save"
            @click="saveAsset(asset.name)"
          >
            <q-tooltip>
              {{ $t('generic.save') }}
            </q-tooltip>
          </q-btn>
        </template>
      </q-input>
    </q-card>
    <q-card
      v-for="(asset, index) in images"
      :key="'x_' + index"
      class="card col-2 q-ma-md"
    >
      <q-img
        v-if="asset.url"
        class="fit rounded-borders"
        :ratio="16 / 9"
        :src="asset.url"
        basic
      >
        </q-img>
        <q-input
          class="absolute-bottom"
          v-model="asset.names[lang]"
          label="Name"
          style="background-color:rgba(255,255,255,0.7)"
          filled
          @keyup.enter="addAsset(asset.names[lang],asset.url)"
        >
          <template v-slot:append>
            <q-btn
              round
              dense
              color="blue"
              size="m"
              icon="add"
              @click="addAsset(asset.names[lang],asset.url)"
            >
              <q-tooltip>
                {{ $t('generic.add') }}
              </q-tooltip>
            </q-btn>
          </template>
        </q-input>
      </q-card>

      <!-- Add asset button -->
      <q-fab
          class="fixed-bottom-right q-ma-md"
          direction="up"
          color="accent"
        >
      <q-fab-action
        color="primary"
        icon="search"
        @click="activateSearch"
      />
      <q-fab-action
        @click="$refs.invisibleFileInput.click()"
        color="primary"
        icon="attach_file"
      />
<!--           <q-fab-action color="primary" icon="cloud" /> -->
      <q-fab-action
        color="primary"
        icon="camera_alt"
        @click="showCam"
      />
      </q-fab>

      <!-- Image upload invisible wrapper -->
    <div
      v-if="!selectMode"
      class="image-upload-wrapper"
    >
      <input
        type="file"
        ref="invisibleFileInput"
        @input="onInputFile"
        multiple
      />
    </div>

    <!-- Asset edit dialog -->
    <!-- <asset-edit v-if="!selectMode" /> -->
    <!-- Search form -->
    <q-page-sticky
      expand
      position="top"
    >
      <q-toolbar class="bg-white">
        <q-form class="row q-ma-md">
        <q-input
          outlined
          label="Rechercher"
          v-model="search"
        >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-page-sticky>

  </q-page>
</template>

<script>
// import AssetEdit from '~/components/dialogs/AssetEdit'
export default {
  name: 'DialogAssetsManager',
  data () {
    return {
      search: '',
      lang: 'fr',
      assetsSpecial: []
    }
  },
  // components: {
  //   AssetEdit
  // },
  mounted () {
    this.$store.dispatch('tabs/loadTabs', this.$store.state.users.user.id)
    this.search = ''
    let lang = 'fr'
    if (this.tabs[0]?.attributes?.language) {
      lang = this.tabs[0].attributes.language.substring(0, 2)
    }
    this.lang = lang
    this.$store.dispatch('assetsManager/loadAssets')
    console.log('mounted')
  },
  computed: {
    route () {
      return this.$route['params']['assets']
    },
    images () {
      return this.$store.getters['global/imagesSelected']
    },
    tabs () {
      return this.$store.getters['tabs/tabs']
    },
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
    assetsSorted () {
      return this.$store.getters['assetsManager/all'].filter((elem) => { return (this.search === '' || elem.name.toUpperCase().includes(this.search.toUpperCase())) })
    },
    /**
     * Return true if assets manager opened to select asset, false if its to manage assets
     * (not sure if assets manager can still be used to selectMode)
     */
    selectMode () {
      return this.$store.getters['assetsManager/selectMode']
    },
    error () {
      return this.$store.getters['assetsManager/error']
    }
  },
  watch: {
    tabs (to, from) {
      let lang = 'fr'
      if (this.tabs[0]?.attributes?.language) {
        lang = this.tabs[0].attributes.language.substring(0, 2)
      }
      this.lang = lang
    },
    search (to, from) {
      console.log(this.lang)
      this.$store.commit('global/setImages', { 'text': to, 'language': this.lang })
    },
    error (newVal) {
      if (newVal) {
        this.$q.notify({ position: 'top-right', message: newVal, color: 'red' })
        this.$store.commit('assetsManager/resetError')
      }
    }
  },
  methods: {
    showCam () {
      this.$root.$emit('showCam')
    },
    activateSearch () {

    },
    editAsset (asset) {
      this.$store.commit('assetsManager/editAsset', asset)
    },
    saveAsset (name) {
      console.log(name)
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
     * Call to cancel
     * Never called
     */
    // onCancel () {
    //   if (!this.selectMode) this.$router.back()
    //   this.$store.commit('assetsManager/close')
    // },
    addAsset (name, url) {
      this.$store.dispatch('assetsManager/addAsset', { 'name': name, 'url': url })
      this.search = ''
      this.$q.notify({ position: 'top-right', message: this.$t('dnd.fileSaved'), color: 'blue' })
    },
    /**
     * When a file has been uploaded create the asset
     */
    onInputFile ({ target: { files } }) {
      if (files.length > 0) {
        let length = files.length
        let promises = Array.from(files).map((file) =>
          this.$store.dispatch('assetsManager/uploadFile', file))
        Promise.all(promises).then(res => {
          if (length > 1) {
            this.$q.notify({ position: 'top-right', message: length + this.$t('dnd.filesSaved'), color: 'blue' })
          } else {
            this.$q.notify({ position: 'top-right', message: this.$t('dnd.fileSaved'), color: 'blue' })
          }
        }).catch(() =>
          console.error('Failed to upload files')
        )
      }
    }
    /**
     * When clicking on the asset select it or edit it
     */
    // onActionAsset (asset) {
    //   if (this.selectMode) {
    //     this.$store.commit('assetsManager/selectAsset', asset)
    //   } else {
    //     this.$store.commit('assetsManager/editAsset', asset)
    //   }
    // }
  }
}
</script>
