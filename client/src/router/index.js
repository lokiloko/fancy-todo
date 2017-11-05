import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import TodoMain from '@/components/TodoMain'
import Login from '@/components/Login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/hello',
      name: 'Hello',
      component: HelloWorld
    },
    {
      path: '/',
      name: 'Main',
      component: TodoMain
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})
