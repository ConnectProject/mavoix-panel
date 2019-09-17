import Parse from 'parse'

import slugify from 'mavoix-core/utils/slugify'
import { tabToModel } from './utils'

import TabModel, { SLUG_KEY, NAME_KEY, HEX_COLOR_KEY } from '~/models/Tab'
import TabItemModel, { TAB_KEY as ITEM_TAB_KEY } from '~/models/TabItem'

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

export const saveCb = ({ commit, dispatch, getters: { tab } }, callback) => {
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
        tabModel.save()
      ]).catch((err) => {
        commit('setError', err)
      }).then(([tabModel, items]) => {
        commit('clearState')
        callback(tabModel)
      })
    })
}

export const deleteTab = ({ commit, getters: { tab } }) => {
  tabToModel(tab)
    .catch((err) => {
      commit('setError', err)
    })
    .then((tabModel) => {
      tabModel.destroy()
        .then(() => {
          commit('tabs/removeTabById', tabModel.id, { root: true })
          commit('clearState')
        })
        .catch((err) => {
          commit('setError', err)
        })
    })
}
