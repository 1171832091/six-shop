<template>
<van-tabbar v-model="active" active-color="pink">
  <van-tabbar-item to="/" icon="wap-home-o">首页</van-tabbar-item>
  <van-tabbar-item to="/list"  icon="coupon-o" >分类</van-tabbar-item>
  <van-tabbar-item to="/shopcart" icon="shopping-cart-o" badge="5">购物车</van-tabbar-item>
  <van-tabbar-item to="/mine" icon="manager-o" >我的</van-tabbar-item>
</van-tabbar>
</template>

<script>
import Vue from 'vue';
import { Tabbar, TabbarItem } from 'vant';
import 'vant/lib/index.css';
Vue.use(Tabbar);
Vue.use(TabbarItem);
export default {
  data() {
    return {
      active: 'home',
    };
  },
};
</script>

<style scoped>
</style>