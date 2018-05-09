<template id="searchHangye">
  <div class="searchList" >
    <ul class='shou-list' v-infinite-scroll="loadMore_recent" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10" style="margin-top: 2px;">
      <li v-for="item in customerList" @click='goDetail(item.id)' style="padding:5px 0;">
        <div class="line"></div>
        <div class="companyName">
          {{item.cName}}
        </div>
        <div class="companyType">
          <span class="labelcss">地址：</span>
          {{item.fullAdress}}
        </div>
        <div class="companyType">
          <span class="labelcss">客户电话：</span>
          {{item.tel1}}
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
          <span class="labelcss">访问时间：</span>
          {{(item.visitingDate).substr(0,10)}}
        </div>
        <div class="clear"></div>
      </li>
      <div style=" margin:0 auto;width:60px" v-show='loading'>
        <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto">
        </mt-spinner>
      </div>
      <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕</div>
      <div style="padding:20px; text-align:center; color:gray" v-show='noData'>无符合条件的客户！</div>
    </ul>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        loading: false,       //加载中
        noData:false,         //无符合条件的客户
        customerList: [],     //最近访问可数数据
        totalPage: 1,         //总页数
        loadAll: false,       //全部加载完毕
        currentPage: 1,       //当前页
        pageSize: 10,         //每页显示几条
      }
    },
    mounted: function() {
      this.loadMore_recent();
    },
    methods: {
      goDetail: function(id) {
        this.$router.push({ path: '/customerDetail',query: {customerId: id ,'pageType':'3'}});
      },
      loadMore_recent: function() { // 最近访问查询---------------------------------------------------
        if (this.currentPage > this.totalPage) {
          return;
        }
        this.loading = true;
        let self = this;
        var param = {
          pageRows: self.pageSize,
          pagingRequired: true,
          currenPage: self.currentPage
        };
        axios.post(self.html_url + self.Apilist.VisitingCustom, param).then(function(data) {
          self.loading = false;
          if (data.data.totalPage == 0 || data.data.totalPage == null) {
            self.noData = true;
            return
          }
          self.customerList = self.customerList.concat(data.data.data);
          self.totalPage = data.data.totalPage;
          if (self.currentPage == data.data.totalPage) {
            self.loadAll = true;
          }
          self.currentPage = self.currentPage + 1;
        }).catch(function(e) {
          self.loading = false;
        });
      }
    }
  }
</script>