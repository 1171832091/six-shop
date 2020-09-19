<template>
  <div>
    <van-nav-bar
      title="地址"
      left-text="返回"
      right-text="帮助"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-address-list
      v-model="chosenAddressId"
      :list="list"
      :disabled-list="disabledList"
      disabled-text="以下地址超出配送范围"
      default-tag-text="默认"
      @add="onAdd"
      @click-item="checked"
      @edit="onEdit"
    />
    <van-button
      class="saveBut"
     @click="onSureqq"
      color="linear-gradient(to right, #ff6034, #ee0a24)"
    >确认地址</van-button>
  </div>
</template>

<script>
import Vue from "vue";
import { AddressList, Toast, NavBar, Button } from "vant";
import { mapState, mapMutations } from "vuex";
Vue.use(AddressList).use(Toast).use(NavBar).use(Button);

export default {
  data() {
    return {
      chosenAddressId: "1",
      disabledList: [
        {
          id: "3",
          name: "王五",
          tel: "1320000000",
          address: "浙江省杭州市滨江区江南大道 15 号",
        },
      ],
      index: 0,
    };
  },
  computed: {
    ...mapState(["addressList"]),
  },
  methods: {
    onSureqq() {
      localStorage.setItem("Dname", this.addressList[this.index].name);
      localStorage.setItem("Dtel", this.addressList[this.index].tel);
      localStorage.setItem("Daddress", this.addressList[this.index].address);
    },
    onClickLeft() {
      this.$router.go(-1);
    },
    getList() {
      this.list = this.addressList;
    },
    onClickRight() {
      Toast({
        message: "有事？",
        icon:
          "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=4215493778,880544543&fm=26&gp=0.jpg",
      });
    },
    onAdd() {
      this.$router.push({ path: "/addAddress" });
    },
    onEdit(item, index) {
      Toast("编辑地址:" + index);
    },
    checked(item, index) {
      console.log(item, index);
      this.index = index;
    },
  },
  created() {
    this.getList();
  },
  mounted() {},
};
</script>

<style scoped>
.saveBut {
  position: relative;
  left: 38%;
  border-radius: 20px;
}
</style>