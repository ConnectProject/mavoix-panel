import Parse from 'parse'

import TabModel from '~/models/Tab'

/**
 * Load tabs
 * @param {Context} ctx
 */
export const loadTabs = ({ commit }) => {
  console.log('load tabs')
  new Parse.Query(TabModel)
    .find()
    .then((tabs) => {
      commit('setTabs', tabs)
    })
    .catch((err) => {
      commit('setError', err)
    })
}

/**
 * Create a tab
 * @param {Context} ctx
 * @param {{ String, Function }} {
 *  name: the name of the new tab,
 *  callback: function to call when tab's been created
 * }
 */
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

/**
 * Delete a tab
 * @param {Context} ctx
 * @param {{ Tab, Function }} {
 *  tab: the tab object to delete,
 *  callback: function to call when tab's been deleted
 * }
 */
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
