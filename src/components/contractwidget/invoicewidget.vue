<template>
    <div class="pageBox">
        <div class="searchList">
            <ul class='shou-list' v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10" style="margin-top:0;">
                <li v-for="(item,key) in customerList" v-bind:item="item" v-bind:key="key">
                    <div class="line"></div>
                    <div class="companyType">
                        <span class="labelcss">发票号：</span>
                        {{item.invoiceNum}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">发票金额：</span>
                        {{item.invoiceAmount}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">收票人：</span>
                        {{item.drawerName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">开票人：</span>
                        {{item.receiptName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">开票时间：</span>
                        {{item.invoiceDate | TimeCut}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">发票项目：</span>
                        {{item.invoiceItemName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">说明：</span>
                        {{item.remark}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">回执单：</span>
                        {{item.invoiceReturnReceiptName}}
                    </div>
                    <div class="clear"></div>
                </li>
                <div style="text-align: left;">
                    1. 没有100%项目收款的不要提交；
                </div>
                <div style="text-align: left;">
                    2. 没有客户评价和意见的不要提交；
                </div>
                <div style="text-align: left;">
                    3. 没有盖公章（必须）的不要提交；
                </div>
                <div style="text-align: left;">
                    4. 没有老板或管理层签字的不要提交；
                </div>
                <div style="text-align: left;">
                    每月发实施奖金前，验收报告原件统一寄宁波总部，否则暂缓。
                </div>
                <div style=" margin:0 auto; width:60px " v-show='loading'>
                    <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto">
                    </mt-spinner>
                </div>
                <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>
                    全部加载完毕！
                </div>
                <div style="padding:20px; text-align:center; color:gray" v-show='noData'>
                    无符合条件的发票信息！
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
            axios.post(self.html_url + self.Apilist.selectContractInvoicePagingList, param).then(function(data) { 
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