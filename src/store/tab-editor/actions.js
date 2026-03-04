/* eslint-disable sort-imports -- mixed default+named imports conflict with memberSyntaxSortOrder */
import {
  modelFromAsset
} from '../assets-manager/utils'
import {
  normalizeHexColor,
  tabToModel
} from './utils'
import Parse from 'parse'
import TabModel, {
  HEX_COLOR_KEY,
  ICON_KEY,
  LANGUAGE_KEY,
  NAME_KEY,
  SLUG_KEY,
  SPEED_KEY
} from '~/models/Tab'
import TabItemModel, {
  ASSET_KEY as ITEM_ASSET_KEY,
  AVAILABLE_KEY as ITEM_AVAILABLE_KEY,
  HIDDEN_KEY as ITEM_HIDDEN_KEY,
  KEY_KEY as ITEM_KEY_KEY,
  NAME_KEY as ITEM_NAME_KEY,
  ORDER_KEY as ITEM_ORDER_KEY,
  TAB_KEY as ITEM_TAB_KEY
} from '~/models/TabItem'
import getCurrentUserId from '~/utils/getCurrentUserId'
import slugify from '~/utils/slugify'

/**
 * Save a single tab item (new or update)
 * @param {Object} item item object
 * @param {Object} tabModel Parse tab model
 * @returns {Promise<Parse.Object>} saved item model
 */
const saveTabItem = async (item, tabModel) => {
  const assetModel = await modelFromAsset(item.asset)
  if (!item.key) {
    return TabItemModel.Create(item.name, assetModel, tabModel, item.hidden, item.available, item.order).save()
  }
  const itemModel = await new Parse.Query(TabItemModel)
    .equalTo(ITEM_TAB_KEY, tabModel)
    .equalTo(ITEM_KEY_KEY, item.key)
    .first()
  itemModel.set(ITEM_NAME_KEY, item.name)
  itemModel.set(ITEM_ASSET_KEY, assetModel)
  itemModel.set(ITEM_HIDDEN_KEY, item.hidden)
  itemModel.set(ITEM_AVAILABLE_KEY, item.available)
  itemModel.set(ITEM_ORDER_KEY, item.order)

  return itemModel.save()
}

/**
 * Apply tab fields to tab model and collect save + delete promises
 * @param {Parse.Object} tabModel tab Parse model
 * @param {Object} tab tab state object
 * @param {Object[]} deletedItems deleted items
 * @returns {Promise[]} array of promises (tab save + item destroys)
 */
const applyTabAndScheduleDeletes = (tabModel, tab, deletedItems) => {
  const hexColor = normalizeHexColor(tab.hexColor) || '#cccccc'
  tabModel.set(NAME_KEY, tab.name)
  tabModel.set(HEX_COLOR_KEY, hexColor)
  tabModel.set(SLUG_KEY, slugify(tab.name))
  tabModel.set(SPEED_KEY, tab.speed)
  tabModel.set(LANGUAGE_KEY, tab.language)
  if (tab.icon !== null && typeof tab.icon !== 'undefined' && tab.icon !== '') {
    tabModel.set(ICON_KEY, tab.icon)
  } else {
    tabModel.unset(ICON_KEY)
  }
  const promises = [tabModel.save()]
  deletedItems.forEach((item) => {
    if (item.key) {
      promises.push(new Parse.Query(TabItemModel)
        .equalTo(ITEM_TAB_KEY, tabModel)
        .equalTo(ITEM_KEY_KEY, item.key)
        .first()
        .then((itemModel) => itemModel && itemModel.destroy()))
    }
  })

  return promises
}

/**
 * Persist tab name/color/icon from TabSettings (edit from Tab Editor page).
 * Fetches the Parse tab by current slug, updates and saves, then refreshes tab-editor and tabs list.
 * @param {Context} ctx context passed vuex
 * @param {{ name: string, hexColor: string, icon: string }} payload form values from TabSettings
 * @returns {Promise<void>} resolves when tab is saved and stores refreshed
 */
export const persistTabSettings = async ({ commit, getters, dispatch }, { name, hexColor, icon }) => {
  const { tab } = getters
  const tabModel = await tabToModel(tab)
  const normalizedColor = normalizeHexColor(hexColor) || '#cccccc'

  tabModel.set(NAME_KEY, name)
  tabModel.set(HEX_COLOR_KEY, normalizedColor)
  tabModel.set(SLUG_KEY, slugify(name))
  if (icon !== null && typeof icon !== 'undefined' && icon !== '') {
    tabModel.set(ICON_KEY, icon)
  } else {
    tabModel.unset(ICON_KEY)
  }

  await tabModel.save()
  commit('setTab', tabModel)
  await dispatch('tabs/loadTabs', null, { root: true })
}

/**
 * Load a tab with its slug
 * @param {Context} ctx context passed by vuex
 * @param {String} slug the tab's slug
 * @returns {Promise} Parse query
 */
export const loadBySlug = ({ commit, dispatch }, slug) => {
  new Parse.Query(TabModel)
    .equalTo(SLUG_KEY, slug)
    .equalTo('user', getCurrentUserId())
    .first()
    .then((tabModel) => {
      commit('setTab', tabModel)
      dispatch('fetchItems')
    })
    .catch((err) => {
      commit('setError', err)
    })
}

/**
 * Load every items for the loaded tab
 * @param {Context} ctx context passed by vuex
 * @returns {Promise} fetchItems succeeded
 */
export const fetchItems = ({ commit, getters: { tab } }) => {
  tabToModel(tab)
    .then((tabModel) =>
      new Parse.Query(TabItemModel)
        .equalTo(ITEM_TAB_KEY, tabModel)
        .ascending(ITEM_ORDER_KEY)
        .find()
    )
    .then((itemsModel) => {
      commit('setItems', itemsModel)
    })
    .catch((err) => {
      commit('setError', err)
    })
}

/**
 * Save the tab's modifications
 * @param {Context} ctx context passed vuex
 * @param {Function} callback to call when tab saved
 * @returns {Promise} saveCb succeeded
 */
export const saveCb = async ({ commit, dispatch, getters: { tab, items, deletedItems } }, callback) => {
  try {
    const tabModel = await tabToModel(tab)
    const saveAndDeletePromises = applyTabAndScheduleDeletes(tabModel, tab, deletedItems)

    await Promise.all(saveAndDeletePromises)
    await Promise.all(items.map((item) => saveTabItem(item, tabModel)))

    /* Update tab editor from saved model so new color/name show immediately
       and persist when navigating away and back (no refetch needed) */
    commit('setTab', tabModel)
    commit('clearDeletedItems')
    await dispatch('fetchItems')
    await dispatch('tabs/loadTabs', null, { root: true })

    return callback(tabModel)
  } catch (err) {
    commit('setError', err)
  }
}

/**
 * Delete the tab
 * @param {Context} ctx context passed vuex
 * @returns {Promise} deleteTab succeeded
 */
export const deleteTab = ({ commit, getters: { tab } }) => {
  tabToModel(tab)
    .then((tabModel) =>
      tabModel.destroy()
        .then(() => {
          commit('tabs/removeTabById', tabModel.id, { root: true })
          commit('clearState')
        })
    )
    .catch((err) => {
      commit('setError', err)
    })
}
