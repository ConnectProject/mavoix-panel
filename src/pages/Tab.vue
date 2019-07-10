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
export default {
  name: 'TabEditor',
  computed: {
    tab () {
      return this.$store.getters['tabEditor/tab']
    },
    loading () {
      return this.$store.getters['tabEditor/loading']
    }
  },
  methods: {
    onSave () {
    },
    onDelete () {
      this.$store.dispatch('tabEditor/deleteTab')
      this.$router.push({
        name: 'home'
      })
    },
    loadTab () {
      this.$store.dispatch('tabEditor/loadTabBySlug', this.$route.params.slug)
    }
  },
  mounted () {
    this.loadTab()
  }
}
</script>
