import Parse from 'parse'

import DeviceUser, { USERNAME_KEY } from '~/models/DeviceUser'

/**
 * Load devices
 * @param {Context} ctx
 */
export const loadDevices = ({ commit }) => {
  new Parse.Query(DeviceUser)
  // .find({  })
    .find()
    .catch((err) => {
      commit('setError', err)
    })
    .then((users) => {
      commit('setDevices', users)
    })
}

/**
 * Create a new device and open the model to view it
 * @param {Context} ctx
 * @param {String} name name of the new device
 */
export const create = ({ commit }, name) => {
  const deviceUser = DeviceUser.Create(name)
  const password = deviceUser.get('password')

  deviceUser
    .signUp()
    .catch((err) => {
      commit('setError', err)
    })
    .then((model) => {
      commit('addAndOpenDevice', { model, password })
    })
}

/**
 * Create a new password for the opened device
 * @param {Context} ctx
 */
export const resetActive = ({ commit, getters: { active } }) => {
  new Parse.Query(DeviceUser)
    .equalTo(USERNAME_KEY, active.name)
    .first()
    .catch((err) => {
      commit('setError', err)
    })
    .then((model) => {
      const password = DeviceUser.Password()
      model.setPassword(password)

      model.save()
        .catch((err) => {
          commit('setError', err)
        })
        .then(() => {
          commit('updateActivePassword', password)
        })
    })
}

/**
 * Delete the opened device
 * @param {Context} ctx
 */
export const deleteActive = ({ commit, getters: { active } }) => {
  new Parse.Query(DeviceUser)
    .equalTo(USERNAME_KEY, active.name)
    .first()
    .catch((err) => {
      commit('setError', err)
    })
    .then((user) => {
      user.destroy()
        .catch((err) => {
          commit('setError', err)
        })
        .then(() => {
          commit('removeActive')
        })
    })
}
