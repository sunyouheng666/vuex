<template>
    <div style="font-size: 14px;" class="logwidget">
        <!-- 销售日志 -->
        <mt-field label="录入人" placeholder="" v-model="salesmanName" disabled>
            <span class="required">*</span>
        </mt-field>
        <mt-field label="维护日期" placeholder="请输入日期" type="date" v-model="maintainTime" class="time-height">
            <span class="required">*</span>
        </mt-field>
        <mt-field label="服务类型" placeholder="请选择服务类型" v-model="serviceTypeName" @click.native='serviceTypeShow=true' readonly>
            <span class="required">*</span>
        </mt-field>
        <mt-field label="车费" placeholder="请输入车费" v-model="serviceFare" v-if="serviceType==1" :attr="{maxlength: 10 }"> 
        </mt-field>
        <mt-field label="维护时间" placeholder="请输入维护时间" type="time" v-model="serviceTime" class="time-height">
            <span class="required">*</span>
        </mt-field>
        <mt-field label="维护时长" placeholder="请输入维护时长(单位：小时)" v-model="serviceDuration" :attr="{maxlength: 5 }">
            <span class="required">*</span>
        </mt-field>
        <div v-for="(str, index) in maintainContentList">
            <mt-field label="维护内容" placeholder="请选择维护类型"  v-model="str.name" @click.native='maintainShow=true,maintainIndex=index' readonly>
                <span class="required">*</span>
            </mt-field>
            <mt-field label=" "  placeholder="请输入维护内容" v-model="str.content" type="textarea" :attr="{maxlength: 500 }">
                <span class="required">*</span>
            </mt-field>
        </div>
        <div style="height:28px;padding-top: 2px;">
            <mt-button type="primary"  size="small" @click.native.stop="addSalerContent" style='height:26px;width: 65px;float:right;margin-right: 4px;background:#5e67fc;' :disabled="maintainContentList.length==maintainArr[0].values.length?true:false">
                +新增
            </mt-button>
        </div>
        <div style="clear:both"></div>
        <mt-field label="客户" placeholder="请选择客户"  v-model="customer" @click.native='showCustomerPop' readonly>
            <span class="required">*</span>
        </mt-field>
        <mt-field label="地址" placeholder="请选择客户" v-model="customAddress" :attr="{maxlength: 200 }">
        </mt-field>
        <mt-field label="陪访人" placeholder="请选择陪访人" v-model="accompanyNames" disabled @click.native.stop="dialogEmployeeClick">
        </mt-field>
        <div style="position: relative;">
            <mt-field label="联系人" placeholder="请选择联系人" v-model="contact"  @click.native='showContact' style="width:85%;" readonly>
            </mt-field>
            <span class="required" style="margin-right: 20px;position: absolute;top: 6px;right:28px;">*</span>
            <mt-button type="primary" size="small" @click.native.stop="addContact" style='position:absolute;top:6px;right:6px;height:30px;width: 30px;background:#5e67fc;'>
                +
            </mt-button>
        </div>
        <mt-field label="使用反馈" placeholder="请选择反馈类型"  v-model="feedbackTypeName" @click.native='feedbackShow=true' readonly>
        </mt-field>
        <mt-field label=" " placeholder="请输入反馈内容"  v-model="feedbackContent" type="textarea" :attr="{maxlength: 25 }">
        </mt-field>
        <div style="color:red;padding:0px 8px;">
            请如实填写拜访信息与车费金额，不符合事实的，视为无效记录！（注：回公司车费每天只能填写一次。乘车路线是指从公司出发详细公交乘车线路）
        </div>
        <!-- 客户-->
        <mt-popup v-model="popCustomerList" position="right" style="width:80%;height:100%;overflow-y:scroll">
            <seachcustomwidget @selectCustomer="selectCustomer" :source="source"></seachcustomwidget> 
        </mt-popup>
        <mt-popup v-model="contactPop" position="bottom" style='width:100%'>
            <div class="title-pop">选择联系人</div>
            <mt-picker :slots="slotsContact" ref="pickerContact " @change="onValChangeContact" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="contactPop"></mt-picker>
        </mt-popup>
        <mt-popup v-model="serviceTypeShow" position="bottom" style='width:100%'>
            <div class="title-pop">选择服务类型</div>
            <mt-picker :slots="serviceTypeArr"  @change="onChangeServiceType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="serviceTypeShow"></mt-picker>
        </mt-popup>
        <mt-popup v-model="maintainShow" position="bottom" style='width:100%'>
            <div class="title-pop">选择维护内容</div>
            <mt-picker :slots="maintainArr"  @change="onChangemaintain" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="maintainShow"></mt-picker>
        </mt-popup>
        <mt-popup v-model="feedbackShow" position="bottom" style='width:100%'>
            <div class="title-pop">选择反馈类型</div>
            <mt-picker :slots="feedbackTypeArr"  @change="onChangefeedback" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="feedbackShow"></mt-picker>
        </mt-popup>
        <!-- 新建联系人 -->
        <mt-popup v-model="showAddContact" position="right" style="width:80%;height:100%;overflow-y:scroll">
            <contactswidget :customerId="customerId" @closeContactsWidget="closeContactsWidget"></contactswidget>  
        </mt-popup>
        <!-- 选择陪访人 -->
        <mt-popup v-model="accompanyShow" position="right" style="width:80%;height:100%;overflow-y:scroll">
            <accompanywidget :employeeMsg='employeeMsg' @getEmployee="getEmployee"></accompanywidget> 
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
            popCustomerList: false,     //查询客户显示隐藏
            customer: '',               //客户名称
            customerId: '',             //客户ID
            salesmanName: this.tempsalesmanName,  //录入人
            salesmanId: this.tempsalesmanId,      //录入人ID
            maintainContentList :[
                {
                    name:"",
                    type:"",
                    content:"", 
                },
            ],                              //维护内容list
            maintainId : "",                //维护工程师id
            maintainTime : "",              //维护日期
            serviceTime : "",               //服务时间
            serviceDuration : "",           //维护时长
            serviceFare : "",               //车费
            contactId : "",                 //联系人ID 
            customAddress : "",             //客户地址
            accompanyNames : "",            //陪访人
            accompanyIds:"",                //陪访人ID
            accompanyShow:false,            //陪访人选择
            feedbackContent : "",           //反馈内容 
            feedbackTypeName:"",            //反馈类型名称
            feedbackType : "",              //反馈类型
            feedbackTypeArr: [{               //最高级别数组 
                flex: 1,
                values:[ {                        //反馈类型
                    id: '1',name: '良好'
                }, {
                    id: '2',name: '一般'
                }, {
                    id: '3',name: '差'
                }, {
                    id: '4',name: '未使用'
                }],
                className: 'feedbackTypeArr',
                textAlign: 'center',
                defaultIndex: 1,
            }],
            feedbackShow :false,              //反馈类型显示隐藏
            isCustomer: true,               //是否禁用客户查询
            slotsContact: [{                //选择联系人数组
                flex: 1,
                values: [],
                className: 'slotsContact',
                textAlign: 'center',
                defaultIndex: 1,
            }],
            contactPop: false,          //选择联系人显示隐藏
            contact: '',                //联系人名称
            contactId: '',              //联系人id
            title:'',                   //日志类型（文字）  
            showAddContact: false,      //新建联系人显示 
            serviceTypeName: '',        //服务类型名称
            serviceType : "",           //服务类型
            serviceTypeArr: [{               //最高级别数组 
                flex: 1,
                values:[ {                          //服务类型
                    id: '1',name: '上门服务'
                }, {
                    id: '2',name: '远程维护'
                }, {
                    id: '3',name: '电话回访'
                }],
                className: 'serviceTypeArr',
                textAlign: 'center',
                defaultIndex: 1,
            }],
            serviceTypeShow: false,     //服务类型显示隐藏 
            maintainIndex:0,                //维护选择ID
            maintainArr: [{               //最高级别数组 
                flex: 1,
                values:[ {                      //维护内容
                    id: '1',name: '操作问题'
                }, {
                    id: '2',name: '程序问题'
                }, {
                    id: '3',name: '网络环境'
                }, {
                    id: '4',name: '售前陪访'
                }, {
                    id: '5',name: '安装培训'
                }, {
                    id: '6',name: '使用指导'
                }, {
                    id: '7',name: '其他'
                }],
                className: 'serviceTypeArr',
                textAlign: 'center',
                defaultIndex: 1,
            }],
            maintainShow: false,                    //服务类型显示隐藏 
            highlevel: '',              //最高级别 
            highlevelId: '',            //最高级别ID 
            slotsHigh: [{               //最高级别数组 
                flex: 1,
                values: [],
                className: 'slotsHigh',
                textAlign: 'center',
                defaultIndex: 1,
            }],
            showHighPop: false,         //最高级别显示隐藏  
            employeeMsg:{},             //  
            source:"",                  //客户查询组建，请求接口判断           
        }
    },
    props: {
      tempsalesmanName: {
        type: String,
        default: ''
      },
      tempsalesmanId: {
        type: Number,
        default: 0
      },
      tempsalesmanId: {
        type: Number,
        default: 0
      },
      tempsalesmanId: {
        type: Number,
        default: 0
      },
    },
    watch: {
        'maintainTime':function(n,o){
            if(n.length < 12 && n.length !=0){
                if( n!= '' || n!= null){
                    let timeS = new Date().getTime()-172800000;
                    let timeE = new Date().getTime();
                    timeS =  new Date(timeS);
                    timeE =  new Date(timeE);
                    timeS = this.timer(timeS);
                    timeE = this.timer(timeE);
                    if(n<timeS  || n>timeE){
                        MessageBox('提示', '维护日期，请选择3天内的日期！');
                        return
                    }
                }
            }
            if(n == '' || n == null){
                this.maintainTime = this.timer(new Date()); 
            }
        }
    },
    created:function(){
        this.maintainTime = this.timer(new Date()); 
        let _customerName = this.$route.query.customerName;  
        let _customerId = this.$route.query.customerId; 
        if(_customerId != undefined){
        this.customer = _customerName;
            this.customerId = _customerId;
            this.getCustomeDetail();
            this.isCustomer = false;
        } 
        let list = JSON.parse(localStorage.userInfo);
        this.salesmanName = list.employeeName;
        this.saleManageId = list.employeeId;
    },
    mounted: function() { 
    },
    methods: {
        getCustomeDetail(){                   //获取客户详情(客户详情跳转使用)
            if(this.customerId != ''){
                var self = this; 
                axios.post(this.html_url + this.Apilist.selectCustomByParam, { id: this.customerId }).then(function(data) {
                    let list = data.data.data;
                    self.customer = list.cName;
                    self.customAddress = list.fullAdress;
                }).catch(function(e) {});
            }
        },
        timer(type) {                           //时间转换
            let time_html = '';
            let year = type.getFullYear(); 
            let month = type.getMonth() + 1; 
            month < 10 && (month = '0' + month);
            let day = type.getDate();  
            day < 10 && (day = '0' + day);
            let h = type.getHours();
            h < 10 && (h = '0' + h);
            let M = type.getMinutes();
            M < 10 && (M = '0' + M);
            time_html = year + "-" + month+ "-" + day;
            return time_html     
        },
        validateForm: function() { //表单验证
            if (this.salesmanName == '') {
                MessageBox('提示', '你可能从地图点击过来的,暂无录入人,请从首页销售管理进入！');
                return false
            }
            if (this.maintainTime == '') {
                MessageBox('提示', '请输入拜访日期！');
                return false
            }
            if(this.maintainTime != ''){
                let timeS = new Date().getTime()-172800000;
                let timeE = new Date().getTime();
                timeS =  new Date(timeS);
                timeE =  new Date(timeE);
                timeS = this.timer(timeS);
                timeE = this.timer(timeE);
                if(this.maintainTime<timeS  || this.maintainTime>timeE){
                    MessageBox('提示', '拜访日期，请选择3天内的日期！');
                    return false
                }
            }
            if (this.serviceType == '') {
                MessageBox('提示', '请选择服务类型！');
                return false
            }
            if (this.serviceDuration == '') {
                MessageBox('提示', '请选择维护时长！');
                return false
            }
            let regServiceDuration = /^([\d]{0,2})(\.[\d]{2})?$/;
            if(!regServiceDuration.test(this.serviceDuration)){
                MessageBox('提示', '维护时长输入错误（例：99/99.99）！');
                return false
            }
            if (this.serviceTime == '') {
                MessageBox('提示', '请选择维护时间！');
                return false
            } 
            console.log("111111111111",this.maintainContentList);
            for(let i=0;i<this.maintainContentList.length;i++){
                if(this.maintainContentList[i].type==''){
                    MessageBox('提示', '请选择维护内容！');
                    return false
                }
                if(this.maintainContentList[i].content==''){
                    MessageBox('提示', '请输入维护内容！');
                    return false
                }
            }
            if (this.customer == '') {
                MessageBox('提示', '请选择拜访客户！');
                return false
            }
            if (this.contactId == '') {
                MessageBox('提示', '请选择联系人！');
                return false
            }
            var reg = /^([0-9]{0,7})(\.[\d]{2})$/;
            if(this.serviceType == 1){
                if ( this.serviceFare != '') {
                    if (!reg.test(this.serviceFare)) {
                        MessageBox('提示', '车费请输入小数点前1-7位，后保留2位数字');
                        return false
                    }else{
                        return true
                    } 
                } else {
                    MessageBox('提示', '请输入车费');
                    return false
                }
            }
            return true
        },
        saveCustomMaintain: function() { //保存日志
            var self = this; 
            if (!this.validateForm()) {
                return
            }
            if(this.maintainTime.length<12){
                this.maintainTime = this.maintainTime+" 00:00:00";
            }
            var param = {
                maintainId: this.salesmanId,                //录入人
                maintainTime: this.maintainTime,            //维护日期
                customId: String(this.customerId),          //客户ID
                customAddress: this.customAddress,                //客户地址
                contactId: this.contactId,                 //联系人
                accompanyNames:this.accompanyNames,            
                accompanyIds:this.accompanyIds,
                feedbackContent : this.feedbackContent,                       //反馈内容 
                feedbackType : this.feedbackType,                          //反馈类型
                maintainContentList :this.maintainContentList,
                serviceTime : this.maintainTime.substr(0,10) +" "+this.serviceTime +':00',             //服务时间
                serviceDuration : this.serviceDuration,     //服务时长
                serviceFare : this.serviceFare,             //车费
                serviceType:this.serviceType,
            };
            Indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            });
            axios.post(self.html_url + self.Apilist.customMaintain, param).then(function(data) {
              Indicator.close();
              MessageBox.alert('保存成功','提示');
              self.clearJournal();
            }).catch(function(e) {
              Indicator.close();
              self.maintainTime = self.timer(new Date()); 
            });
        },
        clearJournal(){
            this.maintainTime = '';
            this.maintainTime = this.timer(new Date()); 
            this.customId = ''; 
            this.customAddress = ''; 
            this.contactId = ''; 
            this.feedbackContent = '';
            this.feedbackType = '';
            this.serviceTime = '';
            this.serviceDuration = '';
            this.serviceFare = '';
            this.serviceType = '';
            this.maintainContentList = [{name:"",type:"",content:"", }];         
            this.accompanyNames = "";            
            this.accompanyIds = ""; 
            this.customer = ""; 
            this.serviceTypeName = ""; 
            this.contact = ""; 
            this.feedbackTypeName = ""; 
        },
        addContact: function() {                  //添加联系人点击事件
            var self = this;
            if (self.customerId && self.customerId != '') {
                this.showAddContact = true;
            } else {
                MessageBox('提示', '请先选择客户');
            }
        },
        onChangeServiceType: function(picker, values) {       //选择服务类型
            if (values[0] == undefined) {
                return
            }
            this.serviceTypeName = values[0].name;
            this.serviceType = values[0].id;
        },
        onChangemaintain: function(picker, values) {       //选择维护类型
            if (values[0] == undefined) {
                return
            }
            this.maintainContentList[this.maintainIndex].name = values[0].name;
            this.maintainContentList[this.maintainIndex].type = values[0].id;
        },
        addSalerContent(){                          //新增维护内容
            if(this.maintainContentList.length != this.maintainArr[0].values.length){
                this.maintainContentList.push( { type:"",content:"",name:""});
            }
        },
        onChangefeedback: function(picker, values) {       //选择反馈类型
            if (values[0] == undefined) {
                return
            }
            this.feedbackTypeName = values[0].name;
            this.feedbackType = values[0].id;
        },
        closeContactsWidget(){                        //关闭添加联系人
            this.showAddContact = false;
        },
        showContact: function() {                     //联系人信息
            var customerId = this.customerId;
            if (customerId == '') {
                MessageBox('提示', '请先选择拜访客户，才能选联系人！');
                return
            }
            var param = {
                customId: customerId,
                pageRows: 10,
                currenPage: 1,
                pagingRequired: true
            };
            var self = this;
            self.slotsContact[0].values = [];
            axios.post(self.html_url + self.Apilist.selectContactsListPaging, param).then(function(data) {
                var listTemp = data.data.data;
                if (listTemp.length == 0) {
                    MessageBox('提示', '暂无联系人,请添加联系人！');
                    return
                } else {
                    for (var i = 0; i < listTemp.length; i++) {
                        self.slotsContact[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
                    }
                }
                self.contactPop = true;
            }).catch(function(e) {});
        },
        onValChangeContact: function(picker, values) {//联系人选择
            if (values[0] == undefined) {
                return
            }
            this.contact = values[0].name;
            this.contactId = values[0].id;
        },
        showCustomerPop: function() {                 //客户点击
            if (this.isCustomer) {
                this.popCustomerList = true;
                this.source = "logwidget";
            }
        },
        selectCustomer: function(obj) {               //客户选择
            this.contact = "";
            this.popCustomerList = false;
            this.customerId = obj.id;
            this.getCustomeDetail();
        },
        dialogEmployeeClick(type){                  //人员选择人
            this.accompanyShow=true;
            let _this = this;
            setTimeout(function() {    
                _this.employeeMsg = {
                    'type':'accompanyId',
                };
            }, 0);
        },
        getEmployee(num,obj){                           //人员选择
            if(num == '1'){
                this.accompanyShow = false;  
            }else{
                this.accompanyShow = false; 
                this.accompanyIds = obj.idStr;
                this.accompanyNames = obj.nameStr; 
            }
           
        },
    }
}
</script>
<style scoped>
    .mint-checklist .mint-cell {padding: 0;width: 50%!important;float: left;text-align: left;}
    .searchbox {background: #efefef;}
    .popMenu li {border-bottom: 1px dashed gray;text-align: left;padding-left: 20px;line-height: 40px;
      min-height: 40px;list-style: none;margin: 0px;}
    .popMenu {padding: 0px;margin: 0px;}
    .customerList {width: 100%;}
</style>
<style>
    .logwidget .mint-field .mint-cell-title{width: 80px!important;text-align: left;}
</style>