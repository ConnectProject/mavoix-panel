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
  <div v-if="loading"></div>
  <q-page v-else class="flex items-stretch q-pa-xl">
    <div class="column container">
      <div class="col-2 row justify-center items-center">
        <q-input
          :label="$t('tabEditor.tabNameLabel')"
          class="q-ma-md"
          :value="tab.name"
          @input="setName"
          filled
        />
        <q-input
          :label="$t('tabEditor.tabColorLabel')"
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
        <q-btn class="stretch q-ma-md" flat size="lg" @click="onAddItem">{{ $t('tabEditor.addItemLabel') }}</q-btn>
      </div>

      <div :style="{ borderColor: tab.hexColor }" class="col-8 scroll row items-start rounded-borders q-pa-xs q-ph-md q-mh-xs q-gutter-x-xl q-gutter-y-md items-container">
        <q-card class="col-2" v-for="(item, index) in tab.items" :key="index">
          <q-img class="item-img" :src="item.asset.get('parseFile')._url">
            <div class="absolute-bottom">
              <div class="text-center text-subtitle2">{{ item.name }}</div>
            </div>
            <div @click="() => onEditItem(item)" class="absolute fit flex justify-center items-center text-center action-icon-wrapper">
              <q-icon name="edit" class="action-icon" size="xl" />
            </div>
          </q-img>
          <q-card-actions align="right">
            <q-checkbox
              left-label
              :label="$t('generic.available')"
              :value="item.available"
              @input="() => $store.commit('tabEditor/updateItem', { id: item.id, data: { available: !item.available }})"/>
            <q-checkbox
              left-label
              :label="$t('generic.visible')"
              :value="item.visible"
              @input="() => $store.commit('tabEditor/updateItem', { id: item.id, data: { visible: !item.visible }})"/>
          </q-card-actions>
        </q-card>
      </div>
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
    items () {
      return this.$store.getters['tabEditor/items']
    },
    loading () {
      return this.$store.getters['tabEditor/loading']
    }
  },
  watch: {
    '$route' (newValue, oldValue) {
      this.load()
    }
  },
  methods: {
    onAddItem () {
      this.$store.commit('tabEditor/openItemDialog', {})
    },
    onEditItem (item) {
      this.$store.commit('tabEditor/openItemDialog', {
        mode: 'edit',
        data: Object.assign({}, item)
      })
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
    },
    load () {
      this.$store.dispatch('tabEditor/loadBySlug', this.$route.params.slug)
    }
  },
  mounted () {
    this.load()
  },
  components: {
    DialogTabItem
  }
}
</script>
