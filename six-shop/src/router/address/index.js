export default {
    path: '/address',
    name: 'address',
    component: () => import(/* webpackChunkName: "adress" */ '@/views/address'),
    meta:{
        flag:false
    }
}