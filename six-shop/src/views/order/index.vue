<template>
    <div>
        <div>
            <van-nav-bar
                    title="订单详情"
                    left-text="返回"
                    left-arrow
                    @click-left="onClickLeft"
            />
        </div>
        <div>
            <van-address-list
                    v-model="chosenAddressId"
                    :list="list"
                    @edit="onEdit"
            />
        </div>
        <div>
            <div class="brand">
                六铺
            </div>
            <div class="cartlists-box">
                <ul class="cartlists">
                    <li class="cartlists-content" v-for="(item,index) in orderData" :key="index">
                                <div class="cartlist-content-img">
                                    <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1600321788028&di=6c72db62b467e8344e242eec883343f5&imgtype=0&src=http%3A%2F%2Fimage.biaobaiju.com%2Fuploads%2F20190807%2F13%2F1565155717-oeNKzkdHcS.jpg">
                                </div>
                                <div class="cartlist-content-right">
                                    <p class="name">{{item.brand}}</p>
                                    <p class="messages">{{item.proname}}</p>
                                    <div class="pricenum-box">
                                        <span class="price">￥<em class="int">{{(item.price)}}</em></span>
                                        <span class="but">
                                        <label>购买数量：<input type="number" class="shopnum" :value="item.num"></label>
                                    </span>
                                    </div>
                                </div>
                    </li>
                </ul>
                <div class="buyprice">
                    <span>￥{{totalPrice}}</span>
                </div>
            </div>
        </div>
        <div>
            <!-- 优惠券单元格 -->
            <van-coupon-cell
                    @click="showList = true"
                    :coupons="coupons"
                    :chosen-coupon="chosenCoupon"
            />
            <!-- 优惠券列表 -->
            <van-popup
                    v-model="showList"
                    round
                    position="bottom"
                    style="height: 90%; padding-top: 4px;"
            >
                <van-coupon-list
                        :coupons="coupons"
                        :chosen-coupon="chosenCoupon"
                        :disabled-coupons="disabledCoupons"
                        @change="onChange"
                        @exchange="onExchange"
                />
            </van-popup>
        </div>
        <div>
            <p class="wx" @click="mode = '1'">
			    <span>
				    <img src="@/assets/img/wx.png" alt="">微信支付
			    </span>
                <img src="@/assets/icon/Correct.png" alt="" class="icon-Correct" v-if="mode=='1'">
            </p>
            <p class="zhi_fu_bao" @click="mode = '2'">
			    <span>
				    <img src="@/assets/img/zhifubao.png" alt="">
				    支付宝
			    </span>
                <img src="@/assets/icon/Correct.png" alt="" class="icon-Correct" v-if="mode=='2'">
            </p>
        </div>
        <div class="payment-bg">
            <span class="SumPriceTitle">实付款 : </span>
            <span class="SumPrice">￥ {{finalPrice}}</span>
            <div class="button" @click="sub">
                立即支付
            </div>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import { NavBar, Toast, AddressList, CouponCell, CouponList, popup  } from 'vant';
    Vue.use(NavBar)
        .use(AddressList)
        .use(CouponCell)
        .use(CouponList)
        .use(popup);

    const coupon = {
        id:1,
        available: 1,
        condition: '无使用门槛\n最多优惠12元',
        reason: '',
        value: 660,
        name: '优惠券名称',
        startAt: 1489104000,
        endAt: 1514592000,
        valueDesc: '6.6',
        unitDesc: '元',
    };
    const coupo = {
        available: 1,
        condition: '无使用门槛\n最多优惠12元',
        reason: '',
        value: 990,
        name: '优惠券名称',
        startAt: 1489104000,
        endAt: 1514592000,
        valueDesc: '9.9',
        unitDesc: '元',
    };
    export default {
        data() {
            return {
                totalPrice:'',
                finalPrice:'',
                showList:false,
                chosenCoupon: -1,
                coupons: [coupon],
                disabledCoupons: [coupo],
                chosenAddressId: '1',
                // 支付方式
                mode: '1',
                list: [
                    {
                        id: '1',
                        name: '张三',
                        tel: '13000000000',
                        address: '浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室',
                        // isDefault: true,
                    }
                ]
            };
        },
        methods: {
            onClickLeft() {
                this.$router.go(-1)
            },
            onEdit(item, index) {
                Toast('选择地址:' + index);
            },
            onChange(index) {
                this.showList = false;
                this.chosenCoupon = index;
            },
            onExchange(code) {
                this.coupons.push(coupon);
            },
            sub(){
                Toast('哈哈哈哈哈哈哈哈哈哈')
            }
        },
        computed:{
            orderData(){
                let orderlist = JSON.parse(localStorage.getItem(("order")))
                let totalPrice = JSON.parse(localStorage.getItem(("totalPrice")))
                this.totalPrice = (totalPrice/100).toFixed(2)
                this.finalPrice = this.totalPrice-this.coupons[0].valueDesc
                // console.log(this.totalPrice,this.coupons[0].valueDesc)
                return orderlist
            }
        }
    }
