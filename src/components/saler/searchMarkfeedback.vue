<template id="searchMarkfeedback">
  <div class="searchMarkfeedback" style="position:relative;">
    <mt-field label="客户名称" placeholder="请输入客户名称" v-model="customerName" :attr="{maxlength: 100 }">
    </mt-field>
    <mt-field readonly label="跟踪状态" placeholder="请选择跟踪状态" v-model="genZong" @click.native='showGenZong'>
    </mt-field>
    <mt-field readonly label="反馈类型" placeholder="请选择反馈类型" v-model="feedBackType" @click.native='feedBackTypeFn'>
    </mt-field>
    <mt-field readonly label="来源" placeholder="请选择" v-model="laiyuan" @click.native='laiyuanFn'>
    </mt-field>
    <mt-field readonly label="市场销售员" placeholder="请选择" v-model="guWen" @click.native='showGuWen'>
    </mt-field>
    <mt-field   label="反馈起始日期"  type="date" v-model="feedbackDateStart" class="time-height">
    </mt-field>
    <mt-field   label="反馈终止日期"  type="date" v-model="feedbackDateEnd"  class="time-height">
    </mt-field>
    <mt-popup v-model="showLaiyuanPop" position="bottom" style='width:100%'>
      <div class="title-pop">来源</div>
      <mt-picker :slots="slotsLaiyuanType" ref="pickerLaiyuan" @change="onValChangelaiyuan" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showLaiyuanPop"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showGuWenPop" position="bottom" style='width:100%'>
      <div class="title-pop">市场销售员</div>
      <mt-picker :slots="slotsGuWen" ref="pickerGuWen" @change="onValChangeGuWen" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showGuWenPop"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showfeedBackTypePop" position="bottom" style='width:100%'>
      <div class="title-pop">反馈类型</div>
      <mt-picker :slots="slotsFeedBackType" ref="pickerFeedBackType" @change="onValChangefeedBackType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showfeedBackTypePop"></mt-picker>
    </mt-popup>
   <mt-popup v-model="showGenZongPop" position="bottom" style='width:100%'>
      <div class="title-pop">跟踪状态</div>
      <mt-picker :slots="slotsGenZong" ref="pickerGenZong" @change="onValChangeGenZong" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showGenZongPop"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import axios from 'axios';
