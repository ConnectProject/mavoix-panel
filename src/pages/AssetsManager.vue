<template>
  <q-page
    v-if="!loading"
    class="row content-start"
  >

    <camera ref="camera" />

    <!-- Assets -->
    <q-card
      v-for="(asset, index) in assetsSorted"
      :key="index"
      class="card col-2 q-ma-md"
    >
      <q-img
        v-if="asset.url"
        class="fit rounded-borders"
        ratio="1"
        :src="asset.url"
        contain
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
        v-model="asset.name"
        class="absolute-bottom"
        label="Name"
        style="background-color:rgba(255,255,255,0.7)"
        filled
        @click="editAsset(asset)"
        @keyup.enter="saveAsset(asset.name)"
      >
        <template #append>
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
        ratio="1"
        :src="asset.url"
        basic
      />
      <q-input
        v-model="asset.name"
        class="absolute-bottom"
        label="Name"
        style="background-color:rgba(255,255,255,0.7)"
        filled
        @keyup.enter="addAsset(asset.name,asset.url)"
      >
        <template #append>
          <q-btn
            round
            dense
            color="blue"
            size="m"
            icon="add"
            @click="addAsset(asset.name,asset.url)"
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
        color="primary"
        icon="attach_file"
        @click="$refs.invisibleFileInput.click()"
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
        ref="invisibleFileInput"
        type="file"
        multiple
        @input="onInputFile"
      >
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
            v-model="search"
            outlined
            label="Rechercher"
          >
            <template #append>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-form>
      </q-toolbar>
    </q-page-sticky>
  </q-page>
</template>

<script>
/* eslint-disable max-lines */
// import AssetEdit from '~/components/dialogs/AssetEdit'

import Camera from '~/components/dialogs/Camera'
export default {
  name: 'DialogAssetsManager',
  components: {
    Camera
    // AssetEdit
  },
  data () {
    return {
      search: '',
      lang: 'fr',
      assetsSpecial: [],
      icon: true
    }
  },
  computed: {
    route () {
      return this.$route.params.assets
    },
    images () {
      return this.$store.getters['global/imagesSelected']
    },
    tabs () {
      return this.$store.getters['tabs/tabs']
    },

    /**
     * @returns {boolean} true if the dialog should be opened
     */
    opened () {
      return this.$store.getters['assetsManager/opened']
    },

    /**
     * @returns {boolean} true if assets are loading
     */
    loading () {
      return this.$store.getters['assetsManager/loading']
    },

    /**
     * @returns {object} all assets
     */
    assets () {
      return this.$store.getters['assetsManager/all']
    },
    assetsSorted () {
      return this.$store.getters['assetsManager/all'].filter((elem) => (this.search === '' || elem.name.toUpperCase().includes(this.search.toUpperCase())))
    },

    /**
     * @returns {boolean} true if assets manager opened to select asset, false if its to manage assets
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
  methods: {
    showCam () {
      this.$refs.camera.showCam = true
    },
    activateSearch () {
      // do nothing.
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
     * @returns {void}
     */
    onInputFile ({ target: { files } }) {
      this.$store.dispatch('assetsManager/uploadFiles', files)
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

<style lang="stylus" scoped>
.content-start
  padding-left 0 !important
  padding-top 90px !important // set to avoid that images are hindered by the search form

.image-upload-wrapper
  display hidden

input[type='file']
  position fixed
  left 100%
  top 100%

.rounded-borders
  border-radius 4px !important

.card .erase
  opacity 0
  transition .2s

.card:hover .erase
  opacity 1
</style>
