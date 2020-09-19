<template>
    <div class="cart-box">
        <div class="cartHeader-box">
            <van-nav-bar
                    title="购物车"
                    right-text="管理"
                    left-arrow
                    @click-left="onClickLeft"
                    @click-right="onClickRight"
            />
        </div>
        <div class="myAddress" @click="toAddress">
            <span>设置收货地址</span>
            <span class="iconfont icon-jinru"></span>
        </div>
        <div>
            <div class="brand">
                六铺
            </div>
            <div class="cartlists-box">
                <ul class="cartlists">
                    <li class="cartlists-content" v-for="(item,index) in cart" :key="index">
                        <div>
                            <label>
                                <img src="@/assets/icon/CheckedBoxActive.png" alt="" class="cartlists-content-left" v-if="item.checked == true" @click="addcart(index)">
                                <img src="@/assets/icon/CheckedBox.png" alt="" class="cartlists-content-left" v-else @click="addcart(index)">
                            <div class="cartlist-content-img">
                                <img :src="item.detail">
                            </div>
                            <div class="cartlist-content-right">
                                <p class="name">{{item.brand}}</p>
                                <p class="messages">{{item.proname}}</p>
                                <div class="pricenum-box">
                                    <span class="price">￥<em class="int">{{(item.price)}}</em></span>
                                    <span class="but">
                                        <button class="incr" @click="incr(index,item.num)">-</button>
                                        <input type="number" class="shopnum" :value="item.num">
                                        <button class="decr" @click="decr(index)">+</button>
                                    </span>
                                </div>
                            </div>
                            </label>
                        </div>

                        <div class="cartdele">
                            <button>删除</button>
                        </div>

                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-footer">

        </div>
        <div class="totalprice">
            <van-submit-bar :price="sum" button-text="提交订单" @submit="onSubmit">
                <van-checkbox v-model="ischecked" @click="checkAll">全选</van-checkbox>
            </van-submit-bar>
        </div>
        <p class="un" v-if="p">空空如也~</p>
    </div>
</template>

<script>
    import '@/assets/iconfont/iconfont.css'
    import Vue from 'vue';
    import { SubmitBar ,NavBar, Toast, Card, Tag, Button, Checkbox, CheckboxGroup,Cell,CellGroup } from 'vant';
    import { mapGetters } from 'vuex'
    Vue.use(NavBar)
        .use(Toast)
        .use(Card)
        .use(Tag)
        .use(Button)
        .use(Checkbox)
        .use(CheckboxGroup)
        .use(Cell)
        .use(CellGroup)
        .use(SubmitBar);

    export default {
        name: "index",
        data() {
            return {
                checkedColor:'#F2270C',
                ischecked:true,
                carts:[],
                sum:0,
                p:false
            }
        },

        computed:{
            ...mapGetters(['cart']),
        },
        created(){

        },
        methods: {

            toAddress(){
                this.$router.push({path:"/address"})
            },
            onClickLeft() {
                this.$router.go(-1)
            },
            onClickRight() {
                Toast('管理这个问题emmm...未做');
            },
            incr(index,num){
                if(num>1){
                    this.$store.dispatch('incr1',index)
                }
            },
            decr(index){
                this.$store.dispatch('decr1',index)
            },
            //单选
            addcart(index){
                console.log(index)
                this.cart[index].checked = !this.cart[index].checked;
                console.log(this.cart[index].checked)
                // console.log(item)
                let len = 0
                for(let i = 0;i < this.cart.length; i++){
                    if(this.cart[i].checked == true){
                        len++
                    }
                }
                if(len == this.cart.length){
                    this.ischecked = true
                }else{
                    this.ischecked = false
                }
                // this.$axios.put('')
            },
            //全选
            checkAll() {
                if(this.ischecked == true){
                    for(let i = 0;i < this.cart.length; i++){
                        this.cart[i].checked = true
                    }
                }else{
                    for(let i = 0;i < this.cart.length; i++){
                        this.cart[i].checked = false
                    }
                }
            },
            onSubmit(){
                // console.log(this.sum)
                localStorage.setItem('totalPrice',this.sum)
                if (this.sum > 0) {
                    let item = {
                        arr: []
                    }
                    for (let i = 0; i < this.cart.length; i++) {
                        if (this.cart[i].checked == true) {
                            item.arr.push(this.cart[i])
                            // item.sum = this.sum
                        }
                    }
                    this.$store.state.commodity = item
                    // console.log(item.arr)
                    // console.log(JSON.stringify(item.arr))
                    localStorage.setItem('order',JSON.stringify(item.arr))
                    this.$router.push({path:'/order'})
                } else {
                    alert('请选择商品')
                }
                console.log(this.$store.state.commodity)
            }

        },
        mounted(){
            console.log(this.cart)
            for(var i = 0;i<this.cart.length;i++) {
                if(this.cart[i].checked == false){
                   this.ischecked = false
                }
            }
        },
        updated(){
            let shopCartAll = []
            for(let i=0;i<this.cart.length;i++){
                if(this.cart[i].checked == true){
                    shopCartAll.push(this.cart[i])
                }
            }
            let Sum = 0
            for (let j = 0; j < shopCartAll.length; j++) {
                // Sum += (shopCartAll.reduce((prev,next)=>{
                //     return prev + next.price * next.num
                // },0))*100
                // console.log(Sum)
                Sum +=shopCartAll[j].price* shopCartAll[j].num
            }
            console.log(Sum)
            this.sum = Sum*100

            if(this.cart.length == 0){
                this.p = true
            }else{
                this.p = false
            }
        },
        async beforeMount(){
            let url = 'http://10.9.70.187:3000/api/shopCart'
            await this.$axios.get(url).then(ret=>{
                this.$store.dispatch('cart',ret.data.data)
                // console.log(ret.data.data[0])
                // console.log(this.cart.length)
                // console.log(item)
                console.log(this.cart)
            })
        }

    }
