import Vue from 'vue'
import VueRouter from 'vue-router'

import DetailRouter from './detail'
import HomeRouter from './home'
import AddAddressRouter from './addAddress'
import ListRouter from './list'
import MineRouter from './mine'
import RegisterRouter from './register'
import LoginRouter from './login'
import SearchRouter from './search'
import ShopCartRouter from './shopCart'

Vue.use(VueRouter)

const routes = [
  {
      path: '/',
      redirect:'/home'
  },
    DetailRouter,
    HomeRouter,
    AddAddressRouter,
    ListRouter,
    MineRouter,
    RegisterRouter,
    LoginRouter,
    SearchRouter,
    ShopCartRouter
]

const router = new VueRouter({
    routes
}

)

export default router
