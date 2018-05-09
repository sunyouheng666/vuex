<template>
  <div class="pageBox">
    <mt-header title="设置筛选条件" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      <mt-button slot="right" @click.native="fnclearAll" style="margin-right:20px">清空</mt-button>
      <mt-button slot="right" @click.native="searchZuijin"> 查询 </mt-button> 
    </mt-header>
    <div style="padding-top:39px;">
      <div>
        <mt-field label="客户名称" placeholder="请输入客户名称" v-model="customer" :attr="{ maxlength:100 }"> 
        </mt-field>
        <mt-field label="省份" placeholder="请选择省份" v-model="province" @click.native='showProvince' readonly>
        </mt-field>
        <mt-field label="城市" placeholder="请选择城市" v-model="city" @click.native='showCity(provinceId)' readonly>
        </mt-field>
        <mt-field label="区县" placeholder="请选择区县" v-model="area" @click.native='showArea(cityId)' readonly>
        </mt-field>
        <mt-field label="客户地址" placeholder="请输入客户地址" v-model="address" :attr="{ maxlength: 200 }"> 
        </mt-field>
        <mt-field label="销售客户类型" placeholder="请选择销售客户类型" v-model="customerType" @click.native='showCustomerType' readonly>
        </mt-field>
        <mt-field label="外贸管理顾问" placeholder="请选择外贸管理顾问" v-model="guWen" @click.native='showGuWen' readonly>
        </mt-field>
        <mt-field label="实施工程师" placeholder="请选择实施工程师" v-model="shiShi" @click.native='showshiShi' readonly>
        </mt-field>
        <mt-field label="维护工程师" placeholder="请选择维护工程师" v-model="engineer" @click.native='showEngineer' readonly>
        </mt-field>
        <mt-field label="开始时间" placeholder="开始时间" type="date" v-model="start" class="time-height">
        </mt-field>
        <mt-field label="结束时间" placeholder="结束时间" type="date" v-model="end" class="time-height">
        </mt-field>
        <mt-popup v-model="showProvincePop" position="bottom" style='width:100%'>
          <div class="title-pop"> 选择省份 </div>
          <mt-picker :slots="slotsProvince" ref="pickerProvince" @change="onValChangeProvince" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showProvincePop">
          </mt-picker>
        </mt-popup>
        <mt-popup v-model="showCityPop" position="bottom" style='width:100%'>
          <div class="title-pop">选择城市</div>
          <mt-picker :slots="slotsCity" ref="pickerCity" @change="onValChangeCity" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showCityPop"></mt-picker>
        </mt-popup>
        <mt-popup v-model="showAreaPop" position="bottom" style='width:100%'>
          <div class="title-pop">选择区县</div>
          <mt-picker :slots="slotsArea" ref="pickerArea" @change="onValChangeArea" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showAreaPop"></mt-picker>
        </mt-popup>
        <!-- 销售客户类型 -->
        <mt-popup v-model="showCustomerTypePop" position="bottom" style='width:100%'>
          <div class="title-pop">销售客户类型</div>
          <mt-picker :slots="slotsCustomerType" ref="pickerCustomerType" @change="onValChangeCustomerType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showCustomerTypePop"></mt-picker>
        </mt-popup>
        <!-- 实施工程师 -->
        <mt-popup v-model="showShiShiPop" position="bottom" style='width:100%'>
          <div class="title-pop">实施工程师</div>
          <mt-picker :slots="slotsShiShi" ref="pickerShiShi" @change="onValChangeShiShi" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showShiShiPop"></mt-picker>
        </mt-popup>
        <!-- 外贸管理顾问 -->
        <mt-popup v-model="showGuWenPop" position="bottom" style='width:100%'>
          <div class="title-pop">外贸管理顾问</div>
          <mt-picker :slots="slotsGuWen" ref="pickerGuWen" @change="onValChangeGuWen" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showGuWenPop"></mt-picker>
        </mt-popup>
        <!-- 维护工程师 -->
        <mt-popup v-model="showEngineerPop" position="bottom" style='width:100%'>
          <div class="title-pop">维护工程师</div>
          <mt-picker :slots="slotsEngineer" ref="pickerEngineer" @change="onValChangeEngineer" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showEngineerPop"></mt-picker>
        </mt-popup>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import axios from 'axios';
