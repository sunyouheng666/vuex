  <template id="addJournalwidget">
    <div style="font-size: 14px;" class="addJournalwidget">
      <!-- 销售日志 -->
      <mt-field label="录入人" placeholder="" v-model="salesmanName" disabled>
        <span class="required">*</span>
      </mt-field>
      <mt-field label="拜访日期" placeholder="请输入日期" type="date" v-model="visitDate" class="time-height">
        <span class="required">*</span>
      </mt-field>
      <div style="clear:both"></div>
      <mt-field label="客户" placeholder="请选择客户"  v-model="customer" @click.native='showCustomerPop' readonly>
        <span class="required">*</span>
      </mt-field>
      <mt-field label="地址" placeholder="请选择客户" v-model="address" disabled>
      </mt-field>
      <mt-field label="陪访人" placeholder="请选择陪访人" v-model="accompanyNames" disabled @click.native.stop="dialogEmployeeClick"></mt-field>
      <div style="position: relative;">
        <mt-field label="联系人" placeholder="请选择联系人" v-model="contact"  @click.native='showContact' style="width:85%;" readonly>
        </mt-field>
        <span class="required" style="margin-right: 20px;position: absolute;top: 6px;right:28px;">*</span>
        <mt-button type="primary" size="small" @click.native.stop="addContact" style='position:absolute;top:6px;right:6px;height:30px;width: 30px;background:#5e67fc;'>+</mt-button>
      </div>
      <mt-field label="最高级别" placeholder="请选择最高级别"  v-model="highlevel" @click.native='showHigh' readonly>
      </mt-field>
      <mt-field label="最新级别" placeholder="请选择最新级别"  v-model="newlevel" @click.native='showNewlevel' readonly>
      </mt-field>
      <div style="clear:both"></div>
      <div style="height:36px;line-height: 36px;color:#5e67fc;font-size: 16px;text-align: left;padding-left: 10px;">
        拜访内容
      </div>
      <div> 
        <div style="text-align: left;padding-left: 10px;line-height: 22px;">
          1）客户有多少外贸人员？
        </div>
        <mt-field label="" placeholder="输入内容" v-model="answer1" :attr="{maxlength: 100 }"></mt-field>
      </div>
      <div> 
        <div style="text-align: left;padding-left: 10px;line-height: 22px;">
          2）你觉得客户对我们哪些服务感兴趣？
        </div>
        <mt-field label="" placeholder="输入内容" v-model="answer2" :attr="{maxlength: 100 }"></mt-field>
      </div>
      <div> 
        <div style="text-align: left;padding-left: 10px;line-height: 22px;">
          3）客户有哪些反对意见？你是怎么回答的？
        </div>
        <mt-field label="" placeholder="输入内容" v-model="answer3" :attr="{maxlength: 100 }">
          <span class="required">*</span>
        </mt-field>
      </div>
      <div> 
        <div style="text-align: left;padding-left: 10px;line-height: 22px;">
          4）客户是否有询问价格？客户对我们的价格有什么意见？
        </div>
        <mt-field label="" placeholder="输入内容" v-model="answer4" :attr="{maxlength: 100 }">
          <span class="required">*</span>
        </mt-field>
      </div>
      <div> 
        <div style="text-align: left;padding-left: 10px;line-height: 22px;">
          5）你是否要求客户签约付款，为什么客户不能当场定下来？
        </div>
        <mt-field label="" placeholder="输入内容" v-model="answer5" :attr="{maxlength: 100 }">
          <span class="required">*</span>
        </mt-field>
      </div>
      <div> 
        <div style="text-align: left;padding-left: 10px;line-height: 22px;">
          6）如果客户不能当场定下来，你是否约好下次拜访时间。
        </div>
        <mt-field label="" placeholder="输入内容" v-model="answer6" :attr="{maxlength: 100 }">
          <span class="required">*</span>
        </mt-field>
      </div>
      <div style="font-size:14px; text-align:left; color:tan;padding:5px 20px ">
        * 打电话、发邮件等市场行为严禁填入销售日志，否则当日日志作无效处理！
      </div>
      <mt-field label="乘车路线" placeholder="请输入乘车路线"  type="textarea" rows="4" v-model="xianlu" :attr="{maxlength: 200 }">
        <span class="required">*</span>
      </mt-field>
      <mt-field label="车费合计" placeholder="最多7位，保留小数点后两位" type='number' v-model="traffic" :attr="{ maxlength:10 }">
        <span class="required">*</span>
      </mt-field>
      <!-- 选择内容弹框 -->
      <mt-popup v-model="popCustomerList" position="right" style="width:80%;height:100%;overflow-y:scroll">
        <seachcustomwidget @selectCustomer="selectCustomer"></seachcustomwidget> 
      </mt-popup>
      <mt-popup v-model="contactPop" position="bottom" style='width:100%'>
        <div class="title-pop">选择联系人</div>
        <mt-picker :slots="slotsContact" ref="pickerContact " @change="onValChangeContact" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="contactPop"></mt-picker>
      </mt-popup>
      <mt-popup v-model="showHighPop" position="bottom" style='width:100%'>
        <div class="title-pop">选择最高级别</div>
        <mt-picker :slots="slotsHigh" ref="pickerHigh" @change="onValChangeHigh" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showHighPop"></mt-picker>
      </mt-popup>
      <mt-popup v-model="showNewlevelPop" position="bottom" style='width:100%'>
        <div class="title-pop">选择最新级别</div>
        <mt-picker :slots="slotsNewlevel" ref="pickerNewlevel" @change="onValChangeNewlevel" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showNewlevelPop"></mt-picker>
      </mt-popup>
      <mt-popup v-model="showAddContact" position="right" style="width:80%;height:100%;overflow-y:scroll">
        <contactswidget :customerId="customerId" @closeContactsWidget="closeContactsWidget"></contactswidget>  
      </mt-popup>
      <mt-popup v-model="popCustomerList" position="right" style="width:80%;height:100%;overflow-y:scroll">
        <seachcustomwidget @selectCustomer="selectCustomer"></seachcustomwidget> 
      </mt-popup>
      <mt-popup v-model="showAddContact" position="right" style="width:80%;height:100%;overflow-y:scroll">
        <contactswidget :customerId="customerId" @closeContactsWidget="closeContactsWidget"></contactswidget>        
      </mt-popup>
      <mt-popup v-model="contactPop" position="bottom" style='width:100%'>
        <div class="title-pop">选择联系人</div>
        <mt-picker :slots="slotsContact" ref="pickerContact " @change="onValChangeContact" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="contactPop"></mt-picker>
      </mt-popup>
      <mt-popup v-model="showHuoDongPop" position="bottom" style='width:100%'>
        <div class="title-pop">市场活动</div>
        <mt-picker :slots="slotsHuoDong" ref="pickerHuoDong" @change="onValChangeHuoDong" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showHuoDongPop"></mt-picker>
      </mt-popup>
      <mt-popup v-model="showHighPop" position="bottom" style='width:100%'>
        <div class="title-pop">选择最高级别</div>
        <mt-picker :slots="slotsHigh" ref="pickerHigh" @change="onValChangeHigh" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showHighPop"></mt-picker>
      </mt-popup>
      <mt-popup v-model="showNewlevelPop" position="bottom" style='width:100%'>
        <div class="title-pop">选择最新级别</div>
        <mt-picker :slots="slotsNewlevel" ref="pickerNewlevel" @change="onValChangeNewlevel" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showNewlevelPop" ></mt-picker>
      </mt-popup>
      <!-- 选择陪访人 -->
      <mt-popup v-model="accompanyShow" position="right" style="width:80%;height:100%;overflow-y:scroll">
        <accompanywidget :employeeMsg='employeeMsg' @getEmployee="getEmployee"></accompanywidget> 
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
          answer1 : "",
          answer2 : "",
          answer3 : "",
          answer4 : "",
          answer5 : "",
          answer6 : "",
          //新建市场日志参数
          logType: '1',               //日志类型
          customerKeyWords: '',       //客户查询
          loading: false,             //加载中
          totalPage: 1,               //总页数
          loadAll: false,             //全部加在完毕
          currentPage: 1,             //当前页
          pageRows: 20,               //每页显示几条
          popCustomerList: false,     //查询客户显示隐藏
          customerList: [],           //客户信息数组
          workContent: '',            //工作总结
          visitContent: '',           //活动概述
          newlevel: '',               //最新级别
          highlevel: '',              //最高级别
          address: '',                //地址
          accompanyNames : "",            //陪访人
          accompanyIds:"",                //陪访人ID
          accompanyShow:false,            //陪访人选择
          employeeMsg:{},                 //
          xianlu: "",                 //乘车路线
          traffic: "",                //车费合计
          customer: '',               //客户名称
          customerId: '',             //客户ID
          visitDate: '',              //拜访日期
          // salesmanName: this.tempsalesmanName,  //录入人
          // salesmanId: this.tempsalesmanId,      //录入人ID
          salesmanName: '',  //录入人
          salesmanId: '',      //录入人ID
          isCustomer: true,           //是否禁用客户查询
          options2: [],               //软件使用状况数组
          popupVisible: false,        //软件使用状况显示隐藏
          slotsContact: [{            //选择联系人数组
            flex: 1,
            values: [],
            className: 'slotsContact',
            textAlign: 'center',
            defaultIndex: 1,
          }],
          contactPop: false,          //选择联系人显示隐藏
          contact: '',                //联系人名称
          contactId: '',              //联系人id
          //-----------------------------------
          newlevel: '',               //最新级别
          newlevelId: '',             //最新级别ID
          slotsNewlevel: [{           //最新级别数组
            flex: 1,
            values: [],
            className: 'slotsNewlevel',
            textAlign: 'center',
            defaultIndex: 1,
          }],
          showNewlevelPop: false,     //最新级别显示隐藏
          highlevel: '',              //最高级别 
          highlevelId: '',            //最高级别ID 
          slotsHigh: [{               //最高级别数组 
            flex: 1,
            values: [],
            className: 'slotsHigh',
            textAlign: 'center',
            defaultIndex: 1,
          }],
          showHighPop: false,         //最高级别显示隐藏
          HuoDong: '',                //市场活动 
          HuoDongId: '',              //市场活动ID 
          slotsHuoDong: [{            //市场活动数组 
            flex: 1,
            values: [],
            className: 'slotsHuoDong',
            textAlign: 'center',
            defaultIndex: 1,
          }],
          showHuoDongPop: false,      //市场活动显示隐藏 
          title:'',                   //日志类型（文字）  
          showAddContact: false,      //新建联系人显示                    
        }
    },
    props: {
      tempsalesmanName: {
        type: String,
        default: ''
      },
      tempsalesmanId: {
        type: Number,
        default: 0
      },
      tempsalesmanId: {
        type: Number,
        default: 0
      },
      tempsalesmanId: {
        type: Number,
        default: 0
      },
    },
    watch: {
      'visitDate':function(n,o){
        if(n.length < 12 && n.length !=0){
          if( n!= '' || n!= null){
            let timeS = new Date().getTime()-172800000;
            let timeE = new Date().getTime();
            timeS =  new Date(timeS);
            timeE =  new Date(timeE);
            timeS = this.timer(timeS);
            timeE = this.timer(timeE);
            if(n<timeS  || n>timeE){
              MessageBox('提示', '拜访日期，请选择3天内的日期！');
              return
            }
          }
        }
      }
    },
    created:function(){
      this.visitDate = this.timer(new Date()); 
      let _customerName = this.$route.query.customerName;  
      let _customerId = this.$route.query.customerId; 
      if(_customerId != undefined){
        this.customerId = _customerId;
        this.getCustomeDetail();
        this.isCustomer = false;
      } 
    },
    mounted: function() {
      // 如果是地图链接进来的，根据客户id直接显示客户名称
      if (this.$route.query.from && this.$route.query.from == 'map') {
        this.getUser();
      } 
      if (localStorage.userInfo) {
        var userInfo = JSON.parse(localStorage.userInfo);
        this.salesmanName = userInfo.employeeName;
        this.salesmanId = userInfo.employeeId;
      }
      if (this.logType=='2') {
        this.title = '市场日志';
      }else{
        this.title = '销售日志';
      }
    },
    methods: {
      getCustomeDetail(){                   //获取客户详情(客户详情跳转使用)
        if(this.customerId != ''){
          var self = this; 
          axios.post(this.html_url + this.Apilist.selectCustomByParam, { id: this.customerId }).then(function(data) {
            let list = data.data.data;
            self.address = list.fullAdress;
            self.highlevelId = list.highestLevel;
            self.highlevel = list.highestLevelName;
            self.newlevelId = list.latestLevel;
            self.newlevel = list.latestLevelName;
            self.customer = list.cName;
          }).catch(function(e) {});
        }
      },
      timer(type) {                           //时间转换
        let time_html = '';
        let year = type.getFullYear(); 
        let month = type.getMonth() + 1; 
        month < 10 && (month = '0' + month);
        let day = type.getDate();  
        day < 10 && (day = '0' + day);
        let h = type.getHours();
        h < 10 && (h = '0' + h);
        let M = type.getMinutes();
        M < 10 && (M = '0' + M);
        time_html = year + "-" + month+ "-" + day;
        return time_html     
      },
      validateForm: function() { //表单验证
        if (this.salesmanName == '') {
          MessageBox('提示', '你可能从地图点击过来的,暂无录入人,请从首页销售管理进入！');
          return false
        }
        if (this.visitDate == '') {
          MessageBox('提示', '请输入拜访日期！');
          return false
        }
        if(this.visitDate != ''){
          let timeS = new Date().getTime()-172800000;
          let timeE = new Date().getTime();
          timeS =  new Date(timeS);
          timeE =  new Date(timeE);
          timeS = this.timer(timeS);
          timeE = this.timer(timeE);
          if(this.visitDate<timeS  || this.visitDate>timeE){
            MessageBox('提示', '拜访日期，请选择3天内的日期！');
            return false
          }
        }
        if (this.customer == '') {
          MessageBox('提示', '请选择拜访客户！');
          return false
        }
        if (this.answer3.length == 0) {
          MessageBox('提示', '请填写拜访内容“3”');
          return false
        }
        if (this.answer4.length == 0) {
          MessageBox('提示', '请填写拜访内容“4”');
          return false
        }
        if (this.answer5.length == 0) {
          MessageBox('提示', '请填写拜访内容“5”');
          return false
        }
        if (this.answer6.length == 0) {
          MessageBox('提示', '请填写拜访内容“6”');
          return false
        }
        if (this.xianlu.length > 200) {
          MessageBox('提示', '乘车路线输入限制0-200字符');
          return false
        }
        if (this.xianlu =='') {
          MessageBox('提示', '请输入乘车路线！');
          return false
        }
        if (this.contactId == '') {
          MessageBox('提示', '请选择联系人！');
          return false
        }
        var reg = /^([1-9][\d]{0,6})(\.[\d]{2})$/;
        if ( this.traffic != '') {
          if (!reg.test(this.traffic)) {
            MessageBox('提示', '车费合计请输入小数点前1-7位，后保留2位数字');
            return false
          }else{
            return true
          } 
        } else {
          MessageBox('提示', '请输入车费合计');
          return false
        }
        return true
      },
      saveJournal: function() { //保存日志
        var self = this; 
        if (!this.validateForm()) {
          return
        }
        if(this.visitDate.length<12){
          this.visitDate = this.visitDate+" 00:00:00";
        }
        // 验证    
        var param = {
          enclosure: '',
          logType: 1,
          salesmanId: this.salesmanId, //------id
          visitingDate: this.visitDate,
          customId: String(this.customerId),
          fullAdress: this.address,
          accompanyNames : this.accompanyNames,
          accompanyIds:this.accompanyIds, 
          contactsId: this.contactId,
          contactsName: this.contact,
          highestLevel: this.highlevelId,
          latestLevel: this.newlevelId,
          busRoute: this.xianlu,
          totalFare: Number(this.traffic), 
          answer1:this.answer1,
          answer2:this.answer2,
          answer3:this.answer3,
          answer4:this.answer4,
          answer5:this.answer5,
          answer6:this.answer6,
        };
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        axios.post(self.html_url + self.Apilist.insertLog, param).then(function(data) {
          Indicator.close();
          MessageBox.alert('保存成功','提示');
          if(!self.isCustomer){
            self.$router.go(-1);
          }
          self.clearJournal();
        }).catch(function(e) {
          Indicator.close();
        });
      },
      clearJournal(){
        this.salesmanId = 0;                //------id
        this.visitDate = this.timer(new Date()); 
        this.workContent = '';
        this.customerId = '';
        this.customer = '';
        this.address = '';
        this.accompanyNames = '';
        this.accompanyIds = ''; 
        this.contactId = '';
        this.contact = '';
        this.highlevelId = '';
        this.highlevel = '';
        this.newlevelId = '';
        this.newlevel = '';
        this.UseSoft = '';
        this.visitContent = '';
        this.xianlu = '';
        this.traffic = '';
        this.answer1 = "";
        this.answer2 = "";
        this.answer3 = "";
        this.answer4 = "";
        this.answer5 = "";
        this.answer6 = "";
      },
      addContact: function() {                  //添加联系人点击事件
        var self = this;
        if (self.customerId && self.customerId != '') {
          this.showAddContact = true;
        } else {
          MessageBox('提示', '请先选择客户');
        }
      },
      //--------------------------------------------
      showHuoDong: function() {                       //市场活动点击
        var self = this;
        self.slotsHuoDong[0].values = [];
        axios.post(self.html_url + self.Apilist.selectMarketActivityList, {}).then(function(data) {
          var listTemp = data.data.data;
          if (listTemp.length == 0) {
            MessageBox('提示', '暂无选项！');
            return
          }
          for (var i = 0; i < listTemp.length; i++) {
            self.slotsHuoDong[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
          }
          self.showHuoDongPop = true;
        }).catch(function(e) {});
      },
      onValChangeHuoDong: function(picker, values) {  //市场活动选择
        if (values[0] == undefined) {
          return
        }
        this.HuoDong = values[0].name;
        this.HuoDongId = values[0].id;
      },
      showNewlevel: function() {                  //最新级别
        var self = this;
        self.slotsNewlevel[0].values = [];
        axios.post(self.html_url + self.Apilist.selectLatestLevelList, {}).then(function(data) {
          var listTemp = data.data.data;
          if (listTemp.length == 0) {
            MessageBox('提示', '暂无选项！');
            return
          }
          for (var i = 0; i < listTemp.length; i++) {
            self.slotsNewlevel[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
          }
          self.showNewlevelPop = true;
        }).catch(function(e) {});
      },
      onValChangeNewlevel: function(picker, values) {//最新级别选择
        if (values[0] == undefined) {
          return
        }
        this.newlevel = values[0].name;
        this.newlevelId = values[0].id;
      },
      showHigh: function() {                          //最高级别显示
        var self = this;
        self.slotsHigh[0].values = [];
        axios.post(self.html_url + self.Apilist.selectHighestLevelList, {}).then(function(data) {
          var listTemp = data.data.data;
          if (listTemp.length == 0) {
            MessageBox('提示', '暂无选项！');
            return
          }
          for (var i = 0; i < listTemp.length; i++) {
            self.slotsHigh[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
          }
          self.showHighPop = true;
        }).catch(function(e) {});
      },
      onValChangeHigh: function(picker, values) {       //选择最高级别
        if (values[0] == undefined) {
          return
        }
        this.highlevel = values[0].name;
        this.highlevelId = values[0].id;
      },
      closeContactsWidget(){                        //关闭添加联系人
        this.showAddContact = false;
      },
      showContact: function() {                     //联系人信息
        var customerId = this.customerId;
        if (customerId == '') {
          MessageBox('提示', '请先选择拜访客户，才能选联系人！');
          return
        }
        var param = {
          customId: customerId,
          pageRows: 10,
          currenPage: 1,
          pagingRequired: true
        };
        var self = this;
        self.slotsContact[0].values = [];
        axios.post(self.html_url + self.Apilist.selectContactsListPaging, param).then(function(data) {
          var listTemp = data.data.data;
          if (listTemp.length == 0) {
            MessageBox('提示', '暂无联系人,请添加联系人！');
            return
          } else {
            for (var i = 0; i < listTemp.length; i++) {
              self.slotsContact[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
            }
          }
          self.contactPop = true;
        }).catch(function(e) {});
      },
      onValChangeContact: function(picker, values) {//联系人选择
        if (values[0] == undefined) {
          return
        }
        this.contact = values[0].name;
        this.contactId = values[0].id;
      },
      showCustomerPop: function() {                 //客户点击
        if (this.isCustomer) {
          this.popCustomerList = true;
        }
      },
      selectCustomer: function(obj) {               //客户选择
        this.contact = "";
        this.popCustomerList = false;
        this.customer = obj.cName;
        this.customerId = obj.id;
        this.getBaseInfo();
      },
      getBaseInfo: function() {
        var self = this; 
        axios.post(this.html_url + this.Apilist.selectCustomByParam, { id: this.customerId }).then(function(data) {
          let list = data.data.data;
          self.address = list.fullAdress;
          self.highlevelId = list.highestLevel;
          self.highlevel = list.highestLevelName;
          self.newlevelId = list.latestLevel;
          self.newlevel = list.latestLevelName;
        }).catch(function(e) {self.loading = false;});
      },
      dialogEmployeeClick(type){                  //人员选择人
          this.accompanyShow=true;
          let _this = this;
          setTimeout(function() {    
              _this.employeeMsg = {
                  'type':'accompanyId',
              };
          }, 0);
      },
      getEmployee(num,obj){                           //人员选择
          if(num == '1'){
              this.accompanyShow = false;  
          }else{
              this.accompanyShow = false; 
              this.accompanyIds = obj.idStr;
              this.accompanyNames = obj.nameStr; 
          }  
      },
      getUser: function() {                         //手机端
        var self = this;
        if ((self.$route.query.customerId) && (self.$route.query.customerId != '')) {
          self.customerId = self.$route.query.customerId;
          self.getCustomeDetail();
        }
      },
    }
  }
  </script>
  <style>
    .addJournalwidget .mint-field .mint-cell-title {width: 80px;-webkit-box-flex: 0;-ms-flex: none;flex: none;text-align: left!important;color: #5e67fc!important;}
  </style>