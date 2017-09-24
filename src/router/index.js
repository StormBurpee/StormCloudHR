import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import TimeOff from '@/views/TimeOff'
import EmployeeNew from '@/views/EmployeeNew'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Employee Directory',
      component: Home
    },
    {
      path: '/employees',
      name: 'Employee Directory',
      component: Home
    },
    {
      path: '/employees/new',
      name: 'New Employee',
      component: EmployeeNew
    },
    {
      path: '/time-off',
      name: 'Time Off',
      component: TimeOff
    }
  ]
})
