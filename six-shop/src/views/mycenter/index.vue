<template>
  <div>
    <van-nav-bar
      title="只有登出 ，没别的"
      left-text="返回"
      right-text="帮助"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />

    <van-button type="primary" @click="loginOut">登出</van-button>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Button, Toast } from "vant";
Vue.use(NavBar).use(Button).use(Toast);
export default {
  methods: {
    loginOut() {
        localStorage.removeItem('tel')
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('userid')
        this.$router.push({path:"/login"})
    },
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
// .van-button::before{
//     top: 30%;
// }
.van-button {
  width: 30%;
  position: relative;
  top: 100px;
  left: 140px;
}
</style>