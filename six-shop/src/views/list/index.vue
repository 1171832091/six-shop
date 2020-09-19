<template>
  <div>
    <van-nav-bar
      title="登录"
      left-text="返回"
      right-text="帮助"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <div class="bg">
      <div class="bg-left">
        <div class="bg-item">
          <div :class="activeKey == '0' ? 'BoxActive':'Box'" @click="category('0')">女鞋</div>
          <div :class="activeKey == '1' ? 'BoxActive':'Box'" @click="category('1')">女装</div>
          <div :class="activeKey == '2' ? 'BoxActive':'Box'" @click="category('2')">女包</div>
          <div :class="activeKey == '3' ? 'BoxActive':'Box'" @click="category('3')">女配</div>
          <div :class="activeKey == '4' ? 'BoxActive':'Box'" @click="category('4')">男士</div>
          <div :class="activeKey == '5' ? 'BoxActive':'Box'" @click="category('5')">美妆</div>
        </div>
      </div>
      <div class="bg-right">
        <div class="product-bg">
          <div
            class="product-box"
            v-for="(item,index) in listdata"
            :key="index"
            @click="jump(item.proid)"
          >
            <img :src="item.proimg" alt class="banner" />
            <div class="txt">
              <div class="top-bg">
                <p>{{item.proname}}</p>
                <p>{{item.note}}</p>
                <p>￥{{item.price}}</p>
              </div>
            </div>
          </div>
          <p class="bottom-txt" v-if="this.productTwo.length >= 6">没有更多商品~</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import { NavBar, Button, Toast } from "vant";
Vue.use(NavBar).use(Button).use(Toast);
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      activeKey: 0,
      types: "",
      product: [],
      productTwo: [],
      type: "女鞋",
      listdata: "",
    };
  },
  created() {
    this.getType();
  },
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
    getType() {
      let url = "http://10.9.70.187:3000/api/pros/types?type=";
      this.$axios.get(url + this.type).then((ret) => {
        this.listdata = ret.data.data;
        console.log(this.listdata);
      });
    },
    jump(target) {
      this.$router.push({ path: `/detail/${target}` });
    },
    category(index) {
      // 分类
      if (index == "0") {
        this.activeKey = index;
        this.productTwo = this.product;
      } else {
        this.productTwo = this.product.filter((item) => item.category == index);
        this.activeKey = index;
      }
      if (index == "1") {
        this.type = "女装";
      } else if (index == "0") {
        this.type = "女鞋";
      } else if (index == "2") {
        this.type = "女包";
      } else if (index == "3") {
        this.type = "女配";
      } else if (index == "4") {
        this.type = "男士";
      } else if (index == "5") {
        this.type = "美妆";
      }
      this.getType();
    },
    mounted() {
      for (var i = 0; i < listdata.length; i++) {
        this.types = listdata[i].type;
      }
    },
  },
  beforeMount() {},
};
</script>

<style lang="less" scoped>
.bg {
  width: 100%;
  height: 100vh;
  background-color: #f4f4f4;
  // padding-bottom: 16vh;
  display: flex;

  .bg-left {
    width: 2.7rem;
    height: 100vh;
    background-color: #e9e9e9;

    .bg-item {
      width: 100%;
      background-color: #fafafa;

      .Box {
        width: 100%;
        height: 1.1rem;
        font-size: 0.28rem;
        text-align: center;
        line-height: 1.1rem;
        color: #333;
      }

      .BoxActive {
        width: 1.87rem;
        height: 1.1rem;
        font-size: 0.28rem;
        border-left: 3px solid #ff2742;
        background-color: #fff;
        text-align: center;
        line-height: 1.1rem;
        color: #333;
      }

      // .van-sidebar-item{
      // 	padding: 0.4rem;
      // 	font-size: 0.26rem;
      // }
    }
  }

  .bg-right {
    width: 100%;
    height: 84vh;
    padding-bottom: 16vh;
    overflow: scroll;
    background-color: #f4f4f4;

    .product-box {
      width: 100%;
      height: 2.2rem;
      background-color: #fff;
      margin: 0 auto;
      margin-bottom: 0.16rem;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .banner {
        display: block;
        width: 1.6rem;
        height: 1.6rem;
        margin: 0 0;
      }

      .txt {
        width: 60%;
        height: 1.6rem;
        display: flex;
        flex-direction: column;
        justify-content: space-between;

        .top-bg {
          width: 100%;
          height: 1.4rem;

          // border: 1px solid red;
          p:nth-child(1) {
            width: 100%;
            height: 0.36rem;
            // border: 1px solid red;
            font-size: 0.3rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #333;
          }

          p:nth-child(2) {
            font-size: 0.28rem;
            margin-top: 0.14rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #888;
          }

          p:nth-child(3) {
            font-size: 0.3rem;
            margin-top: 0.36rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            color: #ff2742;
          }
        }
      }
    }

    .bottom-txt {
      font-size: 0.28rem;
      text-align: center;
      color: #ccc;
      margin-top: 0.2rem;
    }
  }
}
</style>
