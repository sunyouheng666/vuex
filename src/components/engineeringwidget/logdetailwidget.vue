<template>
    <div class="logdetail-box">
        <el-row class='operbox' v-show="manageFlag!=1&&source==true">
            <el-col :span="2">
                <div>
                    <el-checkbox v-model="checkAll" @change="onCheckAll" style="margin-top: 5px;">全选</el-checkbox>  
                </div>
            </el-col>
            <el-col :span="3">
                <span class="cust-btn" @click="onDelete" style="float: left;">删 除</span>
            </el-col>
        </el-row>
        <!-- 客户维护 -->
        <ul v-if="searchData.logType==1" class="searchli">
            <li v-for="(item, index) in searchResults" v-loading="loading"    element-loading-text="数据加载中" :class="index%2 == 0?'bg-d':'bg-o'">
                <table class="logtable">
                    <tr>
                        <th style="width: 36px;text-align: left;" v-show="manageFlag!=1&&source==true">选择</th>
                        <th style="width: 115px;text-align: left;">维护工程师</th>
                        <td style="min-width: 115px;text-align: left;">{{item.maintainName || '无'}}</td>
                        <th style="width: 115px;text-align: left;">车费</th>
                        <td style="min-width: 115px;text-align: left;">{{item.serviceFare || '0.00' }}</td>
                        <th style="width: 115px;text-align: left;">维护日期</th>
                        <td style="min-width: 115px;text-align: left;">{{item.maintainTime | date}}</td>
                        <th style="width: 115px;text-align: left;">录入日期</th>
                        <td style="min-width: 115px;text-align: left;">{{item.gmtCreate | date}}</td>
                    </tr>
                    <tr>
                        <td rowspan="8" style="width: 26px; padding-left: 9px" v-show="manageFlag!=1&&source==true"> 
                            <el-checkbox v-model="checkList[index]" @change="onCheckOne"></el-checkbox> 
                        </td>
                        <th style="width:115px;text-align: left;">客户名称</th>
                        <td style="min-width:115px;cursor: pointer;" :title="item.customName " @click="onUpdateCustormer(item.customId)" >
                            <p class="cont-acName">
                                {{item.customName || '无'}}
                            </p>
                        </td>
                        <th style="width:115px;text-align: left;">联系人</th>
                        <td style="min-width:115px;">{{item.contactsName || '无'}}</td>
                        <th style="width:115px;text-align: left;">陪访人</th>
                        <td :title="item.accompanyNames">
                            <p class="cont-acName">
                                {{item.accompanyNames || '无'}}
                            </p>
                        </td>
                        <th style="width:115px;text-align: left;">录入人</th>
                        <td style="min-width: 115px;">
                            {{item.operatorName || '无'}}
                        </td>
                    </tr>
                    <tr>
                        <th style="width:115px;text-align: left;">服务类型</th>
                        <td style="min-width:115px;" >
                            <p class="cont-acName">
                                {{item.serviceTypeName || '无'}}
                            </p>
                        </td>
                        <th style="width:115px;text-align: left;">维护时间</th>
                        <td style="min-width:115px;" colspan="3">{{item.serviceTime }}</td>
                        <th style="width:115px;text-align: left;">维护时长</th>
                        <td :title="item.accompanyName">
                            <p class="cont-acName">
                                {{item.serviceDuration  || '无'}}小时
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th style="width:115px;text-align: left;">维护内容</th>
                        <td colspan="7" style="min-width:500px;">
                            <div  v-if ="item.maintainContentsList.length == 0" style="width: 100%;text-align: left;">
                            </div>
                            <div v-else >
                                <div v-for="(List, index) in item.maintainContentsList">  
                                    {{index+1}}、{{ List.typeName}}：{{ List.content}}
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <th style="width:115px;text-align: left;">使用反馈</th>
                        <td colspan="7" style="min-width:500px;">
                            {{item.feedbackTypeName}};原因：{{item.feedbackContent}}
                        </td>
                    </tr>
                    <tr>
                        <th style="width:115px;text-align: left;">附件</th>
                        <td colspan="7" style="min-width:500px;">
                            <a v-if ="item.fileList.length == 0" style=" display: inline-block;width: 100%;text-align: left;">
                                无
                            </a>
                            <a v-else class="base-btn-kehu"  v-for="(img,index) in item.fileList" :href="img.fileCode" target="_blank"  download>
                                附件{{index+1}}
                            </a>
                        </td>
                    </tr>
                    <tr>
                        <th style="width:115px;text-align: left;">主管批注</th>
                        <td colspan="7" style="min-width:500px;position: relative;">
                            <div v-if ="item.logCommentList.length == 0" style="width: 100%;" >
                                无
                            </div>
                            <div v-else style="width: 100%;"  v-for="(img,key) in item.logCommentList" >
                                <span @click.stop="feedbackId=img.id,fastTrackingupdate=true,searchResultsIndex=index">{{key+1}}、{{img.content}}</span>
                                <span class="base-btn-kehu" style="width:50px;height:24px;" v-show="manageFlag!=1" 
                                   @click.stop="deleteLogComment(img.id,index)">删除</span>
                            </div>
                            <span class="condition-btn fr" title="编辑" @click.stop="fastTracking=true,customMaintainId=item.id,searchResultsIndex=index" style="cursor: pointer;position: absolute;bottom: 8px;right: 2px; ">
                                <img src="../../../../static/img/condition_1.png" alt="">
                            </span>
                        </td>
                    </tr>
                </table>
            </li>
        </ul>
        <!-- 日常工作 -->
        <ul v-else class="searchli">
            <li v-for="(item, index) in searchResults" v-loading="loading"    element-loading-text="数据加载中" :class="index%2 == 0?'bg-d':'bg-o'">
                <table class="logtable">
                    <tr>
                        <th style="width: 36px;text-align: left;" v-show="manageFlag!=1&&source==true">选择</th>
                        <th style="width: 115px;text-align: left;">维护工程师</th>
                        <td style="min-width: 115px;text-align: left;">{{item.maintainName || '无'}}</td>
                        <th style="width: 115px;text-align: left;">维护日期</th>
                        <td style="min-width: 115px;text-align: left;" colspan="3">{{item.maintainTime | date}}</td>
                        <th style="width: 115px;text-align: left;">录入日期</th>
                        <td style="min-width: 115px;text-align: left;">{{item.gmtCreate | date}}</td>
                    </tr>
                    <tr>
                        <td rowspan="8" style="width: 26px; padding-left: 9px" v-show="manageFlag!=1&&source==true"> 
                            <el-checkbox v-model="checkList[index]" @change="onCheckOne"></el-checkbox> 
                        </td>
                        <th style="width:115px;text-align: left;">类型</th>
                        <td style="min-width:115px;" :title="item.workType " @click="onUpdateCustormer(item.customId)">
                            <p class="cont-acName">
                                {{item.workType || '无'}}
                            </p>
                        </td>
                        <th style="width:115px;text-align: left;">开始时间</th>
                        <td style="min-width:115px;" colspan="3">{{item.startTime}}</td>
                        <th style="width:115px;text-align: left;">工作时长</th>
                        <td :title="item.duration" >
                            <p class="cont-acName">
                                {{item.duration || '无'}}小时
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <th style="width:115px;text-align: left;">工作内容</th>
                        <td colspan="7" style="min-width:500px;word-break: break-all;">
                            {{item.content || '无'}}
                        </td>
                    </tr>
                    <tr>
                        <th style="width:115px;text-align: left;">主管批注</th>
                        <td colspan="7" style="min-width:500px;position: relative;">
                            <div v-if ="item.logCommentList.length == 0" style="width: 100%;" >
                                无
                            </div>
                            <div v-else style="width: 100%;"  v-for="(img,key) in item.logCommentList" >
                                <span @click.stop="feedbackId=img.id,fastTrackingupdate=true,searchResultsIndex=index">{{key+1}}、{{img.content}}</span>
                                <span class="base-btn-kehu" style="width:50px;height:24px;" v-show="manageFlag!=1"
                                   @click.stop="deleteLogComment(img.id,index)">删除456</span>
                            </div>
                            <span class="condition-btn fr" title="编辑" @click.stop="fastTracking=true,dailyWorkId=item.id,searchResultsIndex=index" style="cursor: pointer;position: absolute;bottom: 8px;right: 2px;background:#5e67fc; ">12312
                                <img src="../../../../static/img/condition_1.png" alt="">
                            </span>
                        </td>
                    </tr>
                </table>
            </li>
        </ul>
        <el-col v-show="myACPromptMessage" :span="24">
            <div class="myActive-cont-message">
                您搜索的日志共找到0个内容！
            </div>
        </el-col>
        <div class="pagination" v-show="searchResults.length != 0">
            <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="searchData.currenPage"
                :page-sizes="[10, 20, 30, 40]"
                :page-size="searchData.pageRows"
                layout="total, sizes, prev, pager, next"
                :total="total" >
            </el-pagination>
        </div>
        <div class="fastTracking">
            <el-dialog  title="主管批注" :visible.sync="fastTracking" size="tiny" :before-close="handleClose">
                <div style="width: 100%;height: 60px;margin: auto;">
                    <el-input
                        type="textarea"
                        resize='none'
                        :rows="2"
                        :minlength="0"
                        :maxlength="100" 
                        placeholder="请输入内容"
                        v-model="fastTrackingText">
                    </el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button type="primary" @click="fastTrackingOnSubmit">确 定</el-button>
                </span>
            </el-dialog>
        </div>
        <div class="fastTrackingupdate">
            <el-dialog  title="主管批注" :visible.sync="fastTrackingupdate" size="tiny" :before-close="handleClose">
                <div style="width: 100%;height: 60px;margin: auto;">
                    <el-input
                        type="textarea"
                        resize='none'
                        :rows="2"
                        :minlength="0"
                        :maxlength="100" 
                        placeholder="请输入内容"
                        v-model="fastTrackingText" style="height:54px;">
                    </el-input>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="handleClose">取 消</el-button>
                    <el-button type="primary" @click="updateLogComment">确 定</el-button>
                </span>
            </el-dialog>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import axios from 'axios';   
    export default {
        data: function(){
            return {
                myACPromptMessage:false,    //搜索没有内容调试
                searchResults: [],          //返回结果
                pagingRequired: true,       //是否分页
                total: 0,                   //返回结果总数
                pageRows: 10,               //每页显示几条
                currenPage: 1 ,             //当前页
                manageFlag:"",              //管理权限
                checkAll: false,            //是否全选
                checkList: [],              //单选数组
                // 主管批注
                fastTracking:false,         //主管批注
                fastTrackingupdate:false,   //更新
                feedbackId:"",              //批注id
                fastTrackingText:"",        //批注内容
                fastTrackingArr:[],         //批注数组
                source:true,                //来源判断显示隐藏
                customMaintainId:"",        //
                dailyWorkId:"",             //批注ID
                searchResultsIndex:"",      //批注index
            }
        },
        computed:{
            
        },
        props:[
            'searchData'
        ],
        created : function(){
            let list = localStorage.loginMsg;
            list = JSON.parse(list);
            this.manageFlag = list.data.manageFlag;
        },
        watch:{
           'searchData':function(n){
                if(n.source == "comment"){
                    this.source = false;
                }
                let me = this;
                setTimeout(function() {
                    me.onSubmit('searchData');
                }, 50);
           },  
        },
        mounted:function(){
            
        },
        methods: {
            handleSizeChange(val) {
                this.searchData.pageRows = val;
                this.searchData.currenPage = 1;
                this.onSubmit('searchData');
                this.checkAll = false;
            },
            handleCurrentChange(val) {
                this.searchData.currenPage = val;
                this.onSubmit('searchData');
                this.checkAll = false;
            },
            onCheckOne() {
                let me = this;
                setTimeout(function() {
                   let bool = me.checkList.every(item => {
                        return item;
                    });
                    if(bool) {
                        me.checkAll = true;
                    }else {
                        me.checkAll = false;
                    } 
                }, 20);
            },
            onCheckAll() { 
                this.checkList = this.checkList.map(item => this.checkAll);
            },
            onSubmit(formName) {                    //查询日志
                this.checkAll = false;
                let me = this;
                me.myACPromptMessage = false;
                let queryUrl = "";
                if(this.searchData.logType == '1'){
                    queryUrl = this.Apilist.querycustomMaintain;
                }else{
                    queryUrl = this.Apilist.querydailyWork;
                }
                me.searchResults = [];
                let param = this.searchData;
                axios.post(this.html_url + queryUrl, param).then(function(data) {
                    me.total = data.data.totalRecords || 0;
                    me.searchResults = data.data.data || [];
                    for(let i = 0; i < data.data.data.length; i++) {
                        me.checkList[i] = false;
                    }
                    if(me.searchResults.length == 0){
                        me.myACPromptMessage = true;
                    }
                    me.loading = false;
                    me.resultShow = true;  
                }).catch(function(e) {
                    me.loading = false;
                });
            },
            getCheckListIds() {                     //获取ID
                let arr = [];
                for(let i = 0; i < this.searchResults.length; i++) {
                    if(this.checkList[i]) {
                        arr.push(this.searchResults[i].id);
                    }
                }
                return arr.join(',');
            },
            onDelete() {                            //删除日志
                let idListStr = this.getCheckListIds();
                if(!idListStr) {
                    return this.$message.warning('最少选择一个');
                }
                let queryUrl = "";
                if(this.searchData.logType == '1'){
                    queryUrl = this.Apilist.deletecustomMaintain;
                }else{
                    queryUrl = this.Apilist.deletedailyWork;
                }  
                this.$confirm('此操作将删除销售日志, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let me = this;
                    let param = {
                        idListStr:idListStr
                    };
                    axios.post(this.html_url + queryUrl, param).then(function(data) {
                        me.$message.success('删除成功');
                        me.onSubmit('searchData');
                    }).catch(function(e) {

                    });
                }).catch(() => {
                    this.$message.info('已取消删除');
                });
            },
            // 主管批注
            handleClose(done) {                     //批注取消
                this.fastTracking = false;
                this.fastTrackingupdate = false;
                this.fastTrackingText = '';
            },
            fastTrackingOnSubmit(){                 //批注提交
                this.fastTracking = false;
                let me = this;
                let param = {
                    'content' : this.fastTrackingText
                };
                if(this.searchData.logType==1){
                    param.customMaintainId = this.customMaintainId;
                }else{
                    param.dailyWorkId  = this.dailyWorkId ;
                }
                axios.post(this.html_url +this.Apilist.insertLogComment, param).then(function(data) {
                    me.fastTrackingArr = data.data.data;
                    me.$message.success('批注添加成功！');
                    me.onSubmit('searchData');
                    me.fastTrackingText = '';
                }).catch(function(e) {}); 
            },
            updateLogComment(index){                //批注更新
                let me = this;
                let param = {
                    'id' : this.feedbackId,
                    'content' : this.fastTrackingText
                };
                axios.post(this.html_url +this.Apilist.updateLogComment, param).then(function(data) {
                    me.fastTrackingArr = data.data.data;
                    me.$message.success('批注更新成功！');
                    me.fastTrackingText = '';
                    me.onSubmit('searchData');
                    me.fastTrackingupdate = false;    
                }).catch(function(e) {});
            },
            deleteLogComment(_Id,index){            //删除成功
                this.searchResultsIndex = index;
                let me = this;
                let param = {
                    'id' : _Id,
                };
                axios.post(this.html_url +this.Apilist.deleteLogComment, param).then(function(data) {
                    me.fastTrackingArr = data.data.data;
                    me.$message.success('批注删除成功！');
                    me.onSubmit('searchData');
                }).catch(function(e) {});
            },
            onUpdateCustormer(id){                  //查看客户详情
                this.$emit("onUpdateCustormer",id);
            },
        }  
    }
