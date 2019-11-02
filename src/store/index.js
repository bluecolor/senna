import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app'
import connection from './modules/connection'
import editor from './modules/editor'

Vue.use(Vuex)

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      app,
      connection,
      editor
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: process.env.DEV
  })

  return Store
}
