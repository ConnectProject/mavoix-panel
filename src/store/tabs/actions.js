import Parse from 'parse'

import TabModel from '~/models/Tab'

export const loadTabs = ({ commit }) => {
  new Parse.Query(TabModel)
    .find()
    .then((tabs) => {
      commit('setTabs', tabs)
    })
    .catch((err) => {
      commit('setError', err)
    })
}

export const createTabCb = ({ commit }, { name, callback }) => {
  TabModel.Create(name)
    .save()
    .then((tab) => {
      if (tab) {
        commit('addTab', tab)
        callback(tab)
      }
    })
    .catch((err) => {
      commit('setError', err)
    })
}

export const deleteTabCb = ({ commit }, { tab, callback }) => {
  const id = tab.id

  tab.destroy()
    .then(() => {
      commit('removeTabById', id)
      callback()
    })
    .catch((err) => {
      commit('setError', err)
    })
}
