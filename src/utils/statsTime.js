/*
 * Date helpers and time-bucketed series of the stats panel. Days are 'YYYY-MM-DD' strings, handled in UTC
 * arithmetic so that daylight saving time never shifts a day.
 */

const DAY_MS = 86400000
const MAX_DAY_COLUMNS = 62 // up to two months: one column per day
const MAX_WEEK_COLUMNS = 548 // up to about 18 months: one column per week, then one per month

/**
 * @param {string} hhmm time 'HH:MM' (seconds ignored)
 * @returns {number} minutes since midnight
 */
export const minutesOf = (hhmm) => Number(hhmm.slice(0, 2)) * 60 + Number(hhmm.slice(3, 5))

/**
 * @param {string} day 'YYYY-MM-DD'
 * @param {number} offset number of days to add
 * @returns {string} shifted day
 */
export const addDays = (day, offset) => new Date(Date.parse(`${day}T00:00:00Z`) + offset * DAY_MS).toISOString()
  .slice(0, 10)

/**
 * @param {string} day 'YYYY-MM-DD'
 * @returns {number} weekday, Monday = 0 ... Sunday = 6
 */
export const weekdayOf = (day) => (new Date(`${day}T00:00:00Z`).getUTCDay() + 6) % 7

/**
 * @param {string} day 'YYYY-MM-DD'
 * @returns {string} the Monday of the week containing the day
 */
export const mondayOf = (day) => addDays(day, -weekdayOf(day))

/**
 * @param {string} start first day, included
 * @param {string} end last day, included
 * @returns {string[]} every day of the range
 */
export const daysBetween = (start, end) => {
  const days = []
  for (let day = start; day <= end; day = addDays(day, 1)) {
    days.push(day)
  }

  return days
}

/**
 * @param {string} start first day
 * @param {string} end last day
 * @returns {'day'|'week'|'month'} the coarsest unit that keeps the timeline readable
 */
export const timeUnit = (start, end) => {
  const days = daysBetween(start, end).length
  if (days <= MAX_DAY_COLUMNS) {
    return 'day'
  }

  return days <= MAX_WEEK_COLUMNS ? 'week' : 'month'
}

/**
 * @param {string} day 'YYYY-MM-DD'
 * @param {'day'|'week'|'month'} unit bucket size
 * @returns {string} first day of the bucket containing the day
 */
export const bucketOf = (day, unit) => {
  if (unit === 'month') {
    return `${day.slice(0, 7)}-01`
  }

  return unit === 'week' ? mondayOf(day) : day
}

/**
 * Sessions, active days, phrases and minutes for every bucket of the period, including buckets without use.
 * @param {Object[]} sessions sessions
 * @param {string} start first day
 * @param {string} end last day
 * @param {'day'|'week'|'month'} unit bucket size
 * @returns {Object[]} [{ key (first day of the bucket), sessions, activeDays, phrases, minutes }] in date order
 */
export const timeSeries = (sessions, start, end, unit) => {
  const series = new Map()
  for (const day of daysBetween(start, end)) {
    const key = bucketOf(day, unit)
    series.set(key, series.get(key) || { key, sessions: 0, activeDays: 0, phrases: 0, minutes: 0, days: new Set() })
  }
  for (const session of sessions) {
    const entry = series.get(bucketOf(session.day, unit))
    if (entry) {
      entry.sessions += 1
      entry.phrases += session.phrases.length
      entry.minutes += minutesOf(session.end) - minutesOf(session.begin)
      entry.days.add(session.day)
    }
  }

  return [...series.values()].map(({ days, ...entry }) => ({ ...entry, activeDays: days.size }))
}
