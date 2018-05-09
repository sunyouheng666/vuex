<template>
  <div class="pageBox">
    <mt-header title="个人中心" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      <mt-button slot="right" @click.native="goEdit(id)">编辑</mt-button>
    </mt-header>
    <div style="padding-top:39px;">
      <div class="workinfo">
        <div class="line"></div>
        <h4>员工基本信息：</h4>
        <div class="header">
          <img :src="userinfo.avatarCompressUrl" width="80%" height="80%" style="vertical-align:middle;margin:5%">
        </div>
        <div style="float:right;width:50%">
          <div class="item_prop_line">
            <label>姓名：</label>
            <span>{{userinfo.name}}</span>
          </div>
          <div class="item_prop_line">
            <label>姓别：</label>
            <span>{{userinfo.sex|getsex}}</span>
          </div>
          <div class="item_prop_line">
            <label>生日：</label>
            <span>{{userinfo.birthday | TimeCut}}</span>
          </div>
          <div class="item_prop_line">
            <label>籍贯：</label>
            <span style="word-break: break-word;">
              {{userinfo.nativePlace==null||userinfo.nativePlace==''?"无":userinfo.nativePlace}}
            </span>
          </div>
          <div class="item_prop_line">
            <label>民族：</label>
            <span>{{userinfo.nation==null||userinfo.nation==''?"无":userinfo.nation}}</span>
          </div>
        </div>
        <div style="clear:both"></div>
        <div class="line"></div>
        <div class="item_prop">
          <label>婚姻:</label>
          <span>{{userinfo.maritalStatus==null||userinfo.maritalStatus==''?"无":userinfo.maritalStatus}}</span>
        </div>
        <div class="item_prop">
          <label>政治面貌：</label>
          <span>{{userinfo.politicalStatus==null||userinfo.politicalStatus==''?"无":userinfo.politicalStatus}}</span>
        </div>
        <div class="item_prop_line">
          <label>手机:</label>
          <span>{{userinfo.telephone}}</span>
        </div>
        <div class="item_prop_line">
          <label>邮箱：</label>
          <span>{{userinfo.email}}</span>
        </div>
        <div class="item_prop">
          <label>微信头像:</label>
          <span>
            <img :src='userinfo.headimgurl' width='30' height="30" />
          </span>
        </div>
        <div class="item_prop_line">
          <label>微信昵称：</label>
          <span>{{userinfo.nickname}}</span>
        </div>
        <div class="item_prop_line">
          <label>毕业院校：</label>
          <span style="word-break: break-word;">
            {{userinfo.graduatedSchool==null||userinfo.graduatedSchool==''?"无":userinfo.graduatedSchool}}
          </span>
        </div>
        <div class="item_prop_line">
          <label>专业:</label>
          <span style="word-break: break-word;">
            {{userinfo.major==null||userinfo.major==''?"无":userinfo.major}}
          </span>
        </div>
        <div class="item_prop_line">
          <label>学历学位：</label>
          <span>{{userinfo.degree==null||userinfo.degree==''?"无":userinfo.degree}}</span>
        </div>
        <div class="item_prop_line">
          <label>地址：</label>
          <span style="word-break: break-word;">
            {{userinfo.address==null||userinfo.address==''?"无":userinfo.address}}
          </span>
        </div>
        <div class="item_prop_line">
          <label>身份证号：</label>
          <span>{{userinfo.idNumber}}</span>
        </div>
        <div class="cardImg">
          <img :src="userinfo.idNumberImage1CompressUrl" width="30%" height="30%" style="vertical-align:middle;">
          <img :src="userinfo.idNumberImage2CompressUrl" width="30%" height="30%" style="vertical-align:middle;">
          <img :src="userinfo.idNumberImage3CompressUrl" width="30%" height="30%" style="vertical-align:middle;">
        </div>
        <div class="line"></div>
        <h4>教育背景：</h4>
        <div style="margin-bottom:4px;" v-for="item in userinfo.eduList"> 
          <div class="item_prop_line">
            <label>起始时间：</label>
            <span>{{item.startDate | TimeCut}}</span>
          </div>
          <div class="item_prop_line">
            <label>终止时间：</label>
            <span>{{item.endDate |TimeCut}}</span>
          </div>
          <div class="item_prop_line">
            <label>学校名称：</label>
            <span style="word-break: break-word;">
              {{item.graduatedSchool==null||item.graduatedSchool==''?"无":item.graduatedSchool}}
            </span>
          </div>
          <div class="item_prop_line">
            <label>专业名称：</label>
            <span style="word-break: break-word;">
              {{item.major==null||item.major==''?"无":item.major}}
            </span>
          </div>
          <div class="item_prop_line">
            <label>学历学位：</label>
            <span>{{item.degree==null||item.degree==''?"无":item.degree}}</span>
          </div>
        </div>
        <div class="item_prop_line"> </div>
        <div class="line"></div>
        <h4>工作经历：（从最近一份工作起）</h4>
        <div style="margin-bottom:4px;"   v-for="item in userinfo.workList"> 
          <div class="item_prop_line">
            <label>起始时间：</label>
            <span>{{item.startDate |TimeCut}}</span>
          </div>
          <div class="item_prop_line">
            <label>终止时间：</label>
            <span>{{item.startDate |TimeCut}}</span>
          </div>
          <div class="item_prop_line">
            <label>公司名称：</label>
            <span style="word-break: break-word;">
              {{item.company==null||item.company==''?"无":item.company}}
            </span>
          </div>
          <div class="item_prop_line">
            <label>任职岗位：</label>
            <span style="word-break: break-word;">
              {{item.post==null||item.post==''?"无":item.post}}
            </span>
          </div>
          <div class="item_prop_line">
            <label>离职原因：</label>
            <span style="word-break: break-word;">
              {{item.leavingReason==null||item.leavingReason==''?"无":item.leavingReason}}
            </span>
          </div>
        </div>
        <div class="line"></div>
        <h4>任职信息：</h4>
        <div class="item_prop">
          <label>办事处：</label>
          <span>{{userinfo.officeName}}</span>
        </div>
        <div class="item_prop">
          <label>部门：</label>
          <span>{{userinfo.departmentName}}</span>
        </div>
        <div class="item_prop">
          <label>岗位：</label>
          <span>{{userinfo.postName}}</span>
        </div>
        <div class="item_prop">
          <label>入职时间:</label>
          <span>{{userinfo.contractSignedDate | TimeCut}}</span>
        </div>
        <div class="item_prop">
          <label>合同期限：</label>
          <span>{{userinfo.contractPeriod}}(年)</span>
        </div>
        <div class="item_prop">
          <label>到期时间:</label>
          <span>{{userinfo.contractExpireIn | TimeCut}}</span>
        </div>
        <div class="item_prop_line"></div>
        <div class="line"></div>
        <h4>登录账户信息：</h4>
        <div class="item_prop_line">
          <label>登录名：</label>
          <span>{{userinfo.alias}}</span>
        </div>
        <div class="item_prop_line">
          <label>登录密码：</label><span>******</span>
        </div>
        <div class="item_prop_line">
          <label>企话宝账号：</label>
          <span>{{userinfo.webcallAccount}}</span>
        </div>
        <div class="item_prop_line">
          <label>企话宝密码：</label>
          <span>{{userinfo.webcallPwd}}</span> 
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        userinfo: {},
        id:this.$route.query.id,
      }
    },
    mounted: function() {
      this.getDetail();
    },
    watch:{
    },
    computed: {
    },
    methods: {
      back: function() {
        this.$router.go(-1)
      },
      goFanwei: function() {
        this.$router.push({ path: '/setFanwei'});
      },
      goPower: function() {
        this.$router.push({ path: '/goPower'});
      },
      goEdit: function(idstr) {
        this.$router.push({ path: '/userInfoEdit',query: {id: idstr}});
      },
      getDetail: function() { // 客户详情 
        var self = this;
        var param = {
          id: self.id
        }; 
        axios.post(self.html_url + self.Apilist.detailEmployee, param).then(function(data) {
          self.userinfo = data.data.data; 
          var url = self.userinfo.avatarCompressUrl;
          if(url==null||url==''){ 
            self.userinfo.avatarCompressUrl = "http://fttx-sale-staticsource.oss-cn-hangzhou.aliyuncs.com/test/mobile/static/image/head.png"; 
          }
        }).catch(function(e) {});
      }
    }
  }
</script>
<style scoped>
  h4{margin: 0;}
  .header {width: 50%;float: left;height: 200px;}
  .shenheBox {padding: 20px;min-height: 80px;font-size: 14px;}
  .workinfo {padding: 4px;background: #fff;text-align: left;font-size: 14px;
    line-height: 30px;padding: 5px;padding-bottom: 90px;}
  .workinfo label { color:#999;font-size: 14px;}
  .item_prop {width: 45%;float: left;}
  .item_prop_line {width: 100%;clear: both;}
  .mint-tab-item-label {font-size: 13px!important;}
</style>