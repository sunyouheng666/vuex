<template id="mailDetail">
  <div class="pageBox mailDetail-box">
    <mt-header title="邮件详情" fixed  style="color: #fff;">
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      <mt-button  slot="right" @click.native="xiangxi">{{xiangxiword}}</mt-button>
    </mt-header>
    <div>
      <div class="listbox-receive">
        <div class="toppi"> </div>
        <div class="formBox">
          <div class="labelItem">
            <div class="text-left">
              主题：
            </div>
            <div class="text-right">
              {{ mailDetail.subject }}
            </div>
            <div style="clear: both;"></div>
          </div>
          <div style="min-height: 22px; border-bottom: 1px solid #d9d9d9; ">
            <div class="text-left">
              发件人：
            </div>
            <div class="text-right">
              {{ mailDetail.fromMail }}
            </div>
            <div style="clear: both;"></div>
          </div>
          <div v-show='showLianxiren'>
            <div class="labelItem">
              <div class="text-left">
                收件人：
              </div>
              <div class="text-right">
                {{ mailDetail.recipients }}
              </div>
              <div style="clear: both;"></div>
            </div>
            <div class="labelItem" v-show='hasCc'>
              <div class="text-left">
                抄送人：
              </div>
              <div class="text-right">
                {{ mailDetail.cc }}
              </div>
              <div style="clear: both;"></div>
            </div>
            <div class="labelItem" v-show='hasBc'>
              <div class="text-left">
                私密人：
              </div>
              <div class="text-right">
                {{ mailDetail.bc }}
              </div>
              <div style="clear: both;"></div>
            </div>
            <div class="labelItem">
              <span class="text-left">时间：</span>
              <div class="text-right">
                {{String(mailDetail.sentDate).substr(0,10)  }}
              </div>
            </div>
            <div class="labelItem" v-show="hasAttchment">
              <span class="text-left">附件数：</span>
              <div class="text-right">
                <span class="attachmentIcon">
                  <img slot="icon" src="../../../static/image/attachment.png" height="20px">
                </span>
                <span style="color:#b5b5b5;">
                  {{num}}
                </span>
              </div>
            </div>
          </div> 
          <div class="mailcontent" v-html="mailDetail.content"></div>
          <div style="padding-bottom:10px;">
            <div class="attachmentBox" v-show="hasAttchment">
              <div class="attachment" v-for="item in mailDetail.attachmentList">
                <span class="name">{{item.fileName}}</span>
                <span class="size">{{item.fileSize/1000+' K'}}</span>
              </div>
            </div>
            <div style="padding-bottom:123px; clear:both"></div>
          </div>
        </div>
      </div>
    </div>
    <!-- 菜单 -->
    <mailDetailTab :boxId='boxId' :mailId="mailId"></mailDetailTab>
  </div>
</template>
<script>
  import { MessageBox } from 'mint-ui';
  import axios from 'axios';
  export default {
    data() {
      return {
        isLajiBox:true,           //发件人可以删除
        hasBc:false,              //私密人
        hasCc:false,              //抄送人
        xiangxiword:"+详细",      //详情文字
        showLianxiren:false,      //像是详情
        mailDetail: {},           //邮件详情
        hasAttchment: false,      //附件
        isShoujianBox:false,      //收件人
        isFajianBox:false,        //发件人
        num:0                     //附件数
      }
    },
    props: {
      mailId: {
        type: Number,
        default: -1
      },
      boxId: {
        type: Number,
        default: -1
      },
    },
    mounted: function() {
      this.getMailDetail();
    },
    created:function(){   
    },
    updated: function () {
      this.$nextTick(function () {
        var size = localStorage.getScreenSize;
        $('.mailcontent img').attr('style','max-width:'+window.screen.width+'px');
      })
    },
    methods: {
      xiangxi:function(){
        if (this.showLianxiren == false) {      //详细功能
          this.showLianxiren = true;
          this.xiangxiword = '-隐藏'
          if (this.isLajiBox) {
            this.isShoujianBox=false;
            this.isFajianBox=false;
          }
        }else{
          this.showLianxiren = false;
          this.xiangxiword = '+详细'
        }
      },
      getMailDetail:function() {                  //获取邮件详情
        if (this.boxId==-1) {//收件箱
          this.isShoujianBox=true;
          this.isFajianBox=false;
        }else if(this.boxId==-5){
          this.isFajianBox=true;
          this.isShoujianBox=false;
        }else if (this.boxId==-101) {
          this.isLajiBox = true;
          this.isFajianBox=true;
          this.isShoujianBox=true;
        }
        var self = this;
        var param = {
          id: self.mailId
        }
        var temp_url = this.html_url + this.Apilist.getMailDetail;
        axios.post(temp_url, param).then(function(res) { 
          if (res.data.data != null) {
            self.mailDetail = res.data.data;
            if (self.mailDetail.attachmentList.length > 0) {
              self.num = self.mailDetail.attachmentList.length;
              self.hasAttchment = true;
            }
            if (self.mailDetail.cc!='') {
              self.hasCc = true;
            }
            if (self.mailDetail.bc!='') {
              self.hasBc = false;
            }
          } else {
            MessageBox.alert('没有此邮件！','提示');
            this.$router.go(-1);
          }
        }).catch(function(e) {});
      },
      back: function() {
        this.$router.go(-1);
      },
    }
  }
</script>
<style scoped>
  .toppi {padding-top: 40px;text-align: left;padding-left: 10px;}
  .mailMenu {width: 100%;height: 100%}
  .mailMenu h4 {background: #eaeaea;padding: 10px 0px;margin: 8px 0px 0px 0px;}
  .labelItem{min-height: 24px; border-bottom: 1px solid #d9d9d9; }
  .text-left{width:65px;display: block;float: left;color: #7a7a7a;text-align: left; font-size: 14px;padding-left: 3px;line-height: 24px;}
  .text-right{float: left;width: 75%;text-align: left; word-break: break-all; font-size: 14px;line-height: 24px;color: #ff6a00;}
  .xiangxi{position:absolute;right:4px;color:#0d91f5;display: inline-block;}
  .attachmentIcon {float: left;margin-right: 4px;vertical-align: middle;}
  .attachmentBox {clear: both;height: 3em;width: auto;margin: 10px 0;padding-top: 10px;}
  .attachment {width: 100%;height: 3em;padding: 8px;background: #f4f6f8 url('../../../static/image/fujian-1.png') 4px center no-repeat;margin-right: 5px;border: 1px solid #e3e3e3;}
  .fjian {padding: 6px;border: 1px solid rgb(18, 106, 172);text-align: left;}
  .attachment .name {display: block;line-height: 25px;height: 25px;color: #04346f;overflow:hidden;text-overflow:ellipsis;text-align: left; padding-left:40px;}
  .attachment .size {display: block;line-height: 25px;color: #333;text-align: left;padding-left:40px;}
  .mailcontent {float: left;min-height: 200px;padding: 5px;background: #f8f5f5;width: 97%;
  word-wrap: break-word;overflow-x: hidden; max-width: 97%;position: relative;z-index: -1}
  .mailcontent img{max-width: 200px;}
</style>
<style>
  .mailDetail-box .mint-header-title{padding-bottom: 0px!important; color: #fff;}
</style>