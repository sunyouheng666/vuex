<template>
  <div class="pageBox" style="font-size: 14px;">
    <mt-header title="销售管理" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      <!-- 销售日志 -->
      <mt-button  @click.native="clearJournal" slot="right" size="small" v-show="selected==1" class="mr10"> 
        重置 
      </mt-button>
      <mt-button  @click.native="saveJournal"  slot="right" v-show="selected==1"> 
        保存 
      </mt-button>
      <!-- 市场日志 -->
      <mt-button  @click.native="clearMarket" slot="right"  size="small" v-show="selected2==4" class="mr10"> 
        重置 
      </mt-button>
      <mt-button  @click.native="saveMarketlog"  slot="right" v-show="selected2==4" > 
        保存 
      </mt-button>
      <!-- 销售日志、市场日志查询 -->
      <mt-button  @click.native="clearAllSearch" slot="right"  size="small" v-show="selected2==5||selected==2" class="mr10"> 
        清空 
      </mt-button>
      <mt-button  @click.native="searchMarkerLog"  slot="right" v-show="selected2==5||selected==2" > 
        查询 
      </mt-button>
      <!-- 未拜访客户 -->
      <mt-button  @click.native="clearNotVisit" slot="right"  size="small" v-show="selected==3" class="mr10"> 
        清空 
      </mt-button>
      <mt-button  @click.native="searchNotVisit"  slot="right" v-show="selected==3" > 
        查询 
      </mt-button>
      <!-- 市场反馈 -->
      <mt-button  @click.native="clearFeedback" slot="right"  size="small" v-show="selected2==6" class="mr10"> 
        清空 
      </mt-button>
      <mt-button  @click.native="searchFeedback"  slot="right" v-show="selected2==6"> 
        查询
      </mt-button>
    </mt-header>
    <div style="padding-top:39px;" >
      <mt-navbar v-model="selected" v-show="tabShow">
        <mt-tab-item id="1" @click.native='tabfn1' v-show="journal">
          写销售日志
        </mt-tab-item>
        <mt-tab-item id="2" @click.native='tabfn2' v-show="searchlog">
          查销售日志
        </mt-tab-item>
        <mt-tab-item id="3" @click.native='tabfn3' v-show="novisited">
          未拜访客户
        </mt-tab-item>
      </mt-navbar>
      <mt-navbar v-model="selected2" style='margin-top:3px' v-show="tabShow"> 
        <mt-tab-item id="4" @click.native='tabfn4' v-show="market">
          写市场日志
        </mt-tab-item>
        <mt-tab-item id="5" @click.native='tabfn5' v-show="marketSearch">
          查市场日志
        </mt-tab-item>
        <mt-tab-item id="6" @click.native='tabfn6' v-show="marketFeedback">
          市场反馈
        </mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <addJournalwidget ref="addJournalwidget" :logType='logType' :tempsalesmanName='salesmanName' :tempsalesmanId='salesmanId'></addJournalwidget>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <searchJournal ref="searchJournalwidget" :sendPost='hasPost' :searchType='searchtype'></searchJournal>
        </mt-tab-container-item>
        <!-- 未拜访客户 noVisitTime -->
        <mt-tab-container-item id="3">
          <searchNotVisit  ref="searchNotVisit" :sendPost='hasPost'></searchNotVisit>
        </mt-tab-container-item>
      </mt-tab-container>
      <mt-tab-container v-model="selected2">
        <mt-tab-container-item id="4">
          <addJournal ref="addMarketwidget" :logType='1' :tempsalesmanName='salesmanName' :tempsalesmanId='salesmanId'></addJournal>
        </mt-tab-container-item>  
        <mt-tab-container-item id="5">
           <searchJournal ref="searchMarketwidget" :sendPost='hasPost' :searchType='searchtype'></searchJournal>
        </mt-tab-container-item>
        <!-- 市场反馈 -->
        <mt-tab-container-item id="6">
          <searchMarkfeedback ref="searchMarkfeedback"> </searchMarkfeedback>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
    <div style="width:100%;height:34px; position:fixed;bottom:2px;"  v-show="selected2==6">
      <mt-button style="background:#5e67fc;margin:auto;" type="primary" size="small" @click.native='addFeedBack'> 
      新增市场反馈
      </mt-button>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import axios from 'axios';
  import { Indicator } from 'mint-ui';
  export default {
    data() {
      return {
        journal:false,                //写销售日志权限判断
        searchlog:false,              //查销售日志权限判断
        novisited:false,              //未拜访客户权限判断
        market:false,                 //写市场日志权限判断
        marketSearch:false,           //差市场日志权限判断
        marketFeedback:false,         //市场反馈权限判断
        isAddfeedback:false,          //新建市场反馈显示（可以优化）
        searchtype:'salelog',         //搜索类型
        logType : '2',                //日志类型
        selected : '1',               //一层TAB页ID
        selected2 : 0,                //二层TAB页ID
        hasPost:0,                    //（不太明白）
        salesmanName: '',             //录入人
        salesmanId: 0,                //录入人ID
        tabShow:true,                 //tab标签是否显示(客户详情写销售日志使用)
      }
    },
    mounted: function() {
      this.getUser();
    },
    created:function(){
      let _customerName = this.$route.query.customerName;  
      let _customerId = this.$route.query.customerId; 
      if(this.$route.query.from!=undefined){
        this.tabShow =  false;
      }
      if(_customerId != undefined){
        this.customer = _customerName;
        this.customerId = _customerId;
        this.getCustomeDetail();
        this.isCustomer = false;
      }
      this.menuShow();
    },
    watch: {
      selected: {
        handler: function(val, oldval) {
          if (val == '2' || val == '3') {
            this.clearAll = Math.random();
          }
        },
        deep: true
      },
      useSoftListValue: {
        handler: function(val, oldval) {
          var softId = [];
          if (val != oldval) { 
            for (var i = 0; i < val.length; i++) {
              for (var j = 0; j < this.options2.length; j++) {
                if (val[i] == this.options2[j].value) {
                  softId.push(this.options2[j].id);
                }
              }
            }
            this.UseSoft = softId.join(',');
          }
        },
        deep: true
      }
    },
    methods: {
      clearJournal() {           //清空市场日志
        this.$refs.addJournalwidget.clearJournal();
      },
      saveJournal() {           //保存市场日志
        this.$refs.addJournalwidget.saveJournal();
      },
      clearMarket() {           //清空市场日志
        this.$refs.addMarketwidget.clearJournal();
      },
      saveMarketlog() {         //保存市场日志
        this.$refs.addMarketwidget.saveMarketlog();
      },
      clearAllSearch() {        //重置市场日志条件
        if(this.selected2 == 5){
          this.$refs.searchMarketwidget.clearAll();
        }else{
          this.$refs.searchJournalwidget.clearAll();
        }
      },
      searchMarkerLog() {       //查询市场日志
        if(this.selected2 == 5){
          this.$refs.searchMarketwidget.searchMarkerLog();
        }else{
          this.$refs.searchJournalwidget.searchMarkerLog();
        }
      },
      clearNotVisit() {         //重置未拜访客户条件
        this.$refs.searchNotVisit.clearAll();
      },
      searchNotVisit() {        //查询未拜访客户
        this.$refs.searchNotVisit.searchNotVisit();
      },
      clearFeedback() {           //重置未拜访客户条件
        this.$refs.searchMarkfeedback.clearAll();
      },
      searchFeedback() {         //查询未拜访客户
        this.$refs.searchMarkfeedback.searchMarkfeedback();
      },
      addFeedBack(){
        this.$refs.searchMarkfeedback.addFeedBack();
      },
      menuShow(){               //判断是否有删除审批权限
        this.userInfo = JSON.parse(localStorage.userInfo);
        var tabVal = this.$route.query.tabType;
        var menu = this.userInfo.data;
        for (var i = 0; i < menu.length; i++) {
          if (menu[i].label == "销售管理") {
            for (var j= 0; j < menu[i].children.length; j++) {
              let me = this;
              if ( menu[i].children[j].url == "/journal") {
                this.journal = true;
                if(tabVal == undefined){
                  setTimeout(function() {
                    me.tabfn1();
                  }, 12);
                }
              }
              if ( menu[i].children[j].url == "/searchlog") {
                this.searchlog = true;
                if(tabVal == undefined){
                  setTimeout(function() {
                    me.tabfn2();
                  }, 10);
                }
              }
              if ( menu[i].children[j].url == "/novisited") {
                this.novisited = true;
                if(tabVal == undefined){
                  setTimeout(function() {
                    me.tabfn3();
                  }, 8);
                }
              }
              if ( menu[i].children[j].url == "/market") {
                this.market = true;
                if(tabVal == undefined){
                  setTimeout(function() {
                    me.tabfn4();
                  }, 6);
                }
              }
              if ( menu[i].children[j].url == "/marketSearch") {
                this.marketSearch = true;
                if(tabVal == undefined){
                  setTimeout(function() {
                    me.tabfn5();
                  }, 4);
                }
              }
              if ( menu[i].children[j].url == "/marketFeedback") {
                this.marketFeedback = true;
                if(tabVal == undefined){
                  setTimeout(function() {
                    me.tabfn6();
                  }, 2); 
                }
              }
            }  
          }
        }
        let me = this;
        setTimeout(function() {
          if (tabVal&&(tabVal<4) ){
            me.hasPost = Math.random(); 
            me.selected = me.$route.query.tabType;
            if(me.selected == 1){
              me.tabfn1();
            }else if(me.selected == 2){
              me.tabfn2();
            }else if(me.selected == 3){
              me.tabfn3();
            }
            me.selected2 = 0;
          }
          if (tabVal&&(tabVal>3)) {
            me.hasPost = Math.random(); 
            me.selected2 = me.$route.query.tabType; 
            if(me.selected2 == 4){
              me.tabfn4();
            }else if(me.selected2 == 5){
              me.tabfn5();
            }else if(me.selected2 == 6){
              me.tabfn6();
            }
            me.selected = 0;
            if(tabVal == 6){
              me.isAddfeedback = true;
            }
          }
        }, 20);
      },
      tabfn1:function(){
        this.selected = '1';
        this.selected2 = '0';
        this.isAddfeedback = false;
      },
      tabfn2:function(){
        this.hasPost = Math.random(); 
        this.selected = '2';
        this.selected2 = '0';
        this.searchtype = 'salelog';
        this.isAddfeedback = false;
      },
      tabfn3:function(){
        this.selected = '3';
        this.selected2 = '0';
        this.isAddfeedback = false;
      },
      tabfn4:function(){
        this.selected = '0';
        this.selected2 = '4';
        this.isAddfeedback = false;
      },
      tabfn5:function(){
        this.hasPost = Math.random(); 
        this.selected = '0';
        this.selected2 = '5';
        this.searchtype = 'marketlog';
        this.isAddfeedback = false;
      },
      tabfn6:function(){
        this.selected = '0';
        this.selected2 = '6';
        this.isAddfeedback = true;
      },
      getUser: function() {                         //手机端
        var self = this;
        if (localStorage.userInfo) {
          var userInfo = JSON.parse(localStorage.userInfo);
          self.salesmanName = userInfo.employeeName;
          self.salesmanId = userInfo.employeeId;
        }
        // 如果是地图链接进来的，根据客户id直接显示客户名称
        if (self.$route.query.from && self.$route.query.from == 'map') {
          self.salesmanName = self.$route.query.salesmanName;
          self.salesmanId = self.$route.query.salesmanId;
        } 
        if ((self.$route.query.customerId) && (self.$route.query.customerId != '')) {
          self.customerId = self.$route.query.customerId;
          axios.post(self.html_url + self.Apilist.selectCustomByParam, { id: self.$route.query.customerId }).then(
          function(data) {
            var customerDetail = data.data.data;
            self.customer = customerDetail.cName;
            self.address = customerDetail.adress;
            self.contact = customerDetail.contactsName == null ? '' : customerDetail.contactsName;
            self.contactId = customerDetail.contactsId == null ? '' : customerDetail.contactsId;
            self.highlevelId = customerDetail.highestLevel;
            self.highlevel = customerDetail.highestLevelName;
            self.newlevelId = customerDetail.latestLevel;
            self.newlevel = customerDetail.latestLevelName;
          }).catch(function(e) {});
        }
      },
      back: function() {                //返回
        if (String(this.$route.query.from) == 'map') {
          window.salePhone.CloseCurrentWebview("");
        }else if(this.selected == 1  ||this.selected2 == 4){
          MessageBox.confirm('离开此页编辑内容将无效?').then(action => {
            history.back(-1);
          }, () => {
          });
        }else if(this.$route.query.tabType == undefined || this.$route.query.tabType!= 1 || this.$route.query.tabType != 4 ){
          this.$router.push({ path: '/home'});
        }
      },
      getCustomeDetail(){                   //获取客户详情
        if(this.customerId != ''){
          var self = this; 
          axios.post(self.html_url + self.Apilist.selectCustomByParam, { id: self.customerId }).then(function(data) {
            let list = data.data.data;
            self.address = list.fullAdress;
            self.highlevelId = list.highestLevel;
            self.highlevel = list.highestLevelName;
            self.newlevelId = list.latestLevel;
            self.newlevel = list.latestLevelName;
            self.UseSoft = list.useSoft;
            self.useSoftListValue = list.useSoftName.split(','); 
          }).catch(function(e) {});
        }
      }
    }
  }
</script>
<style>
  .mint-tab-container-wrap{margin-top: 3px!important;}
</style>