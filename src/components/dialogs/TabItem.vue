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
          :value="item.name"
          filled
          @input="onSetName"
        >
          <template #after>
            <q-btn
              color="accent"
              round
              dense
              flat
              icon="play_arrow"
              :disable="ttsEnabled == false"
              @click="tts.speak({ text: item.name })"
            />
          </template>
        </q-input>

        <!-- Asset input (flat button or button image) -->
        <!-- Not clear when the item is not an asset -->
        <!-- (maybe it is never the case, was the case before when we could use this to add a new image) -->
        <!-- <q-btn
          v-if="!item.asset"
          :label="$t('tabEditor.itemDialog.selectAssetLabel')"
          color="accent"
          @click="onSetAsset"
        /> -->
        <!-- v-else -->
        <!-- @click="onSetAsset" -->
        <q-img
          v-if="item.asset"
          class="asset-image"
          :src="item.asset.url"
        >
          <!-- <div class="absolute fit flex justify-center items-center text-center image-wrapper">
            <q-icon
              name="edit"
              class="action-icon"
              size="xl"
            />
          </div> -->
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
     * @returns {boolean} true if the dialog should be opened
     */
    opened () {
      return this.$store.getters['tabEditor/itemDialogOpened']
    },

    /**
     * @returns {boolean} the item
     */
    item () {
      return this.$store.getters['tabEditor/itemDialog']
    },

    /**
     * @returns {string} the mode (new or edit)
     */
    mode () {
      return this.$store.getters['tabEditor/itemDialogMode']
    },

    /**
     * @returns {Object} the tts plugin
     */
    tts () {
      return this.$store.getters['global/tts']
    },

    /**
     * @returns {boolean} true if tts is enabled
     */
    ttsEnabled () {
      return this.$store.getters['global/ttsEnabled']
    }
  },
  watch: {

    /**
     * init tts when opening dialog
     * @returns {void}
     */
    opened () {
      this.$store.dispatch('global/initTTS')
    }
  },
  methods: {

    /**
     * Call on submit to update or add the item to the tab
     * Then close the dialog
     * @returns {void}
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
     * @returns {void}
     */
    onDelete () {
      this.$store.commit('tabEditor/removeItemDialog')
      this.onClose()
    },

    /**
     * Call to close the dialog
     * @returns {void}
     */
    onClose () {
      this.$store.commit('tabEditor/closeItemDialog')
    },

    /**
     * Call to open the asset manager to select an asset for the item
     * Called when we click on the pencil when the image is opened, but no longer do anything
     * @returns {void}
     */
    // onSetAsset () {
    //   this.$store.dispatch('assetsManager/openAndLoad', {
    //     selectMode: true,
    //     selectCallback: (asset) => {
    //       this.$store.commit('tabEditor/setItemDialogAsset', asset)
    //     }
    //   })
    // },

    /**
     * Call to set the item's name
     * @param {string} name new name
     * @returns {void}
     */
    onSetName (name) {
      this.$store.commit('tabEditor/setItemDialogName', name)
    }
  }
}
</script>

<style lang="stylus" scoped>
// .image-wrapper
//   opacity 0
//   transition .2s linear

// .image-wrapper:hover
//   opacity 1

// .asset-image
//   opacity 1
//   cursor pointer
//   transition .2s linear

// .asset-image:hover
//   opacity .4

// .action-icon
//   font-size 2em
</style>
