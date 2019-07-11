import Parse from 'parse'
import randomString from '~/utils/randomString'

export const TOKEN_KEY = 'token'

export default class DeviceInvitationModel extends Parse.Object {
  constructor () {
    super('DeviceInvitation')
  }

  static New (token) {
    const newDeviceInvitation = new DeviceInvitationModel()

    newDeviceInvitation.set(TOKEN_KEY, token)
    return newDeviceInvitation
  }

  static Create () {
    return DeviceInvitationModel.New(randomString(16))
  }
}
