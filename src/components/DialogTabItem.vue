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
          :src="item.asset.file._url"
          @click="selectAsset">
          <div class="absolute fit flex justify-center items-center text-center image-wrapper">
            <q-icon name="edit" class="action-icon" size="xl" />
          </div>
        </q-img>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn v-if="mode === 'edit'" flat :label="$t('generic.delete')" color="negative" @click="onDelete"/>
        <q-btn flat :label="$t('generic.cancel')" @click="onCloseDialog"/>
        <q-btn flat :label="$t('generic.validate')" color="primary" @click="onValidate"/>
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
    onValidate () {
      const data = {
        name: this.item.name,
        asset: this.item.asset
      }

      if (this.mode === 'edit') {
        this.$store.commit('tabEditor/updateItem', {
          id: this.item.id,
          data
        })
      } else {
        this.$store.commit('tabEditor/createItem')
      }
      this.close()
    },
    close () {
      this.$store.commit('tabEditor/closeItemDialog')
    },
    onDelete () {
      this.$store.commit('tabEditor/removeItem', this.item.id)
      this.close()
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