</script>
<style lang="less">
    body{
        background-color: snow;
    }
    .van-address-list{
        padding: 0;
        .van-address-item{
            background-color: seashell;
            .van-address-item__value{
                background-color: lavenderblush;
            }
        }
        .van-address-list__bottom{
            display: none;
        }
    }
    .brand{
        width: 100%;
        height: 50px;
        font-size: 16px;
        /*font-weight: bold;*/
        color: #000;
        line-height: 36px;
        padding: 7px;
        margin-top: 5px;
        background-color: lightpink;
        border-bottom: 1px solid gainsboro;
        border-top: 1px solid gainsboro;
    }
    .cartlists-box {
        width: 100%;
        height: 100%;
        background-color:whitesmoke;
        .cartlists{
            margin: 5px;
            .cartlists-content{
                background-color: lavenderblush;
                border-radius: 10px;
                margin: 5px;
                padding-top: 10px;
                min-height: 120px;
                display: flex;
                justify-content: space-between;
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
                            font-size: 14px;
                            margin-bottom: 6px;
                            word-break: break-all;
                            overflow: hidden;
                            display: -webkit-box;
                            -webkit-line-clamp:2;
                            -webkit-box-orient: vertical;
                        }
                        .messages{
                            font-size: 12px;
                            background-color: #FCDDEF;
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
                                .shopnum{
                                    display: inline-block;
                                    margin:30px 20px 0 0;
                                    width: 30px;
                                    height: 20px;
                                    background-color: white;
                                    line-height: 20px;
                                    text-align: center;
                                }
                            }
                        }
                    }
                }
            }
        .buyprice{
            width: 100%;
            height: 40px;
            line-height: 40px;
            font-size: 18px;
            color: red;
            font-weight: bold;
            text-align: right;
            background-color: seashell;
            border-top:1px solid #bcbbbc ;
            padding-right: 20px;
        }
    }
    .icon-Correct{
        width: 0.38rem;
        margin-right: 0.3rem;
    }
    .wx {
        height: 1rem;
        line-height: 1rem;
        background-color: #fff;
        font-size: 0.3rem;
        margin-top: 20px;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
            display: flex;
            align-items: center;

            img {
                width: 0.38rem;
                margin-right: 0.12rem;
                margin-left: 0.2rem;
            }
        }
        .icon {
            margin: 0.2rem;
        }
    }
    .zhi_fu_bao {
        height: 1rem;
        line-height: 1rem;
        font-size: 0.3rem;
        background-color: #fff;
        border-bottom: 1px solid #eee;
        display: flex;
        align-items: center;
        justify-content: space-between;
        span {
            display: flex;
            align-items: center;

            img {
                width: 0.38rem;
                margin-right: 0.12rem;
                margin-left: 0.2rem;
            }
        }
        .icon {
            margin: 0.2rem;
        }
    }
    .payment-bg {
        width: 100%;
        height: 50px;
        background-color: #fff;
        padding: 0 0;
        position: fixed;
        bottom: 0;
        z-index: 10;
        margin: 0;
        .SumPriceTitle {
            display: block;
            width: 1.2rem;
            height: 100%;
            // border: 1px solid red;
            float: left;
            font-size: 0.3rem;
            color: #333;
            text-align: center;
            line-height: 1.1rem;
            margin-left: 0.3rem;
        }

        .SumPrice {
            display: block;
            width: 1.9rem;
            height: 100%;
            // border: 1px solid red;
            float: left;
            font-size: 0.3rem;
            color: #ff2742;
            line-height: 1.1rem;
        }

        .button {
            width: 3rem;
            height: 100%;
            background-color: #ff2742;
            color: #fff;
            font-size: 0.38rem;
            text-align: center;
            line-height: 1.1rem;
            float: right;
        }
    }
</style>