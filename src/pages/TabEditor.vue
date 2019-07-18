<style lang="stylus" scoped>
.container
  width 100%
</style>

<template>
  <div v-if="loading"></div>
  <q-page v-else class="flex items-stretch q-pa-xl">
    <div class="column container">
      <div class="col-2 row justify-center items-center">
        <q-input
          class="q-ma-md"
          :value="tab.name"
          @input="setName"
          filled
        />
        <q-input
          class="q-ma-md"
          :value="tab.hexColor"
          @input="setHexColor"
          filled
        >
          <template v-slot:append>
            <q-icon name="colorize" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-color no-header no-footer :value="tab.hexColor" @input="setHexColor" inline class="my-picker" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>
        <q-btn class="stretch q-ma-md" flat size="lg" @click="openNewItemDialog">Ajouter une image</q-btn>
      </div>

      <div class="images-zone col-8 rounded-borders q-pa-xs q-ph-md q-mh-xs shadow-3">
     </div>
    </div>

    <dialog-tab-item />

    <!-- Udo, Redo buttons -->
    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn class="q-mx-xs" fab icon="undo" color="accent" @click="onUndo" :disable="$store.getters['tabEditor/isUndoable']"/>
      <q-btn class="q-mx-xs" fab icon="redo" color="accent" @click="onRedo" :disable="$store.getters['tabEditor/isRedoable']"/>
    </q-page-sticky>

    <!-- Delete, Save buttons -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn class="q-mx-xs" fab icon="delete" color="negative" @click="onDelete" />
      <q-btn class="q-mx-xs" fab icon="save" color="primary" @click="onSave" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import DialogTabItem from '~/components/DialogTabItem'

export default {
  name: 'TabEditor',
  data () {
    return {
      hex: ''
    }
  },
  computed: {
    tab () {
      return this.$store.getters['tabEditor/tab']
    },
    loading () {
      return this.$store.getters['tabEditor/loading']
    }
  },
  watch: {
    loading (newValue, oldValue) {
      if (newValue === false && this.tab != null) {
        this.$store.dispatch('tabEditor/loadItems')
      }
    }
  },
  methods: {
    openNewItemDialog () {
      this.$store.commit('tabEditor/openNewItemDialog')
    },
    onSave () {
      this.$store.dispatch('tabEditor/saveCb', (tab) => {
        this.$router.push({
          name: 'tab',
          params: {
            slug: tab.get('slug')
          }
        })
        this.$q.notify({
          message: `${tab.get('name')} saved`,
          color: 'purple'
        })
      })
    },
    onDelete () {
      this.$store.dispatch('tabEditor/deleteIt')
      this.$router.push({
        name: 'home'
      })
    },
    setName (name) {
      this.$store.commit('tabEditor/setName', name)
    },
    setHexColor (hexColor) {
      this.$store.commit('tabEditor/setHexColor', hexColor)
    },
    onUndo () {
      this.$store.commit('tabEditor/undo')
    },
    onRedo () {
      this.$store.commit('tabEditor/redo')
    }
  },
  mounted () {
    this.$store.dispatch('tabEditor/loadBySlug', this.$route.params.slug)
  },
  components: {
    DialogTabItem
  }
}
</script>
