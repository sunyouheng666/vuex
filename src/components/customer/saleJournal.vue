<template id="saleJournal">
  <div class="searchList">
    <ul v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
      <li v-for="item in rizhiList">
        <div class="line"></div>
        <div class="companyType">
          <label>录入人：</label>
          <span class="labelcss">{{item.operatorName}}</span>
        </div>
        <div class="companyType">
          <label>车费合计：</label>
          <span class="labelcss">{{item.totalFare}}</span> 
        </div>
        <div class="companyType">
          <label>拜访日期：</label>
          <span class="labelcss">{{item.visitingDate|TimeCut}}</span>
        </div>
        <div style="clear:both;width:100%"></div>
        <div class="companyType">
          <label>录入日期：</label>
          <span class="labelcss">{{item.gmtCreate|TimeCut}}</span>
        </div>
        <div class="companyType">
          <label>联系人：</label>
          <span class="labelcss">{{item.contactsName}}</span>
        </div>
        <div class="companyType">
          <label>陪访人：</label>
          <span class="labelcss">{{item.accompanyName==null||item.accompanyName==''?"无":item.accompanyName}}</span>
        </div>
        <div class="companyType">
          <label>外贸管理顾问：</label>
          <span class="labelcss">{{item.salesmanName==null||item.salesmanName==''?"无":item.salesmanName}}</span>
        </div>
        <div class="companyType">
          <label>最新级别：</label>
          <span class="labelcss">{{item.latestLevelName==null||item.latestLevelName==''?"无":item.latestLevelName}}</span>
        </div> 
        <div class="companyType">
          <label>拜访内容：</label>
          <div>1）客户有多少外贸人员？</div>
          <div>{{item.answer1==null?"无":item.answer1}}</div>
          <div>2）你觉得客户对我们哪些服务感兴趣？</div>
          <div>{{item.answer2==null?"无":item.answer2}}</div>
          <div>3）客户有哪些反对意见？你是怎么回答的？</div>
          <div>{{item.answer3==null?"无":item.answer3}}</div>
          <div>4）客户是否有询问价格？客户对我们的价格有什么意见？</div>
          <div>{{item.answer4==null?"无":item.answer4}}</div>
          <div>5）你是否要求客户签约付款，为什么客户不能当场定下来？</div>
          <div>{{item.answer5==null?"无":item.answer5}}</div>
          <div>6）如果客户不能当场定下来，你是否约好下次拜访时间？</div>
          <div>{{item.answer6==null?"无":item.answer6}}</div>
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
      loading: false,     //加载中
      noData:false,       //暂无数据
      rizhiList: [],      //日志数组 
      totalPage: 1,       //总页数
      loadAll: false,     //全部加载完毕
      currentPage: 1,     //当前页
      pageSize: 10,       //没页条数
    }
  },
   props: {
    id: {
      type: String,
      default: ''
    }
  }, 
  mounted: function() {
     this.getRizhi();
  },
  methods: { 
     getRizhi: function() {
      this.loadMore();
    },
    loadMore: function() {
      var self = this;
      if (this.currentPage > this.totalPage) {
        return;
      }
      self.loading = true;
      self.noData = false;
      var param={
        customId: self.id,
        pagingRequired: true 
      };
      axios.post(self.html_url + self.Apilist.selectLogListPaging, param ).then(function(data) {
        self.rizhiList = self.rizhiList.concat(data.data.data);
        self.loading = false;
        if (self.rizhiList.length == 0) {
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