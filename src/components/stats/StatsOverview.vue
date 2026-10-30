<template>
  <stats-section :title="$t('stats.overview.title')">
    <div class="row q-col-gutter-md">
      <div
        v-for="tile in tiles"
        :key="tile.label"
        class="col-6 col-sm-4 col-md-3"
      >
        <div class="text-h5 text-weight-bold">
          {{ tile.value }}
        </div>
        <div>{{ tile.label }}</div>
        <div
          v-if="tile.hint"
          class="text-caption text-grey-8"
        >
          {{ tile.hint }}
        </div>
      </div>
    </div>
  </stats-section>
</template>

<script>
import { mapGetters } from 'vuex'

import StatsSection from './StatsSection'

/**
 * @param {number} minutes duration in minutes
 * @returns {string} '2 h 05' or '35 min'
 */
const formatDuration = (minutes) => (minutes >= 60 ? `${Math.floor(minutes / 60)} h ${String(minutes % 60).padStart(2, '0')}` : `${minutes} min`)

export default {
  name: 'StatsOverview',
  components: { StatsSection },
  computed: {
    ...mapGetters('stats', ['overview', 'dayCount']),
    tiles () {
      const o = this.overview

      return [
        { label: this.$t('stats.overview.sessions'), value: o.sessions },
        { label: this.$t('stats.overview.activeDays'), value: o.activeDays, hint: this.$tc('stats.overview.of', this.dayCount, { n: this.dayCount }) },
        { label: this.$t('stats.overview.time'), value: formatDuration(o.minutes) },
        { label: this.$t('stats.overview.phrases'), value: o.phrases },
        { label: this.$t('stats.overview.avgPhrase'), value: String(o.avgPhraseLength).replace('.', ',') },
        { label: this.$t('stats.overview.avgSession'), value: formatDuration(Math.round(o.avgSessionMinutes)) },
        { label: this.$t('stats.overview.night'), value: o.nightSessions, hint: this.$t('stats.overview.nightHint') }
      ]
    }
  }
}
</script>
