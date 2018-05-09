<template>
  <div class="pageBox">
    <mt-header title="网络电话" fixed>
      <mt-button  v-show="isGPS" icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div class="mainbox">
      <mt-button type="primary" style="margin-left: 20px;font-size: 14px;padding:3px 20px; height:30px;background:#5e67fc;" @click.native="selectCustomerPop">选择客户</mt-button>
      <div class="selectCustomer"   v-show="lianxiren.length !=0 ">
        <div class="customerName" style="font-size: 14px;">{{customerName}}</div>
      </div>
      <div v-for="item in lianxiren" class="lianxiren" v-show="lianxiren.length !=0 ">
        <span style="display:inline-block;font-size: 14px;padding-left: 20px;">
          {{item.link_name}} ─ {{item.number}}
        </span>
        <span>
          <img slot="icon" src="../../../static/image/netPhone2.png" width="24" height="24" @click="phoneSendClick(item,'1')">
        </span>
      </div>
      <div class="selectCustomer">
        <div class="customerName"  style="font-size: 14px;">自定义电话：</div>
      </div>
      <div style="padding:20px;">
        <input type="text" name="firstname" v-model="customerNumber" style="height:30px; line-height:30px; float:left;" maxlength="12">
        <span class="phonebtn">
          <img slot="icon" src="../../../static/image/netPhone2.png" width="24" height="24"   style="margin-top: 3px; " @click="phoneSendClick({},'2')" >
        </span>
      </div>
      <div style="height:65px;width:100%;"></div>
    </div>
    <div v-show="!isGPS" class="footer">
      <div>
        <span @click="goMessage">
          <img src="../../../static/image/message-1.png" style="height:100%;" alt="">
        </span>
        <span @click="back">
          <img src="../../../static/image/home-1.png" style="height:100%;" alt="">
        </span>
        <span>
          <img src="../../../static/image/tel.png" style="height:100%;" alt="">
        </span>
        <span @click="goGPS">
          <img src="../../../static/image/adress-1.png" style="height:100%;" alt="">
        </span>
      </div>
    </div>
    <div class="txl" v-if="popTongxun">
      <customerList v-on:listenChildevent="showchild"></customerList> 
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import axios from 'axios';
  export default {
    data() {
      return {
        customerName: '客户名称',      //客户名称
        customerNumber: '',           //电话号码
        popTongxun: false,            //显示客户查询
        lianxiren: [],                //联系人列表
        userInfo:{},                  //登陆人信息
        isGPS:false,                  //是否来自客户定位
      }
    },
    created:function(){
      if(this.$route.query.from == undefined){
        this.isGPS = false;
      }
      if(this.$route.query.from == 'map'){
        this.isGPS = true;
        this.getCustomerList(this.$route.query.customId);
      }else if(this.$route.query.customId != undefined){
        var obj = {
          "customId":this.$route.query.customId,
          "linkId":this.$route.query.linkId,
          "linkPhone":this.$route.query.linkPhone,
          "cName":this.$route.query.cName,
          "linkName":this.$route.query.linkName
        }
        this.customerNumber = obj.linkPhone;
        this.phoneSendClick(obj,'1');
      }
    },
    watch:{
    },
    mounted: function() { 
      this.getCustomerList();
      this.userInfo = JSON.parse(localStorage.userInfo);
      this.salesmanId = this.userInfo.employeeId;
      this.salesmanName = this.userInfo.employeeName;
    },
    methods: {
      showchild: function(data) {                 //组件传参数
        if (!data.closepop) {
          this.popTongxun = false;
        }
        if (data.id != null) {
          this.getCustomerList(data.id)
        }
        if (data.customerName != null) {
          this.customerName = data.customerName
        } else {
          this.customerName = '客户名称'
        }
      },
      getCustomerList: function(id) {             //获得指定客户的 联系人列表
        var self = this;
        var customerIdstr = '';
        if (!id || id == '') {
          if (self.$route.query.customerId && self.$route.query.customerId != "") {
            customerIdstr = self.$route.query.customerId;
          } else {
            return
          }
        } else {
          customerIdstr = id;
        }
        var param = {
          customId: customerIdstr
        }
        axios.post(self.html_url + self.Apilist.selectContactsListPagingByVoIp, param).then(function(data) {
          self.lianxiren = data.data.data;
        }).catch(function(e) {});
      },
      selectCustomerPop: function() {             //显示客户列表
        this.popTongxun = true;
      },
      phoneSendClick(obj,type){                   //新增拨打电话
        let param = {};
        if(type == "1"){
          param={
            "customId":obj.cust_id,
            "linkId":obj.link_id,
            "linkPhone":obj.number,
            "cName":obj.cust_name,
            "linkName":obj.link_name
          }
        }else{
          if(this.customerNumber == ''){
            MessageBox.alert('请输入电话号码!','提示');
            return false;
          }else if( !/^[0-9*#]+$/g.test(this.customerNumber)){
            MessageBox.alert('请正确输入电话号码!','提示');
            return false;
          }else{
            param={
              "linkPhone": this.customerNumber,
            }
          }
        }
        Indicator.open({
          text: '呼叫中...',
          spinnerType: 'fading-circle'
        });
        axios.post(this.html_url +'/webcall/call', param).then(function(data) {
          setTimeout(function() {
            Indicator.close();
          }, 10000);
        }).catch(function(e) {Indicator.close();}); 
      },
      back: function() {
        if ( String(this.$route.query.from)=='map') {
          window.salePhone.CloseCurrentWebview("");
        }else{
          // this.$router.go(-1);
          this.$router.push({ path: '/home' });
        }
      },
      goGPS: function() {               //客户定位
        var self = this;
        // var salesmanId = self.userInfo.employeeId;
        var sessionId = self.userInfo.sessionId;
        var param = {
          salesmanName: self.userInfo.employeeName,
          salesmanId: self.userInfo.employeeId,
          sessionId: sessionId
        };
        window.salePhone.goGPS(JSON.stringify(param));
      },
      goMessage: function() {          //网络电话
        this.$router.push({ path: '/message' });
      },
    }
  }
</script>
<style scoped>
  .customerName {font-style: 14px;padding: 10 0px;border-bottom: 1px solid gray;}
  .lianxiren {line-height: 40px;border-bottom: 1px solid gray;}
  .lianxiren img {float: right;margin-top: 8px;margin-right: 20px;}
  .mainbox {margin-top: 55px;text-align: left}
  .selectCustomer {line-height: 50px;height: 50px;font-size: 18px;font-weight: bold;text-indent: 20px}
  .phonebtn {display: inline-block;padding-top: 3px; padding-left: 10px;padding-right: 10px;}
  .txl {position: absolute;top: 0;left: 0;background: white; width: 100%;height: 100%;overflow-y: scroll;}
</style>