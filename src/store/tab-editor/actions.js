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
    .forEach(({ assetModel, name }) => {
      assetModel
        .fetch()
        .then((asset) => {
          commit('addItem', {
            name,
            asset
          })
        })
        .catch((err) => {
          commit('setError', err)
        })
    })
}

export const saveNewItem = ({ commit, getters: { itemDialog, tabModel } }) => {
  tabModel.addUnique(ITEMS_KEY, itemDialog)

  tabModel.save()
    .then((tabModel) => {
      commit('addItem', {
        name: itemDialog.name,
        asset: itemDialog.assetModel
      })
      commit('closeItemDialog')
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
