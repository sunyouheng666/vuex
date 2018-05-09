<template>
  <div class="pageBox shenHeRegister">
    <mt-header title="注册审核" fixed>
      <mt-button icon="back" slot="left" @click.native="back">取消</mt-button>
      <mt-button slot="right" @click.native="shenHeFn"> 确定审核 </mt-button>
    </mt-header>
    <div style="padding-top:40px;">
      <div class="line"></div>
      <mt-radio title="审核注册：" v-model="shenpiYijian" :options="options" style='text-align:left'>
      </mt-radio>
      <mt-field label="" :attr="{maxlength: 200 }" placeholder="输入驳回原因4-200字符。" type="textarea" rows="4" v-model="yijianDetail" style='height: 120px;background:#efefef;'>
      </mt-field>
      <div class="workinfo">
        <div class="line"></div>
        <h4>员工基本信息：</h4>
        <div class="item_prop_line">
          <label>姓名：</label>
          <span>{{ workDetail.name}}</span>
        </div>
        <div class="item_prop">
          <label>生日：</label>
          <span>{{ workDetail.birthday|TimeCut }}</span>
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
          <span style=" word-wrap : break-word ;">{{ workDetail.email}}</span>
        </div>
        <div class="item_prop_line">
          <label style=" word-wrap : break-word ;">住址：</label>
          <span>{{ workDetail.address}}</span>
        </div>
        <div class="item_prop_line">
          <label>身份证号：</label><span>{{ workDetail.idNumber}}</span></div>
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
        <h4>员工任职信息：</h4>
        <div class="item_prop">
          <label>办事处：</label><span>{{ workDetail.officeName}}</span></div>
        <div class="item_prop">
          <label>部门：</label><span>{{ workDetail.departmentName}}</span></div>
        <div class="item_prop">
          <label>岗位：</label><span>{{ workDetail.postName}}</span>
        </div>
        <div class="clear"></div>
        <div class="line"></div>
        <div class="item_prop_line">
          <h4>登录账户信息：</h4></div>
        <div class="item_prop">
          <label>登录名：</label><span>{{ workDetail.alias}}</span></div>
        <div class="item_prop">
          <label>登录密码：</label><span>******</span></div>
        <div class="item_prop_line">
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
      x:'',
      id: this.$route.query.id,
      shenpiYijian: '2',
      yijianDetail: '',
      workDetail: {},
      //---------------
      options: [{
          label: '同意',
          value: '2'
        },
        {
          label: '驳回(驳回需要给出驳回原因)',
          value: '3'
        }
      ],
    }
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
      axios.post(self.html_url + self.Apilist.detailEmployee, { id: self.id }).then(function(data) {
        self.workDetail = data.data.data;
      }).catch(function(e) {});
    },
    shenHeFn: function() {
      var self = this;
      var shenHeStatus = '';
      var liYou = '';
      if (this.shenpiYijian =='') {
        MessageBox('提示', '请选择审批状态');
        return
      }
      if (this.shenpiYijian =='3' && self.yijianDetail=="" ) {
        MessageBox('提示', '请输入操作理由');
        return
      }
      if ((this.shenpiYijian =='3' && self.yijianDetail.length<4 ) ||  (this.shenpiYijian =='3' && self.yijianDetail.length>200 )) {
        MessageBox('提示', '审核驳回，需给出驳回原因4-200字符');
        return
      }
      var param = {
        id: self.id,
        checkFlag: self.shenpiYijian,
        checkRemark: self.yijianDetail,
        flag: '2'
      };
      axios.post(self.html_url + self.Apilist.checkEmployee, param).then(function(data) {
        if(self.shenpiYijian == '2'){
          MessageBox.confirm('', {
            message: '注册审核成功，是否给员工配置功能权限',
            title: '',
            showConfirmButton:true,
            showCancelButton:true,
            cancelButtonClass:'cancelButton',
            confirmButtonClass:'confirmButton',
            confirmButtonText:'确定',
            cancelButtonText:'暂不设置'
          }).then(action => {
            if (action == 'confirm') {  //去设置权限
              self.$router.push({
                path: '/setPower',
                query: {
                  id: self.id,shenQing:'21'
                }
              });
            }
          }).catch(err => {
            if (err == 'cancel') {
              self.$router.push({path: '/humanManage',query: {canShenHe: true,canQuanxian: true,shenQing: '21'}});
            }
          });
        }else if(self.shenpiYijian == '3'){
          self.$router.push({path: '/humanManage',query: {canShenHe: true,canQuanxian: true,shenQing: '21'}});
        }
     })
    },
    back: function() {
        MessageBox.confirm('离开此页编辑内容将不保存?').then(action => {
          this.$router.push({path: '/humanManage',query: {canShenHe: true,canQuanxian: true,shenQing: '21'}});
        });
    },
    searchMail: function() {
      this.$router.push({ path: '/searchMail' });
    },
  }
}
</script>
<style scoped>
  h4{margin: 0;}
  .workinfo {padding: 4px;background: #fff;text-align: left;font-size: 14px;line-height: 30px;
    padding: 5px;padding-bottom: 20px;}
  .workinfo label {font-size: 14px;color: #999;}
  .item_prop {width: 45%;float: left;}
  .item_prop_line {width: 100%;clear: both;}
  .mint-tab-item-label {font-size: 13px!important;}
</style>
<style>
  .shenHeRegister .mint-cell-value .mint-field-core{background: #fff!important;}
</style>