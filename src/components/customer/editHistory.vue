   
<template id="editHistory">  
  <div class="searchList"> 
    <ul v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10"> 
      <li v-for="item in editList">
        <div class="line"></div>
        <div class="companyType">
          <label>修改人：</label>
          <span class="labelcss">{{item.operatorName}}</span>
        </div>
        <div class="companyType">
          <label>修改时间：</label>
          <span class="labelcss">{{item.gmtCreate|TimeCut}}</span>
        </div>
        <div class="companyType">
          <label>修改内容：</label>
          <span class="labelcss">{{ item.content}}</span>
        </div>
        <div class="companyType">
          <label>外贸管理顾问：</label>
          <span class="labelcss">{{item.saleManageName==null||item.saleManageName==''?"无":item.saleManageName}}</span>
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
      loading: false,       //加载中
      noData:false,       //暂无数据
      editList: [],         //修改数组
      totalPage: 1,         //总页数
      loadAll: false,       //全部加载完毕
      currentPage: 1,       //当前页
      pageSize: 10,         //每页天数
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  mounted: function() {
    this.getEdit();
  },
  methods: { 
    getEdit: function() {
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
        customIdStr: self.id,
        pageRows: self.pageSize,
        currenPage: self.currentPage,
        pagingRequired: true 
      };
      axios.post(self.html_url + self.Apilist.selectOperatorListPaging, param).then(function(data) {
        self.editList = self.editList.concat(data.data.data);
        if (self.editList.length == 0) {
          self.noData = true;
          return
        }
        self.loading = false;
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
