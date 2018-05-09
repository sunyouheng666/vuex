<template>
    <div class="pageBox newdog">
        <mt-header :title="titleName" fixed>
            <mt-button icon="back" slot="left" @click.native="back">
                返回
            </mt-button>
        </mt-header>
        <div style="padding-top:39px;padding-bottom:36px;">
            <mt-field label="客户名称" placeholder="请选择客户"  v-model="customer" @click.native='showCustomerPop' readonly>
                <span class="required">*</span>
            </mt-field>
            <mt-field label="云类型" placeholder="请选择云类型" v-model="cloudTypeName" @click.native='serviceTypeShow=true' readonly>
                <span class="required">*</span>
            </mt-field>
            <mt-field label="客户云IP" placeholder="请输入客户云IP"  v-model="cloudIP" :attr="{maxlength: 15 }">
                <span class="required">*</span>
            </mt-field>
            <mt-field label="成交价格" placeholder="请输入成交价格"  v-model="transactionPrice" :attr="{maxlength: 10 }">
                <span class="required">*</span>
            </mt-field>
            <mt-checklist align="right" v-model="value" :options="['云服务器']">
            </mt-checklist>
            <mt-field label="云注册邮箱" placeholder="请输入客户云注册邮箱"  v-model="email" :attr="{maxlength: 100 }">
                <span class="required">*</span>
            </mt-field>
            <mt-field label="客户电话" placeholder="请输入客户电话"  v-model="tel" :attr="{maxlength: 13 }">
                <span class="required">*</span>
            </mt-field>
            <mt-field label="云用户名" placeholder="请输入云用户名"  v-model="cloudName" v-if="purchasing==0" :attr="{maxlength: 20 }">
                <span class="required">*</span>
            </mt-field>
            <mt-field label="开始时间" placeholder="请选择开始时间" type="date" v-model="startTimeStr" class="time-height">
                <span class="required">*</span>
            </mt-field>
             <mt-field label="截止时间" placeholder="请选择截止时间" type="date" v-model="endTimeStr" class="time-height">
                <span class="required">*</span>
            </mt-field>
            <mt-field label="云状态" placeholder="请选择云状态" v-model="cloudStatusName" @click.native='cloudStatusShow=true' readonly>
                <span class="required">*</span>
            </mt-field>
            <mt-field label="是否关联" placeholder="请选择是否关联"  v-model="relationName"  @click.native='relationShow=true' readonly>
            </mt-field>
            <mt-field label="配置"  placeholder="请输入配置" v-model="configuration" type="textarea" :attr="{maxlength: 500 }">
            </mt-field>
            <div style="padding:0 8px; " v-show="modifyData.length!=0">
            <div style="text-align: left">修改历史:</div>
                <div class="searchList">
                    <ul class='shou-list' style="margin-top: 0px;">
                        <li v-for="(item,key) in modifyData" v-bind:item="item" v-bind:key="key" style="padding:5px 0;">
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
        </div>
        <div class="btn-bottom">
            <mt-button type="primary" slot="right" @click.native="addDongle" style="margin-right:10px;background:#5e67fc;">
                保存
            </mt-button> 
            <mt-button  v-show="auditStatus==0&&titleName=='编辑云服务器'"  type="primary" slot="right" @click.native="updateAuditStatus('1')" style="margin-right:10px;background:#5e67fc;">
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
        <!-- 云类型 -->
        <mt-popup v-model="serviceTypeShow" position="bottom" style='width:100%'>
            <div class="title-pop">选择云类型</div>
            <mt-picker :slots="serviceTypeArr"  @change="onChangeServiceType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="serviceTypeShow"></mt-picker>
        </mt-popup>
        <!-- 云状态 -->
        <mt-popup v-model="cloudStatusShow" position="bottom" style='width:100%'>
            <div class="title-pop">选择云状态 </div>
            <mt-picker :slots="cloudStatusArr"  @change="onChangeCloudStatus" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="cloudStatusShow"></mt-picker>
        </mt-popup>
        <!-- 是否关联 -->
        <mt-popup v-model="relationShow" position="bottom" style='width:100%'>
            <div class="title-pop">选择云状态 </div>
            <mt-picker :slots="relationArr"  @change="onChangeRelation" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="relationShow"></mt-picker>
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
                value:["云服务器"],              //云服务器（默认选中）
                customer: '',                   //客户名称
                customId: '',                   //客户ID
                popCustomerList:false,          //选择客户
                titleName:"新建云服务器",        //标题名称
                modifyData:[],                  //修改历史
                auditStatus:"",                 //
                manageFlag:"",                  //管理权限
                originalData:"",                //
                cloudTypeName: '',              //服务类型名称
                cloudType : "",                 //服务类型
                serviceTypeArr: [{              //最高级别数组 
                    flex: 1,
                    values:[ {                          //服务类型
                        id: '0',name: '阿里云'
                    }, {
                        id: '1',name: '其他'
                    }],
                    className: 'serviceTypeArr',
                    textAlign: 'center',
                    defaultIndex: 1,
                }],
                serviceTypeShow: false,         //服务类型显示隐藏 
                cloudIP:"",                     //云IP
                transactionPrice:"",            //成交价格
                purchasing : '0',               //富通天下代购：0否，1是
                email : "",                     //邮箱
                tel : "",                       //电话
                cloudName : "",                 //云名称
                relationName : "",              //是否关联名称
                relation : "",                  //是否关联
                relationArr: [{                 //最高级别数组 
                    flex: 1,
                    values:[ {                  //服务类型
                        id: '0',name: '否'
                    }, {
                        id: '1',name: '是'
                    }],
                    className: 'serviceTypeArr',
                    textAlign: 'center',
                    defaultIndex: 1,
                }],
                relationShow: false,            //服务类型显示隐藏 
                configuration : "",             //配置
                startTimeStr : "",              //开始时间
                endTimeStr : "",                //结束时间
                cloudStatusName: '',            //服务类型名称
                cloudStatus : "",               //云状态
                cloudStatusArr: [{              //最高级别数组 
                    flex: 1,
                    values:[ {                  //服务类型
                        id: '0',name: '续用'
                    }, {
                        id: '1',name: '下云'
                    }, {
                        id: '2',name: '停用'
                    }],
                    className: 'serviceTypeArr',
                    textAlign: 'center',
                    defaultIndex: 1,
                }],
                cloudStatusShow: false,         //服务类型显示隐藏 
            }
        },
        props: {
        },
        watch: {
            'value':function(n,o){
                if(n.length == 0){
                    this.purchasing = 0
                }else{
                    this.purchasing = 1
                }
            },
            'purchasing':function(n,o){
                if(n == 0){
                    this.purchasing = 0
                }else{
                    this.purchasing = 1
                }
            }
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
                    this.titleName = "编辑云服务器";
                    this.customer = this.$route.query.customName;
                    this.customId = this.$route.query.customId;
                    this.cloudIP = this.$route.query.cloudIP;
                    this.transactionPrice = this.$route.query.transactionPrice;
                    this.purchasing = this.$route.query.purchasing;
                    this.email = this.$route.query.email;
                    this.tel = this.$route.query.tel;
                    if(this.$route.query.cloudName != undefined){
                        this.cloudName = this.$route.query.cloudName;
                        this.purchasing = 1;
                        this.value.push("云服务器");
                    }else{
                        this.cloudName = '';
                        this.purchasing = 0;
                        this.value = [];
                    }
                    this.relation = this.$route.query.relation;
                    if(this.$route.query.startTime != undefined){
                        this.startTimeStr = this.timeChenge(this.$route.query.startTime);
                    }
                    if(this.$route.query.endTime != undefined){
                        this.endTimeStr = this.timeChenge(this.$route.query.endTime);
                    }
                    this.cloudType = this.$route.query.cloudType;
                    this.cloudTypeName = this.$route.query.cloudTypeName;
                    this.cloudStatus = this.$route.query.cloudStatus;
                    this.cloudStatusName = this.$route.query.cloudStatusName;
                    this.relation = this.$route.query.relation;
                    this.relationName = this.$route.query.relationName;
                    this.originalData = this.$route.query.originalData;
                    this.purchasing = this.$route.query.purchasing;
                    this.configuration = this.$route.query.configuration;
                    this.fileId = this.$route.query.id;
                    this.auditStatus = this.$route.query.auditStatus;
                    this.selectModifyHistory();
                }
            },
            timeChenge(val){
                let time_html = val.substring(0,10);
                return time_html 
            },
            loadMoreHangyeLikeFn: function() {        //模糊查询
                this.searchResults = [];
                this.currenPage = 1;
                this.totalPage = 1;
                this.noData = false;
                this.loadAll = false;
                this.loadMore();
            }, 
            loadMore: function() {                  //执行模糊查询
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
            back: function() {                          //返回功能
                this.$router.push({path: 'customerRegistration',query:{type:'4'}});
            }, 
            showCustomerPop: function() {               //客户点击
                this.popCustomerList = true;
            },
            selectCustomer: function(obj) {             //客户选择
                this.popCustomerList = false;
                this.customId = obj.id;
                this.customer = obj.cName;
            },
            fChkMail(szMail) {                          //邮件格式验证
                var szReg = /^(\w-*\.*\+*)+@(\w-?)+(\.\w{2,})+$/;
                var bChk = szReg.test(szMail);
                return bChk
            },
            validateForm: function() { //表单验证
                if (this.customId == '') {
                    MessageBox('提示', '请选择客户！');
                    return false
                }
                if (this.cloudIP == '') {
                    MessageBox('提示', '请输入客户云IP！');
                    return false
                }
                var regIp = /^((25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))\.){3}(25[0-5]|2[0-4]\d|((1\d{2})|([1-9]?\d)))$/;
                if (!regIp.test(this.cloudIP)) {
                    MessageBox('提示', 'IP地址错误！');
                    return false
                }
                if (this.cloudName == '' && this.purchasing == '0') {
                    MessageBox('提示', '请输入云用户名！');
                    return false
                } 
                if (this.cloudStatus == '') {
                    MessageBox('提示', '请选择云状态！');
                    return false
                }
                if (this.cloudType == '') {
                    MessageBox('提示', '请选择云类型！');
                    return false
                }
                if (this.email == '') {
                    MessageBox('提示', '请输入客户邮箱！');
                    return false
                }
                if (!this.fChkMail(this.email)) {
                    MessageBox('提示', '请填写正确的邮箱！');
                    return false
                }
                if (this.tel == '') {
                    MessageBox('提示', '请输入客户电话！');
                    return false
                }else{
                    if(this.tel.length < 8){
                        MessageBox('提示', '客户电话输入错误！');
                        return false
                    }
                }
                var regTel = /^([1-9][\d]{0,13})$/;
                if (!regTel.test(this.tel)) {
                    MessageBox('提示', '客户电话错误！');
                    return false
                }
                if (this.startTimeStr == '') {
                    MessageBox('提示', '请选择开始时间！');
                    return false
                }
                if (this.endTimeStr == '') {
                    MessageBox('提示', '请选择结束时间！');
                    return false
                }
                if(this.startTimeStr > this.endTimeStr){
                    MessageBox('提示', '开始时间不能小于结束时间！');
                    return false
                }
                if (this.configuration == '') {
                    MessageBox('提示', '请输入配置！');
                    return false
                }
                if (this.transactionPrice == '') {
                    MessageBox('提示', '请输入成交价格！');
                    return false
                }
                var reg = /^([0-9]{0,7})(\.[\d]{2})$/;
                if(this.transactionPrice == 1){
                    if ( this.transactionPrice != '') {
                        if (!reg.test(this.transactionPrice)) {
                            MessageBox('提示', '成交价格小数点前1-7位，后保留2位数字');
                            return false
                        }
                    } else {
                        MessageBox('提示', '请输入车费！');
                        return false
                    }
                }
                return true
            },
            addDongle(){
                if(this.titleName == '新建云服务器'){
                    this.insertCloudServer();
                }else{
                    this.updateCloudServer();
                }
            },
            insertCloudServer(){                 //新增云服务器
                this.titleName = '新建云服务器';
                if (!this.validateForm()) {
                    return
                }
                if(this.startTimeStr.length<12){
                    this.startTimeStr = this.startTimeStr+" 00:00:00";
                }
                if(this.endTimeStr.length<12){
                    this.endTimeStr = this.endTimeStr+" 00:00:00";
                }
                let me = this;
                let param = {
                    customId:this.customId,             //客户ID
                    auditStatus :'0',                   //auditStatu
                    cloudIP : this.cloudIP,
                    cloudName : this.cloudName,
                    cloudStatus : this.cloudStatus,
                    cloudType : this.cloudType,
                    configuration : this.configuration,
                    email : this.email,
                    purchasing : this.purchasing,
                    relation : this.relation,
                    startTimeStr : this.startTimeStr,
                    endTimeStr : this.endTimeStr,
                    tel : this.tel,
                    transactionPrice : this.transactionPrice,
                };
                axios.post(this.html_url +this.Apilist.insertCloudServer, param).then(function(data) {
                    MessageBox.alert('新建云服务器成功！','提示'); 
                    me.back();
                }).catch(function(e) {});
            },
            updateCloudServer(){                        //修改云服务器
                let me = this;
                if (!this.validateForm()) {
                    return
                }
                if(this.startTimeStr.length<12){
                    this.startTimeStr = this.startTimeStr+" 00:00:00";
                }
                if(this.endTimeStr.length<12){
                    this.endTimeStr = this.endTimeStr+" 00:00:00";
                }
                let param = {
                    id: this.fileId,
                    cloudIP : this.cloudIP,
                    cloudName : this.cloudName,
                    cloudStatus : this.cloudStatus,
                    cloudType : this.cloudType,
                    configuration : this.configuration,
                    email : this.email,
                    originalData:this.originalData,
                    purchasing : this.purchasing,
                    relation : this.relation,
                    startTimeStr : this.startTimeStr,
                    endTimeStr : this.endTimeStr,
                    tel : this.tel,
                    transactionPrice : this.transactionPrice,
                };
                axios.post(this.html_url +this.Apilist.updateCloudServer, param).then(function(data) {
                    MessageBox.alert('修改云服务器成功！','提示'); 
                    me.back();
                }).catch(function(e) {});
            },
            updateAuditStatus(type){
                let me = this;
                let param = {
                    fileType  : 3,
                    fileId : this.fileId,
                    auditStatus :type,
                };
                axios.post(this.html_url +this.Apilist.updateAuditStatus, param).then(function(data) {
                    if(type==1){
                        MessageBox.alert('客户云服务器发送审核成功！','提示'); 
                    }else{
                        MessageBox.alert('客户云服务器审核成功！','提示'); 
                    }
                    me.back();
                }).catch(function(e) {});
            },
            selectModifyHistory(){
                let me = this;
                let param = {
                    fileType  : 3,
                    fileId : this.fileId,
                    pagingRequired :false,
                };
                axios.post(this.html_url +this.Apilist.selectModifyHistory, param).then(function(data) {
                    me.modifyData = data.data.data;
                }).catch(function(e) {});
            },
            //-----------------------------------------------------------------//
            onChangeServiceType: function(picker, values) {       //选择服务类型
                if (values[0] == undefined) {
                    return
                }
                this.cloudTypeName = values[0].name;
                this.cloudType = values[0].id;
            },
            onChangeCloudStatus: function(picker, values) {       //选择服务状态
                if (values[0] == undefined) {
                    return
                }
                this.cloudStatusName = values[0].name;
                this.cloudStatus = values[0].id;
            },
            onChangeRelation: function(picker, values) {       //选择服务类型
                if (values[0] == undefined) {
                    return
                }
                this.relationName = values[0].name;
                this.relation = values[0].id;
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
    .newdog .mint-field .mint-cell-title{width: 85px!important;text-align: left;color: #2894e5;}
    .newdog .mint-checklist .mint-cell-title{width: 85px!important;text-align:left;color:#2894e5;}
    .newdog .mint-checklist .mint-cell-wrapper{padding-left:0 ;}
    .newdog .mint-checklist .mint-checklist-label{padding-left:4px;}
    .mint-checkbox-core{background:#5e67fc!important;}
</style>