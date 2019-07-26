<template>
  <q-dialog :value="opened" persistent>
    <q-card>
      <h6 class="q-my-md q-mt-xl text-center">{{ $t('tabEditor.newItemDialog.heading') }}</h6>
      <q-card-section class="column items-start justify-start">
        <q-input
          :label="$t('tabEditor.newItemDialog.nameLabel')"
          class="q-my-md"
          @input="setName"
          :value="newItem.name"
          filled/>

        <q-btn
          v-if="!newItem.assetModel"
          :label="$t('tabEditor.newItemDialog.selectAssetLabel')"
          color="accent"
          @click="selectAsset"/>
        <q-img
          v-else
          :src="newItem.assetModel.get('parseFile')._url"/>
      </q-card-section>
      <q-card-actions align="right">
        <q-btn flat label="Annuler" color="negative" @click="onCloseDialog"/>
        <q-btn flat label="Sauvegarder" color="primary" @click="saveItem"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogTabName',
  computed: {
    opened () {
      return this.$store.getters['tabEditor/isDialogOpened']
    },
    newItem () {
      return this.$store.getters['tabEditor/newItem']
    }
  },
  methods: {
    onCloseDialog () {
      return this.$store.commit('tabEditor/closeNewItemDialog')
    },
    saveItem () {
      return this.$store.dispatch('tabEditor/saveNewItem')
    },
    selectAsset () {
      this.$store.dispatch('assetsManager/openAndLoad', {
        selectMode: true,
        selectCallback: (asset) => {
          this.$store.commit('tabEditor/setNewItemAsset', asset)
        }
      })
    },
    setName (name) {
      this.$store.commit('tabEditor/setNewItemName', name)
    }
  }
}
</script>
