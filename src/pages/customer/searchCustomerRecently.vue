<template>
  <div class="pageBox">
    <mt-header title="最近访问客户" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div class="searchList" style='padding-top:39px;'>
      <ul class='shou-list' v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li v-for="item in customerList"  @click='goDetail(item)'>
          <div class="line"></div>
          <div class="companyName"> {{item.cName}}</div>
          <div class="companyAdd"><span class="labelcss">地址：</span>{{item.fullAdress}}</div>
          <div class="companyType"><span class="labelcss">客户类型：</span>{{item.customTypeName}}</div>
          <div class="companyType"><span class="labelcss">电话：</span>{{item.tel1}}</div>
          <div class="companyType"><span class="labelcss">外贸管理顾问：</span>{{item.saleManageName}}</div>
           <div class="companyType"><span class="labelcss">访问时间：</span> {{item.visitingDate|TimeCut}}</div>  
          <div class="clear"></div>
        </li>
        <div style=" margin:0 auto; width:60px " v-show='loading'>
          <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto"></mt-spinner>
        </div>
        <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕</div>
        <div style="padding:20px; text-align:center; color:gray" v-show='noData'>查询暂无数据！</div>
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
      loading: false,         //加载中
      customerList: [],       //客户数组
      totalPage: 1,           //总页数
      loadAll: false,         //全部加载完毕
      noData:false,           //查询暂无数据！
      currentPage: 1,         //当前页
      pageSize: 10,           //每页显示几条
      
    }
  },
  mounted: function() {
    this.loadMore();
  },
  methods: {
    goDetail(obj){            //获取客户详情
      if(obj.isVisible == 0){
        MessageBox('提示', '没有访问权限！');
        return false; 
      }else{
        this.$router.push({ path: '/customerDetail',query: {customerId: obj.id }});
      } 
    },
    loadMore() {              //加载中
      if (this.currentPage > this.totalPage) {
        return;
      }
      this.loading = true;
      let self = this;
      var param = {
        name:  self.$route.query.name,
        adress: self.$route.query.adress,
        provinces: self.$route.query.provinces,
        city: self.$route.query.city,
        area: self.$route.query.area, 
        customType: self.$route.query.customType,
        maintainIds: self.$route.query.maintainIds, 
        saleManageIds:self.$route.query.saleManageId,
        implementationIds: self.$route.query.implementationIds,
        startTimeStr: self.$route.query.startTimeStr,
        endTimeStr:self.$route.query.endTimeStr,
        pageRows: self.pageSize,
        pagingRequired: true,
        currenPage: self.currentPage
      };    
      axios.post(self.html_url + self.Apilist.VisitingCustom, param).then(function(data) {
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
    back: function() {        //返回
      this.$router.go(-1);
    },
    
  }
}
</script>
<style scoped>
  .mint-checklist .mint-cell {padding: 0;width: 50%!important;float: left;text-align: left;}
</style>