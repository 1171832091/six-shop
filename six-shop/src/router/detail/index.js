export default {
    path: '/detail/:proid',
    name: 'detail',
    component: () => import(/* webpackChunkName: "about" */ '../../views/detail'),
    meta:{
        flag:false
    }
}