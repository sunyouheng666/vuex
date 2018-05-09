<template id="maillist">
  <div class="listbox-receive">
    <ul class='shou-list' v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10" :style="source=='/searchMail'?'margin-top: 5px;':'margin-top: 38px;'">
      <li v-for="item1 in mails">
        <mt-cell-swipe title="" :right="getRightButton(item1,listType)">
          <img v-bind:src="getImageUrl(item1)" class="mailStatus">
          <div class="mailItem" @click="goDetail(item1.id,item1.boxId,item1.oldBoxId)">
            <div class="itemHead">
              <span class='sender'>{{getSenderName(item1)}}</span>
              <span class='sendTime'>{{String(getSendTime(item1)).substr(0,10) }}</span>
            </div>
            <div class="topic">{{item1.subject}}</div>
          </div>
        </mt-cell-swipe>
        <div class="line"></div>
      </li>
      <div style=" margin:0 auto;width:60px" v-show='loading'>
        <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto">
        </mt-spinner>
      </div>
      <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕</div>
      <div style="padding:20px; text-align:center; color:gray" v-show='noData'>查询暂无数据！</div>
    </ul>
  </div>
</template>
<!-- boxId定义
-1/收件箱
-3/草稿箱
-5/发件箱
-101/垃圾箱
-11/归并箱
status定义
-1/存草稿状态
0/发送失败
1/已提交发送
2/发送成功 -->
<script>
  import { MessageBox } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  import axios from 'axios';
  export default {
    data() {
      return {
        source:'',
        showtitle: true,
        noData: false,                  //没有数据提示
        loading: false,
        mails: [],
        searchbox:false,                //是不是搜索箱
        totalPage: 1,
        loadAll: false,
        currentPage: 1,
        customerMail: 'customerMail',   //邮件类型
        operatorId : ""                 //操作人ID
      }
    },
    props: {
      searchType: {
        type: Number,
        default: 1
      },
      wanglaiType: {
        type: Number,
        default: 1
      },
      isWanglai: {
        type: Boolean,
        default: false
      },
      pageSize: {
        type: Number,
        default: 15
      },
      boxId: {
        type: Number,
        default: -1
      },
      listType: {
        type: String,
        default: 'maillist'
      },
      searchKeyWord: {
        type: String,
        default: ''
      },
      searchMail: {
        type: Boolean,
        default: false
      },
      customerId: {
        type: String,
        default: ''
      },
    },
    mounted: function() {
      this.loadMore();
      if (this.isWanglai) {
        this.showtitle = false
      }
    },
    watch: {
      searchKeyWord: {
        handler: function(val, oldval) {
          if (val == '') {
            this.mails = [];
            return
          }
          if (val != oldval) {
            this.currentPage = 1;
            this.totalPage = 1;
            this.mails = [];
            this.loadMore()
          }
        },
        deep: true
      },
    }, //以V-model绑定数据时使用的数据变化监测  
    created : function(){
      let list = localStorage.userInfo;
      list = JSON.parse(list);
      this.operatorId = list.employeeId;
      this.source = this.$route.path;
    },
    methods: {
      getRightButton(item, listType) {          //左滑删除
        if(this.boxId == -3||this.boxId == -101){
          if(item.operatorId != this.operatorId){
            return
          }
        }
        if (listType == 'customerMail') {
          return
        }
        if (this.boxId != -101) {
          return [{
            content: '删除',
            style: {
              background: '#eb5555',
              color: '#fff'
            },
            handler: () => {
              this.deleteItem(item)
            }
          }];
        }
        return [{
            content: '删除',
            style: {
              background: '#eb5555',
              color: '#fff'
            },
            handler: () => {
              this.deleteItem(item)
            }
          },
          {
            content: '还原',
            style: {
              background: '#497049',
              color: '#fff'
            },
            handler: () => {
              this.relive(item.id)
            }
          }
        ];
      },
      getImageUrl(item) {
        if (this.boxId == -1 || (this.boxId == -101 && item.oldBoxId == -1)) {
          if (item.hasRead) {
            return this.img_url+"/static/image/shou1.png";
          }
          return this.img_url+"/static/image/shou2.png";
        } else if (this.boxId == -5 || (this.boxId == -101 && item.oldBoxId == -5)) {
          if (item.status == -1) {
            return this.img_url+"/static/image/saveDraft.png";
          } else if (item.status == 0) {
            return this.img_url+"/static/image/sendError.png";
          } else if (item.status == 1) {
            return this.img_url+"/static/image/tijiaofasong.png";
          } else if (item.status == 2) {
            return this.img_url+"/static/image/sendok.png";
          }
          return this.img_url+"/static/image/tijiaofasong.png";
        }
        return this.img_url+"/static/image/draft.png"
      },
      getSenderName(item) {
        if (this.boxId == -1 || (this.boxId == -101 && item.boxId == -1)) {
          return item.fromMail;
        } else if (this.boxId == -5 || this.boxId == -3 || (this.boxId == -101 && (item.boxId == -5 || item.boxId == -3))) {
          return item.recipients;
        }
        return item.recipients;
      },
      getSendTime(item) {
        if (this.boxId != -101) {
          return item.sentDate;
        }
        return item.sentDate;
      },
      relive(id) {
        var self = this;
        var param = {
          idListStr: id,
          updateFlag: 2, //1表示删除到垃圾箱，2表示还原邮件
          boxId: -101 //当前箱子ID
        };
        axios.post(self.html_url + self.Apilist.updateEmail, param).then(function(data) {
          self.updateList(id)
        }).catch(function(e) {});
      },
      deleteItem(obj) {              //删除邮件
        if(obj.operatorId != this.operatorId){
          MessageBox.alert( '没有删除权限！','提示');
          return
        }else{
          var self = this;
          self.$messagebox.confirm('确定删除?').then(action => {
            var temp_url = '';
            var param = {
              idListStr: obj.id,
              boxId: self.boxId,
              updateFlag: 1,          //1表示删除到垃圾箱，2表示还原邮件
            };
            Indicator.open({
              text: '删除中...',
              spinnerType: 'fading-circle'
            });
            let currenPage = self.currentPage-1;
            if (self.boxId == -101 || self.boxId == -3) {
              temp_url = self.html_url + self.Apilist.clearEmail;
              param = {
                idListStr: obj.id,
                boxId: self.boxId,
                pageRows : self.pageSize,
                currenPage : currenPage,
                pagingRequired:true,
              };
            } else {
              temp_url = self.html_url + self.Apilist.updateEmail;
            }
            axios.post(temp_url, param).then(function(data) {
              Indicator.close();
              self.mails = data.data.data;
            }).catch(function(e) {

            });
          }).catch(function(e) {

          });
        }
      },
      updateList(_id) {
        this.mails = this.mails.filter(t => t.id != _id);
      },
      loadMore() {
        if (this.searchMail && this.searchKeyWord == '') {
          return
        }
        if (this.currentPage > this.totalPage) {
          return;
        }
        let self = this;
        this.loading = true;
        var maillistAPI = self.Apilist.getReceiveList;
        var userInfo = JSON.parse(localStorage.userInfo);
        var param = {
          boxId: self.boxId == 0 ? "" : self.boxId,
          subject: self.searchKeyWord,
          pageRows: self.pageSize,
          pagingRequired: true,
          employeeId: '',
          currenPage: self.currentPage
        };
        if (this.customerId != '') {
          if (this.isWanglai) { //判断是不是往来邮件
            maillistAPI = this.Apilist.selectMailPagingListByCustom;
            param = {
              boxId: self.boxId == 0 ? "" : self.boxId,
              currenPage: self.currentPage,
              customId: self.customerId,
              endTimeStr: "",
              pageRows: self.pageSize,
              pagingRequired: true,
              startTimeStr: "",
              subject: "",
              type: self.wanglaiType
            } 
            if(self.wanglaiType == 1){
              param.boxId = '';
            } 
          } else {
            param = {
              boxId: self.boxId == 0 ? "" : self.boxId,
              subject: self.searchKeyWord,
              pageRows: self.pageSize,
              pagingRequired: true,
              customerId: self.customerId,
              employeeId: '',//userInfo.employeeId,
              currenPage: self.currentPage
            };
          }
        } else { // 如果没有用户id 普遍性搜索
          if (this.searchMail && this.searchKeyWord != '') {
            this.searchbox = true;
            param = { 
              subject: self.searchKeyWord,
              pageRows: self.pageSize,
              pagingRequired: true,
              employeeId: '',//userInfo.employeeId,
              currenPage: self.currentPage,
              searchType: self.searchType
            };
          } else {
            param = {
              boxId: self.boxId == 0 ? "" : self.boxId,
              subject: null,
              pageRows: self.pageSize,
              pagingRequired: true,
              employeeId: '',//userInfo.employeeId,
              customerId: '',
              currenPage: self.currentPage
            };
          }
        }; 
        axios.post(self.html_url + maillistAPI, param).then(function(data) {
          if(self.currentPage != 1 && data.data.data.length == 0){
            self.currentPage -= 1;
            self.loadMore();
          }
          if (data.data.totalPage == 0 || data.data.totalPage == null) {
            self.noData = true;
            self.loadAll = false;
          }
          self.mails = self.mails.concat(data.data.data); 
          self.length = self.mails.length;
          self.loading = false;
          self.totalPage = data.data.totalPage;
          if (self.currentPage == data.data.totalPage  ) {
            self.loadAll = true;
            self.noData = false;
          }
          self.currentPage = self.currentPage + 1;
        }).catch(function(e) {
          self.loading = false;
        });
      },
      goDetail(Id, boxIds, oldBoxId) {
        var tempbox = boxIds;
        var fromBox =this.boxId;
        if (this.searchbox) {
          fromBox = boxIds;
        }
        if (tempbox == -3) { //草稿箱
          this.$router.push({path: '/mailEdit',query: {id: Id,boxId: fromBox,operType: 'edit'}});
        } else if (tempbox == -1) { //收件箱
          this.$router.push({path: '/mailDetail',query: {id: Id,boxId: fromBox}});
        } else if (tempbox == -5) { //发件箱
          this.$router.push({path: '/mailDetail',query: {id: Id,boxId: fromBox}});
        } else if (tempbox == -101) { //垃圾箱
          this.$router.push({path: '/mailDetail',query: {id: Id,boxId: fromBox}});
        } else if (tempbox == -11) { //归并箱 
          this.$router.push({path: '/mailDetail',query: {id: Id,boxId: oldBoxId}});
        }
      }
    }
  }
