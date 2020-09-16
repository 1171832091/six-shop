export default {
    path: '/list',
    name: 'list',
    component: () => import(/* webpackChunkName: "about" */ '@/views/list'),
    meta:{
        flag:true
    }
}