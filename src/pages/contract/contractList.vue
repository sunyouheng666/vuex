<template>
    <div class="pageBox">
        <mt-header title="查询结果" fixed>
            <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
        </mt-header>
        <div style='padding-top:24px; text-align:left; padding-left:10px;'> </div>
        <div class="searchList">
            <ul class='shou-list' v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                <li v-for="(item,key) in customerList" v-bind:item="item" v-bind:key="key" @click='goDetail(item.customId)'>
                    <div class="line"></div>
                    <div class="companyName"> 
                        {{item.customName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">金额：</span>
                        {{item.contractAmount}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">签约人：</span>
                        {{item.signedName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">签约时间：</span>
                        {{item.signedDate | TimeCut}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">合同类型：</span>
                        {{item.contractTypeName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">合同状态：</span>
                        {{item.contractStatusName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">收款状态：</span>
                        {{item.paymentStatusName}}
                    </div>
                    <div class="companyType">
                        <span class="labelcss">原件状态：</span>
                        {{item.contractOriginalStatusName || '未提交'}}
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
                loading: false,
                customerList: [],
                totalPage: 1,
                loadAll: false,
                currentPage: 1,
                pageSize: 10,
                noData:false
            }
        },
        mounted: function() {
            this.loadMore();
        },
        methods: {
            goDetail(_id){
                this.$router.push({ path: '/contractDetail',query: {customId:_id}});
            },
            loadMore() {
                if (this.currentPage > this.totalPage) {
                    return;
                }
                this.loading = true;
                let self = this;
                var param = {
                    customName : self.$route.query.customName,
                    signedIds : self.$route.query.signedIds,
                    signedDateStr : self.$route.query.signedDateStr,
                    contractStatus : self.$route.query.contractStatus,
                    contractType : self.$route.query.contractType,
                    contractOriginalStatus : self.$route.query.contractOriginalStatus,
                    paymentStatus : self.$route.query.paymentStatus,
                    pageRows: self.pageSize,
                    pagingRequired: true,
                    currenPage: self.currentPage
                };
                axios.post(self.html_url + self.Apilist.contractSelect, param).then(function(data) { 
                    if (data.data.totalPage==0||data.data.totalPage==null) {
                        self.noData = true;
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
            getData() {
                let self = this;
                var param = {};
            },
            back: function() {
                this.$router.push({ path:'/contract',query:{type:'1'}});
            },
        }
    }
</script>
<style>
    .mint-tab-container-wrap {display: -webkit-box;display: -ms-flexbox;display: flex;margin-top: 3px!important;}
</style>
<style scoped>
    .mint-checklist .mint-cell { padding: 0;width: 50%!important;float: left;text-align: left;}
</style>