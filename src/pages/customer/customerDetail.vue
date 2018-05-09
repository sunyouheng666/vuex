<template>
  <div class="pageBox">
    <mt-header title="客户管理" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      <mt-button slot="right" @click.native="dialogFormDelete=true" style="margin-right:6px" v-show="selected==1">
        申请删除
      </mt-button>
      <mt-button slot="right" @click.native="addContact" style="margin-right:6px" v-show="selected==2">
        <span style="font-size: 18px;">+</span>  
        新增联系人
      </mt-button>
      <mt-button slot="right" @click.native="addJournalClick" style="margin-right:6px" v-show="selected==4&&postType!=1">
        <span style="font-size: 18px;">+</span>  
        新增日志
      </mt-button>
      <mt-button slot="right" @click.native="addMarketClick" style="margin-right:6px" v-show="selected==9&&postType!=2">
        <span style="font-size: 18px;">+</span>  
        新增日志
      </mt-button>
      <mt-button slot="right" @click.native="addEngineeringClick" style="margin-right:6px" v-show="selected==10">
        <span style="font-size: 18px;">+</span>  
        新增日志
      </mt-button>
    </mt-header>
    <div style="padding-top:39px;">
      <div style="width:auto; overflow:scroll;">
        <mt-navbar v-model="selected" class='tabNav'>
          <mt-tab-item id="1" @click.native='visibalBaseInfo'>基本信息</mt-tab-item>
          <mt-tab-item id="2" @click.native='visibalContact'>联系人</mt-tab-item>
          <mt-tab-item id="3" @click.native='visibalCard'>客户名片</mt-tab-item>
          <mt-tab-item id="4" @click.native='visibalRizhi'>销售日志</mt-tab-item>
          <mt-tab-item id="9" @click.native='visibalMarket'>市场日志</mt-tab-item>
          <mt-tab-item id="10" >工程日志</mt-tab-item>
          <mt-tab-item id="11" >合同款项</mt-tab-item>
          <mt-tab-item id="5" @click.native='visibalEmail'>往来邮件</mt-tab-item>
          <mt-tab-item id="6" @click.native='visibalPhone'>网络电话</mt-tab-item>
          <mt-tab-item id="7" @click.native='visibalEditRecorder'>修改记录</mt-tab-item>
          <mt-tab-item id="8" @click.native='visibalBanshichu'>办事处</mt-tab-item>
        </mt-navbar>
      </div>
      <div style="margin:2px 4px;">
        <mt-tab-container v-model="selected" style="margin-top: 3px;">
          <mt-tab-container-item id="1">
            <div v-if="showBaseInfo">
              <baseInfo :id="customerId"></baseInfo>
              <!-- 基本信息 -->
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <div v-if="showContact">
              <contacter :id="customerId"></contacter>
              <!-- 联系人 -->
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <div v-if="showCard" >
              <card :id="customerId"></card>
              <!-- 客户名片 -->
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="4">
            <div v-if="showRizhi">
              <saleJournal :id="customerId"></saleJournal>
              <!-- 销售日志 -->
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="5">
            <div v-if="showEmail">
              <wanglaiMail :id="customerId"></wanglaiMail>
              <!-- 往来邮件 -->
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="6">
            <div v-if="showPhone">
              <phone :id="customerId"></phone>
              <!-- 网络电话 -->
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="7">
            <div v-if="showEditRecorder">
              <editHistory :id="customerId"></editHistory>
              <!-- 修改记录 -->
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="8">
            <div v-if="showBanshichu">
              <banshichu :id="customerId"></banshichu>
              <!-- 办事处 -->
            </div>
          </mt-tab-container-item>
          <!-- 市场日志 -->
          <mt-tab-container-item id="9">
            <div v-if="showMarket">
              <marketJournal :id="customerId"></marketJournal>
            </div>
          </mt-tab-container-item>
          <!-- 工程日志 -->
          <mt-tab-container-item id="10">
            <div v-show="selected == '10'">
              <vEngineering :customerName="customerName" > </vEngineering>
            </div>
          </mt-tab-container-item>
          <!-- 款项查询 -->
          <mt-tab-container-item id="11">
            <div v-if="selected == '11'">
              <vMoney :customId="customerId"></vMoney>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
    </div>
    <mt-popup v-model="showAddContact" position="right" style="width:80%;height:100%;overflow-y:scroll">
      <contactswidget :customerId="customerId" @closeContactsWidget="closeContactsWidget"></contactswidget>   
    </mt-popup>
    <!-- 申请删除 -->
    <mt-popup v-model="dialogFormDelete" position="bottom" style="width:100%;height:210px;">
      <div class="title-pop">
        申请删除
        <mt-button @click.native="deleteCustom" style="padding:0 5px;float: right;margin-right: 6px;font-size: 14px;height:26px;margin-top: 3px;">
          确定
        </mt-button>
      </div>
      <mt-field label="" placeholder="请输入删除原因（5-200）" type="textarea" rows="4" v-model="deleteTextarea" style="height:140px; margin-top:20px " :attr="{ maxlength: 200 }" >
      </mt-field>
    </mt-popup>
  </div>
