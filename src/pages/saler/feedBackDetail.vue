<template>
  <div class="feedBackDetail">
    <mt-header title="市场反馈详情" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      <mt-button slot="right" @click.native="save"> 保存 </mt-button>
    </mt-header>
    <div style="text-align:left; margin-top:39px;box-sizing: border-box;padding:0 6px;">
      <div class="line"></div>
      <div class="companyType">
        <span class="labelcss">客户名称：</span> 
        <span style="word-break: break-word;">{{saler.customName}}</span>  
      </div>
      <div class="companyType">
        <span class="labelcss">系统名称：</span> {{saler.cname == '' || saler.cname == null?"无": saler.cname }}
      </div>
      <div class="companyType">
        <span class="labelcss">反馈日期：</span> {{saler.gmtCreate}}
      </div>
      <div class="companyType">
        <span class="labelcss">客户主页：</span> {{saler.homepage == '' || saler.homepage == null?"无": saler.homepage }}
      </div>
      <div class="companyType">
        <span class="labelcss">省份：</span> {{saler.provinceName == '' || saler.provinceName == null?"无": saler.provinceName }}
      </div>
      <div class="companyType">
        <span class="labelcss">城市：</span> {{saler.cityName == '' || saler.cityName == null?"无": saler.cityName }}
      </div>
      <div class="companyType">
        <span class="labelcss">公司规模：</span> {{saler.companySize|companySize}}
        <span v-show="saler.companySize != null">(人)</span>
      </div>
      <div class="companyType">
        <span class="labelcss">主营产品：</span> {{saler.mainProducts == '' || saler.mainProducts == null?"无": saler.mainProducts}}
      </div>
      <div class="companyType">
        <span class="labelcss">联系人：</span> {{saler.contactName}}
      </div>
      <div class="companyType">
        <span class="labelcss">职务：</span> {{saler.contactPost == '' || saler.contactPost == null?"无": saler.contactPost}}
      </div>
      <div class="companyType">
        <span class="labelcss">电话：</span> {{saler.contactPhone == '' || saler.contactPhone == null?"无": saler.contactPhone}}
      </div>
      <div class="companyType">
        <span class="labelcss">邮箱：</span> {{saler.contactEmail == '' || saler.contactEmail == null?"无": saler.contactEmail}}
      </div>
      <div class="companyType">
        <span class="labelcss">反馈类型：</span> {{saler.feedbackTypeName}}
      </div>
      <div class="companyType">
        <span class="labelcss">了解途径：</span> {{saler.understandWayName==null?'无':saler.understandWayName}}
      </div>
      <div class="companyType" style="word-wrap:break-word;">
        <span class="labelcss">反馈内容：</span> {{saler.feedbackContent}}
      </div>
      <div class="companyType" @click="showSalesManPop=true">
        <span class="labelcss">市场销售员：</span> {{saler.salesmanName}}
      </div>
      <div v-if="isManager">
        <div class="companyType" @click="showGuWen">
          <span class="labelcss">外贸管理顾问：</span> {{saler.saleManageName==null?'无':saler.saleManageName}}
        </div>
        <div class="companyType">
          <span class="labelcss">手机号码：</span> {{saler.saleManagePhone==null?'无':saler.saleManagePhone}}
        </div>
        <div class="companyType">
          <span class="labelcss">办事处：</span> {{saler.saleManageOfficeName==null?'无':saler.saleManageOfficeName}}
        </div>
      </div>
      <div class="line"></div>
      <div class="companyType">
        <span class="labelcss">跟踪日志</span>
        <span class="labelcss" style="float:right" @click='goRizhi' v-show="hasLog"> 更多>></span>
        <div style="clear:both "></div>
        <div v-if="hasLog">
          <div class="companyType">
            <span class="labelcss">录入人：</span> {{logFirst.operatorName}}
          </div>
          <div class="companyType" style="word-wrap:break-word ;">
            <span class="labelcss">拜访时间：</span> {{logFirst.visitingDate }}
          </div>
          <div class="companyType" @click="showSalesManPop=true">
            <span class="labelcss">拜访内容：</span> {{logFirst.visitingContent}}
          </div>
          <div class="companyType" @click="showSalesManPop=true">
            <span class="labelcss">车费总计：</span> {{logFirst.totalFare}}
          </div>
          <div class="companyType" @click="showSalesManPop=true">
            <span class="labelcss">最新级别：</span> {{logFirst.latestLevelName}}
          </div>
          <div class="companyType" @click="showSalesManPop=true">
            <span class="labelcss">工作总结：</span> {{logFirst.jobSummary}}
          </div>
        </div>
        <div v-show="!hasLog">
          暂无跟踪日志！
        </div>
      </div>
      <div class="line"></div>
      <div class="companyType">
        <span class="labelcss">快速跟进：</span>
        <div style="clear:both "></div>
        <div v-if="hasfellowLog">
          <div v-for="item in saler.followList" style="border-top:1px solid #ccc">
            <div class="companyType">
              <span class="labelcss">录入人：</span> {{item.operatorName}}
            </div>
            <div class="companyType" style="word-wrap:break-word ;">
              <span class="labelcss">填写时间：</span> {{item.gmtCreate }}
            </div>
            <div class="companyType"  >
              <span class="labelcss">跟进内容：</span> {{item.content}}
            </div>
          </div>
        </div>
        <div v-show="!hasfellowLog">
          暂无快速跟进内容！
        </div>
      </div>
      <div class="companyType" style="padding:40px 0;"></div>
    </div>
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="bt_left" @click.native="fnRizhi" class='tabStyle' style="border-right:1px solid gray;">
        导入跟踪日志
      </mt-tab-item>
      <mt-tab-item id="bt_right" @click.native="fnGenjin" class='tabStyle'>
        快速跟进
      </mt-tab-item>
    </mt-tabbar>
    <mt-popup v-model="popGenjin" position="right" style="width:80%;height:100%;">
      <mt-field label="" placeholder="请输入快速跟进内容！" type="textarea" style="background:#efefef;margin:20px 3px" rows="4"  :attr="{maxlength: 30 }" v-model="genJinContent" >
        
      </mt-field>
      <mt-button type="primary" style="background: #5e67fc;" @click.native="saveGenjin"> 保存 </mt-button>
    </mt-popup>
    <mt-popup v-model="showGuWenPop" position="bottom" style='width:100%'>
      <div class="title-pop">外贸管理顾问</div>
      <mt-picker :slots="slotsGuWen" ref="pickerGuWen" @change="onValChangeGuWen" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showGuWenPop"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import axios from 'axios';
  export default {
    data() {
      return {
        hasfellowLog:false,
        popGenjin: false,           //快速跟进面板
        genJinContent: '',
        logFirst: {},
        hasLog: true,
        isManager: false,
        userName: '',
        userNameId: '',
        selected: 'bt_left',
        saler: {                    //日志保存提交数据
          customName: "",           //输入客户名称
          cname: "",                //系统中客户名称
          homepage: "",             //主页
          provinces: "",            //省
          city: "",                 //市、区
          companySize: "",          //公司规模
          mainProducts: "",         //主营产品
          contactName: "",          //联系人名字 
          contactPost: "",          //联系人职位
          contactPhone: "",         //联系人手机号
          contactEmail: "",         //联系人邮箱
          feedbackType: "",         //反馈类型
          understandWay: "",        //了解途径
          feedbackContent: "",      //反馈内容
          saleManageId: "",         //外贸管理顾问id
          saleManageName: "",       //外贸管理顾问
          saleManagePhone: "",      //外贸管理顾问手机号
          saleManageOfficeId: "",   //外贸管理顾问办事处id
          saleManageOfficeName: "",
          salesmanId: "",           //市场销售员id
          salesmanName: "",         //市场销售员id
          operatorId: "",           //操作人ID
          operatorName: "",         //操作人名字
          enclosure: "",            //附件
          gmtCreate: "",            //反馈时间
          customType: "",           //客户类型
          marketCustomType: ""      //
        },
        guwenList: [],
        slotsGuWen: [{
          flex: 1,
          values: [],
          className: 'slotsGuWen',
          textAlign: 'center',
          defaultIndex: 1,
        }],
        showGuWenPop: false,
        showSalesManPop: false,
      }
    },
    watch: {
      'popGenjin':function(n,o){
        if(n == false){
          this.genJinContent = '';
        }
      }
    },
    mounted: function() {
      this.getFeedbackDetail(this.$route.query.id);
      this.showSalesMan();
    },
    computed: {
    },
    methods: {
      saveGenjin: function() {
        var self = this;
        if (self.genJinContent.length>30 || self.genJinContent.length<5) {
          MessageBox('提示', '跟进内容需要5-30字符！');
          return false
        }
        self.popGenjin = false;
        var param = {
          feedbackId: self.$route.query.id,
          content: self.genJinContent,
        };
        
        axios.post(self.html_url + self.Apilist.insertFeedbackFollow, param).then(function(data) { 
          self.getFeedbackDetail(self.$route.query.id);
        }).catch(function(e) {});
      },
      save: function() {                        //保存反馈明细。updateFeedback
        var self = this;
        var param = {
          id: self.$route.query.id,
          cname: self.saler.cname,
          homepage: self.saler.homepage,
          provinces: self.saler.provinces,
          city: self.saler.city,
          companySize: self.saler.companySize,
          mainProducts: self.saler.mainProducts,
          saleManageId: self.saler.saleManageId,
          saleManagePhone: self.saler.saleManagePhone,
          saleManageOfficeId: self.saler.saleManageOfficeId,
          customType: self.saler.customType,
          customId: self.saler.customId,
          marketCustomType: self.saler.marketCustomType,
          salesmanId: self.saler.salesmanId
        };
        axios.post(self.html_url + self.Apilist.updateFeedback, param).then(function(data) {
          MessageBox('提示', '保存成功');
        }).catch(function(e) {});
      },
      onValChangeGuWen: function(picker, values) {
        if (values[0] == undefined) {
          return
        }
        this.saler.saleManageName = values[0].name;
        this.saler.saleManageId = values[0].id;
        this.saler.saleManagePhone = values[0].telephone;
        this.saler.saleManageOfficeId = values[0].officeId;
        this.saler.saleManageOfficeName = values[0].officeName;
      },
      showGuWen: function() {
        var self = this;
        self.slotsGuWen[0].values = [];
        axios.post(self.html_url + self.Apilist.selectEmployeeList, {}).then(function(data) {
          var listTemp = data.data.data;
          self.guwenList = listTemp;
          if (listTemp.length == 0) {
            MessageBox('提示', '暂无选项！');
            return
          }
          for (var i = 0; i < listTemp.length; i++) {
            self.slotsGuWen[0].values.push({ id: listTemp[i].id, name: listTemp[i].name, telephone: listTemp[i].telephone, officeId: listTemp[i].officeId, officeName: listTemp[i].officeName });
          }
          self.showGuWenPop = true;
        }).catch(function(e) {});
      },
      fnGenjin: function() {              //genjin
        this.popGenjin = true
      },
      fnRizhi: function() {               //导入跟踪日志
        var self = this;
        let name = '';
        if(this.saler.cname == '' || this.saler.cname == null){
          name = this.saler.customName;
        }else{
          name = this.saler.cname;
        }
        self.$router.push({path: '/searchMarketCustomer',query: {daoRuType: 'feedBackDetail',beforeId: self.$route.query.id,customerName:name}});
      },
      goRizhi: function() {               //日志更多
        var param = {
          customName: this.saler.cname,
          searchType:'salelog',
          feedBackDetail:'1'
        };
        this.$router.push({ path:'/searchJournalResult',query:param});
      },
      back: function() {
        this.$router.go(-1);
      },
      showSalesMan: function() {
        var self = this;
        if (localStorage.userInfo) {
          var userInfo = JSON.parse(localStorage.userInfo);
          self.userName = userInfo.employeeName;
          self.userNameId = userInfo.employeeId;
          if (userInfo.postType == 3) { //是管理者 则显示 外贸管理顾问
            self.isManager = true;
          }
        }
      },
      getFeedbackDetail(_Id) { //反馈详情
        var self = this;
        var param = {
          'id': _Id
        };
        axios.post(self.html_url + self.Apilist.feedbackDetail, param).then(function(data) {
          self.saler = data.data.data;
          if (self.saler.saleManageName == null) {
            self.saler.saleManageName = '--请选择--'
          }
          if (self.saler.logList.length > 0) {
            self.hasLog = true;
            self.logFirst = self.saler.logList[0];
          } else {
            self.hasLog = false;
          }
          if (self.saler.followList.length > 0) {
            self.hasfellowLog = true;
          } else {
            self.hasfellowLog = false;
          }
          self.importCustomAndLogList(); //导入更新
        }).catch(function(e) {});
      },
      importCustomAndLogList: function() { //导入更新
        var self = this;
        var customerId = self.$route.query.customerId;
        if (customerId == undefined) {
          return
        }
        let param = {
          'id': customerId
        };
        axios.post(self.html_url + self.Apilist.importCustomAndLogList, param).then(function(data) {
          var importlog = data.data.data;
          self.saler.cname = importlog.cName;
          self.saler.homepage = importlog.homepage;
          self.saler.provinceName = importlog.provinceName;
          self.saler.cityName = importlog.cityName;
          self.saler.provinces = importlog.provinces;
          self.saler.city = importlog.city;
          self.saler.companySize = importlog.companySize;
          self.saler.mainProducts = importlog.mainProductsName;
          self.saler.customId = importlog.id;
          self.saler.customType = importlog.customType;
          self.saler.marketCustomType = importlog.marketCustomType;
          if (importlog.logList.length > 0) {
            self.hasLog = true;
            self.logFirst = importlog.logList[0];
          }
        }).catch(function(e) {});
      },
      getEmployeePagingListBySaleManage() { //获取员工
        let self = this;
        axios.post(self.html_url + self.Apilist.selectEmployeeList, {}).then(function(data) {
          var listTemp = data.data.data;
          if (listTemp.length == 0) {
            MessageBox('提示', '暂无选项！');
            return
          }
        }).catch(function(e) {});
      },
      onValChangeSalesMan(picker, values) { //市场销售员选中
        if (values[0] == undefined) {
          return
        }
        this.salesmanName = values[0].name;
        this.salesmanId = values[0].id;
      },
    }
  }
</script>
<style>
  .tabStyle .mint-tab-item-label{font-size: 14px!important;}
  .feedBackDetail  .tabStyle{ padding-top:10px!important; padding-bottom:10px!important;}
</style>