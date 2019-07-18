<template>
  <q-dialog :value="opened" persistent>
    <q-card>
      <q-card-section>
        <q-input filled label="Nom de l'asset" :value="asset.name" @input="onInputName"/>
      </q-card-section>
      <q-card-actions>
        <q-btn flat color="negative" @click="onDelete">Supprimer</q-btn>
        <q-btn flat @click="onCancel">Annuler</q-btn>
        <q-btn flat color="primary" @click="onSave">Sauvegarder</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogAssetEdit',
  computed: {
    asset () {
      return this.$store.getters['assetsManager/editingAsset']
    },
    opened () {
      return this.$store.getters['assetsManager/editing']
    }
  },
  methods: {
    onInputName (name) {
      this.$store.commit('assetsManager/editingAssetSetName', name)
    },
    onDelete () {
      this.$store.dispatch('assetsManager/destroyEditingAsset')
    },
    onCancel () {
      this.$store.commit('assetsManager/cancelEdit')
    },
    onSave () {
      this.$store.dispatch('assetsManager/saveEditingAsset')
    }
  }
}
</script>
