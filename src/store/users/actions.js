import Parse from 'parse'
import ParseUser, { USERNAME_KEY } from '~/models/ParseUser'

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
    .equalTo('id', localStorage.id)
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
  console.log(name)
  console.log(password)
  const parseUser = ParseUser.Create(name, password)
  parseUser
    .signUp()
    .catch((err) => {
      commit('setError', err)
    })
    .then((model) => {
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
      localStorage.id = model._getId()
      commit('addAndOpenDevice', { model })
    })
}

/**
 * Create a new password for the opened device
 * @param {Context} ctx
 */
export const resetActive = ({ commit, getters: { active } }) => {
  new Parse.Query(ParseUser)
    .equalTo(USERNAME_KEY, active.name)
    .first()
    .catch((err) => {
      commit('setError', err)
    })
    .then((model) => {
      const password = ParseUser.Password()
      model.setPassword(password)

      model.save()
        .catch((err) => {
          commit('setError', err)
        })
        .then(() => {
          commit('updateActivePassword', password)
        })
    })
}

/**
 * Delete the opened device
 * @param {Context} ctx
 */
export const deleteActive = ({ commit, getters: { active } }) => {
  new Parse.Query(ParseUser)
    .equalTo(USERNAME_KEY, active.name)
    .first()
    .catch((err) => {
      commit('setError', err)
    })
    .then((user) => {
      user.destroy()
        .catch((err) => {
          commit('setError', err)
        })
        .then(() => {
          commit('removeActive')
        })
    })
}
