import TabModel, {
  HEX_COLOR_KEY,
  NAME_KEY,
  SLUG_KEY
} from '~/models/Tab'
import Parse from 'parse'
import getCurrentUserId from '~/utils/getCurrentUserId'
import slugify from '~/utils/slugify'

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
 * @param {{ String, String, String, Function }} {
 *  name: the name of the new tab,
 *  hexColor: optional background color,
 *  icon: optional icon name,
 *  callback: function to call when tab's been created
 * }
 * @returns {Promise} did the action succeed
 */
export const createTabCb = ({ commit }, { name, hexColor, icon, callback }) => {
  const options = {}
  if (hexColor !== null && typeof hexColor !== 'undefined') options.hexColor = hexColor
  if (icon !== null && typeof icon !== 'undefined' && icon !== '') options.icon = icon
  TabModel.Create(name, getCurrentUserId(), options)
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
 * Update a tab's name, color, icon (from bar edit dialog)
 * @param {Context} ctx context passed vuex
 * @param {{ TabModel, String, String, String, Function }} {
 *  tab: Parse tab model to update,
 *  name, hexColor, icon: new values,
 *  callback: function to call when saved
 * }
 * @returns {Promise<void>} resolves when tab is saved
 */
export const updateTabCb = ({ commit, dispatch }, { tab, name, hexColor, icon, callback }) => {
  tab.set(NAME_KEY, name)
  tab.set(HEX_COLOR_KEY, hexColor)
  tab.set(SLUG_KEY, slugify(name))
  const iconProvided = typeof icon !== 'undefined'
  if (iconProvided) {
    if (icon === null || icon === '') {
      tab.unset('icon')
    } else {
      tab.set('icon', icon)
    }
  }
  tab.save()
    .then(() => {
      commit('closeEditDialog')

      return dispatch('loadTabs')
    })
    .then(() => {
      if (typeof callback === 'function') {
        return callback()
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
