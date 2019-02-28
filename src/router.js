import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Charges from './components/Charges.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/charges',
      name: 'charges',
      component: Charges
    }
  ]
})
