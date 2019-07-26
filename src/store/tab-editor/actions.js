import Parse from 'parse'

import TabModel, { SLUG_KEY, NAME_KEY, HEX_COLOR_KEY, ITEMS_KEY } from '~/models/Tab'

import slugify from '~/utils/slugify'

export const loadBySlug = ({ commit, dispatch }, slug) => {
  new Parse.Query(TabModel)
    .equalTo(SLUG_KEY, slug)
    .first()
    .then((tab) => {
      commit('setTab', tab)
      dispatch('fetchItems')
    })
    .catch((err) => {
      commit('setError', err)
    })
}

export const fetchItems = ({ commit, getters: { tabModel } }) => {
  tabModel.get(ITEMS_KEY)
    .foreach((item) => {
    })
}

export const saveNewItem = ({ commit, getters: { newItem, tabModel } }) => {
  tabModel.addUnique(ITEMS_KEY, newItem)

  tabModel.save()
    .then((tabModel) => {
      commit('setTab', tabModel)
      commit('closeNewItemDialog')
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
