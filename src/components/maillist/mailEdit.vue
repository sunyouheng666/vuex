<template id="mailEdit" class="mailEdit">
  <div>
    <mt-header :title="pageTitle" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      <mt-button slot="right" @click.native="sendMail" :disabled='sendbtn'>发送</mt-button>
    </mt-header>
    <div class="listbox-receive">
      <div class="toppi"> </div>
      <div class="formBox">
        <div class="inputlow">
          <mt-field label="发件人" placeholder="请输入发件人" v-model="senderMail" style='font-size:14px;' @click.native='showSender' readonly></mt-field>
        </div>
        <div class="inputlow">
          <div class="labelName">
            收件人
          </div>
          <div class="recipientsBox">
            <mt-button size="small" class='addMailBtn' type="primary" @click="showliebiao('zhengchang')">+</mt-button>
            <div class="emailInput" id="emailTo">
            </div>
          </div>
        </div>
        <div class="inputlow" v-show='showCopysend' style="border-bottom:1px solid #d9d9d9;border-top:1px solid #d9d9d9">
          <div class="labelName">
            抄送人
          </div>
          <div class="recipientsBox">
            <mt-button size="small" class='addMailBtn' type="primary" @click="showliebiao('copy')">+</mt-button>
            <div class="emailInput" id="emailToCopy">
            </div>
          </div>
        </div>
        <div class="inputlow" v-show='showBc' style="border-bottom:1px solid #d9d9d9;">
          <div class="labelName">
            私密人
          </div>
          <div class="recipientsBox">
            <mt-button size="small" class='addMailBtn' type="primary" @click="showliebiao('simi')">+</mt-button>
            <div class="emailInput" id="emailToSimi">
            </div>
          </div>
        </div>
        <div class="inputlow">
          <mt-field label="主题" placeholder="输入主题" v-model="mailDetail.subject" class="" style='font-size:20px;' :attr="{maxlength: 100 }">
          </mt-field>
        </div>
        <div class="labelItem" @click="addCopy"><span style="color:gray">抄送、私密</span>
        </div>
        <div class="mailcontent">
          <tinymce :height='400' ref="editor" v-model="mailDetail.content"></tinymce>
        </div>
        <!-- 发件箱选择器 -->
        <mt-popup v-model="showSenderPop" position="bottom" style='width:100%'>
          <div class="title-pop"> 选择发件箱 </div>
          <mt-picker :slots="slotsSender" ref="pickerSender" @change="onValChangeSender" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showSenderPop"></mt-picker>
        </mt-popup>
      </div>
    </div>
    <mt-popup v-model="senderList" position="right">
      <div class='mailMenu'>
        <ul class='popMenu'>
          <li style="text-align:left">
            <mt-radio align="left" title="选择发件人" v-model="senderId" :options="senderAll" @change="checkSender()">
            </mt-radio>
          </li>
        </ul>
        <div class="closepop" @click="closepop">确定</div>
      </div>
    </mt-popup>
    <!-- 收件人列表 -->
    <mt-popup v-model="recipientsList" position="right" style="width:100%">
      <mt-navbar v-model="selectedRecip">
        <mt-tab-item id="customer">客户邮箱</mt-tab-item>
        <mt-tab-item id="company">公司通讯录</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selectedRecip">
        <mt-tab-container-item id="customer">
          <div class='mailMenu'>
            <mt-checklist align="right" title="" v-model="recipientsId" :options="recipientsAll" @change="checkRecipients()">
            </mt-checklist>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="company">
          <div class='mailMenu'>
            <mt-checklist align="right" title="" v-model="recipientsId" :options="recipientsAll" @change="checkRecipients()">
            </mt-checklist>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <div class="closepop" @click="closepop_recip">确定</div>
    </mt-popup>
    <div class="txl" v-if="popTongxun">
      <tongxunlu v-on:listenChildevent="showchild" :type='personType' :hasMails='hasAddMail'></tongxunlu>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import axios from 'axios';
