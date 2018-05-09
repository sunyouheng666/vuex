<template>
    <div class="pageBox">
        <div class="searchList">
            <ul class='shou-list' v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10" style="margin-top:0;">
                <li v-for="(item,key) in customerList" v-bind:todo="item" v-bind:key="key">
                    <div class="line"></div>
                    <div class="companyType">
                        <span class="labelcss">合同金额：</span>
                        {{item.contractAmount}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">首付金额：</span>
                        {{item.firstPayment}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">已付金额：</span>
                        {{item.paidAmount}}</div>
                    <div class="companyType">
                        <span class="labelcss">未付金额：</span>
                        {{item.unpaidAmount}}</div>
                    <div class="companyType">
                        <span class="labelcss">付款状态：</span>
                        {{item.paymentStatusName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">付款截止日期：</span>
                        {{item.paymentDeadline | TimeCut}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">签约人：</span>
                        {{item.signedName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">签约日期：</span>
                        {{item.signedDate | TimeCut}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">合同状态：</span>
                        {{item.contractStatusName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">实施工程师：</span>
                        {{item.implementationId}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">原件状态：</span>
                        {{item.contractOriginalStatusName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">合同设备：</span>  
                    </div>
                    <div v-if="item.equipmentVOList.length != 0" style="border:1px solid #666;border-bottom: none;">
                        <div  v-for="(tr, index) in item.equipmentVOList" v-bind:todo="tr" v-bind:key="index" 
                        style="background: #ccc;height:112px;border-bottom:1px solid #666;">
                            <div class="companyType" style="width: 50%; float: left">
                                <span class="labelcss">激活码：</span>
                                {{tr.activationCode ||'无'}}
                            </div>
                            <div class="companyType" style="width: 50%;float: right">
                                <span class="labelcss">使用天数：</span>
                                {{tr.useDays}}
                            </div>
                            <div class="companyType" >
                                <span class="labelcss">绑定设备编号：</span>
                                {{tr.bindingDeviceNumber}}
                            </div>
                            <div class="companyType" >
                                <span class="labelcss">绑定手机号：</span>
                                {{tr.bindingPhone}}
                            </div>
                            <div class="companyType" style="width: 50%; float: left">
                                <span class="labelcss">创建时间：</span>
                                {{tr.gmtCreate | TimeCut}}
                            </div>
                            <div class="companyType" style="width: 50%;float: right">
                                <span class="labelcss">激活时间：</span>
                                {{tr.activationTime | TimeCut}}
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        没有合同设备！
                    </div>
                    <div class="companyType">
                        <span class="labelcss">合同备注</span>
                        {{item.remark}}
                    </div>
                    <div class="clear"></div>
                </li>
                <div style=" margin:0 auto; width:60px " v-show='loading'>
                    <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto">
                    </mt-spinner>
                </div>
                <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>
                    全部加载完毕！
                </div>
                <div style="padding:20px; text-align:center; color:gray" v-show='noData'>
                    无符合条件的合同信息！
                </div>
            </ul>
        </div>
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui';
    import axios from 'axios';
    export default {
        data() {
            return {
                loading: false,     //加载中
                customerList: [],   //请求数据
                totalPage: 1,       //总页数
                loadAll: false,     //全部加载完
                currentPage: 1,     //当前页
                pageSize: 10,       //每页条数
                noData:false        //没有数据
            }
        },
        mounted: function() {
            this.loadMore();
        },
        props: [
            'customId'
        ],
        methods: {
            loadMore() {
                if (this.currentPage > this.totalPage) {
                    return;
                }
                this.loading = true;
                let self = this;
                var param = {
                    customId  : self.customId,
                    pageRows: self.pageSize,
                    pagingRequired: true,
                    currenPage: self.currentPage
                };
                axios.post(self.html_url + self.Apilist.selectMobileAppContract, param).then(function(data) { 
                    if (data.data.totalPage==0||data.data.totalPage==null) {
                        self.noData = true;
                    }
                    if(data.data.totalRecords!=null){
                        self.$emit("cswidgetClick",data.data.totalRecords); 
                    }else{
                        self.$emit("cswidgetClick",0);
                    }
                    self.customerList = self.customerList.concat(data.data.data);
                    self.loading = false;
                    self.totalPage = data.data.totalPage;
                    if (self.currentPage == data.data.totalPage) {
                        self.loadAll = true;
                    }
                    self.currentPage = self.currentPage + 1;
                }).catch(function(e) {
                    self.loading = false;
                });
            },
        }
    }
</script>
<style scoped>
    .mint-checklist .mint-cell { padding: 0;width: 50%!important;float: left;text-align: left;}
    .searchList {background: #efefef}
</style>