<!-- eslint-disable max-lines -->
<template>
  <!-- Print nothing if loading -->
  <div v-if="loading" />

  <q-page
    v-else
    class="flex items-stretch q-pa-xl holder-container"
    :style="`background: ${tab.hexColor}`"
  >
    <div class="full-width">
      <!--       <div class="col-2 row justify-center items-center">

      </div> -->
      <!-- Items container -->

      <draggable
        v-model="items"
        tag="div"
        draggable=".item"
        ghost-class="ghost"
        class="full-height full-width row items-start q-gutter-x-md q-gutter-y-md items-container"
      >
        <!-- Items -->
        <q-card
          v-for="(item, index) in items"
          :key="index"
          :class="['item', imageSizeClass]"
          :v-if="!item.deleted"
        >
          <!-- Item's image -->
          <q-img
            :ratio="1"
            class="item-img"
            :src="item.asset.url"
            contain
          >
            <div class="absolute-top row justify-between q-pa-sm image-card-actions">
              <q-btn
                round
                dense
                flat
                icon="play_arrow"
                color="primary"
                class="image-action-btn"
                :disable="$store.getters['global/ttsEnabled'] === false"
                @click.stop="$store.getters['global/tts'].speak({ text: item.name })"
              />
              <q-btn
                round
                dense
                flat
                icon="settings"
                color="primary"
                class="image-action-btn"
              >
                <q-menu
                  anchor="bottom right"
                  self="top right"
                >
                  <q-list
                    class="item-settings-menu"
                    style="min-width: 220px"
                  >
                    <q-item
                      clickable
                      @click="openRenameDialog(item, index)"
                    >
                      <q-item-section
                        avatar
                        class="item-settings-menu__avatar"
                      >
                        <q-icon name="edit" />
                      </q-item-section>
                      <q-item-section>
                        {{ $t('assetEditor.rename') }}
                      </q-item-section>
                    </q-item>
                    <q-item
                      v-close-popup
                      clickable
                      @click="openDeleteDialog(index)"
                    >
                      <q-item-section
                        avatar
                        class="item-settings-menu__avatar"
                      >
                        <q-icon name="delete" />
                      </q-item-section>
                      <q-item-section>
                        {{ $t('assetEditor.delete') }}
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section
                        avatar
                        class="item-settings-menu__avatar"
                      >
                        <q-checkbox
                          dense
                          :value="!item.available"
                          @input="() => $store.commit('tabEditor/toggleItemAvailable', item)"
                        />
                      </q-item-section>
                      <q-item-section>
                        {{ $t('generic.unavailable') }}
                      </q-item-section>
                    </q-item>
                    <q-item>
                      <q-item-section
                        avatar
                        class="item-settings-menu__avatar"
                      >
                        <q-checkbox
                          dense
                          :value="item.hidden"
                          @input="() => $store.commit('tabEditor/toggleItemHidden', item)"
                        />
                      </q-item-section>
                      <q-item-section>
                        {{ $t('generic.invisible') }}
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </div>
            <div
              v-if="item.hidden"
              class="absolute-full image-overlay image-overlay--hidden"
            >
              <q-icon
                name="visibility_off"
                class="overlay-icon"
              />
            </div>
            <div
              v-else-if="!item.available"
              class="absolute-full image-overlay image-overlay--unavailable"
            >
              <q-icon
                name="close"
                class="overlay-icon overlay-icon--cross"
              />
            </div>
          </q-img>
          <div class="item-name-bar">
            <q-input
              v-if="inlineRenameIndex === index"
              v-model="inlineRenameDraft"
              dense
              borderless
              class="item-name-input text-subtitle2"
              @keyup.enter="saveInlineRename(item)"
              @blur="saveInlineRename(item)"
            />
            <div
              v-else
              class="text-center text-subtitle2 item-name-text"
              @click="startInlineRename(item, index)"
            >
              {{ item.name }}
            </div>
          </div>
        </q-card>
      </draggable>
    </div>
    <dialog-tab-item />
    <dialog-item-choice ref="itemChoice" />
    <dialog-asset-delete
      :value="assetDeleteDialogOpen"
      @input="assetDeleteDialogOpen = $event"
      @confirm="onConfirmDeleteItem"
    />

    <q-page-sticky
      expand
      position="top"
    >
      <q-toolbar
        class="row items-center toolbar-no-border toolbar-with-padding"
        :style="{ background: tab.hexColor }"
      >
        <!-- Add item button -->
        <q-btn
          class="q-ml-md add-images-btn"
          no-caps
          icon-right="add_to_photos"
          unelevated
          :label="$t('tabEditor.addItemLabel')"
          text-color="black"
          @click="onAddItem"
        />
        <q-space />

        <!-- RIGHT: Settings (circular, white bg, blue icon) -->
        <q-btn
          class="settings-btn"
          unelevated
          round
          icon="settings"
          text-color="primary"
          @click="openTabSettings"
        />
        <!-- edit language button -->
      </q-toolbar>
    </q-page-sticky>

    <dialog-tab-settings
      :value="$store.getters['tabEditor/tabSettingsDialogOpened']"
      :mode="'edit'"
      :tab="tab"
      @input="v => !v && closeTabSettings()"
    />

    <!-- Delete, Save buttons -->
    <q-page-sticky
      position="bottom-right"
      :offset="[18, 18]"
    >
      <q-btn
        class="q-mx-xs"
        fab
        icon="delete"
        color="negative"
        @click="deletion = true"
      >
        <q-tooltip>
          {{ $t('generic.delete') }}
        </q-tooltip>
      </q-btn>
      <q-btn
        class="q-mx-xs"
        fab
        icon="save"
        size="xl"
        color="primary"
        @click="onSave"
      >
        <q-tooltip>
          {{ $t('generic.save') }}
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
    <q-dialog v-model="deletion">
      <q-card>
        <q-card-section>
          <div class="text-h6">
            Supprimer l'onglet
          </div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          êtes-vous sûr de vouloir supprimer l'onglet ?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            flat
            label="Oui"
            color="primary"
            @click="onDelete"
          />
          <q-btn
            flat
            label="Non"
            color="primary"
            @click="deletion = false"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>

    <q-dialog v-model="renameDialogOpen">
      <q-card style="min-width: 320px">
        <q-card-section>
          <div class="text-h6">
            Renommer l'image
          </div>
        </q-card-section>
        <q-card-section>
          <q-input
            v-model="renameDialogDraft"
            dense
            autofocus
            @keyup.enter="saveDialogRename"
          />
        </q-card-section>
        <q-card-actions align="right">
          <q-btn
            flat
            :label="$t('generic.cancel')"
            color="primary"
            @click="renameDialogOpen = false"
          />
          <q-btn
            flat
            :label="$t('generic.save')"
            color="primary"
            @click="saveDialogRename"
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
/* eslint-disable max-lines */
import { SLUG_KEY } from '../models/Tab'

