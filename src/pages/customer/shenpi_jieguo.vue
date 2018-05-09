<template>
  <div class="pageBox">
    <mt-header title="删除审批" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div class="containbox">
      <div style="height:30px;">
        <span style="height:30px;display:inline-block; float:left;line-height:30px;">审批意见：{{checkStatus =='3'?'同意申请':'申请驳回'}}</span>
        <br />
      </div>
      <div class="spyj"> {{shenpiyijian}}</div>
      <div style="height:30px;margin-top:10px; border-bottom:1px dashed gray">
        <span style="float:right">外贸管理顾问：{{guwen}}</span>
      </div> 
      <div style="height:30px;margin-top:10px;">
        <span style="height:30px;display:inline-block; float:left;line-height:30px;">申请删除原因：</span>
        <br />
      </div>
      <div class="spyj"> 
        {{yuanyin}}
      </div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  export default {
    data() {
      return {
        id:this.$route.query.id,      //审批ID
        shenpiyijian:'',              //审批意见
        guwen:'',                     //外贸管理顾问
        yuanyin:'',                   //申请删除原因
        checkStatus:''                //审批结果
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
      back: function() {              //返回
        this.$router.push({ path: '/customerManager',query:{'type':'5'}});
      },
      getDelDetail: function() {      //获得审批详情
        var self = this;
        var param = { 
          id: self.id, 
        };
        axios.post(self.html_url + self.Apilist.selectCustomByParam, param).then(function(data) {
          var obj = data.data.data;
          self.shenpiyijian = obj.checkRemark;    
          self.checkStatus = obj.checkStatus;    
          self.guwen = obj.saleManageName;    
          self.yuanyin = obj.deleteRemark  
        }).catch(function(e) {

        });
      }
    }
  }
</script>
<style scoped>
  .pageBox{font-size: 14px;}
  .containbox{padding-top:40px;}
  .spyj{text-align:left;min-height:60px;text-indent:30px;line-height: 20px;} 
</style>