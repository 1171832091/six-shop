import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userState:false,
    addressList:[
      {
        id: "1",
        name: "张三",
        tel: "13000000000",
        address: "浙江省杭州市西湖区文三路 138 号东方通信大厦 7 楼 501 室",
        isDefault: true,
        checked:true
      },
      {
        id: "2",
        name: "李四",
        tel: "1310000000",
        address: "浙江省杭州市拱墅区莫干山路 50 号",
        isDefault: false,
        checked:false
      },
    ],
    disabledList: [
      {
        name: "王五",
        tel: "1320000000",
        address: "浙江省杭州市滨江区江南大道 15 号",
      },
    ],
  },
  mutations: {
    changUserState(state,target){
      state.userState=target
    },
    addAddress(state,target){
      state.addressList.push(target)
      console.log(state.addressList)
    }
  },
  actions: {
  },
  modules: {
  }
})
