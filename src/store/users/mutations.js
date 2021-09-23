// /**
//  * Set current user to the store
//  * @param {State} state vuex state
//  * @param {{ ParseUser }} {
//  *   user: the connected user
//  * }
//  * @returns {void}
//  */
// export const setUser = (state, { user }) => {
//   state.user.name = user.getUsername()
//   state.user.id = user.id
//   // state.isConnected = true
// }

export const setConnectUserId = function (state, connectUserId) {
  state.connectUserId = connectUserId
  state.loading = false
}

/**
 * Used to throw an error
 * @param {State} state vuex state
 * @param {Error} err is the error to set
 * @returns {void}
 */
export const setError = (state, err) => {
  console.error(err.message)
  state.error = err.message
}

/**
 * Used to reset a thrown error so that it can be thrown again
 * @param {State} state vuex state
 * @returns {void}
 */
export const resetError = (state) => {
  state.error = null
}