</script>
<style scoped>
    .logdetail-box {width: 100%; box-sizing: border-box; overflow-x: visible;}
    .logdetail-box div { box-sizing: border-box; }
    .el-form-item {margin-bottom: 0;}
    .logdetail-box .operbox { padding: 0px 15px 8px 15px;border-bottom: 1px solid #bfcbd9; margin-bottom: 15px}
    .logtable{ border:1px solid #d6d6d6;line-height: 30px; width:100%; border-collapse: separate;border-spacing: 0px;}
    .logtable th{ line-height: 28px; padding:2px 5px; border-bottom: 1px solid #d6d6d6; border-right:1px solid #d6d6d6;}
    .logtable td{line-height: 28px; border-bottom: 1px solid #d6d6d6; border-right:1px solid #d6d6d6; background: #fff;}
    /*客户附件*/
    .base-btn-kehu{display: inline-block;width: 80px;height:26px;background: #20a0ff;color: #ffffff;line-height: 26px;border-radius: 4px;text-align: center; margin-left: 10px;}
    .base-btn-kehu:hover{cursor: pointer;}
    .customer-cont-ht{height:auto;padding:2px 2px 2px 0px;}
    .cust-btn-box{width: 100%;height: 30px;line-height: 30px;color: #000000;font-weight: 400; box-sizing: border-box; }
    .cust-btn{display: block; width: 80px;height:28px; line-height: 28px;text-align: center; color: #ffffff;cursor: pointer;background: #008cee;border-radius: 4px;float: right;margin-top: 0px;margin-right: 10px;font-size: 14px;}
    .bg-d{background: #f3f3f3;}
    .bg-o{background: #e4f3ff;}
    .searchli{ list-style: none; }
    .searchli > li{ list-style: none; margin-bottom: 10px;}
</style>
<style>
    .logdetail-box .fastTracking .el-dialog__body{padding:10px 20px;}
    .logdetail-box .fastTracking .el-dialog__footer{padding:0px 20px 10px 20px;}
    .logdetail-box .fastTracking .el-dialog__body .el-textarea{height:54px!important;}
</style>