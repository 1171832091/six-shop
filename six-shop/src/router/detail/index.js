export default {
    path: '/detail',
    name: 'detail',
    component: () => import(/* webpackChunkName: "about" */ '../../views/detail'),
    meta:{
        flag:true
    }
}