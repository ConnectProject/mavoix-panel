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
                          @input="() => onToggleAvailable(item)"
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
                          @input="() => onToggleHidden(item)"
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
    <dialog-asset-delete
      :value="assetDeleteDialogOpen"
      @input="assetDeleteDialogOpen = $event"
      @confirm="onConfirmDeleteItem"
    />
    <q-dialog
      v-model="arasaacDialogOpen"
    >
      <q-card class="bg-white arasaac-modal-shell column no-wrap">
        <arasaac-library
          in-dialog
          @close="arasaacDialogOpen = false"
        />
      </q-card>
    </q-dialog>

    <q-page-sticky
      expand
      position="top"
    >
      <q-toolbar
        class="row items-center toolbar-no-border toolbar-with-padding"
        :style="{ background: tab.hexColor }"
      >
        <!-- Adjacent left: add images + tab settings; subtle translucent pill behind each -->
        <div class="row items-center no-wrap tab-toolbar-actions">
          <q-btn
            class="tab-toolbar-btn"
            flat
            no-caps
            icon="add_to_photos"
            :label="$t('tabEditor.addItemLabel')"
            :style="tabToolbarBtnStyle"
            @click="onAddItem"
          />
          <q-btn
            class="tab-toolbar-btn"
            flat
            no-caps
            icon="settings"
            :label="$t('tabSettings.editTitle')"
            :style="tabToolbarBtnStyle"
            @click="openTabSettings"
          />
        </div>
        <q-space />
        <!-- edit language button -->
      </q-toolbar>
    </q-page-sticky>

    <dialog-tab-settings
      :value="$store.getters['tabEditor/tabSettingsDialogOpened']"
      :mode="'edit'"
      :tab="tab"
      @input="v => !v && closeTabSettings()"
    />

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
import DialogAssetDelete from '~/components/dialogs/AssetDelete'
import DialogTabItem from '~/components/dialogs/TabItem'
import DialogTabSettings from '~/components/dialogs/TabSettings'
import ArasaacLibrary from '~/pages/ArasaacLibrary'

export default {
  name: 'PageTabEditor',
  components: {
    DialogTabItem,
    DialogTabSettings,
    DialogAssetDelete,
    ArasaacLibrary
  },
  data () {
    return {
      arasaacDialogOpen: false,
      assetDeleteDialogOpen: false,
      assetDeleteTargetIndex: null,
      skipAssetDeleteConfirm: false,
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
    },

    /**
     * Text/icon color for toolbar actions on the tab background (readable contrast).
     * @returns {string} #FFFFFF or #000000 (or passed light/dark) for legibility on tab.hexColor
     */
    tabToolbarActionColor () {
      return this.getContrastTextColor(this.tab.hexColor)
    },

    /**
     * Foreground plus a lightly translucent background so buttons are not fully flat on the tab color.
     * @returns {{ color: string, backgroundColor: string }} inline styles for both toolbar actions
     */
    tabToolbarBtnStyle () {
      const color = this.tabToolbarActionColor
      const backgroundColor = color === '#FFFFFF'
        ? 'rgba(255, 255, 255, 0.22)'
        : 'rgba(0, 0, 0, 0.08)'

      return { color, backgroundColor }
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

    /**
     * Pick light or dark foreground for a hex background (same idea as HomeLayout tabs).
     * @param {string} bgColor background hex (with or without #)
     * @param {string} lightColor text color to use on dark backgrounds
     * @param {string} darkColor text color to use on light backgrounds
     * @returns {string} chosen foreground hex for readable contrast
     */
    getContrastTextColor (bgColor, lightColor = '#FFFFFF', darkColor = '#000000') {
      if (!bgColor) return darkColor

      const getLuminance = function (hexColor) {
        const color = (hexColor.charAt(0) === '#') ? hexColor.substring(1, 7) : hexColor
        const r = parseInt(color.substring(0, 2), 16)
        const g = parseInt(color.substring(2, 4), 16)
        const b = parseInt(color.substring(4, 6), 16)
        const uicolors = [r / 255, g / 255, b / 255]
        const c = uicolors.map(col => (col <= 0.03928 ? col / 12.92 : ((col + 0.055) / 1.055) ** 2.4))

        return (0.2126 * c[0]) + (0.7152 * c[1]) + (0.0722 * c[2])
      }

      const L = getLuminance(bgColor)
      const L1 = getLuminance(lightColor)
      const L2 = getLuminance(darkColor)

      return (L > Math.sqrt((L1 + 0.05) * (L2 + 0.05)) - 0.05) ? darkColor : lightColor
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
      this.arasaacDialogOpen = true
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
      this.$store.dispatch('tabEditor/saveCb', () => { /* auto-save on delete */ })
    },

    saveDialogRename () {
      const nextName = (this.renameDialogDraft || '').trim()
      if (nextName && this.renameDialogTarget && this.renameDialogTarget.item) {
        this.renameDialogTarget.item.name = nextName
        this.$store.dispatch('tabEditor/saveCb', () => { /* auto-save on rename */ })
      }
      this.renameDialogOpen = false
      this.renameDialogDraft = ''
      this.renameDialogTarget = null
    },

    onToggleAvailable (item) {
      this.$store.commit('tabEditor/toggleItemAvailable', item)
      this.$store.dispatch('tabEditor/saveCb', () => { /* auto-save on toggle available */ })
    },

    onToggleHidden (item) {
      this.$store.commit('tabEditor/toggleItemHidden', item)
      this.$store.dispatch('tabEditor/saveCb', () => { /* auto-save on toggle hidden */ })
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
  /* Same inset as first image: .items-container margin-left (4px) + q-gutter-x-md on row children (16px) */
  padding 12px 12px 12px 65px

.tab-toolbar-actions
  gap 8px

.tab-toolbar-btn
  border-radius 10px
  box-shadow none !important

/*
 * Icon is inside .q-btn__content (not direct child of .q-btn__wrapper), so the old rule had no effect.
 */
.tab-toolbar-btn :deep(.q-icon.on-left)
  margin-right 0 !important

.tab-toolbar-btn :deep(.q-icon.on-left + .block)
  margin-left 4px

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
  margin-top -10px
  margin-left 4px

.holder-container
  padding-left 0px
    // for that images are not hindered by the toolbar
    // as the toolbar dimension is variable, it would be better
    // to find a more flexible way to achieve this

  padding-top 6rem

.ghost
  opacity 0

.arasaac-modal-shell
  width calc(100vw - 90px)
  max-width 1280px
  height calc(100vh - 70px)
  max-height 900px
  border-radius 14px
  overflow hidden
  min-height 0

.arasaac-modal-shell :deep(.arasaac-page)
  flex 1 1 auto
  min-height 0
  overflow-y auto
  overflow-x hidden
  -webkit-overflow-scrolling touch

/*
  div
    opacity 0
    position relative
    width 100% !important
    height 100% !important
*/
</style>
