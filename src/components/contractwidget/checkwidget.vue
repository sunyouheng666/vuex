<template>
    <div class="pageBox">
        <div class="searchList">
            <ul class='shou-list' v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10" style="margin-top:0;">
                <li v-for="(item,key) in customerList" v-bind:item="item" v-bind:key="key">
                    <div class="line"></div>
                    <div class="companyType">
                        <span class="labelcss">验收状态：</span>
                        {{item.acceptanceStatusName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">验收时间：</span>
                        {{item.acceptanceDate | TimeCut}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">实施计划：</span>
                        {{item.implementationPlanName||'无'}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">验收报告：</span>
                        {{item.acceptanceReportName||'无'}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">配置库：</span>
                        {{item.configurationDatabaseName||'无'}}
                    </div>
                    <div style="border-top:1px dashed gray;">
                    </div>
                    <div class="companyType">
                        <span class="labelcss">签约时间：</span>
                        {{item.signedDate | TimeCut}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">合同状态：</span>
                        {{item.contractStatusName||'无'}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">外贸管理顾问：</span>
                        {{item.saleManageName||'无'}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">实施工程师：</span>
                        {{item.implementationName||'无'}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">已付金额：</span>
                        {{item.unpaidAmount||'无'}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">未付金额：</span>
                        {{item.unpaidAmount||'无'}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">客户模块：</span>
                        {{item.businessAmount||'无'}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">业务模块：</span>
                        {{item.businessAmount||'无'}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">权限金额：</span>
                        {{item.permissionAmount||'无'}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">软件模块：</span>
                        {{item.moduleNameStr||'无'}}
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
                    无符合条件的客户！
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
                axios.post(self.html_url + self.Apilist.selectAcceptance, param).then(function(data) { 
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