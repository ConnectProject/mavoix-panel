<template>
  <q-page class="flex q-pa-xl">
    <tab-edit-form />
  </q-page>
</template>

<style>
</style>

<script>
import TabEditForm from '~/components/TabEditForm'

export default {
  name: 'PageNewTab',
  components: {
    TabEditForm
  },
  methods: {
    save () {

    }
  }
}
</script>
