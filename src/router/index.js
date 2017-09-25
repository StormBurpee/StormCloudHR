import Vue from 'vue'
import Router from 'vue-router'

import Home from '@/views/Home'
import TimeOff from '@/views/TimeOff'
import EmployeeNew from '@/views/EmployeeNew'
import Employee from '@/views/Employee'
import Login from '@/views/Login'

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
      path: '/employee/:id',
      name: 'Employee',
      component: Employee
    },
    {
      path: '/time-off',
      name: 'Time Off',
      component: TimeOff
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