import tinymce from '../tinymce'
export default {
  data() {
    return {
      idList:'',            //维护查询发邮件使用
      //-------------------------------------------------------
      hasAddMail: '', //input框里面已经有的邮箱
      sander: '',
      sendPinlv:0,
      sanderTypeId: '',
      //省
      slotsSender: [{
        flex: 1,
        values: [],
        className: 'slotsSander',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showSenderPop: false,
      hasMailId: -1,
      sendbtn: false,                       //发送按钮是否禁用
      showBc: false,
      showCopysend: false,                  //显示抄送input
      personType: 'zhengchang',             // 默认 发送人 zhengchang，抄送人 copy，私密人：simi
      showInput: false,
      tongxunluArray: [],
      maillist: '',
      shouJianRen: [],                      //最终选择的收件人 记录
      shouJianRenBc: [],
      shouJianRenCc: [],
      popTongxun: false,
      bluebg: 'bluebg',
      recipItem: '',
      selectedAllRecip: [],
      selectedRecip: 'customer',
      recipientsId: [],
      recipientsAll: [],
      recipientsList: false,
      senderList: false,
      popupVisible: false,
      content: 'this is content',
      selected: 'detail',
      sender: '',
      recipients: '',
      senderMail: '',
      senderAll: [],
      senderId: '',
      value: '',
      apiType: '',
      sendApi: "/mail/sendMail",
      pageTitle: '邮件管理',
      mailDetail: {
        recipients: '',
        content: '',
        subject: '',
      },
      mail_Form: {
        id: "",
        currentSenderAccount: {},
        senders: "",                    // id发件人id 
        senderName: "",
        fromMail: '',
        /** 发件邮箱账号  */
        recipients: [],                 // 收件人
        cc: [],                         // 抄件人
        bc: [],                         ///** 密送人 */
        subject: '',                    ///** 主题 */
        content: '',
        attachmentIds: '',              //附件Ids(逗号拼接,后端还未实现好)
        boxId: ""
      },
      hasAttchment: false,
      showSend: false,
      editorOption: {
        modules: {
          toolbar: [
            [{ 'color': [] }, { 'background': [] }],
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'size': ['small', false, 'large', 'huge'] }], // 
            [{ 'align': [] }],
          ],
          history: {
            delay: 1000,
            maxStack: 50,
            userOnly: false
          },
        }
      },
    }
  },
  props: {
    mailId: {
      type: Number,
      default: 0
    },
    boxId: {
      type: Number,
      default: '-1'
    },
    operType: {
      type: String,
      default: ''
    },
    customerId: {
      type: String,
      default: ''
    },
    from: {
      type: String,
      default: ''
    },
  },
  components: {
    tinymce
  },
  watch:{
  },
  mounted: function() {
    this.getSender();
    this.getMailDetail();
    this.getPageTitle();
    this.initEmailInput();
    if(this.$route.query.idList != undefined){
      this.idList = this.$route.query.idList;
      if(this.$route.query.typeList == '1'){
        this.sendMailWithMaintainList(this.idList);
      }else if(this.$route.query.typeList == '2'){
        this.sendMailPaymentRecruit(this.idList);
      }
    }
  },
  methods: {
    getSender() {
      var self = this;
      self.senderAll = [];
      axios.post(self.html_url + self.Apilist.getSender, {}).then(function(data) {
        self.senderAll = data.data.data;
        if (self.senderAll.length > 0) {
          for (var i = 0; i < self.senderAll.length; i++) {
            if (self.senderAll[i].defaultAccount == 1) {
              self.senderMail = self.senderAll[i].account; 
              self.senderId = String(self.senderAll[i].id);
            }
          }
        }
      }).catch(function(e) { MessageBox.alert('系统错误！','提示'); });
    },
    onValChangeSender: function(picker, values) {
      if (values[0] == undefined) {
        return
      }
      this.senderMail = values[0].name;
    },
    showSender: function() {
      var self = this;
      self.slotsSender[0].values = [];
      var senderArray = self.senderAll;
      if (!senderArray || senderArray.length == 0) {
        MessageBox.alert(' 没有绑定邮箱账号！','提示');
        return
      }
      for (var i = 0; i < senderArray.length; i++) {
          self.slotsSender[0].values.push({ id: senderArray[i].id, name: senderArray[i].account });
      }
      if(self.slotsSender[0].values.length == 0){
        MessageBox.alert(' 没有可使用邮箱账号！','提示');
        return
      }
      self.showSenderPop = true;
    },
    addCopy: function() {             // 显示抄送 私密人
      if (!this.showCopysend) {
        this.showCopysend = true;
        this.showBc = true;
      } else {
        this.showCopysend = false;
        this.showBc = false;
      }
    },
    unique: function(value) {
      var hash = [],
        arr = [];
      for (var i = 0, elem;
        (elem = value[i]) != null; i++) {
        if (!hash[elem]) {
          arr.push(elem);
          hash[elem] = true;
        }
      }
      return arr;
    },
    showchild(data) {
      var tagList = '';
      if (!data.closepop) {
        this.popTongxun = false;
      }
      if (data.tongxunluArray && data.tongxunluArray.length > 0) {
        this.tongxunluArray = this.unique(this.tongxunluArray.concat(data.tongxunluArray));
      }
      switch (data.personType) { //zhengchang, 抄送人 copy,私密人：simi
        case 'zhengchang':
          $("#emailTo").setInputValue(this.tongxunluArray.join(","),true);
          break;
        case 'copy':
          $("#emailToCopy").setInputValue(this.tongxunluArray.join(","),true);
          break;
        case 'simi':
          $("#emailToSimi").setInputValue(this.tongxunluArray.join(","),true);
          break;
      }
    },
    showliebiao(type) {
      var self = this;
      this.showInput = false;
      this.popTongxun = true; //显示通讯录列表 
      this.personType = type;
      self.shouJianRen =[];
      self.shouJianRenBc =[];
      self.shouJianRenCc =[];
      switch (type) {
        case 'zhengchang':
          $("#emailTo .one").each(function() {
            self.shouJianRen.push($(this).find('span').text());
          });
          if (self.shouJianRen.length > 10) {
            MessageBox.alert('输入收件人不能超过10个！','提示');
            return
          }
          break;
        case 'copy':
          $("#emailToCopy .one").each(function() {
            self.shouJianRenBc.push($(this).find('span').text());
          });
          if (self.shouJianRenBc.length > 10) {
            MessageBox.alert('输入私密人不能超过10个！','提示');
            return
          }
          break;
        case 'simi':
          $("#emailToSimi .one").each(function() {
            self.shouJianRenCc.push($(this).find('span').text());
          }); 
          if (self.shouJianRenCc.length > 10) {
            MessageBox.alert('输入抄送人不能超过10个！','提示');
            return  
          }
          break;
      } 
      this.tongxunluArray = this.shouJianRen; 
    },
    initEmailInput() {
      $("#emailTo").emailInput();
      $("#emailToCopy").emailInput();
      $("#emailToSimi").emailInput();
    },
    delMail(index) {
      this.selectedAllRecip.splice(index, 1);
      for (var i = 0; i < this.selectedAllRecip.length; i++) {
        this.$set(this.selectedAllRecip[i], '_index', false)
      }
      event.stopPropagation();
    },
    activeMail(index) {
      for (var i = 0; i < this.selectedAllRecip.length; i++) {
        this.$set(this.selectedAllRecip[i], '_index', false)
      }
      this.$set(this.selectedAllRecip[index], '_index', true)
    },
    getRecipients() {
      var self = this;
      self.recipientsAll = [],
        axios.post(self.html_url + self.Apilist.getRecipients, {}).then(function(data) {
          var recipientArray = data.data.data;
          var hasDefault = false;
          if (!recipientArray || recipientArray.length == 0) {
            MessageBox.alert(' 没有客户邮件地址！','提示');
            return
          }
          for (var i = 0; i < recipientArray.length; i++) {
            self.recipientsAll.push({ label: recipientArray[i].email, value: String(recipientArray[i].email) });
          }
        }).catch(function(e) { MessageBox.alert('系统错误！','提示'); });
    },
    selectRecipients() {
      this.getRecipients();
      this.recipientsList = true;
    },
    checkRecipients() {
      var self = this;
      for (var i = 0; i < self.recipientsAll.length; i++) {
        /*if ((self.recipientsAll[i].value) == this.senderId) {
          self.senderMail = self.senderAll[i].label;
          break;
        }*/
      }
    },
    checkSender() {
      var self = this;
      for (var i = 0; i < self.senderAll.length; i++) {
        if ((self.senderAll[i].value) == this.senderId) {
          self.senderMail = self.senderAll[i].label;
          break;
        }
      }
    },
    closepop() {
      this.senderList = false;
    },
    closepop_recip() {
      this.recipientsList = false;
    },
    getMailaddress(str) {             // 获取尖括号里面的 地址
      if (str.indexOf("<") > -1 && (str.indexOf(">") > -1)) {
        var szReg = /<(?!\/?p\b)[^>]+>/ig;
        var result = szReg.exec(str) + "";
        return result.substr(1, (result.length - 2))
      } else {
        return str
      }
    },
    arrayHasNeedle(needle, array) {   //节点去重
      var i = '';
      for (i in array) {
        if (array[i] == needle) return true;
      }
      return false;
    },
    showlength() { //验证主题长度
      var subjectLength = this.mailDetail.subject.length;
      if (subjectLength >= 100) {
        MessageBox.alert('主题文字过长不能大于100','提示');
        return false
      } else {
        return true
      }
    },
    addReceive(email) {
      var self = this;
      if (this.setActive == 'setActive_bc') {
        if (this.mailDetail.bc.length > 10) {
          this.$notify.error({
            title: '错误',
            message: '私密邮箱发送不能超10个。'
          });
          return
        }
        if (!self.arrayHasNeedle(email, this.mailDetail.bc)) {
          this.mailDetail.bc.push(email);
        } else {
          return
        }
      } else if (this.setActive == 'setActive_cc') {
        if (this.mailDetail.cc.length > 10) {
          this.$notify.error({
            title: '错误',
            message: '抄送邮箱发送不能超10个。'
          });
          return
        }
        if (!self.arrayHasNeedle(email, this.mailDetail.cc)) {
          this.mailDetail.cc.push(email);
        } else {
          return
        }
      } else if (this.setActive == 'setActive_recip') {
        if (this.mailDetail.recipients.length > 10) {
          this.$notify.error({
            title: '错误',
            message: '发件人邮箱不能超10个。'
          });
          return
        }
        if (!self.arrayHasNeedle(email, this.mailDetail.recipients)) {
          this.mailDetail.recipients.push(email);
        } else {
          return
        }
      }
    },
    fChkMail(szMail) {                //邮件格式验证
      var szReg = /^(\w-*\.*\+*)+@(\w-?)+(\.\w{2,})+$/;
      var bChk = szReg.test(szMail);
      return bChk
    },
    validateRec(mailvals) {         //没有调用，可以优化
      for (var i = 0; i < mailvals.length; i++) {
        if (!this.fChkMail(mailvals[i])) {
          this.mailisok = false;
          var arr = this.$refs.recipientsDom.$children[0].$children;
          arr[i].$el.style = "border:1px solid #ef5439;color:#ef5439";
        }
      }
    },
    validateForm() {                  // 发送验证 
      var self = this;
      self.sendbtn = false;
      if (!this.showlength()) { // mail subject length
        return false
      }
      if (self.senderMail == '') {
        MessageBox.alert('请输入发件人！','提示');
        return false
      }
      if(this.mailDetail.subject == ''){
        MessageBox.alert( '请输入主题！','提示');
        return false
      }
      if ($("#emailTo .one").length == 0) {
        MessageBox.alert('请输入收件人！','提示');
        return false
      } else {
        self.shouJianRen = [];
        self.shouJianRenBc = [];
        self.shouJianRenCc = [];
        $("#emailTo .one").each(function() {
          self.shouJianRen.push($(this).find('span').text());
        });
        $("#emailToCopy .one").each(function() {
          self.shouJianRenBc.push($(this).find('span').text());
        });
        $("#emailToSimi .one").each(function() {
          self.shouJianRenCc.push($(this).find('span').text());
        });
        if (self.shouJianRen.length > 10) {
          MessageBox.alert('输入收件人不能超过10个！','提示');
          return false
        }
        if (self.shouJianRenBc.length > 10) {
          MessageBox.alert( '输入私密人不能超过10个！','提示');
          return false
        }
        if (self.shouJianRenCc.length > 10) {
          MessageBox.alert('输入抄送人不能超过10个！','提示');
          return false
        }
      }
      return true
    },
    sendMail() {   
      var self = this; 
      if (!self.validateForm()) {
        return
      }
      if (self.sendbtn) {
        return
      }
      self.sendbtn = true;
      var RecpVal = this.shouJianRen.join(',');
      var param = {
        id: null,
        senders: Number(self.senderId),
        fromMail: self.senderMail,
        recipients: this.shouJianRen.join(','),
        attachmentIds: '',
        bc: this.shouJianRenBc.join(','),
        cc: this.shouJianRenCc.join(','), //this.mailDetail.bc.join(),
        boxId: '-5',
        content: self.mailDetail.content,
        subject: self.mailDetail.subject,
        oldEmailId: self.hasMailId,
        isReply: 0,
        isFw: 0
      };
      if (this.hasMailId != -1) {
        if (this.operType == "reply") {
          param.isReply = 1;
          param.attachmentIds = '';
        } else if (this.operType == "forward") {
          param.isFw = 1;
        } else if (this.operType == "edit") {
          param.id = this.$route.query.id;
        }
      }
      axios.post(this.html_url + self.sendApi, param).then(function(data) {
        MessageBox('发送成功！').then(action => {
          self.sendbtn = false;
          if (self.boxId == -1) { //返回收件箱 
            self.$router.push({ path: '/mailbox' });
          } else if (self.boxId == -5) { //返回fa件箱
             
            self.$router.push({ path: '/sendbox' });
          } else if (self.boxId == -3) { //返回草稿箱
            self.$router.push({ path: '/draftbox' });
          } else {
            self.$router.push({ path: '/mailbox' });
          }
        });
      }).catch(function(e) {
        //MessageBox('提示',  '发送错误！');
      });
    },
    getMailDetail() { // get mail detail api
      var self = this;
      self.showFormItem();
      if(this.customerId!="undefined" && this.customerId!=null && this.customerId!='') {
				axios.post(self.html_url + self.Apilist.getContactEmailByCustomId, {
					id: this.customerId
				}).then(function(data) {
					$("#emailTo").setInputValue(data.data.data,true);
				}).catch(function(e) {
				});
			}
      var param = {
        id: this.$route.query.id
      }
      self.hasMailId = this.$route.query.id != undefined ? this.$route.query.id : -1;
      if (this.$route.query.id == '' || this.$route.query.id == null) {
        return
      }
      axios.post(this.html_url + self.apiType, param).then(function(data) {
        self.mailDetail = data.data.data;
        if ((self.mailDetail.attachmentList != undefined) && self.mailDetail.attachmentList.length > 0) {
          self.hasAttchment = true;
        } 
        if (self.boxId == -1 && self.operType == 'reply') {
          self.sender = "";
          self.senderMail = self.mailDetail.fromMail;
          //显示收件人 
          $("#emailTo").setInputValue(self.mailDetail.recipients,true);
        }
        if ((self.boxId == -5 || self.boxId == -3) && self.operType == 'edit') {
          if(self.boxId == -3){
            self.mailDetail.bc = '';
          }
          self.senderMail = self.mailDetail.fromMail;
          $("#emailTo").setInputValue(self.mailDetail.recipients,true);
          
          if (self.mailDetail.cc != '') {
            self.showCopysend = true; 
            $("#emailToCopy").setInputValue(self.mailDetail.cc,true);
          }
          if (self.mailDetail.bc != '') {
            self.showBc = true; 
            $("#emailToSimi").setInputValue(self.mailDetail.bc,true);
          }
        }
      }).catch(function(e) { MessageBox.alert('error','提示'); });
    },
    back: function() {
      if (this.from == 'map') {
        window.salePhone.CloseCurrentWebview("");
      } else {
        this.$router.go(-1);
      }
    },
    showFormItem: function() { //转发 回复 编辑 
      if ((this.boxId == -1 || this.boxId == -5) && this.operType == 'forward') {
        //收件箱 发件箱---转发 表单 显示什么内容    调用转发内容
        this.sender = ""; //空
        this.recipients = ""; //空  
        this.apiType = "/mail/forwardMail";
      }
      if (this.boxId == -1 && this.operType == 'reply') {
        //收件箱---回复 表单 显示什么内容 回复接口  
        this.apiType = "/mail/replyMail";
      }
      if ((this.boxId == -5 || this.boxId == -3) && this.operType == 'edit') {
        // 发件箱 草稿箱  编辑   
        this.apiType = "/mail/selectMailDetail";
        this.sendApi = "/mail/sendMail";
      }
    },
    getPageTitle: function() {
      if (this.operType == 'reply') {
        this.pageTitle = '邮件回复'
      } else if (this.operType == 'edit') {
        this.pageTitle = '邮件编辑'
      } else if (this.operType == 'forward') {
        this.pageTitle = '邮件转发'
      }
    },
    sendMailWithMaintainList(n){        //维护查询写邮件
      let arr = [];
      arr[0] = n;
      var self = this;
      var param = {
        idList : arr
      };
      axios.post(this.html_url + this.Apilist.sendMailWithMaintainList, param).then(function(data) {
        var mailDetail = data.data.data;
        $("#emailTo").setInputValue(mailDetail.recipients,true);
        self.mailDetail.content = mailDetail.content;
      }).catch(function(e) {});
    },
    // sendMailPaymentRecruit(n){        //到款申领写邮件
    //   let arr = n.split(',');
    //   var self = this;
    //   var param = {
    //     idList : arr
    //   };
    //   axios.post(this.html_url + this.Apilist.sendMailPaymentRecruit, param).then(function(data) {
    //     var mailDetail = data.data.data;
    //     $("#emailTo").setInputValue(mailDetail.recipients,true);
    //     self.mailDetail.content = mailDetail.content;
    //   }).catch(function(e) {});
    // },
  }
}
</script>
<style>
.mint-field .mint-cell-title {
  width:105px;
  text-align: left;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  color: #28a1eb;
}
.mint-msgbox{z-index:20000;}
</style>
<style scoped>
.addMailBtn {
  position: absolute;
  top: 10px;
  right: 4px;
  font-size: 18px;
  height: 28px;
  width: 36px;
  background:#5e67fc;
}
.emailInput {
  margin: 0px;
  padding: 0px;
  min-height: 47px;
  width: 85%;
}
.header {
  height: 40px;
  line-height: 40px;
  text-align: center;
  position: fixed;
  top: 0px;
  width: 100%;
  font-size: 14px;
  background: #5e67fc;
  color: #fff;
}
.header .btn {
  position: absolute;
  right: 20px;
  top: 0px;
  padding: 0 10px;
}
.txl {
  display: block;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  background: white;
  position: absolute;
  top: 0px;
  z-index: 1900;
  left: 0px;
}
.hide {
  display: none
}
.redx {
  background: #f16262;
  color: white;
  padding: 2px;
  height: 12px;
  line-height: 12px;
  display: inline-block;
}
.bluebg {
  background: #6eb5eb;
  border-radius: 4px
}
.recipItem {
  padding: 3px;
  display: inline-block;
}
.inputlow {min-height: 40px; clear: both;}
.labelName {width: 100px;line-height: 48px;float: left;margin-right: -100px;color: #5e67fc; text-align: left;font-size:14px;padding-left:10px;}
.recipientsBox {
  width: auto;
  padding-left: 100px;
  min-height: 48px;
  word-wrap: break-word;
  position: relative;
}
.editbox {
  min-height: 250px
}
.popMenu[data-v-71061390] {
  padding: 0px;
  margin: 1px;
  display: block;
  max-height: 400px;
  overflow: scroll;
}
.mint-radiolist-title {
  font-size: 15px;
  margin: 12px;
  display: block;
  color: #474545;
}
.closepop {
  padding: 10px;
}


.addMail {
  width: 40px;
  height: 40px;
  background: #efefef;
  font-size: 19px;
  font-weight: bold;
  float: right;
  display: inline-block;
  line-height: 40px;
}
.editInput {
  width: 80%;
  float: left;
  font-size: 2em
}
.attachmentIcon {
  float: right;
  margin-right: 20px;
  margin-top: 5px
}
.toppi {
  padding-top: 40px;
  text-align: left;
  padding-left: 10px;
}
.itemVal {
  fload: left;
  width: 80%;
  min-height: 40px;
  max-height: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: gray
}
.attachment .name {
  display: block;
  line-height: 25px;
  color: #04346f;
}
.attachment .size {
  display: block;
  line-height: 25px;
  color: #333;
}
.attachmentBox {
  clear: both;
  height: 3em;
  width: auto;
  margin: 15px 0;
  padding-top: 10px;
}
.attachment {
  width: 45%;
  float: left;
  height: 3em;
  padding: 8px;
  background: #b7ddfa;
  margin-right: 5px;
  border: 1px solid #126aac;
}

.labelItem {
  color: #42b983;
  border-bottom: 1px solid #d9d9d9;
  border-top: 1px solid #d9d9d9;
  min-height: 40px;
  padding-left: 0.4em;
  line-height: 40px;
  font-size: 1em;
  width: auto;
  text-align: left;
}



.labelItem .labeltext {
  width: 4em;

  display: inline-block;
  float: left;
}

.mailcontent {
  float: left;
  min-height: 200px;
  padding: 5px;
  background: #eaeaea;
  width: 97%
}

.fjian {
  padding: 10px;
  border-bottom: 1px solid rgb(18, 106, 172);
  margin-bottom: 10px;
  text-align: left;
}

.mailItem .content {
  font-size: 0.6em;
  padding-left: 5px;
  color: gray;
  height: 1.4em;
  overflow: hidden;
}

.mailItem .topic {
  font-size: 0.8em;
  padding-left: 5px;
  color: #087dd5
}

.mailItem .sendTime {
  display: inline-block;
  float: right;
  font-size: 12px;
  margin-top: 0px;
}

.mailItem .itemHead {
  font-size: 1em;
  padding-left: 5px
}

.mailItem {
  display: inline-block;
  background: #eaeaea;
  width: 90%;
  padding-left: 35px;
}

.mailStatus {
  position: absolute;
  left: 4px;
  z-index: 1000000;
  top: 10px
}

.sender {
  fload: left;
}

.shou-list {
  text-align: left;
  line-height: 1.4em
}

.shou-list li {
  position: relative;
  width: 95%;
  background: #efefef;
}

.mailMenu h4 {
  background: #eaeaea;
  padding: 10px 0px;
  margin: 8px 0px 0px 0px;
}

.popMenu {
  padding: 0px;
  margin: 1px;
  display: block;
}

.popMenu li {
  border-bottom: 1px dashed gray;
  width: 100%;
  line-height: 2.5em
}

.popMenu li a {
  text-decoration: none;
  color: #1264b6;
}
.mint-popup-left {
  width: 80%;
  height: 100%
}
.mint-radio-label {
  width: 180px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mailMenu {
  width: 100%;
  height: 100%
}
.mint-field .mint-cell-title {
  width: 105px;
  -webkit-box-flex: 0;
  -ms-flex: none;
  flex: none;
  text-align: left;
}

h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.mint-swipe {
  width: 100%;
  height: 280px;
  background: tan;
}
</style>
<style>
  .inputlow .mint-cell .mint-cell-text{font-size: 14px;}
  .inputlow .mint-cell .mint-cell-wrapper{font-size: 14px;}
</style>