import Parse from 'parse'

import DeviceModel from '~/models/Device'

export function loadDevices (context) {
  new Parse.Query(DeviceModel)
    .find()
    .then((devices) => {
      console.log(`Successfully loaded ${devices.length} devices.`)
      context.commit('setDevices', devices)
    })
    .catch((err) => {
      context.commit('setError', err)
    })
}
