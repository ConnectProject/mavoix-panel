// all the devices module is no longer used

import Parse from 'parse'

import DeviceUser from '~/models/DeviceUser'
import getCurrentUserId from '~/utils/getCurrentUserId'

/**
 * Load devices
 * @param {Context} ctx context passed vuex
 * @returns {Promise} did the action succeed
 */
export const loadDevices = ({ commit }) => {
  new Parse.Query(DeviceUser).find()
    .then((users) => console.log(users))

  new Parse.Query(DeviceUser)
    .equalTo('linkedAccount', getCurrentUserId())
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
    const deviceUser = DeviceUser.Create(name, getCurrentUserId())
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
    await Parse.Cloud.run('resetDevice', params)
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
    await Parse.Cloud.run('removeDevice', { username: active.username })
    commit('removeActive')
  } catch (err) {
    commit('setError', err)
  }
}

/**
 * Load the last status (battery, last seen) reported by the devices of the account
 * @param {Context} ctx context passed vuex
 * @returns {Promise} resolves when loaded; errors are ignored (the next refresh will retry)
 */
export const loadStatuses = async ({ commit }) => {
  try {
    const rows = await new Parse.Query('DeviceStatus').equalTo('user', getCurrentUserId())
      .find()
    const statuses = {}
    rows.forEach((row) => {
      statuses[row.get('device')] = { level: row.get('level'), charging: row.get('charging'), seenAt: row.get('seenAt') }
    })
    commit('setStatuses', statuses)
  } catch (err) {
    console.error('device status not loaded:', err)
  }
}
