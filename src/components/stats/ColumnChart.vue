<template>
  <div
    class="columns"
    role="group"
    :aria-label="ariaLabel"
  >
    <div
      v-for="(item, index) in items"
      :key="item.key"
      class="column"
      :title="item.title"
    >
      <span class="column-plot">
        <span class="column-value">{{ valuesShown && item.value ? item.value : '' }}</span>
        <span
          class="column-bar"
          :style="{ height: height(item.value), background: item.highlight ? highlightColor : color }"
        />
      </span>
      <span class="column-label">{{ index % step === 0 ? item.label : '' }}</span>
    </div>
  </div>
</template>

<script>

/** Vertical columns with the value above each non-empty column and a label below (every `every` columns). */
export default {
  name: 'ColumnChart',
  props: {
    items: { type: Array, required: true }, // [{ key, label, value, title?, highlight? }]
    color: { type: String, default: '#5c8fd6' },
    highlightColor: { type: String, default: '#9bb8e6' },
    every: { type: Number, default: 0 }, // a label every N columns (default: about 14 labels in all)
    showValues: { type: Boolean, default: null }, // write the value above each column (default: when there are at most 45 columns)
    ariaLabel: { type: String, default: '' }
  },
  computed: {
    max () {
      return Math.max(1, ...this.items.map((item) => item.value))
    },
    step () {
      return this.every || Math.max(1, Math.ceil(this.items.length / 14))
    },
    valuesShown () {
      return this.showValues === null ? this.items.length <= 45 : this.showValues
    }
  },
  methods: {
    height (value) {
      return `${Math.round(value / this.max * 82)}%`
    }
  }
}
</script>

<style lang="stylus" scoped>
.columns
  display flex
  align-items stretch
  gap 2px
  height 170px
  justify-content center
.column
  flex 1
  min-width 0
  max-width 56px // a single day or week must not become one huge bar
  display flex
  flex-direction column
.column-plot
  flex 1
  min-height 0
  width 100%
  display flex
  flex-direction column
  justify-content flex-end
  align-items center
.column-value
  font-size 10px
  line-height 12px
.column-bar
  display block
  width 100%
  min-height 1px
  border-radius 3px 3px 0 0
.column-label
  font-size 10px
  line-height 14px
  height 14px
  text-align center
  white-space nowrap
</style>
