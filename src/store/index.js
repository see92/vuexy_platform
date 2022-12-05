import Vue from 'vue'
import Vuex from 'vuex'

// Modules
import app from './module/app'
import user from './module/user'
import appConfig from './app-config'
import verticalMenu from './vertical-menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    app,
    user,
    appConfig,
    verticalMenu,
  },
  strict: process.env.DEV,
})
