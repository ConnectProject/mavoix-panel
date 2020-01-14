<style lang="stylus" scoped>
.container
  width 100%
.item-img
  cursor pointer
  transition .1s linear
.item-img:hover
  opacity 0.4
.action-icon-wrapper
  opacity 0
  transition .2s linear
.action-icon-wrapper:hover
  opacity 1
.action-icon
  font-size 2em
.items-container
  margin-top 24px
  border-style solid
</style>

<template>
  <!-- Print nothing if loading -->
  <div v-if="loading"></div>

  <q-page
    v-else
    class="flex items-stretch q-pa-xl"
  >
    <div class="column container">
      <div class="col-2 row justify-center items-center">

        <!-- Name input -->
        <q-input
          :label="$t('tabEditor.tabNameLabel')"
          class="q-ma-md"
          :value="tab.name"
          @input="setName"
          filled
        />

        <!-- HexColor input -->
        <q-input
          :label="$t('tabEditor.tabColorLabel')"
          class="q-ma-md"
          :value="tab.hexColor"
          @input="setHexColor"
          filled
        >
          <template v-slot:append>
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
                  @input="setHexColor"
                  inline
                  class="my-picker"
                />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <!-- Add item button -->
        <q-btn
          class="stretch q-ma-md"
          flat size="lg"
          @click="onAddItem">
            {{ $t('tabEditor.addItemLabel') }}
          </q-btn>
      </div>

      <!-- Items container -->
      <draggable
        tag="div"
        v-model="items"
        :style="{ borderColor: tab.hexColor }"
        class="col-8 scroll row items-start rounded-borders q-pa-xs q-ph-md q-mh-xs q-mx-md q-gutter-x-xl q-gutter-y-md items-container">

        <!-- Items -->
        <q-card
          class="col-2"
          v-for="(item, index) in items"
          :v-if="!item.deleted"
          :key="index"
        >
          <!-- Item's image -->
          <q-img
            :ratio="16/9"
            class="item-img"
            :src="item.asset.file._url"
          >
            <div
              class="absolute-bottom"
            >
              <!-- Item's name -->
              <div class="text-center text-subtitle2">
                {{ item.name }}
              </div>
            </div>

            <!-- Edit button -->
            <div
              @click="() => onEditItem(item, index)"
              class="absolute fit flex justify-center items-center text-center action-icon-wrapper"
            >
              <q-icon name="edit" class="action-icon" size="xl" />
            </div>
          </q-img>

          <q-card-actions align="right">
            <!-- Toggle availability -->
            <q-checkbox
              left-label
              :label="$t('generic.unavailable')"
              :value="!item.available"
              @input="() => $store.commit('tabEditor/toggleItemAvailable', item)"/>
            <!-- Toggle visibility -->
            <q-checkbox
              left-label
              :label="$t('generic.invisible')"
              :value="item.hidden"
              @input="() => $store.commit('tabEditor/toggleItemHidden', item)"/>
          </q-card-actions>
        </q-card>
      </draggable>
    </div>

    <dialog-tab-item />

    <!-- Udo, Redo buttons -->
    <q-page-sticky position="top-right" :offset="[18, 18]">
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
    </q-page-sticky>

    <!-- Delete, Save buttons -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn class="q-mx-xs" fab icon="delete" color="negative" @click="onDelete">
        <q-tooltip>
          {{ $t('generic.delete') }}
        </q-tooltip>
      </q-btn>
      <q-btn class="q-mx-xs" fab icon="save" size="xl" color="primary" @click="onSave">
        <q-tooltip>
          {{ $t('generic.save') }}
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import DialogTabItem from '~/components/dialogs/TabItem'
import { SLUG_KEY } from '../models/Tab'

export default {
  name: 'TabEditor',
  components: {
    DialogTabItem
  },
  /**
   * When component mounted load everything
   */
  mounted () {
    this.load()
  },
  data () {
    return {
      hex: ''
    }
  },
  computed: {
    /**
     * Return the opened tab
     */
    tab () {
      return this.$store.getters['tabEditor/tab']
    },
    /**
     * The tab's items
     */
    items: {
      get () {
        return this.$store.getters['tabEditor/items']
      },
      set (values) {
        this.$store.commit('tabEditor/setItemsRaw', values)
      }
    },
    /**
     * Return true if loading
     */
    loading () {
      return this.$store.getters['tabEditor/loading']
    }
  },
  watch: {
    /**
     * When route change load eveyrhing
     */
    '$route' (newValue, oldValue) {
      this.load()
    }
  },
  methods: {
    /**
     * Load tab
     */
    load () {
      this.$store.dispatch('tabEditor/loadBySlug', this.$route.params.slug)
    },
    /**
     * Call to save the tab
     */
    onSave () {
      this.$store.dispatch('tabEditor/saveCb', (tab) => {
        /* When the tab's name is changed the slugs change to, so redirect to the new url */
        this.$router.push({
          name: 'tab',
          params: {
            slug: tab.get(SLUG_KEY)
          }
        })

        /* Toast message */
        this.$q.notify({
          message: `${tab.get('name')} saved`,
          color: 'purple'
        })
      })
    },
    /**
     * Call to remove tab
     */
    onDelete () {
      this.$store.dispatch('tabEditor/deleteTab')

      /* Go to home */
      this.$router.push({
        name: 'home'
      })
    },
    /**
     * Set the tab's name
     */
    setName (name) {
      this.$store.commit('tabEditor/setName', name)
    },
    /**
     * Set the tab's color
     */
    setHexColor (hexColor) {
      this.$store.commit('tabEditor/setHexColor', hexColor)
    },
    /**
     * Call to open the item dialog in new item mode
     */
    onAddItem () {
      this.$store.commit('tabEditor/openItemDialog', {})
    },
    /**
     * Call to open the item dialog in edit item mode
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
     */
    onUndo () {
      this.$store.commit('tabEditor/undo')
    },
    /**
     * Redo
     */
    onRedo () {
      this.$store.commit('tabEditor/redo')
    }
  }
}
</script>