export default {
  data() {
    return {
      customer: '',                       //客户名称
      provinceId: '',                     //省份ID
      province: '',                       //省份名称
      slotsProvince: [{
        flex: 1,
        values: [],
        className: 'slotsProvince',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showProvincePop: false,             //省份弹窗
      city: '',                           //城市
      cityId: '',                         //城市ID
      slotsCity: [{
        flex: 1,
        values: [],
        className: 'slotsCity',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showCityPop: false,                 //城市弹窗
      area: '',                           //区县
      areaId: '',                         //区县ID
      slotsArea: [{
        flex: 1,
        values: [],
        className: 'slotsArea',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showAreaPop: false,                 //区县弹窗
      address: '',                        //客户地址
      customerType: '',                   //销售客户类型
      customerTypeId: '',                 //销售客户类型ID
      slotsCustomerType: [{
        flex: 1,
        values: [{                        //客户类型
          id: '1',
          name: '公开客户'
        }, {
          id: '2',
          name: '保留客户'
        }, {
          id: '3',
          name: '合作客户'
        }],
        className: 'slotsCustomerType',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showCustomerTypePop: false,         //销售客户类型弹窗
      guWen: '',                          //外贸管理顾问
      guWenId: '',                        //外贸管理顾问ID
      slotsGuWen: [{
        flex: 1,
        values: [],
        className: 'slotsGuWen',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showGuWenPop: false,                //外贸管理顾问弹窗
      shiShi: '',                         //实施工程师
      shiShiId: '',                       //实施工程师ID
      slotsShiShi: [{
        flex: 1,
        values: [],
        className: 'slotsShiShi',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showShiShiPop: false,               //实施工程师弹窗
      engineer: '',                       //维护工程师
      engineerId: '',                     //维护工程师ID
      slotsEngineer: [{
        flex: 1,
        values: [],
        className: 'slotsEngineer',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showEngineerPop: false,             //维护工程师弹窗
      start: '',                          //开始时间
      end: '',                            //结束时间
    }
  },
  mounted: function() {
    this.fnclearAll();
  },
  computed: {
  },
  watch: { 
    'province':function(n,o){
      if(n!=o){
        this.city = '';
        this.cityId = '';
      }
    },
    'city':function(n,o){
      if(n!=o){
        this.area = '';
        this.areaId = ''; 
      }
    },
  },  
  created:function(){ 
  },
  methods: {
    timer(type) {
      let time_html = '';
      if (type != '' && type != null) {
        let year = type.getFullYear();
        let month = type.getMonth() + 1;
        month < 10 && (month = '0' + month);
        let day = type.getDate();
        day < 10 && (day = '0' + day);
        time_html = year + "-" + month + "-" + day;
        return time_html
      } else {
        return time_html
      }
    },
    searchZuijin:function(){
      let _Time =  this.timer(new Date());
      var self = this;
      if (self.start > self.end) {
        MessageBox('提示', '结束时间不能早于开始时间！');
        return
      }
      if (self.end > _Time) {
        MessageBox('提示', '结束时间不能早于当前时间！');
        return
      }
      var param = {
        name: self.customer,
        adress:self.address,
        provinces: self.provinceId,
        city: self.cityId,
        area: self.areaId,
        customType: self.customerTypeId,
        maintainIds: self.engineerId,
        saleManageId: self.guWenId,
        implementationIds: self.shiShiId,
        startTimeStr: self.start,
        endTimeStr: self.end, 
      }
      let num = 0;
      let count = 0;
      for (var key  in  param){
        count = count + 1;
        if(param[key] == "" ){
          num =  num + 1;
        }
      }
      if(num == count){
        MessageBox('提示', '请输入查询条件');
        return
      }
      this.$router.push({path: 'searchCustomerRecently',query: param}); 
    },
    onValChangeShiShi: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.shiShi = values[0].name;
      this.shiShiId = values[0].id;
    },
    showshiShi: function() {
      var self = this;
      self.slotsShiShi[0].values = [];
      axios.post(self.html_url + self.Apilist.selectEmployeeList, {}).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox('提示', '暂无选项！');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsShiShi[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
        }
        self.showShiShiPop = true;
      }).catch(function(e) {});
    },
    onValChangeEngineer: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.engineer = values[0].name;
      this.engineerId = values[0].id;
    },
    showEngineer: function() {
      var self = this;
      self.slotsEngineer[0].values = [];
      axios.post(self.html_url + self.Apilist.selectEmployeeList, {}).then(function(data) { 
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox('提示', '暂无选项！');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsEngineer[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
        }
        self.showEngineerPop = true;
      }).catch(function(e) {});
    },
    onValChangeGuWen: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.guWen = values[0].name;
      this.guWenId = values[0].id;
    },
    showGuWen: function() {
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
    showCustomerType: function() { //  客户类型
      var self = this;
      self.showCustomerTypePop = true;
    },
    onValChangeCustomerType: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.customerType = values[0].name;
      this.customerTypeId = values[0].id;
    },
    onValChangeArea: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.area = values[0].name;
      this.areaId = values[0].id
    },
    showArea: function(cityId) {
      var self = this;
      if (cityId == '') {
        MessageBox('提示', '请先选择市！');
        return
      } else {
        var param = {
          cId: cityId
        };
        self.slotsArea[0].values = [];
        axios.post(self.html_url + self.Apilist.selectAreaList, param).then(function(data) {
          var listTemp = data.data.data;
          if (listTemp.length == 0) {
            MessageBox('提示', '暂无选项！');
            return
          }
          for (var i = 0; i < listTemp.length; i++) {
            self.slotsArea[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
          }
          self.showAreaPop = true;
        }).catch(function(e) {});
      }
    },
    onValChangeCity: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.city = values[0].name;
      this.cityId = values[0].id
    },
    showCity: function(provinceId) {
      var self = this;
      if (provinceId == '') {
        MessageBox('提示', '请先选择省！');
        return
      } else {
        var param = {
          pId: provinceId
        };
        self.slotsCity[0].values = [];
        axios.post(self.html_url + self.Apilist.selectCityList, param).then(function(data) {
          var listTemp = data.data.data;
          if (listTemp.length == 0) {
            MessageBox('提示', '暂无选项！');
            return
          }
          for (var i = 0; i < listTemp.length; i++) {
            self.slotsCity[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
          }
          self.showCityPop = true;
        }).catch(function(e) {});
      }
    },
    onValChangeProvince: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.province = values[0].name;
      this.provinceId = values[0].id;
    },
    showProvince: function() {
      var self = this;
      self.slotsProvince[0].values = [];
      axios.post(self.html_url + self.Apilist.selectProvinceList, {}).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox('提示', '暂无选项！');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsProvince[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
        }
        self.showProvincePop = true;
      }).catch(function(e) {});
    },
    fnclearAll: function() { 
      this.customer = '';
      this.address = '';
      this.province = '';
      this.city = '';
      this.area = '';
      this.provinceId = '';
      this.cityId = '';
      this.areaId = ''; 
      this.customerType  = ''; 
      this.customerTypeId = '';
      this.guWen = '';
      this.guWenId = '';
      this.shiShi = '';
      this.shiShiId = '';
      this.engineer = '';
      this.engineerId = '';
      this.start = '';
      this.end = '';
    },
    back: function() { 
      this.$router.push({path: 'customerManager',query:{type:'3'}});
    }   
  }
}
</script>
<style scoped>
  .titleItem{ text-align: left;padding: 5px;padding-left: 20px;}
  .mint-field .mint-cell-title{ text-align: left }
  .fieldItem {min-height: 40px;margin-left: 10px;width: 100%;clear: both; position: relative;border-top: 1px solid #d9d9d9;}
  .mint-checklist .mint-cell {padding: 0; width: 50%!important;float: left;text-align: left;}
</style>
<style>
  .mint-tab-container-wrap {display: -webkit-box;display: -ms-flexbox;display: flex; margin-top: 3px!important;}
  .pageBox .mint-field .mint-cell-title {width: 110px;-webkit-box-flex: 0;-ms-flex: none;
    flex: none;text-align: left!important;padding-left: 10px;}
  .mint-cell-text {vertical-align: middle;color: #2894e5!important; font-size: 14px!important;}
  .mint-cell-value{font-size: 14px!important;}
</style> 