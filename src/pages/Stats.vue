<template>
  <q-page class="stats-page q-pa-md">
    <div class="row items-center q-col-gutter-md q-mb-md">
      <h1 class="text-h5 q-my-none col-12 col-md">
        {{ $t('stats.title') }}
      </h1>
      <div class="col-12 col-sm-6 col-md-auto">
        <q-btn-toggle
          no-caps
          unelevated
          toggle-color="primary"
          :value="periodDays"
          :options="periodOptions"
          @input="onPeriodChange"
        />
      </div>
    </div>

    <q-banner
      v-if="error"
      dense
      class="bg-red-2 q-mb-md"
    >
      {{ $t('stats.loadError') }} ({{ error.message }})
    </q-banner>

    <list-item-loading v-if="loading && !data" />
    <div
      v-else-if="data && overview.sessions === 0"
      class="q-pa-lg text-center"
    >
      {{ $t('stats.empty') }}
    </div>
    <div
      v-else-if="data"
      class="column q-gutter-md"
    >
      <stats-overview />
      <stats-when />
      <stats-tabs />
      <stats-cards />
      <stats-phrases />
      <stats-progress />
    </div>
  </q-page>
</template>

<script>
import { mapGetters, mapState } from 'vuex'

import ListItemLoading from '~/components/ListItemLoading'
import StatsCards from '~/components/stats/StatsCards'
import StatsOverview from '~/components/stats/StatsOverview'
import StatsPhrases from '~/components/stats/StatsPhrases'
import StatsProgress from '~/components/stats/StatsProgress'
import StatsTabs from '~/components/stats/StatsTabs'
import StatsWhen from '~/components/stats/StatsWhen'

const PERIODS = [0, 30, 14, 7] // 0 = since the first recorded use

export default {
  name: 'PageStats',
  components: { ListItemLoading, StatsCards, StatsOverview, StatsPhrases, StatsProgress, StatsTabs, StatsWhen },
  computed: {
    ...mapState('stats', ['loading', 'error', 'data', 'periodDays']),
    ...mapGetters('stats', ['overview']),
    periodOptions () {
      return PERIODS.map((n) => ({ value: n, label: n ? this.$t('stats.lastDays', { n }) : this.$t('stats.sinceStart') }))
    }
  },
  mounted () {
    this.$store.dispatch('stats/loadUsage')
  },
  methods: {
    onPeriodChange (days) {
      this.$store.commit('stats/setPeriodDays', days)
    }
  }
}
</script>

<style lang="stylus" scoped>
.stats-page
  max-width 1100px
  margin 0 auto
</style>
