import Parse from 'parse'

import TabModel, { SLUG_KEY, NAME_KEY, HEX_COLOR_KEY } from '~/models/Tab'
import TabItemModel, { PARENT_KEY } from '~/models/TabItem'

import slugify from '~/utils/slugify'

export function loadBySlug (context, slug) {
  new Parse.Query(TabModel)
    .equalTo(SLUG_KEY, slug)
    .first()
    .then((tab) => {
      console.log(`Successfully loaded "${tab.get('name')}" tab.`)
      context.commit('setTab', tab)
    })
    .catch((err) => {
      context.commit('setError', err)
    })
}

export function loadItems (context) {
  new Parse.Query(TabItemModel)
    .equalTo(PARENT_KEY, context.getters.tabModel.id)
    .find()
    .then((items) => {
      console.log(`Successfully fetched ${items.length} tab items.`)
      context.commit('setItems', items)
    })
    .catch((err) => {
      context.commit('setError', err)
    })
}

export function saveCb (context, cb) {
  const tabModel = context.getters.tabModel
  const tab = context.getters.tab

  tabModel.set(NAME_KEY, tab.name)
  tabModel.set(SLUG_KEY, slugify(tab.name))
  tabModel.set(HEX_COLOR_KEY, tab.hexColor)

  tabModel.save()
    .then((tabModel) => {
      context.commit('setTab', tabModel)
      cb(tabModel)
    })
    .catch((err) => {
      context.commit('setError', err)
    })
}

export function deleteIt (context) {
  const tab = context.getters.tabModel

  context.commit('tabs/removeTabById', tab.id, { root: true })
  tab.destroy()
    .then(() => {
      context.commit('clearState')
    })
    .catch((err) => {
      context.commit('setError', err)
    })
}
