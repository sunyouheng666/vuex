<template>
    <div class="pageBox">
        <mt-header title="查询结果" fixed>
            <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
        </mt-header>
        <div class="searchResult">
            <div class="searchList" >
                <ul v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li v-for="(item,key) in journalList" v-bind:item="item" v-bind:key="key" style="position: relative;">
                        <div class="line"></div>
                        <div class="companyName">{{item.customName}}</div>
                        <div class="companyType">
                            <span class="labelcss">外贸管理顾问:</span>
                            {{item.saleManageName}}
                        </div>
                        <div class="companyType">
                            <span class="labelcss">维护工程师:</span>
                            {{item.maintainName}}
                        </div>
                        <div class="companyType">
                            <span class="labelcss">维护次数:</span>
                            {{item.maintainTimes == '' ||item.maintainTimes == null ?'0':item.maintainTimes}}次
                        </div>
                        <div class="companyType">
                            <span class="labelcss">维护天数:</span>
                            {{item.maintainDays == '' ||item.maintainDays == null ?'0':item.maintainDays}}天
                        </div>
                        <div class="companyType">
                            <span class="labelcss">最近维护:</span>
                            {{item.lastMaintainTime | TimeCut}}
                        </div>
                        <div class="companyType">
                            <span class="labelcss">维护时间:</span>
                            {{item.maintainStartDate | TimeCut}}—{{item.maintainEndDate | TimeCut}}
                        </div>
                        <span class="base-btn-kehu fr" style="cursor: pointer;position: absolute;bottom: 6px;right: 2px;background:#5e67fc;" @click="sendEmail(item.maintainContractId)">
                            发邮件
                        </span>
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
    import axios from 'axios';
    export default {
        data() {
            return {
                loading: false,           //加载中
                journalList: [],          //搜索日志数据
                totalPage: 1,             //总页数
                loadAll: false,           //全部加载完毕
                currentPage: 1,           //当前页
                pageSize:40,              //每页显示内容数
                noData:false,             //查询暂无数据！
                searchApi:'',             //查询路径
                activeTab:'2',            //返回标签页ID
                searchType:"",            //搜索类型
                manageFlag:"",            //管理权限
            }
        },
        created:function(){
        },
        mounted: function() {
            this.journalList = [];
            this.loadMore();
            this.init();
        },
        computed: {   
        },
        methods: {
            init(){
                let list = JSON.parse(localStorage.userInfo);  
                this.manageFlag = list.manageFlag;
            },
            loadMore() {
                if (this.currentPage > this.totalPage) {
                    return;
                }
                this.loading = true;
                var param = { 
                    customName : this.$route.query.customName,                  //客户名称
                    saleManageIds : this.$route.query.saleManageIds,
                    maintainStartTimeStr : this.$route.query.maintainStartTimeStr,
                    maintainEndTimeStr : this.$route.query.maintainEndTimeStr,
                    noContactDay : this.$route.query.noContactDay,
                    maintainTimes : this.$route.query.maintainTimes,
                    maintainId : this.$route.query.maintainId,
                    provinceId : this.$route.query.provinceId,                  //省
                    cityId : this.$route.query.cityId,                          //市
                    areaId : this.$route.query.areaId,                          //区
                    pagingRequired: true,                       //
                    pageRows: this.pageRows,                    //
                    currenPage: this.currenPage,                //
                };
                let self = this;
                axios.post(this.html_url + this.Apilist.selectMaintainListPaging, param).then(function(data) {
                if (data.data.totalRecords==0||data.data.totalRecords==null) {
                    self.noData = true;
                }
                self.journalList = self.journalList.concat(data.data.data);
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
            back:function(){
                if(this.$route.query.feedBackDetail == undefined){
                    this.$router.push({ path: '/engineering',query:{tabType:'3'}});
                }else{
                    this.$router.go(-1);
                } 
            },
            sendEmail(_id){
                this.$router.push({ path:'/mailEdit',query:{idList:_id,typeList:'1'}});
            }
        }
    }
</script>
<style scoped>
    .base-btn-kehu{display: inline-block;width: 70px;height:26px;background: #5e67fc;color: #ffffff;line-height: 28px;border-radius: 4px;text-align: center; margin-left: 10px;}
    .base-btn-kehu:hover{cursor: pointer;}
    ul{margin-top: 0;}
    .searchResult {margin-top: 39px;}
</style>