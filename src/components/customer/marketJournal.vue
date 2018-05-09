<template id="marketJournal">
  <div class="searchList">
    <ul v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="item in rizhiList">
        <div class="line"></div>
        <div class="companyType">
          <label>录入人：</label>
          <span class="labelcss">{{item.operatorName}}</span>
        </div>
        <div class="companyType">
          <label>市场活动：</label>
          <span class="labelcss">{{item.marketActivityName}}</span> 
        </div>
        <div class="companyType">
          <label>拜访日期：</label>
          <span class="labelcss">{{item.visitingDate|TimeCut}}</span>
        </div>
        <div style="clear:both;width:100%"></div>
        <div class="companyType">
          <label>录入日期：</label>
          <span class="labelcss">{{item.gmtCreate|TimeCut}}</span>
        </div>
        <div class="companyType">
          <label>联系人 ：</label>
          <span class="labelcss"> {{item.contactsName}}</span>
        </div>
        <div class="companyType">
          <label>市场销售员：</label>
          <span class="labelcss">{{item.salesmanName}}</span>
        </div>
        <div class="companyType">
          <label>最新级别：</label>
          <span class="labelcss">{{item.latestLevelName==null||item.latestLevelName==''?"无":item.latestLevelName}}</span>
        </div> 
        <div class="companyType">
          <label>活动概述：</label>
          <span class="labelcss">{{item.visitingContent}} </span>
        </div>
      </li>
    </ul>
    <div style=" margin:0 auto;width:60px" v-show='loading'>
      <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto"></mt-spinner>
    </div>
    <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕！</div>
    <div style="padding:20px; text-align:center; color:gray" v-show='noData'>查询暂无数据！</div>
  </div> 
</template>
<script>
 import axios from 'axios';
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return { 
      loading: false,     //记载中
      noData:false,       //暂无数据
      rizhiList: [],      //日志数组
      totalPage: 1,       //总页数
      loadAll: false,     //全部加载完毕
      currentPage: 1,     //当前页
      pageSize: 10,       //每页条数
    }
  },
   props: {
    id: {
      type: String,
      default: ''
    }
  }, 
  mounted: function() {
    this.getRizhi();
  },
  methods: { 
    getRizhi: function() {
      this.loadMore();
    },
    loadMore: function() {
      var self = this;
      if (this.currentPage > this.totalPage) {
        return;
      }
      self.loading = true;
      self.noData = false;
      var param={
        customId: self.id,
        pagingRequired: true 
      };
      axios.post(self.html_url + self.Apilist.selectMarketLogListPaging, param ).then(function(data) {
        self.rizhiList = self.rizhiList.concat(data.data.data);
        self.loading = false;
        if (self.rizhiList.length == 0) {
          self.noData = true;
          return
        }
        self.totalPage = data.data.totalPage; 
        if (self.currentPage == data.data.totalPage) {
          self.loadAll = true;
        }
        self.currentPage = self.currentPage + 1;
      }).catch(function(e) {self.loading = false;});  
    },
  }
}
</script>