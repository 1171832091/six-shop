<template>
  <div>
    <van-nav-bar
      title="一个假的设置页面"
      left-text="返回"
      right-text="帮助"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <h1>别看了 我没写</h1>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Button, Toast } from "vant";
Vue.use(NavBar).use(Button).use(Toast);
export default {
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    onClickRight() {
      Toast({
        message: "有事？",
        icon:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4215493778,880544543&fm=26&gp=0.jpg",
      });
    },
  },
};
</script>
<style lang="less" scoped>
h1 {
  font-size: 30px;
  font-weight: bold;
  margin-top: 200px;
  text-align: center;
}
</style>