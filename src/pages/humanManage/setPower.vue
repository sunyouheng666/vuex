<template>
  <div class="pageBox">
    <mt-header title="功能权限" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
      <mt-button slot="right" @click.native="setPower"> 保存 </mt-button>
    </mt-header>
    <div style="padding-top:40px;">
      <div :class="tabMenu1" @click="handleClick1">
        <mt-button size='small' @click="clickCheck1" :class='activebtn1'></mt-button>
        <span>邮件管理</span>
      </div>
      <div :class="tabMenu2" @click="handleClick2">
        <mt-button size='small' @click='clickCheck2' :class='activebtn2'></mt-button>
        <span>客户管理</span>
      </div>
      <div :class="tabMenu3" @click="handleClick3">
        <mt-button size='small' @click='clickCheck3' :class='activebtn3'></mt-button>
        <span>销售管理</span>
      </div>
      <div :class="tabMenu4" @click="handleClick4">
        <mt-button size='small' @click='clickCheck4' :class='activebtn4'></mt-button>
        <span>工程管理</span>
      </div>
      <div :class="tabMenu5" @click="handleClick5">
        <mt-button size='small' @click='clickCheck5' :class='activebtn5'></mt-button>
        <span>合同管理</span>
      </div>
      <div :class="tabMenu6" @click="handleClick6">
        <mt-button size='small' @click='clickCheck6' :class='activebtn6'></mt-button>
        <span>试用审批</span>
      </div>
      <div :class="tabMenu7" @click="handleClick7">
        <mt-button size='small' @click='clickCheck7' :class='activebtn7'></mt-button>
        <span>数据统计</span>
      </div>
      <div :class="tabMenu8" @click="handleClick8">
        <mt-button size='small' @click='clickCheck8' :class='activebtn8'></mt-button>
        <span>系统设置</span>
      </div>
      <div style="clear:both"></div>
      <mt-tab-container v-model="selectedModule" value="tab-container1" swipeable style='margin-top:10px'>
        <mt-tab-container-item id="tab-container1">
          <div class="powerList">
            <mt-checklist align="left" title="邮件管理-功能项" v-model="fnList1" :options="Menu_mail" style="text-align:left">
            </mt-checklist>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container2">
          <div class="powerList">
            <mt-checklist align="left" title="客户管理-功能项" v-model="fnList2" :options="Menu_customer" style="text-align:left">
            </mt-checklist>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
          <div class="powerList">
            <mt-checklist align="left" title="销售管理-功能项" v-model="fnList3" :options="Menu_sale" style="text-align:left">
            </mt-checklist>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container4">
          <div class="powerList">
            <mt-checklist align="left" title="工程管理-功能项" v-model="fnList4" :options="Menu_engineering" style="text-align:left">
            </mt-checklist>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container5">
          <div class="powerList">
            <mt-checklist align="left" title="合同管理-功能项" v-model="fnList5" :options="Menu_contract" style="text-align:left">
            </mt-checklist>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container6">
          <div class="powerList">
            <mt-checklist align="left" title="试用审批-功能项" v-model="fnList6" :options="Menu_Ontrial" style="text-align:left">
            </mt-checklist>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container7">
          <div class="powerList">
            <mt-checklist align="left" title="数据统计-功能项" v-model="fnList7" :options="Menu_tongji" style="text-align:left">
            </mt-checklist>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container8">
          <div class="powerList">
            <mt-checklist align="left" title="系统设置-功能项" v-model="fnList8" :options="Menu_system" style="text-align:left">
            </mt-checklist>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
