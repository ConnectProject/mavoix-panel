/*
 * Builds the "UsageData" shape of statsAggregate.js from what Parse stores.
 *
 * Stored rows (plain objects here; the store action converts Parse objects, scoping every query to the current user):
 *   tab        { id, name }
 *   item       { tabId, assetId, name, imageUrl, order }      (TabItem + its Asset)
 *   session    { sessionId, begin: Date, end: Date }         (class UsageSession)
 *   phrase     { sessionId, timestamp: Date, cards: [{ assetId, tabId, tabName }] }   (class UsagePhrase)
 * Days and times are the viewer's local ones.
 */

const pad = (n) => String(n).padStart(2, '0')

/**
 * @param {Date} date date
 * @returns {string} local day 'YYYY-MM-DD'
 */
export const localDay = (date) => `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`

/**
 * @param {Date} date date
 * @returns {string} local time 'HH:MM:SS'
 */
export const localTime = (date) => `${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`

/**
 * @param {Object[]} tabs tabs of the user
 * @param {Object[]} items tab items of the user
 * @returns {{ tabs: Object[] }} inventory: tabs with their cards
 */
const buildInventory = (tabs, items) => ({
  tabs: tabs.map((tab) => ({
    name: tab.name,
    cards: items
      .filter((item) => item.tabId === tab.id)
      .sort((a, b) => a.order - b.order)
      .map((item) => ({ id: item.assetId, label: item.name, imageUrl: item.imageUrl }))
  }))
})

/**
 * Sessions of the usage rows. A phrase whose session row is missing gets a session spanning its phrases.
 * @param {Object[]} sessions session rows
 * @param {Object[]} phrases phrase rows
 * @returns {Object[]} [{ sessionId, begin: Date, end: Date }]
 */
const completeSessions = (sessions, phrases) => {
  const known = new Map(sessions.map((session) => [session.sessionId, session]))
  for (const phrase of phrases) {
    const session = known.get(phrase.sessionId)
    if (!session) {
      known.set(phrase.sessionId, { sessionId: phrase.sessionId, begin: phrase.timestamp, end: phrase.timestamp })
    } else if (phrase.timestamp > session.end) {
      known.set(phrase.sessionId, { ...session, end: phrase.timestamp })
    }
  }

  return [...known.values()]
}

/**
 * @param {Object} phrase phrase row
 * @param {Map} tabNames tab id -> current tab name
 * @returns {Object} phrase as { t, cards: [{ id, tab }] }, the tab being named as it is today when it still exists
 */
const toPhrase = (phrase, tabNames) => ({
  t: localTime(phrase.timestamp),
  cards: phrase.cards.map((card) => ({ id: card.assetId, tab: tabNames.get(card.tabId) || card.tabName }))
})

/**
 * @param {Object} session session { sessionId, begin, end }
 * @returns {Date} end of the session, cut at 23:59 when it runs past midnight so that its duration stays inside its day
 */
const endWithinDay = (session) => {
  const { begin } = session

  return localDay(session.end) === localDay(begin)
    ? session.end
    : new Date(begin.getFullYear(), begin.getMonth(), begin.getDate(), 23, 59)
}

/**
 * @param {Object[]} phrases phrase rows
 * @returns {Map} session id -> its phrases, oldest first
 */
const groupBySession = (phrases) => {
  const groups = new Map()
  for (const phrase of [...phrases].sort((a, b) => a.timestamp - b.timestamp)) {
    groups.set(phrase.sessionId, [...(groups.get(phrase.sessionId) || []), phrase])
  }

  return groups
}

/**
 * @param {{ tabs: Object[], items: Object[], sessions: Object[], phrases: Object[], end: string }} rows stored rows and the last day of the period (today)
 * @returns {Object} UsageData; its period starts on the first day of recorded use, so the timeline covers the whole history
 */
export const buildUsageData = ({ tabs, items, sessions, phrases, end }) => {
  const tabNames = new Map(tabs.map((tab) => [tab.id, tab.name]))
  const groups = groupBySession(phrases)
  const completed = completeSessions(sessions, phrases).sort((a, b) => a.begin - b.begin)

  return {
    period: { start: completed.length ? localDay(completed[0].begin) : end, end },
    inventory: buildInventory(tabs, items),
    sessions: completed.map((session) => ({
      id: session.sessionId,
      day: localDay(session.begin),
      begin: localTime(session.begin).slice(0, 5),
      end: localTime(endWithinDay(session)).slice(0, 5),
      phrases: (groups.get(session.sessionId) || []).map((phrase) => toPhrase(phrase, tabNames))
    }))
  }
}
