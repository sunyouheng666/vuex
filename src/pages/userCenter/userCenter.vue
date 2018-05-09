<template>
  <div class="pageBox">
    <mt-header title="个人中心" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div style="padding-top:39px;">
      <div class="workinfo">
        <h4>员工基本信息：</h4>
        <div class="myInfo" @click="goDetail(userInfo.employeeId)">
          <div class="header">
            <img :src="userInfo.avatarCompressUrl" width="80%" height="100%" style="vertical-align:middle;margin:5px">
          </div>
          <div style="float:right;width:60%;padding:10px 0">
            <div class="item_prop_line">
              <span class='label'>姓名：{{userInfo.employeeName}}</span>
            </div>
            <div class="item_prop_line">
              <span class='label'>电话：{{userInfo.employeeTelephone}}</span>
            </div>
            <div class="item_prop_line"> 
              <span class="label">邮箱：{{userInfo.employeeEmail}}</span>
            </div>
            <div class="item_prop_line">
              <span class='label'>办事处：{{userInfo.officeName}}</span>
            </div>
            <div class="item_prop_line">
              <span class='label'>部门：{{userInfo.departmentName}}</span>
            </div>
            <div class="item_prop_line">
              <span class='label'>岗位：{{userInfo.postName}}</span>
            </div>
          </div>
          <div style="clear:both"></div>
        </div>
        <div style="clear:both"></div>
        <h4>功能设置：</h4>
        <mt-button type="default" style="background:#5e67fc; color:#fff; width:100%" @click='goAccount' v-show="canManageCount">
          邮箱账号管理
        </mt-button>
        <div style="clear:both;height:20px"></div>
        <mt-button type="default" style="background:#5e67fc; color:#fff;width:100%" @click='editPwd'> 
          修改密码
        </mt-button>
        <div style="clear:both;height:20px"></div>
        <mt-button type="default" style="background:#5e67fc; color:#fff;width:100%"  @click.native='logout'>
          退出
        </mt-button>
      </div>
    </div>
    <!-- 菜单 -->
  </div>
</template>
<script>
  export default {
    data() {
      return {
        canManageCount:this.$route.query.canManageCount,
        userInfo: JSON.parse(localStorage.userInfo),
      }
    },
    mounted: function() {
      this.getData();
    },
    watch:{
      'userInfo.avatarCompressUrl':function(n,o){
        if(n==''||n==null){
          this.userInfo.avatarCompressUrl = "http://fttx-sale-staticsource.oss-cn-hangzhou.aliyuncs.com/test/mobile/static/image/head.png";
        }
      }
    },
    computed: {

    },
    methods: {
      getData: function() {
        if(this.userInfo.avatarCompressUrl==''||this.userInfo.avatarCompressUrl==null){
          this.userInfo.avatarCompressUrl = "http://fttx-sale-staticsource.oss-cn-hangzhou.aliyuncs.com/test/mobile/static/image/head.png";
        }
      },
      goAccount: function() {
        this.$router.push({ path: '/userCount' });
      },
      goFanwei: function() {
        this.$router.push({ path: '/setFanwei' });
      },
      goDetail: function(Id) {
        this.$router.push({ path: '/userInfo', query: {id: Id } });
      },
      editPwd: function() {
        this.$router.push({ path: '/userPwEdit' });
      },
      back: function() {
        this.$router.go(-1)
      },
      logout: function() {
        this.$router.push({ path: '/Login' });
        localStorage.userInfo = undefined;
        // localStorage.clear();
        window.salePhone.clearHistory();
      }
    }
  }
</script>
<style scoped>
  h4{margin: 0}
  .myInfo {background: #fff;height: auto}
  .header {width: 40%;float: left;height: 160px;}
  .workinfo {padding: 4px;background: #f4f6f8;text-align: left;font-size: 14px;line-height: 30px;padding: 5px;padding-bottom: 90px;}
  .workinfo label {font-weight: bold;color: #5e67fc}
  .item_prop_line {width: 100%; clear: both;line-height: 25px; }
  .item_prop_line  .label{ overflow: hidden; text-overflow: ellipsis; white-space: nowrap;display: inline-block;width: 100%; }
</style>
