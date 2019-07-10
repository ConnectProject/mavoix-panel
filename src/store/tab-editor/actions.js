import Parse from 'parse'

import TabModel, { SLUG_KEY } from '~/models/Tab'

export function loadTabBySlug (context, slug) {
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

export function deleteTab (context) {
  const tab = context.getters.tab

  context.commit('tabs/removeTabById', tab.id, { root: true })
  tab.destroy()
    .then(() => {
      context.commit('clearState')
    })
    .catch((err) => {
      context.commit('setError', err)
    })
}
