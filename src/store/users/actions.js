import Parse from 'parse'
import ParseUser from '~/models/ParseUser'

/**
 * Load devices
 * @param {Context} ctx context passed vuex
 */
// does not seem to be used
// export const loadUsers = ({ commit }) => {
//   new Parse.Query(ParseUser)
//     .find()
//     .then((users) => {
//       commit('setDevices', users)
//     })
//     .catch((err) => {
//       commit('setError', err)
//     })
// }

// does not seem to be used
// export const currentUser = ({ commit }) => {
//   new Parse.Query(ParseUser)
//     .equalTo('id', LocalStorage.id)
//     .find()
//     .then((user) => {
//       console.log(user)
//       commit('addAndOpenDevice', { user })
//     })
//     .catch((err) => {
//       commit('setError', err)
//     })
// }

/**
 * Create a new device and open the model to view it
 * @param {Context} ctx context passed vuex
 * @param {String} name name of the new device
 */

export const create = async function ({ commit }, [name, password]) {
  try {
    await ParseUser.Create(name, password).signUp()
    // commit('setUser', { user })
    // eslint-disable-next-line no-invalid-this
    this.$router.push({ name: 'home' })
  } catch (err) {
    commit('setError', err)
  }
}

export const connect = async function ({ commit, dispatch }, [name, password]) {
  try {
    await ParseUser.logIn(name, password)
    // commit('setUser', { user })
    // eslint-disable-next-line no-invalid-this
    this.$router.push({ name: 'home' })
  } catch (err) {
    commit('setError', err)
  }
}

export const loadConnectUserId = async function({commit}) {
  try {
    const {connectUserId} = await Parse.Cloud.run("getConnectToken")
    commit('setConnectUserId', connectUserId)
  } catch (err) {
    commit('setError', err)
  }
}
