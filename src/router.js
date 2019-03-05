import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Charges from './components/Charges.vue'
import TaxesAndTip from './components/TaxesAndTip.vue'
import Totals from './components/Totals.vue'
import Details from './components/Details.vue'

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
    },
    {
      path: '/taxesandtip',
      name: 'taxesandtip',
      component: TaxesAndTip
    },
    {
      path: '/totals',
      name: 'totals',
      component: Totals
    },
    {
      path: '/details',
      name: 'details',
      component: Details
    }
  ]
})
