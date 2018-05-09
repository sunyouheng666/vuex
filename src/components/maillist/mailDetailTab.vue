<template id="mailDetailTab">
  <!-- 菜单 -->
  <div class="mailDetailTab">
    <mt-tabbar v-model="selected" fixed>
      <mt-tab-item id="bt_left" @click.native="fnLeft" class='tabStyle'>
        <span>
          <img slot="icon" src="../../../static/image/detail.png">
        </span>
        <span class="text">
          {{getLeftButtonName()}}
        </span>
      </mt-tab-item>
      <mt-tab-item id="bt_right" @click.native="fnRight" v-show="(this.boxId!=-5)&&(this.boxId!=-101)" >
        <span>
          <img slot="icon" src="../../../static/image/reply.png">
        </span>
        <span class="text">
          {{getRightButtonName()}}
        </span>
      </mt-tab-item>
    </mt-tabbar>
  </div>
</template>
<script>
import axios from 'axios';
import { Indicator } from 'mint-ui';
export default {
  data() {
    return {
      selected: 'bt_left',
    }
  },
  props: {
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
    // this.doReply();
  },
  methods: {
    getLeftButtonName() {
      if (this.boxId == -1) {
        return "转发";
      } else if (this.boxId == -5) {
        return "转发";
      }
      return "还原";
    },
    getRightButtonName() {
      if (this.boxId == -1) {
        return "回复";
      } else if (this.boxId == -5) {
        return "编辑";
      }
      return "删除";
    },
    fnLeft: function() { // button left
      var temp_path = '';
      if (this.boxId == -1 || this.boxId == -5) {
        temp_path = '/mailForward'; // 收件箱 发件箱 转发 
        this.$router.push({
          path: temp_path,
          query: {
            id: this.mailId,
            boxId: this.boxId,
            operType: 'forward'
          }
        })
      }
      if (this.boxId == -101) { 
          var self = this;
          var param = {
            idListStr: this.mailId,
            updateFlag: 2, //1表示删除到垃圾箱，2表示还原邮件
            boxId: -101 //当前箱子ID
          };
          Indicator.open('还原中...');
          axios.post(self.html_url + self.Apilist.updateEmail, param).then(function(data) {
             Indicator.close();
             self.$router.push({ path: '/dustbinbox' });
          }).catch(function(e) {});
        } 
    },
    fnRight: function() { // button right
      var temp_path = '',
        temp_operType = '';
      if (this.boxId == -1) {
        temp_path = '/mailReply'; // 收件箱 回复
        temp_operType = 'reply'
      } else if (this.boxId == -5) {
        temp_path = '/mailEdit'; // 发件箱 编辑
        temp_operType = 'edit'
      } else if (this.boxId == -101) {
        // delete it  垃圾箱 调用删除接口
        this.$router.go(-1);
        return
      }
      this.$router.push({
        path: temp_path,
        query: {
          id: this.mailId,
          boxId: this.boxId,
          operType: temp_operType
        }
      });
    },
  }
}
</script>
<style scoped>
  .tabStyle {border-right: 1px solid gray}
  .mailDetailTab img{height: 20px;vertical-align:middle;}
  .mailDetailTab .text{font-size: 14px!important;height:40px;vertical-align:middle;}
</style>
<style>
  .mailDetailTab .mint-tab-item{padding:0;}
  .mailDetailTab .mint-tabbar .is-selected{ margin-bottom:-3px!important;color:#5e67fc;}
</style>