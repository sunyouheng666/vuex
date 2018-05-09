<template id="searchJournal">
    <div class="searchLog" style="font-size: 14px;">
        <mt-field  label="客户名称" placeholder="请输入客户名称" v-model="customer" :attr="{maxlength: 100 }"> 
        </mt-field>
        <mt-field readonly label="维护工程师" placeholder="请选择维护工程师" v-model="guWen" @click.native='showGuWen'>
        </mt-field>
        <mt-field readonly label="外贸管理顾问" placeholder="请选择外贸管理顾问" v-model="Lururen" @click.native='showLururen'> 
        </mt-field>
        <mt-field readonly label="维护次数" placeholder="请选择维护次数" v-model="maintainTimesName" @click.native='maintainTimesPop=true'>
        </mt-field>
        <mt-field readonly label="未联系时间" placeholder="请选择未联系时间" v-model="customerType" @click.native='showCustomerType'>
        </mt-field>
        <mt-field readonly label="省份" placeholder="请选择省份" v-model="province" @click.native='showProvince'>
        </mt-field>
        <mt-field readonly label="城市" placeholder="请选择城市" v-model="city" @click.native='showCity(provinceId)'>
        </mt-field>
        <mt-field readonly  label="区县" placeholder="请选择区县" v-model="area" @click.native='showArea(cityId)'>
        </mt-field>
        <mt-field label="维护起始时间" placeholder="拜访起始时间" type="date" v-model="visitStart2" class="time-height">
        </mt-field>
        <mt-field label="维护结束时间" placeholder="拜访结束时间" type="date" v-model="visitEnd2" class="time-height">
        </mt-field>
        <mt-popup v-model="showProvincePop" position="bottom" style='width:100%'>
            <div class="title-pop"> 选择省份 </div>
            <mt-picker :slots="slotsProvince" ref="pickerProvince" @change="onValChangeProvince" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showProvincePop"></mt-picker>
        </mt-popup>
        <mt-popup v-model="showCityPop" position="bottom" style='width:100%'>
            <div class="title-pop"> 选择城市 </div>
            <mt-picker :slots="slotsCity" ref="pickerCity" @change="onValChangeCity" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showCityPop"></mt-picker>
        </mt-popup>
        <mt-popup v-model="showAreaPop" position="bottom" style='width:100%'>
            <div class="title-pop">选择区县</div>
            <mt-picker :slots="slotsArea" ref="pickerArea" @change="onValChangeArea" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showAreaPop"></mt-picker>
        </mt-popup>
        <mt-popup v-model="showLururenPop" position="bottom" style='width:100%'>
            <div class="title-pop">选择录入人</div>
            <mt-picker :slots="slotsLururen" ref="pickerNewlevel" @change="onValChangeLururen" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showLururenPop"></mt-picker>
        </mt-popup>
        <!-- 维护次数-->
        <mt-popup v-model="maintainTimesPop" position="bottom" style='width:100%'>
            <div class="title-pop">选择维护次数</div>
            <mt-picker :slots="maintainTimesArr"  @change="onChangeMaintainTimes" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="maintainTimesPop"></mt-picker>
        </mt-popup>
        <!-- 未联系时间 -->
        <mt-popup v-model="showCustomerTypePop" position="bottom" style='width:100%'>
            <div class="title-pop">选择未联系时间</div>
            <mt-picker :slots="slotsCustomerType"  @change="onValChangeCustomerType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showCustomerType"></mt-picker>
        </mt-popup>
        <!-- 外贸管理顾问 -->
        <mt-popup v-model="showGuWenPop" position="bottom" style='width:100%'>
            <div class="title-pop">外贸管理顾问</div>
            <mt-picker :slots="slotsGuWen" ref="pickerGuWen" @change="onValChangeGuWen" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showGuWenPop"></mt-picker>
        </mt-popup>
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui';
    import axios from 'axios';
    export default {
        data() {
            return {
                //------------------------------------------
                currenPage: 1,
                pageRows: 10,
                guWen: '',
                guWenId: '',
                slotsGuWen: [{
                    flex: 1,
                    values: [],
                    className: 'slotsGuWen',
                    textAlign: 'center',
                    defaultIndex: 1,
                    }],
                showGuWenPop: false,
                //-------------维护次数--------------------
                maintainTimesName: '',
                maintainTimes:'',
                maintainTimesArr: [{
                    flex: 1,
                    values: [{ 
                        id: '0',
                        name: '无'
                    },{
                        id: '1',
                        name: '1次'
                    }, {
                        id: '2',
                        name: '2次'
                    }, {
                        id: '3',
                        name: '3次'
                    }, {
                        id: '4',
                        name: '4次'
                    }, {
                        id: '5',
                        name: '5次'
                    }, {
                        id: '6',
                        name: '6次'
                    }, {
                        id: '7',
                        name: '7次'
                    }, {
                        id: '8',
                        name: '8次'
                    }, {
                        id: '9',
                        name: '9次'
                    }, {
                        id: '10',
                        name: '10次'
                    }, {
                        id: '11',
                        name: '10次以上'
                    }],
                    className: 'maintainTimesArr',
                    textAlign: 'center',
                    defaultIndex: 1,
                }],
                maintainTimesPop: false,
                //------------------------------------------
                customerType: '',
                customerTypeId:'',
                slotsCustomerType: [{
                    flex: 1,
                    values: [{      //客户类型
                        id: '1',
                        name: '15天'
                    }, {
                        id: '2',
                        name: '一个月'
                    }, {
                        id: '3',
                        name: '两个月'
                    }, {
                        id: '4',
                        name: '三个月'
                    }, {
                        id: '5',
                        name: '半年'
                    }, {
                        id: '6',
                        name: '一年及以上'
                    }],
                    className: 'slotsCustomerType',
                    textAlign: 'center',
                    defaultIndex: 1,
                }],
                showCustomerTypePop: false,
                // --------------------------
                Lururen: '',
                LururenId: '',
                slotsLururen: [{
                    flex: 1,
                    values: [],
                    className: 'slotsLururen',
                    textAlign: 'center',
                    defaultIndex: 1,
                }],
                showLururenPop: false,
                // --------------------------
                area: '',
                areaId: '',
                //city--------------------------
                slotsArea: [{
                    flex: 1,
                    values: [],
                    className: 'slotsArea',
                    textAlign: 'center',
                    defaultIndex: 1,
                }],
                showAreaPop: false,
                //city--------------------------
                city: '',
                cityId: '',
                slotsCity: [{
                    flex: 1,
                    values: [],
                    className: 'slotsCity',
                    textAlign: 'center',
                    defaultIndex: 1,
                }],
                showCityPop: false,
                //----------------------------
                proCity: null,
                provinceId: '',
                province: '',
                //省
                slotsProvince: [{
                    flex: 1,
                    values: [],
                    className: 'slotsProvince',
                    textAlign: 'center',
                    defaultIndex: 1,
                }],
                showProvincePop: false,
                //----------------------------
                visitEnd2: '',
                visitStart2: '',
                //-----------------------
                username: '',
                visitContent: '',
                softStatus: '',
                customer: '',
                customerId: '',
                visitDate: '',
                selected: '1',
                selected2: '21',
                userInfo: '',
            }
        },
        props: {
        },
        created:function(){
            this.clearLogClick();
            this.showPostName();
        },
        watch: { 
        },
        mounted: function() {
            this.customerTypeId = '';
            this.customerType= '';
        },
        methods: {
            clearLogClick: function() { 
                this.customer = '';
                this.customerId = '';
                this.province = '';
                this.provinceId = '';
                this.city = '';
                this.cityId = '';
                this.area = '';
                this.areaId = '';
                this.Lururen= '';
                this.LururenId = "";
                this.customerType= '';
                this.customerTypeId= '';
                this.guWen= '';
                this.guWenId= '';
                this.visitStart2= '';
                this.visitEnd2= ''; 
                this.salesmanIds = ''; 
                this.maintainTimesName = "";
                this.maintainTimes = "";
            },
            showPostName(){
                this.userInfo = JSON.parse(localStorage.userInfo);  
            },
            searchLogClick: function() {           //销售日志搜索条件
                var self = this;
                if(this.visitStart2 != '' && this.visitEnd2 == ''){
                    MessageBox('提示', '请选择维护结束日期！');
                    return
                }else if(this.visitStart2 == '' && this.visitEnd2 != ''){
                    MessageBox('提示', '请选择维护开始日期！');
                    return
                }else if (this.visitStart2 > this.visitEnd2) {
                    MessageBox('提示', '维护结束日期不能早于开始日期！');
                    return
                }
                var param = {
                    customName : this.customer,                 //客户名称
                    maintainId :this.guWenId,                   //维护工程师
                    maintainStartTimeStr : this.visitStart2,    //维护时间开始
                    maintainEndTimeStr : this.visitEnd2,        //维护时间结束
                    saleManageIds : this.LururenId,             //
                    noContactDay : this.customerTypeId,         //
                    maintainTimes : this.maintainTimes,         //
                    provinceId : this.provinceId,               //省
                    cityId : this.cityId,                       //市
                    areaId : this.areaId,                       //区
                    pagingRequired: true,                       //
                    pageRows: this.pageRows,                    //
                    currenPage: this.currenPage,                //
                }
                this.$router.push({ path: 'maintenanceDetail', query: param})
            },
            //--------------------------------------
            onValChangeGuWen: function(picker, values) {
                if (values[0] == undefined) {
                    return
                }
                this.guWen = values[0].name;
                this.guWenId = values[0].id;
            },
            showGuWen: function() {
                var self = this;
                self.slotsGuWen[0].values = [];
                axios.post(self.html_url + self.Apilist.selectEmployeeList, {}).then(function(data) {
                    var listTemp = data.data.data;
                    if (listTemp.length == 0) {
                    MessageBox('提示', '暂无选项！');
                    return
                    }
                    for (var i = 0; i < listTemp.length; i++) {
                    self.slotsGuWen[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
                    }
                    self.showGuWenPop = true;
                }).catch(function(e) {});
            },
            //-------------------------------------
            showCustomerType: function() { //  客户类型
                var self = this;
                self.showCustomerTypePop = true;
            },
            onValChangeCustomerType: function(picker, values) {
                if (values[0] == undefined) {
                    return
                }
                this.customerType = values[0].name;
                this.customerTypeId = values[0].id;
            },
            onChangeMaintainTimes: function(picker, values) {
                if (values[0] == undefined) {
                    return
                }
                this.maintainTimesName = values[0].name;
                this.maintainTimes = values[0].id;
            },
            //--------------------------------------------------
            onValChangeArea: function(picker, values) {
                if (values[0] == undefined) {
                    return
                }
                this.area = values[0].name;
                this.areaId = values[0].id
            },
            showArea: function(cityId) {
                var self = this;
                if (cityId == '') {
                    MessageBox('提示', '请先选择市！');
                    return
                } else {
                    var param = {
                        cId: cityId
                    };
                    self.slotsArea[0].values = [];
                    axios.post(self.html_url + self.Apilist.selectAreaList, param).then(function(data) {
                    var listTemp = data.data.data;
                    if (listTemp.length == 0) {
                        MessageBox('提示', '暂无选项！');
                        return
                    }
                    for (var i = 0; i < listTemp.length; i++) {
                        self.slotsArea[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
                    }
                    self.showAreaPop = true;
                    }).catch(function(e) {});
                }
            },
            //------------------------------------- 选择市
            onValChangeCity: function(picker, values) {
                if (values[0] == undefined) {
                    return
                }
                this.city = values[0].name;
                this.cityId = values[0].id; 
                this.area = ''; 
                this.areaId = '';
            },
            showCity: function(provinceId) {
                var self = this;
                if (provinceId == '') {
                    MessageBox('提示', '请先选择省！');
                    return
                } else {
                var param = {
                    pId: provinceId
                };
                self.slotsCity[0].values = [];
                axios.post(self.html_url + self.Apilist.selectCityList, param).then(function(data) {
                    var listTemp = data.data.data;
                    if (listTemp.length == 0) {
                        MessageBox('提示', '暂无选项！');
                        return
                    }
                    for (var i = 0; i < listTemp.length; i++) {
                        self.slotsCity[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
                    }
                    self.showCityPop = true;
                }).catch(function(e) {});
                }
            },
            //------------------------------------- 选择省
            onValChangeProvince: function(picker, values) {
                if (values[0] == undefined) {
                    return
                }
                this.province = values[0].name;
                this.provinceId = values[0].id;
                this.city = '';
                this.cityId = '';
                this.area = ''; 
                this.areaId = '';
            },
            showProvince: function() {
                var self = this;
                self.slotsProvince[0].values = [];
                axios.post(self.html_url + self.Apilist.selectProvinceList, {}).then(function(data) {
                    var listTemp = data.data.data;
                    if (listTemp.length == 0) {
                    MessageBox('提示', '暂无选项！');
                    return
                    }
                    for (var i = 0; i < listTemp.length; i++) {
                    self.slotsProvince[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
                    }
                    self.showProvincePop = true;
                }).catch(function(e) {});
            },
            //--------------------------------------
            onValChangeHigh: function(picker, values) {
            if (values[0] == undefined) {
                return
            }
            this.highlevel = values[0].name;
            this.highlevelId = values[0].id;  
            },
            showHigh: function() {
                var self = this;
                self.slotsHigh[0].values = [];
                axios.post(self.html_url + self.Apilist.selectHighestLevelList, {}).then(function(data) {
                    var listTemp = data.data.data;
                    if (listTemp.length == 0) {
                    MessageBox('提示', '暂无选项！');
                    return
                    }
                    for (var i = 0; i < listTemp.length; i++) {
                    self.slotsHigh[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
                    }
                    self.showHighPop = true;
                }).catch(function(e) {});
            },
            //-------------------------------------
            showLururen: function() {
                var self = this;
                self.slotsLururen[0].values = [];
                axios.post(self.html_url + self.Apilist.selectEmployeeList, {}).then(function(data) {
                    var listTemp = data.data.data;
                    if (listTemp.length == 0) {
                    MessageBox('提示', '暂无选项！');
                    return
                    }
                    for (var i = 0; i < listTemp.length; i++) {
                    self.slotsLururen[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
                    }
                    self.showLururenPop = true;
                }).catch(function(e) {});
            },
            onValChangeLururen: function(picker, values) {
                if (values[0] == undefined) {
                    return
                }
                this.Lururen = values[0].name;
                this.LururenId = values[0].id;
            },
        }
    }
</script>
<style>
    .searchLog  .mint-field .mint-cell-title {width: 110px;-webkit-box-flex: 0;-ms-flex: none;flex: none;text-align: left!important;}
    .time-height .mint-field-core {background: #efefef;height: 25px;}
</style>