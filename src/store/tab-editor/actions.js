import Parse from 'parse'

import TabModel, { SLUG_KEY } from '~/models/Tab'

import { tabToModel } from './utils'
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
      throw err
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

export const saveCb = ({ commit, dispatch, getters: { tabModel, tab } }, callback) => {
}

export const deleteIt = ({ commit, getters: { tabModel } }) => {
  commit('tabs/removeTabById', tabModel.id, { root: true })
  tabModel.destroy()
    .then(() => {
      commit('clearState')
    })
    .catch((err) => {
      commit('setError', err)
    })
}
