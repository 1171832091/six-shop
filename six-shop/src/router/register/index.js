export default {
    path: '/register',
    name: 'register',
    component: () => import(/* webpackChunkName: "about" */ '@/views/register'),
    meta:{
        flag:false
    }
}