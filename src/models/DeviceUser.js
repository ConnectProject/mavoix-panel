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

  static New (username, password) {
    const newDeviceUser = new DeviceUser()
    newDeviceUser.setUsername(username)
    newDeviceUser.setPassword(password)

    return newDeviceUser
  }

  static Create (username) {
    return DeviceUser.New(username, DeviceUser.Password())
  }

  static Password () {
    return randomString(16)
  }
}
