import Vue from 'vue'
import VueRouter from 'vue-router'
import VueSyntax from '../views/VueSyntax.vue'
import CompositionApi from '../views/CompositionApi.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/vue-syntax',
    name: 'VueSyntax',
    component: VueSyntax
  }, {
    path: '/composition-api',
    name: 'CompositionApi',
    component: CompositionApi
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
