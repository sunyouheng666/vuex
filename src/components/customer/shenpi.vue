<template id="shenpi">
  <div class="shenpi">
    <div class="e-nav">
      <span class="e-nav-item" :class="shenQing=='21'?'active':''" @click="tabWait">待审批</span>
      <span class="e-nav-item" :class="shenQing=='23'?'active':''" @click="tabBohui">驳回</span>
    </div>
    <div v-if="showWait" class="">
      <ul class="shenpiList" v-infinite-scroll="loadMore_Wait" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li v-for="item in customerList" @click='goDetail(item.id)' style="padding:5px 0;">
          <div class="companyName"> 
            {{item.cName}}
          </div>
          <div class="companyType">
            <span class="labelcss">地址：</span>
            {{item.fullAdress}} 
          </div>
          <div class="companyType">
            <span class="labelcss">市场销售员：</span>
            {{item.salesmanName==null||item.salesmanName==''?"无":item.salesmanName}}
          </div>
          <div class="companyType">
            <span class="labelcss">市场客户类型：</span>
            {{item.marketCustomTypeName==null||item.marketCustomTypeName==''?"无":item.marketCustomTypeName}}
          </div>
          <div class="companyType">
            <span class="labelcss">外贸管理顾问：</span>
            {{item.saleManageName==null||item.saleManageName==''?"无":item.saleManageName}}
          </div>
          <div class="companyType">
            <span class="labelcss">销售客户类型：</span>
            {{item.customTypeName==null||item.customTypeName==''?"无":item.customTypeName}}
          </div>
          <div class="companyType">审批状态：
            <span class="dsp" style="color: #4caf50;">待审批</span>
          </div>
          <mt-button type="primary" size="small" style="background:#5e67fc;height:26px; border-radius:13px;margin-right:5px;" @click.native='shenpi(item.id,item.cName)'>审批</mt-button>
          <div class="clear"></div>
          <div class="line" style="margin-top:5px;"></div>
        </li>
        <div style=" margin:0 auto; width:60px" v-show='loading'>
          <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto"></mt-spinner>
        </div>
        <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕!</div>
        <div style="padding:20px; text-align:center; color:gray" v-show='noData'>查询暂无数据！</div>
      </ul>
    </div>
    <div v-if="showBohui">
      <ul class="shenpiList" v-infinite-scroll="loadMore_Wait" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li v-for="item in customerList" @click='goDetail(item.id)' style="padding:5px 0;">
          <div class="companyName"> 
            {{item.cName}}
          </div>
          <div class="companyType">
            <span class="labelcss">地址：</span>
            {{item.fullAdress}} 
          </div>
          <div class="companyType">
            <span class="labelcss">市场销售员：</span>
            {{item.salesmanName==null||item.salesmanName==''?"无":item.salesmanName}}
          </div>
          <div class="companyType">
            <span class="labelcss">市场客户类型：</span>
            {{item.marketCustomTypeName==null||item.marketCustomTypeName==''?"无":item.marketCustomTypeName}}
          </div>
          <div class="companyType">
            <span class="labelcss">外贸管理顾问：</span>
            {{item.saleManageName==null||item.saleManageName==''?"无":item.saleManageName}}
          </div>
          <div class="companyType">
            <span class="labelcss">销售客户类型：</span>
            {{item.customTypeName==null||item.customTypeName==''?"无":item.customTypeName}}
          </div>
          <div class="companyType">
            审批状态：
            <span class="bh">驳回</span>
          </div>
          <mt-button type="primary" style="background:#5e67fc;height:26px; border-radius:13px;margin-right:5px;" size="small" @click.native="chakan(item.id,item.cName)">
            查看
          </mt-button>
          <div class="clear"></div>
          <div class="line" style="margin-top:5px;"></div>
        </li>
        <div style=" margin:0 auto; width:60px" v-show='loading'>
          <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto">
          </mt-spinner>
        </div>
        <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕!</div>
        <div style="padding:20px; text-align:center; color:gray" v-show='noData'>查询暂无数据！</div>
      </ul> 
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      shenQing: '21',       //标签页ID
      showWait: false,      //显示待审批
      showBohui: false,     //显示驳回
      loading: false,       //加载中
      customerList: [],     //删除审批客户数组
      totalPage: 1,         //总页数
      loadAll: false,       //全部加载完毕
      noData:false,         //查询暂无数据！
      currentPage: 1,       //当前页
      pageSize: 10,         //每页显示条数
    }
  },
  props: [
    'tabType'
  ],
  watch:{
    'tabType':function(val){
      if(val == '5'){
        this.shenQing = '23';
        this.tabBohui();
      }
      if(val == '6'){
        this.shenQing = '21';
        this.tabWait();
      }
    },
  },
  mounted: function() {
    this.tabWait()
  },
  methods: {
    chakan: function(id,strName) {              //查看
      this.$router.push({path: '/shenpi_jieguo',query:{id: id,name: strName?strName:""}});
      event.stopPropagation();
    },
    shenpi: function(id,strName) {              //审批
      this.$router.push({path: '/shenpi',query:{id: id,name: strName?strName:""}});
      event.stopPropagation();
    },
    loadMore_Wait: function(status) {           //删除审批查询
      if (this.totalPage==null) {
        this.totalPage = 1;
      }
      if (this.currentPage > this.totalPage) {
        return;
      }
      this.loading = true;
      let self = this;
      self.noData = false;
      self.loadAll = false;
      var param = {
        pageRows: self.pageSize,
        pagingRequired: true,
        currenPage: self.currentPage,
        checkStatus: status
      };
      axios.post(self.html_url + self.Apilist.selectCustomListPagingByCheck, param).then(function(data) { 
        if (data.data.totalRecords==0||data.data.totalRecords==null) {
          self.noData = true;
        }
        self.customerList = self.customerList.concat(data.data.data);
        self.loading = false;
        self.totalPage = data.data.totalPage;
        if (self.currentPage == data.data.totalPage) {
          self.loadAll = true;
        }
        self.currentPage = self.currentPage + 1;
      }).catch(function(e) {
        self.loading = false;
      });
    },
    goDetail: function(id) {                  //查看详情
      if(this.shenQing == '21'){
        this.$router.push({ path: '/customerDetail',query: {customerId: id,'pageType':'4'}});
      }
      if(this.shenQing == '23'){
        this.$router.push({ path: '/customerDetail',query: {customerId: id,'pageType':'5'}});
      }
    },
    tabWait: function() {                     //点击待审核
      this.showWait = true;
      this.showBohui = false;
      this.customerList = [];
      this.loadAll = false;
      this.currentPage = 1;
      this.shenQing = '21';
      this.loadMore_Wait("2");
    },
    tabBohui: function() {                    //点击驳回
      this.showWait = false;
      this.showBohui = true;
      this.customerList = [];
      this.loadAll = false;
      this.currentPage = 1;
      this.shenQing = '23';
      this.loadMore_Wait("4");
    }
  }
}
</script>
<style scoped>
  .shenpiList {margin-top: 0px;line-height: 26px;padding-left: 3px;padding-top: 0px;
    text-align: left;list-style: none;margin: 0 4px}
  .shenpiList li {padding-bottom: 10px;padding-top: 10px;}
  .shenpiList li button {float: right;}
  .mint-checklist .mint-cell {padding: 0;width: 50%!important;float: left;text-align: left;}
</style>