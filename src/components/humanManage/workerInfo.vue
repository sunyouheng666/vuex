<template id="workerInfo">
  <div class="pageBox">
    <mt-header title="审核详情页" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div style="padding-top:40px;">
      <div class="line"></div>
      <div class="shenheBox">
        <h4 style="text-align:left; margin-top:0px; margin-bottom:10px;">审核结果：</h4>
        <div style="text-align:left;  text-indent:30px;  ">
          {{shenHe(workDetail.checkFlag)}}
          <p> {{workDetail.checkRemark}}</p>
        </div>
        <div style="text-align:right; font-size:13px;">
          审核时间：{{workDetail.checkTime | TimeCut}}
        </div>
      </div>
      <div class="line"></div>
      <div class="workinfo">
        <h4>基本信息：</h4>
        <div class="item_prop_line">
          <label>姓名：</label>
          <span>{{ workDetail.name}}</span>
        </div>
        <div class="item_prop">
          <label>生日：</label>
          <span>{{ workDetail.birthday | TimeCut}}</span>
        </div>
        <div class="item_prop">
          <label>姓别：</label>
          <span>{{ workDetail.sex==1?"男":"女"}}</span>
        </div>
        <div class="item_prop_line">
          <label>手机:</label>
          <span>{{ workDetail.telephone}}</span>
        </div>
        <div class="item_prop_line">
          <label>微信昵称：</label>
          <span>{{ workDetail.nickname}}</span>
        </div>
        <div class="item_prop_line">
          <label>邮箱：</label>
          <span>{{ workDetail.email}}</span>
        </div>
        <div class="item_prop_line">
          <label>住址：</label>
          <span>{{ workDetail.address}}</span>
        </div>
        <div class="item_prop_line">
          <label>身份证号：</label>
          <span>{{ workDetail.idNumber}}</span>
        </div>
        <div class="cardImg">
          <img :src="workDetail.idNumberImage1Url" width="100%" height="100%" style="vertical-align:middle;">
        </div>
        <div class="cardImg">
          <img :src="workDetail.idNumberImage2Url" width="100%" height="100%" style="vertical-align:middle;">
        </div>
        <div class="cardImg">
          <img :src="workDetail.idNumberImage3Url" width="100%" height="100%" style="vertical-align:middle;">
        </div>
        <div class="clear"></div>
        <div class="line" style="margin-top:5px;"></div>
        <h4>任职信息：</h4>
        <div class="item_prop">
          <label>办事处：</label>
          <span>{{ workDetail.officeName}}</span>
        </div>
        <div class="item_prop">
          <label>部门：</label>
          <span>{{ workDetail.departmentName}}</span>
        </div>
        <div class="item_prop">
          <label>岗位：</label>
          <span>{{ workDetail.postName}}</span>
        </div>
        <div class="clear"></div>
        <div class="line"></div>
        <div class="item_prop_line">
          <h4>账户信息：</h4>
        </div>
        <div class="item_prop_line">
          <label>登录名：</label>
          <span>{{ workDetail.alias}}</span>
        </div>
        <div class="item_prop_line">
          <label>登录密码：</label>
          <span>******</span>
        </div>
        <div class="item_prop_line">
        </div>
      </div>
    </div>
    <!-- 菜单 -->
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      workDetail: {},
      shenQing:this.$route.query.shenQing,
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    },
  },
  mounted: function() {
    this.getDetail()
  },
  components: {
  },
  computed: {
  },
  methods: {
    getDetail: function() { 
      var self = this; 
      axios.post(self.html_url + self.Apilist.detailEmployee, {id:self.id}).then(function(data) {
        self.workDetail = data.data.data;
      }).catch(function(e) {});
    },
    show: function() {

    }, 
    back: function() { 
      this.$router.push({path: '/humanManage',query: {canShenHe: true,canQuanxian: true,shenQing: this.shenQing}});
    }, 
    shenHe:function(value){
      var status = ''; 
      switch(value) {
        case 1:
          status = "等待审核";
          break;
        case 2:
          status = "审核通过";
          break;
        case 3:
          status = "审核驳回"; 
      }
      return status
    }
  }
}
</script>
<style>
.mint-tab-item-label {
  font-size: 13px!important;
}
</style>
<style scoped>
  h4{margin: 0;}
  .shenheBox {padding: 10px 5px; min-height: 80px;font-size: 14px;}
  .workinfo {padding: 4px;background: #fff;text-align: left;font-size: 14px;
    line-height: 30px;padding: 5px; padding-bottom: 20px;}
  .workinfo label {color:#999;font-size: 14px;}
  .item_prop {width: 45%; float: left;}
  .item_prop_line { width: 100%; clear: both;}
  .mint-tab-item-label {font-size: 13px!important;}
</style>