import DialogAssetDelete from '~/components/dialogs/AssetDelete'
import DialogItemChoice from '~/components/dialogs/ItemChoice'
import DialogTabItem from '~/components/dialogs/TabItem'
import DialogTabSettings from '~/components/dialogs/TabSettings'
import { navigateAfterTabDeleted } from '~/utils/mavoixNavigation'

export default {
  name: 'PageTabEditor',
  components: {
    DialogTabItem,
    DialogItemChoice,
    DialogTabSettings,
    DialogAssetDelete
  },
  data () {
    return {
      assetDeleteDialogOpen: false,
      assetDeleteTargetIndex: null,
      skipAssetDeleteConfirm: false,
      deletion: false,
      tabSettingsDialogOpened: false,
      mode: 'create',
      inlineRenameIndex: null,
      inlineRenameDraft: '',
      renameDialogOpen: false,
      renameDialogDraft: '',
      renameDialogTarget: null
    }
  },
  computed: {

    /**
     * @returns {Object} the opened tab
     */
    tab () {
      return this.$store.getters['tabEditor/tab']
    },
    speed () {
      return this.$store.getters['tabEditor/speed']
    },
    language () {
      return this.$store.getters['tabEditor/language']
    },

    /**
     * @returns {Object} possible languages
     */
    speeds () {
      return this.$store.getters['tabEditor/speeds']
    },
    options () {
      return this.$store.getters['tabEditor/languages']
    },
    imageSizeClass () {
      const imageSize = this.$store.getters['global/imageSize']
      if (imageSize === 'small') return 'item-size--small'
      if (imageSize === 'large') return 'item-size--large'

      return 'item-size--medium'
    },

    /**
     * The tab's items
     */
    items: {
      get () {
        const items = this.$store.getters['tabEditor/items']
        // let css = ''
        // let that = this
        // here we check if we have loaded the images in css background, we do this for the sake performance and to avoid visual glitch in the implementation of vue-draggable
        // if (that.numberLoaded <= items.length) {
        //   for (let i = 0; i < items.length; i++) {
        //     if (items[i].asset && !this.itemsLoaded.includes(items[i].asset.id)) {
        //       that.itemsLoaded.push(items[i].asset.id)
        //       this.getBase64Image(items[i].asset.file._url, function (base64image) {
        //         let newClass = ' .class-' + items[i].asset.id + '{ background-image: url("' + base64image + '") !important}'
        //         css = css + newClass
        //         if (that.numberLoaded === items.length) {
        //           let styleTag = document.createElement('style')
        //           styleTag.appendChild(document.createTextNode(css))
        //           document.head.appendChild(styleTag)
        //         }
        //       })
        //     }
        //   }
        // }

        return items
      },
      set (values) {
        this.$store.commit('tabEditor/setItemsRaw', values)
      }
    },

    /**
     * @returns {boolean} true if loading
     */
    loading () {
      return this.$store.getters['tabEditor/loading']
    }
  },
  watch: {

    /**
     * When route change load eveyrhing
     * @returns {void}
     */
    '$route' () {
      this.load()
      this.$store.dispatch('global/initTTS')
    },
    '$store.state.tabEditor.error' (err) {
      if (err) {
        this.$q.notify({
          position: 'top-right',
          message: err.message || String(err),
          color: 'red'
        })
      }
    }
  },

  /**
   * When component mounted load everything
   * @returns {void}
   */
  mounted () {
    this.skipAssetDeleteConfirm = window.localStorage.getItem('tabEditor.skipAssetDeleteConfirm') === '1'
    this.load()
  },
  methods: {

    // eslint-disable-next-line valid-jsdoc
    /**
     * convert url to base64 data to avoid reloading files
     * no longer used
     * @returns {void}
     */
    getBase64Image (imgUrl, callback) {
      const img = new Image()
      // onload fires when the image is fully loadded, and has width and height
      const that = this
      img.onload = function () {
        const canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        const ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        const dataURL = canvas.toDataURL('image/png')
        // dataURL = dataURL.replace(/^data:image\/(png|jpg);base64,/, '')
        that.numberLoaded += 1
        callback(dataURL) // the base64 string
      }
      // set attributes and src
      img.setAttribute('crossOrigin', 'anonymous')
      img.src = imgUrl
    },

    /**
     * Load tab
     * @returns {void}
     */
    load () {
      this.$store.dispatch('tabEditor/loadBySlug', this.$route.params.slug)
      // this.$nextTick()
    },

    /**
     * Call to save the tab
     * @returns {void}
     */
    onSave () {
      this.$store.dispatch('tabEditor/saveCb', (tab) => {
        if (!tab) {
          return
        }

        // When the tab's name is changed the slugs change to, so redirect to the new url
        const path = `/tabs/${tab.get(SLUG_KEY)}`
        if (this.$route.path !== path) this.$router.push(path)

        // Toast message
        this.$q.notify({
          message: `${tab.get('name')} saved`,
          color: 'purple'
        })
      })
    },

    /**
     * Call to remove tab
     * @returns {void}
     */
    async onDelete () {
      await this.$store.dispatch('tabEditor/deleteTab')
      this.deletion = false
      navigateAfterTabDeleted(this.$router, this.$store)
    },

    /**
     * Set the tab's name
     * @param {string} name tab's name
     * @returns {void}
     */
    setName (name) {
      this.$store.commit('tabEditor/setName', name)
    },

    /**
     * Set the tab's color
     * @param {string} hexColor hex value of the color
     * @returns {void}
     */
    setHexColor (hexColor) {
      this.$store.commit('tabEditor/setHexColor', hexColor)
    },
    setLanguage (language) {
      this.$store.commit('tabEditor/setLanguage', this.options.indexOf(language))
    },
    setSpeed (speed) {
      this.$store.commit('tabEditor/setSpeed', this.speeds.indexOf(speed))
    },

    /**
     * Call to open the item dialog in new item mode
     * @returns {void}
     */
    onAddItem () {
      this.$refs.itemChoice.opened = true
      // this.$store.commit('tabEditor/openItemDialog', {})
      // this.$store.commit('tabEditor/openItemChoice', {})
      // this.$store.dispatch('global/initTTS')
    },

    // eslint-disable-next-line valid-jsdoc
    /**
     * Call to open the item dialog in edit item mode
     * @returns {void}
     */
    onEditItem (item, index) {
      this.$store.commit('tabEditor/openItemDialog', {
        mode: 'edit',
        index,
        data: Object.assign({}, item)
      })
    },

    /**
     * Undo
     * @returns {void}
     */
    onUndo () {
      this.$store.commit('tabEditor/undo')
    },

    /**
     * Redo
     * @returns {void}
     */
    onRedo () {
      this.$store.commit('tabEditor/redo')
    },

    openTabSettings () {
      this.$store.commit('tabEditor/openTabSettings')
    },

    closeTabSettings () {
      this.$store.commit('tabEditor/closeTabSettings')
    },

    startInlineRename (item, index) {
      this.inlineRenameIndex = index
      this.inlineRenameDraft = item.name || ''
    },

    saveInlineRename (item) {
      const nextName = (this.inlineRenameDraft || '').trim()
      if (nextName) item.name = nextName
      this.inlineRenameIndex = null
      this.inlineRenameDraft = ''
    },

    openRenameDialog (item, index) {
      this.renameDialogTarget = { item, index }
      this.renameDialogDraft = item.name || ''
      this.renameDialogOpen = true
    },

    openDeleteDialog (index) {
      if (this.skipAssetDeleteConfirm) {
        this.deleteItem(index)

        return
      }

      this.assetDeleteTargetIndex = index
      this.assetDeleteDialogOpen = true
    },

    onConfirmDeleteItem ({ dontAskAgain } = {}) {
      if (dontAskAgain) {
        this.skipAssetDeleteConfirm = true
        window.localStorage.setItem('tabEditor.skipAssetDeleteConfirm', '1')
      }

      this.deleteItem(this.assetDeleteTargetIndex)
      this.assetDeleteTargetIndex = null
    },

    deleteItem (index) {
      if (index === null || typeof index === 'undefined') {
        return
      }
      this.$store.commit('tabEditor/removeItemAtIndex', index)
    },

    saveDialogRename () {
      const nextName = (this.renameDialogDraft || '').trim()
      if (nextName && this.renameDialogTarget && this.renameDialogTarget.item) {
        this.renameDialogTarget.item.name = nextName
      }
      this.renameDialogOpen = false
      this.renameDialogDraft = ''
      this.renameDialogTarget = null
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  width 100%

.item-img
  transition .1s linear

.item-size--small
  width 120px

.item-size--medium
  width 170px

.item-size--large
  width 240px

.item-img:hover
  opacity 1

.toolbar-no-border
  border-bottom none !important

.toolbar-with-padding
  padding-top 12px
  padding-bottom 12px

.add-images-btn
  background white !important
  color black
  border-radius 9999px
  padding 8px 20px

.add-images-btn .q-icon
  color var(--q-color-primary)

.settings-btn
  background white !important
  color #027BE3

.image-card-actions
  background transparent !important
  pointer-events none
  z-index 3

.image-action-btn
  background rgba(255, 255, 255, 0.7)
  pointer-events auto
  z-index 4

.image-overlay
  display flex
  align-items center
  justify-content center
  pointer-events none
  z-index 2

.image-overlay--hidden
  background rgba(55, 68, 92, 0.78)

.image-overlay--unavailable
  background rgba(255, 255, 255, 0.55)

.overlay-icon
  font-size 72px
  color #dfe5ee

.overlay-icon--cross
  color #e53935
  font-size 96px
  font-weight 700

.item-settings-menu .q-item
  min-height 42px
  padding 0 12px

.item-settings-menu__avatar
  min-width 28px !important
  padding-right 10px
  align-items center

.item-name-bar
  background rgba(224, 230, 238, 0.92)
  padding-top 10px
  padding-bottom 10px

.item-name-text
  cursor text

.item-name-input
  padding 0 10px

.items-container
  margin-top 24px
  margin-left 4px

.holder-container
  padding-left 0px
    // for that images are not hindered by the toolbar
    // as the toolbar dimension is variable, it would be better
    // to find a more flexible way to achieve this

  padding-top 6rem

.ghost
  opacity 0

/*
  div
    opacity 0
    position relative
    width 100% !important
    height 100% !important
*/
</style>
