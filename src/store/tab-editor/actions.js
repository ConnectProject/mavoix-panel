import Parse from 'parse'

import slugify from '~/utils/slugify'
import { tabToModel } from './utils'

import TabModel, { SLUG_KEY, NAME_KEY, HEX_COLOR_KEY } from '~/models/Tab'
import TabItemModel, {
  NAME_KEY as ITEM_NAME_KEY,
  ASSET_KEY as ITEM_ASSET_KEY,
  AVAILABLE_KEY as ITEM_AVAILABLE_KEY,
  HIDDEN_KEY as ITEM_HIDDEN_KEY,
  TAB_KEY as ITEM_TAB_KEY,
  KEY_KEY as ITEM_KEY_KEY
} from '~/models/TabItem'

export const loadBySlug = ({ commit, dispatch }, slug) => {
  new Parse.Query(TabModel)
    .equalTo(SLUG_KEY, slug)
    .first()
    .then((tabModel) => {
      commit('setTab', tabModel)
      dispatch('fetchItems')
    })
    .catch((err) => {
      commit('setError', err)
    })
}

export const fetchItems = ({ commit, getters: { tab } }) => {
  tabToModel(tab)
    .catch((err) => {
      commit('setError', err)
    })
    .then((tabModel) => {
      new Parse.Query(TabItemModel)
        .equalTo(ITEM_TAB_KEY, tabModel)
        .find()
        .catch((err) => {
          commit('setError', err)
        })
        .then((itemsModel) => {
          commit('setItems', itemsModel)
        })
    })
}

export const saveCb = ({ commit, dispatch, getters: { tab, items, deletedItems } }, callback) => {
  tabToModel(tab)
    .catch((err) => {
      commit('setError', err)
    })
    .then((tabModel) => {
      tabModel.set(NAME_KEY, tab.name)
      tabModel.set(HEX_COLOR_KEY, tab.hexColor)
      tabModel.set(SLUG_KEY, slugify(tab.name))

      Promise.all([
        /* Save the tabmodel */
        tabModel.save(),
        new Promise((resolve, reject) => {
          const promises = []

          deletedItems.forEach((item) => {
            if (item.key) {
              promises.push(new Parse.Query(TabItemModel)
                .equalTo(ITEM_TAB_KEY, tabModel)
                .equalTo(ITEM_KEY_KEY, item.key)
                .first()
                .then((itemModel) => {
                  return itemModel.destroy()
                }))
            }
          })

          items.forEach((item) => {
            if (!item.key) {
              promises.push(TabItemModel.Create(item.name, item.asset, tabModel, item.hidden, item.available).save())
            } else {
              promises.push(new Parse.Query(TabItemModel)
                .equalTo(ITEM_TAB_KEY, tabModel)
                .equalTo(ITEM_KEY_KEY, item.key)
                .first()
                .then((itemModel) => {
                  itemModel.set(ITEM_NAME_KEY, item.name)
                  itemModel.set(ITEM_ASSET_KEY, item.asset)
                  itemModel.set(ITEM_HIDDEN_KEY, item.hidden)
                  itemModel.set(ITEM_AVAILABLE_KEY, item.available)

                  return itemModel.save()
                })
              )
            }
          })
          Promise.all(promises)
            .catch(reject)
            .then(resolve)
        })
      ]).catch((err) => {
        commit('setError', err)
      }).then(([tabModel]) => {
        commit('clearState')
        dispatch('loadBySlug', tabModel.get(SLUG_KEY))
        callback(tabModel)
      })
    })
}

export const deleteTab = ({ commit, getters: { tab, items } }) => {
  tabToModel(tab)
    .catch((err) => {
      commit('setError', err)
    })
    .then((tabModel) => {
      Promise.all([
        tabModel.destroy()
      ])
        .catch((err) => {
          commit('setError', err)
        })
        .then(() => {
          commit('tabs/removeTabById', tabModel.id, { root: true })
          commit('clearState')
        })
    })
}
