/*
 * Pure aggregation functions of the stats panel. They take the "UsageData" format
 * (see mavoix-data-simulation/export_panel_data.py) and know nothing about Vue, Vuex or Parse, so they
 * work the same on simulated and real data.
 *
 * Shapes used below:
 *   session: { id, day: 'YYYY-MM-DD', begin: 'HH:MM', end: 'HH:MM', phrases: [{ t: 'HH:MM:SS', cards: [{ id, tab }] }] }
 *   phrase (flattened): { day, sessionId, time, hour, cards }
 *   inventory: { tabs: [{ name, cards: [{ id, label, imageUrl }] }] }
 */

import { addDays, daysBetween, minutesOf, mondayOf, weekdayOf } from './statsTime.js'

export { addDays, daysBetween, mondayOf, weekdayOf }

const NIGHT_BEFORE = '05:30'

/**
 * @param {number} value number
 * @returns {number} value rounded to 2 decimals (half up, the same rule as the Python reference)
 */
const round2 = (value) => Math.floor(value * 100 + 0.5) / 100

/**
 * @param {Object} a first entry
 * @param {Object} b second entry
 * @returns {number} comparator: highest count first, then key in alphabetical order
 */
const byCountThenKey = (a, b) => b.count - a.count || Number(a.key > b.key) - Number(a.key < b.key)

/**
 * @param {Object[]} sessions sessions
 * @param {string} start first day, included
 * @param {string} end last day, included
 * @returns {Object[]} sessions whose day is in the range
 */
export const filterPeriod = (sessions, start, end) => sessions.filter((session) => session.day >= start && session.day <= end)

/**
 * @param {Object[]} sessions sessions
 * @returns {Object[]} one entry per phrase, in session order
 */
export const flattenPhrases = (sessions) => sessions.flatMap((session) => session.phrases.map((phrase) => ({
  day: session.day,
  sessionId: session.id,
  time: phrase.t,
  hour: Number(phrase.t.slice(0, 2)),
  cards: phrase.cards
})))

/**
 * How much the app is used.
 * @param {Object[]} sessions sessions
 * @returns {Object} totals: sessions, activeDays, minutes, phrases, taps, avgPhraseLength, avgSessionMinutes, nightSessions
 */
export const overview = (sessions) => {
  const phrases = flattenPhrases(sessions)
  const taps = phrases.reduce((sum, phrase) => sum + phrase.cards.length, 0)
  const minutes = sessions.reduce((sum, session) => sum + minutesOf(session.end) - minutesOf(session.begin), 0)

  return {
    sessions: sessions.length,
    activeDays: new Set(sessions.map((session) => session.day)).size,
    minutes,
    phrases: phrases.length,
    taps,
    avgPhraseLength: phrases.length ? round2(taps / phrases.length) : 0,
    avgSessionMinutes: sessions.length ? round2(minutes / sessions.length) : 0,
    nightSessions: sessions.filter((session) => session.begin < NIGHT_BEFORE).length
  }
}

/**
 * Sessions, phrases and minutes for every day of the period, including days without use.
 * @param {Object[]} sessions sessions
 * @param {string} start first day
 * @param {string} end last day
 * @returns {Object[]} [{ day, weekday, sessions, phrases, minutes }]
 */
export const dailySeries = (sessions, start, end) => {
  const series = new Map(daysBetween(start, end).map((day) => [day, { day, weekday: weekdayOf(day), sessions: 0, phrases: 0, minutes: 0 }]))
  for (const session of sessions) {
    const entry = series.get(session.day)
    if (entry) {
      entry.sessions += 1
      entry.phrases += session.phrases.length
      entry.minutes += minutesOf(session.end) - minutesOf(session.begin)
    }
  }

  return [...series.values()]
}

/**
 * When: number of phrases per weekday (Monday first) and hour.
 * @param {Object[]} phrases flattened phrases
 * @returns {Array<Array<number>>} 7 rows of 24 counts
 */
export const hourWeekdayMatrix = (phrases) => {
  const matrix = Array.from({ length: 7 }, () => new Array(24).fill(0))
  for (const phrase of phrases) {
    matrix[weekdayOf(phrase.day)][phrase.hour] += 1
  }

  return matrix
}

/**
 * Progress: per week, how many phrases, how many different cards and the mean phrase length.
 * @param {Object[]} phrases flattened phrases
 * @returns {Object[]} [{ week (Monday), phrases, distinctCards, avgPhraseLength }] in date order
 */
export const weeklyTrend = (phrases) => {
  const weeks = new Map()
  for (const phrase of phrases) {
    const week = mondayOf(phrase.day)
    const entry = weeks.get(week) || { week, phrases: 0, taps: 0, cards: new Set() }
    entry.phrases += 1
    entry.taps += phrase.cards.length
    phrase.cards.forEach((card) => entry.cards.add(card.id))
    weeks.set(week, entry)
  }

  return [...weeks.values()]
    .sort((a, b) => (a.week < b.week ? -1 : 1))
    .map((entry) => ({
      week: entry.week,
      phrases: entry.phrases,
      distinctCards: entry.cards.size,
      avgPhraseLength: round2(entry.taps / entry.phrases)
    }))
}

