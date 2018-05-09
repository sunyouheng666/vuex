<template id="searchNotVisit">
  <div class="searchNotVisit" style="font-size: 14px;">
    <mt-field readonly label="外贸管理顾问" placeholder="请选择外贸管理顾问" v-model="guWen" @click.native='showGuWen'>
    </mt-field>
    <mt-field readonly label="未拜访时间" placeholder="请选择未拜访时间" v-model="notVisitTime" @click.native='showNotVisit'>
    </mt-field>
    <mt-field readonly label="销售客户类型" placeholder="请选择销售客户类型" v-model="customerType" @click.native='showCustomerType'>
    </mt-field>
    <mt-field readonly label="省份" placeholder="请选择省份" v-model="province" @click.native='showProvince'>
    </mt-field>
    <mt-field readonly label="城市" placeholder="请选择城市" v-model="city" @click.native='showCity(provinceId)'>
    </mt-field>
    <mt-field readonly label="区县" placeholder="请选择区县" v-model="area" @click.native='showArea(cityId)'>
    </mt-field>
   
    <mt-popup v-model="showProvincePop" position="bottom" style='width:100%'>
      <div class="title-pop"> 选择省份 </div>
      <mt-picker :slots="slotsProvince" ref="pickerProvince" @change="onValChangeProvince" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showProvincePop">
      </mt-picker>
    </mt-popup>
    <mt-popup v-model="showCityPop" position="bottom" style='width:100%'>
      <div class="title-pop">选择城市</div>
      <mt-picker :slots="slotsCity" ref="pickerCity" @change="onValChangeCity" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showCityPop">
      </mt-picker>
    </mt-popup>
    <mt-popup v-model="showAreaPop" position="bottom" style='width:100%'>
      <div class="title-pop">选择区县</div>
      <mt-picker :slots="slotsArea" ref="pickerArea" @change="onValChangeArea" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showAreaPop"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showNotVisitTimePop" position="bottom" style='width:100%'>
      <div class="title-pop">未拜访时间</div>
      <mt-picker :slots="slotsNotVisitTime" ref="pickerNotVisitTime" @change="onValChangeNotVisitTime" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showNotVisitTimePop"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showCustomerTypePop" position="bottom" style='width:100%'>
      <div class="title-pop">销售客户类型</div>
      <mt-picker :slots="slotsCustomerType" ref="pickerCustomerType" @change="onValChangeCustomerType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showCustomerTypePop"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showGuWenPop" position="bottom" style='width:100%'>
      <div class="title-pop">外贸管理顾问</div>
      <mt-picker :slots="slotsGuWen" ref="pickerGuWen" @change="onValChangeGuWen" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showGuWenPop"></mt-picker>
    </mt-popup>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import axios from 'axios';
export default {
  data() {
    return {
      guWen: '',                        //外贸管理顾问
      guWenId: '',                      //外贸管理顾问ID
      slotsGuWen: [{
        flex: 1,
        values: [],
        className: 'slotsGuWen',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showGuWenPop: false,              //显示外贸管理顾问弹窗
      customerType: '',                 //销售客户类型
      customerTypeId: '',               //销售客户类型ID
      slotsCustomerType: [{
        flex: 1,
        values: [{ //客户类型
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
      showCustomerTypePop: false,       //显示销售客户类型弹窗
      notVisitTime: '15天',             //未拜访时间
      notVisitTimeId: '1',              //未拜访时间ID
      slotsNotVisitTime: [{
        flex: 1,
        values: [{ //客户类型
          id: '1',
          name: '15天'
        }, {
          id: '2',
          name: '一个月'
        }, {
          id: '3',
          name: '两个月'
        }, {
          id: '4',
          name: '三个月'
        }, {
          id: '4',
          name: '大于三个月'
        }],
        className: 'slotsNotVisitTime',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showNotVisitTimePop: false,       //显示未拜访时间弹窗
      area: '',                         //区县名称
      areaId: '',                       //区县ID
      slotsArea: [{
        flex: 1,
        values: [],
        className: 'slotsArea',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showAreaPop: false,               //显示区县弹窗
      city: '',                         //城市名称
      cityId: '',                       //城市ID
      slotsCity: [{
        flex: 1,
        values: [],
        className: 'slotsCity',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showCityPop: false,               //显示城市弹窗
      provinceId: '',                   //省份ID
      province: '',                     //省份名称
      slotsProvince: [{
        flex: 1,
        values: [],
        className: 'slotsProvince',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showProvincePop: false,           //显示省份弹窗
    }
  },
  props: {
  },
  watch: { 
  },
  mounted: function() {
    this.customerType = '';                 //销售客户类型
    this.customerTypeId = '';               //销售客户类型ID
  },
  methods: {
    clearAll:  function( ) {            //清空
      this.guWen = '';
      this.guWenId = ''; 
      this.customerType = '';
      this.customerTypeId = '';
      this.province = '';
      this.provinceId = '';
      this.cityId = '';
      this.city = '';
      this.area = '';
      this.areaId = '';
      this.notVisitTime = '15天';
      this.notVisitTimeId = '1';
    },
    searchNotVisit: function() {        //查询
      var self = this;
      var param = {
        provinces: self.provinceId,
        city: self.cityId,
        area: self.areaId,
        customType: self.customerTypeId,
        saleManageIds: self.guWenId,
        notVisitTime: self.notVisitTimeId
      }
      this.$router.push({path: 'searchNotVisitResult',query: param});
    },
    onValChangeGuWen: function(picker, values) {    //选择外贸管理顾问
      if (values[0] == undefined) {
        return
      }
      this.guWen = values[0].name;
      this.guWenId = values[0].id;
    },
    showGuWen: function() {                         //显示外贸管理顾问弹窗
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
    showCustomerType: function() {                  //客户类型
      var self = this;
      self.showCustomerTypePop = true;
    },
    onValChangeCustomerType: function(picker, values) { //选择客户类型
      if (values[0] == undefined) {
        return
      }
      this.customerType = values[0].name;
      this.customerTypeId = values[0].id;
    },
    onValChangeArea: function(picker, values) {     //选择区县
      if (values[0] == undefined) {
        return
      }
      this.area = values[0].name;
      this.areaId = values[0].id
    },
    showArea: function(cityId) {                    //显示区县弹窗
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
    onValChangeCity: function(picker, values) {   //选择城市
      if (values[0] == undefined) {
        return
      }
      this.city = values[0].name;
      this.cityId = values[0].id
      this.area = '';
      this.areaId = '';
    },
    showCity: function(provinceId) {              //显示城市弹窗
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
    onValChangeProvince: function(picker, values) { //选择省
      if (values[0] == undefined) {
        return
      }
      this.province = values[0].name;
      this.provinceId = values[0].id;
      this.city = '';
      this.cityId = '';
      this.area = '';
      this.areaId = '';
    },
    showProvince: function() {                      //显示省份弹窗
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
    showNotVisit: function() {                      //未拜访时间
      var self = this;
      self.showNotVisitTimePop = true;
    },
    onValChangeNotVisitTime: function(picker, values) {//显示未拜访时间弹窗
      if (values[0] == undefined) {
        return
      }
      this.notVisitTime = values[0].name;
      this.notVisitTimeId = values[0].id;
    }
  }
}
</script>
<style>
  .searchNotVisit .mint-field .mint-cell-title {width: 110px;-webkit-box-flex: 0;-ms-flex: none;
    flex: none;text-align: left!important;color: #2894e5!important;}
</style>