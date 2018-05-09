<template>
  <div class="pageBox addFeedBack">
    <mt-header title="新增市场反馈" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      <mt-button slot="right" @click.native="clearForm" style='margin-right:10px'>重置</mt-button>
      <mt-button slot="right" @click.native="save" :disabled="isSubmit?true:false">保存</mt-button>
    </mt-header>
    <div style="padding-top:39px;">
      <div class="fieldItem" style='width:80%'><span class="optionLabel">联系人</span>
        <mt-field label="客户名称" placeholder="客户名称" v-model="form.customerName" class="labelcss"></mt-field>
        <span class="required" style="position: absolute;top:3px;right:-4px; color:red">*</span>
        <mt-button type="primary" size="small" @click.native.stop="searchCustomer" style='position:absolute;top:6px;right:-60px;background:#5e67fc;'>查询</mt-button>
        <div style="clear:both"></div>
      </div>
      <div class="fieldItem">
        <mt-field label="系统中名称" placeholder="选择系统中客户匹配,不可直接输入" v-model="form.cname" class="labelcss" :readonly='isReadonly' disabled></mt-field>
      </div>
      <div class="fieldItem">
        <mt-field label="反馈日期" placeholder="反馈日期 " type='date' v-model="form.gmtCreate" class="labelcss time-height">
          <span class="required">*</span>
        </mt-field>
      </div>
      <div class="fieldItem">
        <mt-field label="客户主页" placeholder="请输入客户主页 " v-model="form.homepage" class="labelcss" :readonly='isReadonly'></mt-field>
      </div>
      <div class="fieldItem">
        <mt-field label="主营产品" placeholder="请输入主营产品 " v-model="form.mainProducts" class="labelcss" :readonly='isReadonly'></mt-field>
      </div>
      <mt-field class="labelcss" label="公司规模" placeholder="请选择公司规模" v-model="form.companySize" @click.native='showcompanySize'  readonly ></mt-field>
      <mt-field label="省份" class="labelcss" placeholder="请选择省份" v-model="form.province" @click.native='showProvince'   readonly></mt-field>
      <mt-field label="城市" class="labelcss" placeholder="请选择城市" v-model="form.city" @click.native='showCity(form.provinceId)'  readonly></mt-field>
      <mt-popup v-model="showProvincePop" position="bottom" style='width:100%'>
        <div class="title-pop"> 选择省份 </div>
        <mt-picker :slots="slotsProvince" ref="pickerProvince" @change="onValChangeProvince" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showProvincePop"></mt-picker>
      </mt-popup>
      <mt-popup v-model="showCityPop" position="bottom" style='width:100%'>
        <div class="title-pop">选择城市</div>
        <mt-picker :slots="slotsCity" ref="pickerCity" @change="onValChangeCity" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showCityPop"></mt-picker>
      </mt-popup>
      <mt-popup v-model="showcompanySizePop" position="bottom" style='width:100%'>
        <div class="title-pop">公司规模</div>
        <mt-picker :slots="slotscompanySize" ref="pickercompanySize" @change="onValChangecompanySize" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showcompanySizePop"></mt-picker>
      </mt-popup>
      <div style="height:5px; background:#efefef"></div>
      <div class="fieldItem">
        <mt-field label="联系人" placeholder="请输入联系人" v-model="form.contactName" class="labelcss" :attr="{ maxlength: 10 }">
        <span class="required">*</span>
      </mt-field>
      </div>
      <div class="fieldItem">
        <mt-field label="职务" placeholder="请输入职务" v-model="form.contactPost" class="labelcss" :attr="{ maxlength: 10 }"></mt-field>
      </div>
      <div class="fieldItem">
        <mt-field label="手机" placeholder="请输入手机 " v-model="form.contactPhone" class="labelcss" :attr="{ maxlength: 11 }"></mt-field>
      </div>
      <div class="fieldItem">
        <mt-field label="邮箱" placeholder="请输入邮箱 " v-model="form.contactEmail" class="labelcss" :attr="{ maxlength: 100 }"></mt-field>
      </div>
      <div style="height:5px; background:#efefef"></div>
      <div class="fieldItem">
        <mt-field class="labelcss" label="反馈类型" placeholder="请选择" v-model="form.feedbackType" @click.native='showfeedbackType' readonly></mt-field> 
        <span class="required" style="position: absolute;top:2px;right:-2px; color:red">*</span>
        <div style="clear:both"></div>
      </div>
      <mt-popup v-model="showfeedbackTypePop" position="bottom" style='width:100%'>
        <div class="title-pop">反馈类型</div>
        <mt-picker :slots="slotsfeedbackType" ref="pickerfeedbackType" @change="onValChangefeedbackType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showfeedbackTypePop"></mt-picker>
      </mt-popup>
      <div class="fieldItem">
        <mt-field class="labelcss" label="了解途径" placeholder="请选择" v-model="form.understandWay" @click.native='showunderstandWay' readonly></mt-field>
      </div>
      <mt-popup v-model="showunderstandWayPop" position="bottom" style='width:100%'>
        <div class="title-pop">了解途径</div>
        <mt-picker :slots="slotsunderstandWay" ref="pickerunderstandWay" @change="onValChangeunderstandWay" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showunderstandWayPop"></mt-picker>
      </mt-popup>
      <div style="clear:both"></div>
      <div style=" ">
        <mt-field label="反馈内容" placeholder="为保证短信及时发送反馈内容，请保持在60个字符以内" type="textarea" rows="5" v-model="form.feedbackContent" class="labelcss">
          <span class="required">*</span>
        </mt-field>
      </div>
      <div class="fieldItem">
        <mt-field class="labelcss" label="市场销售员" placeholder="请选择市场销售员" v-model="form.salesman" @click.native='showsalesman' readonly>
          <span class="required">*</span>
        </mt-field>
        <div style="clear:both"></div>
      </div>
      <mt-popup v-model="showsalesmanPop" position="bottom" style='width:100%'>
        <div class="title-pop">市场销售员</div>
        <mt-picker :slots="slotssalesman" ref="pickersalesman" @change="onValChangesalesman" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showsalesmanPop"></mt-picker>
      </mt-popup>
      <div class="Guwen" v-if='isManager'>
        <div class="fieldItem">
          <mt-field label="外贸管理顾问" class="labelcss" placeholder="请选择外贸管理顾问" v-model="form.saleManage" @click.native='showsaleManage' readonly></mt-field>
          <div style="clear:both"></div>
        </div>
        <mt-popup v-model="showsaleManagePop" position="bottom" style='width:100%'>
          <div class="title-pop">外贸管理顾问</div>
          <mt-picker :slots="slotssaleManage" ref="pickersaleManage" @change="onValChangesaleManage" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showsaleManagePop"></mt-picker>
        </mt-popup>
        <div class="fieldItem">
          <mt-field label="顾问手机号" placeholder="顾问手机号码" v-model="form.saleManagePhone" class="labelcss" readonly></mt-field>
        </div>
        <div class="fieldItem">
          <mt-field label="顾问办事处" placeholder="顾问办事处" v-model="form.saleManageOffice" class="labelcss" readonly></mt-field>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import axios from 'axios';
