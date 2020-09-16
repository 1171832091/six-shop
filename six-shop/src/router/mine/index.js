export default {
    path: '/mine',
    name: 'mine',
    component: () => import(/* webpackChunkName: "about" */ '@/views/mine'),
    meta:{
        flag:true
    }
}