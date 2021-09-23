import Parse from 'parse'

import TabModel from '~/models/Tab'
import getCurrentUserId from '~/utils/getCurrentUserId'

/**
 * Load tabs
 * @param {Context} ctx context passed vuex
 * @returns {Promise} did the action succeed
 */
export const loadTabs = ({ commit }) => {
  console.log('load tabs')
  new Parse.Query(TabModel)
    .equalTo('user', getCurrentUserId())
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
 * @param {Context} ctx context passed vuex
 * @param {{ String, Function }} {
 *  name: the name of the new tab,
 *  callback: function to call when tab's been created
 * }
 * @returns {Promise} did the action succeed
 */
export const createTabCb = ({ commit }, { name, callback }) => {
  TabModel.Create(name, getCurrentUserId())
    .save()
    .then((tab) => {
      if (tab) {
        commit('addTab', tab)

        return callback(tab)
      }
    })
    .catch((err) => {
      commit('setError', err)
    })
}

/**
 * Delete a tab
 * @param {Context} ctx context passed vuex
 * @param {{ Tab, Function }} {
 *  tab: the tab object to delete,
 *  callback: function to call when tab's been deleted
 * }
 * @returns {Promise} did the action succeed
 */
export const deleteTabCb = ({ commit }, { tab, callback }) => {
  const { id } = tab

  tab.destroy()
    .then(() => {
      commit('removeTabById', id)
      callback()
    })
    .catch((err) => {
      commit('setError', err)
    })
}
