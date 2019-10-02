import Vue from 'vue'
import Router from 'vue-router'

import Url from '@/views/Url'
import Usuario from '@/views/user/Usuario'

import Dashboard from '@/views/Index'
import Login from '@/views/auth/Login'

import AuthRequired from '@/utils/AuthRequired'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: Dashboard,
      beforeEnter: AuthRequired,
      children: [
        {
          path: '/urls',
          component: Url
        },
        {
          path: '/usuarios',
          component: Usuario
        },
      ]
    },    
    {
      path: '/auth/login',
      component: Login
    }
  ]
})
