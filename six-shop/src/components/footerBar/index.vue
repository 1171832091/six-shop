<template>
    <div>
        <ul class="footBar">
            <router-link tag="li" exact to="/">首页</router-link>
            <router-link tag="li" to="/list">分类</router-link>
            <router-link tag="li" to="/shopcart">购物车</router-link>
            <router-link tag="li" to="/mine">个人中心</router-link>
        </ul>

    </div>
</template>

<script>
    export default {
        name: "index"
    }
</script>

<style scoped>
.footBar{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: aqua;

}
</style>