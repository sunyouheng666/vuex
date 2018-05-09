<template id="seachcustomwidget">
  <div>
    <div class='customerList'>
      <div class="searchbox">
        <mt-field label="客户名称" placeholder="请输入关键字" v-model="customerKeyWords"></mt-field>
        <mt-button type="primary" style="background:#5e67fc;" size="small" @click.native='goSearchCustomer'>查询</mt-button>
      </div>
      <ul class="popMenu" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li v-for="item in customerList" @click='selectCustomer(item)'>
          <div>{{item.cName}}</div>
        </li>
        <div style=" margin:0 auto;width:60px" v-show='loading'>
          <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px;margin:0 auto"></mt-spinner>
        </div>
        <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕</div>
      </ul>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import axios from 'axios';
  import { Indicator } from 'mint-ui';
  export default {
  data() {
    return {
      customerList: [],           //客户数组
      customerKeyWords: '',       //客户查询
      loading: false,             //加载中
      totalPage: 1,               //总页数
      loadAll: false,             //全部加在完毕
      currentPage: 1,             //当前页
      pageRows: 20,               //每页显示几条
    }
  },
  props:[
    'source','popCustomerList'
  ],
  watch: {
    'popCustomerList':function(val){
      console.log("popCustomerList",val);
    }
  },
  created:function(){
  },
  mounted: function() { 
  },
  methods: {
    goSearchCustomer: function() {                  //查询客户
      this.customerList = [];
      this.currentPage = 1;
      this.loadMore();
    },
    loadMore: function() {                          //获取客户列表
      if(this.customerKeyWords == ''){
        return MessageBox.alert( '请输入关键字！','提示');
      }
      var self = this;
      var param = {
        name: this.customerKeyWords,
        pageRows: this.pageRows,
        currenPage: this.currentPage,
        pagingRequired: true
      };
      if (this.currentPage > this.totalPage) {
        return;
      }
      this.loadAll = false;
      this.loading = true; 
      let url = "";
      if(this.source == "logwidget"){
        url = this.Apilist.selectContractCustomListPaging;
      }else{
        url = this.Apilist.selectCustomListPagingByLog;
      }
      axios.post(self.html_url + url, param).then(function(data) {
        self.customerList = self.customerList.concat(data.data.data);
        self.loading = false;
        if (self.customerList.length == 0) {
          MessageBox.alert( '暂无查询结果！','提示');
          return
        }
        self.totalPage = data.data.totalPage;
        if (self.currentPage == data.data.totalPage) {
          self.loadAll = true;
        }
        self.currentPage = self.currentPage + 1;
      }).catch(function(e) {});
    },
    selectCustomer: function(obj) {               //客户选择
      this.$emit('selectCustomer',obj);
      this.customerKeyWords = "";
    }
  }
}
</script>
<style scoped>
  .customerList {width: 100%;}
  .searchbox {background: #efefef;}
  .popMenu {padding: 0px;margin: 0px;}
  .popMenu li {border-bottom: 1px dashed gray;text-align: left;padding-left: 20px;line-height: 40px;
    min-height: 40px;list-style: none;margin: 0px;}
</style>