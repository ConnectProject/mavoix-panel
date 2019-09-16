import Parse from 'parse'

export const NAME_KEY = 'username'
export const PASSWORD_KEY = 'password'
export const PARENT_KEY = 'parent'

export default class InvitedUser extends Parse.User {
  constructor () {
    super('InvitedUser')
  }

  static New (name, password, parent) {
    const newInvitedUser = new InvitedUser()

    newInvitedUser
      .set(NAME_KEY, name)
      .set(PASSWORD_KEY, password)
      .set(PARENT_KEY, parent)
    return newInvitedUser
  }
}
