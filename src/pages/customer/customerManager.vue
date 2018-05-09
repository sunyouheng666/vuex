<template>
  <div class="pageBox">
    <mt-header title="客户管理" fixed>
      <mt-button icon="back" slot="left" @click.native="back">
        返回
      </mt-button>
      <mt-button slot="right" @click.native="fnclearAll" class="mr10" v-show="selected==1">
        清空
      </mt-button>
      <mt-button slot="right" @click.native="searchCustomer" class="mr10" v-show="selected==1">
        查询
      </mt-button>
      <mt-button slot="right" @click.native="searchCustomerHangye" class="mr10" v-show="selected==2&&showHangye">
        查询
      </mt-button>
      <mt-button slot="right" @click.native="searchZuijin" class="mr10" v-show="selected==3">
        筛选
      </mt-button> 
    </mt-header>
    <div style="padding-top:39px;">
      <mt-navbar v-model="selected">
        <mt-tab-item id="1" @click.native="selected = '1'" v-show='condition'>
          条件查询
        </mt-tab-item>
        <mt-tab-item id="2" @click.native="selected = '2'" v-show='industry'>
          行业查询
        </mt-tab-item>
        <mt-tab-item id="3" @click.native="selected = '3'" v-show='visiting'>
          最近访问
        </mt-tab-item>
        <mt-tab-item id="4" @click.native="selected = '4'"  v-show='approval'>
          删除审批
        </mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <!-- 条件查询 -->
        <mt-tab-container-item id="1">
          <div v-if='selected == 1'>
            <searchTiaojian ref="searchTiaojian" :clearAll='clearAll'></searchTiaojian>
          </div>
          </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <!-- 行业查询 -->
          <div v-if='selected == 2'>
            <searchHangye ref="searchHangye" @showHangyeChange="showHangyeChange"></searchHangye>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="3">
          <!-- 最近访问 -->
          <div v-if='selected == 3'>
            <searchRecently></searchRecently>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="4">
          <!-- 删除审批 -->
          <div v-if='selected == 4'>
            <shenpi :tabType="tabType" ></shenpi>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        showHangye:true,                  //行业查询
        condition:false,                  //删除审批（管理权限显示）
        industry:false,                   //删除审批（管理权限显示）
        visiting:false,                   //删除审批（管理权限显示）
        approval:false,                   //删除审批（显示）
        clearAll:0,                       //清除功能
        selected: '1',                    //标签页ID
        tabType:"",                       //删除审批驳回使用
      }
    },
    created:function(){ 
    },
    mounted: function() {
      this.menuShow();
    }, 
    watch:{
      'selected':function(n){
        if(n == 2){
          this.showHangye = true;
        } 
      }
    },
    methods: {
      showHangyeChange(val){
        this.showHangye = val;
      },
      searchZuijin:function(){              //最近访问筛选
        this.$router.push({ path: '/searchRecentlyform' });
      },
      menuShow:function(){               //判断是否有删除审批权限
        let type = this.$route.query.type; 
        this.userInfo = JSON.parse(localStorage.userInfo);
        var menu = this.userInfo.data;
        for (var i = 0; i < menu.length; i++) {
          if (menu[i].label == "客户管理") {
            for (var j= 0; j < menu[i].children.length; j++) {
              let me = this;
              if ( menu[i].children[j].url=="/condition") {
                this.condition = true;
                if(type == undefined){
                  setTimeout(function() {
                    me.selected = '1';
                  }, 5);
                }
              }
              if ( menu[i].children[j].url=="/industry") {
                this.industry = true;
                if(type == undefined){
                  setTimeout(function() {
                    me.selected = '2';
                  }, 4);
                }  
              }
              if ( menu[i].children[j].url=="/visiting") {
                this.visiting = true;
                if(type == undefined){
                  setTimeout(function() {
                    me.selected = '3';
                  }, 3);
                }   
              }
              if ( menu[i].children[j].url=="/delete") {
                this.approval = true;
                if(type == undefined){
                  setTimeout(function() {
                    me.selected = '4';
                  }, 2);
                }
              }  
            }  
          }
        }
        let me = this;
        setTimeout(function() {
          if(type != undefined){
            if(type == '6'){
              me.selected = '4';
              setTimeout(function() {
                me.tabType = '6';
              }, 100);
            }else if(type == '5'){
              me.selected = '4';
              setTimeout(function() {
                me.tabType = '5';
              }, 100);
            }else{
              if(type == '4'){
                me.tabType = '4';
              }
            }
            if(type == 1){
              me.selected = '1';
            }else if(type == 2){
              me.selected = '2';
            }else if(type == 3){
              me.selected = '3';
            }else if(type == 4){
              me.selected = '4';
            }
          }
        }, 20);
      },
      fnclearAll: function() {              //清空所有
        this.clearAll =  Math.random(); 
      },
      searchCustomer(){                     //条件查询
        this.$refs.searchTiaojian.searchCustomer();
      },
      searchCustomerHangye(){
        this.$refs.searchHangye.searchCustomerHangye();
      },
      back: function() {                    //返回功能
        this.$router.push({path: 'home'});
      }
    }
  }
</script>
<style>
  .mint-tab-container-wrap {display: -webkit-box;display: -ms-flexbox;display: flex;margin-top: 3px!important;}
  .mint-cell-text {vertical-align: middle;color: #2894e5!important; font-size: 14px!important;}
  .mint-cell-value{font-size: 14px!important;}
</style>