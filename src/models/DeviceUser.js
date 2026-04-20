// does not seem to be used anymore

import Parse from 'parse'

/*
** Represents a device invitation generated to allow an external device to access to data.
*/
export default class DeviceUser extends Parse.User {
  constructor () {
    super('DeviceUser')
  }

  static New (devicename, password, username, id) {
    const newDeviceUser = new DeviceUser()
    newDeviceUser.setUsername(username)
    newDeviceUser.setPassword(password)
    newDeviceUser.set('linkedAccount', id)
    newDeviceUser.set('deviceName', devicename)

    return newDeviceUser
  }

  static Create (username, id) {
    return DeviceUser.New(username, DeviceUser.Password(), DeviceUser.Username(), id)
  }

  static Username () {
    return DeviceUser.ReadableCode(6)
  }

  static Password () {
    return DeviceUser.ReadableCode(4)
  }

  static ReadableCode (length) {
    const readableChars = '23456789abcdefghjkmnpqrstuvwxyz'
    let value = ''

    for (let i = 0; i < length; i++) {
      value += readableChars.charAt(Math.floor(Math.random() * readableChars.length))
    }

    return value
  }
}
