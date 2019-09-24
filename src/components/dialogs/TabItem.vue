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
    <q-card class="column items-center q-pa-md">
      <h6 class="q-mt-md q-mb-xs text-center">
        {{ $t(`tabEditor.itemDialog.heading${mode === 'edit' ? 'Edit' : 'New'}`) }}
      </h6>
      <q-card-section class="column items-start justify-start">
        <!-- Name input -->
        <q-input
          :label="$t('tabEditor.itemDialog.nameLabel')"
          class="q-my-md"
          @input="onSetName"
          :value="item.name"
          filled/>

        <!-- Asset input (flat button or button image) -->
        <q-btn
          v-if="!item.asset"
          :label="$t('tabEditor.itemDialog.selectAssetLabel')"
          color="accent"
          @click="onSetAsset"/>
        <q-img
          v-else
          class="asset-image"
          :src="item.asset.file._url"
          @click="onSetAsset">
          <div class="absolute fit flex justify-center items-center text-center image-wrapper">
            <q-icon name="edit" class="action-icon" size="xl" />
          </div>
        </q-img>
      </q-card-section>

      <!-- Actions buttons -->
      <q-card-actions align="right">
        <q-btn v-if="mode === 'edit'" flat :label="$t('generic.delete')" color="negative" @click="onDelete"/>
        <q-btn flat :label="$t('generic.cancel')" @click="onClose"/>
        <q-btn flat :label="$t('generic.validate')" color="primary" @click="onSubmit"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogTabItem',
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
    onSubmit () {
      switch (this.mode) {
        case 'edit':
          this.$store.commit('tabEditor/updateItem')
          break
        case 'new':
          this.$store.commit('tabEditor/addItem')
          break
      }
      this.onClose()
    },
    onDelete () {
      this.$store.commit('tabEditor/removeItemDialog')
      this.onClose()
    },
    onClose () {
      this.$store.commit('tabEditor/closeItemDialog')
    },
    onSetAsset () {
      this.$store.dispatch('assetsManager/openAndLoad', {
        selectMode: true,
        selectCallback: (asset) => {
          this.$store.commit('tabEditor/setItemDialogAsset', asset)
        }
      })
    },
    onSetName (name) {
      this.$store.commit('tabEditor/setItemDialogName', name)
    }
  }
}
</script>