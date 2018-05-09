<template>
  <div class="loginBox" >
    <img src="../../static/image/login.png" style="width:100%;" alt="">
    <div style="width:88%; height:300px;position:absolute; top:11%;left:6%;">
      <img src="../../static/image/logo.png" style="width:35%;" alt="">
      <h3 style="margin:0px 0px 15px 0px; color:#fff;font-weight:400;">中央业务运行平台管理系统</h3>
      <div style="background:#fff;border-radius:8px;width:100%;height:148px;padding:4px;border:2px solid #eee;padding-top:5px;">
        <mt-field placeholder="请输入用户名" v-model="ruleForm.alias">
          <img src="../../static/image/alias.png" style="height:24px;" alt="">
        </mt-field>
        <mt-field placeholder="请输入密码" type="password" v-model="ruleForm.password">
          <img src="../../static/image/passwordold.png" style="height:24px;" alt="">
        </mt-field>
        <mt-button  class='loginbtn' @click.native='submitForm'>登录</mt-button> 
      </div>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import axios from 'axios';
  import { Indicator } from 'mint-ui';
  export default {
    data() {
      return {
        isWaChat:true,        //是否微信验证
        unionid:'',           //微信ID
        ruleForm: {
          alias: '',          //用户名
          password: '',       //用户密码
        },
      }
    },
    beforeMount:function(){ 
      window.salePhone.clearHistory(); 
    },
    created:function(){ 
      this.getSize();
      if(window.location.hostname == 'localhost' || window.location.hostname == 'salecn.joinf.com'){
        this.isWaChat = false;
      }
    },
    methods: {
      getSize(){ 
        if(window.localStorage.alias !=undefined){
          this.ruleForm.alias = window.localStorage.alias;
          this.ruleForm.password = window.localStorage.password;
        }
        window.getScreenSize = function(size){
          localStorage.getScreenSize = size; 
        }
      }, 
      submitForm() {
        let self = this;
        if (self.ruleForm.alias=="") {
          MessageBox('提示', '请输入用户名');
          return  
        }
        if (self.ruleForm.password=="") {
          MessageBox('提示', '请输入密码');
          return  
        }
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        window.localStorage.alias = self.ruleForm.alias;
        window.localStorage.password = self.ruleForm.password;
        axios.post(self.html_url + self.Apilist.login, self.ruleForm).then(function(data) {  
          let list = data.data; 
          if(list.data.checkFlag == 3){
            Indicator.close();
            MessageBox('提示', '审核驳回，请在PC端完善申请资料');
            return  
          }
          localStorage.userInfo = JSON.stringify(list.data);
          if(self.isWaChat){
            window.salePhone.weChatLogin();
            window.weChatgetBack = function(param) {  
              setTimeout(function() {
                Indicator.close();
              }, 1500);
              if(param == '' || param == null || param == undefined  ){
                return
              }
              var jsonObj = JSON.parse(param);
              self.unionid = jsonObj.unionid; 
              self.wechatLoginQuery(self.unionid);
            } 
          }else{
            Indicator.close();
            self.$router.push({ path: '/home' });  
          } 
        }).catch(function(e) { Indicator.close(); });
      },
      wechatLoginQuery(){
        let self = this;
        axios.post(self.html_url + self.Apilist.wechatLoginQuery, {unionId:self.unionid}).then(function(data) { 
          self.$router.push({ path: '/home' });
        }).catch(function(e){
        }); 
      }
    }
  }
</script>
<style scoped>
  .loginBox {padding: 0;position: relative;}
  .loginbtn {width: 100%;background: #5966ff;color: #fff;}
  h1,h2 {font-weight: normal;}
  ul {list-style-type: none;padding: 0;}
  li {display: inline-block; margin: 0 10px;}
  a {color: #5966ff;}
  .mint-swipe {width: 100%; height: 280px;background: tan;}
</style>