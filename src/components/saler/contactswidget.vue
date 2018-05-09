  <template id="contactsWidget">
    <div>
      <div class='customerList' style="height:80%" @click.stop="postPop=false">
        <div class="searchbox">
          <mt-field label="姓名:" placeholder="可以输入姓名" v-model="lianxiren.name">
            <span class="required">*</span>
          </mt-field>
          <div class="" style=" padding:0 1px;">
            <mt-radio title="" align="right" class="page-part" v-model="lianxiren.sex" :options='sexOptions'>
            </mt-radio>
          </div>
          <mt-field readonly  label="职务" placeholder="选择职务" v-model="postName" @click.stop.native='postPop=!postPop'>
          </mt-field>
          <mt-field label="手机:" placeholder="可以输入手机" v-model="lianxiren.phone" :attr="{maxlength: 11 }">
            <span class="required">*</span>
          </mt-field>
          <mt-field label="邮箱:" placeholder="可以输入邮箱" v-model="lianxiren.email" :attr="{maxlength: 100 }">
            <span class="required">*</span>
          </mt-field>
          <mt-field label="电话:" type="tel" placeholder="可以输入电话" v-model="lianxiren.telephone" :attr="{maxlength:13}">
          </mt-field>
          <mt-field label="分机:" placeholder="可以输入分机" :attr="{ maxlength: 4 }" v-model="lianxiren.extension">
          </mt-field>
          <mt-field label="微信:" placeholder="可以输入微信" v-model="lianxiren.wechatNum">
          </mt-field>
          <mt-field label="QQ:" placeholder="可以输入QQ" v-model="lianxiren.qqNum">
          </mt-field>
          <mt-field label="个人信息" placeholder="个人信息" type="textarea" rows="4" v-model="lianxiren.content" style="height:140px; margin-top:20px " >
          </mt-field>
          <mt-button type="primary" size="small" style="background:#5e67fc;width:100px;" @click.stop.native='contactsVerification'>
            保存
          </mt-button>
        </div>
      </div>
      <mt-popup v-model="postPop" position="bottom" :modal="false" style='width:100%'>
        <div class="title-pop">
          选择职务
        </div>
        <mt-picker :slots="slotPostArr" ref="slotPostArr" @change="onValChangePost" :visibleItemCount='3' valueKey="name" style='width:100%;background: #efefef' :itemHeight='50' v-if="postPop">
        </mt-picker>
      </mt-popup>
    </div>
  </template>
  <script>
    import { MessageBox } from 'mint-ui';
    import axios from 'axios';
    import { Indicator } from 'mint-ui';
    export default {
      data() {
        return {
        postPop:false,              //职务选择
        slotPostArr: [{
          flex: 1,
          values: [],
          className: 'slotPostArr',
          textAlign: 'center',
          defaultIndex: 1,
        }],                         //职务数组
        //新建联系人参数
        sexOptions: [{              //联系人性别选择
          label: '男',
          value: '1',
        },{
          label: '女',
          value: '2'
        }
        ],
        postName:"",                //职务名称
        lianxiren: {
          name: '',                 //姓名
          sex: '1',                 //性别
          postId: '',               //职位id
          email: '',                //邮箱
          phone: '',                //手机
          telephone: '',            //电话
          extension: '',            //分机
          wechatNum: '',            //微信号
          qqNum: '',                //QQ号
          province: '',             //省
          city: '',                 //城市
          content: '',              //个人信息
        },
        showAddContact: false,      //新建联系人显示
      }
    },
    props:[
      'customerId'
    ],
    watch: {
    },
    created:function(){

    },
    mounted: function() {
      this.selectCustomPostListPaging();
    },
    methods: {
      addContact: function() {                //添加联系人点击事件
        var self = this;
        this.customerId = '';
        if (self.customerId && self.customerId != '') {
          this.showAddContact = true;
        } else {
          MessageBox('提示', '请先选择客户');
        }
      },
      fChkMail(szMail) {                      //邮件格式验证
        var szReg = /^(\w-*\.*\+*)+@(\w-?)+(\.\w{2,})+$/;
        var bChk = szReg.test(szMail);
        return bChk
      },
      validateLianxirenForm: function() {     //联系人表单验证
        if (this.lianxiren.name == '') {
          MessageBox('提示', '请填写联系人姓名！');
          return false
        }
        if (this.lianxiren.phone == '') {
          MessageBox('提示', '请填写联系人手机');
          return false
        }else{
          if(!/^(?:13\d|15\d|18\d|17\d)\d{5}(\d{3}|\*{3})$/g.test(this.lianxiren.phone)){
            MessageBox('提示', '请正确填写手机号！');
            return false
          }
        }
        if (this.lianxiren.email == '') {
          MessageBox('提示', '请填写联系人邮箱');
          return false
        }
        if (!this.fChkMail(this.lianxiren.email)) {
          MessageBox('提示', '请填写正确的邮箱');
          return false
        }
        if(this.lianxiren.telephone != '' && this.lianxiren.telephone.length<7 ){
          MessageBox('提示', '电话号码长度7-13位！');
          return false
        }
        if(this.lianxiren.telephone != '' && !/^((0\d{2,3})?-?)(\d{7,8})$/g.test(this.lianxiren.telephone)){
          MessageBox('提示', '请正确填写电话！');
          return false
        }
        var reg1 = /[^\0-9\,]/g;
        if (this.lianxiren.qqNum != '' && reg1.test(this.lianxiren.qqNum)) {
          MessageBox('提示', 'QQ号码只能是数字');
          return false
        }
        if (this.lianxiren.wechatNum != '' && reg1.test(this.lianxiren.wechatNum)) {
          MessageBox('提示', '微信号码只能是数字');
          return false
        }
        if (this.lianxiren.extension != '' && reg1.test(this.lianxiren.extension)) {
          MessageBox('提示', '分机号码只能是数字');
          return false
        }
        return true
      },
      contactsVerification(){             //联系人验证 
        if (this.customerId && this.customerId != '') {
          if (!this.validateLianxirenForm()) {
            return
          }
          let param = {
              'phone':this.lianxiren.phone,
              'email':this.lianxiren.email
          };
          let me = this;
          setTimeout(function() {
            me.$emit('closeContactsWidget');
          }, 350);
          axios.post(this.html_url +this.Apilist.checkRepeatContactByPhoneEmail, param).then(function(data) {
            let list = data.data.data;
            if(list  == null || list  == ''){
              me.saveLianxiren();
            }else{
                me.$confirm(''+list+'', '温馨提示', {
                  confirmButtonText: '确定',
                  cancelButtonText: '取消',
                  type: 'warning'
                }).then(() => {
                  me.saveLianxiren();
                }).catch(() => {

                }); 
                MessageBox.confirm(''+list+'').then(action => { 
                  me.saveLianxiren();
                }, () => {});
            }
          }).catch(function(e) {
            me.$emit('closeContactsWidget');
          });
        } else {
          MessageBox('提示', '请先选择客户');
        }
      },  
      saveLianxiren: function() {               //保存联系人
        var self = this;
        if (self.customerId && self.customerId != '') {
          if (!self.validateLianxirenForm()) {
            return
          }
          self.lianxiren.customId = self.customerId;
          self.showAddContact = false;
          Indicator.open({
            text: '加载中...',
            spinnerType: 'fading-circle'
          });
          axios.post(self.html_url + self.Apilist.insertContacts, self.lianxiren).then(function(data) {
            Indicator.close(); 
            MessageBox('提示', '添加联系人成功');
            self.clearLianxiren(); 
            self.$emit('closeContactsWidget');
          }).catch(function(e) { 
            self.$emit('closeContactsWidget');
            Indicator.close();
          });
        } else {
          MessageBox('提示', '请先选择客户');
        }
      },
      clearLianxiren: function() {            //联系人清空
        this.postName = "";
        this.lianxiren = {
          name: '',
          sex: '1',
          postId: '',
          email: '',
          phone: '',
          telephone: '',
          extension: '',
          wechatNum: '',
          qqNum: '',
          province: '',
          city: '',
          content: '',
        }
      },
      selectCustomPostListPaging(){       //联系人岗位查询
        let me = this;
        me.postIdArr = [];
        let param = {};
        axios.post(this.html_url +this.Apilist.selectCustomPostListPaging, param).then(function(data) {
          let Type = data.data.data;
          if(Type != null){
            for(let i = 0;i<Type.length;i++ ){
              me.slotPostArr[0].values.push({ name: Type[i].name, id:Type[i].id+''});
            }
          }
        }).catch(function(e) {});
      },
      onValChangePost(picker, values){            //联系人职务选择
         if (values[0] == undefined) {
          return
        }
        this.postName = values[0].name;
        this.lianxiren.postId = values[0].id;
      }
    }
  }
  </script>
  <style>
    .mint-radio-input:checked + .mint-radio-core{background: #5e67fc;}
  </style>
  