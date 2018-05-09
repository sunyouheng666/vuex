<template id="mainheader">
	<div class="mainheader">
  	<mt-header  fixed > 
      <mt-button icon="back"  slot="left"  @click.native="back">返回</mt-button>
      <mt-button slot="left" style="margin-left:80%;color:#5e67fc!important; text-decoration:underline;font-size:16px;"  @click.native="showMenu"> 
        &nbsp;&nbsp;{{titleName}}&nbsp;  
      </mt-button>
      <mt-button slot="right" @click.native="searchMail" style="margin-right:10px;">
         <img src="../../../static/image/search.png" style="height:24px;" alt="">
      </mt-button>
      <mt-button slot="right" @click.native="mailEdit">
         <img src="../../../static/image/addemail.png" style="height:24px;" alt="">
      </mt-button>
    </mt-header>
    <mt-popup  v-model="popupVisible"  position="left">
      <div class='mailMenu'>
        <div>
          <h4>邮件箱</h4>
          <ul class='popMenu'>
            <li v-show="receive">
              <template>
                <router-link :to="{ path: '/mailbox'}">
                  收件箱({{unReadmail}})
                </router-link>
              </template> 
            </li>
            <li v-show="send">
              <template>
                <router-link :to="{ path: '/sendbox'}">
                  发件箱
                </router-link>
              </template> 
            </li>
            <li v-show="drafts">
              <template>
                <router-link :to="{ path: '/draftbox'}">
                  草稿箱
                </router-link>
              </template> 
            </li>
            <li v-show="dustbin">
              <template >
                <router-link :to="{ path: '/dustbinbox'}">
                  垃圾箱
                </router-link>
              </template>
            </li>
          </ul>
        </div>
        <div v-show="classify">
          <h4>归并箱</h4>
          <ul  class='popMenu'>
            <li>
              <template>
                <router-link :to="{ path: '/gb_gongkai', query: {mergeType: '1'}}">
                  公开客户
                </router-link>
              </template>
            </li>
            <li>
              <template>
                <router-link :to="{ path: '/gb_baoliu', query: {mergeType: '2'}}">
                  保留客户
                </router-link>
              </template>  
            </li>
            <li>
              <template>
                <router-link :to="{ path: '/gb_hezuo', query: {mergeType: '3'}}">
                  合作客户
                </router-link>
              </template>  
            </li>
            <li>
              <template>
                <router-link :to="{ path: '/gb_remen', query: {mergeType: '4'}}">
                  热门客户
                </router-link>
              </template>  
            </li>
            <li>
              <template>
                <router-link :to="{ path: '/gb_shichang', query: {mergeType: '5'}}">
                  市场客户
                </router-link>
              </template>  
            </li>
            <li>
              <template>
                <router-link :to="{ path: '/gb_qianzai', query: {mergeType: '6'}}">
                  潜在客户
                </router-link>
              </template>  
            </li>
          </ul>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script> 
  import axios from 'axios';
  export default { 
    data(){ 
      return{ 
        receive:false,      //收件箱
        send:false,         //发件箱
        drafts:false,       //草稿箱
        dustbin:false,      //垃圾箱
        classify:false,     //归并箱
        popupVisible:false, //邮件菜单
        unReadmail:0,       //收件箱条数
       } 
    },
    props:[
      'titleName'
    ], 
    watch:{
      'titleName':function(val){
        console.log("titleName",titleName);
      }
    },
    mounted: function() {
      this.menuShow();
      this.getNumMail();
    },
    methods:{ 
      getNumMail: function() {      //获取收件箱总数
        var self = this; 
        axios.post(self.html_url + self.Apilist.getUnReadMailCount, { employeeId: this.$route.query.employeeId }).then(function(data) { 
          self.unReadmail = data.data.data; 
          if(self.unReadmail > 1000){
            self.unReadmail = '1000+';
          }
        }).catch(function(e) {});
      },
      menuShow(){               //判断是否有权限
        this.userInfo = JSON.parse(localStorage.userInfo);
        var menu = this.userInfo.data;
        for (var i = 0; i < menu.length; i++) {
          if (menu[i].label == "邮件管理") {
            for (var j= 0; j < menu[i].children.length; j++) {
              let me = this;
              if ( menu[i].children[j].url == "/receive") {
                this.receive = true;
              }
              if ( menu[i].children[j].url == "/send") {
                this.send = true;
              }
              if ( menu[i].children[j].url == "/drafts") {
                this.drafts = true;
              }
              if ( menu[i].children[j].url == "/dustbin") {
                this.dustbin = true;
              }
              if ( menu[i].children[j].url == "/classify") {
                this.classify = true;
              }
            }  
          }
        }
      } ,
      back:function(){ 
        this.$router.push({path: '/home'});
      },
      showMenu:function(){ 
      	this.popupVisible=true;
      },
      searchMail:function(){
      	this.$router.push({path: '/searchMail'});
      },
      mailEdit:function(){
      	this.$router.push({path: '/mailEdit'}); 
      }
    } 
  } 
</script>
<style scoped>
  .mainheader{height:100%}
  .mainheader .mailMenu{width:100%;height: 100%}
  .mainheader .mailMenu h4{ background: #eaeaea; padding: 10px 0px; margin: 8px 0px 0px 0px; }
  .mainheader .popMenu{padding: 0px; margin:1px; display: block; }
  .mainheader .popMenu li{ border-bottom: 1px dashed gray;  width: 90%; line-height: 2.5em    }
  .mainheader .popMenu li a{text-decoration: none;color: #5e67fc;}
  .mainheader .mint-popup-left{width:30%;height: 100%}
</style>