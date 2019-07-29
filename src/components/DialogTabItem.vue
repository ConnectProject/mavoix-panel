<style lang="stylus" scoped>
.image-wrapper
  opacity 0
  transition .2s linear
.image-wrapper:hover
  opacity 1
.asset-image
  opacity 1
  cursor pointer
  transition .2s linear
.asset-image:hover
  opacity .4
.action-icon
  font-size 2em
</style>

<template>
  <q-dialog :value="opened" persistent>
    <q-card class="column items-center">
      <h6 class="q-my-md q-mt-xl text-center">
        {{ $t(`tabEditor.itemDialog.heading${mode === 'edit' ? 'Edit' : 'New'}`) }}
      </h6>
      <q-card-section class="column items-start justify-start">
        <q-input
          :label="$t('tabEditor.itemDialog.nameLabel')"
          class="q-my-md"
          @input="setName"
          :value="item.name"
          filled/>

        <q-btn
          v-if="!item.asset"
          :label="$t('tabEditor.itemDialog.selectAssetLabel')"
          color="accent"
          @click="selectAsset"/>
        <q-img
          v-else
          class="asset-image"
          :src="item.asset.get('parseFile')._url"
          @click="selectAsset">
          <div class="absolute fit flex justify-center items-center text-center image-wrapper">
            <q-icon name="edit" class="action-icon" size="xl" />
          </div>
        </q-img>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn v-if="mode === 'edit'" flat :label="$t('generic.delete')" color="negative"/>
        <q-btn flat :label="$t('generic.cancel')" @click="onCloseDialog"/>
        <q-btn flat :label="$t('generic.save')" color="primary" @click="saveItem"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogTabName',
  computed: {
    opened () {
      return this.$store.getters['tabEditor/itemDialogOpened']
    },
    item () {
      return this.$store.getters['tabEditor/itemDialog']
    },
    mode () {
      return this.$store.getters['tabEditor/itemDialogMode']
    }
  },
  methods: {
    onCloseDialog () {
      return this.$store.commit('tabEditor/closeItemDialog')
    },
    saveItem () {
      if (this.mode === 'edit') {
        this.$store.dispatch('tabEditor/saveItem')
      } else {
        this.$store.dispatch('tabEditor/saveNewItem')
      }
    },
    selectAsset () {
      this.$store.dispatch('assetsManager/openAndLoad', {
        selectMode: true,
        selectCallback: (asset) => {
          this.$store.commit('tabEditor/setItemDialogAsset', asset)
        }
      })
    },
    setName (name) {
      this.$store.commit('tabEditor/setItemDialogName', name)
    }
  }
}
</script>
