<template>
    <div style="font-size: 14px;" class="workwidget">
        <!-- 销售日志 -->
        <mt-field label="维护工程师" placeholder="" v-model="salesmanName" disabled>
            <span class="required">*</span>
        </mt-field>
        <mt-field label="维护日期" placeholder="请输入日期" type="date" v-model="maintainTime" class="time-height">
            <span class="required">*</span>
        </mt-field>
        <mt-field label="类型" placeholder="请选择类型" v-model="serviceTypeName" @click.native='serviceTypeShow=true' readonly>
            <span class="required">*</span>
        </mt-field>
        <mt-field label="开始时间" placeholder="请输入日期" type="time" v-model="startTime" class="time-height">
            <span class="required">*</span>
        </mt-field>
        <mt-field label="耗时时长" placeholder="请输入耗时时长(单位：小时)" v-model="duration" :attr="{ maxlength: 5 }">
            <span class="required">*</span>
        </mt-field>
        <mt-field label="工作内容" placeholder="请输入工作内容" v-model="content" type="textarea" :attr="{maxlength: 500 }">
            <span class="required">*</span>
        </mt-field>
        <mt-popup v-model="serviceTypeShow" position="bottom" style='width:100%'>
            <div class="title-pop">选择服务类型</div>
            <mt-picker :slots="serviceTypeArr"  @change="onChangeServiceType" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="serviceTypeShow"></mt-picker>
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
            salesmanName: this.tempsalesmanName,    //维护工程师名称
            maintainId: this.tempsalesmanId,        //维护工程师id
            maintainTime: '',                       //拜访日期
            startTime:"",                           //开始时间
            type :"",                               //类型
            duration :"",                           //工作时长 
            content :"",                            //工作内容
            serviceTypeName: '',        //服务类型名称
            type : "",                  //类型
            serviceTypeArr: [{               //最高级别数组 
                flex: 1,
                values:[ {          //客户类型
                    id: '1',name: '学习'
                }, {
                    id: '2',name: '测试'
                }, {
                    id: '3',name: '内部培训'
                }],  
                className: 'serviceTypeArr',
                textAlign: 'center',
                defaultIndex: 1,
            }],
            serviceTypeShow: false,     //服务类型显示隐藏 
        }
    },
    props: {
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
        this.maintainId = list.employeeId;
    },
    mounted: function() {
    },
    methods: {
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
        validateForm: function() {              //表单验证
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
            if (this.type == '') {
                MessageBox('提示', '请选择类型！');
                return false
            } 
            if (this.startTime == '') {
                MessageBox('提示', '请输入开始时间！');
                return false
            }
            if (this.duration == '') {
                MessageBox('提示', '请输入耗时时长！');
                return false
            }
            let reg = /^([\d]{0,2})(\.[\d]{2})?$/;
            if(!reg.test(this.duration)){
                MessageBox('提示', '耗时时长输入错误（例：99/99.99）！');
                return false
            }
            if (this.content == '') {
                MessageBox('提示', '请输入工作内容！');
                return false
            }
            return true
        },
        saveWork: function() { //保存日志
            var self = this; 
            if (!this.validateForm()) {
              return
            }
            if(this.maintainTime.length<12){
              this.maintainTime = this.maintainTime+" 00:00:00";
            }
            // 验证    
            var param = {
                maintainId: this.maintainId,                //录入人
                maintainTime: this.maintainTime,            //维护日期
                startTime: this.maintainTime.substr(0,10) +" "+this.startTime + ':00',             //服务时间
                type:this.type,
                duration:this.duration,
                content:this.content,
            };
            Indicator.open({
              text: '加载中...',
              spinnerType: 'fading-circle'
            });
            axios.post(self.html_url + self.Apilist.dailyWork, param).then(function(data) {
              Indicator.close();
              MessageBox.alert('保存成功','提示');
              self.clearWork();
            }).catch(function(e) {
              Indicator.close();
            });
        },
        clearWork(){
            this.maintainTime = this.timer(new Date()); 
            this.startTime = ''; 
            this.type  = ''; 
            this.serviceTypeName = ''; 
            this.duration  = ''; 
            this.content = ''; 
        },
        onChangeServiceType: function(picker, values) {       //选择服务类型
            if (values[0] == undefined) {
              return
            }
            this.serviceTypeName = values[0].name;
            this.type = values[0].id;
        }
    }
}
</script>
<style scoped>
    .mint-checklist .mint-cell {padding: 0;width: 50%!important;float: left;text-align: left;}
    .required {display: inline-block;line-height: 36px;height: 36px;color: red;}
    .searchbox {background: #efefef;}
    .popMenu li {border-bottom: 1px dashed gray;text-align: left;padding-left: 20px;line-height: 40px;min-height: 40px;list-style: none;margin: 0px;}
    .popMenu {padding: 0px;margin: 0px;}
    .customerList {width: 100%;}
</style>
<style>
    .workwidget .mint-field .mint-cell-title{width: 90px!important;text-align: left;}
</style>