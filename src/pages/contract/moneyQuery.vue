<template id="searchJournal">
    <div class="searchLog" style="font-size: 14px;">
        <div>
            <mt-field  label="客户名称" placeholder="请输入客户名称" v-model="customName" :attr="{maxlength: 100 }"> 
            </mt-field>
        </div>
        <div class="searchList">
            <div style="padding-top:8px; padding-left:4px;background:#5e67fc; height:30px;margin-top:10px; line-height:26px; text-align:center;color: #fff;" v-show="searchreResult">查询结果</div>
            <div class="searchList">
                <ul class='shou-list' v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10" style="margin-top: 0px;">
                    <li v-for="(item,key) in customerList" v-bind:item="item" v-bind:key="key" @click='goDetail(item.customId)' style="padding:5px 0;">
                        <div class="line"></div>
                        <div class="companyName"> {{item.customName}}</div>
                        <div class="companyType"> 
                            <span class="labelcss">总金额：</span>
                            {{item.contractAmount || '无'}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">已收金额：</span>
                            {{item.paidAmount || '无'}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">未收金额：</span>
                            {{item.unpaidAmount || '无'}}
                        </div>
                        <div class="companyType">  
                            <span class="labelcss">客户地址：</span>
                            {{item.fullAdress}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">外贸管理顾问：</span>
                            {{item.saleManageName||'无'}}
                        </div>
                        <div class="clear"></div>
                        </li>
                        <div style=" margin:0 auto;width:60px" v-show='loading'>
                            <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto">
                            </mt-spinner>
                        </div>
                    <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>
                        全部加载完毕
                    </div>
                    <div style="padding:20px; text-align:center; color:gray" v-show='noData'>
                        查询暂无数据！
                    </div>
                </ul>
            </div>
        </div>
    </div>
</template>
<script>
    import { MessageBox } from 'mint-ui';
    import axios from 'axios';
    export default {
        data() {
            return {
                customName  : '',           //客户名称
                searchreResult : false,     //显示查询结果
                loading: false,             //加载中
                customerList: [],           //返回结果
                totalPage: 1,               //总条数
                loadAll: false,             //加载全部
                currentPage: 1,             //当前页
                pageSize: 10,               //每页条数
                noData:false                //没有数据
            }
        },
        mounted: function() {
            this.loadMore();
        },
        methods: {
            onClear(){
                this.customName  = '';  
                this.signedNames = "";
                this.searchreResult = false;
                this.customerList = [];
                this.pageSize = 10;
                this.currentPage = 1;
                this.totalPage = 1;
                this.noData = false;
                this.loadAll = false;
            },
            onSearch: function() {                //按条件查询 
                this.customerList = [];
                this.pageSize = 10;
                this.currentPage = 1;
                this.totalPage = 1;
                this.noData = false;
                this.loadAll = false;
                this.loadMore();
            },
            loadMore() {
                if (this.currentPage > this.totalPage) {
                    return;
                }
                this.loading = true;
                this.searchreResult = true;
                var param = {
                    customName : this.customName,
                    pageRows: this.pageSize,
                    pagingRequired: true,
                    currenPage: this.currentPage
                };
                let self = this;
                axios.post(this.html_url + this.Apilist.selectEontractPayment, param).then(function(data) { 
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
            goDetail(_id){
                this.$router.push({ path: '/contractDetail',query: {customId:_id}});
            },
        }
    }
</script>
<style>
    .searchLog  .mint-field .mint-cell-title {width: 110px;-webkit-box-flex: 0;-ms-flex: none;flex: none;text-align: left!important;}
    .searchLog .mint-field .mint-cell-title{width: 92px!important;text-align: left;}
</style>