<template id="searchJournal">
    <div class="searchLog" style="font-size: 14px;">
        <mt-field  label="客户名称" placeholder="请输入客户名称" v-model="customName" :attr="{maxlength: 100 }"> 
        </mt-field>
        <mt-field readonly label="合同类型" placeholder="请选择合同类型" v-model="contractTypeName" @click.native='contractTypePop=true'>
        </mt-field>
        <mt-field readonly label="合同状态" placeholder="请选择合同状态" v-model="contractStatusName" @click.native='contractStatusPop=true'>
        </mt-field>
        <mt-field readonly label="收款状态" placeholder="请选择收款状态" v-model="paymentStatusName" @click.native='paymentStatusPop=true'>
        </mt-field>
        <mt-field readonly label="原件状态" placeholder="请选择原件状态" v-model="contractOriginalStatusName" @click.native='contractOriginalStatusPop=true'>
        </mt-field>
        <mt-field readonly label="签约人" placeholder="请选择签约人" v-model="signedNames" @click.native='signedPop=true'>
        </mt-field>
        <mt-field label="签约时间" placeholder="" type="date" v-model="signedDateStr" class="time-height">
        </mt-field>
        <!-- 合同类型 -->
        <mt-popup v-model="contractTypePop" position="bottom" style='width:100%'>
            <div class="title-pop">选择合同类型</div>
            <mt-picker :slots="contractTypeArr"  @change="contractTypeChange" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="contractTypePop"></mt-picker>
        </mt-popup>
        <!-- 合同类型 -->
        <mt-popup v-model="contractStatusPop" position="bottom" style='width:100%'>
            <div class="title-pop">选择合同状态</div>
            <mt-picker :slots="contractStatusArr"  @change="contractStatusChange" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="contractStatusPop"></mt-picker>
        </mt-popup>
        <!-- 合同类型 -->
        <mt-popup v-model="paymentStatusPop" position="bottom" style='width:100%'>
            <div class="title-pop">选择收款状态</div>
            <mt-picker :slots="paymentStatusArr"  @change="paymentStatusChange" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="paymentStatusPop"></mt-picker>
        </mt-popup>
        <!-- 合同类型 -->
        <mt-popup v-model="contractOriginalStatusPop" position="bottom" style='width:100%'>
            <div class="title-pop">选择原件状态</div>
            <mt-picker :slots="contractOriginalStatusArr" @change="contractOriginalStatusChange" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="contractOriginalStatusPop"></mt-picker>
        </mt-popup>
        <mt-popup v-model="signedPop" position="bottom" style='width:100%'>
            <div class="title-pop">选择签约人</div>
            <mt-picker :slots="signedArr"  @change="signedChange" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="signedPop"></mt-picker>
        </mt-popup>
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui';
    import axios from 'axios';
    export default {
        data() {
            return {
                currenPage: 1,
                pageRows: 10,
                customName  : '',           //客户名称
                signedNames :'',            //签约人名称
                signedIds :'',              //签约人
                signedArr: [{
                    flex: 1,
                    values: [],
                    className: 'contractStatusArr',
                    textAlign: 'center',
                    defaultIndex: 1,
                }],
                signedPop: false,
                signedDateStr :'',          //签约时间
                //----------------------------
                contractStatusName:'',      //合同状态名称
                contractStatus :'',         //合同状态
                contractStatusArr: [{
                    flex: 1,
                    values: [{      //合同状态
                        id: '0',
                        name: '未审核'
                    }, {
                        id: '1',
                        name: '审核中'
                    }, {
                        id: '2',
                        name: '已审核'
                    }],
                    className: 'contractStatusArr',
                    textAlign: 'center',
                    defaultIndex: 1,
                }],
                contractStatusPop: false,
                //----------------------------
                contractTypeName:'',      //合同类型名称
                contractType :'',           //合同类型
                contractTypeArr: [{
                    flex: 1,
                    values: [],
                    className: 'contractTypeArr',
                    textAlign: 'center',
                    defaultIndex: 1,
                }],
                contractTypePop: false,
                //----------------------------
                paymentStatusName :'',          //付款状态名称
                paymentStatus :'',          //付款状态
                paymentStatusArr: [{
                    flex: 1,
                    values: [{      //合同状态
                        id: '0',
                        name: '未付款'
                    }, {
                        id: '1',
                        name: '在付款'
                    }, {
                        id: '2',
                        name: '履约完成'
                    }, {
                        id: '3',
                        name: '中止付款'
                    }],
                    className: 'paymentStatusArr',
                    textAlign: 'center',
                    defaultIndex: 1,
                }],
                paymentStatusPop: false,
                //----------------------------
                contractOriginalStatusName:'',  //合同原件状态名称
                contractOriginalStatus:'',  //合同原件状态
                contractOriginalStatusArr: [{
                    flex: 1,
                    values: [{      //合同状态
                        id: '0',
                        name: '未提交'
                    }, {
                        id: '1',
                        name: '已提交'
                    }],
                    className: 'contractOriginalStatusArr',
                    textAlign: 'center',
                    defaultIndex: 1,
                }],
                contractOriginalStatusPop: false,
            }
        },
        props: {
        },
        created:function(){

        },
        watch: { 
        },
        mounted: function() {
            this.getSelectEmployeeList();
            this.getContractTypes();
        },
        methods: {
            contractTypeChange: function(picker, values) {
                if (values[0] == undefined) {
                    return
                }
                this.contractTypeName = values[0].name;
                this.contractType = values[0].id;
            },
            contractStatusChange: function(picker, values) {
                if (values[0] == undefined) {
                    return
                }
                this.contractStatusName = values[0].name;
                this.contractStatus = values[0].id;
            },
            paymentStatusChange: function(picker, values) {
                if (values[0] == undefined) {
                    return
                }
                this.paymentStatusName = values[0].name;
                this.paymentStatus = values[0].id;
            },
            contractOriginalStatusChange: function(picker, values) {
                if (values[0] == undefined) {
                    return
                }
                this.contractOriginalStatusName = values[0].name;
                this.contractOriginalStatus = values[0].id;
            },
            signedChange: function(picker, values) {
                if (values[0] == undefined) {
                    return
                }
                this.signedNames = values[0].name;
                this.signedIds = values[0].id;
            },
            getSelectEmployeeList(){            //获取员工
                let self = this;
                axios.post(self.html_url + self.Apilist.selectEmployeeList, {}).then(function(data) {
                    var listTemp = data.data.data;
                    if (listTemp.length == 0) {
                        MessageBox('提示', '暂无选项！');
                        return
                    }
                    for (var i = 0; i < listTemp.length; i++) {
                        self.signedArr[0].values.push({ id: listTemp[i].id, name: listTemp[i].name }); 
                    }
                }).catch(function(e) {});
            },
            getContractTypes(){            //合同类型
                let self = this;
                axios.get(self.html_url + self.Apilist.contractTypes, {}).then(function(data) {
                    var listTemp = data.data.data;
                    if (listTemp.length == 0) {
                        MessageBox('提示', '暂无选项！');
                        return
                    }
                    for (var i = 0; i < listTemp.length; i++) {
                        self.contractTypeArr[0].values.push({ id: listTemp[i].type, name: listTemp[i].name }); 
                    }
                }).catch(function(e) {});
            },
            onClear(){
                this.customName  = '';  
                this.signedNames  = '';  
                this.signedIds  = ''; 
                this.signedDateStr  = ''; 
                this.contractStatusName  = ''; 
                this.contractStatus  = ''; 
                this.contractTypeName  = ''; 
                this.contractType  = ''; 
                this.contractOriginalStatusName  = ''; 
                this.contractOriginalStatus  = ''; 
                this.paymentStatusName  = ''; 
                this.paymentStatus  = ''; 
            },
            onSearch: function() {                //按条件查询 
                var param = {
                    customName : this.customName,
                    signedIds : this.signedIds,
                    signedDateStr : this.signedDateStr,
                    contractStatus : this.contractStatus,
                    contractType : this.contractType,
                    contractOriginalStatus : this.contractOriginalStatus,
                    paymentStatus : this.paymentStatus,
                }
                this.$router.push({path: 'contractList',query: param});  
            },
        }
    }
</script>