import { MessageBox } from 'mint-ui';
export default {
  data() {
    return {
      hasSave:false,
      tabMenu1: 'tabMenu_active',
      tabMenu2: 'tabMenu',
      tabMenu3: 'tabMenu',
      tabMenu4: 'tabMenu',
      tabMenu5: 'tabMenu',
      tabMenu6: 'tabMenu',
      tabMenu7: 'tabMenu',
      tabMenu8: 'tabMenu',
      swiper: true,
      activebtn1: 'noActivebg',
      activebtn2: 'noActivebg',
      activebtn3: 'noActivebg',
      activebtn4: 'noActivebg',
      activebtn5: 'noActivebg',
      activebtn6: 'noActivebg',
      activebtn7: 'noActivebg',
      activebtn8: 'noActivebg',
      //列表数组
      MenuTree: [],
      Menu_mail: [],
      Menu_customer: [],
      Menu_sale: [],
      Menu_engineering: [],
      Menu_contract: [],
      Menu_Ontrial: [],
      Menu_tongji: [],
      Menu_system: [],
      //
      selectedModule: 'tab-container1',
      fnList1: [],
      fnList2: [],
      fnList3: [],
      fnList4: [],
      fnList5: [],
      fnList6: [],
      fnList7: [],
      fnList8: [],
      //
      fnStr1: '',
      fnStr2: '',
      fnStr3: '',
      fnStr4: '',
      fnStr5: '',
      fnStr6: '',
      fnStr7: '',
      fnStr8: '',
      //
      fnMenuId1: '',
      fnMenuId2: '',
      fnMenuId3: '',
      fnMenuId4: '',
      fnMenuId5: '',
      fnMenuId6: '',
      fnMenuId7: '',
      fnMenuId8: '',
    }
  },
  mounted: function() {
    this.getMenu();
  },
  components: {
  },
  watch: {
    fnList1: {
      handler(curVal, oldVal) {
        this.changeVal(curVal, 1);
        this.hasSave = false;
      },
      deep: true
    },
    　
    fnList2: {
      handler(curVal, oldVal) {
        this.changeVal(curVal, 2);
        this.hasSave = false;
      },
      deep: true
    },　
    fnList3: {
      handler(curVal, oldVal) {
        this.changeVal(curVal, 3);
        this.hasSave = false;
      },
      deep: true
    },
    　
    fnList4: {
      handler(curVal, oldVal) {
        this.changeVal(curVal, 4);
        this.hasSave = false;
      },
      deep: true
    },
    fnList5: {
      handler(curVal, oldVal) {
        this.changeVal(curVal, 5);
        this.hasSave = false;
      },
      deep: true
    },
    fnList6: {
      handler(curVal, oldVal) {
        this.changeVal(curVal, 6);
        this.hasSave = false;
      },
      deep: true
    }, 
    fnList7: {
      handler(curVal, oldVal) {
        this.changeVal(curVal, 7);
        this.hasSave = false;
      },
      deep: true
    }, 
    fnList8: {
      handler(curVal, oldVal) {
        this.changeVal(curVal, 8);
        this.hasSave = false;
      },
      deep: true
    },  　　　　　
  },
  methods: {
    changeVal: function(curVal, index) {
      if (curVal.length == 0) {
        this['activebtn' + index] = 'noActivebg';
        this["fnstr" + index] = '';
      } else if (curVal.length > 0) {
        this['activebtn' + index] = 'activebg';
        this["fnstr" + index] = this['fnMenuId' + index] + ',' + curVal.join(",");
      }
    },
    setPower: function() { 
      var self = this;
      var powerlist = '';
      var menuArray = [];
      if (this.fnstr1 != undefined) {
        menuArray = menuArray.concat(self.fnstr1.split(','));
      }
      if (this.fnstr2 != undefined) {
        menuArray = menuArray.concat(self.fnstr2.split(','));
      }
      if (this.fnstr3 != undefined) {
        menuArray = menuArray.concat(self.fnstr3.split(','));
      }
      if (this.fnstr4 != undefined) {
        menuArray = menuArray.concat(self.fnstr4.split(','));
      }
      if (this.fnstr5 != undefined) {
        menuArray = menuArray.concat(self.fnstr5.split(','));
      }
      if (this.fnstr6 != undefined) {
        menuArray = menuArray.concat(self.fnstr6.split(','));
      }
      if (this.fnstr7 != undefined) {
        menuArray = menuArray.concat(self.fnstr7.split(','));
      }
      if (this.fnstr8 != undefined) {
        menuArray = menuArray.concat(self.fnstr8.split(','));
      }
      for (var i = 0; i < menuArray.length; i++) {
        if (menuArray[i] == '') {
          menuArray.splice(i, 1);
          i = i - 1;
        }
      }
      powerlist = menuArray.join(',')
      if (powerlist == '') {
        MessageBox('提示', '选择的权限不能为空！');
        return
      }
      var param = {
        id: self.$route.query.id,
        menuRoleStr: powerlist
      };
      axios.post(self.html_url + self.Apilist.saveMenuRole, param).then(function(data) {
        if (data.data.success) {
          MessageBox('提示', '权限保存成功！');
        }
        self.hasSave = true; 
      }).catch(function(e) { 
      });
    },
    showAndSet: function(temp, tempIndex, menuOption, hasSelected) {
      var self = this;
      var menuArray = temp[tempIndex].children;
      var num = tempIndex + 1;
      self["fnMenuId" + num] = temp[tempIndex].id;
      for (var i = 0; i < menuArray.length; i++) {
        menuOption.push({ value: menuArray[i].id, label: menuArray[i].label });
      }
      // 显示上次设置的情况
      if (hasSelected.length > 0) {
        for (var i = 0; i < menuOption.length; i++) {
          for (var j = 0; j < hasSelected.length; j++) {
            if (hasSelected[j] == menuOption[i].value) {
              self["fnList" + num].push(hasSelected[j]);
            }
          }
        }
      }
    },
    getMenu: function() {
      var self = this;
      axios.post(self.html_url + self.Apilist.selectMenuTree, { id: self.$route.query.id }).then(function(data) {
        var resData = data.data.data;
        var hasSelected = null;
        var temp = resData.data;

        if (resData.menuRoleStr != null) {
          hasSelected = resData.menuRoleStr.split(",");
        } else {
          hasSelected = [{}];
        }
        //获取已经设置的数据  
        self.showAndSet(temp, 0, self.Menu_mail, hasSelected);
        self.showAndSet(temp, 1, self.Menu_customer, hasSelected);
        self.showAndSet(temp, 2, self.Menu_sale, hasSelected);
        self.showAndSet(temp, 3, self.Menu_engineering, hasSelected);
        self.showAndSet(temp, 4, self.Menu_contract, hasSelected);
        self.showAndSet(temp, 5, self.Menu_Ontrial, hasSelected);
        self.showAndSet(temp, 6, self.Menu_tongji, hasSelected);
        self.showAndSet(temp, 7, self.Menu_system, hasSelected);
      }).catch(function(e) {});
    },
    tabChange: function(index) { //---------------------tab切换
      for (var i = 1; i < 6; i++) {
        if (i == index) {
          this['tabMenu' + i] = 'tabMenu_active';
        } else {
          this['tabMenu' + i] = 'tabMenu';
        }
      }
      this.selectedModule = 'tab-container' + index;
    },
    handleClick1: function() {
      this.tabChange(1);
    },
    handleClick2: function() {
      this.tabChange(2);
    },
    handleClick3: function() {
      this.tabChange(3);
    },
    handleClick4: function() {
      this.tabChange(4);
    },
    handleClick5: function() {
      this.tabChange(5);
    },
    handleClick6: function() {
      this.tabChange(6);
    },
    handleClick7: function() {
      this.tabChange(7);
    },
    handleClick8: function() {
      this.tabChange(8);
    },
    //----------------------------------------------------------
    CheckboxClick: function(index, modulList) {
      var self = this;
      self.selectedModule = 'tab-container' + index; //转到tab页 然后 checkbox 全部选中； 
      if (self["activebtn" + index] == 'activebg') {
        self["activebtn" + index] = 'noActivebg';
        self["fnList" + index] = [];
      } else if (self["activebtn" + index] == 'noActivebg') {
        self["activebtn" + index] = 'activebg';
        // self["fnList" + index].push(self["fnMenuId" + index]);
        for (var i = 0; i < modulList.length; i++) {
          self["fnList" + index].push(modulList[i].value);
        }
      }
    },
    clickCheck1: function() {
      this.CheckboxClick(1, this.Menu_mail);
    },
    clickCheck2: function() {
      this.CheckboxClick(2, this.Menu_customer);
    },
    clickCheck3: function() {
      this.CheckboxClick(3, this.Menu_sale);
    },
    clickCheck4: function() {
      this.CheckboxClick(4, this.Menu_engineering);
    },
    clickCheck5: function() {
      this.CheckboxClick(5, this.Menu_contract);
    },
    clickCheck6: function() { 
      this.CheckboxClick(6, this.Menu_Ontrial);
    },
    clickCheck7: function() {
      this.CheckboxClick(7, this.Menu_tongji);
    },
    clickCheck8: function() {
      this.CheckboxClick(8, this.Menu_system);
    },
    back: function() {
      let shenQing = this.$route.query.shenQing;
      if(shenQing == '21'){
        this.$router.push({path: '/humanManage',query: {canShenHe: true,canQuanxian: true,shenQing: '21'}});
        return
      }
      if (this.hasSave) {
        this.$router.go(-1);
        return
      }
      MessageBox.confirm('离开此页编辑内容将无效?').then(action => {
        this.$router.go(-1);
      }, () => {
        // 取消
      });
    },
  }
}
</script>
<style>
.tabMenu {
  width: 30%;
  background: #efefef;
  line-height: 30px;
  height: 30px;
  padding-top: 3px;
  float: left;
  margin-left: 6px;
  font-size: 14px;
  margin-bottom: 5px;
}

