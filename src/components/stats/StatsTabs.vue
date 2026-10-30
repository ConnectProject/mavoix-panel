<template>
  <stats-section
    :title="$t('stats.tabs.title')"
    :hint="$t('stats.tabs.hint')"
  >
    <bar-list
      :items="items"
      :aria-label="$t('stats.tabs.title')"
    />
  </stats-section>
</template>

<script>
import { mapGetters } from 'vuex'

import BarList from './BarList'
import StatsSection from './StatsSection'

export default {
  name: 'StatsTabs',
  components: { BarList, StatsSection },
  computed: {
    ...mapGetters('stats', ['tabUsage']),
    items () {
      return this.tabUsage.map((tab) => ({
        key: tab.name,
        label: tab.name,
        value: tab.taps,
        title: this.$t('stats.tabs.taps', { n: tab.taps, phrases: tab.phrases })
      }))
    }
  }
}
</script>
