<template>
  <div class="login">
    <van-nav-bar
      title="登录"
      left-text="返回"
      right-text="帮助"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="content">
      <h3>登录</h3>
      <div class="loginForm">
        <input type="text" placeholder="请输入手机号" v-model="tel" />
        <p class="tip"></p>
        <input type="password" placeholder="请输入密码" v-model="password" />
        <p class="tip"></p>
        <router-link to="/register" tag="a" @click="toRegister">还未注册？请注册</router-link>
        <button class="login" @click="toLogin">登 录</button>
        <div class="errortip"></div>
      </div>
    </div>
  </div>
</template>
<script>
import Vue from "vue";
import { NavBar, Button, Toast } from "vant";
Vue.use(NavBar).use(Button).use(Toast);
import {mapState , mapMutations} from 'vuex'
export default {
  data() {
    return {
      tel: "",
      password: "",
    };
  },
  methods: {
    ...mapMutations(['changUserState']),
    toLogin() {
      this.$axios
        .post("/api/users/login", {
          tel: this.tel,
          password: this.password,
        })
        .then((res) => {
          console.log(res);
          if (res.code === 10006) {
            Toast("用户还未注册，请先注册");
          } else if (res.code === 10007) {
            Toast("密码错误");
          } else {
            // 登陆成功，存储信息，返回上一页
            Toast.success("登录成功");
            console.log(res);
            localStorage.setItem("userid", res.data.data.userid);
            localStorage.setItem("username", res.data.data.username);
            localStorage.setItem("token", res.data.data.token);
            localStorage.setItem("tel", res.data.data.tel);
            // this.changUserState();
            this.$store.commit('changUserState',true)
            this.$router.push({ path: "/home" });
          }
        });
    },
    toRegister() {
      this.$router.push({ path: "/register" });
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
h3 {
  font: 20px/3 "";
  margin: 20px 0 20px 20px;
}
.loginForm {
  width: 94%;
  margin: 30px 3%;
  a {
    margin: 0 0 0 10px;
    font-size: 14px;
    text-decoration: none;
    color: skyblue;
  }
  input {
    font-size: 14px;
    display: block;
    outline: none;
    border: 0;
    width: 100%;
    border-bottom: 1px solid #efefef;
    height: 40px;
    text-indent: 10px;
  }
  .tip {
    height: 20px;
    color: lightgreen;
    font-size: 12px;
    text-align: left;
    .error {
      color: #f66;
    }
  }
  .code {
    display: flex;
    border-bottom: 1px solid #efefef;
    input {
      flex: 1;
      border: 0;
    }
    button {
      width: 100px;
      outline: none;
      border: 0;
      background: none;
    }
  }
  .login {
    display: block;
    width: 100%;
    margin: 30px 0 0 0;
    outline: none;
    border: 0;
    background: #efefef;
    height: 48px;
    border-radius: 5px;
    background: #1989fa;
    color: #fff;
    font-size: 20px;
    // letter-spacing: 20px;
    font-weight: bolder;
    &.active {
      background: #f66;
    }
  }
}
</style>