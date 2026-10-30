<template>
  <stats-section :title="$t('stats.when.title')">
    <h3 class="text-subtitle1 q-mt-none">
      {{ chartTitle }}
    </h3>
    <column-chart
      :items="items"
      :aria-label="chartTitle"
    />
    <h3 class="text-subtitle1 q-mb-sm">
      {{ $t('stats.when.heatmap') }}
    </h3>
    <heat-map
      :matrix="hourWeekday"
      :row-labels="weekdayLabels"
      :aria-label="$t('stats.when.heatmap')"
    />
  </stats-section>
</template>

<script>
import { mapGetters } from 'vuex'

import ColumnChart from './ColumnChart'
import HeatMap from './HeatMap'
import StatsSection from './StatsSection'

import { weekdayOf } from '~/utils/statsTime'

export default {
  name: 'StatsWhen',
  components: { ColumnChart, HeatMap, StatsSection },
  computed: {
    ...mapGetters('stats', ['timeline', 'hourWeekday']),
    chartTitle () {
      return this.$t({ day: 'stats.when.perDay', week: 'stats.when.perWeek', month: 'stats.when.perMonth' }[this.timeline.unit])
    },
    items () {
      const { unit, items } = this.timeline

      return items.map((entry) => ({
        key: entry.key,
        label: this.bucketLabel(entry.key, unit),
        value: entry.phrases,
        highlight: unit === 'day' && weekdayOf(entry.key) >= 5,
        title: this.$t(`stats.when.${unit}`, { label: this.bucketLabel(entry.key, unit, true), phrases: entry.phrases, sessions: entry.sessions, days: entry.activeDays })
      }))
    },
    weekdayLabels () {
      return [0, 1, 2, 3, 4, 5, 6].map((d) => this.$t(`stats.weekdays.${d}`))
    }
  },
  methods: {

    /**
     * @param {string} key first day of the bucket, 'YYYY-MM-DD'
     * @param {string} unit day, week or month
     * @param {boolean} full true for the tooltip (with year), false for the axis
     * @returns {string} label of the column: '18' (day), '31/08' (week) or '09/26' (month); with the year in the tooltip
     */
    bucketLabel (key, unit, full = false) {
      const [year, month, day] = key.split('-')
      if (unit === 'month') {
        return `${month}/${full ? year : year.slice(2)}`
      }

      return unit === 'day' && !full ? String(Number(day)) : `${day}/${month}${full ? `/${year}` : ''}`
    }
  }
}
</script>
