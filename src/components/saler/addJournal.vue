  <template id="addJournal">
    <div style="font-size: 14px;" class="addJournalwidget">
      <!-- 市场日志 -->
      <mt-field label="录入人" placeholder="" v-model="salesmanName" disabled>
        <span class="required">*</span>
      </mt-field>
      <mt-field label="拜访日期" placeholder="请输入日期" type="date" v-model="visitDate" class="time-height">
        <span class="required">*</span>
      </mt-field>
      <div style="clear:both"></div>
      <mt-field label="客户" placeholder="请选择客户" v-model="customer" @click.native='showCustomerPop' readonly>
        <span class="required">*</span>
      </mt-field>
      <mt-field label="地址" placeholder="请选择客户" v-model="address" readonly :attr="{maxlength: 200 }">
      </mt-field>
      <div style="position: relative;">
        <mt-field label="联系人" placeholder="请选择联系人" v-model="contact"  @click.native='showContact' style="width:85%;" readonly>
        </mt-field>
        <span class="required" style="margin-right: 20px;position: absolute;top: 2px;right:28px;">*</span>
        <mt-button type="primary" size="small" @click.native.stop="addContact" style='position:absolute;top:5px;right:6px;height:30px;width: 30px;background:#5e67fc;'>
          +
        </mt-button>
      </div>
      <mt-field label="市场活动" placeholder="请选择市场活动" v-model="HuoDong" @click.native='showHuoDong' readonly>
        <span class="required">*</span>
      </mt-field>
      <mt-field label="最高级别" placeholder="请选择最高级别"  v-model="highlevel" @click.native='showHigh' readonly>
      </mt-field>
      <mt-field label="最新级别" placeholder="请选择最新级别"  v-model="newlevel" @click.native='showNewlevel' readonly>
      </mt-field>
      <mt-field label="软件状况" placeholder="请选择软件状况"  v-model="useSoftListValue" @click.native='showUseSoft2' readonly>
      </mt-field>
      <mt-field label="活动概述" placeholder="请输入活动概述" type="textarea" rows="4" v-model="visitContent" :attr="{maxlength: 500 }">
        <span class="required">*</span>
      </mt-field>
      <div style="font-size:14px; text-align:left; color:tan;padding:5px 20px ">
        * 打电话、发邮件等市场行为严禁填入{{title}}，否则当日日志作无效处理！
      </div>
      <mt-popup v-model="popupVisible" position="right" style="width:80%;height:100%;overflow-y:scroll">
        <div class="title-pop">软件状况列表</div>
        <div class='useSoftList'>
          <ul class='popMenu2' style=" padding-left: 0;">
            <mt-checklist class="page-part" title="" :max="3" align="right" v-model="useSoftListValue" :options="options2">
            </mt-checklist>
          </ul>
        </div>
      </mt-popup>
      <mt-popup v-model="popCustomerList" position="right" style="width:80%;height:100%;overflow-y:scroll">
        <seachcustomwidget @selectCustomer="selectCustomer" :popCustomerList="popCustomerList"></seachcustomwidget> 
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
    </div>
  </template>
  <script>
    import { MessageBox } from 'mint-ui';
    import axios from 'axios';
    import { Indicator } from 'mint-ui';
    export default {
      data() {
        return {
        logType: '2',               //日志类型
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
        customer: '',               //客户名称
        customerId: '',             //客户ID
        visitDate: '',              //拜访日期
        salesmanName: this.tempsalesmanName,  //录入人
        salesmanId: this.tempsalesmanId,      //录入人ID
        isCustomer: true,           //是否禁用客户查询
        useSoftListValue: [],       //软件使用状况（选中）
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
      let _customerName = this.$route.query.customerName;  
      let _customerId = this.$route.query.customerId;  
      if(_customerId != undefined){
        this.customer = _customerName;
        this.customerId = _customerId;
        this.getCustomeDetail();
        this.isCustomer = false;
      }
    },
    mounted: function() {
      this.$nextTick(function() {
        this.salesmanName = this.tempsalesmanName;
      });
      if (this.logType=='2') {
        this.title = '市场日志';
      }else{
        this.title = '销售日志';
      }
      this.visitDate = this.timer(new Date());  
    },
    methods: {
      getCustomeDetail(){                   //获取客户详情(客户详情跳转使用)
        if(this.customerId != ''){
          var self = this; 
          axios.post(self.html_url + self.Apilist.selectCustomByParam, { id: self.customerId }).then(function(data) {
            let list = data.data.data;
            self.address = list.fullAdress;
            self.highlevelId = list.highestLevel;
            self.highlevel = list.highestLevelName;
            self.newlevelId = list.latestLevel;
            self.newlevel = list.latestLevelName;
            self.useSoftListValue = list.useSoftName.split(','); 
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
      validateForm: function() {              //市场日志表单验证
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
        if (this.visitContent == '') {
          MessageBox('提示', '请输入活动概述！');
          return false
        }
        if (this.HuoDongId == '') {
          MessageBox('提示', '请选择市场活动！');
          return false
        }
        if (this.visitContent.length < 20 || this.visitContent.length > 500) {
          MessageBox('提示', '活动概述内容20-500字符！');
          return false
        }
        if (this.contactId == '') {
          MessageBox('提示', '请选择联系人！');
          return false
        }
        return true
      },
      saveMarketlog: function() {               //保存日志
        var self = this;
        if (!this.validateForm()) {
          return
        }
        if(this.visitDate.length<12){
          this.visitDate = this.visitDate+" 00:00:00";
        }
        var param = {
          enclosure: '',
          salesmanId: this.salesmanId,                  //------id
          visitingDate: this.visitDate,
          jobSummary: this.workContent,
          customId: String(this.customerId),
          fullAdress: this.address,
          contactsId: this.contactId,
          contactsName: this.contact,
          highestLevel: this.highlevelId,
          latestLevel: this.newlevelId,
          marketActivityId: this.HuoDongId,             //销售活动
          softwareStatus: this.UseSoft,
          visitingContent: this.visitContent,
          softwareStatusName : this.useSoftListValue.join(','),
          logType: 2
        };
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        axios.post(self.html_url + self.Apilist.insertLog, param).then(function(data) {
          Indicator.close();
          MessageBox.alert('保存市场日志成功','提示');
          self.clearJournal();
          if(!self.isCustomer){
            self.$router.go(-1);
          }
        }).catch(function(e) {
          Indicator.close();
        });
      },
      clearJournal() {                    //日志重置
        this.salesmanId = '';             //------id
        this.visitDate = this.timer(new Date()); 
        this.workContent = '';
        this.customerId = '';
        this.customer = '';
        this.address = '';
        this.contactId = '';
        this.contact = '';
        this.highlevelId = '';
        this.highlevel = '';
        this.newlevelId = '';
        this.newlevel = '';
        this.visitContent = '';
        this.useSoftListValue = [];
        this.HuoDong = '';
        this.HuoDongId = "";
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
      showUseSoft2: function() {                  //软件情况
        var self = this;
        self.options2 = [];
        axios.post(self.html_url + self.Apilist.selectUseSoftList, {}).then(function(data) {
          var listTemp = data.data.data;
          if (listTemp.length == 0) {
            MessageBox('提示', '暂无选项！');
            return
          }
          for (var i = 0; i < listTemp.length; i++) {
            self.options2.push({ label: listTemp[i].name, value: listTemp[i].name, id: listTemp[i].id, });
          }
          self.popupVisible = true;
        }).catch(function(e) {});
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
          if(list.useSoftName == ''){
            self.useSoftListValue = [];
          }else{
            self.useSoftListValue = list.useSoftName != null ? list.useSoftName.split(',') : []; 
          }
        }).catch(function(e) {self.loading = false;});
      },
    }
  }
</script>