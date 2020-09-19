<template>
  <div>
    <!-- <h1>这是详情页</h1> -->
    <!-- 最上面的导航栏 -->

    <van-nav-bar
      title="买你所想，购你所爱"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    >
      <template #right>
        <van-icon name="search" size="30" />
      </template>
    </van-nav-bar>
    <!-- 包上一层 -->
    <div class="include">
      <div>
        <div>
          <div class="goodpic">
            <img :src="datalist.proimg" />
          </div>
          <!-- 价格 -->
          <div class="goodprice">￥{{ datalist.price }}</div>
          <!-- 名称 -->
          <div class="goodname">{{datalist.proname}}</div>
          <!-- 这里搞一个随机数 库存-->

          <div class="goodsales">限时秒杀中：{{ datalist.sales}}</div>
        </div>

        <!-- 积分商城上线 -->
        <div class="money">
          <div class="money-left">
            <p>积分商城上线了，详戳</p>
          </div>
          <div class="money-right">
            <van-icon name="gold-coin-o" />
            <van-icon name="arrow" />
          </div>
        </div>

        <!-- 公告 -->
        <div class="notice">
          <div class="notice-1">
            <img src="./img/t_23.png" />
          </div>
          <div class="notice-2">提供24小时快速配送服务。</div>
        </div>
        <!-- 28分钟快送 -->
        <div class="ershiba">
          <div class="ershiba-1">
            <div class="ershiba-1-left">
              <van-icon name="cart-circle-o" />
            </div>
            <div class="ershiba-1-right">28分钟快送</div>
          </div>
          <div class="ershiba-1">
            <div class="ershiba-1-left">
              <van-icon name="passed" />
            </div>
            <div class="ershiba-1-right">满48免运费</div>
          </div>
          <div class="ershiba-1">
            <div class="ershiba-1-left">
              <van-icon name="service-o" />
            </div>
            <div class="ershiba-1-right">24小时服务</div>
          </div>
        </div>

        <!-- 优惠卷  套用上面的样式-->
        <div class="money">
          <div class="money-left">
            <p>优惠卷</p>
          </div>
          <div class="money-right">
            暂无可用vuebe
            <van-icon name="arrow" />
          </div>
        </div>

        <!-- 商品详情 -->
        <div class="gooddetail">
          <p>{{datalist.note}}</p>
          <div class="goodpic">
            <img :src="datalist.proimg" />
          </div>
        </div>
      </div>
    </div>
    <!-- 最下面导航
    -->
    <van-goods-action>
      <van-goods-action-icon icon="chat-o" text="客服" @click="service" />
      <van-goods-action-icon icon="cart-o" text="购物车" @click="shopcart" />
      <van-goods-action-icon icon="shop-o" text="店铺" @click="onClickIcon" />
      <!-- <van-goods-action-button type="danger" text="加入购物车" @click="addcart" /> -->
      <van-goods-action-button type="danger" text="立即购买" @click="buy" />
    </van-goods-action>
  </div>
</template>

<script>
// 本页面总的引入
import Vue from "vue";
import Vant from "vant";
import "vant/lib/index.css";

// 引入组件

import { NavBar, Icon } from "vant";

// 导航栏
Vue.use(NavBar);
// 图标
Vue.use(Icon);

// 下方导航

import { GoodsAction, GoodsActionIcon, GoodsActionButton } from "vant";
Vue.use(GoodsAction);
Vue.use(GoodsActionButton);
Vue.use(GoodsActionIcon);
import { Toast } from "vant";
// 底部栏

import { Sku } from "vant";
Vue.use(Sku);

export default {
  data() {
    return {
      datalist: "",
      tel: "",
      getProid: "",
    };
  },
  created() {},
  methods: {
    // 顶部
    onClickLeft() {
      var l = confirm("主人真的不把宝贝带回家吗");
      if (l == true) {
        this.$router.go(-1);
      } else {
        alert("把喜爱的宝贝带回家吧!");
      }
    },
    onClickRight() {
      var r = confirm("确定去寻找更多宝贝吗？");
      if (r == true) {
        this.$router.push("/search");
      } else {
        alert("主人还是舍不得人家呢!");
      }
    },
    service() {
      this.$router.push("service");
    },
    shopcart() {
      this.$router.push("/shopCart");
    },
    onClickIcon() {
      Toast("店铺尚未开放参观");
    },
    buy() {
      this.tel = localStorage.getItem("tel");
      let datas = {
        proid: this.datalist.proid,
        num: 1,
        tel: this.tel,
        type: this.datalist.type,
        brand: this.datalist.brand,
        proname: this.datalist.proname,
        price: this.datalist.price,
        detail: this.datalist.detail,
        checked:true
      };
      console.log(datas);
      this.$axios.post("/api/shopCart/insert", datas).then((res) => {
        console.log(res);
      });
      this.$router.push({path:'/shopcart'})
    },
    getList() {
      this.getProid = this.$route.params.proid
      console.log(this.$route.params.proid);
      this.$axios.get("/api/pros/detail?proid=" + this.getProid).then((res) => {
        this.datalist = res.data.data;
        console.log(this.datalist);
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
/* 导航栏 */
.nav {
  width: 100%;
  /* position: fixed; */
}

/* 包衣
 */
.include {
  overflow: auto;
  width: 100%;

  flex: 1;
  display: flex;

  flex-direction: column;
}

/* 图片 */
.goodpic {
  width: 100%;
}

.goodpic > img {
  width: 100%;
  height: 450px;
}

/* 名称
 */

.goodname {
  width: 100%;
  /* color: ; */
  font-size: 20px;
}

/* 价格
  */

.goodprice {
  color: crimson;
  font-size: 25px;
  /* font-family: ; */
}

/* 库存 */
.goodsales {
  font-size: 16px;
  color: red;
}

/* 公告 */

.notice {
  height: 22px;
  font-size: 013px;
  margin-left: 20px;
  /* padding-top: 5px; */
}

.notice-1 {
  float: left;
  height: 20px;
}

.notice-1 > img {
  height: 20px;
}

.notice-2 {
  float: left;
  margin-left: 12px;
}

/* 二十八
      */

/* 二十八 */

.ershiba {
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 16px;
}

.ershiba-1 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: green;
}

.ershiba-1-left {
  padding-top: 5px;
  margin-right: 5px;
}

/* 积分商城*/

.money {
  width: 100%;
  height: 23px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.money p {
  font-size: 12px;
  color: red;
  margin-left: 20px;
}

.money-right {
  color: crimson;
  margin-right: 20px;
}

.gooddetail > p {
  margin-top: 10px;
  font-size: 20px;
}
</style>
