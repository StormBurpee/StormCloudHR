// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
var VueCookie = require('vue-cookie')
import App from './App'
import router from './router'
import('../node_modules/vuetify/dist/vuetify.min.css')

Vue.config.productionTip = false
Vue.use(Vuetify)
Vue.use(Vuex)
Vue.use(VueCookie)

const store = new Vuex.Store({
  state: {
    loggedin: false,
    company_id: 0,
    hash: ''
  },
  mutations: {
    login (state, user) {
      state.loggedin = true
      state.company_id = user.user.belongsto
      state.hash = user.hash
      Vue.cookie.set('userhash', user.hash, { expires: '1h'})
    },
    logout (state) {
      state.loggedin = false
    },
    setCompany (state, companyId) {
      state.company_id = companyId
    },
    checkLogin (state) {
      state.hash = Vue.cookie.get('userhash')
    }
  }
})

store.commit('checkLogin')

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
