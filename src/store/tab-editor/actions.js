import Parse from 'parse'

import { modelFromAsset } from '../assets-manager/utils'

import { tabToModel } from './utils'

import TabModel, { HEX_COLOR_KEY, ICON_KEY, LANGUAGE_KEY, NAME_KEY, SLUG_KEY, SPEED_KEY } from '~/models/Tab'
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
    const promises = []

    /**
       * Save basic changes
       */
    tabModel.set(NAME_KEY, tab.name)
    tabModel.set(HEX_COLOR_KEY, tab.hexColor)
    tabModel.set(SLUG_KEY, slugify(tab.name))
    tabModel.set(SPEED_KEY, tab.speed)
    tabModel.set(LANGUAGE_KEY, tab.language)

    /* Save the tabmodel */
    promises.push(tabModel.save())

    /* Delete removed items */
    deletedItems.forEach((item) => {
      if (item.key) {
        promises.push(new Parse.Query(TabItemModel)
          .equalTo(ITEM_TAB_KEY, tabModel)
          .equalTo(ITEM_KEY_KEY, item.key)
          .first()
          .then((itemModel) => itemModel.destroy()))
      }
    })

    /* Save items */
    await Promise.all(items.map(async (item) => {
      const assetModel = await modelFromAsset(item.asset)
      if (!item.key) {
        // Save item as new item
        return TabItemModel.Create(item.name, assetModel, tabModel, item.hidden, item.available, item.order).save()
      }

      // Update item if existing
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
    }))
    commit('clearState')

    return Promise.all([
      dispatch('loadBySlug', tabModel.get(SLUG_KEY)),
      callback(tabModel)
    ])
  } catch (err) {
    commit('setError', err)

    return null
  }
}

/**
 * Delete the tab
 * @param {Context} ctx context passed vuex
 * @returns {Promise} deleteTab succeeded
 */
export const deleteTab = async ({ commit, getters: { tab } }) => {
  try {
    const tabModel = await tabToModel(tab)
    await tabModel.destroy()
    commit('tabs/removeTabById', tabModel.id, { root: true })
    commit('clearState')
  } catch (err) {
    commit('setError', err)
  }
}

export const updateTab = async ({ commit, getters: { tab } }, { name, hexColor, icon, callback }) => {
  try {
    const tabModel = await tabToModel(tab)

    tabModel.set(NAME_KEY, name)
    tabModel.set(HEX_COLOR_KEY, hexColor)
    tabModel.set(SLUG_KEY, slugify(name))
    tabModel.set(ICON_KEY, icon)

    await tabModel.save()

    // update the store to reflect new values
    commit('setTab', tabModel)
    // update the tabs list state in sidebar too
    commit('tabs/updateTab', tabModel, { root: true })

    if (callback) {
      return callback(tabModel)
    }

    return tabModel
  } catch (err) {
    commit('setError', err)

    return null
  }
}
