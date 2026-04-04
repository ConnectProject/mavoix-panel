import Parse from 'parse'

import AssetModel from '~/models/Asset'
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
const DEFAULT_ITEM_NAME = 'Boire'

/**
 * First public pictogram whose French label is exactly "boire" (same catalog as Images).
 * @param {Array} publicImages global.images from state
 * @returns {{ url: string }|undefined} matching catalog entry or undefined
 */
const findBoirePublicEntry = (publicImages) =>
  publicImages.find((img) =>
    img.names && Array.isArray(img.names.fr) && img.names.fr.some((n) => n.toLowerCase() === 'boire')
  )

/**
 * If the user has no tabs, create default "Activités" tab and link "Boire" image when it exists.
 * @param {Context} ctx vuex context
 * @returns {Promise<void>} resolves when tabs are refreshed or nothing to do
 */
export const ensureDefaultTabIfEmpty = async ({ dispatch, getters, rootState, commit }) => {
  if (getters.tabs.length > 0) {
    return
  }

  const userId = getCurrentUserId()
  const g = rootState.global
  const tab = await TabModel.Create(DEFAULT_TAB_NAME, userId, DEFAULT_TAB_COLOR, DEFAULT_TAB_ICON, {
    speed: typeof g.ttsSpeed === 'number' ? g.ttsSpeed : 1,
    language: (g.ttsLanguage || 'fr-FR').replace(/-/g, '_'),
    imageSize: g.imageSize === 'small' || g.imageSize === 'large' ? g.imageSize : 'medium'
  }).save()

  const entry = findBoirePublicEntry(rootState.global.images)
  if (entry && entry.url) {
    const boireAsset = await AssetModel.New(DEFAULT_ITEM_NAME, false, entry.url, userId).save()
    commit('assetsManager/addAsset', boireAsset, { root: true })
    await TabItemModel.Create(DEFAULT_ITEM_NAME, boireAsset, tab, false, true, 0).save()
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
export const createTabCb = ({ commit, rootState }, { name, hexColor, icon, callback }) => {
  const g = rootState.global
  TabModel.Create(name, getCurrentUserId(), hexColor, icon, {
    speed: typeof g.ttsSpeed === 'number' ? g.ttsSpeed : 1,
    language: (g.ttsLanguage || 'fr-FR').replace(/-/g, '_'),
    imageSize: g.imageSize === 'small' || g.imageSize === 'large' ? g.imageSize : 'medium'
  })
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
