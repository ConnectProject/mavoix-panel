import Vue from 'vue'
import Vuex from 'vuex'

import assetsManager from './assets-manager'
import devices from './devices'
import global from './global'
import tabEditor from './tab-editor'
import tabs from './tabs'
import users from './users'

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

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
