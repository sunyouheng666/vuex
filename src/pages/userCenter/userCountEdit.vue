<template>
  <div class="pageBox">
    <mt-header title="邮件账号编辑" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div style="padding-top:39px; font-size:14px;">
      <mt-field label="Email:" placeholder="请输入Email" type="text" v-model="email" :attr="{ maxlength: 100 }"><span class="required">*</span></mt-field>
      <mt-field label="密码:" placeholder="请输入密码" type="password" v-model="password"><span class="required">*</span></mt-field>
      <mt-field label="昵称:" placeholder="请输入昵称" type="text" v-model="niCheng"></mt-field>
      <div class="gd">接收服务器类型：POP3</div>
      <mt-field label="收件服务器:" placeholder="请输入收件服务器" v-model="receiveServer"><span class="required">*</span></mt-field>
      <mt-checklist title="" v-model="pop3sslval" :options="pop3ssl" style="text-align:left;">
      </mt-checklist>
      <mt-field label="端口:" placeholder=" 请输入端口" type="text" v-model="port" style=""><span class="required">*</span></mt-field>
      <div class="gd"> </div>
      <mt-field label="发件服务器:" placeholder="请输入发件服务器" v-model="sendServer"><span class="required">*</span></mt-field>
      <mt-checklist title="" v-model="smtpsslval" :options="smtpssl" style="text-align:left;">
      </mt-checklist>
      <mt-field label="端口:" placeholder=" 请输入端口" type="text" v-model="port2" class="borderRed"><span class="required">*</span></mt-field>
      <mt-button type="default" class="save" @click="save">保存</mt-button>
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
        port: '',
        port2: '',
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
        this.getAccount();
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
      getAccount: function() {
        let self = this;
        var param = {id:this.$route.query.id}
        axios.post(self.html_url + self.Apilist.selectAccountDetail, param).then(function(data) {
          var accountDetail = data.data.data;
          self.port = accountDetail.popPort;
          self.port2 = accountDetail.smtpPort;
          self.receiveServer = accountDetail.popServer;
          self.sendServer = accountDetail.smtpServer;
          self.email = accountDetail.account;
          self.password = accountDetail.passwd;
          self.niCheng =  accountDetail.name;
          self.pop3sslval = accountDetail.popSsl==1?[1]:[];
          self.smtpsslval = accountDetail.smtpSsl==1?[1]:[];
        }).catch(function(e) {});
      },
      save: function() {
        let self = this;
        if (this.validateForm()) {
          var popSsl = 0,
            smtpSsl = 0;
          if (String(this.port).length > 0) {
            popSsl = this.pop3sslval[0]; 
          }
          if (String(this.port2).length > 0) {
            smtpSsl = this.smtpsslval[0];
          }
          var param = {//----------------这里应该有个id 
            id:this.$route.query.id,
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
          axios.post(self.html_url + self.Apilist.updateAccount, param).then(function(data) { 
            let list = data.data;
            Toast({
              message: '更新成功',
            });
          }).catch(function(e) {});
        }
      }
    }
  }
</script>
<style scoped>
  .gd {padding: 2px;text-align: left;background: #d3e8f8;line-height: 30px}
  .save {background: #5e67fc; color: #fff;width: 100%;margin-top: 10px;}
  .required {display: inline-block;line-height: 52px; height: 46px;color: red;}
</style>
