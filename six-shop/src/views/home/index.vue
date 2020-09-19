<template>
<div >
      
  
<van-search
    class="nav"
  show-action
  label="买"
  input-align="center"
  background="pink"
  placeholder="小可爱要买什么"
  @click="sousuo"
  >
  <template #action>
    <div style="color:red;">搜索</div>
  </template>
</van-search>
<div>
<div class="lunbo">
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item v-for="(itemm) in image" :key="itemm">
      <img v-lazy="itemm" />
    </van-swipe-item>
    </van-swipe>
</div>
<van-grid :column-num="3" :border="false">
  <van-grid-item v-for="value in fenlei" :key="value.name" class="aaa" @click="qqq(value.proid)" >
    <div>{{value.name}}</div>
    <img class="aaa12" v-lazy="value.src">
  </van-grid-item>
</van-grid>
<van-swipe class="my-swipe-1" :autoplay="3000" indicator-color="white">
  <van-swipe-item class="my-swipe-11">物价低廉</van-swipe-item>
  <van-swipe-item class="my-swipe-11">包邮到家</van-swipe-item>
  <van-swipe-item class="my-swipe-11">只有想不到</van-swipe-item>
  <van-swipe-item class="my-swipe-11">没有卖不了</van-swipe-item>
</van-swipe>
<div class="box" :style="{height}" >
<van-grid :column-num="2">
  <van-grid-item icon="photo-o" @click="ddj(item.proid)"   v-for="(item) in spxq"  class="bb">
      <div class="bbb">
          <img v-lazy="item.proimg">
          
              {{item.proname}}
              <p style="color:red;">￥{{item.price}} </p> 
      </div>
  </van-grid-item>    
</van-grid>
</div>
<button v-if="btnFlag" @click="backTop" class="btn">返回顶部</button>

</div>
</div>


</template>

<script>
import BetterScroll from "better-scroll";
import axios from 'axios';
import Vue from 'vue';
import { Search,Lazyload,Swipe, SwipeItem,Grid, GridItem,PullRefresh,  } from 'vant';
import 'vant/lib/index.css';
Vue.use(Swipe);
Vue.use(SwipeItem);
Vue.use(Search);
Vue.use(Lazyload);
Vue.use(Grid);
Vue.use(GridItem);
    export default {
      updated(){
        this.$nextTick(()=>{
        this.scroll = new BetterScroll(".box", {
          pullUpLoad: true,
          pullDownRefresh: true,
          click: true
        })
            this.scroll.on("pullingUp", () => {
                console.log('上拉刷新');
                this.getData(2)
                this.scroll.finishPullUp()
        });
      //       this.scroll.on("pullingDown", () => {
      //     console.log('下拉刷新')
		  // // 标识一次下拉动作结束在 
      //     // 该方法调用前不会触发下一次的 pullingDown 事件
      //     this.getData(1)
      //     this.scroll.finishPullDown()
      //   })
        })
      },
          data() {
            return {
        image: [
                'http://5b0988e595225.cdn.sohucs.com/images/20180705/7d655d2be66649909fa67787bd1ba0b1.gif',
                'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=2485631242,3638298595&fm=26&gp=0.jpg',
                ],
        fenlei:[
            {
                id:1,
                name:'女鞋',
                src:"https://img.ilovelook.cn/53/01/d8/5301d88655b87149dde7a035c9754c9d-largeWebp",
                proid:'pro_31b5cdb5-22d8-11ea-a9d6-713133cd4ee0'
            },
            {
                id:2,
                name:'女装',
                src:"https://img.ilovelook.cn/e6/0c/b6/e60cb6afc14db7ad948ce5344bd3ef0a-largeWebp",  
                proid:"pro_31b5cda8-22d8-11ea-a9d6-713133cd4ee0" 
            },
            {
                id:3,
                name:'女包',
                src:"https://img.ilovelook.cn/82/f8/0f/82f80f413f2bd6777581d92f5ea2c67d-largeWebp",
                proid:'pro_31b5cdc4-22d8-11ea-a9d6-713133cd4ee0'
            },
            {
                id:4,
                name:'女配',
                src:"https://img.ilovelook.cn/3f/41/9b/3f419b28bdbba043739c99a9bc341202-largeWebp",
                proid:'pro_31b5cdd8-22d8-11ea-a9d6-713133cd4ee0'
            },
            {
                id:5,
                name:'男士',
                src:"https://img.ilovelook.cn/2e/4d/3b/2e4d3ba9447a60bf1a5ab29a83331324-largeWebp",
                proid:'pro_31b5cde2-22d8-11ea-a9d6-713133cd4ee0'
            },
            {
                id:6,
                name:'美妆',
                src:"https://img.ilovelook.cn/cb/8e/3f/cb8e3f365df18ca7258f9dac10faa9ff-largeWebp",
                proid:'pro_31b5cdf1-22d8-11ea-a9d6-713133cd4ee0'
            },
        ] ,
        spxq:[ ],
        btnFlag:"",
        height:0,
        scroll:null,

                 };
  },
   async mounted(){
       this.getData()
       this.height = document.documentElement.clientHeight - 50 + 'px'
       window.addEventListener('scroll', this.scrollToTop)  
  },
  destroyed(){
    window.removeEventListener('scroll', this.scrollToTop)
  },

     methods: {
       ddj(tatget){
         this.$router.push(`/detail/${tatget}`)
       },
       qqq(tatget){
         this.$router.push(`/list/${tatget}`)
       },
         backTop () {
      const that = this
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5)
        document.documentElement.scrollTop = document.body.scrollTop = that.scrollTop + ispeed
        if (that.scrollTop === 0) {
          clearInterval(timer)
        }
      }, 16)
  },
  // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
  scrollToTop () {
    const that = this
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
    that.scrollTop = scrollTop
    if (that.scrollTop > 3000) {
      that.btnFlag = true
    } else {
      that.btnFlag = false
    }
  },
    sousuo(){
        this.$router.replace('/search')
    },
    async getData(flag = 1){
       let url = "http://10.9.70.187:3000/api/pros"
       let ret = await axios.get(url);
      // console.log(ret)
       if(flag == 1){
           this.spxq = [...ret.data.data,...this.spxq]
       }else{
           this.spxq = [...this.spxq,...ret.data.data]
       } 
    }
    },
  beforeDestroy() {
      this.scroll = null
},
    }
</script>

<style>
.box{
  width: 100%;
  overflow: hidden;
}
.btn{
    background-color: pink;
    color:red;
    position: fixed;
    right: 0px;
    top: 70%;
    height: 100px;
    font-size: 20px;
    line-height: 24px;
    opacity:0.8;
    text-align: center;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(204, 204, 204);
    border-image: initial;
    border-radius: 50%;
}
.my-swipe-11{
    text-align: center;
    font-size: 0.7rem;
    color: palevioletred;
}
.my-swipe-1{
    height: 1rem;
    background-color:pink;
}
  .my-swipe .van-swipe-item {
    color: red;
    font-size: 20px;
    line-height: 150px;
    text-align: center;
    background-color: #39a9ed;
  }
  .my-swipe{
      height: 120px;
  }
  img{
      width: 100%;
      height: 100%;
  }
  .aaa12{
      height: 3rem;
  }
  .bb{
      height: 7.5rem
  }
  .bbb img{
      height: 5.8rem;
  }
 
</style>