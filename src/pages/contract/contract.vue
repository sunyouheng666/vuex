<template>
    <div class="pageBox">
        <mt-header title="合同管理" fixed>
            <mt-button icon="back" slot="left" @click.native="back">
                返回
            </mt-button>
            <mt-button slot="right" @click.native="onClear" style="margin-right:10px">
                清空
            </mt-button>
            <mt-button slot="right" @click.native="onSearch" style="margin-right:10px">
                查询
            </mt-button>
        </mt-header>
        <div style="padding-top:39px;" >
            <mt-navbar v-model="selected" style='font-size:15px'>
                <mt-tab-item id="1" ref="" style='font-size:15px' @click.native="selected = '1'" >
                    合同查询
                </mt-tab-item>
                <mt-tab-item id="2" style='font-size:15px' @click.native="selected = '2'" >
                    款项查询
                </mt-tab-item>
                <mt-tab-item id="3" style='font-size:15px' @click.native="selected = '3'">
                    发票查询
                </mt-tab-item>
                <mt-tab-item id="4" style='font-size:15px' @click.native="selected = '4'">
                    开票查询
                </mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <!-- 合同查询 -->
                    <contractInquiry v-if="selected==1" ref="contractInquiry"> </contractInquiry>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <!-- 款项查询 -->
                    <moneyQuery v-if="selected==2" ref="moneyQuery"> </moneyQuery>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <!-- 发票查询 -->
                    <invoiceInquiry v-if="selected==3" ref="invoiceInquiry"> </invoiceInquiry>
                </mt-tab-container-item>
                <mt-tab-container-item id="4">
                    <!-- 开票查询 -->
                    <BillingInquiry v-if="selected==4" ref="BillingInquiry"> </BillingInquiry>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import axios from 'axios';
    import contractInquiry from './contractInquiry.vue';
    import invoiceInquiry from './invoiceInquiry.vue';
    import moneyQuery from './moneyQuery.vue';
    import BillingInquiry from './BillingInquiry.vue';
    export default {
        data: function(){
            return {
                selected: '1',              //标签页ID
                tabType:"",                 //删除审批驳回使用
            }
        },
        components:{
            contractInquiry,moneyQuery,invoiceInquiry,BillingInquiry
        },
        mounted:function(){
            this.menuShow();     
        },
        methods: {
            showHangyeChange(val){
                this.showHangye = val;
            },
            searchZuijin:function(){              //最近访问筛选
                this.$router.push({ path: '/searchRecentlyform' });
            },
            menuShow:function(){               //判断是否有删除审批权限
                let type = this.$route.query.type; 
                if(type == 4){
                    this.selected = '4';
                }
                this.userInfo = JSON.parse(localStorage.userInfo);
                var menu = this.userInfo.data;
                for (var i = 0; i < menu.length; i++) {
                    if (menu[i].label == "合同管理") {
                        for (var j= 0; j < menu[i].children.length; j++) {
                            let me = this;
                            if ( menu[i].children[j].url=="/contractInquiry") {
                                if(type == undefined){
                                    setTimeout(function() {
                                        me.selected = '1';
                                    }, 5);
                                }
                            }
                            if ( menu[i].children[j].url=="/moneyQuery") {
                                if(type == undefined){
                                    setTimeout(function() {
                                        me.selected = '2';
                                    }, 4);
                                }
                            }
                            if ( menu[i].children[j].url=="/invoiceInquiry") {
                                if(type == undefined){
                                    setTimeout(function() {
                                        me.selected = '3';
                                    }, 3);
                                }
                            } 
                        }  
                    }
                }
                let me = this;
                setTimeout(function() {
                    if(type != undefined){
                        if(type == 1){
                            me.selected = '1';
                        }else if(type == 2){
                            me.selected = '2';
                        }else if(type == 3){
                            me.selected = '3';
                        }else if(type == 4){
                            me.selected = '4';
                        }
                    }
                }, 20);
            },
            onClear:function(n,o){                  //清空
                if(this.selected == 1){
                    this.$refs.contractInquiry.onClear();
                }else if(this.selected == 2){
                    this.$refs.moneyQuery.onClear();
                }else if(this.selected == 3){
                    this.$refs.invoiceInquiry.onClear(); 
                }else if(this.selected == 4){
                    this.$refs.BillingInquiry.onClear();
                }
            },
            onSearch(){                             //查询
                if(this.selected == 1){
                    this.$refs.contractInquiry.onSearch();
                }else if(this.selected == 2){
                    this.$refs.moneyQuery.onSearch();
                }else if(this.selected == 3){
                    this.$refs.invoiceInquiry.onSearch(); 
                }else if(this.selected == 4){
                    this.$refs.BillingInquiry.onSearch();
                }
            },
            back: function() {                    //返回功能
                this.$router.push({path: 'home'});
            }     
        }  
    }
</script>