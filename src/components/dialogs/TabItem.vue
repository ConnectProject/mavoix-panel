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
  <q-dialog
    :value="opened"
    persistent
  >
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
          filled
        >
          <template v-slot:after>
            <q-btn
              color="accent"
              round
              dense
              flat
              icon="play_arrow"
              @click="tts.speak({ text: item.name })"
              :disable="ttsEnabled == false"
            />
          </template>
        </q-input>

        <!-- Asset input (flat button or button image) -->
        <!-- Not clear when the item is not an asset (maybe it is never the case) -->
        <q-btn
          v-if="!item.asset"
          :label="$t('tabEditor.itemDialog.selectAssetLabel')"
          color="accent"
          @click="onSetAsset"
        />
        <q-img
          v-else
          class="asset-image"
          :src="item.asset.url"
          @click="onSetAsset"
        >
          <div class="absolute fit flex justify-center items-center text-center image-wrapper">
            <q-icon
              name="edit"
              class="action-icon"
              size="xl"
            />
          </div>
        </q-img>
      </q-card-section>

      <q-card-actions align="right">
        <!-- Delete the item, only printed in edit mode -->
        <q-btn
          v-if="mode === 'edit'"
          flat
          :label="$t('generic.delete')"
          color="negative"
          @click="onDelete"
        />

        <!-- Cancel modifications -->
        <q-btn
          flat
          :label="$t('generic.cancel')"
          @click="onClose"
        />

        <!-- Save modifications -->
        <q-btn
          flat
          :label="$t('generic.validate')"
          color="primary"
          @click="onSubmit"
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>
export default {
  name: 'DialogTabItem',
  computed: {
    /**
     * Return true if the dialog should be opened
     */
    opened () {
      return this.$store.getters['tabEditor/itemDialogOpened']
    },
    /**
     * Return the item
     */
    item () {
      return this.$store.getters['tabEditor/itemDialog']
    },
    /**
     * Return the mode (new or edit)
     */
    mode () {
      return this.$store.getters['tabEditor/itemDialogMode']
    },
    /**
     * Return the tts plugin
     */
    tts () {
      return this.$store.getters['global/tts']
    },
    /**
     * Return true if tts is enabled
     */
    ttsEnabled () {
      return this.$store.getters['global/ttsEnabled']
    }
  },
  watch: {
    /**
     * init tts when opening dialog
     */
    opened (newValue, oldValue) {
      this.$store.dispatch('global/initTTS')
    }
  },
  methods: {
    /**
     * Call on submit to update or add the item to the tab
     * Then close the dialog
     */
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
    /**
     * Call to delete the item
     */
    onDelete () {
      this.$store.commit('tabEditor/removeItemDialog')
      this.onClose()
    },
    /**
     * Call to close the dialog
     */
    onClose () {
      this.$store.commit('tabEditor/closeItemDialog')
    },
    /**
     * Call to open the asset manager to select an asset for the item
     */
    onSetAsset () {
      this.$store.dispatch('assetsManager/openAndLoad', {
        selectMode: true,
        selectCallback: (asset) => {
          this.$store.commit('tabEditor/setItemDialogAsset', asset)
        }
      })
    },
    /**
     * Call to set the item's name
     */
    onSetName (name) {
      this.$store.commit('tabEditor/setItemDialogName', name)
    }
  }
}
</script>
