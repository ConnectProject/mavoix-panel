import Parse from 'parse'

import AssetModel, { NAME_KEY as ASSET_NAME_KEY } from '~/models/Asset'
import TabModel from '~/models/Tab'
import TabItemModel from '~/models/TabItem'
import getCurrentUserId from '~/utils/getCurrentUserId'

/**
 * Load tabs
 * @param {Context} ctx context passed vuex
 * @returns {Promise} did the action succeed
 */
export const loadTabs = ({ commit }) =>
  new Parse.Query(TabModel)
    .equalTo('user', getCurrentUserId())
    .find()
    .then((tabs) => {
      commit('setTabs', tabs)
    })
    .catch((err) => {
      commit('setError', err)
    })

const DEFAULT_TAB_NAME = 'Activités'
const DEFAULT_TAB_COLOR = '#8BC34A'
const DEFAULT_TAB_ICON = 'directions_run'
const DEFAULT_ITEM_NAME = 'boire'

/**
 * If the user has no tabs, create default "Activités" tab and link "Boire" image when it exists.
 * @param {Context} ctx vuex context
 * @returns {Promise<void>} resolves when tabs are refreshed or nothing to do
 */
export const ensureDefaultTabIfEmpty = async ({ dispatch, getters }) => {
  if (getters.tabs.length > 0) {
    return
  }

  const userId = getCurrentUserId()
  const tab = await TabModel.Create(DEFAULT_TAB_NAME, userId, DEFAULT_TAB_COLOR, DEFAULT_TAB_ICON).save()

  const boire = await new Parse.Query(AssetModel)
    .equalTo('user', userId)
    .equalTo(ASSET_NAME_KEY, DEFAULT_ITEM_NAME)
    .first()

  if (boire) {
    await TabItemModel.Create(DEFAULT_ITEM_NAME, boire, tab, false, true, 0).save()
  }

  await dispatch('loadTabs')
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
export const createTabCb = ({ commit }, { name, hexColor, icon, callback }) => {
  TabModel.Create(name, getCurrentUserId(), hexColor, icon)
    .save()
    .then((tab) => {
      if (tab) {
        commit('addTab', tab)

        return callback(tab)
      }
      throw new Error('Tab not created')
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
