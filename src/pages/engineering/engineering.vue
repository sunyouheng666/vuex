<template>
    <div class="pageBox">
        <mt-header title="工程管理" fixed>
            <mt-button icon="back" slot="left" @click.native="back">
                返回
            </mt-button>
            <mt-button slot="right" @click.native="clearCustomMaintain" class="mr10" v-show="selected==1">
                重置
            </mt-button>
            <mt-button slot="right" @click.native="saveCustomMaintain" class="mr10" v-show="selected==1">
                保存
            </mt-button>
            <mt-button slot="right" @click.native="clearLogClick" class="mr10" v-show="selected==2">
                清空
            </mt-button>
            <mt-button slot="right" @click.native="searchLogClick" class="mr10" v-show="selected==2">
                查询
            </mt-button>
            <mt-button slot="right" @click.native="clearMaintenanceClick" class="mr10" v-show="selected==3">
                清空
            </mt-button>
            <mt-button slot="right" @click.native="maintenanceClick" class="mr10" v-show="selected==3">
                查询
            </mt-button>
        </mt-header>
        <div style="padding-top:39px;" >
            <mt-navbar v-model="selected" style='font-size:15px'>
                <mt-tab-item id="1" ref="" style='font-size:15px' @click.native="selected = '1'" v-show='engineeringLog'>
                    写工程日志
                </mt-tab-item>
                <mt-tab-item id="2" style='font-size:15px' @click.native="selected = '2'" v-show='engineeringSearch'>
                    查工程日志
                </mt-tab-item>
                <mt-tab-item id="3" style='font-size:15px' @click.native="selected = '3'" v-show='maintenance'>
                    维护查询
                </mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
                <!-- 写工程日志 -->
                <mt-tab-container-item id="1">
                    <engineeringLog v-if="selected==1" ref="logWidget"></engineeringLog>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <!-- 查工程日志-->
                    <searchLog v-if="selected==2"  ref="searchLog"></searchLog>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <!-- 最近访问 -->
                    <maintenance v-if="selected==3"  ref="maintenance">   </maintenance>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import axios from 'axios';
    import engineeringLog from './engineeringLog.vue';
    import searchLog from './searchLog.vue';
    import maintenance from './maintenance.vue';
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
                tabType:"",                         //删除审批驳回使用
            }
        },
        components:{
            engineeringLog,searchLog,maintenance
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
                let type = this.$route.query.tabType; 
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
                                        me.selected = '1';
                                    }, 5);
                                }
                            }
                            if ( menu[i].children[j].url=="/engineeringSearch") {
                                this.engineeringSearch = true;
                                if(type == undefined){
                                    setTimeout(function() {
                                        me.selected = '2';
                                    }, 4);
                                }
                            }
                            if ( menu[i].children[j].url=="/maintenanceQuery") {
                                this.maintenance = true;
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
                            me.selected = '1';
                        }else if(type == 2){
                            me.selected = '2';
                        }else if(type == 3){
                            me.selected = '3';
                        }
                    }
                }, 20);
            },
            fnclearAll: function() {              //清空所有
                this.clearAll =  Math.random(); 
            },
            saveCustomMaintain(){                     //保存客户维护日志
                this.$refs.logWidget.saveCustomMaintain();
            },
            clearCustomMaintain(){                     //重置维护日志
                this.$refs.logWidget.clearCustomMaintain();
            },
            searchLogClick(){                           //搜索日志
                this.$refs.searchLog.searchLogClick();
            },
            clearLogClick(){                            //清空搜索
                this.$refs.searchLog.clearLogClick();
            },
            maintenanceClick(){                         //维护查询
                this.$refs.maintenance.searchLogClick();
            },
            clearMaintenanceClick(){                    //清空维护查询
                this.$refs.maintenance.clearLogClick();
            },
            back: function() {                    //返回功能
                this.$router.push({path: 'home'});
            }     
        }  
    }
</script>