.tabMenu_active {
  width: 30%;
  background: #e1d9b4;
  border-bottom: 2px solid #5e67fc;
  line-height: 30px;
  height: 30px;
  padding-top: 3px;
  float: left;
  margin-left: 6px;
  font-size: 14px;
  margin-bottom: 3px;
}

.activebg {
  color: #fff;
  width: 15px;
  height: 15px;
  padding: 0px;
  background: url(../../../static/image/selected.png) 0px center no-repeat;
  display: inline-block;
}

.noActivebg {
  width: 15px;
  height: 15px;
  padding: 0px;
  border: 1px solid gray;
  display: inline-block;
}
.mint-tab-item-label {
  font-size: 13px!important;
}

.checkStyle {
  text-align: left;
  width: 30%;
  float: left;
  font-size: 12px!important;
  margin-top: 0px;
  margin-bottom: 0px;
}

</style>
<style scoped>
.mint-checkbox-label {
  font-size: 13px;
}

.mint-checklist-title {
  display: block;
  font-size: 12px;
}

.mint-cell {
  background: #f8f4e5!important
}

.mint-cell-wrapper {
  background-image: -webkit-linear-gradient(top, #fff, #fff 50%, transparent 50%)!important;
  background-image: linear-gradient(180deg, #fff, #fff 50%, transparent 50%)!important;
}

.mint-checklist-label {
  padding: 0px;
}

.mint-cell-wrapper {
  padding: 0px;
}

.mint-checkbox-label {
  font-size: 13px;
}
</style>
