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
</style>

<template>
  <q-dialog v-if="opened" class="relative-position" :value="opened" maximized persistent>
    <q-card>
      <!-- Top bar -->
      <q-bar class="bg-accent">
        <q-space />
        <q-btn dense flat icon="close" color="white" @click="onCancel">
          <q-tooltip content-class="bg-white text-primary">{{ $t('generic.close') }}</q-tooltip>
        </q-btn>
      </q-bar>

      <div class="row q-col-gutter-none" v-if="!loading">
        <q-card
          v-for="(asset, index) in assets"
          :key="index"
          @click="() => onActionAsset(asset)"
          class="col-2 q-ma-md asset-card">
          <q-img :ratio="16 / 9" :src="asset.get('parseFile')._url" basic>
            <div class="absolute-bottom text-subtitle2 text-center">
              {{ asset.get('name') }}
            </div>
            <div class="absolute fit flex justify-center items-center text-center action-icon-wrapper">
              <q-icon :name="selectMode ? 'done' : 'edit'" class="action-icon" size="xl" />
            </div>
          </q-img>
        </q-card>
      </div>

      <!-- Add asset button -->
      <q-btn
        v-if="!selectMode"
        fab
        icon="add"
        class="absolute-bottom-right q-ma-md"
        color="primary"
        @click="onUploadFile"
      />
    </q-card>

    <!-- Image upload invisible wrapper -->
    <div v-if="!selectMode" class="image-upload-wrapper">
      <input type="file" ref="invisibleFileInput" @input="onInputFile" />
    </div>

    <!-- Asset edit dialog -->
    <asset-edit v-if="!selectMode"/>
  </q-dialog>
</template>

<script>
import AssetEdit from './DialogAssetEdit'

export default {
  name: 'DialogAssetsManager',
  computed: {
    opened () {
      return this.$store.getters['assetsManager/opened']
    },
    loading () {
      return this.$store.getters['assetsManager/loading']
    },
    assets () {
      return this.$store.getters['assetsManager/all']
    },
    selectMode () {
      return this.$store.getters['assetsManager/selectMode']
    }
  },
  methods: {
    onCancel () {
      if (!this.selectMode) this.$router.back()
      this.$store.commit('assetsManager/close')
    },
    onUploadFile () {
      this.$refs['invisibleFileInput'].click()
    },
    onInputFile ({ target: { files } }) {
      if (files.length > 0) {
        const file = files[0]
        this.$store.dispatch('assetsManager/uploadFile', file)
      }
    },
    onActionAsset (asset) {
      if (this.selectMode) {
        this.$store.commit('assetsManager/selectAsset', asset)
      } else {
        this.$store.commit('assetsManager/editAsset', asset)
      }
    }
  },
  components: {
    AssetEdit
  }
}
</script>
