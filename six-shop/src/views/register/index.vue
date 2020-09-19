<template>
  <div class="register">
    <van-nav-bar
      title="注册"
      left-text="返回"
      right-text="帮助"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="content">
      <div class="registerForm">
        <input type="text" placeholder="请输入6-12位用户名" v-model="username" />
        <p class="tip" v-html="usernametip"></p>
        <input type="text" placeholder="请输入手机号" v-model="telephone" />
        <p class="tip" v-html="teltip"></p>
        <div class="code">
          <input type="text" placeholder="请输入验证码" v-model="yzm" />
          <button @click="sendCode">{{msg}}</button>
        </div>
        <p class="tip"></p>
        <input type="password" placeholder="请输入密码" v-model="password" />
        <p class="tip"></p>
        <input type="password" placeholder="再次输入密码" v-model="password1" />
        <p class="tip" v-html="password1tip"></p>
        <van-button @click="singup" class="button" type="primary" color="#1989fa" size="large">注册</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Button, Toast } from "vant";

Vue.use(NavBar).use(Button).use(Toast);
export default {
  data() {
    return {
      yzm: "",
      msg: "验证码",
      username: "",
      password: "",
      telephone: "",
      password1: "",
      codeflag: false,
      time: 0,
      code: "",
    };
  },
  methods: {
    onClickLeft() {
      this.$router.push({ path: "/home" });
    },
    onClickRight() {
      Toast({
        message: "有事？",
        icon:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4215493778,880544543&fm=26&gp=0.jpg",
      });
    },
    sendCode() {
      if (this.codeflag) {
        this.codeflag = true;
        let time = this.time;
      } else {
        if (this.telephone) {
          this.sendTelCode();
          this.codeflag = true;
          this.time = 30;
          this.msg = this.time + "后重新发送";
          var timer = setInterval(() => {
            this.time--;
            if (this.time === 0) {
              clearInterval(timer);
              this.codeflag = false;
              this.msg = "验证码";
            } else {
              this.msg = this.time + "后重新发送";
            }
          }, 1000);
        } else {
          Toast("请输入手机号码");
        }
      }
    },
    sendTelCode() {
      this.$axios
        .get("http://10.9.70.187:3000/api/users/sendCode?tel=" + this.telephone)
        .then((res) => {
          console.log(res);
          if (Number(res.data.code) === 10001) {
            Toast("该用户以注册");
          } else if (Number(res.data.code) === 10005) {
            Toast("验证码发送失败");
          } else {
            this.code = res.data.data;
            console.log(this.code)
            // console.log(this.code)
          }
        });
    },
    singup() {
      if (
        this.username != "" &&
        this.password != "" &&
        this.telephone != "" &&
        this.yzm != "" &&
        this.usernametip == "" &&
        this.password1tip == "" &&
        this.teltip == ""
      ) {
        if ( "'" + this.yzm + "'"  == this.code) {
          let data = {
            username: this.username,
            password: this.password,
            tel: this.telephone,
          };
          this.$axios.post("http://10.9.70.187:3000/api/users/singup", data).then((res)=>{
              console.log(res)
              if(Number(res.data.code ) == 10002){
                  Toast.success('恭喜你注册成功')
                  this.$router.push({path:'/login'})
              }
          });
        } else {
          Toast("验证码不正确");
        }
      } else {
        Toast("请把内容填写完整");
      }
    },
  },
  computed: {
    usernametip() {
      if (this.username === "") {
        return "";
      } else {
        if (/^[a-zA-Z0-9][a-zA-Z0-9]{5,11}$/.test(this.username)) {
          return "";
        } else {
          return '<span class="error">用户名不正确</span>';
        }
      }
    },
    teltip() {
      if (this.telephone === "") {
        return "";
      } else {
        if (/^1[3456789]\d{9}$/.test(this.telephone)) {
          return "";
        } else {
          return '<span class="error">手机号码不正确</span>';
        }
      }
    },
    password1tip() {
      if (this.password1 == "") {
        return "";
      } else if (this.password1 !== this.password) {
        return '<span class="error">两次密码输入不一致</span>';
      } else {
        return "";
      }
    },
  },
};
</script>

<style lang="less" >
.button {
  margin-top: 30px;
}
.registerForm {
  width: 96%;
  margin: 30px 2%;
  font-size: 14px;
  input {
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
      width: 120px;
      outline: none;
      border: 0;
      background: none;
    }
  }
  .register {
    display: block;
    width: 100%;
    margin: 30px 0 0 0;
    outline: none;
    border: 0;
    background: #efefef;
    height: 48px;
    color: #fff;
    font-size: 22px;
    // letter-spacing: 20px;
    font-weight: bold;
    &.active {
      background: #f66;
    }
  }
}
</style>