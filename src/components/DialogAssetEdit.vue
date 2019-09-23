<template>
  <q-dialog :value="opened" persistent>
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
        
        <tags-input
          class="q-my-xs"
          v-model="tag"
          :tags="tags"
          @tags-changed="newTags => tags = newTags"
        />
      </q-card-section>
      <q-card-actions>
        <q-btn flat color="negative" @click="onDelete">{{ $t('generic.delete') }}</q-btn>
        <q-btn flat @click="onCancel">{{ $t('generic.cancel') }}</q-btn>
        <q-btn flat color="primary" @click="onSave">{{ $t('generic.save') }}</q-btn>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogAssetEdit',
  data () {
    return {
      tag: '',
      tags: []
    }
  },
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
