<template>
    <div style="font-size: 14px;" class="logwidget">
        <div style="margin:3px 0;position: relative;" class="mhc" >
            <mt-field label="" placeholder="输入客户名称" v-model="customName" style="background-image: none;border:none;width: 80%;" :attr="{ maxlength: 100 }"></mt-field>
            <mt-button type="primary" size="small" @click.native.stop='loadMoreHangyeLikeFn' style="position: absolute;top:7px;right: 8px;height:26px;background:#5e67fc;">   
              查询
            </mt-button>
        </div>
        <div class="searchList" >
            <div style="padding-top:8px; padding-left:4px;background:#5e67fc; height:30px;margin-top:10px; line-height:26px; text-align:center;color: #fff;" v-show="resultShow">
                查询结果
            </div>
            <div class="searchList">
                <ul class='shou-list' v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10" style="margin-top: 0px;">
                    <li v-for="item in searchResults" @click='goDetail(item)' style="padding:5px 0;">
                        <div class="line"></div>
                        <div class="companyName"> {{item.customName}}</div>
                        <div class="companyType"> 
                            <span class="labelcss">云IP：</span>
                            {{item.cloudIP || '无'}}
                        </div>
                        <div class="companyType">  
                            <span class="labelcss">云注册邮箱：</span>
                            {{item.email || '无'}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">云状态：</span>
                            {{item.cloudStatusName || '无'}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">客户电话：</span>
                            {{item.tel || '无'}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">审核状态：</span>
                            <span v-if="item.auditStatus==0" style="color:#ff4949;"> 
                                {{item.auditStatusName || '无'}} 
                            </span>
                            <span v-else :style="item.auditStatus==2?'color:#13ce66':'color:#ffbc49'"> 
                                {{item.auditStatusName || '无'}} 
                            </span>
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">收款状态：</span>
                            {{item.paymentStatusName || '无'}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">创建人：</span>
                            {{item.operatorName || '无'}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">录入时间：</span>
                            {{item.gmtCreate  | TimeCut}}
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
    import { Indicator } from 'mint-ui';
    export default {
        data() {
            return {
                customName : '',                //客户查询
                currenPage : 1,                 //
                pageRows : 20,                  //
                pagingRequired : true,          //
                totalPage:1,                    //
                noData:false,                   //精确查询暂无数据！
                loadAll:false,                  //精确查询暂无数据！
                loading:false,                  //
                searchResults:[],               //
                resultShow:false,               //
            }
        },
        props: {
        },
        watch: {
            
        },
        created:function(){
            // this.maintainTime = this.timer(new Date()); 
            // let _customerName = this.$route.query.customerName;  
            // let _customerId = this.$route.query.customerId; 
        },
        mounted: function() { 
            this.loadMoreHangyeLikeFn();
        },
        methods: {
            loadMoreHangyeLikeFn: function() {        //模糊查询
                this.searchResults = [];
                this.currenPage = 1;
                this.totalPage = 1;
                this.noData = false;
                this.loadAll = false;
                this.loadMore();
            }, 
            loadMore: function() {          //执行模糊查询
                if (this.currenPage > this.totalPage) {
                    return;
                }
                this.loading = true;
                var self = this;
                var param = {
                    customName : this.customName,
                    currenPage :this.currenPage,
                    pageRows : this.pageRows,
                    pagingRequired : true,
                };
                self.loading = true;
                axios.post(self.html_url + self.Apilist.selectCloudServer,param).then(function(data) {
                    self.resultShow = true;
                    self.loading = false;
                    if (data.data.totalRecords==0||data.data.totalRecords==null) {
                        self.noData = true;
                    }
                    self.searchResults = self.searchResults.concat(data.data.data); 
                    if(data.data.totalPage != null){
                        self.totalPage = data.data.totalPage;
                    }
                    if (self.totalPage == data.data.totalPage) {
                        self.loadAll = true;
                    }
                    self.currenPage = self.currenPage + 1;
                }).catch(function(e) {
                    self.loading = false;
                }); 
            }, 
            newClick(){
                this.$router.push({path: 'newserver'});
            }, 
            goDetail(obj){
                this.$router.push({path: 'newserver',query:obj});
            }   
        }
    }
</script>
<style>
  .mhc .mint-cell-value input{border:1px solid #999;border-radius: 4px; font-size: 14px;}
  .searchHangye .mint-cell-wrapper{background-image: none;text-align: left;font-size: 14px;}
  .searchHangye .mint-cell-wrapper .mint-cell-title{width: 60px;}
</style>