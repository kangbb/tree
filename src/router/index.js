import Vue from 'vue'
import Router from 'vue-router'
import TreeMenu from '@/components/TreeMenu'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'TreeMenu',
      component: TreeMenu
    }
  ]
})
