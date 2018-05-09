<template>
  <div class="pageBox">
    <mt-header title="人事管理" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
       <mt-button  @click.native="searchInit" slot="right" size="small" v-show="selected==2" class="mr10"> 
        重置
      </mt-button>
      <mt-button  @click.native="searchWorker"  slot="right" v-show="selected==2"> 
        查询 
      </mt-button>
    </mt-header>
    <div style="padding-top:39px;">
      <mt-navbar v-model="selected" style='font-size:15px'>
        <mt-tab-item id="1" style='font-size:15px' @click.native="selected = '1'" v-if="isShenhe">
          审核注册
        </mt-tab-item>
        <mt-tab-item id="2" style='font-size:15px' @click.native="selected = '2'"  v-if="isQuanxian">
          员工管理
        </mt-tab-item>
      </mt-navbar>

      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1"  v-if="isShenhe">
          <div v-if="selected == '1'"> 
            <div class="e-nav">
              <span class="e-nav-item" @click="shenQing = '21'" :class="shenQing==21?'active':''" >
                待审核
              </span>
              <span class="e-nav-item" @click="shenQing = '22'" :class="shenQing==22?'active':''" >
                通过
              </span>
              <span class="e-nav-item" @click="shenQing = '23'" :class="shenQing==23?'active':''" >
                驳回
              </span>
            </div>
            <div v-if="shenQing == '21'"> 
              <humanShenHe :statusType="1" :shenQing = 'shenQing'></humanShenHe> 
            </div>
            <div v-if="shenQing == '22'">  
              <humanShenHe :statusType="2" :shenQing = 'shenQing'></humanShenHe> 
            </div>
            <div v-if="shenQing == '23'"> 
              <humanShenHe :statusType="3" :shenQing = 'shenQing'></humanShenHe> 
            </div> 
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div v-if="selected == '2'"> 
            <humanSearchWorker :statusType="1" ref="worker"></humanSearchWorker> 
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  export default {
    data() {
      return {
        isQuanxian:this.$route.query.canQuanxian,   //人事管理权限判断
        isShenhe:this.$route.query.canShenHe,       //注册审核权限判断
        selected: '1',                              //一层tab页ID
        shenQing: '21',                             //二层tab页ID
      }
    },
    created:function(){
      this.menuShow();
    },
    methods: {
      menuShow(){               //判断是否有删除审批权限
        this.userInfo = JSON.parse(localStorage.userInfo);
        var menu = this.userInfo.data;
        for (var i = 0; i < menu.length; i++) {
          if (menu[i].label == "系统设置") {
            for (var j= 0; j < menu[i].children.length; j++) {
              let me = this;
              if (menu[i].children[j].url == "/settings") {
                this.isQuanxian = true;
                setTimeout(function() {
                  me.selected = '2';
                }, 10);
              }
              if (menu[i].children[j].url == "/examine") {
                this.isShenhe = true;
                setTimeout(function() {
                  me.selected = '1';
                }, 20);
              }
            }  
          }
        }
        let me = this; 
        setTimeout(function() {
          let shenQing = String(me.$route.query.shenQing);
          if(me.shenQing == 'undefined'){
            me.shenQing = '21';
          }
          if(shenQing == '23'){
            me.shenQing = '23';
          }else if(shenQing == '22'){
            me.shenQing = '22';
          }else if(shenQing == '21'){
            me.shenQing = '21';
          }else if(shenQing == '24'){
            me.selected = '2';
          }
        }, 20);
      },
      chakan: function(id) {              //查看
        this.$router.push({path: '/shenpi_jieguo',query: {id: id,'shenQing':this.shenQing}});
        event.stopPropagation();
      },
      shenpi: function() {                //审批
        this.$router.push({ path: '/shenpi' });
        event.stopPropagation();
      },
      back: function() {                  //返回
        this.$router.push({ path: '/home' }); 
      },
      searchInit() {           //重置
        this.$refs.worker.searchInit();
      },
      searchWorker() {           //搜索
        this.$refs.worker.searchWorker();
      },
    }
  }
</script>