<template>
  <span class="card-chip">
    <img
      v-if="info && info.imageUrl"
      :src="info.imageUrl"
      alt=""
    >
    <span>{{ info ? info.label : id }}</span>
  </span>
</template>

<script>

/** A card picture with its label, used to show phrases. */
export default {
  name: 'CardChip',
  props: {
    id: { type: String, required: true },
    info: { type: Object, default: null } // { label, imageUrl }
  }
}
</script>

<style lang="stylus" scoped>
.card-chip
  display inline-flex
  flex-direction column
  align-items center
  width 56px
  font-size 11px
  line-height 13px
  text-align center
  img
    width 44px
    height 44px
    object-fit contain
</style>
