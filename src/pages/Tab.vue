<style lang="stylus" scoped>
.container
  width 100%
</style>

<template>
  <div v-if="loading"></div>
  <q-page v-else class="flex items-stretch q-pa-xl">
    <div class="column container">
      <div class="col-2 row justify-center">
        <q-input
          :value="tab.name"
          @input="(v) => $store.commit('tabEditor/setName', v)"
          class="self-end"
        />
        <q-color no-header no-footer v-model="hex" inline class="my-picker" />
      </div>
      <div class="col-10">
        <p></p>
      </div>
    </div>
    <!-- Udo, Redo buttons -->
    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn class="q-mx-xs" fab icon="undo" color="accent" @click="onUndo" :disable="$store.getters['tabEditor/isUndoable']"/>
      <q-btn class="q-mx-xs" fab icon="redo" color="accent" @click="onRedo" :disable="$store.getters['tabEditor/isRedoable']"/>
    </q-page-sticky>

    <!-- Delete, Save buttons -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn class="q-mx-xs" fab icon="delete" color="negative" @click="onDelete" />
      <q-btn class="q-mx-xs" fab icon="save" color="accent" @click="onSave" />
    </q-page-sticky>
  </q-page>
</template>

<script>
import { NAME_KEY } from '~/models/Tab'

export default {
  name: 'TabEditor',
  data () {
    return {
      NAME_KEY
    }
  },
  computed: {
    tab () {
      const a = this.$store.getters['tabEditor/tab']
      console.log(a)
      return a
    },
    loading () {
      return this.$store.getters['tabEditor/loading']
    }
  },
  methods: {
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
    onUndo () {
      this.$store.commit('tabEditor/undo')
    },
    onRedo () {
      this.$store.commit('tabEditor/redo')
    },
    loadTab () {
      this.$store.dispatch('tabEditor/loadBySlug', this.$route.params.slug)
    }
  },
  mounted () {
    this.loadTab()
  }
}
</script>
