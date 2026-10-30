<template>
  <stats-section :title="$t('stats.phrases.title')">
    <div class="row q-col-gutter-lg">
      <div
        v-for="block in blocks"
        :key="block.title"
        class="col-12 col-md-4"
      >
        <h3 class="text-subtitle1 q-mt-none">
          {{ block.title }}
        </h3>
        <p
          v-if="block.hint"
          class="text-grey-8"
        >
          {{ block.hint }}
        </p>
        <p v-if="!block.rows.length">
          {{ $t('stats.phrases.none') }}
        </p>
        <ul class="phrase-list">
          <li
            v-for="row in block.rows"
            :key="row.cards.join(' ')"
            class="phrase-row"
          >
            <span class="phrase-count">{{ $t('stats.phrases.times', { n: row.count }) }}</span>
            <card-chip
              v-for="(id, i) in row.cards"
              :id="id"
              :key="i"
              :info="cardInfo[id]"
            />
          </li>
        </ul>
      </div>
    </div>
  </stats-section>
</template>

<script>
import { mapGetters } from 'vuex'

import CardChip from './CardChip'
import StatsSection from './StatsSection'

export default {
  name: 'StatsPhrases',
  components: { CardChip, StatsSection },
  computed: {
    ...mapGetters('stats', ['frequentPhrases', 'frequentPairs', 'frequentTriples', 'cardInfo']),
    blocks () {
      return [
        { title: this.$t('stats.phrases.frequent'), hint: this.$t('stats.phrases.frequentHint'), rows: this.frequentPhrases },
        { title: this.$t('stats.phrases.pairs'), rows: this.frequentPairs },
        { title: this.$t('stats.phrases.triples'), rows: this.frequentTriples }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.phrase-list
  list-style none
  margin 0
  padding 0
.phrase-row
  display flex
  align-items flex-start
  gap 4px
  padding 4px 0
  border-bottom 1px solid rgba(0, 0, 0, 0.06)
.phrase-count
  flex 0 0 4.5em
  line-height 44px
  font-variant-numeric tabular-nums
</style>
