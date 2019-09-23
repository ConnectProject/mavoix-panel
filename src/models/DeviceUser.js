import Parse from 'parse'
import randomString from 'mavoix-core/utils/randomString'

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
    return DeviceUser.New(username, randomString(16))
  }
}
