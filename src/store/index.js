import Vue from 'vue'
import Vuex from 'vuex'

import assetsManager from './assets-manager'
import devices from './devices'
import global from './global'
import stats from './stats'
import tabEditor from './tab-editor'
import tabs from './tabs'
import users from './users'

const modules = {
  devices,
  users,
  tabs,
  tabEditor,
  assetsManager,
  global,
  stats
}

// initial state
const initialState = Object.fromEntries(
  Object.entries(modules).map(
    ([k, v]) => [k, { ...v.state }]
  )
)

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      devices,
      users,
      tabs,
      tabEditor,
      assetsManager,
      global,
      stats
    },
    mutations: {
      reset (state) {
        Object.keys(state).forEach(key => {
          Object.assign(state[key], initialState[key])
        })
      }
    },

    // strict mode deep-walks the whole state on every mutation, including the 7.6 MB
    // pictogram catalogue: it made a dev load take ~8 s. Keep it off.
    strict: false
  })

  return Store
}