</script>
<style scoped>
  .shou-list .mint-cell .mint-cell-wrapper{ height:61px!important;}
  .shou-list {text-align: left;margin: 8px 0;}
  .shou-list li {position: relative;width: 100%;background: #efefef;margin-bottom: 0px;border: 0px!important;}
  .mailStatus {position: absolute;left: 4px; z-index: 0;top:10px;width:30px;}
  .mint-checklist .mint-cell {padding: 0; width: 90%!important;float: left; text-align: left;}
  .mint-cell-value { width: 100%;line-height: 20px;}
  /* .testload {padding-left: 10px;}
  .testload li {display: block; width: 100%; height: 30px;
    border-bottom: 1px solid gray; padding-left: 10px;} */
  .mailItem{height:48px!important;}
  .mailItem .content {font-size: 0.6em;padding-left: 5px; color: gray;height: 1.4em;overflow: hidden;}
  .mailItem .topic {font-size: 0.8em;padding-left: 5px;color: #5e67fc;overflow: hidden;
    text-overflow: ellipsis;white-space: nowrap;min-width: 200px;min-height:20px;}
  .mailItem .sendTime {display: inline-block;float: right;font-size: 12px;margin-top: 2px; margin-right: 12px;}
  .mailItem .itemHead {font-size: 1em;padding:0px; margin:0px; padding-left: 5px;}
  .mailItem {display: inline-block;background: #fefefe;width: 90%;float: left; position: absolute;
    top:6px;left: 40px;line-height: 20px;}
  .sender {float: left;font-size: 0.9em;display: inline-block;max-width: 16em;
    overflow: hidden;text-overflow: ellipsis; white-space: nowrap;}
  .mailMenu h4 { background: #eaeaea;padding: 10px 0px;margin: 8px 0px 0px 0px;}
  .popMenu { padding: 0px; margin: 1px;display: block;}
  .popMenu li {border-bottom: 1px dashed gray;width: 90%;line-height: 2.5em}
  .popMenu li a {text-decoration: none;color: #5e67fc;}
  .mint-popup-left {width: 30%;height: 100%}
  .mailMenu {width: 100%; height: 100%}
  h1,h2 {font-weight: normal;}
  ul {list-style-type: none;padding: 0;}
  li {display: inline-block;margin: 0px;}
  a {color: #5e67fc;}
  .mint-swipe {width: 100%;height: 280px;background: tan;}
</style>
<style>
  .listbox-receive  .mint-cell .mint-cell-wrapper{ height:44px!important;}
</style>