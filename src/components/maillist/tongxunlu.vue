<template id="tongxunlu">
  <!-- 菜单 -->
  <div class="tongxunlu">
    <mt-header title="通讯录" fixed>
      <mt-button icon="back" slot="left" @click.native="backEdit">返回</mt-button>
      <mt-button slot="right" @click.native="addShouJianRen">添加</mt-button>
    </mt-header>
    <mt-navbar v-model="selected" style=" width:100%; height:40px;margin-bottom:3px;margin-top:40px">
      <mt-tab-item id="tab-container1" @click.native="fnLeft" style="font-size: 16px;">
        客户联系人
      </mt-tab-item>
      <mt-tab-item id="tab-container2" @click.native="fnRight" style="font-size: 16px;">
        公司通讯录
      </mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="active">
      <mt-tab-container-item id="tab-container1">
        <div class="tital"></div>
        <!-- 搜索条件 -->
        <div class="form">
          <mt-field label="客户名称" placeholder="请输入客户名称" v-model="customerName"> </mt-field>
          <mt-field label="最新级别" placeholder="请选择最新级别" v-model="newlevel" @click.native='showNewlevel' readonly>
          </mt-field>
          <mt-field label="客户类型" placeholder="请选择客户类型" v-model="customerType" @click.native='showCustomerType' readonly>
          </mt-field>
          <div style="padding-top:22px;">
            <mt-button style="width:100px;background:#5e67fc;" type="primary" size="small" @click.native='clearForm'>
              清空
            </mt-button>&nbsp;&nbsp;&nbsp;&nbsp;
            <mt-button style="width:100px;background:#5e67fc;" type="primary" size="small" @click.native='searchCustomer(isbutton)'> 
              查询
            </mt-button>
          </div>
          <mt-popup v-model="showNewlevelPop" position="bottom" style='width:100%'>
            <div class="title-pop">选择最新级别</div>
            <mt-picker :slots="slotsNewlevel" ref="pickerNewlevel" @change="onValChangeNewlevel" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showNewlevelPop"></mt-picker>
          </mt-popup>
          <!-- 客户类型 -->
          <mt-popup v-model="showCustomerTypePop" position="bottom" style='width:100%'>
            <div class="title-pop">客户类型</div>
            <mt-picker :slots="slotsCustomerType" ref="pickerCustomerType" @change="onValChangeCustomerType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showCustomerType"></mt-picker>
          </mt-popup>
          <div class="searchList" v-if='showCustomer'>
            <ul class='shou-list' v-infinite-scroll="searchCustomer" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
              <li v-for="item in customerList">
                <div class="companyName"> {{item.cName}} </div>
                <div class="companyAdd"> 联系人姓名：{{item.contactsName}}</div>
                <div class="companyType"> 联系人邮箱：{{item.contactsEmail}}</div>
                <div class="companyType"> 外贸管理顾问：{{item.saleManageName ||'无'}}
                  <input name="tongxunlu" type="checkbox" v-model="tongxunlu" :value="item.contactsEmail" style="position:absolute;right:20px;top:5px;" />
                </div>
                <div class="line"></div>
                <div class="clear"></div>
              </li>
              <div style="margin:0 auto; width:60px" v-show='loading'>
                <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto"></mt-spinner>
              </div>
              <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕</div>
              <div style="padding:20px; text-align:center; color:gray" v-show='noData'>查询暂无数据！</div>
            </ul>
          </div>
        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <div class="tital"></div>
        <div class="searchList" v-if='showWorker'>
          <ul class='shou-list' v-infinite-scroll="searchWorker" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading2" infinite-scroll-distance="10">
            <li v-for="item in workerList">
              <div class="companyName">
                {{item.name}}
              </div>
              <div class="companyType"> 
                职务：{{item.postName}},{{item.officeName}},{{item.departmentName}}
              </div>
              <div class="companyType"> 
                <span class="mailname">  邮箱：{{item.email}}</span>
                <input name="tongxunlu2" type="checkbox" :value="item.email" v-model="tongxunlu2" style="position:absolute;right:20px;top:5px;" />
              </div>
              <div class="line"></div>
              <div class="clear"></div>
            </li>
            <div style="margin:0 auto; width:60px" v-show='loading2'>
              <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto"></mt-spinner>
            </div>
            <div style="padding:20px; text-align:center; color:gray" v-show='loadAll2'>全部加载完毕</div>
            <div style="padding:20px; text-align:center; color:gray" v-show='noData2'>查询暂无数据！</div>
          </ul>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
