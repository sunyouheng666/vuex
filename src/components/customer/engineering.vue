<template>
    <div class="logDetail">
        <div class="searchResult">
            <div class="searchList" >
                <ul v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li v-for="(item,index) in journalList" >
                        <div class="line"></div>
                        <div class="companyType">
                            <span class="labelcss">维护工程师:</span>
                            {{item.maintainName || '无'}}
                        </div>
                        <div class="companyType">
                            <span class="labelcss">维护日期:</span>
                            {{item.maintainTime  | TimeCut}}
                        </div>
                        <div class="companyType">
                            <span class="labelcss">服务类型:</span>
                            {{item.serviceTypeName}}
                        </div>
                        <div class="companyType">
                            <span class="labelcss">录入日期:</span>
                            {{item.gmtCreate}}
                        </div>
                        <!-- 销售日志 -->
                        <div class="companyType" v-if="searchType=='salelog'">
                            <span class="labelcss">车费:</span>
                            {{item.salesmanName}}
                        </div>
                        <div class="companyType" v-if="searchType=='salelog'">
                            <span class="labelcss">录入人:</span>
                            {{item.totalFare | TimeCut}}
                        </div>
                        <div class="companyType"  v-if="searchType=='marketlog'">
                            <span class="labelcss">维护时间:</span>
                            {{item.serviceTime }}
                        </div>
                        <div class="companyType">
                            <span class="labelcss">维护时长:</span>
                            {{item.serviceDuration  || '无'}}小时
                        </div>
                        <div class="companyType">
                            <span class="labelcss">联系人:</span>
                            {{item.contactName || '无'}}
                        </div>
                        <div class="companyType">
                            <span class="labelcss">陪访人:</span>
                            {{item.accompanyNames || '无'}}
                        </div>
                        <div class="companyType" >
                            <span class="labelcss">维护内容:</span>
                            <div  v-if ="item.maintainContentsList.length == 0" style="width: 100%;text-align: left;">
                                无
                            </div>
                            <div v-else>
                                <div v-for="(List, index) in item.maintainContentsList">   
                                    {{index+1}}、{{ List.typeName}}：{{ List.content}}
                                </div>
                            </div>
                        </div>
                        <div class="companyType" >
                            <span class="labelcss">使用反馈:</span>
                            <div  v-if ="item.feedbackTypeName == null" style="width: 100%;text-align: left;">
                                无
                            </div>
                            <div v-else >
                                {{item.feedbackTypeName}};原因：{{item.feedbackContent}}
                            </div>
                        </div>
                        <div class="companyType" style="position: relative;">
                            <span class="labelcss">主管批注:</span>
                            <div v-if ="item.logCommentList.length == 0" style="width: 100%;" >
                                无
                            </div>
                            <div v-else style="width: 100%;"  v-for="(img,key) in item.logCommentList" >
                                <span  >{{key+1}}、{{img.content}}</span>
                            </div>
                        </div>
                        <div class="clear"></div> 
                    </li>
                    <div style=" margin:0 auto;width:60px" v-show='loading'>
                        <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto">
                        </mt-spinner>
                    </div>
                    <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕</div>
                    <div style="padding:20px; text-align:center; color:gray" v-show='noData'>查询暂无数据！</div>
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
                manageFlag:"",              //
            }
        },
        mounted: function() {

        },
        props:[
            'customerName'
        ],
        watch:{
            'customerName'(n){
                this.journalList = [];
                this.loadMore(this.customerName);
            }
        },
        computed: {   
        },
        methods: {
            loadMore(name) {
                if (this.currentPage > this.totalPage) {
                    return;
                }
                this.loading = true;
                let self = this;
                var param={
                        customName:this.customerName,
                        pagingRequired: true,                       //
                        pageRows: this.pageRows,                    //
                        currenPage: this.currenPage,                //
                    };
                axios.post(self.html_url + self.Apilist.querycustomMaintain, param).then(function(data) {
                    if (data.data.totalRecords==0||data.data.totalRecords==null) {
                        self.noData = true;
                    }
                    // console.log("1111111111111",data.data.data);
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
            openfastTracking(){
                this.fastTracking = true;
                this.fastTrackingText = '';
            },
            // 主管批注
            handleClose(done) {                     //批注取消
                this.fastTracking = false;
                this.fastTrackingupdate = false;
                this.fastTrackingText = '';
            },
            fastTrackingOnSubmit(){                 //批注提交
                this.fastTrackingText = this.fastTrackingText.replace(/^[\s\n\t]+/g, "");
                if(this.fastTrackingText.length == 0){
                    return MessageBox.alert('请输入批注内容！','提示'); 
                }
                this.fastTracking = false;
                let me = this;
                let param = {
                    'content' : this.fastTrackingText,
                    'customMaintainId' : this.customMaintainId
                };
                axios.post(this.html_url +this.Apilist.insertLogComment, param).then(function(data) {
                    me.journalList = [];
                    me.currenPage = 1;
                    me.loadMore();
                    MessageBox.alert('批注添加成功！','提示'); 
                    me.fastTrackingText = '';
                }).catch(function(e) {}); 
            },
        }
    }
</script>
<style>
    .mint-tab-container-wrap {display: -webkit-box;display: -ms-flexbox;display: flex;margin-top: 3px!important;}
    .logDetail .mint-cell-value{height: 100px;}
    .logDetail .mint-cell-value textarea{height: 100px;}
</style>
<style scoped>
    .base-btn-kehu{display: inline-block;width: 80px;height:26px;background: #20a0ff;color: #ffffff;line-height: 26px;border-radius: 4px;text-align: center; margin-left: 10px;}
    .base-btn-kehu:hover{cursor: pointer;}
    ul{margin-top: 0;}
</style>