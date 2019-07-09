<template>
  <q-page-sticky position="bottom-right" :offset="[18, 18]">
    <q-btn
      fab
      :icon="$props.icon || 'add'"
      :color="$props.color || 'accent'"
      @click="$props.onClick"
    />
  </q-page-sticky>
</template>

<script>
export default {
  name: 'Fab',
  props: {
    icon: String,
    color: String,
    onClick: Function
  }
}
</script>
