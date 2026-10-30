<template>
  <div
    class="heatmap"
    role="img"
    :aria-label="ariaLabel"
  >
    <div class="heat-row heat-hours">
      <span class="heat-name" />
      <span
        v-for="hour in 24"
        :key="hour"
        class="heat-hour"
      >{{ (hour - 1) % 3 === 0 ? hour - 1 : '' }}</span>
    </div>
    <div
      v-for="(row, d) in matrix"
      :key="d"
      class="heat-row"
    >
      <span class="heat-name">{{ rowLabels[d] }}</span>
      <span
        v-for="(value, h) in row"
        :key="h"
        class="heat-cell"
        :style="{ background: value ? color : '', opacity: value ? 0.15 + 0.85 * value / max : 1 }"
        :title="`${rowLabels[d]} ${h} h : ${value}`"
      />
    </div>
  </div>
</template>

<script>

/** Weekday x hour grid; the darker the cell, the more phrases. Exact numbers are in the cell tooltips. */
export default {
  name: 'HeatMap',
  props: {
    matrix: { type: Array, required: true }, // 7 rows (Monday first) of 24 counts
    rowLabels: { type: Array, required: true },
    color: { type: String, default: '#2f6fc4' },
    ariaLabel: { type: String, default: '' }
  },
  computed: {
    max () {
      return Math.max(1, ...this.matrix.map((row) => Math.max(...row)))
    }
  }
}
</script>

<style lang="stylus" scoped>
.heat-row
  display flex
  gap 2px
  margin-bottom 2px
.heat-name
  flex 0 0 5.5em
  font-size 12px
  line-height 22px
.heat-hour
  flex 1
  font-size 10px
  text-align left
.heat-cell
  flex 1
  height 22px
  border-radius 3px
  background rgba(0, 0, 0, 0.05)
</style>
