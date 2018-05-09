<template>
  <div class="pageBox">
    <mt-header title="市场反馈查询" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div class="searchResult">
      <div class="searchList">
        <ul class='shou-list' v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
          <li v-for="item in feedbackList"  @click.stop='goDetail(item.id)'>
            <div class="line"></div>
            <div class="companyName" style="word-wrap:break-word; ">
              {{item.customName}}
            </div>
            <div class="companyType">
              <span class="labelcss">反馈时间：</span>
              {{item.gmtCreate | TimeCut}}
            </div>
            <div class="companyType">
              <span class="labelcss">分配时间：</span>
              {{item.assignDate}}
            </div>
            <div class="companyType">
              <span class="labelcss">联系人：</span>
              {{item.contactName}}
            </div>
            <div class="companyType">
              <span class="labelcss">联系电话：</span>
              {{item.contactPhone==null?'无':item.contactPhone}}
            </div>
             <div class="companyType">
              <span class="labelcss">反馈类型：</span>
              {{item.feedbackTypeName}}
            </div>
             <div class="companyType">
              <span class="labelcss">状态：</span>
              {{item.followStatusName}}
            </div>
             <div class="companyType">
              <span class="labelcss">市场销售员：</span>
              {{item.salesmanName}}
            </div>
            <div class="companyType">
              <span class="labelcss">外贸管理顾问：</span>
              {{item.saleManageName==null?'无':item.saleManageName}}
            </div>
            <div class="companyType">
              <span class="labelcss">销售客户类型：</span>
              {{item.customTypeName==null?'无':item.customTypeName}}
            </div>
            <div class="clear"></div>
            <div style="text-align:right">
              <mt-button type="primary" style="background:#5e67fc;height:26px; border-radius:13px;margin-right:5px;" size="small" @click.native.stop='fenPeiFn(item.id)'> 分配 </mt-button>
              <mt-button @click.native.stop="onDelete(item.id)" type="primary" size="small" style="background:#5e67fc;height:26px; border-radius:13px;margin-right:5px;">删除</mt-button>
            </div>
            <div class="clear"></div>
          </li>
          <div style=" margin:0 auto;width:60px" v-show='loading'>
            <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto">
            </mt-spinner>
          </div>
          <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕！</div>
          <div style="padding:20px; text-align:center; color:gray" v-show='noData'>查询暂无数据！</div>
        </ul>
      </div>
      <mt-popup v-model="popCustomerList" position="right" style="width:80%;height:100%;overflow-y:scroll">
        <div class='customerList' style="height:80%">
          <div class="searchbox">
            <div>分配人员列表</div>
          </div>
          <ul class="popMenu" v-infinite-scroll="loadMoreGuwen" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loadingguwen" infinite-scroll-distance="10">
            <li v-for="item in guwenList" @click='selectGuwen(item.id)'>
              <div>{{item.name}}({{item.postName }})</div>
            </li>
            <div style=" margin:0 auto; width:60px" v-show='loadingguwen'>
              <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto"></mt-spinner>
            </div>
            <div style="padding:20px; text-align:center; color:gray" v-show='loadAllguwen'>全部加载完毕！</div>
          </ul>
        </div>
      </mt-popup>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import axios from 'axios';
