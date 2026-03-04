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
          class="item"
          :v-if="!item.deleted"
        >
          <!-- Item's image -->
          <q-img
            :ratio="1"
            :class="['item-img', { 'item-img-hidden': item.hidden }]"
            :src="item.asset.url"
            contain
          >
            <!-- Invisible: eye-closed icon overlay + blurred image -->
            <div
              v-if="item.hidden"
              class="absolute-full flex flex-center item-overlay-invisible"
            >
              <q-icon
                name="visibility_off"
                size="64px"
                color="white"
              />
            </div>
            <!-- Unavailable: red X overlay (only when not invisible) -->
            <div
              v-else-if="!item.available"
              class="absolute-full flex flex-center item-overlay-unavailable"
            >
              <q-icon
                name="close"
                size="80px"
                color="red"
                class="unavailable-cross"
              />
            </div>
            <!-- Play button: top-left of image -->
            <div
              class="absolute-top-left"
              style="padding: 4px; background: white !important;"
            >
              <q-btn
                flat
                round
                dense
                size="sm"
                color="primary"
                icon="play_arrow"
                @click.stop="onPlayItem(item)"
              />
            </div>
            <!-- Edit button + menu: top-right of image -->
            <div class="absolute-top-right" style="padding: 4px;">
              <q-btn
                flat
                round
                dense
                size="sm"
                color="primary"
                icon="edit"
                @click.stop="openItemMenu(item, index)"
              />
              <q-menu
                :value="menuOpenByIndex[index]"
                anchor="bottom right"
                self="top right"
                @input="(v) => { $set(menuOpenByIndex, index, v); if (!v) itemMenuTarget = null }"
              >
                <q-list style="min-width: 200px;">
                  <q-item
                    v-ripple
                    clickable
                    @click="onMenuDelete(item, index)"
                  >
                    <q-item-section avatar>
                      <q-icon name="delete" />
                    </q-item-section>
                    <q-item-section>{{ $t('tabEditor.itemMenu.deleteImage') }}</q-item-section>
                  </q-item>
                  <q-item
                    v-ripple
                    clickable
                    @click="onMenuRename(item, index)"
                  >
                    <q-item-section avatar>
                      <q-icon name="text_fields" />
                    </q-item-section>
                    <q-item-section>{{ $t('tabEditor.itemMenu.renameImage') }}</q-item-section>
                  </q-item>
                  <q-item
                    v-ripple
                    clickable
                    @click="onMenuMakeUnavailable(item, index)"
                  >
                    <q-item-section avatar>
                      <q-icon name="radio_button_unchecked" />
                    </q-item-section>
                    <q-item-section>{{ $t('tabEditor.itemMenu.makeUnavailable') }}</q-item-section>
                  </q-item>
                  <q-item
                    v-ripple
                    clickable
                    @click="onMenuMakeInvisible(item, index)"
                  >
                    <q-item-section avatar>
                      <q-icon name="visibility_off" />
                    </q-item-section>
                    <q-item-section>{{ $t('tabEditor.itemMenu.makeInvisible') }}</q-item-section>
                  </q-item>
                </q-list>
              </q-menu>
            </div>
          </q-img>
          <div class="text-center text-subtitle2 q-pa-sm" style="background: #c7c5c5; border-radius: 4px;">
            {{ item.name }}
          </div>
        </q-card>
      </draggable>
    </div>
    <dialog-tab-item />
    <dialog-item-choice ref="itemChoice" />

    <q-page-sticky expand position="top">
      <q-toolbar
        class="row items-center toolbar-no-border toolbar-with-padding"
        :style="{ background: tab.hexColor }"
      >
        <!-- LEFT: Add item (pill shape, white bg, blue icon) -->
        <q-btn
          class="q-ml-md add-images-btn"
          unelevated
          no-caps
          icon="add_to_photos"
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
      </q-toolbar>
    </q-page-sticky>

    <!-- Reusable settings dialog: pass Parse model so TabSettings uses updateTabCb (API) when editing -->
    <dialog-tab-settings
      v-model="settingsOpen"
      :tab="tabModel || tab"
      mode="edit"
    />
    <!-- Udo, Redo buttons -->
    <!--     <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn class="q-mx-xs" fab icon="undo" color="accent" @click="onUndo" :disable="$store.getters['tabEditor/isUndoable']">
        <q-tooltip>
          {{ $t('generic.undo') }}
        </q-tooltip>
      </q-btn>
      <q-btn class="q-mx-xs" fab icon="redo" color="accent" @click="onRedo" :disable="$store.getters['tabEditor/isRedoable']">
        <q-tooltip>
          {{ $t('generic.redo') }}
        </q-tooltip>
      </q-btn>
    </q-page-sticky> -->

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

    <!-- Delete picto confirmation (from edit menu > Supprimer l'image) -->
    <q-dialog v-model="deletePictoOpen" persistent>
      <q-card class="delete-picto-card">
        <q-card-section>
          <div class="delete-picto-title text-h6">
            {{ $t('tabEditor.deletePicto.title') }}
          </div>
        </q-card-section>
        <q-card-section class="q-pt-none delete-picto-message">
          {{ $t('tabEditor.deletePicto.message') }}
        </q-card-section>
        <q-card-actions align="right" class="q-pb-none">
          <q-btn
            unelevated
            :label="$t('tabEditor.deletePicto.no')"
            class="delete-picto-btn-no"
            @click="cancelDeletePicto"
          />
          <q-btn
            unelevated
            :label="$t('tabEditor.deletePicto.yes')"
            class="delete-picto-btn-yes"
            @click="confirmDeletePicto"
          />
        </q-card-actions>
        <q-card-section class="q-pt-sm">
          <q-checkbox
            v-model="deletePictoDontAskAgain"
            :label="$t('tabEditor.deletePicto.dontAskAgain')"
            color="grey-8"
            dense
          />
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script>
/* eslint-disable max-lines */
import { QSelect } from 'quasar';
import DialogItemChoice from '~/components/dialogs/ItemChoice';
import DialogTabItem from '~/components/dialogs/TabItem';
import { SLUG_KEY } from '../models/Tab';
import DialogTabSettings from '~/components/dialogs/TabSettings';

export default {
  name: 'PageTabEditor',
  components: {
    DialogTabItem,
    DialogItemChoice,
    DialogTabSettings,
    QSelect
  },
  data () {
    return {
      settingsOpen: false,
      deletion: false,
      /** Which card's edit menu is open: key = index, value = true */
      menuOpenByIndex: {},
      /** Item/index for menu actions (delete/rename) */
      itemMenuTarget: null,
      /** Delete picto confirmation */
      deletePictoOpen: false,
      deletePictoTarget: null,
      deletePictoDontAskAgain: false
    }
  },
  computed: {

    /**
     * @returns {Object} the opened tab (plain object)
     */
    tab () {
      return this.$store.getters['tabEditor/tab']
    },
    /**
     * @returns {Object|null} the Parse tab model when loaded (so TabSettings can call updateTabCb)
     */
    tabModel () {
      return this.$store.getters['tabEditor/tabModel']
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
      var img = new Image()
      // onload fires when the image is fully loadded, and has width and height
      const that = this
      img.onload = function () {
        var canvas = document.createElement('canvas')
        canvas.width = img.width
        canvas.height = img.height
        var ctx = canvas.getContext('2d')
        ctx.drawImage(img, 0, 0)
        var dataURL = canvas.toDataURL('image/png')
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

        /* When the tab's name is changed the slugs change to, so redirect to the new url */
        const path = `/tabs/${tab.get(SLUG_KEY)}`
        if (this.$route.path !== path) this.$router.push(path)

        /* Toast message */
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
    onDelete () {
      this.$store.dispatch('tabEditor/deleteTab')
      this.deletion = false

      /* Go to home */
      this.$router.push({
        name: 'home'
      })
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

    openItemMenu (item, index) {
      this.itemMenuTarget = { item, index }
      this.$set(this.menuOpenByIndex, index, true)
    },

    closeItemMenu () {
      this.itemMenuTarget = null
      Object.keys(this.menuOpenByIndex).forEach((k) => {
        this.$set(this.menuOpenByIndex, Number(k), false)
      })
    },

    onMenuDelete (item, index) {
      this.$set(this.menuOpenByIndex, index, false)
      this.itemMenuTarget = null
      if (localStorage.getItem('deletePictoDontAskAgain') === 'true') {
        this.$store.commit('tabEditor/removeItemAtIndex', index)
      } else {
        this.deletePictoTarget = { item, index }
        this.deletePictoOpen = true
      }
    },

    onMenuRename (item, index) {
      this.$set(this.menuOpenByIndex, index, false)
      this.itemMenuTarget = null
      this.onEditItem(item, index)
    },

    onMenuMakeUnavailable (item, index) {
      this.$set(this.menuOpenByIndex, index, false)
      this.itemMenuTarget = null
      this.$store.commit('tabEditor/toggleItemAvailable', item)
    },

    onMenuMakeInvisible (item, index) {
      this.$set(this.menuOpenByIndex, index, false)
      this.itemMenuTarget = null
      this.$store.commit('tabEditor/toggleItemHidden', item)
    },

    onPlayItem (item) {
      const tts = this.$store.getters['global/tts']
      if (tts && item && item.name) tts.speak({ text: item.name })
    },

    cancelDeletePicto () {
      this.deletePictoOpen = false
      this.deletePictoTarget = null
    },

    confirmDeletePicto () {
      if (this.deletePictoTarget != null) {
        this.$store.commit('tabEditor/removeItemAtIndex', this.deletePictoTarget.index)
        this.deletePictoTarget = null
      }
      if (this.deletePictoDontAskAgain) {
        localStorage.setItem('deletePictoDontAskAgain', 'true')
      }
      this.deletePictoOpen = false
      this.deletePictoDontAskAgain = false
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
      this.settingsOpen = true
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  width 100%

.item
  min-width: 220px;
  min-height: 200px;
  padding: 2px;
  margin: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;

.item-img
  cursor pointer
  transition .1s linear

.item-img:hover
  opacity .7

.item-img-hidden img
  filter blur(4px) grayscale(80%)
  opacity 0.6

.item-overlay-unavailable
  background rgba(255, 255, 255, 0.5)
  pointer-events none

.unavailable-cross
  font-weight bold
  text-shadow 0 0 2px rgba(0, 0, 0, 0.3)

.item-overlay-invisible
  background rgba(80, 80, 80, 0.7)
  pointer-events none

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

.action-icon-wrapper
  opacity 0
  transition .2s linear

.action-icon-wrapper:hover
  opacity 1

.action-icon
  font-size 2em

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

.delete-picto-card
  min-width 320px
  border-radius 8px

.delete-picto-title
  font-weight 700
  color #c62828

.delete-picto-message
  color rgba(0, 0, 0, 0.7)
  font-size 14px

.delete-picto-btn-no
  background-color #e0e0e0
  color #212121
  padding 8px 20px
  border-radius 6px

.delete-picto-btn-yes
  background-color #424242
  color white
  padding 8px 20px
  border-radius 6px

/*
  div
    opacity 0
    position relative
    width 100% !important
    height 100% !important
*/
</style>
