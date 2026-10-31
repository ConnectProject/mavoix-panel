import Parse from 'parse'

import { i18n } from '~/boot/i18n.js'
import AssetModel from '~/models/Asset'
import TabModel from '~/models/Tab'
import TabItemModel from '~/models/TabItem'
import arasaacIdFromUrl from '~/utils/arasaacId'
import getCurrentUserId from '~/utils/getCurrentUserId'
import { pictogramLang } from '~/utils/pictogramLanguage'

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

const DEFAULT_TAB_COLOR = '#8BC34A'
const DEFAULT_TAB_ICON = 'directions_run'

/**
 * First public pictogram whose label, in the given language, is exactly `word` (same catalog as Images).
 * @param {Array} publicImages global.images from state
 * @param {string} word label to look for
 * @param {string} lang two-letter language code
 * @returns {{ url: string }|undefined} matching catalog entry or undefined
 */
const findPublicEntry = (publicImages, word, lang) =>
  publicImages.find((img) =>
    img.names && Array.isArray(img.names[lang]) && img.names[lang].some((n) => n.toLowerCase() === word.toLowerCase())
  )

/**
 * If the user has no tabs, create the default tab and link its drink image when it exists.
 * @param {Context} ctx vuex context
 * @returns {Promise<void>} resolves when tabs are refreshed or nothing to do
 */
export const ensureDefaultTabIfEmpty = async ({ dispatch, state, getters, rootState, commit }) => {
  // while the tabs are still loading the list is empty even if the user has tabs
  if (state.loading || getters.tabs.length > 0) {
    return
  }

  const userId = getCurrentUserId()
  const g = rootState.global
  const tab = await TabModel.Create(i18n.t('tabSettings.defaultTabName'), userId, DEFAULT_TAB_COLOR, DEFAULT_TAB_ICON, {
    speed: typeof g.ttsSpeed === 'number' ? g.ttsSpeed : 1,
    language: (g.ttsLanguage || 'fr-FR').replace(/-/g, '_'),
    imageSize: g.imageSize === 'small' || g.imageSize === 'large' ? g.imageSize : 'medium'
  }).save()

  const itemName = i18n.t('tabSettings.defaultItemName')
  const entry = findPublicEntry(rootState.global.images, itemName, pictogramLang(g.ttsLanguage))
  if (entry && entry.url) {
    const drinkAsset = await AssetModel.New(itemName, false, entry.url, userId, { arasaacId: arasaacIdFromUrl(entry.url) }).save()
    commit('assetsManager/addAsset', drinkAsset, { root: true })
    await TabItemModel.Create(itemName, drinkAsset, tab, false, true, 0).save()
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
