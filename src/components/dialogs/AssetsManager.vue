<style lang="stylus" scoped>
.container-holder
  padding-left 0px !important
  padding-top 90px !important
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
  <q-page-container v-if="opened && route == 'assets'" class="container-holder relative-position" :value="opened">

    <q-page class="row content-start" v-if="!loading">
        <!-- Assets -->
        <q-card
          v-for="(asset, index) in assetsSorted"
          :key="index"
          class="card col-2 q-ma-md"
        >
          <q-img v-if="asset.file" class="fit rounded-borders" :ratio="16 / 9" :src="asset.file._url" basic>
          </q-img>
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
            :value="asset.name"
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

        <!-- Add asset button -->
        <q-fab
            class="fixed-bottom-right q-ma-md"
            direction="up"
            color="accent"
          >
          <q-fab-action @click="onUploadFile" color="primary" icon="attach_file" />
<!--           <q-fab-action color="primary" icon="cloud" /> -->
          <q-fab-action color="primary" icon="camera_alt" @click="showCam" />
        </q-fab>

        <!-- Image upload invisible wrapper -->
        <div v-if="!selectMode" class="image-upload-wrapper">
          <input
            type="file"
            ref="invisibleFileInput"
            @input="onInputFile"
            multiple
          />
        </div>

        <!-- Asset edit dialog -->
        <asset-edit v-if="!selectMode"/>
        <!-- Search form -->
        <q-page-sticky
          expand
          position="top"
        >
          <q-toolbar class="bg-white">
            <q-form class="row q-ma-md">
              <q-input outlined label="Nom" v-model="search">
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
  data () {
    return {
      search: ''
    }
  },
  components: {
    AssetEdit
  },
  computed: {
    route () {
      return this.$route['params']['assets']
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
     */
    selectMode () {
      return this.$store.getters['assetsManager/selectMode']
    }
  },
  methods: {
    showCam () {
      this.$emit('showCam')
    },
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
        let file = ''
        let length = files.length
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
