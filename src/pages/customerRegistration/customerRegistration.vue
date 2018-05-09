<template>
    <div class="pageBox">
        <mt-header title="软件安装" fixed>
            <mt-button icon="back" slot="left" @click.native="back">
                返回
            </mt-button>
            <mt-button slot="right" @click.native="newClick" style="margin-right:10px"  v-show="selected!=1">
                +新建
            </mt-button> 
        </mt-header>
        <div style="padding-top:39px;" >
            <mt-navbar v-model="selected" style='font-size:15px'>
                <mt-tab-item id="1" ref="" style='font-size:15px' @click.native="tabTiaojian">
                    注册文件
                </mt-tab-item>
                <mt-tab-item id="2" style='font-size:15px' @click.native="tabHangye">
                    加密狗
                </mt-tab-item>
                <mt-tab-item id="3" style='font-size:15px' @click.native="tabRecent">
                    机器码
                </mt-tab-item>
                <mt-tab-item id="4" style='font-size:15px' @click.native="yunServer">
                    云服务器
                </mt-tab-item>
            </mt-navbar>
            <mt-tab-container v-model="selected">
                <mt-tab-container-item id="1">
                    <!-- 注册文件 -->
                    <registration v-if="selected==1" ref="registration"></registration>
                </mt-tab-container-item>
                <mt-tab-container-item id="2">
                    <!-- 加密狗 -->
                    <encryptdog v-if="selected==2" ref="encryptdog"></encryptdog>
                </mt-tab-container-item>
                <mt-tab-container-item id="3">
                    <!-- 机器码 -->
                    <machinecode v-if="selected==3" ref="machinecode"></machinecode>
                </mt-tab-container-item>
                <mt-tab-container-item id="4">
                    <!-- 云服务器 -->
                    <server v-if="selected==4" ref="server"></server>
                </mt-tab-container-item>
            </mt-tab-container>
        </div>
    </div>
</template>
<script>
    import Vue from 'vue';
    import axios from 'axios';
    import registration from './registration.vue';
    import encryptdog from './encryptdog.vue';
    import machinecode from './machinecode.vue';
    import server from './server.vue';
    export default {
        data: function(){
            return {
                selected: '1',                      //标签页ID
            }
        },
        components:{
            registration,encryptdog,machinecode,server
        },
        created:function(){
            
        },
        watch:{
           
        },
        mounted:function(){
            if(this.$route.query.type != undefined){
                this.selected = this.$route.query.type;
            } 
        },
        methods: {
            tabTiaojian: function() {               //条件查询点击---------------------------------------
                this.selected = '1';
            },
            tabHangye: function() {                 //按行业查询点击---------------------------------------
                this.selected = '2';
            },
            tabRecent: function() {                 //最近访问查询----------------------------------------
                this.selected = '3';
            },
            yunServer: function() {                 //最近访问查询----------------------------------------
                this.selected = '4';
            },
            newClick(){                             //新建功能
                if(this.selected == 2){
                    this.$refs.encryptdog.newClick();
                }else if(this.selected == 3){
                    this.$refs.machinecode.newClick();
                }else if(this.selected == 4){
                    this.$refs.server.newClick();
                }
            },
            back: function() {                    //返回功能
                this.$router.push({path: 'home'});
            }     
        }  
    }
</script>