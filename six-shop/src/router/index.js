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
import addressRouter from './address'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    DetailRouter,
    HomeRouter,
    AddAddressRouter,
    ListRouter,
    MineRouter,
    RegisterRouter,
    LoginRouter,
    SearchRouter,
    ShopCartRouter,
    addressRouter,
    {
        path: '/mycenter',
        name: 'mycenter',
        component: () => import('@/views/mycenter'),
        meta: {
            flag: false
        }
    },
    {
        path: '/setting',
        name: 'setting',
        component: () => import('@/views/setting'),
        meta: {
            flag: false
        }
    }
]

// router.beforeEach((to,from,next)=>{
//     next()
//     // if('/login' !== to.path){
//     //     let token = localStorage.getItem('token')
//     // }
// })

const router = new VueRouter({
    routes
})
router.beforeEach((to, from, next) => {
    let Token = localStorage.getItem('token')
    if (Token) {
        next()
    } else {
        if ('/login' == to.path) {
            next()
        } else {
            next('/login')
        }
    }
})

export default router
