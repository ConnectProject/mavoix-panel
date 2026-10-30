/* eslint-disable no-shadow */
import {
  cardUsage, filterPeriod, flattenPhrases, hourWeekdayMatrix, ngrams,
  overview as overviewOf, phraseFrequency as phraseFrequencyOf, rankCards, tabUsage as tabUsageOf, weeklyTrend
} from '~/utils/statsAggregate'
import { addDays, daysBetween, timeSeries, timeUnit } from '~/utils/statsTime'

/**
 * @param {State} state vuex state
 * @returns {{ start: string, end: string }|null} days shown: since the first recorded use, or the last periodDays days
 */
export const range = ({ data, periodDays }) => {
  if (!data) {
    return null
  }
  const { start, end } = data.period
  const first = periodDays ? addDays(end, 1 - periodDays) : start

  return { start: first > start ? first : start, end }
}

export const dayCount = (state, { range }) => (range ? daysBetween(range.start, range.end).length : 0)

export const sessions = ({ data }, { range }) => (data ? filterPeriod(data.sessions, range.start, range.end) : [])

export const phrases = (state, { sessions }) => flattenPhrases(sessions)

export const overview = (state, { sessions }) => overviewOf(sessions)

/**
 * @returns {{ unit: string, items: Object[] }} usage per day, per week or per month depending on the length of the period
 */
export const timeline = ({ data }, { range, sessions }) => {
  if (!data) {
    return { unit: 'day', items: [] }
  }
  const unit = timeUnit(range.start, range.end)

  return { unit, items: timeSeries(sessions, range.start, range.end, unit) }
}

export const hourWeekday = (state, { phrases }) => hourWeekdayMatrix(phrases)

export const weekly = (state, { phrases }) => weeklyTrend(phrases)

export const tabUsage = ({ data }, { phrases }) => (data ? tabUsageOf(phrases, data.inventory) : [])

export const cardUsageAll = ({ data }, { phrases }) => (data ? cardUsage(phrases, data.inventory) : [])

export const rankedCards = (state, { cardUsageAll }) => rankCards(cardUsageAll, 15)

export const frequentPhrases = (state, { phrases }) => phraseFrequencyOf(phrases, { minCount: 2, minLength: 2 }).slice(0, 15)

export const frequentPairs = (state, { phrases }) => ngrams(phrases, 2, 3).slice(0, 15)

export const frequentTriples = (state, { phrases }) => ngrams(phrases, 3, 3).slice(0, 10)

/**
 * @param {State} state vuex state
 * @returns {Object} card id -> { label, imageUrl } for every card of the user's tabs
 */
export const cardInfo = ({ data }) => {
  const info = {}
  for (const tab of data ? data.inventory.tabs : []) {
    tab.cards.forEach((card) => { info[card.id] = { label: card.label, imageUrl: card.imageUrl } })
  }

  return info
}
