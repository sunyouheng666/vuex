<template>
  <div class="pageBox">
    <mt-header title="消息中心" fixed>
    </mt-header>
    <div>
      <div style="width:96%;margin:auto;margin-top:25%;">
        <img src="../../static/image/wait.png" style="width:100%;" alt="">
        功能开发中，敬请期待...
      </div>
    </div>
    <div class="footer">
      <div>
        <span>
          <img src="../../static/image/message.png" style="height:100%;" alt="">
        </span>
        <span @click="back">
          <img src="../../static/image/home-1.png" style="height:100%;" alt="">
        </span>
        <span @click="goNetphone">
          <img src="../../static/image/tel-1.png" style="height:100%;" alt="">
        </span>
        <span @click="goGPS">
          <img src="../../static/image/adress-1.png" style="height:100%;" alt="">
        </span>
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
        userInfo:{},

      }
    },
    beforeMount:function(){ 
    },
    created:function(){ 
      this.userInfo = JSON.parse(localStorage.userInfo);
    },
    methods: {
      goNetphone: function() {          //网络电话
        this.$router.push({ path: '/searchNetPhone' });
      },
      goGPS: function() {               //客户定位
        var self = this;
        var salesmanId = self.userInfo.employeeId;
        var sessionId = self.userInfo.sessionId;
        var param = {
          salesmanName: self.userInfo.employeeName,
          salesmanId: salesmanId,
          sessionId: sessionId
        };
        window.salePhone.goGPS(JSON.stringify(param));
      },
      back: function() {
        this.$router.push({ path: '/home' });
      },
    }
  }
</script>
<style scoped>
  .pageBox {padding: 40px 20px 50px;}
</style>