import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '../store'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/home',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "settings" */ '../views/home.vue'),
    beforeEnter(to, from, next) {
      if (store.state.taskObjects.objects.length > 0) {
        next()
      }
    },
  },
  {
    path: '/',
    name: 'Help',
    component: () =>
      import(/* webpackChunkName: "settings" */ '../views/help.vue'),
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () =>
      import(/* webpackChunkName: "settings" */ '../views/settings.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

export default router
