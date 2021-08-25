// all the devices module is no longer used

import DeviceUser from '~/models/DeviceUser'
import Parse from 'parse'
import getCurrentUser from '~/utils/getCurrentUser'

/**
 * Load devices
 * @param {Context} ctx context passed vuex
 * @returns {Promise} did the action succeed
 */
export const loadDevices = ({ commit }) => {

  new Parse.Query(DeviceUser)
    .equalTo('linkedAccount', getCurrentUser())
    .find()
    .then((users) => {
      commit('setDevices', users)
    })
    .catch((err) => {
      commit('setError', err)
    })
}

/**
 * Create a new device and open the model to view it
 * @param {Context} ctx context passed vuex
 * @param {String} name name of the new device
 * @returns {Promise} did the action succeed
 */
export const create = async ({ commit }, name) => {
  const sessionToken = Parse.User.current().getSessionToken()
  try {
    const deviceUser = DeviceUser.Create(name, getCurrentUser())
    const password = deviceUser.get('password')
    await deviceUser.signUp()
    Parse.User.become(sessionToken)
    commit('addAndOpenDevice', { deviceUser, password })
  } catch (err) {
    commit('setError', err)
  }
}

/**
 * Create a new password for the opened device
 * @param {Context} ctx context passed vuex
 * @returns {Promise} did the action succeed
 */
export const resetActive = async ({ commit, getters: { active } }) => {
  try {
    const password = DeviceUser.Password()
    const params = { username: active.username, password }
    await Parse.Cloud.run("resetDevice", params)
    commit('updateActivePassword', password)
  } catch (err) {
    commit('setError', err)
  }
}

/**
 * Delete the opened device
 * @param {Context} ctx context passed vuex
 * @returns {Promise} did the action succeed
 */
export const deleteActive = async ({ commit, getters: { active } }) => {
  try {
    await Parse.Cloud.run("removeDevice", { username: active.username })
    commit('removeActive')
  } catch (err) {
    commit('setError', err)
  }
}
