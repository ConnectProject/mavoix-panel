import Parse from 'parse'

import DeviceUser from '~/models/DeviceUser'

export const loadDevices = ({ commit }) => {
  new Parse.Query(DeviceUser)
    .find()
    .catch((err) => {
      commit('setError', err)
    })
    .then((users) => {
      commit('setDevices', users)
    })
}

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

export const deleteActive = ({ commit, getters: { active } }) => {
  new Parse.Query(DeviceUser)
    .equalTo('username', active.name)
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
