<template id="humanShenHe">
  <div class="searchList">
     <ul  v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="item in shenheList">
        <div class="line"></div>
        <div class="companyType">
          <label>注册用户：</label>
          <span class="companyName">{{item.name}}</span>
        </div>
        <div class="companyType">
          <label>手机:</label>
          <span class="labelcss">{{item.telephone}}</span>
        </div>
        <div class="companyType">
          <label>微信昵称：</label>
          <span>{{item.nickname==null?"无":item.nickname }}</span>
        </div>
        <div class="companyType">
          <label>办事处：</label>
          <span>{{item.officeName}}</span>
        </div>
        <div class="companyType">
          <label>部门：</label>
          <span>{{item.departmentName}}</span>
        </div>
        <div class="companyType">
          <label>岗位：</label>
          <span>{{item.postName}}</span>
        </div>
        <div class="companyType">
          <label>审核状态：</label>
          <span :class="statusClass">{{statusWord}}</span>
        </div>
        <div class="companyType">
          <label>申请时间：</label>
          <span>{{ (item.registTime).substr(0,10) }}</span>
           <mt-button type="primary" style="background:#5e67fc;height:26px; border-radius:13px;margin-right:5px;float:right;" size="small" @click.native='operate(item.id)'>{{buttonValue}}</mt-button>
        </div>
        <div class="clear"></div>
      </li>
      <div style="margin:0 auto; width:60px" v-show='loading'>
        <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto">
        </mt-spinner>
      </div>
      <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕</div>
      <div style="padding:20px; text-align:center; color:gray" v-show='noData'>查询暂无数据！</div>
    </ul>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      statusWord: '',
      statusClass: '',
      buttonValue: '',
      goPath: '',
      shenheList:[],
      loading: false, 
      noData:false,
      totalPage: 1,
      loadAll: false,
      currentPage: 1,
      pageSize: 10, 
    }
  },
  props: {
    statusType: {
      type: Number,
      default: '1'
    },
    shenQing: {
      type: String,
      default: '1'
    },
  },
  watch:{
    'shenQing':function(val){
      this.shenheList = [];
      this.currentPage = '1';
      this.totalPage = '1';
      this.noData=false;
      this.loadAll= false;
      this.loadMore();
    }
  },
  mounted: function() {
    this.loadMore();
  },
  methods: {
    loadMore: function() {
      var self = this;
      if (this.currentPage > this.totalPage) {
        self.loadAll = true;
        return 
      }
      if (self.statusType == '1') {
        self.statusClass = 'dsp';
        self.statusWord = '等待审核';
        self.buttonValue = '审核';
        self.goPath = '/shenHeRegister';
      } else if (self.statusType == '2') {
        self.statusClass = 'tg';
        self.statusWord = '通过';
        self.buttonValue = '查看';
        self.goPath = '/shenHe_jieguo';
      } else if (self.statusType == '3') {
        self.statusClass = 'bh';
        self.statusWord = '驳回';
        self.buttonValue = '查看';
        self.goPath = '/shenHe_jieguo';
      }
      self.loading = true;
      self.loadAll = false;
      var param = {
        checkFlag: self.statusType,
        pagingRequired: true,
        pageRows : self.pageSize,
        currenPage : self.currentPage,
      };
      axios.post(self.html_url + self.Apilist.selectEmployeePagingList, param).then(function(data) {
        self.loading = false;
        self.shenheList = self.shenheList.concat(data.data.data);
        if (data.data.totalPage == 0 || data.data.totalPage == null) {
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
    back: function() {
      this.$router.go(-1);
    },
    operate: function(id) { 
      this.$router.push({path: this.goPath,query: {id: id,shenQing:this.shenQing}
      });
    }
  }
}
</script>
<style>
  .dsp {color: blue;}
  .tg {color: green;}
  .bh {color: red;}
  .clear {clear: both;}
  .mint-tab-container-wrap {display: -webkit-box;display: -ms-flexbox;display: flex;margin-top: 3px!important;}
</style>
<style scoped>
  .head {width: 70px;height: 80px;background: gray;position: absolute;right: 5px;top: 10px;}
  .mint-checklist .mint-cell {padding: 0;width: 50%!important;float: left;text-align: left;}
</style>
