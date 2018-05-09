<template id="banshichu">
  <div class="searchList">
    <ul class="contactlist" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="item in banshichuList">
        <div class="line"></div>
        <div class="companyType"> 
          <span class="labelcss">名称：</span>
          <span style="word-wrap: break-word;">{{item.name}}  </span>
        </div>
        <div class="companyType"> 
          <span class="labelcss">地址：</span>
          <span>{{item.provincesName}}{{item.cityName}}{{item.areaName}}{{item.address}}</span>
        </div>
        <div class="companyType"> 
          <span class="labelcss">联系人：</span>
          <span>{{item.contacts==null||item.contacts==''?"无":item.contacts}}</span>
        </div>
        <div class="companyType"> 
          <span class="labelcss">联系电话：</span>
          <span>{{item.telephone==null||item.telephone==''?"无":item.telephone}}</span>
        </div>
        <div class="companyType"> 
          <span class="labelcss">备注：</span>
          <span>{{item.remark==null||item.remark==''?"无":item.remark}}</span>
        </div>
      </li>
    </ul>
    <div style=" margin:0 auto;width:60px" v-show='loading'>
      <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto">
      </mt-spinner>
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
        noData:false,         //暂无数据
        banshichuList: [],    //办事处数组
        totalPage: 1,         //总页数
        loadAll: false,       //全部加载完毕
        currentPage: 1,       //当前页 
        pageSize: 10,         //每页条数
      }
    },
    props: {
      id: {
        type: String,
        default: ''
      }
    },
    mounted: function() {
      this.getbanshichu();
    },
    methods: {
      getbanshichu: function() {
        this.loadMore();
      },
      loadMore: function() {
        var self = this;
        if (this.currentPage > this.totalPage) {
          return;
        }
        self.loading = true;
        self.noData = false;
        var param = {
          customId: self.id,
          pagingRequired: true
        };
        axios.post(self.html_url + self.Apilist.selectCustomOfficeListPaging, param).then(function(data) {
          self.banshichuList = self.banshichuList.concat(data.data.data);
          self.loading = false;
          if (self.banshichuList.length == 0) {
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