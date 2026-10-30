/* eslint-disable no-shadow */

/**
 * @param {State} state vuex state
 * @param {boolean} loading true while loading
 * @returns {void}
 */
export const setLoading = (state, loading) => {
  state.loading = loading
}

/**
 * @param {State} state vuex state
 * @param {Error|null} error error or null
 * @returns {void}
 */
export const setError = (state, error) => {
  state.error = error
  state.loading = false
}

/**
 * @param {State} state vuex state
 * @param {Object} data usage data of the current user
 * @returns {void}
 */
export const setData = (state, data) => {
  state.data = data
  state.loading = false
  state.error = null
}

/**
 * @param {State} state vuex state
 * @param {number} days number of days to show, 0 for everything since the first use
 * @returns {void}
 */
export const setPeriodDays = (state, days) => {
  state.periodDays = days
}