import { Toast } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {
      isSubmit:false,           //提交按钮是否可用
      isReadonly: true,
      isManager: false,         //是否显示顾问字段
      form: {
        customerName: '',       //客户名称
        cname: '',              //
        gmtCreate:'',           //
        homepage:'',            //
        province:'',            //
        city:"",                //
        provinceId:'',          //
        cityId:"",              //
        companySize:'',         //
        companySizeId:'',       //
        mainProducts:'',        //
        contactName: "",        //
        contactPost: '',        //
        contactPhone: "",       // 联系人
        contactEmail: '',       // 联系人 
        feedbackContent:'',     //
        contactPhone:'',        //
        contactEmail:'',        //
        feedbackType:'',        //
        understandWay:'',       //
        feedbackTypeId:'',      //
        understandWayId:'',     //
        salesman:'',            //市场销售员
        salesmanId:'',          //市场销售员id
        saleManage:"",          //顾问
        saleManageId:"",        //顾问id
        saleManagePhone:'',     //
        saleManageOfficeId:'',  //
        saleManageOffice:'',    //
        customType:'',          //客户类型
        customId:'',            //客户id
        operatorId:'',          //
        operatorName:''         //
      },
      //-----------------------------------  
      slotssaleManage: [{
        flex: 1,
        values: [],
        className: 'slotssaleManage',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showsaleManagePop: false, //外贸管理顾问选择
      //----------------------------------- 
      slotssalesman: [{
        flex: 1,
        values: [],
        className: 'slotssalesman',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showsalesmanPop: false,   //市场销售员选择
      //----------------------------------- 
      slotsunderstandWay: [{
        flex: 1,
        values: [ //               
        ],
        className: 'slotsunderstandWay',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showunderstandWayPop: false,
      //----------------------------------- 
      slotsfeedbackType: [{
        flex: 1,
        values: [ //               
        ],
        className: 'slotsfeedbackType',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showfeedbackTypePop: false,
      //----------------------------------- 
      slotscompanySize: [{
        flex: 1,
        values: [ //               
        ],
        className: 'slotscompanySize',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showcompanySizePop: false,
      //-----------------------------------公司规模
      slotscompanySize: [{
        flex: 1,
        values: [ //公司人数   
          {
            id: '1',
            name: '1-20'
          },                
          {
            id: '2',
            name: '21-50'
          }, {
            id: '3',
            name: '51-100'
          }, {
            id: '4',
            name: '101-200'
          }, {
            id: '5',
            name: '201-500'
          }, {
            id: '6',
            name: '501-1000'
          }, {
            id: '7',
            name: '1001及以上'
          },
        ],
        className: 'slotscompanySize',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showcompanySizePop: false,
      slotsCity: [{
        flex: 1,
        values: [],
        className: 'slotsCity',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showCityPop: false,
      //省
      slotsProvince: [{
        flex: 1,
        values: [],
        className: 'slotsProvince',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showProvincePop: false,
    }
  },
  mounted: function() {
    this.getSalesman();
    this.form.gmtCreate = this.timer(new Date());  
  },
  computed: {

  },
  watch:{
    'form.gmtCreate':function(n,o){
      if(n < '2002-01-01 00:00:00'){
        MessageBox('提示', '反馈日期不能小于‘2002-01-01 ’！');
        return
      }
    }
  },
  methods: {
    timer(type) {                           //时间转换
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
    fChkMail(szMail) { //邮件格式验证
      var szReg = /^(\w-*\.*\+*)+@(\w-?)+(\.\w{2,})+$/;
      var bChk = szReg.test(szMail);
      return bChk
    },
    validateForm: function() { //表单验证
      if (this.form.customerName == '' || this.form.customerName == undefined) {
        MessageBox('提示', '客户名称不能为空！');
        return false
      }
      if (this.form.gmtCreate == undefined||this.form.gmtCreate=='') {
        MessageBox('提示', '请输入反馈日期！');
        return false
      } else if(this.form.gmtCreate < '2002-01-01 00:00:00'){
        MessageBox('提示', '反馈日期不能小于‘2002-01-01 ’！');
        return
      }else {
        var starttime = String(this.form.gmtCreate);
        starttime =  starttime.replace(new RegExp("-", "gm"), "/");
        var starttimeHaoMiao = (new Date(starttime)).getTime(); //得到毫秒数
        var now = (new Date()).getTime()
        if (starttimeHaoMiao > now) {
          MessageBox('提示', '反馈日期不能超过当前日期！');
          return false
        }
      }
      if (this.form.contactName == '') {
        MessageBox('提示', '请输入联系人！');
        return false
      }
      if (this.form.feedbackType == '') {
        MessageBox('提示', '请选择反馈类型！');
        return false
      }
      if (this.form.feedbackContent == '') {
        MessageBox('提示', '请输入反馈内容！');
        return false
      }
      if (this.form.feedbackContent.length < 10 || this.form.feedbackContent.length > 60) {
        MessageBox('提示', '请保持反馈内容10-60字符！');
        return false
      }
      if (this.form.contactPhone != '') { 
        if (!/^(?:13\d|15\d|18\d|17\d)\d{5}(\d{3}|\*{3})$/g.test(this.form.contactPhone)) {
          MessageBox('提示', '请正确填写手机号！');
          return false
        }
      }
      if (this.form.contactEmail != '') {
        if (!this.fChkMail(this.form.contactEmail)) {
          MessageBox('提示', '请填写正确的邮箱');
          return false
        }
      } 
      if (this.form.salesman == '') {
        MessageBox('提示', '请选择市场销售员');
        return false
      } 
      return true
    },
    save: function() { //保存 市场反馈
      var self = this;
      if (!this.validateForm()) {
        return
      }
      // 获取参数 para
      var param = {
        customName:this.form.customerName,//必填
        gmtCreate:this.form.gmtCreate+" 00:00:00",//必填
        cname:this.form.cname,
        homepage:this.form.homepage,
        provinces:this.form.provinceId,
        city:this.form.cityId, 
        companySize:this.form.companySizeId,
        mainProducts:this.form.mainProducts,
        contactName:this.form.contactName, //必填
        contactPost:this.form.contactPost,
        contactPhone:this.form.contactPhone,
        contactEmail:this.form.contactEmail,
        feedbackType:this.form.feedbackTypeId,//必填
        understandWay:this.form.understandWayId,
        feedbackContent:this.form.feedbackContent,//必填
        saleManageId:this.form.saleManageId,             //顾问id
        saleManagePhone:this.form.saleManagePhone,
        saleManageOfficeId:this.form.saleManageOfficeId,
        salesmanId: this.form.salesmanId,               //市场销售员id  必填 
        customType: this.form.customType,//必填
        customId: this.form.customId,//必填
        marketCustomType: this.form.marketCustomType,//必填
        operatorId: this.form.salesmanId,// 操作人
        operatorName: this.form.salesman,
      };
      self.isSubmit = true; 
      // 请求ajax 接口 
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
      axios.post(self.html_url + self.Apilist.insertFeedback, param).then(function(data) {
        Indicator.close();
        MessageBox('提示', '保存成功');
        self.clearForm();
        self.isSubmit = false; 
      }).catch(function(e) {
        Indicator.close();
        self.isSubmit = false; 
      });
      // 提示成功
    },
    clearForm: function() {
      this.isReadonly = false;
      this.form = {}; 
      this.form.provinceId = '';
      this.slotsCity[0].values = [];
      this.form.customerName='';
      this.form.cname='';
      this.form.homepage='';
      this.form.province='';
      this.form.city='';
      this.form.provinceId='';
      this.form.cityId='';
      this.form.companySize='';
      this.form.companySizeId='';
      this.form.mainProducts='';
      this.form.contactName='';
      this.form.contactPost='';
      this.form.contactPhone='';
      this.form.contactEmail='';
      this.form.feedbackContent='';
      this.form.feedbackType='';
      this.form.understandWay='';
      this.form.feedbackTypeId='';
      this.form.understandWayId='';
      this.form.salesman='';
      this.form.salesmanId='';
      this.form.saleManage='';
      this.form.saleManageId='';
      this.form.saleManagePhone='';
      this.form.saleManageOfficeId='';
      this.form.saleManageOffice='';
      this.form.customType='';
      this.form.customId='';
      this.form.operatorId='';
      this.form.operatorName='';
    },
    searchCustomer: function() {
      this.$router.push({path: '/searchMarketCustomer',query: {customerName: this.form.customerName,type:'1'}});
    },
    companySizefn: function(value) {
      var status = '';
      switch (value) {
        case 0:
          status = "未填写";
          break;
        case 1:
          status = "1-20";
          break;
        case 2:
          status = "21-50";
          break;
        case 3:
          status = "51-100";
          break;
        case 4:
          status = "101-200";
          break;
        case 5:
          status = "201-500";
          break;
        case 6:
          status = "501-1000";
          break;
        case 7:
          status = "1001以上";
          break;
      }
      return status
    },
    getSalesman: function() {
      if (this.$route.query.backId) {
        return
      }
      var self = this;
      if (localStorage.userInfo) {
        var userInfo = JSON.parse(localStorage.userInfo);
        self.form.salesman = userInfo.employeeName;
        self.form.salesmanId = userInfo.employeeId;
        if (userInfo.postType == 3) { //是管理者 则显示 外贸管理顾问
          self.isManager = true;
        }
      }
      if (self.$route.query.customerName != '' || self.$route.query.customerName != undefined) {
        self.form.customerName = self.$route.query.customerName
      }
      if (self.$route.query.customerId != '' && self.$route.query.customerId != undefined) { //根据ID 导入客户信息
        var self = this;
        axios.post(self.html_url + self.Apilist.importCustomAndLogList, { id: self.$route.query.customerId }).then(function(data) {
          var listTemp = data.data.data; 
          self.form.marketCustomType = listTemp.marketCustomType;
          self.form.cname = listTemp.cName;
          self.form.homepage = listTemp.homepage;
          self.form.mainProducts = listTemp.mainProductsName;
          self.form.companySize = self.companySizefn(listTemp.companySize);
          self.form.companySizeId = listTemp.companySize;
          self.form.provinceId = listTemp.provinces;
          self.form.cityId = listTemp.city;
          self.form.customType = listTemp.customType;//客户类型
          self.form.customId = listTemp.id;//客户类型
          //省
          self.isReadonly = false;
          axios.post(self.html_url + self.Apilist.selectProvinceList, {}).then(function(data) {
            var listTemp1 = data.data.data;
            for (var i = 0; i < listTemp1.length; i++) {
              if (listTemp1[i].id == self.form.provinceId) {
                self.form.province = listTemp1[i].name;
                //市
                axios.post(self.html_url + self.Apilist.selectCityList, { pId: listTemp1[i].id }).then(function(data) {
                  var listTemp2 = data.data.data;
                  for (var i = 0; i < listTemp2.length; i++) {
                    if (listTemp2[i].id == self.form.cityId) {
                      self.form.city = listTemp2[i].name;
                      //区
                      axios.post(self.html_url + self.Apilist.selectAreaList, { cId: listTemp2[i].id }).then(function(data) {
                        var listTemp3 = data.data.data;
                        for (var i = 0; i < listTemp3.length; i++) {

                          if (listTemp3[i].id == self.form.areaId) {
                            self.form.area = listTemp3[i].name;
                          }
                        }
                        self.isReadonly = true;
                      }).catch(function(e) {});
                      break;
                    }
                  }
                }).catch(function(e) {});
                break;
              }
            }
          }).catch(function(e) {});
        }).catch(function(e) {});
      } else {
        self.isReadonly = false;
      } 
    },
    //-------------------------------------    销售顾问 
    onValChangesaleManage: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.form.saleManage = values[0].name;
      this.form.saleManageId = values[0].id;
      var self = this;
      axios.post(self.html_url + self.Apilist.detailEmployee, { id: values[0].id }).then(function(data) {
        var listTemp = data.data.data;
        self.form.saleManageOffice = listTemp.officeName;
        self.form.saleManageOfficeId = listTemp.officeId;
        self.form.saleManagePhone = listTemp.telephone;
      }).catch(function(e) {});
    },
    showsaleManage: function() {
      var self = this;
      self.slotssaleManage[0].values = [];
      axios.post(self.html_url + self.Apilist.selectEmployeeList, {}).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox('提示', '暂无选项！');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotssaleManage[0].values.push({ id: listTemp[i].id, name: listTemp[i].name+'('+ listTemp[i].postName+')' });
        }
        self.showsaleManagePop = true;
      }).catch(function(e) {});
    },
    //-------------------------------------    市场销售员 
    onValChangesalesman: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.form.salesman = values[0].name;
      this.form.salesmanId = values[0].id
    },
    showsalesman: function() {
      var self = this;
      self.slotssalesman[0].values = [];
      axios.post(self.html_url + self.Apilist.selectEmployeeList, {}).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox('提示', '暂无选项！');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotssalesman[0].values.push({ id: listTemp[i].id, name: listTemp[i].name+'('+ listTemp[i].postName+')'});
        }
        self.showsalesmanPop = true;
      }).catch(function(e) {});
    },
    //-------------------------------------    了解途径 
    onValChangeunderstandWay: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.form.understandWay = values[0].name;
      this.form.understandWayId = values[0].id
    },
    showunderstandWay: function() {
      var self = this;
      //了解途径
      self.slotsunderstandWay[0].values = [];
      axios.post(self.html_url + self.Apilist.selectUnderstandWayList, {}).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox('提示', '暂无选项！');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsunderstandWay[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
        }
        self.showunderstandWayPop = true;
      }).catch(function(e) {});
    },
    onValChangefeedbackType: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.form.feedbackType = values[0].name;
      this.form.feedbackTypeId = values[0].id
    },
    showfeedbackType: function() {
      var self = this;
      //了解途径
      self.slotsfeedbackType[0].values = [];
      axios.post(self.html_url + self.Apilist.selectFeedbackTypeList, {}).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox('提示', '暂无选项！');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsfeedbackType[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
        }
        self.showfeedbackTypePop = true;
      }).catch(function(e) {});
    },
    onValChangecompanySize: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.form.companySize = values[0].name;
      this.form.companySizeId = values[0].id
    },
    showcompanySize: function() {
      this.showcompanySizePop = true;
    },
    onValChangeCity: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.form.city = values[0].name;
      this.form.cityId = values[0].id 
    },
    showCity: function(provinceId) {
      if (this.isReadonly) {
        return
      }
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
      this.form.province = values[0].name;
      this.form.provinceId = values[0].id;
    },

    showProvince: function() {
      if (this.isReadonly) {
        return
      }
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
      this.$router.push({
        path: '/saleJournal',
        query: {
          tabType: '6',
        }
      });
    },
  },
}
</script>
<style scoped>
  .required {display: inline-block;line-height: 52px;height: 46px;color: red;}
  .fieldItem {
    min-height: 40px;
    width: 97%;
    clear: both;
    position: relative;
  }
  .optionLabel {
    height: 40px;
    color: #2894e5;
    font-size: 16px;
    width: 20%;
    line-height: 40px;
    position: absolute;
    left: 0;
    top: 0;
  }
</style>
<style>
  .labelcss {text-align: left;color: #5e67fc}
  .page-part {text-align: left;line-height: 35px;font-size: 18px;}
  .addFeedBack .mint-field .mint-cell-title {width: 100px;}
</style>