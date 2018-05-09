<template>
    <div class="products" v-show="dialogEmployee">
        <div class="products-bj"></div>
        <div class="products-box">
            <div class="products-box-header">
                选择陪访人:
            </div>
            <div class="products-box-body"> 
                <el-tree
                    accordion
                    :data="employeeList"
                    show-checkbox
                    default-expand-all
                    node-key="id"
                    ref="employee"
                    :default-expanded-keys="[]"
                    :default-checked-keys="[]"
                    :props="defaultProps"
                    @check-change="checkChangeTree">
                </el-tree>
            </div>
            <div class="products-box-footer">
                <span class="cust-btn" style="background:#5e67fc;" @click="saveDepartment">确定</span>
                <span class="cust-btn" style="background:#5e67fc;" @click="escDepartment">取消</span>
                <span class="cust-btn" style="background:#5e67fc;" @click="clearDepartment">清空</span>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios';
    export default {
        data() {
            return {          
                dialogEmployee:false,               //显示与隐藏
                employeeType:'',                    //返回类型
                employeeList:[],                    //人员数组
                defaultProps: {                     //树形结构数据
                    children: 'children',
                    label: 'label'
                },
                idStr:'',                           //选中id
                nameStr:'',                         //选中名字
                idArr:[],                           //选中id数组
                nameArr:[],                         //选中名字数组
            }
        },
        props: [
            'employeeMsg'   
        ],
        created:function(){
        },
        watch: {
            'employeeMsg':function(val){
                this.dialogEmployee = true;
                this.employeeType = val.type;
                if(val.type == 'accompanyId'){
                    this.selectAccompayTree();
                }
            }
        },
        components: {
        },
        mounted: function() {
            this.getEmployeeList();
        },
        computed: {
        },
        methods: {
            getEmployeeList(){                  //获取员工通讯录
                let me = this;
                let param = {};
                axios.post(this.html_url + this.Apilist.selectEmployeeTreeByManage, param).then(function(data) {
                    me.employeeList = data.data.data.data;
                }).catch(function(e) {});
            },
            selectAccompayTree(){                  //获取员工通讯录
                let me = this;
                let param = {};
                axios.post(this.html_url + this.Apilist.selectAccompayTree, param).then(function(data) {
                    me.employeeList = data.data.data.data;
                }).catch(function(e) {});
            },
            saveDepartment(){                   //确定选择
                this.idStr = this.idArr.join(",");
                this.nameStr = this.nameArr.join(",");
                let obj={};
                obj = {
                    'type' : this.employeeType,
                    'idStr' : this.idStr,
                    'nameStr' : this.nameStr
                };
                this.$emit("getEmployee",'2',obj);
                this.dialogEmployee = false;
                this.clearDepartment();
            },
            checkChangeTree(data,type){         //选择人员
                if(data.type == 3){
                    if(type){
                        this.idArr.push(data.id);
                        this.nameArr.push(data.label);
                    }else{
                        for(let i=0;i<this.idArr.length;i++){
                            if(data.id == this.idArr[i]){
                                this.idArr.splice(i, 1);
                                this.nameArr.splice(i, 1);
                            }
                        }
                    }
                }
            },
            escDepartment(){                    //主营产品取消选择
                this.dialogEmployee = false;
                this.$emit("getEmployee",'1');
                this.clearDepartment();
            },
            clearDepartment(){                  //清空选择
                this.$refs.employee.setCheckedKeys([]);
            }
        }
    }
</script>
<style scoped>
    .products{position: fixed;top:0;left: 0;z-index: 1001;width: 100%; min-height: 1200px;}
    .products div{box-sizing:border-box;}
    .products .products-bj{position: fixed;top:0;left: 0;background:#000;opacity: 0.3; min-height: 1200px;width: 100%;}
    .products-box{width: 100%;height:auto;  position: relative;  margin:6% auto; z-index: 1000; background:#fff;color: #000000;line-height: 1.5em;}
    .products-box-header{font-weight: 900;font-size: 18px;width: 100%;height:40px;line-height: 40px;color:#333;padding-left: 10px;text-align: left;}
    .products-box-body{width: 96%;height: 325px;border: 1px solid #999;overflow-y:auto;margin:auto;}
    .products-box-footer{width: 100%;height: 40px;padding-top: 5px;  line-height: 30px;color: #000000;font-weight: 400; box-sizing: border-box;}
    .products-box-footer .cust-btn,.products-box-body .cust-btn{display: block; width: 60px;height:28px; line-height: 28px;text-align: center; color: #ffffff;cursor: pointer;background: #008cee;border-radius: 4px;float: right;margin-top: 0px;margin-right: 10px;font-size: 14px;}
    .email-close{display: block;float: right;font-size: 14px;margin-top:7px;color: #999; width: 24px;height: 24px;text-align: center;line-height: 26px;border-radius: 50%;border:1px solid #999;margin-right:10px;}
    .email-close:hover{border:1px solid #20a0ff; color: #fff;background: #20a0ff;cursor: pointer;}
</style>
<style>
    .products .el-tree{text-align: left;border:none;}
</style>

