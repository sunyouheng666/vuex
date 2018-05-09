<template>
    <div class="pageBox newdog">
        <mt-header :title="titleName" fixed>
            <mt-button icon="back" slot="left" @click.native="back">
                返回
            </mt-button>
        </mt-header>
        <div style="padding-top:39px;" >
            <mt-field label="客户名称：" placeholder="请选择客户"  v-model="customer" @click.native='showCustomerPop' readonly>
                <span class="required">*</span>
            </mt-field>
            <mt-field label="加密狗：" placeholder="请输入加密狗" v-model="dongleCode"  :attr="{maxlength: 10 }">
                <span class="required">*</span>   
            </mt-field>
            <mt-field label="备注："  placeholder="请输入备注" v-model="remark" type="textarea" :attr="{maxlength: 500 }">
            </mt-field>
        </div>
        <div style="padding:0 8px;padding-bottom: 40px;" v-show="modifyData.length!=0">
            <div style="text-align: left">修改历史:</div>
            <div class="searchList">
                <ul class='shou-list' style="margin-top: 0px;">
                    <li v-for="item in modifyData" style="padding:5px 0;">
                        <div class="line"></div>
                        <div class="companyType">  
                            <span class="labelcss">修改人：</span>
                            {{item.operatorName || '无'}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">修改时间：</span>
                            {{item.gmtCreate  | TimeCut}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">修改内容：</span>
                            {{item.content || '无'}}
                        </div>
                        <div class="clear"></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="btn-bottom">
            <mt-button type="primary" slot="right" @click.native="addDongle" style="margin-right:10px;background:#5e67fc;">
                保存
            </mt-button> 
            <mt-button  v-show="auditStatus==0&&titleName=='编辑加密狗'"  type="primary" slot="right" @click.native="updateAuditStatus('1')" style="margin-right:10px;background:#5e67fc;">
                申请
            </mt-button> 
            <mt-button  v-show="auditStatus==1&&manageFlag!=1"  type="primary" slot="right" @click.native="updateAuditStatus('2')" style="margin-right:10px;background:#5e67fc;">
                审核
            </mt-button> 
        </div>
        <!-- 客户-->
        <mt-popup v-model="popCustomerList" position="right" style="width:80%;height:100%;overflow-y:scroll">
            <seachcustomwidget @selectCustomer="selectCustomer"></seachcustomwidget> 
        </mt-popup>
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui';
    import axios from 'axios';
    import { Indicator } from 'mint-ui';
    export default {
        data() {
            return {
                customer: '',                   //客户名称
                customId: '',                   //客户ID
                dongleCode:"",                  //
                remark:"",                      //
                popCustomerList:false,          //
                titleName:"新建加密狗",          //
                modifyData:[],                  //
                auditStatus:"",                 //
                manageFlag:"",                  //
                originalData:"",                //
            }
        },
        props: {
        },
        watch: {    
        },
        created:function(){
          
        },
        mounted: function() { 
            this.init();
        },
        methods: {
            init(){
                let list = JSON.parse(localStorage.userInfo);
                this.manageFlag = list.manageFlag;
                if(this.$route.query.customId != undefined){
                    this.titleName = "编辑加密狗";
                    this.customer = this.$route.query.customName;
                    this.customId = this.$route.query.customId;
                    this.dongleCode = this.$route.query.dongleCode;
                    this.auditStatus = this.$route.query.auditStatus;
                    this.auditStatusName = this.$route.query.auditStatusName;
                    this.remark = this.$route.query.remark;
                    this.originalData = this.$route.query.originalData;
                    this.fileId = this.$route.query.id;
                    this.selectModifyHistory();
                }
            },
            loadMoreHangyeLikeFn: function() {        //模糊查询
                this.searchResults = [];
                this.currenPage = 1;
                this.totalPage = 1;
                this.noData = false;
                this.loadAll = false;
                this.loadMore();
            }, 
            loadMore: function() {          //执行模糊查询
                if (this.currenPage > this.totalPage) {
                    return;
                }
                this.loading = true;
                var self = this;
                var param = {
                    customName : this.customName,
                    currenPage :this.currenPage,
                    pageRows : this.pageRows,
                    pagingRequired : true,
                };
                self.loading = true;
                axios.post(self.html_url + self.Apilist.selectDongle,param).then(function(data) {
                    self.resultShow = true;
                    self.loading = false;
                    if (data.data.totalRecords==0||data.data.totalRecords==null) {
                        self.noData = true;
                    }
                    self.searchResults = self.searchResults.concat(data.data.data); 
                    if(data.data.totalPage != null){
                        self.totalPage = data.data.totalPage;
                    }
                    if (self.totalPage == data.data.totalPage) {
                        self.loadAll = true;
                    }
                    self.currenPage = self.currenPage + 1;
                }).catch(function(e) {
                    self.loading = false;
                }); 
            },  
            back: function() {                    //返回功能
                this.$router.push({path: 'customerRegistration',query:{type:'2'}});
            }, 
            showCustomerPop: function() {                 //客户点击
                this.popCustomerList = true;
            },
            selectCustomer: function(obj) {               //客户选择
                this.popCustomerList = false;
                this.customId = obj.id;
                this.customer = obj.cName;
            },
            validateForm: function() {              //市场日志表单验证
                if (this.customId == '') {
                    MessageBox('提示', '请选择客户！');
                    return false
                }
                if (this.dongleCode == '') {
                    MessageBox('提示', '请输入加密狗！');
                    return false
                }else{
                    var reg = /^[a-zA-Z0-9]{0,10}$/;
                    if (!reg.test(this.dongleCode)) {
                        MessageBox('提示', '加密狗输入错误(数字与字母)');
                        return false
                    }
                }
                
                return true
            },
            addDongle(){
                if(this.titleName == '新建加密狗'){
                    this.insertDongle();
                }else{
                    this.updateDongle();
                }
            },
            insertDongle(){                 //新增加密狗
                this.titleName = '新建加密狗';
                if (!this.validateForm()) {
                    return
                }
                let me = this;
                let param = {
                    customId : this.customId,
                    dongleCode : this.dongleCode,
                    remark :this.remark
                };
                axios.post(this.html_url +this.Apilist.insertDongle, param).then(function(data) {
                    MessageBox.alert('新增加密狗成功！','提示'); 
                    me.back();
                }).catch(function(e) {});
            },
            updateDongle(){                 //修改加密狗
                if (!this.validateForm()) {
                    return
                }
                let me = this;
                let param = {
                    dongleCode : this.dongleCode,
                    id: this.fileId,
                    originalData  :this.originalData,
                    remark  :this.remark
                };
                axios.post(this.html_url +this.Apilist.updateDongle, param).then(function(data) {
                    MessageBox.alert('修改加密狗成功！','提示'); 
                    me.back();
                }).catch(function(e) {});
            },
            updateAuditStatus(type){
                let me = this;
                let param = {
                    fileType  : 1,
                    fileId : this.fileId,
                    auditStatus :type,
                };
                axios.post(this.html_url +this.Apilist.updateAuditStatus, param).then(function(data) {
                    if(type==1){
                        MessageBox.alert('客户加密狗发送审核成功！','提示'); 
                    }else{
                        MessageBox.alert('客户加密狗审核成功！','提示'); 
                    }
                    me.back();
                }).catch(function(e) {});
            },
            selectModifyHistory(){
                let me = this;
                let param = {
                    fileType  : 1,
                    fileId : this.fileId,
                    pagingRequired :false,
                };
                axios.post(this.html_url +this.Apilist.selectModifyHistory, param).then(function(data) {
                    me.modifyData = data.data.data;
                }).catch(function(e) {});
            }
        }
    }
</script>
<style scoped> 
    .btn-bottom{position: fixed;bottom: 0;background: #fff;width: 100%;height:33px;padding-top: 7px;}
</style>
<style>
    .mint-cell-wrapper{background-image: none;text-align: left;font-size: 14px;}
    .newdog .btn-bottom .mint-button{height:30px;font-size: 16px;line-height: 30px;padding:0 50px;}
    .newdog .mint-field .mint-cell-title{width: 80px!important;text-align: left;}
</style>