<template>
  <stats-section :title="$t('stats.cards.title')">
    <div class="row q-col-gutter-lg">
      <div class="col-12 col-md-6">
        <h3 class="text-subtitle1 q-mt-none">
          {{ $t('stats.cards.mostUsed') }}
        </h3>
        <bar-list :items="toItems(rankedCards.top)" />
      </div>
      <div class="col-12 col-md-6">
        <h3 class="text-subtitle1 q-mt-none">
          {{ $t('stats.cards.leastUsed') }}
        </h3>
        <p class="text-grey-8">
          {{ $t('stats.cards.leastUsedHint') }}
        </p>
        <bar-list
          :items="toItems(rankedCards.bottom)"
          :scale-max="topCount"
          color="#d68a5c"
        />
      </div>
    </div>
    <h3 class="text-subtitle1">
      {{ $t('stats.cards.neverUsed', { n: rankedCards.neverUsed.length }) }}
    </h3>
    <p class="text-grey-8">
      {{ $t('stats.cards.neverUsedHint') }}
    </p>
    <div class="row q-gutter-sm">
      <card-chip
        v-for="card in rankedCards.neverUsed"
        :id="card.id"
        :key="card.id"
        :info="card"
        :title="card.tabs.join(', ')"
      />
    </div>
  </stats-section>
</template>

<script>
import { mapGetters } from 'vuex'

import BarList from './BarList'
import CardChip from './CardChip'
import StatsSection from './StatsSection'

export default {
  name: 'StatsCards',
  components: { BarList, CardChip, StatsSection },
  computed: {
    ...mapGetters('stats', ['rankedCards']),
    topCount () {
      return this.rankedCards.top.length ? this.rankedCards.top[0].count : 0
    }
  },
  methods: {
    toItems (cards) {
      return cards.map((card) => ({
        key: card.id,
        label: card.label,
        imageUrl: card.imageUrl,
        value: card.count,
        title: this.$t('stats.cards.detail', { n: card.count, days: card.daysUsed, last: card.lastDay, tabs: card.tabs.join(', ') })
      }))
    }
  }
}
</script>
