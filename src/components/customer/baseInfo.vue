<template id="baseInfo">
  <div>
    <div style="text-align:left;">
      <div class="companyType" style="word-wrap:break-word;"><span class="labelcss">中文名称：</span>{{baseInfo.cName}}</div>
      <div class="companyType"> 
        <span class="labelcss">英文名称：</span>
        <span style="word-wrap: break-word;">{{baseInfo.eName==null||baseInfo.eName==''?"无":baseInfo.eName}}  </span>
      </div>
      <div class="companyType"> 
        <span class="labelcss">企业邮箱：</span>
        <span style="word-wrap:break-word;">{{baseInfo.email}} </span>
      </div>
      <div class="companyType"> 
        <span class="labelcss">客户主页：</span>
        {{baseInfo.homepage}} 
      </div>
      <div class="companyType"> 
        <span class="labelcss">地图坐标：</span>
        {{baseInfo.latitude}},{{baseInfo.longitude}}
      </div>
      <div class="companyType"> 
        <span class="labelcss">主营产品：</span>
        {{baseInfo.mainProductsName}} 
      </div>
      <div class="companyType"> 
        <span class="labelcss">年销售额：</span>
        {{baseInfo.sales|salesNum}} 
      </div>
      <div class="companyType"> 
        <span class="labelcss">公司规模：</span>
        {{baseInfo.companySize|companySize}}    
        <span v-show="baseInfo.companySize!=null&&baseInfo.companySize!=''">(人)</span>  
      </div>
      <div class="companyType"> 
        <span class="labelcss">联系电话1：</span>
        {{baseInfo.tel1}} 
        </div>
      <div class="companyType"> 
        <span class="labelcss">传真：</span>
        {{baseInfo.fax==null||baseInfo.fax==''?'无':baseInfo.fax}} 
      </div>
      <div class="companyType"> 
        <span class="labelcss">外贸管理顾问：</span>
        {{baseInfo.saleManageName==null||baseInfo.saleManageName==''?"无":baseInfo.saleManageName}} 
      </div>
      <div class="companyType"> 
        <span class="labelcss">销售客户类型：</span>
        {{baseInfo.customType|customerType}} 
      </div>
      <div class="companyType"> 
        <span class="labelcss">市场销售员：</span>
        {{baseInfo.salesmanName==null||baseInfo.salesmanName==''?"无":baseInfo.salesmanName}} 
      </div>
      <div class="companyType"> 
        <span class="labelcss">市场客户类型：</span>
        {{baseInfo.marketCustomType|customerType}}
      </div>
      <div class="companyType">  
        <span class="labelcss">维护工程师：</span>
        {{baseInfo.maintainName==null||baseInfo.maintainName==''?"无":baseInfo.maintainName}} 
      </div>
      <div class="companyType">  
        <span class="labelcss">实施工程师：</span>
        {{baseInfo.implementationName==null||baseInfo.implementationName==''?"无":baseInfo.implementationName}} 
      </div>
      <div class="companyType">  
        <span class="labelcss">最高级别：</span>
        {{baseInfo.highestLevelName==null||baseInfo.highestLevelName==''?"无":baseInfo.highestLevelName}} 
      </div>
      <div class="companyType">  
        <span class="labelcss">最新级别：</span>
        {{baseInfo.latestLevelName==null||baseInfo.latestLevelName==''?"无":baseInfo.latestLevelName}} 
      </div>
      <div class="companyType">  
        <span class="labelcss">营业执照：</span>
        <span v-if="baseInfo.bnusinessLicenseUrl==null"> 未上传营业执照！</span>
        <div v-else style="width: 100%;height:auto;">
          <img :src="baseInfo.bnusinessLicenseUrl" width="auto"  class="zhizhao" />
        </div>
      </div>
      <div class="companyType" style="word-wrap:break-word;">  
        <span class="labelcss">客户地址：</span>
        {{baseInfo.fullAdress}} 
      </div>
      <div class="companyType">  
        <span class="labelcss">邮编：</span>
        {{baseInfo.zipCode}} 
      </div>
      <div class="companyType" style="word-wrap:break-word;"> 
        <span class="labelcss">乘车路线：</span>
        <span style="word-wrap: break-word;">{{baseInfo.busRoute}}</span>
      </div>
      <div class="companyType">  
        <span class="labelcss">车费投入：</span>
        {{baseInfo.fare}}￥
      </div>
      <div class="companyType">  
        <span class="labelcss">客户来源：</span>
        {{baseInfo.customerSourceName==null||baseInfo.customerSourceName==''?"无":baseInfo.customerSourceName}} 
      </div>
      <div class="companyType">  
        <span class="labelcss">软件状况：</span>
        {{baseInfo.useSoftName==null||baseInfo.useSoftName==''?"无":baseInfo.useSoftName}} 
      </div>
      <div class="companyType">  
        <span class="labelcss">购买模块：</span>
        {{baseInfo.purchaseName==null||baseInfo.purchaseName==''?"无":baseInfo.purchaseName}} 
      </div>
      <div class="companyType" style="word-wrap:break-word;">
        <span class="labelcss">备注：</span>
        {{baseInfo.remark==null||baseInfo.remark==''?"无":baseInfo.remark}}
        </div>
      <div class="companyType">  
        <span class="labelcss">建卡日期：</span>
        {{baseInfo.gmtCreate|TimeCut}} 
      </div>
    </div>
    <div style=" margin:0 auto;width:60px" v-show='loading'>
      <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto"></mt-spinner>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return { 
      baseInfo: {},         //客户基本信息
      loading:false,        //加载中
    }
  },
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  mounted: function() {
    this.getBaseInfo();
  },
  methods: {
    getBaseInfo: function() {
      this.loading = true;
      var self = this; 
      axios.post(self.html_url + self.Apilist.selectCustomByParam, { id: self.id }).then(function(data) {
        self.baseInfo = data.data.data;
        self.loading = false;
      }).catch(function(e) {self.loading = false;});
    },
  }
}
</script>
<style scoped>
  .companyType {width: 100%; font-size: 14px; line-height: 30px;word-wrap:break-word;}
  .labelcss{color:#999;font-size: 14px;}
  .zhizhao{max-height: 240px;margin:auto; width: 92%;display: block;}
</style>