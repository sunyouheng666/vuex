<template>
  <div class="mainbody" style="">
    <mt-header title="销售管理" class="header-title" fixed>
      <mt-button slot="right" @click.native="goUser">
        <img src="../../static/image/personal.png" style="height:24px;" alt="">
      </mt-button>
    </mt-header>
    <div class="img-box" style="margin-top:5px;">
      <img src="../../static/image/banner.png" style="width:98%;margin:auto; display: inline-block;" alt="">
    </div>
    <div>
      <h1>vuex测试</h1>
      <!-- **{{customTypeArr}}** -->
      **{{text}}**
    </div>
    <div class="img-box">
      <span @click='goMailbox' v-if="isEmail">
        <img src="../../static/image/buttom_1.png" style="width:100%;" alt="">
      </span>
      <span @click='goCustomer' v-if="isCustomer" >
        <img src="../../static/image/buttom_2.png" style="width:100%;" alt="">
      </span>
      <span @click='goSaler' v-if="isSale">
        <img src="../../static/image/buttom_3.png" style="width:100%;" alt="">
      </span>
      <span @click="goEngineering" v-if="isEngineering">
        <img src="../../static/image/buttom_4.png" style="width:100%;" alt="">
      </span>
      <span @click="goContract" v-if="isContract">
        <img src="../../static/image/buttom_5.png" style="width:100%;" alt="">
      </span>
      <span @click="goCustomerRegistration" v-if="isRegistration">
        <img src="../../static/image/buttom_6.png" style="width:100%;" alt="">
      </span>
      <span @click="goHumanManage" v-if="isManage">
        <img src="../../static/image/buttom_7.png" style="width:100%;" alt="">
      </span>
      <span></span>
      <span v-if="!isEmail"></span>
      <span v-if="!isCustomer"></span>
      <span v-if="!isSale"></span>
      <span v-if="!isEngineering"></span>
      <span v-if="!isContract"></span>
      <span v-if="!isRegistration"></span>
      <span v-if="!isManage"></span>
    </div>
    <div class='mainbox'>
      <div class='main-nav'>
        <div class="line"></div>
        <div class="scfk" v-show='hasFeedback' >
          <span class="text-l">
          </span> 
          <span class="text-s">
            市场反馈
          </span> 
          <span class="more" @click='gofeedback'>更多</span>
        </div>
        <div class="fankuibox" v-if='hasFeedback'>
          <div @click="getFeedBackDetail(item.id)">
            <div style="word-wrap:break-word;color:#333;font-weight:900;">
              {{item.customName}}
            </div>
            <div class="item_prop_line">
              <label>反馈时间：</label>
              <span>{{item.gmtCreate | TimeCut}}</span>
            </div>
            <div class="item_prop_line">
              <label>分配时间：</label>
              <span>{{(item.assignDate)}}</span>
            </div>
            <div class="item_prop_line">
              <label >联系人：</label>
              <span style="word-wrap:break-word ;">{{item.contactName}}</span>
            </div>
            <div class="item_prop_line">
              <label>联系电话：</label>
              <span>{{item.contactPhone == null?'无':item.contactPhone}}</span>
            </div>
            <div class="item_prop_line">
              <label>市场销售员：</label>
              <span>{{item.salesmanName}}</span>
            </div>
            <div class="item_prop_line">
              <label>外贸管理顾问：</label>
              <span>{{item.saleManageName}}</span>
            </div>
            <div class="item_prop_line">
              <label>销售客户类型：</label>
              <span>{{item.customType|customerType}}</span>
            </div>
            <div class="item_prop_line">
              <label>反馈类型：</label>
              <span>{{item.feedbackTypeName}}</span>
            </div>
            <div class="item_prop_line">
              <label>状态：</label>
              <span>{{item.followStatus|feedBackStatus}}</span>
            </div>
            <div class="clear"></div>
          </div>
        </div>
        <div class="line"></div>
        <div class="scfk">
          <span class="text-l">
          </span> 
          <span class="text-s">我的任务</span> <span class="more" @click='goSystemTaskk' >更多</span>
        </div>
        <div style="display: flex; height:40px;line-height: 40px;">
          <div style="width: 70%;padding-left: 10px;padding-top: 5px;">
            <mt-progress :value="percentage(mySystemData.completeCount,mySystemData.totalCount)" :bar-height="12"></mt-progress>
          </div>
          <div style=" flex: 1;">
            {{mySystemData.completeCount}}/<span style="color:red;">{{mySystemData.totalCount}}</span> 
          </div>
        </div>
        <div style="padding: 0 10px; line-height: 26px;font-size: 14px;">
          <span v-show="ManageRole!=1">
            <span>{{mySystemData.assignCount==null?0:mySystemData.assignCount }}</span>个分配，
          </span>
          <span>{{mySystemData.signDeleteCount==null?0:mySystemData.signDeleteCount}}</span>个申请删除
          <span v-show="mySystemData.deleteCount!=null">({{mySystemData.deleteCount==null?0:mySystemData.deleteCount}}个申请删除通过)</span>
          ，
          <span>{{mySystemData.logCount==null?0:mySystemData.logCount  }}</span>个日志，
          <span>{{mySystemData.invalidCount==null?0:mySystemData.invalidCount  }}</span>个失效。
        </div>
        <div class="line"></div>
        <div class="scfk">
          <span class="text-l">
          </span> 
          <span class="text-s">系统任务</span>
        </div>
        <div style=" line-height: 40px;font-size: 14px;padding-bottom: 10px;">
          <div style="height:30px; width: 100%;" v-for="item in systemData" :label="systemData" v-show="!systemDataShow">
            <div style=" width: 100%;display: flex;">
              <div  style="width: 24%">
                {{item.employeeName}}
              </div>
              <div style=" flex: 1; display: flex;">
                <div style="width: 70%;padding-top: 5px;">
                  <mt-progress :value="percentage(item.completeCount,item.totalCount)" :bar-height="12"></mt-progress>
                </div>
                <div style=" flex: 1;">
                  {{item.completeCount}}/<span style="color:red;">{{item.totalCount}}</span> 
                </div>
              </div>
            </div>
          </div>
          <div v-show="systemDataShow" :span="24" style="text-align: center;line-height: 40px;font-size: 14px;">
            暂未新建任务分配
          </div>
        </div>
        <div class="chart">
          <div class="echarts2" style="padding-top: 10px;">
            <IEcharts :option="option" style='height:100%;'></IEcharts>
          </div>
        </div>
      </div>
    </div>
    <div class="footer">
      <div>
        <span @click="goMessage">
          <img src="../../static/image/message-1.png" style="height:100%;" alt="">
        </span>
        <span>
          <img src="../../static/image/home.png" style="height:100%;" alt="">
        </span>
        <span @click="goNetphone">
          <img src="../../static/image/tel-1.png" style="height:100%;" alt="">
        </span>
        <span @click="goGPS">
          <img src="../../static/image/adress-1.png" style="height:100%;" alt="">
        </span>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import IEcharts from 'vue-echarts-v3';
  import { MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
        isEngineering:false,          //是否有工程权限
        isContract:false,             //是否有合同权限
        isRegistration:false,         //是否有软件安装权限
        currentTime:"",               //当前时间
        systemDataShow:true,
        systemData:[
          {
            employeeName:"",
            completeCount:0,
            totalCount:0
          }
        ],
        mySystemData:{completeCount:0,totalCount:0},            //我的任务完成情况
        isEmail:false,            //邮件权限
        hasFeedback:false,        //暂无市场反馈数据
        item: {},                 //市场反馈数据
        ManageRole: '',           //管理权限
        saleManageId: '',         //
        postType:"",              //登录人岗位类型
        userInfo: {},             //登录人信息
        isManage: false,          //人事管理权限
        isCustomer: false,        //客户管理
        isSale: false,            //销售管理
        quanxian: false,          //管理范围权限
        shenhe: false,            //审核注册权限
        managecount: false,       //邮件账号管理权限
        media: [
          {
            query: {
              maxWidth: 500
            },
            option: {
              legend: {
                right: 10,
                top: '15%',
                orient: 'vertical'
              },
              series: [{
                  radius: [20, '50%'],
                  center: ['50%', '30%']
                },
                {
                  radius: [30, '50%'],
                  center: ['50%', '75%']
                }
              ]
            }
          }
        ],
        option: {                 //echarts数据
          title: {
            text: '客户最新级别比例图',
            subtext: '',
            x: 'center'
          },
          tooltip: {              //"{b} : {c} ({d}%)"percent
            trigger: 'item',
            formatter: function(param) {
              var str =  param.name;
              var arr = str.split('');
              for (var i = 6; i < arr.length; i += 7) ///25字换行  
              {
                arr[i] += '</br>';
              }
              str = arr.join("")
              return str; 
            }
          },
          legend: {
            left: 20,
            top:'40%',
            orient: 'vertical',
            data: []
          },
          series: [{
            name: '客户最新级别比例图',
            type: 'pie',
            radius: '50%',
            center: ['50%', '22%'],
            data: [],
            label: {
              normal: {
                show: false
              },
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }]
        },
      }
    },
    components: {
      IEcharts
    },
    computed:{
      text(){

        if(this.$store.state.text == ""){
          console.log("this.$store.state.text",window.localStorage.text);
          return window.localStorage.getItem("text");
        }else{
          return this.$store.state.text;
        }
        
      },
      arr(){
        return this.$store.state.arr;
      },
      saleManageArr(){
        return this.$store.state.saleManageArr;
      },
      customTypeArr(){
        return this.$store.state.customTypeArr;
      }
    },
    beforeCreate:function(){
      if (localStorage.userInfo == undefined) {
        MessageBox('提示', '登录失败！');
        this.$router.push({ path: '/login' }); 
        return  
      }
    },
    created: function() {
      this.currentTime = this.timer(new Date());
      this.menuShow();
    },
    mounted: function() {
      this.getFeedback();
      this.getLatestLevelRates();
      this.selectAllSystemTaskRates();
      this.selectMySystemTaskRates();
      this.reducePrice();
      this.getSelectEmployeeList();
      this.getCustomerType();
    },
    methods: {
      getCustomerType(){
        this.$store.dispatch("getCustomerType");
      },
      reducePrice(){
        this.$store.dispatch('getFeedback');
      },
      getSelectEmployeeList(){
        this.$store.dispatch('getSelectEmployeeList');
      },
      percentage(num1,num2){           //计算进度条
        if(num1 == 0 || num2 == 0) return 0
        if(num1 != 0) return  Math.floor(num1/num2*100) ;      
      },
      menuShow: function() {            //显示功能权限
        this.userInfo = JSON.parse(localStorage.userInfo);
        var salesmanId = this.userInfo.employeeId;
        this.saleManageId = this.userInfo.employeeId;
        this.postType  = this.userInfo.postType;
        this.ManageRole = this.userInfo.manageFlag;
        var menu = this.userInfo.data;
        for (var i = 0; i < menu.length; i++) {
          if (menu[i].label == "邮件管理") {
            this.isEmail = true;
          }
          if (menu[i].label == "销售管理") {
            this.isSale = true;
          }
          if (menu[i].label == "客户管理") {
            this.isCustomer = true;
          }
          if (menu[i].label == "工程管理") {
            this.isEngineering = true;
          }
          if (menu[i].label == "合同管理") {
            this.isContract = true;
            let arr = menu[i].children;
            for(let a = 0; a<arr.length ; a++){
              if(arr[a].label == '软件安装'){
                this.isRegistration = true;
              }
            }
          }
          if (menu[i].label == "系统设置") {
            for (var j = 0; j < menu[i].children.length; j++) {
              if (menu[i].children[j].label == "用户注册审核") {
                this.isManage = true;
              }
              if (menu[i].children[j].label == "用户权限设置") {
                this.isManage = true;
              }
              if (menu[i].children[j].label == "邮件账号设置") {
                this.managecount = true
              }
            }
          }
        }
      },
      selectAllSystemTaskRates(){                       //我的任务
        let me = this;
        let param = {
          queryDate:this.currentTime
        };
        axios.post(this.html_url +this.Apilist.selectAllSystemTaskRates, param).then(function(data) {
            me.systemData = data.data.data;
            if(me.systemData.length == 0){
                me.systemDataShow = true;
            }else{
                me.systemDataShow = false;
            }
        }).catch(function(e) {}); 
      },
      selectMySystemTaskRates(){                       //我的任务
        let me = this;
        let param = {
            queryDate:this.currentTime
        };
        axios.post(this.html_url +this.Apilist.selectMySystemTaskRates, param).then(function(data) {
            me.mySystemData = data.data.data;
        }).catch(function(e) {   
        }); 
      },
      timer(type) { 
        let time_html = '';
        let year = type.getFullYear(); 
        let month = type.getMonth() + 1; 
        month < 10 && (month = '0' + month);
        let day = type.getDate();  
        day < 10 && (day = '0' + day);
        let h = type.getHours();
        h < 10 && (h = '0' + h);
        let M = type.getMinutes();
        M < 10 && (M = '0' + M);
        time_html = year + "-" + month+ "-" + day+ " "+'00:00:00';
        return time_html     
      },
      goSystemTaskk() {
        this.$router.push({path: 'systemTask'});
      },
      gofeedback() {
        this.$router.push({path: 'searchfeedBackResult'});
      },
      getFeedback() {                 //查询市场反馈
        var me = this;
        var param = {
          pageRows: 10,
          currenPage: 1,
          pagingRequired: true,
          saleManageIds:this.saleManageId,
        };
        axios.post(this.html_url + this.Apilist.selectFeedbackListPaging, param).then(function(data) {
          let list = data.data.data;
          me.item = list[0];
          if (me.item!=undefined) {
            me.hasFeedback = true
          }
        }).catch(function(e) {});
      },
      getFeedBackDetail(id){            //反馈详情
        this.$router.push({path:"feedBackDetail",query:{'id': id}});
      },
      getLatestLevelRates() {           //客户最新级别占比情况 
        var me = this;
        var param = {};
        axios.post(this.html_url + this.Apilist.selectCustomLatestLevelRates, param).then(function(data) {
          let list = data.data.data;
          me.option.series[0].data = [];
          if (list.length == 0) {
            me.option.series[0].data = [{ name: "没有客户最新级别数据", value: "0" }];
          } else {
            for (let i = 0; i < list.length; i++) {
              let obj = {};
              obj.name = list[i].name;
              if(obj.name.length>20){
                obj.name = obj.name.substring(0,20)+'...';
              }
              obj.value = list[i].cnt;
              me.option.series[0].data.push(obj);
              me.option.legend.data.push(obj.name);
            }
          }
        }).catch(function(e) {});
      },
      goGPS: function() {               //客户定位
        var self = this;
        var salesmanId = self.userInfo.employeeId;
        var sessionId = self.userInfo.sessionId;
        var param = {
          salesmanName: self.userInfo.employeeName,
          salesmanId: salesmanId,
          sessionId: sessionId
        };
        window.salePhone.goGPS(JSON.stringify(param));
      },
      goNetphone: function() {          //网络电话
        this.$router.push({ path: '/searchNetPhone' });
      },
      goMessage: function() {          //网络电话
        this.$router.push({ path: '/message' });
      },
      goUser: function() {              //个人中心
        this.$router.push({ path: '/userCenter', query: { canManageCount: this.managecount } });
      },
      goMailbox: function() {           //邮件管理
        this.$router.push({ path: '/mailbox', query: { employeeId: this.userInfo.employeeId } });
      },
      goSaler: function() {             //销售管理
        this.$router.push({ path: '/saleJournal' });
      },
      goCustomer: function() {          //客户管理
        this.$router.push({ path: '/customerManager' });
      },
      goHumanManage: function() {       //人事管理
        this.$router.push({ path: '/humanManage'});
      },
      goEngineering: function() {       //工程管理
        this.$router.push({ path: '/engineering'});
      },
      goContract: function() {          //合同管理
        this.$router.push({ path: '/contract'});
      },
      goCustomerRegistration: function() {          //软件安装
        this.$router.push({ path: '/customerRegistration'});
      },
    }
  }
