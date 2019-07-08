<template>
  <div class="flex">
    <q-form>
      <div class="row items-stretch">
        <q-input class="q-mx-sm" filled label="Titre du tab" />
        <color-picker />
      </div>
    </q-form>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn class="q-mx-xs" fab icon="cancel" color="negative" v-on:click="cancel" />
      <q-btn class="q-mx-xs" fab icon="save" color="accent" v-on:click="save" />
    </q-page-sticky>
  </div>
</template>

<script>
import ColorPicker from './ColorPicker'

export default {
  name: 'TabEditForm',
  components: {
    ColorPicker
  },
  methods: {
    save () {

    },
    cancel () {
      this.$router.back()
    }
  }
}
</script>
