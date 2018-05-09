<template id="searchJournal">
  <div class="searchJournal" style="font-size: 14px;">
    <mt-field  label="客户名称" placeholder="请输入客户名称" v-model="customer" :attr="{maxlength: 100 }"> 
    </mt-field>
    <mt-field readonly label="省份" placeholder="请选择省份" v-model="province" @click.native='showProvince'>
    </mt-field>
    <mt-field readonly label="城市" placeholder="请选择城市" v-model="city" @click.native='showCity(provinceId)'>
    </mt-field>
    <mt-field readonly  label="区县" placeholder="请选择区县" v-model="area" @click.native='showArea(cityId)'>
    </mt-field>
    <mt-field readonly label="录入人" placeholder="请选择录入人" v-model="Lururen" @click.native='showLururen'> 
    </mt-field>
    <mt-field v-if="searchType=='salelog'?true:false" readonly label="销售客户类型" placeholder="请选择销售客户类型" v-model="customerType" @click.native='showCustomerType'>
    </mt-field>
    <mt-field v-else readonly label="市场客户类型" placeholder="请选择市场客户类型" v-model="marketCustomType" @click.native='showMarketCustomerTypePop=true'>
    </mt-field>
    <mt-field  v-if="searchType=='salelog'?true:false" readonly label="外贸管理顾问" placeholder="请选择外贸管理顾问" v-model="guWen" @click.native='showGuWen'>
    </mt-field>
    <mt-field v-else label="市场销售员" placeholder="请选择市场销售员" v-model="salesmanNames" @click.native='showSalesManPop=true' readonly>
    </mt-field>
    <mt-field label="拜访起始时间" placeholder="拜访起始时间" type="date" v-model="visitStart2" class="time-height">
    </mt-field>
    <mt-field label="拜访结束时间" placeholder="拜访结束时间" type="date" v-model="visitEnd2" class="time-height">
    </mt-field>
    <mt-field label="录入起始时间" placeholder="录入起始时间" type="date" v-model="inputStart" class="time-height">
    </mt-field>
    <mt-field label="录入结束时间" placeholder="录入结束时间" type="date" v-model="inputEnd" class="time-height">
    </mt-field>
    <mt-popup v-model="showProvincePop" position="bottom" style='width:100%'>
      <div class="title-pop"> 选择省份 </div>
      <mt-picker :slots="slotsProvince" ref="pickerProvince" @change="onValChangeProvince" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showProvincePop"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showCityPop" position="bottom" style='width:100%'>
      <div class="title-pop"> 选择城市 </div>
      <mt-picker :slots="slotsCity" ref="pickerCity" @change="onValChangeCity" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showCityPop"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showAreaPop" position="bottom" style='width:100%'>
      <div class="title-pop">选择区县</div>
      <mt-picker :slots="slotsArea" ref="pickerArea" @change="onValChangeArea" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showAreaPop"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showLururenPop" position="bottom" style='width:100%'>
      <div class="title-pop">选择录入人</div>
      <mt-picker :slots="slotsLururen" ref="pickerNewlevel" @change="onValChangeLururen" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showLururenPop"></mt-picker>
    </mt-popup>
    <!-- 客户类型 -->
    <mt-popup v-model="showCustomerTypePop" position="bottom" style='width:100%'>
      <div class="title-pop">销售客户类型</div>
      <mt-picker :slots="slotsCustomerType" ref="pickerCustomerType" @change="onValChangeCustomerType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showCustomerTypePop"></mt-picker>
    </mt-popup>
    <!-- 市场客户类型 -->
    <mt-popup v-model="showMarketCustomerTypePop" position="bottom" style='width:100%'>
      <div class="title-pop">市场客户类型</div>
      <mt-picker :slots="slotsMarketCustomerType" ref="slotsMarketCustomerType" @change="onValChangeMarketCustomerType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showMarketCustomerTypePop"></mt-picker>
    </mt-popup>
      <!-- 外贸管理顾问 -->
    <mt-popup v-model="showGuWenPop" position="bottom" style='width:100%'>
      <div class="title-pop">外贸管理顾问</div>
      <mt-picker :slots="slotsGuWen" ref="pickerGuWen" @change="onValChangeGuWen" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showGuWenPop"></mt-picker>
    </mt-popup>
    <!-- 市场销售员 -->
    <mt-popup v-model="showSalesManPop" position="bottom" style='width:100%'>
      <div class="title-pop">市场销售员</div>
      <mt-picker :slots="slotsSalesMan" ref="pickerSalesmanNames" @change="onValChangeSalesMan" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showSalesManPop"></mt-picker>
    </mt-popup>
    <!-- 客户类型 -->
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import axios from 'axios';
export default {
  data() {
    return {
      //------------------------------------------
      currenPage: 1,
      pageRows: 10,
      guWen: '',
      guWenId: '',
      slotsGuWen: [{
        flex: 1,
        values: [],
        className: 'slotsGuWen',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showGuWenPop: false,
      //------------------------------------------
      salesmanNames: '',         //市场销售员
      salesmanIds: '',
      slotsSalesMan: [{
        flex: 1,
        values: [],
        className: 'slotsSalesMan',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showSalesManPop: false,
      //-------------------------------------------------------
      customerType: '',
      customerTypeId: '',
      slotsCustomerType: [{
        flex: 1,
        values: [ ],
        className: 'slotsCustomerType',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showCustomerTypePop: false,
      //-------------------市场客户类型---------------
      marketCustomType: '',                   
      marketCustomTypeId: '',
      slotsMarketCustomerType: [{
        flex: 1,
        values: [],
        className: 'slotsCustomerType',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showMarketCustomerTypePop: false,
      // --------------------------
      Lururen: '',
      LururenId: '',
      slotsLururen: [{
        flex: 1,
        values: [],
        className: 'slotsLururen',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showLururenPop: false,
      // --------------------------
      area: '',
      areaId: '',
      //city--------------------------
      slotsArea: [{
        flex: 1,
        values: [],
        className: 'slotsArea',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showAreaPop: false,
      //city--------------------------
      city: '',
      cityId: '',
      slotsCity: [{
        flex: 1,
        values: [],
        className: 'slotsCity',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showCityPop: false,
      //----------------------------
      proCity: null,
      provinceId: '',
      province: '',
      //省
      slotsProvince: [{
        flex: 1,
        values: [],
        className: 'slotsProvince',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showProvincePop: false,
      //----------------------------
      inputEnd: '',
      inputStart: '',
      visitEnd2: '',
      visitStart2: '',
      workContent: '',
      //-----------------------
      username: '',
      visitContent: '',
      softStatus: '',
      customer: '',
      customerId: '',
      visitDate: '',
      selected: '1',
      selected2: '21',
      userInfo: '',
    }
  },
  props: {
    searchType: {
      type: String,
      default: ''
    },
    sendPost: {
      type: Number,
      default: 0
    },
  },
  created:function(){
    this.showPostName();
    // console.log("searchType=='salelog'",this.searchType=='salelog');
    let me = this;
    setTimeout(()=>{
      me.clearAll(); 
    },50);
  },
  watch: { 
    'searchType':function(n,o){
      // console.log("this.searchType",this.searchType);
      if(n != ''){
        this.getEmployeePagingListBySaleManage();
      }
    },
     sendPost: {
      handler: function(val, oldval) { 
        if (val!=oldval) {  
          this.showPostName();
          return
        }
      },
      deep: true
    },
  },
  mounted: function() {
    this.getCustomerType();
    this.getMarketCustomerType();
    
  },
  methods: {
    clearAll: function() { 
      this.customer = '';
      this.customerId = '';
      this.province = '';
      this.provinceId = '';
      this.city = '';
      this.cityId = '';
      this.area = '';
      this.areaId = '';
      // this.Lururen= '';
      // this.LururenId = "";
      this.customerType= '';
      this.customerTypeId= '';
      this.guWen= '';
      this.guWenId= '';
      this.visitStart2= '';
      this.visitEnd2= '';
      this.inputStart = '';
      this.inputEnd = '';   
      this.salesmanNames = ''; 
      this.salesmanIds = ''; 
      this.marketCustomType = "";
      this.marketCustomTypeId = "";
      this.customerType = "";
      this.customerTypeId = "";
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
    showPostName(){
      this.userInfo = JSON.parse(localStorage.userInfo);  
      this.Lururen=this.userInfo.employeeName;
      this.LururenId=this.userInfo.employeeId;
    },
    searchMarkerLog: function() {           //销售日志搜索条件
      var self = this;
      if(this.visitStart2 != '' && this.visitEnd2 == ''){
        MessageBox('提示', '请选择拜访结束日期！');
        return
      }else if(this.visitStart2 == '' && this.visitEnd2 != ''){
        MessageBox('提示', '请选择拜访开始日期！');
        return
      }else if (this.visitStart2 > this.visitEnd2) {
        MessageBox('提示', '拜访结束日期不能早于开始日期！');
        return
      }
      if(this.inputStart != '' && this.inputEnd == ''){
        MessageBox('提示', '请选择录入结束日期！');
        return
      }else if(this.inputStart == '' && this.inputEnd != ''){
        MessageBox('提示', '请选择录入开始日期！');
        return
      }else if (this.inputStart > this.inputEnd) {
        MessageBox('提示', '录入结束日期不能早于开始日期！');
        return
      }
      var param = {
        customName: this.customer,
        provinceId: this.provinceId,
        cityId: this.cityId,
        areaId: this.areaId,
        customType: this.customerTypeId,
        marketCustomType: this.marketCustomTypeId,
        saleManageId: this.guWenId,
        salesmanIds: this.salesmanIds,
        operatorId: this.LururenId,
        visitingStartTimeStr: this.visitStart2,
        visitingEndTimeStr: this.visitEnd2,
        startTimeStr: this.inputStart,
        endTimeStr: this.inputEnd,
        pagingRequired: true,
        currenPage: this.currenPage,
        pageRows: this.pageRows,
        searchType:this.searchType
      }
      this.$router.push({ path: 'searchJournalResult', query: param})
    },
    onValChangeSalesMan(picker, values){            //市场销售员选中
      if (values[0] == undefined) {
        return
      }
      this.salesmanNames = values[0].name;
      this.salesmanIds = values[0].id;
    },
    //--------------------------------------
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
    getEmployeePagingListBySaleManage(){            //获取员工
      let self = this;
      axios.post(self.html_url + self.Apilist.selectEmployeeList, {}).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox('提示', '暂无选项！');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsSalesMan[0].values.push({ id: listTemp[i].id, name: listTemp[i].name }); 
        }
      }).catch(function(e) {});
    },
    //-------------------------------------
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
    onValChangeMarketCustomerType(picker, values){
      if (values[0] == undefined) {
        return
      }
      this.marketCustomType = values[0].name;
      this.marketCustomTypeId = values[0].id;
    },
    //--------------------------------------------------
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
    //------------------------------------- 选择市
    onValChangeCity: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.city = values[0].name;
      this.cityId = values[0].id; 
      this.area = ''; 
      this.areaId = '';
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
    //------------------------------------- 选择省
    onValChangeProvince: function(picker, values) {
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
    //--------------------------------------
    onValChangeHigh: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.highlevel = values[0].name;
      this.highlevelId = values[0].id;  
    },
    showHigh: function() {
      var self = this;
      self.slotsHigh[0].values = [];
      axios.post(self.html_url + self.Apilist.selectHighestLevelList, {}).then(function(data) {

        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox('提示', '暂无选项！');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsHigh[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
        }
        self.showHighPop = true;
      }).catch(function(e) {});
    },
    //-------------------------------------
    showLururen: function() {
      var self = this;
      self.slotsLururen[0].values = [];
      axios.post(self.html_url + self.Apilist.selectEmployeeList, {}).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox('提示', '暂无选项！');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsLururen[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
        }
        self.showLururenPop = true;
        
      }).catch(function(e) {});
    },
    onValChangeLururen: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.Lururen = values[0].name;
      this.LururenId = values[0].id;
    },
  }
}
</script>
<style>
  .searchJournal .mint-field .mint-cell-title {width: 110px;-webkit-box-flex: 0;-ms-flex: none;flex: none;text-align: left!important;color: #2894e5!important;}
  .time-height .mint-field-core {background: #efefef;height: 25px;}
</style>