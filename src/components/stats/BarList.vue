<template>
  <ul
    class="bar-list"
    :aria-label="ariaLabel"
  >
    <li
      v-for="item in items"
      :key="item.key"
      class="bar-row"
      :title="item.title"
    >
      <img
        v-if="item.imageUrl"
        class="bar-image"
        :src="item.imageUrl"
        alt=""
      >
      <span class="bar-label">{{ item.label }}</span>
      <span class="bar-track">
        <span
          class="bar-fill"
          :style="{ width: width(item.value), background: color }"
        />
      </span>
      <span class="bar-value">{{ item.valueLabel || item.value }}</span>
    </li>
  </ul>
</template>

<script>

/** Horizontal bars with the exact value written next to each bar (no information is carried by colour alone). */
export default {
  name: 'BarList',
  props: {
    items: { type: Array, required: true }, // [{ key, label, value, valueLabel?, title?, imageUrl? }]
    color: { type: String, default: '#5c8fd6' },
    scaleMax: { type: Number, default: 0 }, // bars are scaled to this value (default: the largest value of the list)
    ariaLabel: { type: String, default: '' }
  },
  computed: {
    max () {
      return Math.max(1, this.scaleMax, ...this.items.map((item) => item.value))
    }
  },
  methods: {
    width (value) {
      return `${Math.round(value / this.max * 100)}%`
    }
  }
}
</script>

<style lang="stylus" scoped>
.bar-list
  list-style none
  margin 0
  padding 0
.bar-row
  display flex
  align-items center
  gap 8px
  min-height 32px
.bar-image
  width 28px
  height 28px
  object-fit contain
.bar-label
  flex 0 0 9em
  overflow hidden
  text-overflow ellipsis
  white-space nowrap
.bar-track
  flex 1
  height 14px
  background rgba(0, 0, 0, 0.06)
  border-radius 7px
  overflow hidden
.bar-fill
  display block
  height 100%
  border-radius 7px
.bar-value
  flex 0 0 3.5em
  text-align right
  font-variant-numeric tabular-nums
</style>
