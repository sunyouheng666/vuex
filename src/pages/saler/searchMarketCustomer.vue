<template>
  <div class="pageBox mar-custom">
    <mt-header title="搜索客户导入" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div style='padding-top:39px'> 
      <mt-field label="客户名称" placeholder="客户名称 " v-model="customerName"  class="labelcss"></mt-field>
      <mt-field class="labelcss" label="销售客户类型" placeholder="请选择销售客户类型" v-model="customType" @click.native="showCustomerType" readonly>
      </mt-field>
      <mt-popup v-model="showCustomerTypePop" position="bottom" style='width:100%'>
        <div class="title-pop">销售客户类型</div>
        <mt-picker :slots="slotsCustomerType" ref="pickerCustomerType" @change="onValChangeCustomerType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showCustomerTypePop"></mt-picker>
      </mt-popup>
      <mt-field  class="labelcss" label="市场客户类型" placeholder="请选择市场客户类型" v-model="marketCustomType" @click.native="showmarketCustomType" readonly>
      </mt-field>
      <mt-popup v-model="showmarketCustomTypePop" position="bottom" style='width:100%'>
        <div class="title-pop">市场客户类型</div>
        <mt-picker :slots="slotsmarketCustomType" ref="pickermarketCustomType" @change="onValChangemarketCustomType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showmarketCustomTypePop"></mt-picker>
      </mt-popup>
      <mt-field label="省份"  class="labelcss" placeholder="请选择省份" v-model="province" @click.native='showProvince' readonly>
      </mt-field>
      <mt-field label="城市"   class="labelcss" placeholder="请选择城市" v-model="city" @click.native='showCity(provinceId)' readonly>
      </mt-field>
      <mt-field label="区县"  class="labelcss" placeholder="请选择区县" v-model="area" @click.native='showArea(cityId)' readonly>
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
      <mt-button type="primary" style="background:#5e67fc;width:100px;" size="small" @click.native='clearSearch'>
        清空
      </mt-button>
      <mt-button type="primary" style="background:#5e67fc;width:100px;" size="small" @click.native='searchCustomerHangye(isfirst)'>
        查询
      </mt-button>
      <div class="searchList">
        <div style="padding-top:8px; padding-left:4px;background:#5e67fc; height:30px;margin-top:10px; line-height30px; text-align:center;color:#fff;" v-if="showSearchCustomer">查询结果</div>
        <div class="searchList">
          <ul class='shou-list' v-infinite-scroll="loadMoreHangye" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
            <li v-for="item in customerList">
              <div class="line"></div>
              <div class="companyName"> {{item.cName}}</div>
              <div class="companyAdd"> 
                <span class="labelcss">地址：</span>
                {{item.fullAdress}}</div>
              <div class="companyType"> 
                <span class="labelcss">外贸管理顾问：</span>
                {{item.saleManageName}}</div>
              <div class="companyType">
                <span class="labelcss">市场销售员：</span> 
                {{item.salesmanName}}
              </div>
              <div class="companyType">
                <span class="labelcss">销售客户类型：</span> 
                {{item.customTypeName}}
              </div>
              <div class="clear"></div>
              <mt-button style="float:right; margin-top:-35px; background:#5e67fc;" type="primary" size="small" @click.native='daoru(item.id)'>导入</mt-button>
            </li>
            <div style="margin:0 auto;width:60px" v-show='loading'>
              <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto"></mt-spinner>
            </div>
            <div style="padding:20px; text-align:center; color:gray " v-show='loadAll'>
              全部加载完毕
            </div>
            <div style="padding:20px; text-align:center; color:gray" v-show='noData1'>
              查询暂无数据！
            </div>
          </ul>
        </div>
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
      isfirst: true,
      showSearchCustomer: false,
      customerName: this.$route.query.customerName,
      //---------------------------外贸客户类型
      marketCustomType: '',
      marketCustomTypeId: '',
      slotsmarketCustomType: [{
        flex: 1,
        values: [],
        className: 'slotsmarketCustomType',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showmarketCustomTypePop: false,
      //---------------------------市场客户类型 
      customType: '',
      customTypeId: '',
      slotsCustomerType: [{
        flex: 1,
        values: [],
        className: 'slotsCustomerType',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showCustomerTypePop: false,
      // --------------------------省市区
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
      // --------------------------
      noData1: false,
      customerList: [],
      currentPage: 1,
      totalPage: 1,
      loading: false,
      loadAll: false,
      showMohu: false,
      doSearch: false,
    }
  },
  mounted: function() {
  },
  methods: {
    daoru: function(id) { // 导入
      var self = this;
      var goAddress = '/addFeedBack';
      if (self.$route.query.daoRuType != undefined) {
        goAddress = '/' + self.$route.query.daoRuType;
      }
      self.$router.push({
        path: goAddress,
        query: {
          customerId: id,
          customerName: self.customerName,
          id: self.$route.query.beforeId
        }
      });
    },  
    clearSearch(){                  //清空查询
      this.customerList = [];
      this.currentPage = 1;
      this.totalPage = 1;
      this.loadAll = false;
      this.customType = '';
      this.customTypeId = '';
      this.customerName = '';
      this.marketCustomType = '';
      this.marketCustomTypeId = '';
      this.provinceId = '';
      this.province = '';
      this.city = '';
      this.cityId = '';
      this.area = '';
      this.areaId = '';
      this.showSearchCustomer = false;
    },
    searchCustomerHangye: function(isfirst) {
      var self = this;
      if (isfirst) {
        self.customerList = [];
        self.currentPage = 1;
        self.totalPage = 1;
        self.loadAll = false;
      }
      self.loadMoreHangye()
    },
    loadMoreHangye: function() { //  -------------------------------------------------- 
      var self = this; 
      var param = {
        name:self.customerName,
        customType:self.customTypeId,
        marketCustomType:self.marketCustomTypeId,
        provinces:self.provinceId,
        city:self.cityId,
        area:self.areaId, 
        pagingRequired: true,
        pageRows: 10,
        currenPage: self.currentPage
      };
      if (self.currentPage > self.totalPage) {
        return;
      }
      self.loading = true;
      axios.post(self.html_url + self.Apilist.selectCustomListByFeedback, param).then(function(data) {
        if (data.data.totalPage == 0 || data.data.totalPage == null) {
          self.noData1 = true;
        }
        self.customerList = self.customerList.concat(data.data.data);
        self.loading = false;
        if (self.customerList.length == 0) {
          return
        }
        self.noData1 = false;
        self.totalPage = data.data.totalPage;
        if (self.currentPage == data.data.totalPage) {
          self.loadAll = true;
        }
        self.currentPage = self.currentPage + 1;
        self.showSearchCustomer = true;
      }).catch(function(e) {self.loading = false;});
    },
    //------------------------------------------------------市场客户类型
    onValChangeCustomerType: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.customType = values[0].name;
      this.customTypeId = values[0].id;
      this.customerList = []
    },
    showCustomerType: function() {       //销售客户类型
      var self = this;
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
        self.showCustomerTypePop = true;
      }).catch(function(e) {});
    },
    //-------------------------------------------------------//市场客户类型
    onValChangemarketCustomType: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.marketCustomType = values[0].name;
      this.marketCustomTypeId = values[0].id;
      this.customerList = []
    },  
    showmarketCustomType: function() {                      //市场客户类型
      var self = this;
      self.slotsmarketCustomType[0].values = [];
      axios.post(self.html_url + self.Apilist.selectCustomTypeList, { type: '2' }).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox('提示', '暂无选项！');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsmarketCustomType[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
        }
        self.showmarketCustomTypePop = true;
      }).catch(function(e) {});
    },
    goDetail(obj) {
      if (obj.isVisible == 0) {
        MessageBox('提示', '没有访问权限！');
        return false;
      } else {
        this.$router.push({ path: '/customerDetail', query: { 'customerId': obj.id, 'type': '2' } });
      }
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
    //------------------------------------- 选择市
    onValChangeCity: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.city = values[0].name;
      this.cityId = values[0].id;
      this.area = '';
      this.areaId = ''
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
      this.areaId = ''
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
    back: function() {
      if(this.$route.query.type == '1'){
        this.$router.push({path: 'addFeedBack',query: {backId: true, }});
      }else{
        this.$router.go(-1);
      }
    }
  }
}
</script>
<style scoped>
  .mint-checklist .mint-cell {padding: 0;width: 50%!important;float: left;text-align: left;}
</style>
<style>
  .mar-custom .mint-field .mint-cell-title{width: 100px!important;text-align: left;}
</style>
