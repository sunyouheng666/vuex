<template id="customerList">
  <div>
    <mt-header title="选择打电话的客户" fixed>
      <mt-button icon="back" slot="left" @click.native="backClose" >返回</mt-button> 
    </mt-header>  
    <div> 
      <!-- 搜索条件 -->
      <div style="margin-top:40px;">
        <mt-field label="客户名称" placeholder="请输入客户关键字查询" v-model="customerName"> </mt-field>
        <div style="border-top:1px solid #dfdfdf; padding :10px 0;">
          <mt-button type="primary" size="small" @click.native='clearForm' style="background:#5e67fc;">清空</mt-button>
          <mt-button type="primary" size="small" @click.native="searchRequery()" style="background:#5e67fc;">查找</mt-button>
        </div>
        <div class="searchList" v-show='showlist'>
          <ul class='shou-list' v-infinite-scroll="searchCustomer" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <li v-for="item in customerList"  @click='xuanzhong(item.id,item.cName)'>
              <div class="companyName"> {{item.cName}} </div> 
              <div class="companyType">  
                <input name="tongxunlu" type="radio" v-model="tongxunlu" :value="item.id" style="position:absolute;right:20px;top:-20px;" />
              </div>
              <div class="clear"></div>
            </li>
            <div style="margin:0 auto; width:60px" v-show='loading'>
              <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto"></mt-spinner>
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
  </div>
</template>
<script>
  import axios from 'axios';
  import { MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
        showlist:false,           //显示列表
        tongxunlu: [],            //右侧圆圈
        customerName: '',         //客户名称
        customerList: [],         //客户列表
        loading: false,           //加载中
        totalPage: 1,             //总页数
        loadAll: false,           //全部加载完毕
        noData:false,             //查询暂无数据！
        currentPage: 1,           //当前页
        pageSize: 20,             //每页显示条数
      }
    },
    props: {
    },
    mounted: function() {
    },
    methods: {
      xuanzhong:function(id,name){            //选中客户
        let param = {
          closepop:false,
          id:id,
          customerName:name
        };
        this.$emit("listenChildevent", param);
      },
      backClose: function() {                 //返回
        let param = {
          closepop:false
        };
        this.$emit("listenChildevent", param);
      },
      clearForm: function() {                 //清空
        this.customerName = '';
        this.customerList = [];
        this.showlist = false;
        this.currentPage = 1;
        this.totalPage = 1;
      },
      searchRequery(){                        //重新查询
        this.currentPage = 1;
        this.totalPage = 1;
        this.customerList = [];
        if(this.customerName == ""){
          MessageBox('提示','请输入客户关键字查询！');
        }else{
          this.searchCustomer();
        }
      },
      searchCustomer: function() {            //查询客户
        if (this.currentPage > this.totalPage) {
          return;
        }
        this.showlist = true;
        this.loading = true;
        this.noData = false;
        this.loadAll = false;
        let self = this;
        let param = {
          name: self.customerName, 
          currenPage: self.currentPage,
          pageRows: self.pageSize,
          pagingRequired: true
        }; 
        axios.post(self.html_url + self.Apilist.selectCustomListPagingByLog, param).then(function(data) {
            if (data.data.totalPage == 0 || data.data.totalPage == null) {
            self.noData = true;
          }
          self.customerList = self.customerList.concat(data.data.data); 
          self.loading = false;
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
<style scoped>
  /* .form{padding-top:40px;} */
  /* .tital {height: 8px;line-height: 8px;background: #efefef;} */
    .searchList {background: #fff;width:100%;height: 100%}
  .searchList ul {list-style: none; padding: 5px; margin-top:0px;}
  .searchList ul li {text-align: left;line-height: 28px;padding: 2px 0;}
  .companyName {color: #5e67fc;}
  .companyType {width: 100%; position: relative;}
</style>