<template>
  <div class="pageBox">
    <mt-header title="邮件账号管理" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      <mt-button slot="right" @click.native="newAccount">增加</mt-button>
    </mt-header>
    <div style="padding-top:39px;">
      <div class="scfk">
        <span class="text-l">
        </span> 
        <span class="text-s">我的邮件账号</span> 
      </div>
      <div>
        <ul class="countlist">
          <li v-for="item in items" @click.stop="editAccount(item.id)">
            <h5 class='account' style="background:#f4f6f8;height:28px;line-height:28px;margin:10px 0; ">{{item.account}}</h5> 
            <span :class='item.defaultAccount|defaultClass' @click.stop="switchChange(item.id,item.flag)">是否默认 </span>
            <span :class='item.flag|status' @click.stop="lockEvent(item.id,item.flag,item.defaultAccount)">{{item.flag|isLock}}</span>
            <span class="del" @click.stop="DelEvent(item.id,item.defaultAccount)">删除</span>
            <div class="line" style="margin-top:5px;"></div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 菜单 -->
  </div>
</template>
<script>
  import axios from 'axios';
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        value: '',
        items: [],
      }
    },
    filters: {
      isLock: function(value) {
        if (value == 1) {
          return "启用"
        } else {
          return "停用"
        }
      },
      status: function(value) {
        if (value == 1) {
          return "unlock"
        } else {
          return "lock"
        }
      },
      defaultClass: function(value) {
        if (value == 1) { 
          return "defaultcss"
        } else {
          return "notdefaultcss"
        }
      },
    },
    mounted: function() {
      this.getData();
    },
    computed: {
    },
    methods: {
      editAccount: function(Id) {
        this.$router.push({path: '/userCountEdit',query: {id: Id }});
      },
      switchChange: function(id,isJinyong) { // 是否启用
        var self = this;
        var param = {
          id: id
        }
        if (isJinyong==0) {
          Toast({
            message: '禁用状态不能修改是否默认',
          });
        return
        }
        axios.post(self.html_url + self.Apilist.updateAccountDefaultSort, param).then(function(data) {
          Toast({
            message: '是否默认设置成功',
          });
          self.items = [];
          self.getData();
        }).catch(function(e) {});
      },
      DelEvent: function(id,defaultAccount) {
        var self = this;
        var param = {
          id: id
        };
        axios.post(self.html_url + self.Apilist.deleteAccount, param).then(function(data) {
          if(defaultAccount == 1){
            Toast({
              message: '默认账号被删除，请重新设置默认账号！',
            });
          }else{
            Toast({
              message: '删除成功',
            });
          }
          self.getData();
        }).catch(function(e) {});
      },
      lockEvent: function(id, flag,isdefault) {
        var self = this;
        if (isdefault==1) {
        Toast({
            message: '默认状态不能禁用',
          });
        return
        }
        var param = {
          id: id,
          flag: flag == 1 ? 0 : 1
        }
        axios.post(self.html_url + self.Apilist.updateAccountFlag, param).then(function(data) {
          Toast({
            message: '是否启用设置成功',
          });
          self.getData();
        }).catch(function(e) {});
      },
      getData: function() {
        var self = this;
        var param = {
        };
        axios.post(self.html_url + self.Apilist.selectAccountPagingList, param).then(function(data) {
          self.items = data.data.data;
        }).catch(function(e) {});
      },
      back: function() {
        this.$router.go(-1);
      },
      newAccount: function() {
        this.$router.push({ path: '/addAccount' });
      },
      goPower: function() {
        this.$router.push({ path: '/goPower' });
      }
    }
  }
</script>
<style scoped>
  h4{margin: 0; margin-top: 10px;}
  .notdefaultcss {background: url('../../../static/image/isnotdefault.png') left 6px no-repeat;width: 70px;height: 30px;display: inline-block;line-height: 30px;font-size: 13px;padding-left:12px;}
  .defaultcss {background: url('../../../static/image/isdefault.png') left 6px no-repeat;width: 70px;height: 30px;display: inline-block;line-height: 30px;font-size: 13px;padding-left:12px}
  .lock {background: url('../../../static/image/lock001.png') 5px 6px no-repeat;width: 40px;padding-left: 20px;height: 30px;display: inline-block;line-height: 30px;font-size: 13px;}
  .unlock {background: url('../../../static/image/lock002.png') 5px 6px no-repeat;width: 40px;padding-left: 20px;height: 30px;display: inline-block;line-height: 30px;font-size: 13px;}
  .del {background: url('../../../static/image/delete001.png') 2px 6px no-repeat;width: 40px;height: 30px;display: inline-block;line-height: 30px;font-size: 13px; padding-left: 20px;}
  .countlist {list-style: none;padding: 0px;}
  .countlist li { display: block;padding: 5px;margin-bottom: 5px;border-radius: 5px;;padding-bottom: 4px;background: #fff;}
  .scfk {height: 40px;line-height: 40px;text-align:left;padding:0 8px;color: #000;font-size: 14px;vertical-align: bottom; }
  .scfk .text-l{background: #5e67fc; color:#5e67fc;padding:3px 2px;margin-right:4px;vertical-align: bottom;}
  .scfk .text-s{font-size: 16px;font-weight: 900;vertical-align: bottom;}
</style>
