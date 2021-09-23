import Vue from 'vue'
import Vuex from 'vuex'

import assetsManager from './assets-manager'
import devices from './devices'
import global from './global'
import tabEditor from './tab-editor'
import tabs from './tabs'
import users from './users'

const modules = {
  devices,
  users,
  tabs,
  tabEditor,
  assetsManager,
  global
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
      global
    },
    mutations: {
      reset (state) {
        Object.keys(state).forEach(key => {
          Object.assign(state[key], initialState[key])
        })
      }
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
