import Parse from 'parse'
import ParseUser from '~/models/ParseUser'
import { LocalStorage } from 'quasar'
/**
 * Load devices
 * @param {Context} ctx
 */
export const loadUsers = ({ commit }) => {
  new Parse.Query(ParseUser)
    .find()
    .catch((err) => {
      commit('setError', err)
    })
    .then((users) => {
      commit('setDevices', users)
    })
}

export const currentUser = ({ commit }) => {
  new Parse.Query(ParseUser)
    .equalTo('id', LocalStorage.id)
    .find()
    .catch((err) => {
      commit('setError', err)
    })
    .then((user) => {
      console.log(user)
      commit('addAndOpenDevice', { user })
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
    .catch((err) => {
      commit('setError', err)
    })
    .then((model) => {
      LocalStorage.id = model._getId()
      LocalStorage.username = name
      LocalStorage.password = password
      commit('addAndOpenDevice', { model })
    })
}

export const connect = ({ commit }, [name, password]) => {
  const parseUser = ParseUser.logIn(name, password)
  parseUser
    .catch((err) => {
      commit('setError', err)
    })
    .then((model) => {
      LocalStorage.id = model._getId()
      LocalStorage.username = name
      LocalStorage.password = password
      commit('addAndOpenDevice', { model })
    })
}
