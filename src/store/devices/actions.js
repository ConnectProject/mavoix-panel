import Parse from 'parse'

import DeviceUser, { USERNAME_KEY } from '~/models/DeviceUser'

/**
 * Load devices
 * @param {Context} ctx
 */
export const loadDevices = ({ commit }) => {
  new Parse.Query(DeviceUser)
    .equalTo('linkedAccount', localStorage.id)
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
 * @param {Context} ctx
 * @param {String} name name of the new device
 */
export const create = ({ commit }, name) => {
  const deviceUser = DeviceUser.Create(name, localStorage.id)
  const password = deviceUser.get('password')

  deviceUser
    .signUp()
    .then((model) => {
      commit('addAndOpenDevice', { model, password })
    })
    .catch((err) => {
      commit('setError', err)
    })
}

/**
 * Create a new password for the opened device
 * @param {Context} ctx
 */
export const resetActive = ({ commit, getters: { active } }) => {
  new Parse.Query(DeviceUser)
    .equalTo(USERNAME_KEY, active.name)
    .equalTo('linkedAccount', localStorage.id)
    .first()
    .then((model) => {
      const password = DeviceUser.Password()
      model.setPassword(password)

      return model.save()
        .then(() => {
          commit('updateActivePassword', password)
        })
    })
    .catch((err) => {
      commit('setError', err)
    })
}

/**
 * Delete the opened device
 * @param {Context} ctx
 */
export const deleteActive = ({ commit, getters: { active } }) => {
  new Parse.Query(DeviceUser)
    .equalTo(USERNAME_KEY, active.name)
    .equalTo('linkedAccount', localStorage.id)
    .first()
    .then((user) =>
      user.destroy()
    )
    .then(() => {
      commit('removeActive')
    })
    .catch((err) => {
      commit('setError', err)
    })
}
