import Parse from 'parse'

import TabModel from '~/models/Tab'

export function loadTabs (context) {
  new Parse.Query(TabModel)
    .find()
    .then((tabs) => {
      console.log(`Successfully loaded ${tabs.length} tabs.`)
      context.commit('setTabs', tabs)
    })
    .catch((err) => {
      context.commit('setError', err)
    })
}

export function createTabCb (context, { name, callback }) {
  TabModel.Create(name)
    .save()
    .then((tab) => {
      if (tab) {
        context.commit('addTab', tab)
        callback(tab)
      }
    })
    .catch((err) => {
      context.commit('setError', err)
    })
}

export function deleteTabCb (context, { tab, callback }) {
  const id = tab.id

  tab.destroy()
    .then(() => {
      context.commit('removeTabById', id)
      callback()
    })
    .catch((err) => {
      context.commit('setError', err)
    })
}
