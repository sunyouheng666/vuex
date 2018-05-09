<template>
    <div class="pageBox logDetail">
        <mt-header title="查询结果" fixed>
            <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
        </mt-header>
        <div class="searchResult">
            <div class="searchList" >
                <ul v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
                    <li v-for="(item,index) in journalList" >
                        <div class="companyName">{{item.customName}}</div>
                        <div class="companyType">
                            <span class="labelcss">维护工程师:</span>
                            {{item.maintainName}}
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
                                反馈意见：{{item.feedbackTypeName}};反馈内容：{{item.feedbackContent}}
                            </div>
                        </div>
                        <div class="companyType" style="position: relative;">
                            <span class="labelcss">主管批注:</span>
                            <div v-if ="item.logCommentList.length == 0" style="width: 100%;" >
                                无
                            </div>
                            <div v-else style="width: 100%;"  v-for="(img,key) in item.logCommentList" >
                                <span @click.stop="updateTastTracking(img.id,index)" >{{key+1}}、{{img.content}}</span>
                                <span v-show="manageFlag!=1" class="base-btn-kehu" style="width:50px;height:24px;background:#5e67fc;" 
                                   @click.stop="deleteLogComment(img.id,index)">删除</span>
                            </div>
                            <span v-show="manageFlag!=1" class="base-btn-kehu fr" style="cursor: pointer;position: absolute;bottom: 0px;right: 2px; background:#5e67fc;" @click.stop="fastTracking=true,customMaintainId=item.id,searchResultsIndex=index" >
                                +新增
                            </span>
                        </div>
                        <div class="clear"></div> 
                        <div class="line" style="margin-top:5px;"></div>
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
        <!-- 主管批注 -->
        <mt-popup v-model="fastTracking" position="top" style="width:100%;height:190px;overflow-y:scroll">
            <p style="margin: 0;background: #5e67fc; height:36px;line-height: 36px;color:#fff;">
                主管批注
            </p>
            <div style="margin: 6px 0;">
                <mt-field label="" placeholder="请输入主管批注"  v-model="fastTrackingText" type="textarea" :attr="{maxlength: 100 }">
                </mt-field>
            </div>
            <div >
                <span v-show="manageFlag!=1" class="base-btn-kehu fr" @click="handleClose">
                    取消
                </span>
                <span v-show="manageFlag!=1" class="base-btn-kehu fr" @click="fastTrackingOnSubmit">
                    保存
                </span>
            </div>
        </mt-popup>
        <!-- 主管批注 -->
        <mt-popup class="background:#5e67fc;" v-model="fastTrackingupdate" position="top" style="width:100%;height:190px;overflow-y:scroll">
            <div class="title-pop">主管批注</div>
            <div style="margin: 6px 0;">
                <mt-field label="" placeholder="请输入主管批注"  v-model="fastTrackingText" type="textarea" :attr="{maxlength: 100 }">
                </mt-field>
            </div>
            <div>
                <span v-show="manageFlag!=1" class="base-btn-kehu fr" @click="handleClose">
                    取消
                </span>
                <span v-show="manageFlag!=1" class="base-btn-kehu fr" @click="updateLogComment">
                    保存
                </span>
            </div>
        </mt-popup>
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
                // 主管批注
                fastTracking:false,         //主管批注
                fastTrackingupdate:false,   //更新
                feedbackId:"",              //批注id
                fastTrackingText:"",        //批注内容
                fastTrackingArr:[],         //批注数
                dailyWorkId:"",             //
                searchResultsIndex:"",      //批注index
                customMaintainId:"",        //
            }
        },
        mounted: function() {
            this.journalList= [];
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
                let self = this;
                var param = { 
                    operatorIds :self.$route.query.operatorIds,                 //录入人
                    customName : self.$route.query.customName,                  //客户名称
                    type  : self.$route.query.type,                             //服务类型
                    maintainIds :self.$route.query.maintainIds,                 //维护工程师
                    maintainStartTimeStr : self.$route.query.maintainStartTimeStr,//维护时间开始
                    maintainEndTimeStr : self.$route.query.maintainEndTimeStr,    //维护时间结束
                    startTimeStr : self.$route.query.startTimeStr,              //录入时间开始
                    endTimeStr : self.$route.query.endTimeStr,                  //录入时间结束
                    provinceId : self.$route.query.provinceId,                  //省
                    cityId : self.$route.query.cityId,                          //市
                    areaId : self.$route.query.areaId,                          //区
                    pagingRequired: true,                       //
                    pageRows: this.pageRows,                    //
                    currenPage: this.currentPage,                //
                };
                axios.post(self.html_url + self.Apilist.querycustomMaintain, param).then(function(data) {
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
            back: function() {
                if(this.$route.query.feedBackDetail == undefined){
                    this.$router.push({ path: '/engineering',query:{tabType:this.activeTab}});
                }else{
                    this.$router.go(-1);
                } 
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
                    me.currentPage = 1;
                    me.totalPage = 1;
                    me.loadMore();
                    MessageBox.alert('批注添加成功！','提示'); 
                    me.fastTrackingText = '';
                }).catch(function(e) {}); 
            },
            updateTastTracking(id,index){                   //批注更新点击
                if(this.manageFlag != 1){
                    this.feedbackId = id;
                    this.fastTrackingupdate = true;
                    this.searchResultsIndex = index;
                }
            },
            updateLogComment(index){                //批注更新确定
                this.fastTrackingText = this.fastTrackingText.replace(/^[\s\n\t]+/g, "");
                if(this.fastTrackingText.length == 0){
                    return MessageBox.alert('请输入批注内容！','提示'); 
                }
                let me = this;
                let param = {
                    'id' : this.feedbackId,
                    'content' : this.fastTrackingText
                };
                axios.post(this.html_url +this.Apilist.updateLogComment, param).then(function(data) {
                    me.fastTrackingText = '';  
                    me.journalList = [];
                    me.currentPage = 1;
                    me.totalPage = 1;
                    me.loadMore();
                    me.fastTrackingupdate = false;  
                    MessageBox.alert('批注更新成功！','提示');  
                }).catch(function(e) {});
            },
            deleteLogComment(_Id,index){            //删除成功
                this.searchResultsIndex = index;
                let me = this;
                let param = {
                    'id' : _Id,
                };
                axios.post(this.html_url +this.Apilist.deleteLogComment, param).then(function(data) {
                    me.journalList = [];
                    me.currentPage = 1;
                    me.totalPage = 1;
                    me.loadMore();
                    MessageBox.alert('批注删除成功！','提示');
                }).catch(function(e) {});
            }
        }
    }
</script>
<style>
    .mint-tab-container-wrap {display: -webkit-box;display: -ms-flexbox;display: flex;margin-top: 3px!important;}
    .logDetail .mint-cell-value{height: 100px;}
    .logDetail .mint-cell-value textarea{height: 100px;}
</style>
<style scoped>
    .base-btn-kehu{display: inline-block;width: 80px;height:26px;background: #5e67fc;color: #ffffff;line-height: 26px;border-radius: 4px;text-align: center; margin-left: 10px;}
    .base-btn-kehu:hover{cursor: pointer;}
    ul{margin-top: 0;}
    .searchResult {margin-top: 38px;}
</style>