</template>
<script>
import axios from 'axios';
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
import vMoney from '../../components/customer/money.vue';
import vEngineering from '../../components/customer/engineering.vue';
export default {
  data() {
    return {
      customerId: '',           //客户ID
      selected: '1',            //标签页ID
      showBanshichu: false,     //办事处显示
      showPhone: false,         //网络电话显示
      showEmail: false,         //往来邮件显示
      showRizhi: false,         //销售日志显示
      showMarket:false,         //市场日志显示
      showCard: false,          //客户名片显示
      showContact: false,       //联系人显示
      showEditRecorder: false,  //修改记录显示
      showBaseInfo: true,       //基本信息显示
      tapNum : "",              //返回标签页id
      customerName:"",          //客户名字
      showAddContact: false,    //联系人弹框
      postType:"",              //登录人岗位类型
      dialogFormDelete:false,   //申请删除弹框
      deleteTextarea:"",        //删除原因
    }
  },
  watch:{
  },
  mounted: function() {
  },
  components: {
    vMoney,vEngineering
  },
  computed: {
  },
  created:function(){
    this.tapNum = this.$route.query.pageType; 
    if(this.$route.query.type != undefined){
      this.selected = this.$route.query.type; 
    }
    this.customerId = String(this.$route.query.customerId); 
    if (this.customerId!= undefined&&this.customerId!= '') {
      this.getCustomeDetail();
    } 
    let list = JSON.parse(localStorage.userInfo);
    this.postType = list.postType;
  },
  methods: {
    visibalBaseInfo: function() {       //基本信息点击
      this.showBaseInfo = true;
      this.showBanshichu = false;
      this.showPhone = false;
      this.showEmail = false;
      this.showRizhi = false;
      this.showCard = false;
      this.showContact = false;
      this.showEditRecorder = false;
      this.showMarket = false;
    },
    visibalContact: function() {        //联系人点击
      this.showBanshichu = false;
      this.showPhone = false;
      this.showEmail = false;
      this.showRizhi = false;
      this.showCard = false;
      this.showContact = true;
      this.showEditRecorder = false;
      this.showBaseInfo = false;
      this.showMarket = false;
    },
    visibalEditRecorder: function() {   //修改记录点击
      this.showBanshichu = false;
      this.showPhone = false;
      this.showEmail = false;
      this.showRizhi = false;
      this.showCard = false;
      this.showContact = false;
      this.showEditRecorder = true;
      this.showBaseInfo = false;
      this.showMarket = false;
    },
    visibalCard: function() {           //客户名片点击
      this.showBanshichu = false;
      this.showPhone = false;
      this.showEmail = false;
      this.showRizhi = false;
      this.showCard = true;
      this.showContact = false;
      this.showEditRecorder = false;
      this.showBaseInfo = false;
      this.showMarket = false;
    },
    visibalRizhi: function() {          //销售日志点击
      this.showBanshthisichu = false;
      this.showPhone = false;
      this.showEmail = false;
      this.showRizhi = true;
      this.showCard = false;
      this.showContact = false;
      this.showEditRecorder = false;
      this.showBaseInfo = false;
      this.showMarket = false;
    },
    visibalMarket(){                    //市场日志点击
      this.showMarket = true;
      this.showBanshichu = false;
      this.showPhone = false;
      this.showEmail = false;
      this.showRizhi = false;
      this.showCard = false;
      this.showContact = false;
      this.showEditRecorder = false;
      this.showBaseInfo = false;
    },
    visibalEmail: function() {          //往来邮件点击
      this.showBanshichu = false;
      this.showPhone = false;
      this.showEmail = true;
      this.showRizhi = false;
      this.showCard = false;
      this.showContact = false;
      this.showEditRecorder = false;
      this.showBaseInfo = false;
      this.showMarket = false;
    },
    visibalBanshichu: function() {      //办事处点击
      this.showBanshichu = true;
      this.showPhone = false;
      this.showEmail = false;
      this.showRizhi = false;
      this.showCard = false;
      this.showContact = false;
      this.showEditRecorder = false;
      this.showBaseInfo = false;
      this.showMarket = false;
    },
    visibalPhone: function() {          //网络电话点击
      this.showBanshichu = false;
      this.showPhone = true;
      this.showEmail = false;
      this.showRizhi = false;
      this.showCard = false;
      this.showContact = false;
      this.showEditRecorder = false;
      this.showBaseInfo = false;
      this.showMarket = false;
    },
    back: function() {                  //返回
      if ( String(this.$route.query.from)=='map') {
        window.salePhone.CloseCurrentWebview("");
      }else{
        if(this.tapNum == undefined){
          this.$router.go(-1);
        }else{
          this.$router.push({ path: '/customerManager',query: {'type':this.tapNum }});
        }
      }  
    },
    deleteCustom(){                 //删除客户
      if(this.deleteTextarea.length<5){
            MessageBox.alert('删除原因不能少于5个字符','提示');
        }else{
            let me = this;
            let param = {
                "idListStr":this.customerId,
                "deleteRemark":this.deleteTextarea,
                "nameListStr":this.customerName
            };
            axios.post(this.html_url +this.Apilist.deleteSignCustom, param).then(function(data) {
                let list = data.data;
                MessageBox('提示','申请删除成功！');
                me.deleteTextarea='';
                me.back();
            }).catch(function(e) { });
            this.dialogFormDelete = false;      //关闭窗口
            this.deleteTextarea = "";           //清空内容
        }   
    },
    addJournalClick(){                  //新增销售日志
      this.$router.push({ path: '/saleJournal',query: {'customerId':this.customerId,'customerName':this.customerName,'from':'web'}});
    },
    addMarketClick(){                   //新增市场日志
      this.$router.push({ path: '/saleJournal',query: {'customerId':this.customerId,'customerName':this.customerName,'tabType':'4','from':'web'}});
    },
    addEngineeringClick(){
      this.$router.push({ path: '/writeEngineering',query: {'customerId':this.customerId,'customerName':this.customerName,'tabType':'4','from':'web'}});
    },
    getCustomeDetail(){                 //获取客户详情
      if(this.customerId != ''){
        var self = this; 
        axios.post(self.html_url + self.Apilist.selectCustomByParam, { id: self.customerId }).then(function(data) {
          self.customerName = data.data.data.cName;  
        }).catch(function(e) {});
      }
    },
    addContact: function() {            //添加联系人
      var self = this;
      if (self.customerId && self.customerId != '') {
        this.showAddContact = true;
      } else {
        MessageBox.alert('请先选择客户','提示');
      }
    },
    closeContactsWidget(){              //关闭联系人
      this.showAddContact = false;
      this.visibalBaseInfo();
      let me = this;
      setTimeout(function() {
        me.visibalContact();
      }, 50);
    }
  }
}
</script>
<style scoped>
  .tabNav {width: 612px;background: #efefef;font-size: 15px;height:30px;line-height: 30px; margin-top:3px;}
</style>
<style>
  .tabNav .mint-tab-item .mint-tab-item-label{padding:0 4px!important; width: 68px!important;height:29px;line-height:29px;}

</style>