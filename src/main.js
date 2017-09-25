// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import App from './App'
import router from './router'
import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    loggedin: true
  },
  mutations: {
    login (state) {
      state.loggedin = true
    },
    logout (state) {
      state.loggedin = false
    }
  }
})

store.commit('login')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
