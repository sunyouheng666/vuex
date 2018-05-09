<template>
  <div class="pageBox">
    <mt-header title="区域选择" fixed style="z-index: 1000;">
      <mt-button icon="back" slot="left" @click.native="back"> 取消 </mt-button>
      <mt-button slot="right" @click.native="setFanwei" :disabled='setFanweibtn'> 保存 </mt-button>
    </mt-header>
    <div style="margin-top: 40px;">
      <el-tree
        :data="regionData"
        show-checkbox
        empty-text="加载中..."
        :load="loadNode"
        lazy
        node-key="id"
        ref="region"
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
      setFanweibtn:false,
      hasSave:false,
      value: '',
      treeData: {},
      customerFanwei: [],
      selectedArray: [],
      tempArr: [],
      hasManageRoleStr: [],
      showTree: false,
      employeeId:"",                //员工id
      // areaRoleStr:'',
      regionData:[],          //区域选择
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
    // this.getDetailEmployee();
    this.selectProvinceCityAreaTree();
  },
  watch: {
  　　　　　
  },
  components: {

  },
  computed: {

  },
  methods: {
    selectProvinceCityAreaTree(){       //城市树形结构
        let me = this;
        this.regionData = [];
        var param = {
          id:this.employeeId
        };
        axios.post(this.html_url +this.Apilist.selectProvinceCityAreaTree, param).then(function(data) {
            me.regionData = data.data.data.data;
            if(data.data.data.areaRoleStr == null){
              me.$refs.region.setCheckedKeys([]);
            }else{
              let arr = data.data.data.areaRoleStr.split(",");
              setTimeout(function() {
                me.$refs.region.setCheckedKeys(arr);
              }, 200);
            }
        }).catch(function(e) {});
    },
    loadNode(node, resolve) {
        if (node.level === 0) {
          return resolve([{'name': '安徽省'}, 
            {'name': '澳门特别行政区'},
            {'name': '北京市'}, 
            {'name': '福建省'}, 
            {'name': '甘肃省'}, 
            {'name': "广东省"}, 
            {'name': "广西壮族自治区"}, 
            {'name': "贵州省"}, 
            {'name': "海南省"}, 
            {'name': "河北省"}, 
            {'name': "河南省"}, 
            {'name': "黑龙江省"}, 
            {'name': "湖北省"}, 
            {'name': "湖南省"}, 
            {'name': "吉林省"}, 
            {'name': "江苏省"}, 
            {'name': "江西省"}, 
            {'name': "辽宁省"}, 
            {'name': "内蒙古自治区"},
            {'name': "宁夏回族自治区"}, 
            {'name': "青海省"}, 
            {'name': "山东省"}, 
            {'name': "山西省"}, 
            {'name': "陕西省"}, 
            {'name': "上海市"}, 
            {'name': "四川省"}, 
            {'name': "台湾省"}, 
            {'name': "天津市"}, 
            {'name': "西藏自治区"}, 
            {'name': "香港特别行政区"}, 
            {'name': "新疆维吾尔自治区"}, 
            {'name': "云南省"}, 
            {'name': "浙江省"}, 
            {'name': "重庆市"}
            ]);
        }
        if (node.level > 2) return resolve([]);
        var hasChild = true;
        setTimeout(() => {
          var data;
          if (hasChild) {
            data = node.data.children
          } else {
            data = [];
          }
          resolve(data);
        }, 500);
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
    setFanwei: function() {                         // 保存区域设置
      var self = this;
      self.setFanweibtn = true;
      var salesmanId = self.$route.query.id;
      var str = this.$refs.region.getCheckedKeys().join(',');
      var param = {};
      param = {
        id: salesmanId,
        areaRoleStr : str
      };
      axios.post(self.html_url + self.Apilist.saveAreaRole, param).then(function(data) {
        Toast({
          message: '设置成功',
        });
        self.hasSave = true;
        self.setFanweibtn = false;
      }).catch(function(e) {});
    }
  }
}

</script>
<style>
#tree ul li {
  line-height: 40px;
  text-align: left;
  list-style: none;
  list-style-type: none;
  padding: 0px;
  border-top: 2px solid #2a67a4;
}

#tree ul li ul li {
  border-top: 2px solid #66a0da;
}

#tree ul li ul li ul li {
  border-top: 2px solid #c1defc;
}

#tree ul {
  line-height: 30px;
  text-align: left;
  list-style: none;
  list-style-type: none;
  padding: 0px 0 0 10px;
}
.el-icon-caret-right:before{content: ''!important;}
.el-tree .el-tree-node {text-align: left;}
</style>
<style scoped>
ul {
  padding: 0px;
  padding-left: 10px;
  list-style: none;
  list-style-type: none;
}
ul li {padding: 0px;padding-left: 5px;list-style: none}
#tree li { line-height: 30px;text-align: left;list-style: none;list-style-type: none;}
.item {}
.bold {background: #ccd0d4}
</style>
