<template>
  <div class="pageBox">
    <mt-header title="管理范围" fixed style="z-index: 1000;">
      <mt-button icon="back" slot="left" @click.native="back"> 取消 </mt-button>
      <mt-button slot="right" @click.native="setFanwei" :disabled='setFanweibtn'> 保存 </mt-button>
    </mt-header>
    <div style="padding-top:40px;">
      <mt-radio align="right" class="page-part" title="" v-model="leibieVal" :options="leibieOptions" />
    </div>
    <div v-if="showTree">
      <div style="clear:both; height:40px; background:#efefef; line-height:40px">
        自定义选择列表
      </div>
      <el-tree
        :data="treeData"
        show-checkbox
        empty-text="加载中..."
        node-key="id"
        ref="mana"
        :props="defaultProps"
        >
      </el-tree>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import axios from 'axios';
import { Toast } from 'mint-ui';
export default {
  data() {
    return {
      setFanweibtn:false,           //保存按钮禁用
      hasSave:false,                //判断来源
      leibieVal: 'noselect',        //类别
      leibieOptions: [{
          label: '无',
          value: 'noselect',
        },
        {
          label: '全办事处',
          value: 'allBanShiChu'
        },
        {
          label: '部门内',
          value: 'buMenNei'
        },
        {
          label: '自定义',
          value: 'ziDingyi'
        },
        {
          label: '大区经理',
          value: 'daQujingli'
        }
      ],                            //
      value: '',                    //
      treeData: [],                 //
      selectedArray: [],            //
      tempArr: [],                  //
      hasManageRoleStr: [],         //
      showTree: false,              //显示树形结构
      employeeId:"",                //员工id
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  created:function(){
    this.employeeId = this.$route.query.id;         
  },
  mounted: function() {
    this.getTree();
    this.getDetailEmployee();
  },
  watch: {
    leibieVal: {
      handler(curVal, oldVal) {
        this.changeVal(curVal);
        this.hasSave = false;
      },
      deep: true
    },　　　　　
  },
  components: {
  },
  computed: {
  },
  methods: {
    changeVal: function(curVal) {
      switch (curVal) {
        case 'noselect':
          this.showTree = false;
          break;
        case 'allBanShiChu':
          this.showTree = false;
          break;
        case 'buMenNei':
          this.showTree = false;
          break;
        case 'daQujingli':
          this.showTree = true;
          break;
        case 'ziDingyi':
          this.showTree = true;
          break;
      }
    },
    getTree: function() {
      var self = this;
      var userInfo = JSON.parse(localStorage.userInfo);
      var salesmanId = userInfo.employeeId;
      var param = {
        id: self.salesmanId
      };
      axios.post(self.html_url + self.Apilist.selectDepartmentTree, param).then(function(data) {
        self.treeData = data.data.data.data;
        if(data.data.data.manageRoleStr == null){
          me.$refs.mana.setCheckedKeys([]);
        }else{
          let arr = data.data.data.areaRoleStr.split(",");
          setTimeout(function() {
            me.$refs.mana.setCheckedKeys(arr);
          }, 200);
        }
      }).catch(function(e) {});
    },
    setFanwei: function() { // 保存设置
      var param = {};
      var self = this;
      self.setFanweibtn = true;
      var salesmanId = self.$route.query.id;
      let manaArr = this.$refs.mana.getCheckedNodes();
      var manageRoleStr = JSON.stringify(this.preHandleData(manaArr));
      var param = {};
      param = {
        id: salesmanId,
        manageRoleStr: JSON.stringify(this.preHandleData(manaArr)),
        manageFlag: 5
      };
      switch (this.leibieVal) {
        case 'noselect':
          param = {
            id: salesmanId,
            manageRoleStr: '',
            manageFlag: 1
          };
          break;
        case 'allBanShiChu':
          param = {
            id: salesmanId,
            manageRoleStr: '',
            manageFlag: 2
          };
          break;
        case 'buMenNei':
          param = {
            id: salesmanId,
            manageRoleStr: '',
            manageFlag: 3
          };
          break;
        case 'daQujingli':
          param = {
            id: salesmanId,
            manageRoleStr: JSON.stringify(this.preHandleData(manaArr)),
            manageFlag: 5
          };
          break;
        case 'ziDingyi':
          param = {
            id: salesmanId,
            manageRoleStr: JSON.stringify(this.preHandleData(manaArr)),
            manageFlag: 4
          };
          break;
      };
      axios.post(self.html_url + self.Apilist.saveManageRole, param).then(function(data) {
        Toast({
          message: '设置成功',
        });
        self.hasSave = true;
        self.setFanweibtn = false;
      }).catch(function(e) {});
    },
    preHandleData(treedata){    //处理数据
      var result =[];
      for(var i=0;i<treedata.length;i++){
        var td = treedata[i];
        if(td.type == 0){  
          td.children = [];
          result.push(td);
        }
        else if(td.type == 2){
          if(this.canAddTreeData(result,td,0)){
            td.children = [];
            result.push(td);
          }
        }
        else{
          if(this.canAddTreeData(result,td,2)){
            td.children = [];
            result.push(td);
          }
        }
      }
      return result;
    },
    canAddTreeData(result,val,type){ 
      for(var i=0;i<result.length;i++){
        if(result[i].type == type){
          var children = result[i].children;
          if(!this.canAdd(children,val)){
            return false;
          }
        }
      }
      return true;
    },
    canAdd(source,val){
      for(var i=0;i<source.length;i++){
        if(source[i].id == val.id){
          return false;
        }
      }
      return true;
    },
    back: function() {
      if (this.hasSave) {
        this.$router.go(-1);
        return
      }
      MessageBox.confirm('离开此页编辑内容将无效?').then(action => { 
        this.$router.go(-1);
      }, () => {});
    },
    getDetailEmployee(){            //个人资料详情
      if(this.employeeId != ""){
        let me = this;
        var param = {
            "id":this.employeeId
        };
        axios.post(this.html_url +this.Apilist.detailEmployee, param).then(function(data) {
          if(data.data.data.manageFlag == 1){
            me.leibieVal = 'noselect';
          }else if(data.data.data.manageFlag == 2){
            me.leibieVal = 'allBanShiChu';
          }else if(data.data.data.manageFlag == 3){
            me.leibieVal = 'buMenNei';
          }else if(data.data.data.manageFlag == 4){
            me.leibieVal = 'daQujingli';
          }else if(data.data.data.manageFlag == 5){
            me.leibieVal = 'ziDingyi';
          }
        }).catch(function(e) {
          me.loading = false;
        });
      }
    },
  }
}
</script>
<style>
  .el-tree .el-tree-node {text-align: left;}
</style>