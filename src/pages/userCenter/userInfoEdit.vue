<template>
  <div class="pageBox">
    <mt-header title="个人中心" fixed>
      <mt-button icon="back" slot="left" @click.native="goback">返回</mt-button>
      <mt-button slot="right" @click.native="save">保存</mt-button>
    </mt-header>
    <div style="padding-top:39px;">
      <div class="workinfo">
        <h4>员工基本信息：</h4>
        <div class="header">
          <img :src="headerImg" @click="sheetVisible=true" width="90%" height="90%" style="vertical-align:middle;margin:5%">
        </div>
        <div style="float:right;width:60%;">
          <div class="item_prop_line">
            <label style="min-width:40px">姓名：</label>
            <span >{{userInfo.name}}</span>
          </div>
          <div class="item_prop_line">
            <label style="min-width:40px">姓别：</label>
            <span>{{userInfo.sex|getsex}}</span>
          </div>
          <div class="item_prop_line">
            <label style="min-width:40px">生日:</label>
            <span>{{userInfo.birthday  |TimeCut}}</span>
          </div>
        </div>
        <div style="clear:both"></div>
        <mt-field label="籍贯：" placeholder="籍贯" v-model="userInfo.nativePlace"  :attr="{ maxlength: 10 }"></mt-field>
        <mt-field label="民族：" placeholder="民族" v-model="userInfo.nation"  :attr="{ maxlength: 10 }"></mt-field>
        <mt-field label="婚姻：" placeholder="婚姻" v-model="userInfo.maritalStatus" @click.native='showMarryType' readonly></mt-field>
        <!-- 婚姻类型 -->
        <mt-popup v-model="showMarryTypePop" position="bottom" style='width:100%'>
          <div class="title-pop">婚姻</div>
          <mt-picker :slots="slotsMarryType" ref="pickerMarryType" @change="onValChangeMarryType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showMarryType"></mt-picker>
        </mt-popup>
        <mt-field label="政治面貌：" placeholder="政治面貌" v-model="userInfo.politicalStatus" @click.native='showPoliticalType' readonly></mt-field>
        <!-- 政治面貌 -->
        <mt-popup v-model="showPoliticalTypePop" position="bottom" style='width:100%'>
          <div class="title-pop">政治面貌</div>
          <mt-picker :slots="slotsPoliticalType" ref="pickerPoliticalType" @change="onValChangePoliticalType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showPoliticalType"></mt-picker>
        </mt-popup>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="userInfo.telephone"  :attr="{ maxlength: 11 }"></mt-field>
        <mt-field label="邮箱" placeholder="请输入邮箱" type="email" v-model="userInfo.email"  :attr="{ maxlength: 100 }"></mt-field>
        <mt-field label="微信昵称：" placeholder="请输入昵称" v-model="userInfo.nickname" readonly></mt-field>
        <div class="item_prop_line">
          <label>微信头像:</label>
          <span>
            <img :src="userInfo.headimgurl" width="30" height="30" style="padding-top: 5px;" />
          </span>
        </div>
        <mt-field label="毕业院校：" placeholder="请输入毕业院校" :attr="{ maxlength: 50 }" v-model="userInfo.graduatedSchool"></mt-field>
        <mt-field label="专业：" placeholder="请输入专业" v-model="userInfo.major"  :attr="{ maxlength: 50 }"></mt-field>
        <mt-field label="学历学位：" placeholder="请输入学历学位" v-model="userInfo.degree"  @click.native='degreePop=true'  readonly></mt-field>
        <!-- 学历学位 -->
        <mt-popup v-model="degreePop" position="bottom" style='width:100%'>
          <div class="title-pop">
            学历学位 
            <mt-button @click.native="userInfo.degree=''" style="padding:0;float: right;margin-right: 6px;font-size: 14px;height:26px;margin-top: 6px;">
              清除
            </mt-button>
          </div>
          <mt-picker :slots="degreeArr" ref="degreeArr" @change="onValChangeDegreeArr" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50'></mt-picker>
        </mt-popup>
        <mt-field label="地址：" placeholder="请输入地址" v-model="userInfo.address"  :attr="{ maxlength: 200 }"></mt-field>
        <mt-field label="身份证号：" placeholder="请输入身份证号" v-model="userInfo.idNumber" readonly></mt-field>
        <div class="cardImg">
          <img :src="userInfo.idNumberImage1Url" width="30%" height="30%" style="vertical-align:middle;">
          <img :src="userInfo.idNumberImage2Url" width="30%" height="30%" style="vertical-align:middle;">
          <img :src="userInfo.idNumberImage3Url" width="30%" height="30%" style="vertical-align:middle;">
        </div>
        <h4>教育背景：</h4>
        <div class="education">
          <mt-field label="起始时间" placeholder="起始时间" type="date" v-model="userInfo.eduList[0].startDate" class="time-height">
          </mt-field>
          <mt-field label="终止时间" placeholder="终止时间" type="date" v-model="userInfo.eduList[0].endDate" class="time-height">
          </mt-field>
          <mt-field label="学校名称" placeholder="学校名称" v-model="userInfo.eduList[0].graduatedSchool"  :attr="{ maxlength: 50 }">
          </mt-field>
          <mt-field label="专业名称" placeholder="专业名称" v-model="userInfo.eduList[0].major"  :attr="{ maxlength: 50 }"></mt-field>
          <mt-field label="学历学位" placeholder="学历学位" v-model="userInfo.eduList[0].degree" @click.native='degreePopZ=true'  readonly></mt-field>
          <mt-popup v-model="degreePopZ" position="bottom" style='width:100%'>
            <div class="title-pop">
              学历学位
              <mt-button @click.native="userInfo.eduList[0].degree=''" style="padding:0;float: right;margin-right: 6px;font-size: 14px;height:26px;margin-top: 6px;">
                清除
              </mt-button>
            </div>
            <mt-picker :slots="degreeArr" ref="degreeArr" @change="onValChangeDegreeArrZ" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50'></mt-picker>
          </mt-popup>
        </div>
        <div class="education">
          <mt-field label="起始时间" placeholder="起始时间" type="date" v-model="userInfo.eduList[1].startDate" class="time-height">
          </mt-field>
          <mt-field label="终止时间" placeholder="终止时间" type="date" v-model="userInfo.eduList[1].endDate" class="time-height">
          </mt-field>
          <mt-field label="学校名称" placeholder="学校名称" v-model="userInfo.eduList[1].graduatedSchool"  :attr="{ maxlength: 50 }">
          </mt-field>
          <mt-field label="专业名称" placeholder="专业名称" v-model="userInfo.eduList[1].major"  :attr="{ maxlength: 50 }"></mt-field>
          <mt-field label="学历学位" placeholder="学历学位" v-model="userInfo.eduList[1].degree" @click.native='degreePopO=true'  readonly></mt-field>
          <mt-popup v-model="degreePopO" position="bottom" style='width:100%'>
            <div class="title-pop">
              学历学位
              <mt-button @click.native="userInfo.eduList[1].degree=''" style="padding:0;float: right;margin-right: 6px;font-size: 14px;height:26px;margin-top: 6px;">
                清除
              </mt-button>
            </div>
            <mt-picker :slots="degreeArr" ref="degreeArr" @change="onValChangeDegreeArrO" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50'></mt-picker>
          </mt-popup>
        </div>
        <div class="education">
          <mt-field label="起始时间" placeholder="起始时间" type="date" v-model="userInfo.eduList[2].startDate" class="time-height">
          </mt-field>
          <mt-field label="终止时间" placeholder="终止时间" type="date" v-model="userInfo.eduList[2].endDate" class="time-height">
          </mt-field>
          <mt-field label="学校名称" placeholder="学校名称" v-model="userInfo.eduList[2].graduatedSchool"  :attr="{ maxlength: 50 }">
          </mt-field>
          <mt-field label="专业名称" placeholder="专业名称" v-model="userInfo.eduList[2].major"  :attr="{ maxlength: 50 }"></mt-field>
          <mt-field label="学历学位" placeholder="学历学位" v-model="userInfo.eduList[2].degree" @click.native='degreePopT=true'  readonly></mt-field>
          <mt-popup v-model="degreePopT" position="bottom" style='width:100%'>
            <div class="title-pop">
              学历学位
              <mt-button @click.native="userInfo.eduList[2].degree=''" style="padding:0;float: right;margin-right: 6px;font-size: 14px;height:26px;margin-top: 6px;">
                清除
              </mt-button>
            </div>
            <mt-picker :slots="degreeArr" ref="degreeArr" @change="onValChangeDegreeArrT" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50'></mt-picker>
          </mt-popup>
        </div>
        <div style="clear:both"></div>
        <h4>工作经历：（从最近一份工作起）</h4>
        <div class="education" v-for="itemWork in userInfo.workList" >
          <mt-field label="起始时间" placeholder="起始时间" type="date" v-model="itemWork.startDate" class="time-height"></mt-field>
          <mt-field label="终止时间" placeholder="终止时间" type="date" v-model="itemWork.endDate" class="time-height"></mt-field>
          <mt-field label="公司名称" placeholder="公司名称" v-model="itemWork.company"  :attr="{ maxlength: 50 }"></mt-field>
          <mt-field label="任职岗位" placeholder="任职岗位" v-model="itemWork.post"  :attr="{ maxlength: 50 }"></mt-field>
          <mt-field label="离职原因" placeholder="离职原因" v-model="itemWork.leavingReason"  :attr="{ maxlength: 200 }"></mt-field>
        </div>
        <div style="clear:both"></div>
        <h4>任职信息：</h4>
        <div class="item_prop">
          <div style="clear:both"></div>
          <label>办事处：</label>
          <span>{{userInfo.officeName}}</span>
        </div>
        <div class="item_prop">
          <label>部门：</label>
          <span>{{userInfo.departmentName}}</span>
        </div>
        <div class="item_prop">
          <label>岗位：</label>
          <span>{{userInfo.postName}}</span>
        </div>
        <div style="clear:both"></div>
        <mt-field label="签约时间：" placeholder="签约时间" type="date" v-model="userInfo.contractSignedDate" class="time-height"></mt-field>
        <mt-field label="合同期限：" placeholder="合同期限" v-model="userInfo.contractPeriod" @click.native='showContractPeriod' readonly></mt-field>
        <!-- 婚姻类型 -->
        <mt-popup v-model="showContractPeriodPop" position="bottom" style='width:100%'>
          <div class="title-pop">合同期限</div>
          <mt-picker :slots="slotsContractPeriodType" ref="pickerContractPeriodType" @change="onValContractPeriodType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showContractPeriod"></mt-picker>
        </mt-popup>
        <mt-field label="到期时间：" placeholder="到期时间" type="date" disabled  v-model="userInfo.contractExpireIn" class="time-height"></mt-field>
        <h4>登录账户信息：</h4>
        <div class="item_prop_line">
          <label>登录名：</label><span>{{userInfo.alias}}</span></div>
        <div class="item_prop_line">
          <label>登录密码：</label>
          <span>******</span>
        </div>
        <div class="item_prop_line">
          <label>企话宝账号：</label>
          <span>{{userInfo.webcallAccount}}</span>
        </div>
        <div class="item_prop_line">
          <label>企话宝密码：</label>
          <span>{{userInfo.webcallPwd}}</span> 
        </div>
      </div>
    </div>
    <!-- 菜单 -->
    <mt-actionsheet :actions="actions" v-model="sheetVisible"></mt-actionsheet>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import axios from 'axios';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      hasSave: false,
      itemWork: {},
      userInfo: {
        eduList: [{ startDate: "", endDate: "", graduatedSchool: "", major: "", degree: "", },
          { startDate: "", endDate: "", graduatedSchool: "", major: "", degree: "", },
          { startDate: "", endDate: "", graduatedSchool: "", major: "", degree: "", }
        ]
      },
      eduList: [],
      workList: [],

      showPoliticalTypePop: false,
      //----------------------------------------------
      showContractPeriodPop: false,
      ContractPeriodType: '--请选择--',
      ContractPeriodTypeId: '',
      //-------------------------------------------------------

      slotsContractPeriodType: [{
        flex: 1,
        values: [{ // 婚姻状况,未婚/已婚/离异/丧偶
          id: 1,
          name: '1年'
        }, {
          id: 2,
          name: '2年'
        }, {
          id: 3,
          name: '3年'
        }, {
          id: 4,
          name: '4年'
        }, {
          id: 5,
          name: '5年'
        }, {
          id: 6,
          name: '6年'
        }, {
          id: 7,
          name: '7年'
        }, {
          id: 8,
          name: '8年'
        }, {
          id: 9,
          name: '9年'
        }, {
          id: 10,
          name: '10年'
        }],
        className: 'slotsContractPeriodType',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      // --------------------------
      showContractPeriodType: false,
      //----------------------------------------------
      showMarryTypePop: false,
      marryType: '--请选择--',
      marryTypeId: '',
      //-------------------------------------------------------
      slotsMarryType: [{
        flex: 1,
        values: [{ // 婚姻状况,未婚/已婚/离异/丧偶
          id: '未婚',
          name: '未婚'
        }, {
          id: '已婚',
          name: '已婚'
        }, {
          id: '离异',
          name: '离异'
        }, {
          id: '丧偶',
          name: '丧偶'
        }],
        className: 'slotsMarryType',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      // --------------------------
      showMarryTypePop: false,
      politicalType: '--请选择--',
      //-------------------------------------------------------
      politicalTypeId: '',
      slotsPoliticalType: [{
        flex: 1,
        values: [{ //  政治面貌,群众/党员/预备党员/共青团员
          id: '群众',
          name: '群众'
        }, {
          id: '党员',
          name: '党员'
        }, {
          id: '预备党员',
          name: '预备党员'
        }, {
          id: '共青团员',
          name: '共青团员'
        }],
        className: 'slotsPoliticalType',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      // --------------------------
      getHeader: localStorage.userHeadImg, //头像路径
      headerImg: "http://fttx-sale-staticsource.oss-cn-hangzhou.aliyuncs.com/test/mobile/static/image/head.png",
      //localStorage.userHeadImg
      sheetVisible: false,
      actions: [{
        name: '拍照',
        method: this.takePhoto,
      }, {
        name: '从相册中选择',
        method: this.openAlbum,
      }],
      marry: '已婚',
      degreePop:false,                  //学历弹框
      degreePopZ:false,
      degreePopO:false,
      degreePopT:false, 
      //-------------------------------------------------------
      degreeArr: [{
        flex: 1,
        values: [{
          id: '高中',
          name: '高中'
        },{
          id: '中专',
          name: '中专'
        },{
          id: '大专',
          name: '大专'
        }, {
          id: '本科',
          name: '本科'
        },{
          id: '硕士',
          name: '硕士'
        }, { 
          id: '博士',
          name: '博士'
        }],
        className: 'degreeArr',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      // --------------------------  
    }
  },
  mounted: function() {
    this.getDetail();
  },
  computed: {
  },
  watch: {
    //----------------------------------------------------------------------------------------
    'userInfo.tenureTime': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.fullTime': function(n, o) {
      if (n != o) {
        this.hasSave = false;    
      }
    },
    'userInfo.departureTime': function(n, o) {
      if (n != o) {
        this.hasSave = false;    
      }
    },
    'userInfo.officeId': function(n, o) {
      if (n != o) {
        this.hasSave = false;   
      }
    },
    'userInfo.departmentId': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.telephone': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.email': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.alias': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.idNumber': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.address': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.weChat': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.address': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.registTime': function(n, o) {
      if (n != o) {
        this.hasSave = false; 
      }
    },
    'userInfo.insertSource': function(n, o) {
      if (n != o) {
        this.hasSave = false; 
      }
    },
    'userInfo.checkRemark': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.flag': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.offerLetter': function(n, o) {
      if (n != o) {
        this.hasSave = false; 
      }
    },

    'userInfo.gmtCreate': function(n, o) {
      if (n != o) {
        this.hasSave = false; 
      }
    },
    'userInfo.checkTime': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.headerImg': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.nickname': function(n, o) {
      if (n != o) {
        this.hasSave = false; 
      }
    },
    'userInfo.avatar': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.nativePlace': function(n, o) {
      if (n != o) {
        this.hasSave = false; 
      }
    },
    'userInfo.nation': function(n, o) {
      if (n != o) {
        this.hasSave = false; 
      }
    },
    'userInfo.maritalStatus': function(n, o) {
      if (n != o) {
        this.hasSave = false; 
      }
    },

    'userInfo.politicalStatus': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.graduatedSchool': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.major': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.degree': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'eduList': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'workList': function(n, o) {
      if (n != o) {
        this.hasSave = false; 
      }
    },
    'userInfo.ContractPeriodTypeId': function(n, o) {
      if (n != o) {
        this.hasSave = false; 
      }
    },

    'userInfo.keepCustomerCount': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.contractExpireIn': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.contractPeriod': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    'userInfo.contractSignedDate': function(n, o) {
      if (n != o) {
        this.hasSave = false;  
      }
    },
    //----------------------------------------------------------------------------------------------
    'userInfo.contractPeriod':function(n,o){
      if( n != ''  && n != null && n != 'null'){
        if(this.userInfo.contractSignedDate != ''&&this.userInfo.contractSignedDate != undefined && this.userInfo.contractSignedDate != null ){
          let time_html = new Date(this.userInfo.contractSignedDate);
          let y = time_html.getFullYear();
          let m = time_html.getMonth() + 1;
          let d = time_html.getDate();
          time_html = y+ parseInt(n) + "-" + m + "-" + d;
          this.userInfo.contractExpireIn = new Date(time_html) - 8.64e7;
          this.userInfo.contractExpireIn = this.timerYear(this.userInfo.contractExpireIn); 
        }
      }
    },
    'userInfo.contractSignedDate':function(n,o){
      if(n == '' || n == null){
        this.userInfo.contractPeriod = '';
      }else{
        if(this.userInfo.contractPeriod != ''){
          let time_html = new Date(this.userInfo.contractSignedDate);
          let timeE = new Date();
          if(time_html > timeE){
            MessageBox.alert('签约时间不能大于当前时间！','提示');
            return
          }
          let y = time_html.getFullYear();
          let m = time_html.getMonth() + 1;
          let d = time_html.getDate();
          time_html = y + parseInt(this.userInfo.contractPeriod) + "-" + m + "-" + d;
          this.userInfo.contractExpireIn = new Date(time_html) - 8.64e7;
          this.userInfo.contractExpireIn = this.timerYear(this.userInfo.contractExpireIn);
        }
      }
    },
  },
  methods: {
    //-------------------------------------
    showPoliticalType: function() { //  婚姻类型
      this.showPoliticalTypePop = true;
    },
    onValChangePoliticalType: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.userInfo.politicalStatus = values[0].name;
      this.politicalTypeId = values[0].id;
    },
    //-------------------------------------
    showContractPeriod: function() { //  婚姻类型
      this.showContractPeriodPop = true;
    },
    onValContractPeriodType: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.userInfo.contractPeriod = values[0].name;
      this.contractPeriodTypeId = values[0].id; 
    },
    showMarryType: function() { //   
      this.showMarryTypePop = true;
    },
    onValChangeMarryType: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.userInfo.maritalStatus = values[0].name;
      this.marryTypeId = values[0].id;
    },
    changeHeader: function(typeStr) {
      var self = this;
      var param = {
        type: typeStr,
        width: 180,
        height: 200,
      };
      var strjson = JSON.stringify(param);
      window.salePhone.onPhone(strjson);
      window.getHeaderImg = function(param) {
        // self.getHeader = param; 
        var jsonObj = JSON.parse(param);
        self.headerImg = jsonObj.headerImg;
        self.avatar = jsonObj.avatar;
      }
    },
    takePhoto: function() {
      this.changeHeader("takePhoto");
    },
    openAlbum: function() {
      this.changeHeader("openAlbum");
    },
    getDetail: function() { // 客户详情 
      var self = this;
      var param = {
        id: Number(self.$route.query.id)
      };
      axios.post(self.html_url + self.Apilist.detailEmployee, param).then(function(data) {
        self.userInfo = data.data.data;
        self.headerImg = self.userInfo.avatarUrl == null ? self.headerImg : self.userInfo.avatarUrl;
        // 时间处理
        for (let i = 0; i < self.userInfo.eduList.length; i++) {
          if (self.userInfo.eduList[i].startDate != '' && self.userInfo.eduList[i].startDate != null) {
            self.userInfo.eduList[i].startDate = self.userInfo.eduList[i].startDate.substring(0,10);
          }
          if (self.userInfo.eduList[i].endDate != '' && self.userInfo.eduList[i].startDate != null ) {
            self.userInfo.eduList[i].endDate = self.userInfo.eduList[i].endDate.substring(0,10);
          }
        }
        for (let i = 0; i < self.userInfo.workList.length; i++) {
          if (self.userInfo.workList[i].startDate != '' && self.userInfo.workList[i].startDate != null) {
            self.userInfo.workList[i].startDate = self.userInfo.workList[i].startDate.substring(0,10);
          }
          if (self.userInfo.workList[i].endDate != '' && self.userInfo.workList[i].startDate != null ) {
            self.userInfo.workList[i].endDate = self.userInfo.workList[i].endDate.substring(0,10);
          }
        }
        if (self.userInfo.contractExpireIn != '' && self.userInfo.contractExpireIn != null) {
          self.userInfo.contractExpireIn = self.userInfo.contractExpireIn.substring(0,10);
        }
        if (self.userInfo.contractSignedDate != '' && self.userInfo.contractSignedDate != null) {
          self.userInfo.contractSignedDate = self.userInfo.contractSignedDate.substring(0,10);
        }
        self.eduList = self.userInfo.eduList;
        self.workList = self.userInfo.workList;
        if(self.userInfo.contractPeriod != null && self.userInfo.contractPeriod != '' ){
          self.contractPeriodTypeId = self.userInfo.contractPeriod;
          self.userInfo.contractPeriod = self.userInfo.contractPeriod + '年';
        }
      }).catch(function(e) {});
    },
    timer(type) {
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
      time_html = year + "-" + month+ "-" + day+ " "+ h + ':' + M +':00';
      return time_html 
    },
    timerYear(type) {
      let time_html = '';
      if (type != '' && type != null) {
        type = new Date(type);
        let time_html = '';
        let year = type.getFullYear(); 
        let month = type.getMonth() + 1; 
        month < 10 && (month = '0' + month);
        let day = type.getDate();  
        day < 10 && (day = '0' + day);
        time_html = year + "-" + month+ "-" + day;
        return time_html   
      } else {
        return time_html
      }
    },
    goFanwei: function() {
      this.$router.push({ path: '/setFanwei' });
    },
    save: function() {
      var self = this;
      var userInfo = JSON.parse(localStorage.userInfo);
      var salesmanId = userInfo.employeeId;
      var param = {
        id: self.userInfo.id,
        manageFlag: self.userInfo.manageFlag,
        officeId: self.userInfo.officeId,
        departmentId: self.userInfo.departmentId,
        postId: self.userInfo.postId,
        sex: self.userInfo.sex,
        telephone: self.userInfo.telephone,
        email: self.userInfo.email,
        tenureTime: self.userInfo.tenureTime,
        fullTime: self.userInfo.fullTime,
        departureTime: self.userInfo.departureTime,
        remark: self.userInfo.remark == null ? "0" : self.userInfo.remark,
        operatorId: self.userInfo.operatorId,
        name: self.userInfo.name,
        alias: self.userInfo.alias,
        password: self.userInfo.password,
        birthday: self.userInfo.birthday,
        idNumber: self.userInfo.idNumber,
        address: self.userInfo.address,
        weChat: self.userInfo.weChat,
        registTime: self.userInfo.registTime,
        sort: self.userInfo.sort,
        checkFlag: self.userInfo.checkFlag,
        insertSource: self.userInfo.insertSource,
        checkRemark: self.userInfo.checkRemark,
        flag: self.userInfo.flag,
        idNumberImage1: self.userInfo.idNumberImage1,
        idNumberImage1Url: self.userInfo.idNumberImage1Url,
        idNumberImage2: self.userInfo.idNumberImage2,
        idNumberImage2Url: self.userInfo.idNumberImage2Url,
        idNumberImage3: self.userInfo.idNumberImage3,
        idNumberImage3Url: self.userInfo.idNumberImage3Url,
        offerLetter: self.userInfo.offerLetter,
        offerLetterName: self.userInfo.offerLetterName == null ? "0" : self.userInfo.offerLetterName,
        gmtCreate: self.userInfo.gmtCreate,
        checkTime: self.userInfo.checkTime,
        unionid: self.userInfo.unionid == null ? "0" : self.userInfo.unionid,
        avatarUrl: self.headerImg,
        nickname: self.userInfo.nickname,
        avatar: self.avatar,
        nativePlace: self.userInfo.nativePlace,
        nation: self.userInfo.nation,
        maritalStatus: self.userInfo.maritalStatus,
        politicalStatus: self.userInfo.politicalStatus,
        graduatedSchool: self.userInfo.graduatedSchool,
        major: self.userInfo.major,
        degree: self.userInfo.degree,
        eduList: self.userInfo.eduList,
        workList: self.userInfo.workList,
        contractPeriod: this.contractPeriodTypeId,
        keepCustomerCount: self.userInfo.keepCustomerCount,
        contractExpireIn: self.userInfo.contractExpireIn,
        contractSignedDate: self.userInfo.contractSignedDate,
      };
      if (param.contractExpireIn != null && typeof(param.contractExpireIn) == "object") {
        param.contractExpireIn = this.timer(param.contractExpireIn);
      }else if( typeof(param.contractExpireIn) == "string") {
        param.contractExpireIn = param.contractExpireIn +" "+"00:00:00";
      }
      if (param.contractSignedDate != null && typeof(param.contractSignedDate) == "object") {
        param.contractSignedDate = this.timer(param.contractSignedDate);
      }else if(typeof(param.contractSignedDate) == "string"){
        param.contractSignedDate = param.contractSignedDate +" "+"00:00:00";
      }
      let _Time =  this.timer(new Date());
      for (let i = 0; i < param.workList.length; i++) {
        if (param.workList[i].startDate != null && typeof(param.workList[i].startDate) == "object") {
          param.workList[i].startDate = this.timer(param.workList[i].startDate);
        }else if(typeof(param.workList[i].startDate) == "string"){
          param.workList[i].startDate = param.workList[i].startDate+" "+"00:00:00";
        }
        if (param.workList[i].endDate != null && typeof(param.workList[i].endDate) == "object") {
          param.workList[i].endDate = this.timer(param.workList[i].endDate);
        }else if(typeof(param.workList[i].endDate) == "string"){
          param.workList[i].endDate = param.workList[i].endDate+" "+"00:00:00";
        }
        if(param.workList[i].startDate != null && param.workList[i].startDate != '' ){
          if(param.workList[i].startDate >=  param.workList[i].endDate){
            MessageBox.alert('工作经历 结束时间不能早于(等于)开始时间！','提示');
            return
          }
        } 
        if(param.workList[i].endDate != null && param.workList[i].endDate != ''){
          if(param.workList[i].endDate >  _Time){
            MessageBox.alert( '工作经历 结束时间不能大于当前时间！','提示');
            return
          }
        }
      }
      for (let i = 0; i < param.eduList.length; i++) {
        if ((param.eduList[i].startDate != '' && typeof(param.eduList[i].startDate) == "object") || (param.eduList[i].startDate != null && typeof(param.eduList[i].startDate) == "object")) {
          param.eduList[i].startDate = this.timer(param.eduList[i].startDate);
        }else if(typeof(param.eduList[i].startDate) == "string"){
          param.eduList[i].startDate = param.eduList[i].startDate+" "+"00:00:00";
        }
        if (param.eduList[i].endDate != '' && typeof(param.eduList[i].endDate) == "object") {
          param.eduList[i].endDate = this.timer(param.eduList[i].endDate);
        }else if(typeof(param.eduList[i].endDate) == "string"){
          param.eduList[i].endDate = param.eduList[i].endDate+" "+"00:00:00";
        }
        if(param.eduList[i].startDate != null && param.eduList[i].startDate != ''){
          if(param.eduList[i].startDate >=  param.eduList[i].endDate){
            MessageBox.alert('教育背景 结束时间不能早于(等于)开始时间！','提示');
            return
          }
        }
        if(param.eduList[i].endDate != null && param.eduList[i].endDate != ''){
          if(param.eduList[i].endDate >  _Time){
            MessageBox.alert('教育背景 结束时间不能大于当前时间！','提示');
            return
          }
        }
      }
      axios.post(self.html_url + self.Apilist.updateEmployeeInfo, param).then(function(data) {
        self.$router.go(-1);
        Toast({
          message: '设置成功',
        }); 
        self.hasSave = true;
      }).catch(function(e) {});
    },
    goPower: function() {
      this.$router.push({ path: '/goPower' });
    },
    goback: function() {
      if (this.hasSave) {
        this.$router.go(-1);
        return
      }
      MessageBox.confirm('离开此页编辑内容将无效?').then(action => {
        this.$router.go(-1);
      }, () => {
        // 取消
      });
    },
    timer(type) {
      let time_html = '';
      if (type != '' && type != null) {
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
        time_html = year + "-" + month+ "-" + day+ " "+ h + ':' + M +':00';
        return time_html   
      } else {
        return time_html
      }
    },
    onValChangeDegreeArr(picker, values){             //学历选择
      if (values[0] == undefined) {
        return
      }
      this.userInfo.degree = values[0].name;
    },
    onValChangeDegreeArrZ(picker, values){             //学历选择
      if (values[0] == undefined) {
        return
      }
      this.userInfo.eduList[0].degree = values[0].name;
    },
    onValChangeDegreeArrO(picker, values){             //学历选择
      if (values[0] == undefined) {
        return
      }
      this.userInfo.eduList[1].degree = values[0].name;
    },
    onValChangeDegreeArrT(picker, values){             //学历选择
      if (values[0] == undefined) {
        return
      }
      this.userInfo.eduList[2].degree = values[0].name;
    },
  },
}
</script>
<style scoped>
  h4{margin: 0;}
  .education {margin-bottom: 3px;}
  .fl {float: left;}
  .header {width: 40%;float: left; height: 170px;}
  .workinfo {padding: 4px;background: #efefef;text-align: left;font-size: 14px;line-height: 30px;padding: 5px; padding-bottom: 90px;}
  .workinfo label {color:#999;font-size: 14px;}
  .item_prop {width: 45%;float: left;line-height: 40px;height: 40px;}
  .item_prop label {float: left;}
  .item_prop_line {width: 100%;clear: both;padding: 5px 0;line-height: 40px; height: 40px;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
  .item_prop_line label {float: left;min-width: 80px;}
</style>