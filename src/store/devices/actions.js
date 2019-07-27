import Parse from 'parse'

import DeviceModel from '~/models/Device'

export const loadDevices = ({ commit }) => {
  new Parse.Query(DeviceModel)
    .find()
    .then((devices) => {
      commit('setDevices', devices)
    })
    .catch((err) => {
      commit('setError', err)
    })
}
