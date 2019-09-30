import Vue from 'vue'
import Vuex from 'vuex'

import devices from './devices'
import tabEditor from './tab-editor'
import tabs from './tabs'
import assetsManager from './assets-manager'
import global from './global'

Vue.use(Vuex)

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      devices,
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
