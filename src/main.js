// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import Vuex from 'vuex'
import axios from 'axios'
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
    hash: '',
    myuser: {},
    loginchecked: false
  },
  mutations: {
    login (state, user) {
      state.loggedin = true
      state.company_id = user.user.employee.belongsto
      state.myuser = user.user
      state.hash = user.hash
      Vue.cookie.set('userhash', user.hash, {expires: '1h'})
    },
    logout (state) {
      state.loggedin = false
      state.company_id = 0
      state.hash = ''
      state.myuser = {}
      Vue.cookie.set('userhash', '', {expires: '1s'})
    },
    setCompany (state, companyId) {
      state.company_id = companyId
    },
    checkLogin (state) {
      state.hash = Vue.cookie.get('userhash')
      axios.get('http://stormcloudhr.com:3000/user/loggedin/' + state.hash).then(resp => {
        state.loggedin = resp.data.loggedin
        if (state.loggedin === true) {
          state.company_id = resp.data.user.employee.belongsto
          state.myuser = resp.data.user
        } else {
          router.push('/login')
        }
        state.loginchecked = true
      })
    },
    refreshSession (state) {
      if (state.loggedin && Vue.cookie.get('userhash')) {
        axios.get('http://stormcloudhr.com:3000/user/refreshexpiry/' + state.hash).then(resp => {
          if (resp && !resp.error && state.hash) {
            Vue.cookie.set('userhash', state.hash, {expires: '1h'})
          } else {
            console.log('Error, user not logged in.')
          }
        })
      }
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