</script>
<style scoped>
    .mainbox {margin-bottom: 36px;}
    .mainbox button{padding:0 8px;}
    .chart {height: 600px;background: #f4f6f8;}
    .item_prop {width: 45%; float: left;}
    .item_prop_line {width: 100%;clear: both;}
    .time {font-size: 13px;text-align: right;}
    .time label {color: #333;}
    .echarts2 {height: 600px;}
    .fankuibox {margin-top: 0px;line-height: 26px;padding-left: 8px;padding-top: 0px;
      text-align: left;list-style: none;}
    .fankuibox div { padding-bottom: 2px;padding-top: 2px;font-size: 14px;}
    .fankuibox label {font-weight: normal;color: #7a7a7a;}
    .fankuibox span {font-weight: normal;color: #000;}
    .scfk {height: 40px;line-height: 40px;text-align:left;padding:0 8px;color: #000;font-size: 14px;vertical-align: bottom; }
    .scfk .text-l{background: #5e67fc; color:#5e67fc;padding:3px 2px;margin-right:4px;vertical-align: bottom;}
    .scfk .text-s{font-size: 16px;font-weight: 900;vertical-align: bottom;}
    .scfk .more {float: right;color: #7a7a7a;line-height: 45px;vertical-align: bottom;}
    .css1 {background: rgb(61, 173, 65);color: #fff;width: 100%}
    .css2 {background: rgb(61, 173, 65);color: #fff;}
    .mainbody {padding-top: 38px;}
    .netphone {background: #ebebeb;width: 45%;height: 60px;margin: 1em auto;vertical-align: middle;display: inline-block;}
    .main-nav {line-height: 60px;text-align: center;vertical-align: middle;}
    h1,h2 {font-weight: normal;}
    ul {list-style-type: none;padding: 0;}
    li {display: inline-block;margin: 0 10px;}
    a {color: #42b983;}
    .mint-swipe {width: 100%;height: 380px; }
    .img-box{width:98%;height:auto;margin:auto; }
    .img-box span{display: inline-block;width:23%;}
</style>
<style>
  .mainbody .mint-header .mint-header-title{font-weight: 900 !important;}
  .mainbody .mt-progress-progress{background: #5e67fc!important;}
</style>
