<template id="searchTiaojian">
  <div class="searchTiaojian">
    <mt-field label="客户名称" placeholder="请输入客户名称" v-model="customer" :attr="{ maxlength: 100 }"> </mt-field>
    <mt-field label="省份" placeholder="请选择省份" v-model="province" @click.native='showProvince' readonly>
    </mt-field>
    <mt-field label="城市" placeholder="请选择城市" v-model="city" @click.native='showCity(provinceId)' readonly>
    </mt-field>
    <mt-field label="区县" placeholder="请选择区县" v-model="area" @click.native='showArea(cityId)' readonly>
    </mt-field>
    <mt-field label="最高级别" placeholder="请选择最高级别" v-model="highlevel"  @click.native='showHigh' readonly>
    </mt-field>
    <mt-field label="最新级别" placeholder="请选择最新级别" v-model="newlevel"  @click.native='showNewlevel' readonly>
    </mt-field>
    <mt-field label="销售客户类型" placeholder="请选择销售客户类型" v-model="customerType" @click.native='showCustomerType' readonly>
    </mt-field>
    <mt-field label="市场客户类型" placeholder="请选择市场客户类型" v-model="marketCustomType" @click.native='showMarketCustomerTypePop=true' readonly>
    </mt-field>
    <mt-field label="外贸管理顾问" placeholder="请选择外贸管理顾问" v-model="guWen" @click.native='showGuWenPop=true'  readonly></mt-field>
    <mt-field label="市场销售员" placeholder="请选择市场销售员" v-model="salesmanNames" @click.native='showSalesManPop=true' readonly></mt-field>
    <mt-field label="实施工程师" placeholder="请选择实施工程师" v-model="shiShi" @click.native='showShiShiPop=true' readonly></mt-field>
    <mt-field label="维护工程师" placeholder="请选择维护工程师" v-model="engineer" @click.native='showEngineerPop=true' readonly>
    </mt-field>
    <mt-popup v-model="showProvincePop" position="bottom" style='width:100%'>
      <div class="title-pop"> 选择省份 </div>
      <mt-picker :slots="slotsProvince" ref="pickerProvince" @change="onValChangeProvince" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showProvincePop"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showCityPop" position="bottom" style='width:100%'>
      <div class="title-pop">选择城市</div>
      <mt-picker :slots="slotsCity" ref="pickerCity" @change="onValChangeCity" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showCityPop"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showAreaPop" position="bottom" style='width:100%'>
      <div class="title-pop">选择区县</div>
      <mt-picker :slots="slotsArea" ref="pickerArea" @change="onValChangeArea" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showAreaPop"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showHighPop" position="bottom" style='width:100%'>
      <div class="title-pop">选择最高级别</div>
      <mt-picker :slots="slotsHigh" ref="pickerHigh" @change="onValChangeHigh" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showHighPop"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showNewlevelPop" position="bottom" style='width:100%'>
      <div class="title-pop">选择最新级别</div>
      <mt-picker :slots="slotsNewlevel" ref="pickerNewlevel" @change="onValChangeNewlevel" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showNewlevelPop"></mt-picker>
    </mt-popup>
    <!-- 销售客户类型 -->
    <mt-popup v-model="showCustomerTypePop" position="bottom" style='width:100%'>
      <div class="title-pop">销售客户类型</div>
      <mt-picker :slots="slotsCustomerType" ref="pickerCustomerType" @change="onValChangeCustomerType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showCustomerTypePop"></mt-picker>
    </mt-popup>
    <!-- 市场客户类型 -->
    <mt-popup v-model="showMarketCustomerTypePop" position="bottom" style='width:100%'>
      <div class="title-pop">市场客户类型</div>
      <mt-picker :slots="slotsMarketCustomerType" ref="slotsMarketCustomerType" @change="onValChangeMarketCustomerType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showMarketCustomerTypePop"></mt-picker>
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
     <!-- 市场销售员 -->
    <mt-popup v-model="showSalesManPop" position="bottom" style='width:100%'>
      <div class="title-pop">市场销售员</div>
      <mt-picker :slots="slotsGuWen" ref="pickerGuWen" @change="onValChangeSalesMan" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showSalesManPop"></mt-picker>
    </mt-popup>
    <!-- 维护工程师 -->
    <mt-popup v-model="showEngineerPop" position="bottom" style='width:100%'>
      <div class="title-pop">维护工程师</div>
      <mt-picker :slots="slotsEngineer" ref="pickerEngineer" @change="onValChangeEngineer" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showEngineerPop"></mt-picker>
    </mt-popup>
  </div>
