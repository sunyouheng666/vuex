<template>
  <div class="pageBox">
    <mt-header title="合同详情" fixed>
        <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <div style="margin-top: 44px;text-align: left;">
        <div class="companyName"> {{basicData.customName}}</div>
        <div class="companyType"><span class="labelcss">客户地址：</span>{{basicData.fullAdress || '无'}}</div>
        <div class="companyType"><span class="labelcss">总金额：</span>{{basicData.contractAmount || '无'}}</div>
        <div class="companyType"><span class="labelcss">已付金额：</span>{{basicData.paidAmount || '无'}}</div>
        <div class="companyType"><span class="labelcss">未付金额：</span>{{basicData.unpaidAmount || '无'}}</div>
        <div class="companyType"><span class="labelcss">外贸管理顾问：</span>{{basicData.saleManageName || '无'}}</div>
    </div>
    <div style="text-align: left;background: #e3e3e3;height:30px;line-height: 30px;margin-top: 4px;margin-bottom: 4px;">
        {{titleName}} （共{{titleNum}}个）
        <mt-button type="primary" size="small" style="height: 28px;line-height: 28px;float: right;background:#5e67fc;" @click.native='popupVisible=true'>      选择 
        </mt-button>
    </div>
    <!-- 软件内容 -->
    <div>
        <cswidget v-if="tabType==1" ref="cswidget" :customId="customId" @cswidgetClick="cswidgetClick"></cswidget>
        <saaswidget v-if="tabType==2" ref="saaswidget" :customId="customId" @cswidgetClick="cswidgetClick"></saaswidget>
        <customwidget v-if="tabType==3" ref="customwidget" :customId="customId" @cswidgetClick="cswidgetClick"></customwidget>
        <appwidget v-if="tabType==4" ref="appwidget" :customId="customId" @cswidgetClick="cswidgetClick"></appwidget>
        <equiwidget v-if="tabType==5" ref="equiwidget" :customId="customId" @cswidgetClick="cswidgetClick"></equiwidget>
        <maintainwidget v-if="tabType==6" ref="maintainwidget" :customId="customId" @cswidgetClick="cswidgetClick"></maintainwidget>
        <invoicewidget v-if="tabType==7" ref="invoicewidget" :customId="customId" @cswidgetClick="cswidgetClick"></invoicewidget>
        <checkwidget v-if="tabType==8" ref="checkwidget" :customId="customId" @cswidgetClick="cswidgetClick"></checkwidget>
    </div>
    <mt-popup  v-model="popupVisible"  position="right">
        <div style="height:40px;line-height: 40px;background: #5e67fc;color:#fff;">
            合同类型
        </div>
        <div @click="closedPopupVisible('CS软件','1')" class="list" :class="tabType==1?'list-active':''">
            CS软件
        </div>
        <div @click="closedPopupVisible('营销合同','2')" class="list" :class="tabType==2?'list-active':''">
            营销合同
        </div>
        <div @click="closedPopupVisible('定制开发','3')" class="list" :class="tabType==3?'list-active':''">
            定制开发
        </div>
        <div @click="closedPopupVisible('移动APP','4')" class="list" :class="tabType==4?'list-active':''">
            移动APP
        </div>
        <div @click="closedPopupVisible('设备','5')" class="list" :class="tabType==5?'list-active':''">
            设备
        </div>
        <div @click="closedPopupVisible('维护','6')" class="list" :class="tabType==6?'list-active':''">
            维护
        </div>
        <div @click="closedPopupVisible('发票情况','7')" class="list" :class="tabType==7?'list-active':''">
            发票情况
        </div>
        <div v-show="maintainShow" @click="closedPopupVisible('实施验收','8')" class="list" :class="tabType==8?'list-active':''">
            实施验收
        </div>
    </mt-popup>
  </div>
</template>
<script>
import axios from 'axios';
import cswidget from '../../components/contractwidget/cswidget.vue';
import saaswidget from '../../components/contractwidget/saaswidget.vue';
import maintainwidget from '../../components/contractwidget/maintainwidget.vue';
import invoicewidget from '../../components/contractwidget/invoicewidget.vue';
import equiwidget from '../../components/contractwidget/equiwidget.vue';
import customwidget from '../../components/contractwidget/customwidget.vue';
import checkwidget from '../../components/contractwidget/checkwidget.vue';
import appwidget from '../../components/contractwidget/appwidget.vue';
import { MessageBox } from 'mint-ui';
import { Indicator } from 'mint-ui';
export default {
    data() {
        return {
            customId: '0',           //客户ID
            customerName:"",          //客户名字
            selected:"",
            basicData:{
                customName:"",
                fullAdress : '',
                paidAmount : '',
                unpaidAmount : '',
                contractAmount : '',
            },
            titleName:"",
            titleNum:"0",
            tabType:'',
            loading: false,
            customerList: [],
            totalPage: 1,
            loadAll: false,
            currentPage: 1,
            pageSize: 10,
            noData:false,
            popupVisible:false,             //选择功能
            maintainShow:false,             //实施验收显示隐藏
        }
    },
    watch:{
    },
    mounted: function() {
        this.init();
        this.selectContract();
    },
    components: {
        cswidget,saaswidget,maintainwidget,invoicewidget,equiwidget,customwidget,checkwidget,appwidget
    },
    computed: {
    },
    created:function(){

    },
    methods: {
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
        init(){
            this.customId = this.$route.query.customId; 
            this.closedPopupVisible('CS软件','1');
            this.customcontractAmount();
        },
        customcontractAmount( ){             //查询客户合同总金额等相关信息接口
            let me = this;
            var param = { 
                "customId":this.customId
            };
            axios.post(this.html_url +this.Apilist.customcontractAmount, param).then(function(data) {
                me.basicData = data.data.data;
            }).catch(function(e) {});  
        },
        closedPopupVisible(name,type){      //关闭选择
            this.titleName = name;
            this.tabType = type;
            this.popupVisible = false;
        },
        cswidgetClick(num){
            this.titleNum = num;
        },
        selectContract(){
            let me = this;
            let param ={
                customId : this.customId
            }
            axios.post(this.html_url + this.Apilist.selectContract, param).then(function(data){
                if(data.data.data != null && data.data.data.length !=0){
                    me.maintainShow = true;
                }else{
                    me.maintainShow = false;
                }
            }).catch(function(e){

            });
        },
    }
}
</script>
<style scoped>
    .searchList {background: #efefef;text-align: left;line-height: 28px;border-bottom: 1px solid gray;padding: 10px 0}
    .list{height:36px;line-height: 36px;text-align: left;padding-left: 4px;margin: 0 6px;}
    .list-active{border-bottom: 2px solid #5e67fc;}
</style>