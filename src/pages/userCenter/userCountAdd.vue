<template>
  <div class="pageBox">
    <mt-header title="邮件账号添加" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div style="padding-top:39px; font-size:14px;">
      <mt-field label="Email:" placeholder="请输入Email" type="text" v-model="email">
        <span class="required">*</span>
      </mt-field>
      <mt-field label="密码:" placeholder="请输入密码" type="password" v-model="password">
        <span class="required">*</span>
      </mt-field>
      <mt-field label="昵称:" placeholder="请输入昵称" type="text" v-model="niCheng">
      </mt-field>
      <div class="line" style="margin-bottom:3px;"> </div>
      <div style="text-align: left;padding-left:20px;">接收服务器类型：POP3</div>
      <mt-field label="收件服务器:" placeholder="收件服务器pop3+域名" v-model="receiveServer">
        <span class="required">*</span>
      </mt-field>
      <mt-checklist title="" v-model="pop3sslval" :options="pop3ssl" style="text-align:left;">
      </mt-checklist>
      <mt-field label="端口:" placeholder=" 请输入端口" type="text" v-model="port">
        <span class="required">*</span>
      </mt-field>
      <div class="line"> </div>
      <mt-field label="发件服务器:" placeholder="发件服务器smtp+域名" v-model="sendServer">
        <span class="required">*</span>
      </mt-field>
      <mt-checklist title="" v-model="smtpsslval" :options="smtpssl" style="text-align:left;">
      </mt-checklist>
      <mt-field label="端口:" placeholder=" 请输入端口" type="text" v-model="port2" class="borderRed">
        <span class="required">*</span>
      </mt-field>
      <mt-button type="default" style="background: #5e67fc; color:#fff;width:100%" @click="save">
        保存
      </mt-button>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import axios from 'axios';
  export default {
    data() {
      return {
        pop3sslval: [],
        smtpsslval: [],
        port: '995',
        port2: '465',
        receiveServer: '',
        sendServer: '',
        email: '',
        password: '',
        niCheng: '',
        pop3ssl: [{
          label: 'SSL',
          value: '1'
        }],
        smtpssl: [{
          label: 'SSL',
          value: '1'
        }]
      }
    },
    mounted: function() {
    },
    computed: {
    },
    methods: {
      back: function() {
        MessageBox.confirm('离开此页编辑内容将不保存?').then(action => {
          this.$router.go(-1);
        });
      },
      goFanwei: function() {
        this.$router.push({ path: '/setFanwei' });
      },
      goPower: function() {
        this.$router.push({ path: '/goPower' });
      },
      checkMail(szMail) {
        var regStr = /^(\w-*\.*\+*)+@(\w-?)+(\.\w{2,})+$/;
        var bChk = regStr.test(szMail);
        return bChk
      },
      validateForm: function() {
        if (this.email == "") { 
          MessageBox('提示', '邮箱不能为空！');
          return false
        } else if (!this.checkMail(this.email)) {
          MessageBox('提示', '邮箱格式不正确！');
          return false
        }
        if (this.password == '') { 
          MessageBox('提示', '密码不能为空！');
          return false
        }
        if (this.receiveServer == '') { 
          MessageBox('提示', '收件服务器不能为空！');
          return false
        }
        if (this.sendServer == '') { 
          MessageBox('提示', '发件服务器不能为空！');
          return false
        }
        if (this.port == '') { 
          MessageBox('提示', '服务器端口不能为空！');
          return false
        }
        if (this.port2 == '') { 
          MessageBox('提示', '服务器端口不能为空！');
          return false
        }
        return true
      },
      save: function() {
        let self = this;
        if (this.validateForm()) { 
          var popSsl = 0,smtpSsl= 0;
          if (this.port.length>0) {
            popSsl = this.pop3sslval[0];
          }
          if (this.port2.length>0) {
            smtpSsl = this.smtpsslval[0];
          }
          var param = {
            account: this.email,
            passwd: this.password,
            name:this.niCheng,
            type: 2, //pop3
            defaultAccount: 0,
            popServer: this.receiveServer,
            popPort: this.port,
            popSsl: popSsl,
            smtpServer: this.sendServer,
            smtpPort: this.port2,
            smtpSsl: smtpSsl,
          };
          axios.post(self.html_url + self.Apilist.insertAccount, param).then(function(data) {
            let list = data.data;  
            Toast({
              message: '保存成功', 
            });
          }).catch(function(e) {});
        }
      }
    }
  }
</script>
<style scoped>
  .required {display: inline-block;line-height: 52px;height: 46px;color: red;}
  .header { width: 50%;float: left;height: 200px;}
  .shenheBox {padding: 20px;min-height: 80px;font-size: 14px;}
  .workinfo {padding: 4px;background: #efefef;text-align: left;font-size: 14px;line-height: 30px;padding: 5px;padding-bottom: 90px;}
  .workinfo label {font-weight: bold;color: #5e67fc}
  .item_prop {width: 45%;float: left;}
  .item_prop_line {width: 100%;clear: both;}
</style>