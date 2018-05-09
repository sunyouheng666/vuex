<template>
    <div class="pageBox">
        <div class="searchList">
            <ul class='shou-list' v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10" style="margin-top:0;">
                <li v-for="(item,key) in customerList" v-bind:item="item" v-bind:key="key">
                    <div class="line"></div>
                    <div class="companyType">
                        <span class="labelcss">合同金额：</span>
                        {{item.contractAmount}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">已付金额：</span>
                        {{item.paidAmount}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">未付金额：</span>
                        {{item.unpaidAmount}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">付款状态：</span>
                        {{item.paymentStatusName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">签约人：</span>
                        {{item.signedName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">合同状态：</span>
                        {{item.contractStatusName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">签约日期：</span>
                        {{item.signedDate | TimeCut}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">付款截止日期：</span>
                        {{item.paymentDeadline | TimeCut}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">权限数：</span>
                        {{item.permissions}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">优惠金额：</span>
                        {{item.preferentialAmount}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">原件状态：</span>
                        {{item.contractOriginalStatusName}}
                    </div>
                    <div class="companyType" style="width: 50%; float: left">
                        <span class="labelcss">包年服务：</span>
                        云服务包年
                    </div>
                    <div class="companyType" style="width: 50%;float: right">
                        <span class="labelcss">年数：</span>
                        {{item.annualService}}年
                    </div>
                    <div class="companyType">
                        <span class="labelcss">金额：</span>
                        {{item.annualServiceAmount}}
                    </div>
                    <div class="companyType" style="width: 50%; float: left">
                        <span class="labelcss">附加服务：</span>
                        增加权限数
                    </div>
                    <div class="companyType" style="width: 50%;float: right">
                        <span class="labelcss">数量：</span>
                        {{item.addPermissions}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">金额：</span>
                        {{item.addPermissionsAmount}}
                    </div>
                    <div class="companyType" style="width: 50%; float: left">
                        <span class="labelcss">附加服务：</span>
                        增加云空间
                    </div>
                    <div class="companyType" style="width: 50%;float: right">
                        <span class="labelcss">数量：</span>
                        {{item.addCloudSpace}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">金额：</span>
                        {{item.addCloudSpaceAmount}}
                    </div>
                    <div class="companyType" style="width: 50%; float: left">
                        <span class="labelcss">附加服务：</span>
                        增加EDM
                    </div>
                    <div class="companyType" style="width: 50%;float: right">
                        <span class="labelcss">数量：</span>
                        {{item.addEdm}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">金额：</span>
                        {{item.addEdmAmount}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">合同备注：</span>
                        {{item.remark || '无'}}
                    </div>
                    <div class="companyType"> 
                        <span class="labelcss">付款记录：</span>  
                    </div>
                    <div v-if="item.paymentRecordList.length != 0" style="border:1px solid #666;border-bottom: none;">
                        <div  v-for="(tr, key) in item.paymentRecordList" v-bind:item="tr" v-bind:key="key" style="background: #ccc;height:140px;border-bottom:1px solid #666;">
                            <div class="companyType" >
                                <span class="labelcss">付款人：</span>
                                {{tr.payerName}}
                            </div>
                            <div class="companyType" style="width: 50%; float: left">
                                <span class="labelcss">金额：</span>
                                {{tr.amount ||'无'}}
                            </div>
                            <div class="companyType" style="width: 50%;float: right">
                                <span class="labelcss">付款时间：</span>
                                {{tr.paymentTime | TimeCut}}
                            </div>
                            <div class="companyType">
                                <span class="labelcss">类型：</span>
                                {{tr.typeName ||'无'}}
                            </div>
                            <div class="companyType">
                                <span class="labelcss">账户：</span>
                                {{tr.accountTypeName ||'无'}}
                            </div>
                            <div class="companyType" style="width: 50%; float: left">
                                <span class="labelcss">收款人：</span>
                                {{tr.payeeName ||'无'}}
                            </div>
                            <div class="companyType" style="width: 50%;float: right">
                                <span class="labelcss">录入时间：</span>
                                {{tr.paymentTime | TimeCut}}
                            </div>
                        </div>
                    </div>
                    <div v-else>
                        没有付款记录！
                    </div>
                    <div class="companyType">
                        <span class="labelcss">创建时间：</span>
                        {{item.gmtCreate | TimeCut}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">修改时间：</span>
                        {{item.gmtModified | TimeCut}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">录入人：</span>
                        {{item.operatorName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">审核人：</span> 
                        {{item.auditorName==null?item.contractStatusName:item.auditorName}}
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
            loadAll: false,     //全部加载完毕
            currentPage: 1,     //当前页
            pageSize: 10,       //每页条数
            noData:false        //没有返回数据
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
            axios.post(self.html_url + self.Apilist.selectSaasContract, param).then(function(data) { 
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
</style>