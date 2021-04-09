// No longer used, was used before when AssetsManger was a dialog
<template>
  <q-dialog
    :value="opened"
    persistent
  >
    <q-card>
      <q-card-section>
        <!-- Name input -->
        <q-input
          class="q-my-xs"
          :label="$t('assetsManager.assetNameLabel')"
          :value="asset.name"
          filled
          @keyup.enter="onSave"
          @input="onInputName"
        />
      </q-card-section>
      <q-card-actions>
        <!-- Delete tab -->
        <q-btn
          flat
          color="negative"
          @click="onDelete"
        >
          {{ $t('generic.delete') }}
        </q-btn>

        <!-- Cancel modifications -->
        <q-btn
          flat
          @click="onCancel"
        >
          {{ $t('generic.cancel') }}
        </q-btn>

        <!-- Save modifications -->
        <q-btn
          flat
          color="primary"
          @click="onSave"
        >
          {{ $t('generic.save') }}
        </q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogAssetEdit',
  computed: {

    /**
     * @returns {boolean} true if the dialog should be opened
     */
    opened () {
      return this.$store.getters['assetsManager/editing']
    },

    /**
     * @returns {Object} the asset
     */
    asset () {
      return this.$store.getters['assetsManager/editingAsset']
    }
  },
  methods: {

    /**
     * Call so set asset's name
     * @param {string} name new name
     * @returns {void}
     */
    onInputName (name) {
      this.$store.commit('assetsManager/editingAssetSetName', name)
    },

    /**
     * Call to delete the asset
     * @returns {void}
     */
    onDelete () {
      this.$store.dispatch('assetsManager/destroyEditingAsset')
    },

    /**
     * Call to cancel modifications or creation
     * @returns {void}
     */
    onCancel () {
      this.$store.commit('assetsManager/cancelEdit')
    },

    /**
     * Call to save the asset
     * @returns {void}
     */
    onSave () {
      this.$store.dispatch('assetsManager/saveEditingAsset')
    }
  }
}
</script>
