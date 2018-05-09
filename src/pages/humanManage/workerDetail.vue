<template>
  <div class="pageBox">
    <mt-header title="员工详情" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      <mt-button v-if="ManageRole!=1" slot="right" @click.native="save">保存</mt-button>
    </mt-header>
    <div style="padding-top:39px;">
      <div class="workinfo">
        <div class="line"></div>
        <h4>员工基本信息：</h4>
        <div class="header">
          <img :src="workerinfo.avatarCompressUrl" width="80%" height="80%" style="vertical-align:middle;margin:5%">
        </div>
        <div style="float:right;width:50%">
          <div class="item_prop_line">
            <label>姓名:</label>
            <span>{{workerinfo.name}}</span>
          </div>
          <div class="item_prop_line">
            <label>姓别:</label>
            <span>{{workerinfo.sex==1?"男":"女"}}</span>
          </div>
          <div class="item_prop_line">
            <label>生日:</label>
            <span>{{workerinfo.birthday | TimeCut}}</span>
          </div>
          <div class="item_prop_line">
            <label>籍贯:</label>
            <span style="word-break: break-word;">{{workerinfo.nativePlace==null||workerinfo.nativePlace==''?'无':workerinfo.nativePlace}}</span>
          </div>
          <div class="item_prop_line">
            <label>民族:</label>
            <span>{{workerinfo.nation==null||workerinfo.nation==''?'无':workerinfo.nation}}</span>
          </div>
        </div>
        <div style="clear:both"></div>
        <div class="line"></div>
        <div class="item_prop">
          <label>婚姻:</label>
          <span>{{workerinfo.maritalStatus==null||workerinfo.maritalStatus==''?'无':workerinfo.maritalStatus}}</span>
        </div>
        <div class="item_prop">
          <label>政治面貌:</label>
          <span>{{workerinfo.politicalStatus==null||workerinfo.politicalStatus==''?'无':workerinfo.politicalStatus}}</span>
        </div>
        <div class="item_prop">
          <label>手机:</label>
          <span>{{workerinfo.telephone}}</span>
        </div>
        <div class="item_prop_line">
          <label>邮箱:</label>
          <span style="word-break: break-word;">{{workerinfo.email}}</span>
        </div>
        <div class="item_prop_line">
          <label>微信头像:</label>
          <span>
            <img :src="workerinfo.headimgurl" width='30' height="30" class='wxhead'> 
          </span>
        </div>
        <div class="item_prop_line">
          <label>微信昵称:</label>
          <span>{{workerinfo.nickname}}</span>
        </div>
        <div class="item_prop_line">
          <label>毕业院校:</label>
          <span style="word-break: break-word;">{{workerinfo.graduatedSchool==null||workerinfo.graduatedSchool==''?'无':workerinfo.graduatedSchool}}</span>
        </div>
        <div class="item_prop_line">
          <label>专业:</label>
          <span style="word-break: break-word;">{{workerinfo.major==null||workerinfo.major==''?'无':workerinfo.major}}</span>
        </div>
        <div class="item_prop_line">
          <label>学历学位:</label>
          <span>{{workerinfo.degree==null||workerinfo.degree==''?'无':workerinfo.degree}}</span>
        </div>
        <div class="item_prop_line">
          <label>身份证号:</label>
          <span>{{workerinfo.idNumber}}</span>
        </div>
        <div class="cardImg">
          <img :src="workerinfo.idNumberImage1CompressUrl" width="30%" height="30%" style="vertical-align:middle;">
          <img :src="workerinfo.idNumberImage2CompressUrl" width="30%" height="30%" style="vertical-align:middle;">
          <img :src="workerinfo.idNumberImage3CompressUrl" width="30%" height="30%" style="vertical-align:middle;">
        </div>
        <div class="line" style="margin-top:8px;"></div>
        <h4>教育背景：</h4>
        <ul class="edubackground">
          <li v-for="item in workerinfo.eduList">
            <div class="item_prop_line">
              <label>起始时间:</label>
              <span>{{item.startDate|TimeCut}}</span>
            </div>
            <div class="item_prop_line">
              <label>终止时间:</label>
              <span>{{item.endDate|TimeCut}}</span>
            </div>
            <div class="item_prop_line">
              <label>学校名称:</label>
              <span style="word-break: break-word;">
                {{item.graduatedSchool==null||item.graduatedSchool==''?"无":item.graduatedSchool}}
              </span>
            </div>
            <div class="item_prop_line">
              <label>专业名称:</label>
              <span style="word-break: break-word;">
                {{item.major==null||item.major==''?"无":item.major}}
              </span>
            </div>
            <div class="item_prop_line">
              <label>学历学位:</label>
              <span>
                {{item.degree==null||item.degree==''?"无":item.degree}}
              </span>
            </div>
            <div class="item_prop_line"></div>
          </li>
        </ul>
        <div class="line"></div>
        <h4>工作经历：（从最近一份工作起）</h4>
        <ul class="edubackground">
          <li v-for="item in workerinfo.workList">
            <div class="item_prop_line">
              <label>起始时间:</label>
              <span>{{item.startDate|TimeCut}}</span>
            </div>
            <div class="item_prop_line">
              <label>终止时间:</label>
              <span>{{item.endDate|TimeCut}}</span>
            </div>
            <div class="item_prop_line">
              <label>公司名称:</label>
              <span style="word-break: break-word;">
                {{item.company==null||item.company==''?"无":item.company}}
              </span>
            </div>
            <div class="item_prop_line">
              <label>任职岗位:</label>
              <span style="word-break: break-word;">
                {{item.post==null||item.post==''?"无":item.post}}
              </span>
            </div>
            <div class="item_prop_line">
              <label>离职原因:</label>
              <span style="word-break: break-word;">
                {{item.leavingReason==null||item.leavingReason==''?"无":item.leavingReason}}
              </span>
            </div>
            <div class="item_prop_line">
            </div>
          </li>
        </ul>
        <div class="line"></div>
        <h4>任职信息：</h4>
        <div v-if="ManageRole==1"> 
          <div class="item_prop">
            <label>办事处:</label><span>{{workerinfo.officeName}}</span></div>
          <div class="item_prop">
            <label>部门:</label><span>{{workerinfo.departmentName}}</span></div>
          <div class="item_prop">
            <label>岗位:</label><span>{{workerinfo.postName}}</span></div>
          <div class="item_prop">
            <label>入职时间:</label><span>{{workerinfo.tenureTime|TimeCut}}</span></div>
          <div class="item_prop">
            <label>合同期限:</label><span>{{workerinfo.contractPeriod}}(年)</span></div>
          <div class="item_prop">
            <label>到期时间:</label><span>{{workerinfo.contractExpireIn|TimeCut}}</span></div>
          <div class="item_prop_line"></div>
        </div>
        <div v-else>
          <div class="item_prop">
            <label>办事处:</label><span>{{workerinfo.officeName}}</span></div>
          <div class="item_prop">
            <label>部门:</label><span>{{workerinfo.departmentName}}</span></div>
          <div class="item_prop_line">
            <label>岗位:</label><span>{{workerinfo.postName}}</span></div>
          <div>
            <mt-field label="签约时间:" placeholder="签约时间" type="date" v-model="workerinfo.contractSignedDate" class="time-height">
            </mt-field>
            <mt-field label="合同期限:" placeholder="合同期限" v-model="contractPeriodName" @click.native='showContractPeriod' readonly>
            </mt-field>
            <mt-popup v-model="showContractPeriodPop" position="bottom" style='width:100%'>
              <div class="title-pop">合同期限</div>
              <mt-picker :slots="slotsContractPeriodType" ref="pickerContractPeriodType" @change="onValContractPeriodType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showContractPeriod"></mt-picker>
            </mt-popup>
            <mt-field label="到期时间:" placeholder="到期时间" type="date" disabled  v-model="workerinfo.contractExpireIn" class="time-height">
            </mt-field>
          </div>
          <div class="item_prop_line"></div>
        </div>
        <div class="line" style="margin-top:5px;"></div>
        <h4>登录账户信息：</h4>
        <div class="item_prop_line">
          <label>登录名:</label><span>{{workerinfo.alias}}</span></div>
        <div class="item_prop_line">
          <label>登录密码:</label><span>******</span>
        </div>
        <div class="item_prop_line">
          <label>企话宝账号：</label>
          <span>{{workerinfo.webcallAccount}}</span>
        </div>
        <div class="item_prop_line">
          <label>企话宝密码：</label>
          <span>{{workerinfo.webcallPwd}}</span> 
        </div>
      </div>
    </div>
    <!-- 菜单 -->
    <mt-tabbar v-model="selected" fixed style='height:50px;line-height:50px;' v-if="isShowPower">
      <mt-tab-item id="setpower" @click.native='goPower'>
        <span class="tabSty">功能权限</span>
      </mt-tab-item>
      <mt-tab-item id="setFanwei" @click.native='goFanwei'>
        <span class="tabSty">管理范围</span>
      </mt-tab-item>
      <mt-tab-item id="setQuYu" @click.native='goQuYu'>
        <span class="tabSty">区域选择</span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import axios from 'axios';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      ManageRole:"",                //管理权限
      contractPeriodName:"",        //合同期限
      selected: "",                 //功能权限
      isShowPower: false,           //是否有管理权限
      workerinfo: {},               //员工信息
      slotsContractPeriodType: [{
        flex: 1,
        values: [{ 
          id: '1',
          name: '1年'
        }, {
          id: '2',
          name: '2年'
        }, {
          id: '3',
          name: '3年'
        }, {
          id: '4',
          name: '4年'
        }, {
          id: '5',
          name: '5年'
        }, {
          id: '6',
          name: '6年'
        }, {
          id: '7',
          name: '7年'
        }, {
          id: '8',
          name: '8年'
        }, {
          id: '9',
          name: '9年'
        }, {
          id: '10',
          name: '10年'
        }],
        className: 'slotsContractPeriodType',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showContractPeriodPop: false, //合同年限选择
    }
  },
  created: function() {
  },
  mounted: function() {
    this.getWorkerInfo();
    this.showMenu();
  },
  watch:{
    'workerinfo.contractPeriod':function(n,o){
      if( n != ''  && n != null && n != 'null'){
        if(this.workerinfo.contractSignedDate != ''&&this.workerinfo.contractSignedDate != undefined && this.workerinfo.contractSignedDate != null ){
          let time_html = new Date(this.workerinfo.contractSignedDate);
          let y = time_html.getFullYear();
          let m = time_html.getMonth() + 1;
          let d = time_html.getDate();
          time_html = y+ parseInt(n) + "-" + m + "-" + d;
          this.workerinfo.contractExpireIn = new Date(time_html) - 8.64e7;
          this.workerinfo.contractExpireIn = this.timer(this.workerinfo.contractExpireIn);
        }
      }
    },
    'workerinfo.contractSignedDate':function(n,o){
      if(n == '' || n == null){
        this.workerinfo.contractPeriod = '';
      }else{
        if(this.workerinfo.contractPeriod != ''){
          let time_html = new Date(this.workerinfo.contractSignedDate);
          let timeE = new Date();
          if(time_html > timeE){
            MessageBox.alert('签约时间不能大于当前时间！','提示');
            return
          }
          let y = time_html.getFullYear();
          let m = time_html.getMonth() + 1;
          let d = time_html.getDate();
          time_html = y + parseInt(this.workerinfo.contractPeriod) + "-" + m + "-" + d;
          this.workerinfo.contractExpireIn = new Date(time_html) - 8.64e7;
          this.workerinfo.contractExpireIn = this.timer(this.workerinfo.contractExpireIn);
        }
      }
    },
    'workerinfo.avatarCompressUrl':function(n,o){
      if(n == null || n == ''){
        this.workerinfo.avatarCompressUrl = "http://fttx-sale-staticsource.oss-cn-hangzhou.aliyuncs.com/test/mobile/static/image/head.png";
      }
    }
  },
  computed: {

  },
  methods: {
    showMenu: function() {
      var self = this;
      this.userInfo = JSON.parse(localStorage.userInfo);
      var salesmanId = this.userInfo.employeeId;
      this.ManageRole = this.userInfo.manageFlag;
      var menu = this.userInfo.data;
      for (var i = 0; i < menu.length; i++) {
        if (menu[i].label == "系统设置") {
          for (var j = 0; j < menu[i].children.length; j++) {
            if (menu[i].children[j].label == "用户权限设置") {
              self.isShowPower = true
            }
          }
          return
        }
      }
    },
    getWorkerInfo: function() {             //获取用户信息
      var self = this;
      axios.post(self.html_url + self.Apilist.detailEmployee, { id: self.$route.query.id }).then(function(data) {
        self.workerinfo = data.data.data;
        if(self.workerinfo.contractSignedDate != '' ||self.workerinfo.contractSignedDate != null){
          self.workerinfo.contractSignedDate = self.workerinfo.contractSignedDate.substring(0,10);
        } 
        if(self.workerinfo.contractExpireIn != '' ||self.workerinfo.contractExpireIn != null){
          self.workerinfo.contractExpireIn = self.workerinfo.contractExpireIn.substring(0,10);
        }
        if(self.workerinfo.contractPeriod != '' ||self.workerinfo.contractPeriod != null){
          self.contractPeriodName = self.workerinfo.contractPeriod+ '年';
        }
      }).catch(function(e) {});
    },
    goFanwei: function() {                  //获取管理范围
      this.$router.push({path: '/setFanwei',query: {id: this.workerinfo.id,}});
    },
    goQuYu: function() {                  //获取管理范围
      this.$router.push({path: '/setQuYu',query: {id: this.workerinfo.id,}});
    },
    goPower: function() {                   //获取功能权限
      this.$router.push({path: '/setPower', query: {id: this.workerinfo.id,}});
    },
    showContractPeriod: function() {        //合同年限点击
      this.showContractPeriodPop = true;
    },
    onValContractPeriodType: function(picker, values) { //合同年限选择
      if (values[0] == undefined) {
        return
      }
      this.contractPeriodName = values[0].name;
      this.workerinfo.contractPeriod = values[0].id; 
    },
    back: function() {                      //返回
      this.$router.push({path: '/humanManage',query: {shenQing:'24' }});
    },
    save() {                                //保存用户信息
      var self = this;
      let time_html = new Date(this.workerinfo.contractSignedDate);
      let timeE = new Date();
      if(time_html > timeE){
        MessageBox.alert('签约时间不能大于当前时间！','提示');
        return
      }
      var param = {
        id: this.workerinfo.id,
        contractPeriod: this.workerinfo.contractPeriod,
        contractExpireIn: this.workerinfo.contractExpireIn,
        contractSignedDate: this.workerinfo.contractSignedDate,
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
      axios.post(self.html_url + self.Apilist.updateEmployeeInfo, param).then(function(data) {
        self.$router.push({path:'/humanManage',query:{"canShenHe":false,"canQuanxian":true}});
        Toast({message: '设置成功',}); 
      }).catch(function(e) {});
    },
    timer(type) {
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
    }
  }
}
</script>
<style scoped>
  .tabSty {height: 40px;line-height: 40px;display: block;font-size: 15px;background: #efefef;margin: 0 5px;}
  .edubackground {list-style: none;padding: 2px;}
  .wxhead {margin-left: 10px;}
  .header {width: 50%;float: left;height: 200px;}
  .shenheBox {padding: 20px; min-height: 80px;font-size: 14px;}
  .workinfo {padding: 4px;background: #fff;text-align: left;font-size: 14px;
    line-height: 30px;padding: 5px;padding-bottom: 130px;}
  .workinfo label {color: #999;font-size: 14px;}
  .item_prop {width: 45%;float: left;word-break: break-word;}
  .item_prop_line {width: 100%;clear: both;word-break: break-word;}
  .mint-tab-item-label {font-size: 13px!important;}
  h4{margin: 5px 0}
  ul{margin-bottom: 0;}
</style>