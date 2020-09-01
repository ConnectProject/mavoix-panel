import Parse from 'parse'
import randomString from '~/utils/randomString'

export const USERNAME_KEY = 'username'

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
    return DeviceUser.New(username, DeviceUser.Password(), DeviceUser.Password(), id)
  }

  static Password () {
    return randomString(16)
  }
}
