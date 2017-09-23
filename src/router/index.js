import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import TimeOff from '@/views/TimeOff'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/time-off',
      name: 'Time Off',
      component: TimeOff
    }
  ]
})
