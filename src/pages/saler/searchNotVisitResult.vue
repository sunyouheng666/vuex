<template>
  <div class="pageBox">
    <mt-header title="未拜访客户查询" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div class="searchResult">
      <div class='searchList'>
        <ul v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <li v-for="item in journalnotVisitList"  @click='goDetail(item.id)'>
            <div class="line"></div>
            <div class="companyName">
              {{item.cName}}
            </div>
            <div class="companyType">
              <span class="labelcss">地址：</span>
              {{item.fullAdress}}
            </div>
            <div class="companyType">
              <span class="labelcss">销售客户类型：</span>
              {{item.customTypeName==''||item.customTypeName==null?"无":item.customTypeName}}
            </div>
            <div class="companyType">
              <span class="labelcss">拜访日期：</span>
              {{(item.visitingDate)}}
            </div>
            <div class="companyType">
              <span class="labelcss">外贸管理顾问：</span>
              {{item.saleManageName==''||item.saleManageName==null?"无":item.saleManageName}}
            </div>
          </li>
          <div style=" margin:0 auto;width:60px" v-show='loading'>
            <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto">
            </mt-spinner>
          </div>
          <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>
            全部加载完毕
          </div>
          <div style="padding:20px; text-align:center; color:gray" v-show='noData'>
            查询暂无数据！
          </div>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      loading: false,           //加载中
      journalnotVisitList: [],  //未拜访客户查询结果
      totalPage: 1,             //总页数
      loadAll: false,           //全部加载完毕
      currenPage: 1,            //当前页
      pageSize:6,               //每页条数
      noData: false             //查询暂无数据！
    }
  },
  mounted: function() {
    this.loadMore();
  },
  methods: {
    goDetail: function(id) {    //查询客户详情
      this.$router.push({ path: '/customerDetail',query: { customerId: id } });
    },
    loadMore() {                //查询未拜访客户
      if (this.currenPage > this.totalPage) {
        return;
      }
      this.loading = true;
      let self = this;
      if (!self.currenPage) {
        self.currenPage = 1
      }
      var param = {
        customType: self.$route.query.customType,
        provinces: self.$route.query.provinces,
        city: self.$route.query.city,
        area: self.$route.query.area, 
        saleManageIds: self.$route.query.saleManageIds,
        visitingTimeFlag: self.$route.query.notVisitTime,
        pagingRequired: true,
        currenPage: self.currenPage,
        pageRows: self.pageSize,
      };
      axios.post(self.html_url + self.Apilist.selectNotVisitingCustomListPaging, param).then(function(data) {
        if (data.data.totalRecords==0||data.data.totalRecords==null) {
          self.noData = true;
        }
        self.journalnotVisitList = self.journalnotVisitList.concat(data.data.data);
        self.loading = false;
        self.totalPage = data.data.totalPage;
        if (self.currenPage == data.data.totalPage) {
          self.loadAll = true;
        }
        self.currenPage = self.currenPage + 1;
      }).catch(function(e) {
        self.loading = false;
      });
    },
    back: function() {          //返回
      this.$router.push({ path: '/saleJournal',query:{tabType:'3',}});
    } 
  }
}
</script>
<style scoped>
  .searchResult {margin-top: 39px;}
</style>