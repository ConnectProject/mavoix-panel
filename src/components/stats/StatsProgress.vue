<template>
  <stats-section :title="$t('stats.progress.title')">
    <h3 class="text-subtitle1 q-mt-none">
      {{ $t('stats.progress.distinctCards') }}
    </h3>
    <column-chart
      :items="items('distinctCards')"
      :aria-label="$t('stats.progress.distinctCards')"
    />
    <h3 class="text-subtitle1">
      {{ $t('stats.progress.avgLength') }}
    </h3>
    <column-chart
      :items="items('avgPhraseLength')"
      color="#d68a5c"
      :aria-label="$t('stats.progress.avgLength')"
    />
  </stats-section>
</template>

<script>
import { mapGetters } from 'vuex'

import ColumnChart from './ColumnChart'
import StatsSection from './StatsSection'

export default {
  name: 'StatsProgress',
  components: { ColumnChart, StatsSection },
  computed: {
    ...mapGetters('stats', ['weekly'])
  },
  methods: {
    items (field) {
      return this.weekly.map((w) => ({
        key: w.week,
        label: `${w.week.slice(8)}/${w.week.slice(5, 7)}`,
        value: w[field],
        title: `${this.$t('stats.progress.week', { day: w.week })} : ${w[field]}`
      }))
    }
  }
}
</script>
