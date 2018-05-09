<template id="wanglaiMail">
  <!-- 菜单 -->
  <div class="mint-navbar-customer">
    <mt-navbar v-model="mailType" style='font-size:15px; padding:0px;'>
      <mt-tab-item id="21" style='font-size:14px;padding: 6px 0;'>全部邮件</mt-tab-item>
      <mt-tab-item id="22" style='font-size:14px;padding: 6px 0;'>我发送的</mt-tab-item>
      <mt-tab-item id="23" style='font-size:14px;padding: 6px 0;'>我接收的</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="mailType">
      <!-- 全部邮箱 -->
      <mt-tab-container-item id="21" >
        <maillist :boxId="-1" :pageSize="10" :listType='customerMail' :customerId='id' :isWanglai='wanglai' :wanglaiType='typeAll'>
        </maillist>
      </mt-tab-container-item>
      <!-- 我发送的 -->
      <mt-tab-container-item id="22">
        <maillist :boxId="-5" :pageSize="10" :listType='customerMail' :customerId='id' :isWanglai='wanglai' :wanglaiType='typeSend'>
        </maillist>
      </mt-tab-container-item>
      <!-- 我接收的 -->
      <mt-tab-container-item id="23">
        <maillist :boxId="-1" :pageSize="10" :listType='customerMail' :customerId='id' :isWanglai='wanglai' :wanglaiType='typeReceive'>
        </maillist>
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      typeReceive:3,        //我收到的。
      typeSend:2,           //我发送的。
      typeAll:1,            // 全部
      mailType: '21',
      wanglai:true,
      customerMail:'customerMail'
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    },
    mailId: {
      type: Number,
      default: 0
    },
    boxId: {
      type: Number,
      default: -1
    },
    operType: {
      type: String,
      default: 'forward'
    },
  },
  mounted: function() {
  },
  methods: { 
  }
}
</script>
<style scoped>
  .mint-navbar-customer .mint-tab-item{padding:0;}
</style>