import axios from 'axios';
export default {
  data() {
    return {
      showWorker: false,
      showCustomer: true,
      isbutton: true,
      noData: false,
      noData2: false,
      tongxunlu: [],
      tongxunlu2: [],
      active: 'tab-container1',
      selected: 'tab-container1',
      //form
      customerName: '',
      newlevel: '',
      customerList: [],
      //----------------------------------------------------分页加载
      loading: false,
      totalPage: 1,
      loadAll: false,
      currentPage: 1,
      pageSize: 10,
      //----------------------------------------------------分页加载
      workerList: [],
      loading2: false,
      totalPage2: 1,
      loadAll2: false,
      currentPage2: 1,
      pageSize2: 10,
      //-------------------------------------------------------
      customerType: '',
      customerTypeId: '',
      slotsCustomerType: [{
        flex: 1,
        values: [{ //客户类型
          id: '1',
          name: '公开客户'
        }, {
          id: '2',
          name: '保留客户'
        }, {
          id: '3',
          name: '合作客户'
        }],
        className: 'slotsCustomerType',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showCustomerTypePop: false,
      // --------------------------
      newlevel: '',
      newlevelId: '',
      slotsNewlevel: [{
        flex: 1,
        values: [],
        className: 'slotsNewlevel',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showNewlevelPop: false,
      //highleve--------------------------
    }
  },
  props: {
    type: {
      type: String,
      default: 'zhengchang' //默认 发送人 zhengchang，抄送人 copy，私密人：simi
    },
    hasSelect_Sjr: {
      type: String,
      default: '' //收件人
    },
    hasSelect_Csr: {
      type: String,
      default: '' //抄送人
    },
    hasSelect_Smr: {
      type: String,
      default: '' //私密人
    },

  },
  watch: {
    newlevel: {
      handler: function(val, oldval) {
        if (val != oldval) {
          this.customerList = [];
          this.noData = false;
          this.loadAll = false;
        }
      },
      deep: true
    },
    customerType: {
      handler: function(val, oldval) {
        if (val != oldval) {
          this.customerList = [];
          this.noData = false;
          this.loadAll = false;
        }
      },
      deep: true
    },

  },
  mounted: function() {
    this.customerType = '';
    this.customerTypeId = '';
  },
  methods: {
    addShouJianRen: function() {
      var param = {
        closepop: false,
        tongxunluArray: this.tongxunlu.concat(this.tongxunlu2),
        personType: this.type
      };
      if(param.tongxunluArray.length == 0){
        MessageBox.confirm('没有选中的收件邮箱，是否离开?').then(action => {
          this.$emit("listenChildevent", param);
        }, () => {
          // 取消
        });
        return
      } 
      if (param.tongxunluArray.length > 10) {
        MessageBox('提示', '选择收件邮箱不能超过10个');
        return
      } else {
        this.$emit("listenChildevent", param);
      }

    },
    backEdit: function() {
      var param = {
        closepop: false
      };
      this.$emit("listenChildevent", param);
    },
    //-------------------------------------
    showCustomerType: function() { //  客户类型
      var self = this;
      self.showCustomerTypePop = true;
    },
    onValChangeCustomerType: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.customerType = values[0].name;
      this.customerTypeId = values[0].id;
    },
    //-------------------------------------
    showNewlevel: function() {
      var self = this;
      self.slotsNewlevel[0].values = [];
      axios.post(self.html_url + self.Apilist.selectLatestLevelList, {}).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox('提示', '暂无选项！');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsNewlevel[0].values.push({ id: listTemp[i].id, name: listTemp[i].name.substr(0,2) });
        }
        self.showNewlevelPop = true;
      }).catch(function(e) {});
    },
    onValChangeNewlevel: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.newlevel = values[0].name;
      this.newlevelId = values[0].id;
    },
    //----------------------------------------------------

    searchWorker: function() {

      var self = this;
      if (self.currentPage2 > self.totalPage2) {
        return
      }
      var param = {
        currenPage: self.currentPage2,
        pageRows: 8,
        pagingRequired: true
      };

      self.loading2 = true;

      axios.post(self.html_url + self.Apilist.selectEmployeeMailContactsList, param).then(function(data) {

        if (data.data.totalPage2 == 0 || data.data.totalPage2 == null) {
          self.noData2 = true;
        }
        self.workerList = self.workerList.concat(data.data.data);

        self.totalPage2 = data.data.totalPage;
        if (self.currentPage2 == data.data.totalPage) {
          self.loadAll2 = true;
        }
        self.currentPage2 = self.currentPage2 + 1;
        self.loading2 = false;
        // Indicator.close();
      }).catch(function(e) {
        self.loading2 = false;
      });


    },
    clearForm: function() {
      this.customerName = '';
      this.newlevel = '';
      this.newlevelId = '';
      this.tongxunlu = [];
      this.customerType = '';
      this.customerTypeId = '';
      this.customerList = [];
      this.noData = false;
      this.loadAll = false;
    },
    searchCustomer: function(isbutton) {

      var self = this;

      if (isbutton) {
        this.customerList = [];
        this.noData = false;
        this.loadAll = false;
        self.currentPage = 1;
        self.totalPage = 1;
      }
      if (self.currentPage > self.totalPage) {
        return
      }
      var param = {
        name: self.customerName,
        customType: self.customerTypeId,
        latestLevel: self.newlevelId,
        currenPage: self.currentPage,
        pageRows: 8,
        pagingRequired: true
      };
      self.loading = true;
      axios.post(self.html_url + self.Apilist.selectContactsMailListPaging, param).then(function(data) {

        self.customerList = self.customerList.concat(data.data.data);
        self.loading = false;
        self.totalPage = data.data.totalPage;
        if (data.data.totalPage == 0 || data.data.totalPage == null) {
          self.noData = true;
        }
        if (self.currentPage == data.data.totalPage) {
          self.loadAll = true;
        }
        self.currentPage = self.currentPage + 1;

      }).catch(function(e) {
        self.loading = false;
      });
    },

    getLeftButtonName() {

    },
    getRightButtonName() {

    },
    fnLeft: function() { // button left
      this.active = "tab-container1";
      this.showWorker = false;
      this.showCustomer = true;
    },
    fnRight: function() { // button right
      this.active = "tab-container2";
      this.showWorker = true;
      this.showCustomer = false;
      this.searchWorker();

    },
  }
}

</script>
<style>
  .mint-tab-item-label {color: inherit;font-size: 16px;line-height: 46px;}
  .tongxunlu .mint-cell .mint-cell-text{font-size: 14px;}
  .tongxunlu .mint-cell .mint-cell-wrapper{font-size: 14px;}
</style>
<style scoped>
  .mint-cell-text {vertical-align: middle;font-size: 14px!important;}
  .header {height: 40px;line-height: 40px;text-align: center;position: fixed;
    top: 0;font-size: 14px;background: #5e67fc;color: #fff;width: 100%;z-index: 10000}
  .header .btn {position: absolute;right: 20px;top: 0px;padding: 0 10px;}
  .mailname {display: inline-block;width: 70%;word-break: break-word;}
  .tital {height: 8px;line-height: 8px;}
  .mint-cell-wrapper {background-image: none}
</style>