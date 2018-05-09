<template>
    <div class="pageBox">
        <mt-header title="新增开票" fixed>
            <mt-button icon="back" slot="left" @click.native="back">
                返回
            </mt-button>
            <mt-button slot="right" @click.native="insertBillApply" style="margin-right:10px">
                保存
            </mt-button>
        </mt-header>
        <div style="font-size: 14px;margin-top: 39px;" class="addBilling">
            <mt-field label="发票客户" placeholder="请选择客户" v-model="customer" @click.native='showCustomerPop' readonly>
                <span class="required">*</span>
            </mt-field>
            <mt-field label="发票抬头" placeholder="请输入发票抬头" v-model="invoiceName" :attr="{maxlength: 20 }">
                <span class="required">*</span>   
            </mt-field>
            <mt-field label="发票金额" placeholder="请输入发票金额" v-model="invoiceAmount" :attr="{maxlength: 10 }">
                <span class="required">*</span>   
            </mt-field>
            <mt-field label="发票种类" placeholder="请选择发票种类" v-model="invoiceTypeName" @click.native='feedbackShow=true' readonly>
                <span class="required">*</span>
            </mt-field>
            <mt-field label="开户行及帐号" placeholder="请输入开户行及帐号" v-model="bankAccount" :attr="{maxlength: 100 }">
                <span class="required">*</span>   
            </mt-field>
            <mt-field label="纳税人识别号" placeholder="请输入纳税人识别号" v-model="taxpayerIdNumber" :attr="{maxlength: 100 }">
                <span class="required">*</span>   
            </mt-field>
            <mt-field label="地址 / 电话" placeholder="请输入地址 / 电话" v-model="addressTelephone" :attr="{maxlength: 100 }">
                <span class="required">*</span>   
            </mt-field>
            <mt-field label="备注" placeholder="请输入备注"  v-model="remark" type="textarea" :attr="{maxlength: 500 }">
            </mt-field>
            <!-- 客户-->
            <mt-popup v-model="popCustomerList" position="right" style="width:80%;height:100%;overflow-y:scroll">
                <seachcustomwidget @selectCustomer="selectCustomer"></seachcustomwidget> 
            </mt-popup>
            <mt-popup v-model="feedbackShow" position="bottom" style='width:100%'>
                <div class="title-pop">选择发票种类</div>
                <mt-picker :slots="invoiceTypeArr"  @change="onChangeServiceType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="feedbackShow"></mt-picker>
            </mt-popup>
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
            customerKeyWords: '',       //客户查询
            popCustomerList: false,     //查询客户显示隐藏
            customerList: [],           //客户信息数组
            customer: '',               //客户名称
            customId: '',               //客户ID
            invoiceName:"",             //发票抬头
            invoiceAmount:"",           //开票金额
            taxpayerIdNumber :"",       //纳税人识别号
            addressTelephone :"",       //地址/电话 
            bankAccount :"",            //开户行及账号
            remark:"",                  //说明
            invoiceTypeName :"",        //发票类型名称
            invoiceType :"",            //发票类型
            invoiceTypeArr: [{          //发票类型数组 
                flex: 1,
                values:[ {                
                    id: '1',name: '专用发票'
                }, {
                    id: '2',name: '普通发票'
                }],
                className: 'invoiceTypeArr',
                textAlign: 'center',
                defaultIndex: 1,
            }],
            feedbackShow :false,        //发票类型显示隐藏
            isCustomer: true,           //是否禁用客户查询
        }
    },
    mounted: function() { 
    },
    methods: {
        validateForm: function() {      //表单验证
            if (this.customId == '') {
                MessageBox('提示', '请选择发票客户！');
                return false
            }
            if (this.invoiceName == '') {
                MessageBox('提示', '请输入发票抬头！');
                return false
            }
            var reg = /^([0-9]{0,7})(\.[\d]{2})$/;
            if (this.invoiceAmount == '') {
                MessageBox('提示', '请输入发票金额！');
                return false
            } else {
                if (!reg.test(this.invoiceAmount)) {
                    MessageBox('提示', '发票金额请输入小数点前1-7位，后保留2位数字！');
                    return false
                }
            }
            if (this.invoiceType == '') {
                MessageBox('提示', '请选择发票种类！');
                return false
            }
            if (this.bankAccount == '') {
                MessageBox('提示', '请输入开户行及账号！');
                return false
            }
            if (this.taxpayerIdNumber == '') {
                MessageBox('提示', '纳税人识别号！');
                return false
            }
            if (this.addressTelephone == '') {
                MessageBox('提示', '地址/电话！');
                return false
            }
            return true
        },
        insertBillApply: function() {               //新建开票通知
            var me = this; 
            if (!this.validateForm()) {
                return
            } 
            var param = {
                customId : this.customId,
                invoiceName : this.invoiceName,
                invoiceAmount : this.invoiceAmount,
                taxpayerIdNumber : this.taxpayerIdNumber,
                addressTelephone : this.addressTelephone,
                bankAccount : this.bankAccount,
                remark : this.remark,
                invoiceType : this.invoiceType,
            };
            Indicator.open({
                text: '加载中...',
                spinnerType: 'fading-circle'
            });
            axios.post(this.html_url + this.Apilist.insertBillApply, param).then(function(data) {
                Indicator.close();
                MessageBox.alert('新建开票通知成功！','提示');
                me.onClear();
                me.back();
            }).catch(function(e) {
                Indicator.close();
            });
        },
        onClear(){
            this.customer = '';                //客户名称
            this.customId = '';                 //客户ID
            this.invoiceName ="";               //发票抬头
            this.invoiceAmount ="";             //开票金额
            this.taxpayerIdNumber = "";        //纳税人识别号
            this.addressTelephone = "";         //地址/电话 
            this.bankAccount ="";               //开户行及账号
            this.remark = "";                   //说明
            this.invoiceTypeName = "";         //发票类型名称
            this.invoiceType = "";              //发票类型
        },
        onChangeServiceType: function(picker, values) {       //选择服务类型
            if (values[0] == undefined) {
              return
            }
            this.invoiceTypeName = values[0].name;
            this.invoiceType = values[0].id;
        },
        showCustomerPop: function() {                 //客户点击
            if (this.isCustomer) {
                this.popCustomerList = true;
            }
        },
        selectCustomer: function(obj) {               //客户选择
            this.popCustomerList = false;
            this.customId = obj.id;
            this.customer = obj.cName;
        },
        back: function() {                    //返回功能
            this.$router.push({ path:'/contract',query:{type:'4'}});
        } 
    }
}
</script>
<style scoped>
    .mint-checklist .mint-cell {padding: 0;width: 50%!important;float: left;text-align: left;}
</style>
<style>
    .addBilling .mint-field .mint-cell-title{width: 90px!important;text-align: left;font-size: 14px;color:#5e67fc;}
    .addBilling .mint-field .mint-field-core{font-size: 14px;}
</style>