</template>
<script> 
  import { MessageBox } from 'mint-ui';
  import axios from 'axios';
  export default {
    data() {
      return {
        customer: '',                     //客户名称
        provinceId: '',                   //省份ID
        province: '',                     //省份
        slotsProvince: [{
          flex: 1,
          values: [],
          className: 'slotsProvince',
          textAlign: 'center',
          defaultIndex: 1,
        }],
        showProvincePop: false,           //省份弹框
        city: '',                         //城市
        cityId: '',                       //城市ID
        slotsCity: [{
          flex: 1,
          values: [],
          className: 'slotsCity',
          textAlign: 'center',
          defaultIndex: 1,
        }],
        showCityPop: false,               //城市弹框
        area: '',                         //区县
        areaId: '',                       //区县ID
        slotsArea: [{
          flex: 1,
          values: [],
          className: 'slotsArea',
          textAlign: 'center',
          defaultIndex: 1,
        }],
        showAreaPop: false,               //区县弹框
        highlevel: '',                    //最高级别
        highlevelId:'',                   //最高级别ID
        slotsHigh: [{
          flex: 1,
          values: [],
          className: 'slotsHigh',
          textAlign: 'center',
          defaultIndex: 1,
        }],
        showHighPop: false,               //最高级别弹窗
        newlevel: '',                     //最新级别
        newlevelId: '',                   //最新级别ID
        slotsNewlevel: [{
          flex: 1,
          values: [],
          className: 'slotsNewlevel',
          textAlign: 'center',
          defaultIndex: 1,
        }],
        showNewlevelPop: false,           //最新级别弹窗
        customerType: '',                 //销售客户类型
        customerTypeId: '',               //销售客户类型ID
        slotsCustomerType: [{
          flex: 1,
          values:this.$store.state.customTypeArr,
          className: 'slotsCustomerType',
          textAlign: 'center',
          defaultIndex: 1,
        }],
        showCustomerTypePop: false,       //销售客户类型弹窗
        marketCustomType: '',             //市场客户类型                 
        marketCustomTypeId: '',           //市场客户类型ID
        slotsMarketCustomerType: [{
          flex: 1,
          values:[],
          className: 'slotsCustomerType',
          textAlign: 'center',
          defaultIndex: 1,
        }],
        showMarketCustomerTypePop: false, //市场客户类型弹窗
        guWen: '',                        //外贸管理顾问
        guWenId: '',                      //外贸管理顾问ID
        slotsGuWen: [{
          flex: 1,
          values: [],
          className: 'slotsGuWen',
          textAlign: 'center',
          defaultIndex: 1,
        }],
        showGuWenPop: false,              //外贸管理顾问弹窗
        salesmanNames: '',                //市场销售员
        salesmanIds: '',                  //市场销售员ID
        showSalesManPop: false,           //市场销售员弹窗
        shiShi: '',                       //实施工程师
        shiShiId: '',                     //实施工程师ID
        slotsShiShi: [{
          flex: 1,
          values: [],
          className: 'slotsShiShi',
          textAlign: 'center',
          defaultIndex: 1,
        }],
        showShiShiPop: false,             //实施工程师弹窗
        engineer: '',                     //维护工程师
        engineerId: '',                   //维护工程师ID
        slotsEngineer: [{
          flex: 1,
          // values: [],
          values:this.$store.state.saleManageArr,
          className: 'slotsEngineer',
          textAlign: 'center',
          defaultIndex: 1,
        }],
        showEngineerPop: false,           //维护工程师弹窗
      }
    },
    props: {
      clearAll: {
        type: Number,
        default: 1
      },
    },
    watch: {
      clearAll: {
        handler: function(val, oldval) { 
          if (val) { 
            this.onClear();
          } 
        },
        deep: true,
      },
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
      }
    }, 
    compoted:{

    },
    mounted: function() {
      // this.getCustomerType();
      this.getMarketCustomerType();
      this.getSelectEmployeeList();
      this.onClear();
      let me = this;
      setTimeout(function(){
        me.customerType  = '';
        me.customerTypeId = '';
        me.marketCustomType = '';
        me.marketCustomTypeId = '';
      },45) 
    },
    methods: { 
      onClear(){
        this.customer = '';
        this.province = '';
        this.provinceId = '';
        this.city = '';
        this.cityId = '';
        this.area = '';
        this.areaId = '';
        this.highlevel = '';
        this.highlevelId = '';
        this.newlevel = '';
        this.newlevelId = '';
        this.customerType  = '';
        this.customerTypeId = '';
        this.marketCustomType = '';
        this.marketCustomTypeId = '';
        this.guWen = '';
        this.guWenId = '';
        this.salesmanNames = '';
        this.salesmanIds = '';
        this.shiShi = '';
        this.shiShiId = '';
        this.engineer = '';
        this.engineerId = '';
        return
      },
      searchCustomer: function() {                //按条件查询 
        var self = this;
        var param = {
          name: self.customer,
          provinces: self.provinceId,
          city: self.cityId,
          area: self.areaId,
          highestLevel: self.highlevelId,
          latestLevel: self.newlevelId,
          customType: self.customerTypeId,
          marketCustomType:self.marketCustomTypeId,
          saleManageIds: self.guWenId,
          salesmanIds: self.salesmanIds,
          implementationIds: self.shiShiId,
          maintainIds: self.engineerId
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
          MessageBox.alert('请输入查询条件','提示');
          return
        }
        this.$router.push({path: 'searchCustomer',query: param});  
      },
      getSelectEmployeeList(){                  //获取人员信息
        var self = this;
        // self.slotsEngineer[0].values = [];
        self.slotsShiShi[0].values = [];
        self.slotsGuWen[0].values = [];
        axios.post(self.html_url + self.Apilist.selectEmployeeList, {}).then(function(data) {
          var listTemp = data.data.data;
          if (listTemp.length == 0) {
            MessageBox.alert('暂无选项！','提示');
            return
          }
          for (var i = 0; i < listTemp.length; i++) {
            // self.slotsEngineer[0].values.push({ id: listTemp[i].id, name: listTemp[i].name});
            self.slotsShiShi[0].values.push({ id: listTemp[i].id, name: listTemp[i].name});
            self.slotsGuWen[0].values.push({ id: listTemp[i].id, name: listTemp[i].name});
          }
        }).catch(function(e) {});
      },
      getCustomerType: function(){          //获取销售客户类型
        let self = this;
        self.slotsCustomerType[0].values = [];
        axios.post(self.html_url + self.Apilist.selectCustomTypeList, { type: '1' }).then(function(data) {
          var listTemp = data.data.data;
          if (listTemp.length == 0) {
            MessageBox('提示', '暂无选项！');
            return
          }
          for (var i = 0; i < listTemp.length; i++) {
            self.slotsCustomerType[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
          }
        })
      },
      getMarketCustomerType: function(){          //获取市场客户类型
        let self = this;
        self.slotsMarketCustomerType[0].values = [];
        axios.post(self.html_url + self.Apilist.selectCustomTypeList, { type: '2' }).then(function(data) {
          var listTemp = data.data.data;
          if (listTemp.length == 0) {
            MessageBox('提示', '暂无选项！');
            return
          }
          for (var i = 0; i < listTemp.length; i++) {
            self.slotsMarketCustomerType[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
          }
        })
      },
      onValChangeEngineer: function(picker, values) {       //维护工程师选择
        if (values[0] == undefined) {
          return
        }
        this.engineer = values[0].name;
        this.engineerId = values[0].id;
      },
      onValChangeShiShi: function(picker, values) {         //实施工程师选择
        if (values[0] == undefined) {
          return
        }
        this.shiShi = values[0].name;
        this.shiShiId = values[0].id;
      },
      onValChangeGuWen: function(picker, values) {          //外贸管理顾问选择
        if (values[0] == undefined) {
          return
        }
        this.guWen = values[0].name;
        this.guWenId = values[0].id;
      },
      onValChangeSalesMan(picker, values){                  //市场销售员选择
        if (values[0] == undefined) {
          return
        }
        this.salesmanNames = values[0].name;
        this.salesmanIds = values[0].id;
      },
      showCustomerType: function() {                        //客户类型弹窗
        var self = this;
        self.showCustomerTypePop = true;
      },
      onValChangeCustomerType: function(picker, values) {   //销售客户类型选择
        if (values[0] == undefined) {
          return
        }
        this.customerType = values[0].name;
        this.customerTypeId = values[0].id;
      },
      onValChangeMarketCustomerType(picker, values){        //市场客户类型选择
        if (values[0] == undefined) {
          return
        }
        this.marketCustomType = values[0].name;
        this.marketCustomTypeId = values[0].id;
      },
      onValChangeArea: function(picker, values) {           //区县选择
        if (values[0] == undefined) {
          return
        }
        this.area = values[0].name;
        this.areaId = values[0].id
      },
      showArea: function(cityId) {                          //区县弹窗
        var self = this;
        if (cityId == '') {
          MessageBox.alert( '请先选择市！','提示');
          return
        } else {
          var param = {
            cId: cityId
          };
          self.slotsArea[0].values = [];
          axios.post(self.html_url + self.Apilist.selectAreaList, param).then(function(data) {
            var listTemp = data.data.data;
            if (listTemp.length == 0) {
              MessageBox.alert('暂无选项！','提示');
              return
            }
            for (var i = 0; i < listTemp.length; i++) {
              self.slotsArea[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
            }
            self.showAreaPop = true;
          }).catch(function(e) {});
        }
      },
      onValChangeCity: function(picker, values) {         //城市选择
        if (values[0] == undefined) {
          return
        }
        this.city = values[0].name;
        this.cityId = values[0].id
      },
      showCity: function(provinceId) {                    //城市弹窗
        var self = this;
        if (provinceId == '') {
          MessageBox.alert('请先选择省！','提示');
          return
        } else {
          var param = {
            pId: provinceId
          };
          self.slotsCity[0].values = [];
          axios.post(self.html_url + self.Apilist.selectCityList, param).then(function(data) {
            var listTemp = data.data.data;
            if (listTemp.length == 0) {
              MessageBox.alert('暂无选项！','提示');
              return
            }
            for (var i = 0; i < listTemp.length; i++) {
              self.slotsCity[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
            }
            self.showCityPop = true;
          }).catch(function(e) {});
        }
      },
      onValChangeProvince: function(picker, values) {   //选择省份
        if (values[0] == undefined) {
          return
        }
        this.province = values[0].name;
        this.provinceId = values[0].id;
      },
      showProvince: function() {                        //省份弹窗
        var self = this;
        self.slotsProvince[0].values = [];
        axios.post(self.html_url + self.Apilist.selectProvinceList, {}).then(function(data) {
          var listTemp = data.data.data;
          if (listTemp.length == 0) {
            MessageBox.alert('暂无选项！','提示');
            return
          }
          for (var i = 0; i < listTemp.length; i++) {
            self.slotsProvince[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
          }
          self.showProvincePop = true;
        }).catch(function(e) {});
      },
      onValChangeHigh: function(picker, values) {       //选择最高级别
        if (values[0] == undefined) {
          return
        }
        this.highlevel = values[0].name;
        this.highlevelId = values[0].id;
      },
      showHigh: function() {                            //最高级别弹窗
        var self = this;
        self.slotsHigh[0].values = [];
        axios.post(self.html_url + self.Apilist.selectHighestLevelList, {}).then(function(data) {
          var listTemp = data.data.data;
          if (listTemp.length == 0) {
            MessageBox.alert('暂无选项！','提示');
            return
          }
          for (var i = 0; i < listTemp.length; i++) {
            self.slotsHigh[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
          }
          self.showHighPop = true;
        }).catch(function(e) {});
      },
      showNewlevel: function() {                        //最新级别弹窗
        var self = this;
        self.slotsNewlevel[0].values = [];
        axios.post(self.html_url + self.Apilist.selectLatestLevelList, {}).then(function(data) { 
          var listTemp = data.data.data;
          if (listTemp.length == 0) {
            MessageBox.alert( '暂无选项！','提示');
            return
          }
          for (var i = 0; i < listTemp.length; i++) {
            self.slotsNewlevel[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
          }
          self.showNewlevelPop = true;
        }).catch(function(e) {});
      },
      onValChangeNewlevel: function(picker, values) {   //选择最新级别
        if (values[0] == undefined) {
          return
        }
        this.newlevel = values[0].name;
        this.newlevelId = values[0].id;
      }
    }
  }
</script>
<style scoped>
  .titleItem{height: 40px;text-align: left;background: #efefef; line-height: 40px;padding-left: 20px;}
  .fieldItem {min-height: 40px;margin-left: 10px;width: 100%;clear: both;position: relative;border-top: 1px solid #d9d9d9;}
</style>
<style>
  .searchTiaojian .mint-field .mint-cell-title {width: 100px;-webkit-box-flex: 0;-ms-flex: none;flex: none;text-align: left!important;}
  .mint-cell-text {vertical-align: middle;color: #2894e5!important; font-size: 14px!important;}
  .mint-cell-value{font-size: 14px!important;}
</style>