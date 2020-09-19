export default {
    path: '/addAddress',
    name: 'addAddress',
    component: () => import(/* webpackChunkName: "about" */ '@/views/addAddress'),
    meta:{
        flag:false
    }
}