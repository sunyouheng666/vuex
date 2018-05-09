import Vue from "vue"
import axios from 'axios';
import {apilist} from '../api/apiList'
var Sale = Vue.prototype;
export const moduleA = {
  state:{
        text:'Vuex测试文字',
        count : 0
    },
    getters:{
        changeText : state =>{
            var text = state.text+"getters";
            return text
        },
        count: state =>{
            var text = state.count;
            return text
        },
    },
    mutations :{
        increment (state,payload) {
            state.count += payload;
        },
        getSelectEmployeeList(state,payload){
            state.count = payload;
        },
    },
    actions:{
        getSelectEmployeeList(context) {                  //获取人员信息
            let Arr = [];
            axios.post(Sale.html_url + Sale.Apilist.selectEmployeeList, {}).then(function (data) {
                var Arr  = data.data.data;
                context.commit('getSelectEmployeeList', Arr[0].id);
            }).catch(function (e) { });
        }
    }
}