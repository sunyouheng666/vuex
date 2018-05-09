<template id="card">
  <div>
    <ul class="contactlist" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="item in cardList">
        <img :src=" item.pathCompress" />
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
        cardList: [],           //客户名片数组
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
      this.loadMore();
    },
    methods: {
      loadMore: function() {
        var self = this;
        if (this.currentPage > this.totalPage) {
          return;
        }
        self.loading = true;
        self.noData = false;
        axios.post(self.html_url + self.Apilist.selectCardListPaging, { customId: self.id, pagingRequired: true }).then(function(data) {
          self.cardList = self.cardList.concat(data.data.data);
          self.loading = false;
          if (self.cardList.length == 0) {
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
<style scoped>
  ul{margin-top: 0;list-style: none;}
  .contactlist {list-style: none;padding: 0px;}
  .contactlist li img {width: 100%;padding:2px 1px;}
</style>