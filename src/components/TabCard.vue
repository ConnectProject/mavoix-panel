<template>
  <q-card class="tab-card">
    <q-img src="https://cdn.quasar.dev/img/parallax2.jpg">
      <div class="text-h5 absolute-bottom text-right">Title</div>
    </q-img>
  </q-card>
</template>

<script>
export default {
  name: 'TabCard',
  props: {
    title: String,
    onPress: Function
  }
}
</script>
