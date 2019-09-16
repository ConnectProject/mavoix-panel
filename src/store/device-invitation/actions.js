import Parse from 'parse'

export const create = ({ commit }) => {
  let newUser = new Parse.User()

  newUser.set('username', 'test')
  newUser.set('password', 'password')

  newUser.signUp()
    .catch((err) => {
      throw err
    })
    .then((res) => {
      console.log(res)
    })
}
