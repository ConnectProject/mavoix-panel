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
          v-if="!item.assetModel"
          :label="$t('tabEditor.itemDialog.selectAssetLabel')"
          color="accent"
          @click="selectAsset"/>
        <q-img
          v-else
          :src="item.assetModel.get('parseFile')._url"/>
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
      return this.$store.dispatch('tabEditor/saveNewItem')
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
