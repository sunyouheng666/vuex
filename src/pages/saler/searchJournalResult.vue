<template>
  <div class="pageBox">
    <mt-header title="查询结果" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div class="searchResult">
      <div class="searchList" >
        <ul v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <li v-for="item in journalList" >
            <div class="line"></div>
            <div class="companyName">{{item.customName}}</div>
            <div class="companyType">
              <span class="labelcss">录入人:</span>
              {{item.operatorName}}
            </div>
            <!-- 销售日志 -->
            <div class="companyType" v-if="searchType=='salelog'">
              <span class="labelcss">外贸管理顾问:</span>
              {{item.salesmanName}}
            </div>
            <div class="companyType" v-if="searchType=='salelog'">
              <span class="labelcss">车费合计:</span>
              {{item.totalFare}}
            </div>
            <!-- 市场日志 -->
            <div class="companyType"  v-if="searchType=='marketlog'">
              <span class="labelcss">市场活动:</span>
              {{item.marketActivityName}}
            </div>

            <div class="companyType">
              <span class="labelcss">拜访时间:</span>
              {{item.visitingDate | TimeCut}}
            </div>
            <div class="companyType">
              <span class="labelcss">录入时间:</span>
              {{(item.gmtCreate)}}
            </div>
            <div class="companyType">
              <span class="labelcss">联系人:</span>
              {{item.contactsName}}
            </div>
            <!-- 销售日志 -->
            <div class="companyType" v-if="searchType=='salelog'">
              <span class="labelcss">陪访人:</span>
              {{item.accompanyName == null?"无":item.accompanyName}}
            </div>
            <!-- 市场日志 -->
            <div class="companyType" v-if="searchType=='marketlog'">
              <span class="labelcss">市场销售员:</span>  
              {{item.salesmanName==null?"无":item.salesmanName}}
            </div>
            <div class="companyType">
              <span class="labelcss">最新级别:</span>  
              {{item.latestLevelName==null?"无":item.latestLevelName}}
            </div>
            <div class="companyType" v-if="searchType=='marketlog'">
              <span class="labelcss">{{searchType=='salelog'?'拜访内容:':'活动概述:' }}</span>
              {{item.visitingContent}}
            </div>
            <div class="companyType" v-if="searchType=='salelog'">
              <span class="labelcss">拜访内容:</span>
              <div style="color:#999;">1）客户有多少外贸人员？</div>
              <div>{{item.answer1==null?"无":item.answer1}}</div>
              <div style="color:#999;">2）你觉得客户对我们哪些服务感兴趣？</div>
              <div>{{item.answer2==null?"无":item.answer2}}</div>
              <div style="color:#999;">3）客户有哪些反对意见？你是怎么回答的？</div>
              <div>{{item.answer3==null?"无":item.answer3}}</div>
              <div style="color:#999;">4）客户是否有询问价格？客户对我们的价格有什么意见？</div>
              <div>{{item.answer4==null?"无":item.answer4}}</div>
              <div style="color:#999;">5）你是否要求客户签约付款，为什么客户不能当场定下来？</div>
              <div>{{item.answer5==null?"无":item.answer5}}</div>
              <div style="color:#999;">6）如果客户不能当场定下来，你是否约好下次拜访时间。</div>
              <div>{{item.answer6==null?"无":item.answer6}}</div>
            </div>
            <div class="clear"></div> 
          </li>
          <div style=" margin:0 auto;width:60px" v-show='loading'>
            <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto">
            </mt-spinner>
          </div>
          <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕</div>
          <div style="padding:20px; text-align:center; color:gray" v-show='noData'>查询暂无数据！</div>
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
      journalList: [],          //搜索日志数据
      totalPage: 1,             //总页数
      loadAll: false,           //全部加载完毕
      currentPage: 1,           //当前页
      pageSize:40,              //每页显示内容数
      noData:false,             //查询暂无数据！
      searchApi:'',             //查询路径
      activeTab:'2',            //返回标签页ID
      searchType:"",            //搜索类型
    }
  },
  mounted: function() {
    this.getsearchtype();
    this.journalList= [];
    this.loadMore();
  },
  computed: {
  },
  methods: {
    getsearchtype(){
      this.searchType = this.$route.query.searchType
      if (this.$route.query.searchType=='salelog') {
        this.searchApi = this.Apilist.selectLogListPaging;
        this.activeTab = '2';
      } else if (this.$route.query.searchType=='marketlog'){
        this.searchApi = this.Apilist.selectMarketLogListPaging;
        this.activeTab = '5';
      }
    },
    loadMore() {
      if (this.currentPage > this.totalPage) {
        return;
      }
      this.loading = true;
      let self = this;
      var param = { 
        customName: self.$route.query.customName,
        provinceId: self.$route.query.provinceId,
        cityId: self.$route.query.cityId,
        areaId: self.$route.query.areaId,
        customType: self.$route.query.customType,
        marketCustomType : self.$route.query.marketCustomType,
        saleManageIds: self.$route.query.saleManageId,
        salesmanIds : self.$route.query.salesmanIds,
        operatorIds: self.$route.query.operatorId,
        visitingStartTimeStr: self.$route.query.visitingStartTimeStr,
        visitingEndTimeStr: self.$route.query.visitingEndTimeStr,
        startTimeStr: self.$route.query.startTimeStr,
        endTimeStr: self.$route.query.endTimeStr,
        pagingRequired:true,
        currenPage: self.currentPage,
        pageRows: self.pageSize, 
      };
      axios.post(self.html_url + self.searchApi, param).then(function(data) {
        if (data.data.totalRecords==0||data.data.totalRecords==null) {
          self.noData = true;
        }
        self.journalList = self.journalList.concat(data.data.data); 
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
    back: function() {
      if(this.$route.query.feedBackDetail == undefined){
        this.$router.push({ path: '/saleJournal',query:{tabType:this.activeTab}});
      }else{
        this.$router.go(-1);
      } 
    }
  }
}
</script>
<style>
  .mint-tab-container-wrap {display: -webkit-box;display: -ms-flexbox;display: flex;margin-top: 3px!important;}
</style>
<style scoped>
  ul{margin-top: 0;}
  .searchResult {margin-top: 39px;}
</style>