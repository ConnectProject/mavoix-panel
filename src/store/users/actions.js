import Parse from 'parse'
import ParseUser from '~/models/ParseUser'
/**
 * Load devices
 * @param {Context} ctx
 */
export const loadUsers = ({ commit }) => {
  new Parse.Query(ParseUser)
    .find()
    .then((users) => {
      commit('setDevices', users)
    })
    .catch((err) => {
      commit('setError', err)
    })
}

export const currentUser = ({ commit }) => {
  new Parse.Query(ParseUser)
    .equalTo('id', LocalStorage.id)
    .find()
    .then((user) => {
      console.log(user)
      commit('addAndOpenDevice', { user })
    })
    .catch((err) => {
      commit('setError', err)
    })
}

/**
 * Create a new device and open the model to view it
 * @param {Context} ctx
 * @param {String} name name of the new device
 */

export const create = ({ commit }, [name, password]) => {
  const parseUser = ParseUser.Create(name, password)
  parseUser
    .signUp()
    .then((model) => {
      localStorage.id = model._getId()
      localStorage.username = name
      localStorage.password = password
      commit('addAndOpenDevice', { model })
    })
    .catch((err) => {
      commit('setError', err)
    })
}

export const connect = ({ commit }, [name, password]) => {
  const parseUser = ParseUser.logIn(name, password)
  parseUser
    .then((model) => {
      localStorage.id = model._getId()
      localStorage.username = name
      localStorage.password = password
      commit('addAndOpenDevice', { model })
    })
    .catch((err) => {
      commit('setError', err)
    })
}
