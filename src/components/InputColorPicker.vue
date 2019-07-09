<template>
  <q-input filled v-model="colorValue" class="my-input">
    <template v-slot:append>
      <q-icon name="colorize" class="cursor-pointer">
        <q-popup-proxy transition-show="scale" transition-hide="scale">
          <q-color v-model="colorValue" />
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'InputColorPicker',
  data () {
    return {
      colorValue: '#E5E5E5'
    }
  }
}
</script>
