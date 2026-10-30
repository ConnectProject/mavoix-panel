import Parse from 'parse'

import ParseUser from '~/models/ParseUser'
import { connectRedirectUri } from '~/utils/connect'

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

export const loadConnectUserId = async function ({ commit }) {
  try {
    const { connectUserId } = await Parse.Cloud.run('getConnectToken')
    commit('setConnectUserId', connectUserId)
  } catch (err) {
    commit('setConnectUserId', null)
    commit('setError', err)
  }
}

export const unlinkFromConnect = async function ({ commit }) {
  try {
    await Parse.Cloud.run('unlinkFromConnect')
    commit('setConnectUserId', null)
  } catch (err) {
    commit('setError', err)
  }
}

/**
 * Link the account with Connect using the code Connect sent back to the panel
 * @param {Context} ctx context passed vuex
 * @param {String} authorizationCode code from the redirect url
 * @returns {Promise<String|null>} null when linked, else the error message
 */
export const linkWithConnect = async function ({ commit }, authorizationCode) {
  try {
    const { connectUserId } = await Parse.Cloud.run('linkWithConnect', {
      authorizationCode,
      redirectUri: connectRedirectUri()
    })
    commit('setConnectUserId', connectUserId)

    return null
  } catch (err) {
    console.error(err)

    return err.message
  }
}
