<template>
    <div>
<van-search
  show-action
  label="宝贝"
  input-align="center"
  background="pink"
  placeholder="小可爱要买什么"
  v-model="inputText"
  @keyup="sousuo"
  >
  <template #action>
    <div style="color:red;" @click="quxiao">取消</div>
  </template>
</van-search>
<ul>
    <li  @click="dj(item.proid)" v-for="item in result" :key="item._id" >{{item.proname}}{{item.proid}}</li>
</ul>
    </div>
</template>

<script>
import Vue from 'vue';
import { Search } from 'vant';
import axios from 'axios';

Vue.use(Search);



    export default {
        data(){
            return{
                inputText: '',
                text: '',
                nowIndex: -1,
                result: [],
                aaa:'',
            }
        },
        watch:{
            inputText(newVal,oldVal){
                if(newVal != oldVal){
                    console.log(newVal)
                    this.inputText = newVal
                    
                    this.searchUp()
                }
            }
        },
        methods:{
            searchUp(){
                axios.get('http://10.9.70.187:3000/api/pros/search?search='+this.inputText).then((data)=>{
                    this.result = data.data.data
                    console.log(data.data.data)
                })

            },
            dj(target){
                this.$router.push(`/detail/${target}`)
            },
        
            quxiao(){
            this.$router.replace('/')
        },
                sousuo(){
            
                }
    }}
</script>

<style scoped lang="less">
ul{
    padding: 0 10px;
    li{
        width: 100%;
        height: 50px;
        line-height: 43px;
        background: #f9f9f9;
        border-radius: 10px;
        border-bottom: 1px solid #dedede;
        padding: 0 16px;
        margin-top: 10px;
        box-shadow: 1px 20x 3px red;
    }
    li:hover{
        background: pink;
    }
}


</style>