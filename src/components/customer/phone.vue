<template id="phone">
  <div class="searchList">
    <ul v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="item in phoneList">
        <div class="line"></div>
        <div class="companyType">
          <label>联系人：</label>
          <span class="labelcss">{{item.link_name}}</span>
        </div>
        <div class="companyType">
          <label>联系电话：</label>
          <span class="labelcss">{{item.number}}</span>
        </div>
        <div class="companyType">
          <label>开始时间：</label>
          <span class="labelcss">{{item.call_time|TimeCut}}</span>
        </div>
        <div class="companyType">
          <label>录音长度：</label>
          <span class="labelcss">{{item.duration|phoneSeconds}}</span>
        </div>
        <div class="companyType">
          <label>拨打人：</label>
          <span class="labelcss">{{item.login_name}}</span> 
        </div>
        <div class="companyType">
          <label>电话录音：</label> 
        </div>
        <div>
          <audio :src="item.path" controls="controls" style="width:100%;border-radius:4px;display:block;margin-top:10px;  ">
          </audio>
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
      loading: false,         //加载中
      noData:false,       //暂无数据
      phoneList: [],          //网络电话数组
      totalPage: 1,           //总页数
      loadAll: false,         //全部加载完毕
      currentPage: 1,         //当前页
      pageSize: 10,           //每页条数
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  mounted: function() {
    this.getPhone();
  },
  methods: {
    getPhone: function() {
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
        cust_id: self.id,
        pagingRequired: true
      };
      axios.post(self.html_url + self.Apilist.selectVoIpListPaging, param).then(function(data) {
        self.phoneList = self.phoneList.concat(data.data.data);
        self.loading = false;
        if (self.phoneList.length == 0) {
          self.noData = true;
          return
        }
        self.totalPage = data.data.totalPage;
        if (self.currentPage == data.data.totalPage) {
          self.loadAll = true;
        }
        self.currentPage = self.currentPage + 1;
      }).catch(function(e) {});
    },
  }
}
</script>