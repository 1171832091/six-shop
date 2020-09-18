<template>
  <div>
    <van-nav-bar
      title="注册"
      left-text="返回"
      right-text="帮助"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-address-edit
      :area-list="areaList"
      show-postal
      show-delete
      show-set-default
      name:uname
      show-search-result
      :search-result="searchResult"
      :area-columns-placeholder="['请选择', '请选择', '请选择']"
      @save="onSave"
      @delete="onDelete"
      @change-detail="onChangeDetail"
    />
  </div>
</template>

<script>
import Vue from "vue";
import { AddressEdit, Toast, NavBar } from "vant";
import areaList from "../../utils/areaList";
import { mapState, mapMutations } from "vuex";
Vue.use(AddressEdit).use(Toast).use(NavBar);
export default {
  data() {
    return {
      areaList,
      tel: "",
      naem: "1111",
      address: "",
      searchResult: [],
      target: {},
    };
  },
  methods: {
    ...mapMutations(["addAddress"]),
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
    onSave(content) {
      console.log(content);
      this.target.name = content.name;
      this.target.tel = content.tel;
      this.target.id = 3;
      this.target.isDefault = content.isDefault;
      this.target.address = content.province + content.city + content.county;
      Toast.success("保存成功");
      this.$store.commit("addAddress", this.target);
      this.$router.go(-1);
    },
    onDelete() {
      Toast("delete");
    },
    onChangeDetail(val) {
      if (val) {
        this.searchResult = [
          {
            name: "黄龙万科中心",
            address: "杭州市西湖区",
          },
        ];
      } else {
        this.searchResult = [];
      }
    },
  },
};
</script>

<style scoped>
.van-cell {
  padding: 11px 22px !important;
}
</style>