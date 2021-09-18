import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import menu from '../menu.vue'
import role from '../role.vue'
import user from '../user.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/menu',
      name: 'menu',
      component: menu
    },
    {
      path: '/user',
      name: 'user',
      component: user
    },
    {
      path: '/role',
      name: 'role',
      component: role
    },
  ]
})