/**
 * Which tabs are used: card taps and phrases touching each tab. Tabs never used appear with 0.
 * @param {Object[]} phrases flattened phrases
 * @param {Object} inventory the user's tabs and cards
 * @returns {Object[]} [{ name, taps, phrases, share }] most used first (share = taps / all taps)
 */
export const tabUsage = (phrases, inventory) => {
  const usage = new Map(inventory.tabs.map((tab) => [tab.name, { name: tab.name, taps: 0, phrases: 0 }]))
  let total = 0
  for (const phrase of phrases) {
    for (const card of phrase.cards) {
      const entry = usage.get(card.tab) || usage.set(card.tab, { name: card.tab, taps: 0, phrases: 0 }).get(card.tab)
      entry.taps += 1
      total += 1
    }
    new Set(phrase.cards.map((card) => card.tab)).forEach((tab) => { usage.get(tab).phrases += 1 })
  }

  return [...usage.values()]
    .map((entry) => ({ ...entry, share: total ? round2(entry.taps / total) : 0, key: entry.name, count: entry.taps }))
    .sort(byCountThenKey)
    .map(({ key, count, ...entry }) => entry)
}

/**
 * Which cards are used: taps, number of days used, last day, tabs where the card is. Never used cards appear with 0.
 * @param {Object[]} phrases flattened phrases
 * @param {Object} inventory the user's tabs and cards
 * @returns {Object[]} [{ id, label, imageUrl, tabs, count, daysUsed, lastDay }] most used first
 */
export const cardUsage = (phrases, inventory) => {
  const usage = new Map()
  for (const tab of inventory.tabs) {
    for (const card of tab.cards) {
      const entry = usage.get(card.id) || { id: card.id, label: card.label, imageUrl: card.imageUrl, tabs: [], count: 0, days: new Set(), lastDay: null }
      entry.tabs.push(tab.name)
      usage.set(card.id, entry)
    }
  }
  for (const phrase of phrases) {
    for (const card of phrase.cards) {
      const entry = usage.get(card.id)
      entry.count += 1
      entry.days.add(phrase.day)
      entry.lastDay = !entry.lastDay || phrase.day > entry.lastDay ? phrase.day : entry.lastDay
    }
  }

  return [...usage.values()]
    .map(({ days, ...entry }) => ({ ...entry, daysUsed: days.size, key: entry.id }))
    .sort(byCountThenKey)
    .map(({ key, ...entry }) => entry)
}

/**
 * Split card usage into the most used, the least used (used, but rarely) and the never used cards.
 * @param {Object[]} usage result of cardUsage
 * @param {number} n size of each list
 * @returns {{ top: Object[], bottom: Object[], neverUsed: Object[] }} lists of cards
 */
export const rankCards = (usage, n = 20) => {
  const used = usage.filter((card) => card.count > 0)

  return {
    top: used.slice(0, n),
    bottom: used.slice(-n).reverse(),
    neverUsed: usage.filter((card) => card.count === 0)
  }
}

/**
 * Which complete phrases recur.
 * @param {Object[]} phrases flattened phrases
 * @param {{ minCount: number, minLength: number }} options minimum number of occurrences and of cards
 * @returns {Object[]} [{ cards: [id], count, lastDay }] most frequent first
 */
export const phraseFrequency = (phrases, { minCount = 2, minLength = 1 } = {}) => {
  const counts = new Map()
  for (const phrase of phrases) {
    const key = phrase.cards.map((card) => card.id).join(' ')
    const entry = counts.get(key) || { key, cards: phrase.cards.map((card) => card.id), count: 0, lastDay: phrase.day }
    entry.count += 1
    entry.lastDay = phrase.day > entry.lastDay ? phrase.day : entry.lastDay
    counts.set(key, entry)
  }

  return [...counts.values()]
    .filter((entry) => entry.count >= minCount && entry.cards.length >= minLength)
    .sort(byCountThenKey)
    .map(({ key, ...entry }) => entry)
}

/**
 * Which sequences of n consecutive cards recur inside phrases (every occurrence counts).
 * With n = 2 this also gives the "card followed by card" transitions.
 * @param {Object[]} phrases flattened phrases
 * @param {number} n sequence length
 * @param {number} minSupport minimum number of occurrences
 * @returns {Object[]} [{ cards: [id], count }] most frequent first
 */
export const ngrams = (phrases, n, minSupport = 3) => {
  const counts = new Map()
  for (const phrase of phrases) {
    const ids = phrase.cards.map((card) => card.id)
    for (let i = 0; i + n <= ids.length; i++) {
      const gram = ids.slice(i, i + n)
      const key = gram.join(' ')
      const entry = counts.get(key) || { key, cards: gram, count: 0 }
      entry.count += 1
      counts.set(key, entry)
    }
  }

  return [...counts.values()]
    .filter((entry) => entry.count >= minSupport)
    .sort(byCountThenKey)
    .map(({ key, ...entry }) => entry)
}
