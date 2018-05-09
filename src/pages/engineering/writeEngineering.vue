<template>
    <div class="pageBox">
        <mt-header title="工程管理" fixed>
            <mt-button icon="back" slot="left" @click.native="back">
                返回
            </mt-button>
            <mt-button slot="right" @click.native="clearCustomMaintain" style="margin-right:10px"  v-show="selected==1">
                重置
            </mt-button>
            <mt-button slot="right" @click.native="saveCustomMaintain" style="margin-right:10px"  v-show="selected==1">
                保存
            </mt-button>
        </mt-header>
        <div style="padding-top:39px;" >
            <vLogwidget  ref="log"></vLogwidget>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import axios from 'axios';
    import vLogwidget from '../../components/engineeringwidget/logwidget.vue';
    export default {
        data: function(){
            return {
                selected: '1',                      //标签页ID
                showHangye:true,                    //行业查询
                engineeringLog:false,               //写工程日志（显示）
                engineeringSearch:false,            //工程日志查询（显示）
                maintenance :false,                 //维护查询（显示）
                clearAll:0,                         //清除功能
                visibalShenpi: false,               //删除审批（显示）
                visibalSearch: false,               //最近访问
                visibalSearchHangye: false,         //行业查询
                tabType:"",                       //删除审批驳回使用
            }
        },
        components:{
            vLogwidget
        },
        created:function(){
            
        },
        watch:{
           
        },
        mounted:function(){
            this.menuShow();
            this.fnclearAll();      //清空条件查询        
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
                this.userInfo = JSON.parse(localStorage.userInfo);
                var menu = this.userInfo.data;
                for (var i = 0; i < menu.length; i++) {
                    if (menu[i].label == "工程管理") {
                        for (var j= 0; j < menu[i].children.length; j++) {
                            let me = this;
                            if ( menu[i].children[j].url=="/engineeringLog") {
                                this.engineeringLog = true;
                                if(type == undefined){
                                    setTimeout(function() {
                                        me.tabTiaojian();
                                    }, 5);
                                }
                            }
                            if ( menu[i].children[j].url=="/engineeringSearch") {
                                this.engineeringSearch = true;
                                if(type == undefined){
                                    setTimeout(function() {
                                        me.tabHangye();
                                    }, 4);
                                }
                            }
                            if ( menu[i].children[j].url=="/maintenanceQuery") {
                                this.maintenance = true;
                                if(type == undefined){
                                    setTimeout(function() {
                                        me.tabRecent();
                                    }, 3);
                                }
                            } 
                        }  
                    }
                }
                let me = this;
                setTimeout(function() {
                    if(type != undefined){
                        if(type == '6'){
                            setTimeout(function() {
                                me.tabType = '6';
                            }, 100);
                        }else if(type == '5'){
                            setTimeout(function() {
                                me.tabType = '5';
                            }, 100);
                        }else{
                            if(type == '4'){
                                me.tabType = '4';
                            }
                        }
                        if(type == 1){
                            me.tabTiaojian();
                        }else if(type == 2){
                            me.tabHangye();
                        }else if(type == 3){
                            me.tabRecent();
                        }
                    }
                }, 20);
            },
            tabTiaojian: function() {             //条件查询点击---------------------------------------
                this.selected = '1';
            },
            tabHangye: function() {               //按行业查询点击---------------------------------------
                this.selected = '2';
            },
            tabRecent: function() {               //最近访问查询----------------------------------------
                this.selected = '3';
            },
            fnclearAll: function() {              //清空所有
                this.clearAll =  Math.random(); 
            },
            saveCustomMaintain(){                     //保存客户维护日志
                this.$refs.log.saveCustomMaintain();
            },
            clearCustomMaintain(){                     //重置维护日志
                this.$refs.log.clearJournal();
            },
            back: function() {                    //返回功能
                this.$router.go(-1);
            }     
        }  
    }
</script>
<style>
    .mint-tab-container-wrap {display: -webkit-box;display: -ms-flexbox;display: flex;margin-top: 3px!important;}
    .mint-cell-text {vertical-align: middle;color: #2894e5!important; font-size: 14px!important;}
    .mint-cell-value{font-size: 14px!important;}
</style>