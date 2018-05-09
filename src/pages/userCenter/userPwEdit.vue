<template>
  <div class="pageBox pwedit">
    <mt-header title="修改密码" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div style="padding-top:39px;">
      <mt-field label="" placeholder="请输入原密码" type="password" v-model="oldPassword">
      </mt-field>
      <mt-field label="" placeholder="请输入新密码(长度是8-20位)" type="password" v-model="newPassword">
      </mt-field>
      <mt-field label="" placeholder="请输入并确认新密码" type="password" v-model="newPassword2">
      </mt-field>
      <mt-button type="default" style="background:#5e67fc; color:#fff;width:95%" @click.native="save">保存</mt-button>
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
      oldPassword: '',
      newPassword: '',
      newPassword2: '',
    }
  },
  mounted: function() {
  },
  computed: {
  },
  methods: {
    back: function() {
      this.$router.go(-1)
    },
    save: function() {
      var self = this;
      if (self.newPassword.length < 8 || self.newPassword.length > 20) {
        MessageBox.alert('密码长度是8-20位','提示');
        return
      }
      if(!/^[a-zA-Z0-9]{8,20}$/g.test(self.newPassword)){
        MessageBox.alert('提示', '密码由字母与数字组成！','提示');
        return
      }
      if (self.newPassword == self.oldPassword) {
        MessageBox.alert('提示', '新密码和旧密码不能相同','提示');
        return
      }
      if (self.newPassword != self.newPassword2) {
        MessageBox.alert('提示', '两次输入的新密码不一致','提示');
        return
      }
      var param = {
        password: self.newPassword,
        oldPassword: self.oldPassword
      };
      axios.post(self.html_url + self.Apilist.updateEmployeePassword, param).then(function(data) {
        Toast({
          message: '修改密码成功',
          iconClass: 'icon icon-success'
        });
        self.$router.push({ path: '/login' });
        window.salePhone.clearHistory();
      }).catch(function(e) {});
    }
  }
}
</script>
<style scoped>
  .icon-success {background: url('../../../static/image/success.png') center center no-repeat;margin: 0 auto;}
</style>
<style>
  .pwedit .mint-field .mint-cell-title{text-align: left!important;}
  .pwedit input{background:#f4f6f8 url('../../../static/image/password.png') no-repeat left center; padding-left:25px; height:30px;line-height:32px;}
</style>