export default {
  data() {
    return {
      feedbackDateStart:'',               //反馈起始日期
      feedbackDateEnd:'',                 //反馈终止日期
      customerName:'',                    //客户名称
      laiyuan: '',                        //来源
      laiyuanId: '',                      //来源ID
      slotsLaiyuanType: [{
        flex: 1,
        values: [{
            value: '1',
            name: '手工录入'
          }, {
            value: '2',
            name: '网站反馈'
          } 
        ],
        className: 'slotsLaiyuanType',
        textAlign: 'center',
        defaultIndex: 1,
      }],                                 //来源数组
      showLaiyuanPop: false,              //来源显示
      feedBackType: '',                   //反馈类型
      feedBackTypeId: '',                 //反馈类型id
      slotsFeedBackType: [{
        flex: 1,
        values: [],
        className: 'slotsFeedBackType',
        textAlign: 'center',
        defaultIndex: 1,
      }],                                 //反馈类型数据
      showfeedBackTypePop: false,         //反馈类型显示
      genZong: '',                        //跟踪状态
      genZongId: '',                      //跟踪状态ID
      slotsGenZong: [{
        flex: 1,
        values: [{        
            value: '1',
            name: '未跟踪'
        }, {
            value: '2',
            name: '已跟踪'
        }, {
            value: '3',
            name: '已签约'
        }],
        className: 'slotsGenZong',
        textAlign: 'center',
        defaultIndex: 1,
      }],                                 //跟踪状态数组
      showGenZongPop: false,              //跟踪状态显示
      guWen: '',                          //市场销售
      guWenId: '',                        //市场销售ID
      slotsGuWen: [{
        flex: 1,
        values: [],
        className: 'slotsGuWen',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showGuWenPop: false,                //市场销售显示
    }
  },
  mounted: function() {  
  },
  methods: { 
    onValChangeGenZong: function(picker, values) {    //跟踪状态选择
      if (values[0] == undefined) {
        return
      }
      this.genZong = values[0].name;
      this.genZongId = values[0].value;
    },
    showGenZong: function() {                         //跟踪状态点击
      var self = this;
      self.showGenZongPop = true;
    },
    clearAll: function() {                            //清空所有
      this.guWen = '';
      this.guWenId = '';
      this.customerName = '';
      this.genZong = '';
      this.genZongId = '';
      this.feedBackTypeId = '';
      this.feedBackType = '';
      this.laiyuan = '';
      this.laiyuanId = '';
      this.feedbackDateStart = '';
      this.feedbackDateEnd = '';
    },
    searchMarkfeedback: function() {                  //市场反馈查询
      var self = this;
      if(self.feedbackDateStart != '' ){
        if(self.feedbackDateEnd ==''){
          MessageBox('提示', '请选择终止日期！');
          return
        }
        if(self.feedbackDateStart < '2002-01-01 00:00:00'){
          MessageBox('提示', '起始日期不能小于‘2002-01-01 ’！');
          return
        }
        if( self.feedbackDateStart > self.feedbackDateEnd){
          MessageBox('提示', '起始日期不能小于终止日期！');
          return
        }
        let timeS = new Date(self.feedbackDateEnd)
        let timeE = new Date();
        if(timeS > timeE){
          MessageBox('提示', '终止日期不能大于当前时间！');
          return
        }
        self.feedbackDateEnd = self.feedbackDateEnd+" 00:00:00";
        self.feedbackDateStart = self.feedbackDateStart+" 00:00:00";
      }
      if(self.feedbackDateEnd !='' ){
        if(self.feedbackDateStart ==''){
          MessageBox('提示', '请选择起始日期！');
          return
        }  
      }
      if(self.feedbackDateStart != '' ){
        if(self.feedbackDateStart < '2002-01-01 00:00:00'){
          MessageBox('提示', '起始日期不能小于‘2002-01-01 ’！');
          return
        }
        if( self.feedbackDateEnd !='' &&(self.feedbackDateStart > self.feedbackDateEnd)){
          MessageBox('提示', '起始日期不能小于终止日期！');
          return
        }
        self.feedbackDateEnd = self.feedbackDateEnd+" 00:00:00";
        self.feedbackDateStart = self.feedbackDateStart+" 00:00:00";
      }
      if( self.feedbackDateEnd != ''){
        if(self.feedbackDateStart !='' && (self.feedbackDateStart > self.feedbackDateEnd)){
          MessageBox('提示', '起始日期不能小于终止日期！');
          return
        }
        let timeS = new Date(self.feedbackDateEnd)
        let timeE = new Date();
        if(timeS > timeE){
          MessageBox('提示', '终止日期不能大于当前时间！');
          return
        }
        self.feedbackDateEnd = self.feedbackDateEnd+" 00:00:00";
        self.feedbackDateStart = self.feedbackDateStart+" 00:00:00";
      }
      var param = {
        followStatus: self.genZongId,                 // 跟踪状态  
        feedbackTypes: self.feedBackTypeId,           //反馈类型
        feedbackSource: self.laiyuanId,               //反馈来源
        customName: self.customerName,                //客户名称
        salesmanIds: self.guWenId,                    //销售员姓名
        feedbackDateStart: self.feedbackDateStart,    //起止时间
        feedbackDateEnd: self.feedbackDateEnd         //起止时间
      };
      this.$router.push({path: 'searchfeedBackResult',query: param});
    },
    onValChangelaiyuan: function(picker, values) {      //来源选择
      if (values[0] == undefined) {
        return
      }
      this.laiyuan = values[0].name;
      this.laiyuanId = values[0].value;
    },
    laiyuanFn: function() {                             //来源点击
      this.showLaiyuanPop = true;
    },
    onValChangefeedBackType: function(picker, values) { //反馈类型选择
      if (values[0] == undefined) {
        return
      }
      this.feedBackType = values[0].name;
      this.feedBackTypeId = values[0].id;
    },
    feedBackTypeFn: function() {                        //反馈类型查询
      var self = this;
      self.slotsFeedBackType[0].values = [];
      axios.post(self.html_url + self.Apilist.selectFeedbackTypeList, {}).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox('提示', '暂无选项！');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsFeedBackType[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
        }
        self.showfeedBackTypePop = true;
      }).catch(function(e) {});
    },
    onValChangeGuWen: function(picker, values) {      //外贸管理顾问选择
      if (values[0] == undefined) {
        return
      }
      this.guWen = values[0].name;
      this.guWenId = values[0].id;
    },
    showGuWen: function() {                           //外贸管理顾问点击
      var self = this;
      self.slotsGuWen[0].values = [];
      axios.post(self.html_url + self.Apilist.selectEmployeeList, {}).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox('提示', '暂无选项！');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsGuWen[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
        }
        self.showGuWenPop = true;
      }).catch(function(e) {});
    },
    addFeedBack:function(){           //增加反馈
      this.$router.push({ path: '/addFeedBack' });
    }
  }
}
</script>
<style>
  .searchMarkfeedback .mint-field .mint-cell-title {width: 110px;-webkit-box-flex: 0;-ms-flex: none;flex: none;text-align: left!important;color: #5e67fc!important;}
</style>