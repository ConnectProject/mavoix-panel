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
            class="item-img"
            :src="item.asset.url"
            contain
          >
            <div class="absolute-bottom">
              <!-- Item's name -->
              <div class="text-center text-subtitle2">
                {{ item.name }}
              </div>
            </div>
            <!-- Edit button -->
            <div
              class="absolute fit flex justify-center items-center text-center action-icon-wrapper"
              @click="() => onEditItem(item, index)"
            >
              <q-icon
                name="edit"
                class="action-icon"
                size="xl"
              />
            </div>
          </q-img>
          <q-card-actions align="right">
            <!-- Toggle availability -->
            <q-checkbox
              left-label
              :label="$t('generic.unavailable')"
              :value="!item.available"
              @input="() => $store.commit('tabEditor/toggleItemAvailable', item)"
            />
            <!-- Toggle visibility -->
            <q-checkbox
              left-label
              :label="$t('generic.invisible')"
              :value="item.hidden"
              @input="() => $store.commit('tabEditor/toggleItemHidden', item)"
            />
          </q-card-actions>
        </q-card>
      </draggable>
    </div>
    <dialog-tab-item />
    <dialog-item-choice ref="itemChoice" />

    <q-page-sticky
      expand
      position="top"
    >
      <q-toolbar
        style="opacity:1; border-bottom: thin solid rgba(255,255,255,0.7)"
        :style="{ background: tab.hexColor }"
        class="row"
      >
        <!-- Name input -->
        <q-input
          :label="$t('tabEditor.tabNameLabel')"
          class="q-ma-md bg-white col"
          :value="tab.name"
          filled
          @input="setName"
        />

        <!-- HexColor input -->
        <q-input
          :label="$t('tabEditor.tabColorLabel')"
          class="q-ma-md bg-white col"
          :value="tab.hexColor"
          filled
          @input="setHexColor"
        >
          <template #append>
            <q-icon
              name="colorize"
              class="cursor-pointer"
            >
              <q-popup-proxy
                transition-show="scale"
                transition-hide="scale"
              >
                <q-color
                  no-header
                  no-footer
                  :value="tab.hexColor"
                  inline
                  class="my-picker"
                  @input="setHexColor"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-select
          :value="speed"
          :options="speeds"
          class="q-ma-md bg-white col"
          filled
          :label="$t('tabEditor.tabSpeed')"
          @input="setSpeed"
        />
        <q-select
          :value="language"
          :options="options"
          class="q-ma-md bg-white col"
          filled
          :label="$t('tabEditor.tabLanguage')"
          @input="setLanguage"
        />
        <!-- Add item button -->
        <q-btn
          class="q-px-md q-py-md q-ma-md bg-white no-shadow col-3"
          no-caps
          icon-right="photo_library"
          :label="$t('tabEditor.addItemLabel')"
          @click="onAddItem"
        />
        <!-- edit language button -->
      </q-toolbar>
    </q-page-sticky>
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
  </q-page>
</template>

<script>
/* eslint-disable max-lines */
import DialogItemChoice from '~/components/dialogs/ItemChoice'
import DialogTabItem from '~/components/dialogs/TabItem'
import { QSelect } from 'quasar'
import { SLUG_KEY } from '../models/Tab'

export default {
  name: 'PageTabEditor',
  components: {
    DialogTabItem,
    DialogItemChoice,
    QSelect
  },
  data () {
    return {
      hex: '',
      loaded: false,
      deletion: false,
      numberLoaded: 0,
      itemsLoaded: []
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
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  width 100%

.item-img
  cursor pointer
  transition .1s linear

.item-img:hover
  opacity .7

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

/*
  div
    opacity 0
    position relative
    width 100% !important
    height 100% !important
*/
</style>
