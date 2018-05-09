<template id="searchJournal">
    <div class="searchLog" style="font-size: 14px;">
        <div>
            <mt-field  label="客户名称" placeholder="请输入客户名称" v-model="customName" :attr="{maxlength: 100 }"> 
            </mt-field>
            <mt-field readonly label="状态" placeholder="请选择状态" v-model="signedNames" @click.native='signedPop=true'>
            </mt-field>
            <mt-button type="primary" style="background:#5e67fc;" size="small" @click.native="addBilling"> 新增开票 </mt-button>
            <mt-popup v-model="signedPop" position="bottom" style='width:100%'>
                <div class="title-pop">选择状态</div>
                <mt-picker :slots="signedArr"  @change="signedChange" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="signedPop">
                </mt-picker>
            </mt-popup>
        </div>
        <div class="searchList" >
            <div style="padding-top:8px; padding-left:4px;background:#5e67fc; height:30px;margin-top:10px; line-height:26px; text-align:center;color: #fff;" v-show="searchreResult">查询结果</div>
            <div class="searchList">
                <ul class='shou-list' v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10" style="margin-top: 0px;">
                    <li v-for="(item,key) in customerList" v-bind:item="item" v-bind:key="key" style="padding:5px 0;">
                        <div class="line"></div>
                        <div class="companyName"> 
                            {{item.customName}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">发票抬头：</span>
                            {{item.invoiceName || '无'}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">发票金额：</span>
                            {{item.invoiceAmount || '无'}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">发票种类：</span>
                            {{item.invoiceTypeName || '无'}}
                        </div>
                        <div class="companyType">  
                            <span class="labelcss">纳税人识别号：</span>
                            {{item.taxpayerIdNumber}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">地址、电话：</span>
                            {{item.addressTelephone||'无'}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">开户行及帐号：</span>
                            {{item.bankAccount||'无'}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">状态：</span>
                            {{item.invoiceStatusName||'无'}}
                        </div>
                        <div class="companyType"> 
                            <span class="labelcss">备注：</span>
                            {{item.remark||'无'}}
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
            signedNames :'',            //签约人名称
            invoiceStatus :'',          //选择是否回执
            signedArr: [{
                flex: 1,
                values: [{ 
                    id: '0',
                    name: '未申请'
                },{
                    id: '1',
                    name: '已申请'
                },{
                    id: '2',
                    name: '已开票'
                }],
                className: 'contractStatusArr',
                textAlign: 'center',
                defaultIndex: 1,
            }],
            signedPop: false,           //选择状态
            searchreResult : false,     //显示结果
            loading: false,             //加载中
            customerList: [],           //请求数据
            totalPage: 1,               //总条数
            loadAll: false,             //全部加载完
            currentPage: 1,             //当前页
            pageSize: 10,               //每页条数
            noData:false                //请求没有数据
        }
    },
    props: {
    },
    created:function(){

    },
    watch: { 
    },
    mounted: function() {
        this.loadMore();
    },
    methods: {
        signedChange: function(picker, values) {
            if (values[0] == undefined) {
                return
            }
            this.signedNames = values[0].name;
            this.invoiceStatus = values[0].id;
        },
        onClear(){
            this.customName  = ''; 
            this.signedNames = "";
            this.invoiceStatus = ''; 
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
            this.searchreResult = true;
            this.loading = true;
            let self = this;
            var param = {
                customName : this.customName,
                invoiceStatus : this.invoiceStatus,
                pageRows: self.pageSize,
                pagingRequired: true,
                currenPage: self.currentPage
            };
            axios.post(self.html_url + self.Apilist.selectBillApply, param).then(function(data) { 
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
        addBilling(){                   //新增开票
            this.$router.push({path: 'addBilling'});  
        },
    }
}
</script>
<style>
    .searchLog  .mint-field .mint-cell-title {width: 110px;-webkit-box-flex: 0;-ms-flex: none;flex: none;text-align: left!important;}
    .searchLog .mint-field .mint-cell-title{width: 92px!important;text-align: left;}
</style>