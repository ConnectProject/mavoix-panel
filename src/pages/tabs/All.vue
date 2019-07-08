<template>
  <q-page class="flex q-pa-md">
    <!-- If query is loading -->
    <loading v-if="loading"/>

    <!-- If query has returned 0 tabs -->
    <h2 v-else-if="tabs.length < 1">Aucun tab trouvé</h2>

    <!-- If query has returned 1 or more device -->
    <div v-else>
    </div>

    <!-- Click to add a new tab -->
    <fab
      icon="add"
      :onClick="newTab"
    />
  </q-page>
</template>

<script>
export default {
  name: 'PageAllTabs',
  data () {
    return {
      loading: true,
      tabs: []
    }
  },
  methods: {
    newTab () {
      this.$router.push({
        name: 'tabs-new'
      })
    }
  }
}
</script>
