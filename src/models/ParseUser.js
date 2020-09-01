import Parse from 'parse'

export const USERNAME_KEY = 'username'

/*
** Represents a device invitation generated to allow an external device to access to data.
*/
export default class ParseUser extends Parse.User {
  constructor () {
    super('ParseUser')
  }

  static New (username, password) {
    const newParseUser = new ParseUser()
    newParseUser.setUsername(username)
    newParseUser.setPassword(password)

    return newParseUser
  }

  static Create (username, password) {
    return ParseUser.New(username, password)
  }
}
