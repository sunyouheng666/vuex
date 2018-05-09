<template>
  <div class="pageBox">
    <mt-header title="查询结果" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div style='padding-top:24px; text-align:left; padding-left:10px;'> </div>
    <div class="searchList">
      <ul v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li v-for="item in customerList"  @click='goDetail(item)'>
          <div class="line"></div>
          <div class="companyName"> {{item.cName}}</div>
          <div class="companyType">
            <span class="labelcss">地址：</span>
            <span style="word-wrap:break-word ;">{{item.fullAdress}} </span>
          </div>
          <div class="companyType"><span class="labelcss">市场销售员：</span>{{item.salesmanName || '无'}}</div>
          <div class="companyType"><span class="labelcss">市场客户类型：</span>{{item.marketCustomTypeName || '无'}}</div>
          <div class="companyType"><span class="labelcss">外贸管理顾问：</span>{{item.saleManageName || '无'}}</div>
          <div class="companyType"><span class="labelcss">销售客户类型：</span>{{item.customTypeName || '无'}}</div>
          <div class="companyType" style="text-align: right;" v-show="item.isVisible == 0">
            没有访问权限！
          </div> 
          <div class="clear"></div>
        </li>
        <div style=" margin:0 auto; width:60px " v-show='loading'>
          <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto"></mt-spinner>
        </div>
        <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕！</div>
        <div style="padding:20px; text-align:center; color:gray" v-show='noData'>无符合条件的客户！</div>
      </ul>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import axios from 'axios';
export default {
  data() {
    return {
      loading: false,
      customerList: [],
      totalPage: 1,
      loadAll: false,
      currentPage: 1,
      pageSize: 10,
      noData:false
    }
  },
  mounted: function() {
    this.loadMore();
  },
  methods: {
    goDetail(obj){
      if(obj.isVisible == 0){
        MessageBox.alert('没有访问权限！','提示');
        return false; 
      }else{
        this.$router.push({ path: '/customerDetail',query: {customerId: obj.id }});
      } 
    },
    loadMore() {
      if (this.currentPage > this.totalPage) {
        return;
      }
      this.loading = true;
      let self = this;
      var param = {
        name:  self.$route.query.name,
        provinces: self.$route.query.provinces,
        city: self.$route.query.city,
        area: self.$route.query.area,
        adress: self.$route.query.adress,
        customType: self.$route.query.customType,
        marketCustomType: self.$route.query.marketCustomType,
        highestLevel: self.$route.query.highestLevel,
        latestLevel: self.$route.query.latestLevel,
        saleManageId:self.$route.query.saleManageId,
        startTimeStr: self.$route.query.startTimeStr,
        endTimeStr:self.$route.query.endTimeStr,
        purchase: self.$route.query.purchase,
        maintainIds: self.$route.query.maintainIds,
        implementationIds: self.$route.query.implementationIds,
        salesmanIds: self.$route.query.salesmanIds,
        saleManageIds: self.$route.query.saleManageIds,
        pageRows: self.pageSize,
        pagingRequired: true,
        currenPage: self.currentPage
      };
      axios.post(self.html_url + self.Apilist.selectCustomListPaging, param).then(function(data) { 
        if (data.data.totalPage==0||data.data.totalPage==null) {
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
    getData() {
      let self = this;
      var param = {};
    },
    back: function() {
      this.$router.push({ path:'/customerManager',query:{type:'1'}});
    }
  }
}
</script>
<style scoped>
  .mint-checklist .mint-cell { padding: 0;width: 50%!important;float: left;text-align: left;}
</style>