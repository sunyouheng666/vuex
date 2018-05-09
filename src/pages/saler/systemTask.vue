<template>
  <div>
    <mt-header title="我的任务" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div style="margin-top: 40px;">
      <mt-field label="任务日期" placeholder="请输入日期" type="date" v-model="visitDate" class="time-height">
      </mt-field>
      <mt-field label="任务状态" placeholder=""  v-model="highlevel" @click.native='showHighPop=true' readonly>
      </mt-field>
    </div>
    <div style='  text-align:center; padding-left:10px;background:#5e67fc;color:#fff;height:36px;line-height:36px;'>搜索结果 </div>
    <div class="searchList">
      <ul class='shou-list'   v-infinite-scroll="loadMore"  infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li v-for="item in customerList"  @click='goDetail(item)'>
          <div class="line"></div>
          <div class="companyName"> {{item.cName}}</div>
          <div class="companyAdd" style="word-break: break-word;">
            <span class="labelcss">地址：</span>
            <span style="word-break: break-word;">
              {{item.fullAdress}}
            </span>
          </div>
          <div class="companyType">
            <span class="labelcss" >客户主页：</span>
            <span>
              {{item.homepage==null?'无':item.homepage}}
            </span>
            </div>
          <div class="companyType">
            <span class="labelcss">市场销售员：</span>
              {{item.salesmanName==null?'无':item.salesmanName}}
            </div>
          <div class="companyType">
            <span class="labelcss">外贸管理顾问：</span>
              {{item.saleManageName==null?'无':item.saleManageName}}
            </div>
          <div class="companyType"><span class="labelcss">最近访问时间：</span> {{item.visitingDate | TimeCut}}</div>
          <div class="companyType"><span class="labelcss">分配时间：</span> {{item.assignDate | TimeCut}}</div>  
          <div class="clear"></div>
        </li>
        <div style=" margin:0 auto; width:60px " v-show='loading'>
          <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto"></mt-spinner>
        </div>
        <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕</div>
        <div style="padding:20px; text-align:center; color:gray" v-show='noData'>查询暂无数据！</div>
      </ul>
    </div>
    <mt-popup v-model="showHighPop" position="bottom" style='width:100%'>
      <div class="title-pop">选择任务状态</div>
      <mt-picker :slots="slotsHigh" ref="pickerHigh" @change="onValChangeHigh" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showHighPop"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import axios from 'axios';
  export default {
    data() {
      return {
        loading:false,
        loadAll: false,         //全部加载完毕
        noData:false,           //查询暂无数据！
        visitDate:'',                //任务时间
        highlevel: '未完成',              //最高级别 
        highlevelId: '0',            //最高级别ID 
        slotsHigh: [{               //最高级别数组 
          flex: 1,
          values: [{      
            id: '',
            name: '全部'
          }, {
            id: '0',
            name: '未完成'
          }, {
            id: '1',
            name: '已完成'
          }],
          className: 'slotsHigh',
          textAlign: 'center',
          defaultIndex: 1,
        }],
        showHighPop: false,         //最高级别显示隐藏
        pageSize:10,
        currentPage:1,
        totalPage:10,
        customerList:[],
        queryDate:"",
      }
    },
    watch:{
      'visitDate':function(n,o){
        if(n != ''){
          this.queryDate = this.visitDate+" "+"00:00:00" ;
          let timeS = new Date(this.queryDate)
          let timeE = new Date();
          if(timeS > timeE){
            MessageBox('提示', '任务日期不能大于当前时间！');
            return
          }
          this.customerList = [];
          this.currentPage = 1;
          this.totalPage = 10;
          this.loadMore();            
        }
      },
      'highlevelId':function(n,o){
        this.customerList = [];
        this.currentPage = 1;
        this.totalPage = 10;
        this.loadMore();  
      }
    },
    mounted: function() {
      this.visitDate = this.timerShort(new Date());  
    },
    methods: {
      loadMore() {              //加载中
        let timeS = new Date(this.visitDate)
        let timeE = new Date();
        if(timeS > timeE){
          MessageBox('提示', '任务日期不能大于当前时间！');
          return
        }
        if (this.currentPage > this.totalPage) {
          return;
        }
        this.loading = true;
        this.noData = false;
        let self = this;
        var param = {
          queryDate:this.queryDate,
          status: self.highlevelId,
          pageRows: self.pageSize,
          pagingRequired: true,
          currenPage: self.currentPage
        };    
        axios.post(self.html_url + self.Apilist.selectMySystemTaskList, param).then(function(data) {
          if (data.data.totalPage==0||data.data.totalPage==null) {
            self.noData = true;
            self.loadAll = false;
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
      },
      back: function() {        //返回
        this.$router.go(-1);
      },
      goDetail(obj){            //获取客户详情
        if(obj.isDelete == 1){
          MessageBox('提示', '用户已删除！');
          return false; 
        }else{
          this.$router.push({ path: '/customerDetail',query: {customerId: obj.customId }});
        } 
      },
      onValChangeHigh: function(picker, values) {       //选择最高级别
        if (values[0] == undefined) {
          return
        }
        this.highlevel = values[0].name;
        this.highlevelId = values[0].id;
      },
      timerShort(type) {                           //时间转换
        let time_html = '';
        let year = type.getFullYear(); 
        let month = type.getMonth() + 1; 
        month < 10 && (month = '0' + month);
        let day = type.getDate();  
        day < 10 && (day = '0' + day);
        let h = type.getHours();
        h < 10 && (h = '0' + h);
        let M = type.getMinutes();
        M < 10 && (M = '0' + M);
        time_html = year + "-" + month+ "-" + day;
        return time_html     
      },
    }
  }
</script>
<style scoped> 
  .mint-checklist .mint-cell {padding: 0;width: 50%!important;float: left;text-align: left;}
</style>