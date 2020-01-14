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
          @keyup.enter="onSave"
          @input="onInputName"
          filled
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
     * Return true if the dialog should be opened
     */
    opened () {
      return this.$store.getters['assetsManager/editing']
    },
    /**
     * Return the asset
     */
    asset () {
      return this.$store.getters['assetsManager/editingAsset']
    }
  },
  methods: {
    /**
     * Call so set asset's name
     */
    onInputName (name) {
      this.$store.commit('assetsManager/editingAssetSetName', name)
    },
    /**
     * Call to delete the asset
     */
    onDelete () {
      this.$store.dispatch('assetsManager/destroyEditingAsset')
    },
    /**
     * Call to cancel modifications or creation
     */
    onCancel () {
      this.$store.commit('assetsManager/cancelEdit')
    },
    /**
     * Call to save the asset
     */
    onSave () {
      this.$store.dispatch('assetsManager/saveEditingAsset')
    }
  }
}
</script>
