import Parse from 'parse'

import TabModel, { SLUG_KEY, NAME_KEY, HEX_COLOR_KEY } from '~/models/Tab'
import TabItemModel, { PARENT_KEY } from '~/models/TabItem'

import slugify from '~/utils/slugify'

export const loadBySlug = ({ commit }, slug) => {
  new Parse.Query(TabModel)
    .equalTo(SLUG_KEY, slug)
    .first()
    .then((tab) => {
      commit('setTab', tab)
    })
    .catch((err) => {
      commit('setError', err)
    })
}

export const loadItems = ({ commit, getters: { tabModel } }) => {
  new Parse.Query(TabItemModel)
    .equalTo(PARENT_KEY, tabModel.id)
    .find()
    .then((items) => {
      commit('setItems', items)
    })
    .catch((err) => {
      commit('setError', err)
    })
}

export const saveCb = ({ commit, getters: { tabModel, tab } }, callback) => {
  tabModel.set(NAME_KEY, tab.name)
  tabModel.set(SLUG_KEY, slugify(tab.name))
  tabModel.set(HEX_COLOR_KEY, tab.hexColor)

  tabModel.save()
    .then((tabModel) => {
      commit('setTab', tabModel)
      callback(tabModel)
    })
    .catch((err) => {
      commit('setError', err)
    })
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
