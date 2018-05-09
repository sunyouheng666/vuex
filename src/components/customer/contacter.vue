<template id="contacter"> 
  <div class="searchList">
    <ul v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="item in contacterList">
        <div class="line"></div>
        <div class="companyType">
          <span class="labelcss">姓名：</span>
          <span>{{item.name}}</span>
        </div>
        <div class="companyType">
          <span class="labelcss">性别：</span>
          <span>{{item.sexName}}</span>
        </div>
        <div style="clear:both;width:100%"></div>
        <div class="companyType">
          <span class="labelcss">职务：</span>
          <span>{{item.postName==null||item.postName==''?"无":item.postName}}</span>
        </div>
        <div class="companyType">
          <span class="labelcss">手机：</span>
          <span>{{item.phone}}</span>
          <span class="callcss" :title='item.telephone' @click='calling(item)'></span>
        </div>
        <div class="companyType">
          <span class="labelcss">Email：</span>
          <span>{{item.email}}</span>
        </div>
        <div class="companyType">
          <span class="labelcss">电话：</span>
          <span>{{item.telephone==null||item.telephone==''?"无":item.telephone }}</span>
          <span  v-show="item.telephone!=''" class="callcss" :title='item.phone' @click='calling(item)'></span>
        </div>
        <div class="companyType">
          <span class="labelcss">微信：</span>
          <span>{{item.wechatNum==null||item.wechatNum==''?"无":item.wechatNum}}</span>
        </div>
        <div class="companyType">
          <span class="labelcss">QQ：</span>
          <span>{{item.qqNum==null||item.qqNum==''?"无":item.qqNum}}</span>
        </div>
        <div class="companyType">
          <span class="labelcss">属地：</span>
          <span>{{item.cityName==null||item.cityName==''?"无":item.cityName}}</span>
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
  import { MessageBox } from 'mint-ui';
  import axios from 'axios';
  export default {
    data() {
      return {
        loading: false,         //加载中
        noData:false,           //暂无数据
        contacterList: [],      //联系人数组
        totalPage: 1,           //总页数
        loadAll: false,         //全部加载完毕
        currentPage: 1,         //当前页
        pageSize: 10,           //每页条数
      }
    },
    props: [
      'id'
    ],
    watch:{
      'id':function(val){
        this.getContact(val);
      }
    },
    mounted: function() {
      this.getContact();
    },
    methods: {
      calling:function(obj){
        var param = {
          "customId":obj.customId,
          "linkId":obj.id,
          "linkPhone":obj.phone,
          "cName":obj.customName,
          "linkName":obj.name
        };
        this.$router.push({ path: '/searchNetPhone',query:param});
      },
      getContact: function() { 
        this.loadMore();
      },
      loadMore: function() {
        var self = this;
        if (this.currentPage > this.totalPage) {
          return;
        }
        self.loading = true;
        self.noData = false;
        axios.post(self.html_url + self.Apilist.selectContactsListPaging, { customId: self.id, pagingRequired: true }).then(function(data) {
          self.contacterList = self.contacterList.concat(data.data.data);
          self.loading = false;
          if (self.contacterList.length == 0) {
            self.noData = true;
            return
          }
          self.totalPage = data.data.totalPage; 
          if (self.currentPage == data.data.totalPage) {
            self.loadAll = true;
          }
          self.currentPage = self.currentPage + 1;
        }).catch(function(e) {self.loading = false;});
      }
    }
  }
</script>
<style scoped>
  .searchList li span.callcss{background:  url('../../../static/image/call.png') center center no-repeat;
    display: inline-block;width: 24px; height: 25px;max-width: 24px;float: right;padding-left: 30px;}
</style>