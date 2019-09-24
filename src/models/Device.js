import Parse from 'parse'

import randomHex from '~/utils/randomHex'

export default class DeviceModel extends Parse.Object {
  constructor () {
    super('Device')
  }

  static New (name, hexColor) {
    const newTab = new DeviceModel()

    newTab
      .set('name', name)
      .set('hexColor', hexColor)
      .set('slug', randomHex())
    return newTab
  }

  static Create (name) {
    return DeviceModel.New(name, randomHex())
  }
}