export default {
  data() {
    return {
      marketFeedbackId:"",        //市场反馈ID
      guwenList:[],
      popCustomerList:false,
      loading: false,
      feedbackList: [],
      totalPage: 1,
      loadAll: false,             //市场反馈全部加载完毕
      loadingguwen: false,        //分配人员加载中
      loadAllguwen:false,         //分配人员全部加载完毕
      totalPage: 1,
      currenPage: 1,
      pageSize:6,
      noData: false,
      GuwentotalPage: 1,
      GuwencurrenPage: 1,
      GuwenpageSize:6,
      GuwennoData: false,
      pageRows:10,
      postId:'',
      employeeId:'',
      postType:'',
    }
  },
  created : function(){
    let list = JSON.parse(localStorage.userInfo);
    this.employeeId = list.employeeId;
    this.postId = list.postId;
    this.postType = list.postType; 
  },
  mounted: function() {
    this.loadMore();
    this.getUser()
  },
  computed: {
  },
  methods: {
    onDelete(_Id) {               //市场反馈删除
      MessageBox.confirm('是否删除市场反馈？').then(action => {
        let self = this;
        let param = {
          idList :[_Id]
        };
        axios.post(this.html_url +this.Apilist.deleteFeedback, param).then(function(data) {
          self.currenPage = 1;
          self.feedbackList = [];
          self.loadMore();
          MessageBox('提示', '删除成功！');
          return
        }).catch(function(e) {

        });
      }, () => {});
    },
    selectGuwen:function(id){           //分配市场反馈
      var self = this;
      var param = {
        idList : [this.marketFeedbackId],
        saleManageId : id
      };
      self.loadingguwen = true;
      axios.post(self.html_url + self.Apilist.assignFeedback, param).then(function(data) {
        self.popCustomerList = false; 
        self.loadingguwen = false;
        self.currenPage = 1;
        self.feedbackList = [];
        self.loadMore();
        MessageBox('提示', '分配成功！');
        return
      }).catch(function(e) {});   
    },
    fenPeiFn: function(id){
      this.marketFeedbackId = id;
      this.popCustomerList = true; 
      this.loadMoreGuwen()
    },
    loadMoreGuwen:function(){           // 销售员或顾问列表
      var self = this;
      self.loadAllguwen = false;
      if (self.GuwencurrenPage > self.GuwentotalPage) {
        return;
      }
      var param = {
        postId: '',
        pageRows: self.pageRows,
        currenPage: self.GuwencurrenPage,
        pagingRequired: true
      };
      self.loadingguwen = true;   
      axios.post(self.html_url + self.Apilist.selectEmployeeList, {}).then(function(data) {
        self.guwenList = data.data.data;
        self.loadingguwen = false;
        if (self.guwenList.length == 0) {
          MessageBox('提示', '暂无查询结果！');
          return
        }
        self.GuwentotalPage = data.data.totalPage;
        if (self.GuwentotalPage == data.data.totalPage) {
          self.loadAllguwen = true;
        }
        self.GuwencurrentPage = self.GuwencurrentPage + 1;
      }).catch(function(e) {
        self.loadingguwen = true;
      });
    },
    goDetail: function(id) {
      this.$router.push({path: '/feedBackDetail',query: {id: id } });
    },
    getUser(){
      if (localStorage.userInfo) {
        var userInfo = JSON.parse(localStorage.userInfo);
        this.postId = userInfo.postId;
        this.saleManageId =  userInfo.id; 
      }
    },
    loadMore() {
      if (this.currenPage > this.totalPage) {
        return;
      }
      this.loading = true;
      let self = this;
      if (!self.currenPage) {
        self.currenPage = 1
      }
      var param = {}; 
      if( self.$route.query.followStatus == undefined && self.$route.query.feedbackTypes == undefined){
        if(this.postId == 2){
          param = {
            pageRows: 8,
            currenPage: self.currenPage,
            pagingRequired: true,
            saleManageIds : this.employeeId,
          };
        }else if(this.postId == 1){
          param = {
            pageRows: 8,
            currenPage: self.currenPage,
            pagingRequired: true,
            saleManageIds : this.employeeId,
          };
        }else{
          param = {
            pageRows: 8,
            currenPage: self.currenPage,
            pagingRequired: true,
            loginId : this.employeeId,
            postType : this.postType
          };
        }
      }else{
        param = {
          followStatus: self.$route.query.followStatus,
          feedbackTypes: self.$route.query.feedbackTypes,
          feedbackSource: self.$route.query.feedbackSource,
          customName: self.$route.query.customName, 
          salesmanIds: self.$route.query.salesmanIds,
          feedbackDateStart: self.$route.query.feedbackDateStart,
          feedbackDateEnd: self.$route.query.feedbackDateEnd,
          pageRows: self.pageSize,
          pagingRequired: true, 
          currenPage: self.currenPage
        };
      }
      axios.post(self.html_url + self.Apilist.selectFeedbackListPaging, param).then(function(data) {
        if (data.data.totalRecords==0 || data.data.totalRecords == null) {
          self.noData = true;
        }
        self.feedbackList = self.feedbackList.concat(data.data.data);
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
    back: function() { 
      if( this.$route.query.followStatus == undefined && this.$route.query.feedbackTypes == undefined){
        this.$router.go(-1);
      }else{
        this.$router.push({ path: '/saleJournal',query:{tabType:'6',}});
      }
    }
  }
}

</script>
<style scoped>
  ul,li{list-style: none;}
  .workContent {background: #efefef;padding: 3px;}
  .shou-list li div {font-size: 15px;}
  .searchResult { margin-top: 35px;}
  .searchList {}
  .popMenu {padding: 0px;margin: 0px;}
  .popMenu li {border-bottom: 1px dashed gray;text-align: left;padding-left: 20px;line-height: 40px;
    min-height: 40px;list-style: none;margin: 0px;}
</style>