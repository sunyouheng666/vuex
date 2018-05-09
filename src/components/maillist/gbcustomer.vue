<template id="gbcustomer">
  <div class="pageBox">
    <mainheader  :titleName="titleName"></mainheader>
    <div class="listbox-receive">
      <div style='padding-top:40px; text-align:left; padding-left:10px;'>{{title}}</div>
      <ul class='shou-list' v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="true">
        <li v-for="item1 in customList">
          <div class="mailItem" @click="goMailList(item1.id)">
            <div class="topic">{{item1.cName}}</div>
          </div>
        </li>
        <div style=" margin:0 auto;width:60px" v-show='loading'>
          <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto"></mt-spinner>
        </div>
         <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕</div>
        <div style="padding:20px; text-align:center; color:gray" v-show='noData'>查询暂无数据！</div>
      </ul>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      titleName:'归并箱',
      title:'',
      popupVisible: false,
      loading: false,
      pageSize: 20,
      currentPage:1,
      loadAll: false,
      totalPage: 1,
      customList: [], 
      length: 0,
      noData:false,
    }
  },
   props: {
    customType: {
      type: String,
      default: '1'
    }, 
  },
  mounted: function() {
    this.getReceiveList(); 
    this.showTitle(this.customType);
  },
  methods: {
    showTitle(type){
        switch(type) {
          case '1':
            this.title = '归并箱-公开客户列表';
            break;
          case '2':
            this.title = '归并箱-保留客户列表';
            break;
          case '3':
            this.title = '归并箱-合作客户列表';
            break;
        }
    },
    loadMore() { 
      this.getReceiveList(); 
    },
    getReceiveList() { //归并的客户列表 
      let self = this;
      if (self.currentPage >self.totalPage) {
        return
      }
      var subjectStr = '';  
      var param = {
        customType:self.customType,//公开客户1 保留客户2 合作客户3 
        pageRows: self.pageSize,
        pagingRequired: true,
        currenPage: self.currentPage
      };
      self.loading = true;
      axios.post(self.html_url + self.Apilist.guiBingCustomType, param).then(function(data) {
        self.customList = self.customList.concat(data.data.data);
         
        self.totalPage = data.data.totalPage;
        if (data.data.totalPage==0||data.data.totalPage==null) {
          self.noData = true;
        }
        self.loading = false;
        if (self.currentPage == data.data.totalPage) {
          self.loadAll = true;
        }
         self.currentPage = self.currentPage + 1; 
      }).catch(function(e) {
      });
    },
    goMailList(Id) {
      this.$router.push({ path: '/gb_maillistbox', query: {customerId: Id} });
    },
    mailEdit() {
      this.$router.push({ path: '/mailEdit' });
    },
    showMenu() {
      this.popupVisible = true;
    },
    getData() {
      let self = this;
    },
    back: function() {
      this.$router.go(-1)
    },
    searchMail: function() {
      this.$router.push({ path: '/searchMail' });
    }
  }
}
</script>
<style scoped>
  .mint-cell-value {width: 100%;line-height: 20px;}
  .mailItem {display: inline-block;width: 90%;float: left;position: absolute;left: 10px;}
  .mailItem .content {font-size: 0.6em;color: gray;overflow: hidden;}
  .mailItem .topic {font-size: 0.9em;padding-left: 5px;color: #5e67fc;overflow: hidden;text-overflow: ellipsis;
    white-space: nowrap;min-width: 200px}
  .mailItem .sendTime {display: inline-block;float: right;font-size: 12px;
    margin-top: 2px;margin-right: 6px;}
  .mailItem .itemHead {font-size: 1em; padding-left: 5px}
  .mint-cell-wrapper {border: 1px solid red;}
  .shou-list {text-align: left; }
  .shou-list li {position: relative;width: 100%;background: #efefef;margin-bottom: 0px;border: 0px!important;
    line-height: 40px;min-height: 40px;border-bottom: 1px solid gray;list-style: decimal;}
  ul {padding: 0;}
  li {display: inline-block; margin: 0px;}
</style>
