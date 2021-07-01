<!-- This component does not seem to be used anywhere -->

<template>
  <q-page-sticky
    position="bottom-right"
    :offset="[18, 18]"
  >
    <q-btn
      fab
      :icon="$props.icon || 'add'"
      :color="$props.color || 'accent'"
      @click="$props.onClick"
    />
  </q-page-sticky>
</template>

<script>
/* eslint-disable vue/require-default-prop */
export default {
  name: 'ComponentFab',
  props: {
    icon: String,
    color: String,
    onClick: Function
  }
}
</script>
