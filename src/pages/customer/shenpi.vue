<template>
  <div class="pageBox shenpi">
    <mt-header title="审批申请删除" fixed>
      <mt-button icon="back" slot="left" @click.native="back">取消</mt-button>
      <mt-button slot="right" @click.native="submitShenpi" :disabled="isSubmit?true:false"> 提交审批 </mt-button>
    </mt-header>
    <div style="padding-top:40px;">
      <mt-radio title="审批意见：" v-model="shenpiYijian" :options="options" style='text-align:left;height:114px;'>
      </mt-radio>
      <mt-field  label="" placeholder="审批驳回，需给出驳回原因5-200字符" type="textarea" rows="4" v-model="yijianDetail" style='background:#efefef;height: 120px;'> 
      </mt-field>
      <div>
        <span style="float:left;">外贸管理顾问：{{ saleManageName}}</span>
      </div>
      <div style="height:30px; margin-top:25px;">
        <span style="height:30px;display:inline-block; float:left;">申请删除原因：</span>
      </div>
      <div style="min-height:30px; border-bottom:1px solid gray;">
        {{deleteRemark}}
      </div>
      <div style="float:right; padding:4px; background:#efefef; text-align:left; font-size:14px"> 
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
import axios from 'axios';
export default {
  data() {
    return {
      shenpiYijian:'3',                 //审批意见
      yijianDetail:'',                  //审批理由
      id: this.$route.query.id,         //
      name: this.$route.query.name,     //
      options: [{
          label: '同意',
          value: '3'
        },
        {
          label: '驳回(必须填写理由)',
          value: '4'
        }
      ],
      saleManageName:"",                //外贸管理顾问
      deleteRemark:"",                  //申请删除原因
      isSubmit:false,                   //提交按钮是否可用
    }
  },
  mounted: function() {
    this.getDelDetail();
  },
  components: {
  },
  computed: {
  },
  methods: {
    back: function() {                //返回
      if (this.yijianDetail == '') {
        this.$router.push({ path: '/customerManager',query:{'type':'6'}});
      } else {
        MessageBox.confirm('离开此页编辑内容将不保存?').then(action => {
          this.$router.go(-1);
        });
      }
    },
    submitShenpi: function() {        //提交审批
      var self = this;
      if(this.shenpiYijian =='4'){
        if(this.yijianDetail == ""){
          MessageBox('提示', '请输入操作理由');
          return
        }else if(self.yijianDetail.length < 5 || self.yijianDetail.length > 200){
          MessageBox('提示', '审批驳回，需给出驳回原因5-200字符。');
          return
        }
      }
      if (this.shenpiYijian =='') {
        MessageBox('提示', '请选择审批状态');
        return
      }
      var param = {
        idListStr: self.id,
        checkStatus: self.shenpiYijian,
        checkRemark: self.yijianDetail,
        nameListStr: self.name ? self.name : ""
      };
      this.isSubmit = true;
      Indicator.open({
        text: '提交中...',
        spinnerType: 'fading-circle'
      });
      axios.post(self.html_url + self.Apilist.updateCheckCustom, param).then(function(data) { 
        MessageBox('提示','提交成功').then(action => {
          self.isSubmit = false;
          Indicator.close(); 
          self.$router.push({ path: '/customerManager',query:{'type':'4' }});
        });
      }).catch(function(e) {
        self.isSubmit = false;
        Indicator.close(); 
      });
    },
    getDelDetail: function() {      //审批详情
      var self = this;
      var param = {
        id: self.id,
      };
      axios.post(self.html_url + self.Apilist.selectCustomByParam, param).then(function(data) { 
        self.saleManageName = data.data.data.saleManageName;
        self.deleteRemark  = data.data.data.deleteRemark;
      }).catch(function(e) {});
    }
  }
}
</script>