</script>

<style lang="less" scoped>
.cart-box{
    /*background-color: #F8F3F8;*/
    background-color: #EAEAEB;
    width: 100%;
    height: 100%;
}
.cartHeader-box {
    height: 44px;
    
}
.myAddress{
    height: 50px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color:#656C89 ;
    color: white;
    font-size:15px;
    padding:0 15px;
}
.brand{
    width: 100%;
    height: 40px;
    font-size: 14px;
    color: #000;
    line-height: 28px;
    padding: 7px;
    margin-top: 10px;
    background-color: white;
    border-bottom: 1px solid gainsboro;
}
.cartlists-box {
    /*background: cornsilk;*/
    width: 100%;
    height: 100%;
    background-color: #EAEAEB;
    .cartlists{
        margin: 10px;
        /*background-color: #EAEAEB;*/
        /*background-color: white;*/
        .cartlists-content{
            background-color: white;
            border-radius: 10px;
            margin: 10px 0;
            /*background-color: aqua;*/
            margin-bottom: 20px;
            min-height: 130px;
            :nth-child(1){
                width: 100%;
                height: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                /*margin-bottom: 15px;*/
                .cartlists-content-left{
                    width: 18px;
                    height: 18px;
                    border-radius: 50px;
                    border: 1px solid #000;
                    margin: 0 5px;
                    /*color: red;*/
                    /*background-color: crimson;*/
                    text-align: center;
                    span{
                        display: inline-block;
                        width: 100%;
                        font-size: 16px;
                    }
                }
                .cartlist-content-img{
                    width: 100px;
                    height: 100px;
                    overflow: hidden;
                    box-shadow: 0 0.2rem 0.6rem 0 rgba(0,0,0,.05);
                    img{
                        border: 0;
                        vertical-align: top;
                    }
                }
                .cartlist-content-right{
                    width: 60%;
                    color: #262626;
                    .name{
                        font-size: 12px;
                        margin-bottom: 6px;
                        word-break: break-all;
                        /*background-color: red;*/
                        overflow: hidden;
                        display: -webkit-box;
                        -webkit-line-clamp:2;
                        -webkit-box-orient: vertical;
                    }
                    .messages{
                        font-size: 10px;
                        background-color: #f2f2f2;
                    }
                    .pricenum-box{
                        margin-top: 10px;
                        display: flex;
                        justify-content: space-between;
                        .price{
                            font-family: JDZH-Regular;
                            font-size: 12px;
                            color: #f2270c;
                            width: 40px;
                            .int{
                                font-size: 18px;
                            }
                        }
                        .but{
                            display: flex;
                            justify-content: space-between;
                            .incr{
                                font-size: 30px;
                                width: 20px;
                                height: 20px;
                                line-height: 20px;
                                padding-bottom: 5px;
                            }
                            .decr{
                                font-size: 20px;
                                width: 20px;
                                height: 20px;
                                line-height: 20px;
                                margin-right: 10px;
                            }
                            .shopnum{
                                display: inline-block;
                                width: 30px;
                                height: 20px;
                                background-color: gainsboro;
                                line-height: 20px;
                                text-align: center;
                            }
                        }
                    }
                }
            }
            .cartdele{
                float: right;
                margin: 10px 10px 20px 0;
            }
        }
    }
}
.cart-footer{
    width: 100%;
    height: 85px;
}
.van-submit-bar__bar{
    position:fixed;
    bottom: 45px;
    left: 0;
    width: 100%;
    height: 60px;
    line-height: 60px;
    background-color:gainsboro ;
}
</style>