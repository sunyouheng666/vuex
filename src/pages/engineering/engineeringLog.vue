<template>
    <div class="engineering-box">
        <div class="e-nav">
            <span class="e-nav-item" @click="engineeringType=21" :class="engineeringType==21?'active':''" >
                客户维护
            </span>
            <span class="e-nav-item" @click="engineeringType=22" :class="engineeringType==22?'active':''" >
                日常工作
            </span>
        </div>
        <vLogwidget v-if="engineeringType==21" ref="log">
        </vLogwidget>
        <vWorkwidget  v-if="engineeringType==22" ref="work">
        </vWorkwidget>
    </div>
</template>
<script>
    import Vue from 'vue';
    import axios from 'axios';
    import vLogwidget from '../../components/engineeringwidget/logwidget.vue';
    import vWorkwidget from '../../components/engineeringwidget/workwidget.vue';
    export default {
        data: function(){
            return {
                engineeringType:'21',             //工程管理类型
                selected: '1',                      //标签页ID
            }
        },
        components:{
            vLogwidget,vWorkwidget
        },
        created:function(){    
        },
        watch:{   
        },
        mounted:function(){
        },
        methods: {
            saveCustomMaintain(){                   //保存日志
                if(this.engineeringType == 21){
                    this.$refs.log.saveCustomMaintain();
                }else{
                    this.$refs.work.saveWork();
                }
            },
            clearCustomMaintain(){                  //清空日志
                if(this.engineeringType == 21){
                    this.$refs.log.clearJournal();
                }else{
                    this.$refs.work.clearWork();
                }
            },
        }  
    }
</script>
<style scoped>
    .engineering-box{width: 100%;height:auto;box-sizing:border-box;overflow-x: visible; }
    .engineering-box div{box-sizing:border-box;}
</style>