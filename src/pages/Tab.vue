<template>
  <q-page class="flex q-pa-xl">

    <q-page-sticky position="top-right" :offset="[18, 18]">
      <q-btn class="q-mx-xs" fab icon="undo" color="accent" />
      <q-btn class="q-mx-xs" fab icon="redo" color="accent" />
    </q-page-sticky>

    <!-- Action buttons -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn class="q-mx-xs" fab icon="delete" color="negative" @click="onDelete" />
      <q-btn class="q-mx-xs" fab icon="save" color="accent" @click="onSave" />
    </q-page-sticky>
  </q-page>
</template>

<style>
</style>

<script>
import Parse from 'parse'

import TabModel, { SLUG_KEY } from '~/models/Tab'

export default {
  name: 'Tab',
  data () {
    return {
      loading: false,
      tab: {}
    }
  },
  methods: {
    onSave () {
    },
    onDelete () {
      this.tab
        .destroy()
        .then((res) => {
          this.$router.push({
            name: 'home'
          })
        })
        .catch((err) => {
          throw err
        })
    },
    loadTab () {
      new Parse.Query(TabModel)
        .equalTo(SLUG_KEY, this.$route.params.slug)
        .first()
        .then((res) => {
          if (!res) {
            this.$router.push({
              name: 'home'
            })
          } else {
            this.tab = res
            this.loading = false
          }
        })
        .catch((err) => {
          throw Error(`WTFFFFF ${err}`)
        })
    }
  },
  mounted () {
    this.loadTab()
  }
}
</script>
