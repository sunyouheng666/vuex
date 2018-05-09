import Vue from 'vue'
import Router from 'vue-router'
import { Toast } from 'mint-ui'
Vue.use(Router)
var route = new Router({
    mode: 'history',     //去除“#”
    routes: [
        {
            path: '/',
            redirect: '/Login'
        },
        {
            path: '/Login',
            component: resolve => require(['../pages/Login.vue'], resolve)
        }, 
        {
            path: '/home',
            component: resolve => require(['../pages/home.vue'], resolve)
        }, 
        {
            path: '/test',
            component: resolve => require(['../pages/test.vue'], resolve)
        }, 
        {
            path: '/message',
            component: resolve => require(['../pages/message.vue'], resolve)
        },
        {
            path: '/searchfeedBackResult',
            component: resolve => require(['../pages/saler/searchfeedBackResult.vue'], resolve)
        }, 
        {
            path: '/searchMarketCustomer',
            component: resolve => require(['../pages/saler/searchMarketCustomer.vue'], resolve)
        }, 
        {
            path: '/addJournalwidget',        //测试路由
            component: resolve => require(['../components/saler/addJournalwidget.vue'], resolve)
        },
        {
            path: '/mailbox',
            component: resolve => require(['../pages/email/mailbox.vue'], resolve)
        },
        {
            path: '/searchMail',
            component: resolve => require(['../pages/email/searchMail.vue'], resolve)
        },
        {
            path: '/mailEdit',
            component: resolve => require(['../pages/email/mailEdit.vue'], resolve)
        },
        {
            path: '/mailDetail',
            component: resolve => require(['../pages/email/mailDetail.vue'], resolve)
        },
        {
            path: '/mailForward',
            component: resolve => require(['../pages/email/mailForward.vue'], resolve)
        }, 
        {
            path: '/mailReply',
            component: resolve => require(['../pages/email/mailReply.vue'], resolve)
        }, 
         //--发件箱 草稿箱 垃圾箱 归并箱-------------------------------------------------------------------------------------------
        {
            path: '/sendbox',
            component: resolve => require(['../pages/email/sendbox.vue'], resolve)
        }, 
        {
            path: '/draftbox',
            component: resolve => require(['../pages/email/draftbox.vue'], resolve)
        },
        {
            path: '/dustbinbox',
            component: resolve => require(['../pages/email/dustbinbox.vue'], resolve)
        },
        {
            path: '/gb_customer',
            component: resolve => require(['../pages/email/gb_customer.vue'], resolve)
        },
        {
            path: '/gb_hezuo',
            component: resolve => require(['../pages/email/gb_hezuo.vue'], resolve)
        },
        {
            path: '/gb_baoliu',
            component: resolve => require(['../pages/email/gb_baoliu.vue'], resolve)
        },
        {
            path: '/gb_gongkai',
            component: resolve => require(['../pages/email/gb_gongkai.vue'], resolve)
        },
        {
            path: '/gb_remen',
            component: resolve => require(['../pages/email/gb_baoliu.vue'], resolve)
        },
        {
            path: '/gb_shichang',
            component: resolve => require(['../pages/email/gb_shichang.vue'], resolve)
        },
        {
            path: '/gb_qianzai',
            component: resolve => require(['../pages/email/gb_shichang.vue'], resolve)
        },
        {
            path: '/gb_maillistbox',
            component: resolve => require(['../pages/email/gb_maillistbox.vue'], resolve)
        },
        
         //--发件箱 草稿箱 垃圾箱 归并箱-------------------------------------------------------------------------------------------
        {
            path: '/saleJournal',
            component: resolve => require(['../pages/saler/saleJournal.vue'], resolve)
        },
        {
            path: '/searchJournalResult',
            component: resolve => require(['../pages/saler/searchJournalResult.vue'], resolve)
        },
        {
            path: '/searchNotVisitResult',
            component: resolve => require(['../pages/saler/searchNotVisitResult.vue'], resolve)
        }, 
        {
            path: '/addFeedBack',
            component: resolve => require(['../pages/saler/addFeedBack.vue'], resolve)
        }, 
        {
            path: '/feedBackDetail',
            component: resolve => require(['../pages/saler/feedBackDetail.vue'], resolve)
        },
        {
            path: '/systemTask',
            component: resolve => require(['../pages/saler/systemTask.vue'], resolve)
        },
        //--客户管理-contacter------------------------------------------------------------------------------------------
        {
            path: '/searchCustomer',
            component: resolve => require(['../pages/customer/searchCustomer.vue'], resolve)
        },
        {
            path: '/customerDetail',
            component: resolve => require(['../pages/customer/customerDetail.vue'], resolve)
        },
        {
            path: '/shenpi',
            component: resolve => require(['../pages/customer/shenpi.vue'], resolve)
        }, 
        {
            path: '/shenpi_jieguo',
            component: resolve => require(['../pages/customer/shenpi_jieguo.vue'], resolve)
        },
        {
            path: '/customerManager',
            component: resolve => require(['../pages/customer/customerManager.vue'], resolve)
        },
        {
            path: '/searchRecentlyform',//筛选最近访问客户
            component: resolve => require(['../pages/customer/searchRecentlyform.vue'], resolve)
        }, 
        {
            path: '/searchCustomerRecently',//筛选最近访问客户
            component: resolve => require(['../pages/customer/searchCustomerRecently.vue'], resolve)
        },
        {
            path: '/humanManage',
            component: resolve => require(['../pages/humanManage/humanManage.vue'], resolve)
        },
        {
            path: '/shenHeRegister',
            component: resolve => require(['../pages/humanManage/shenHeRegister.vue'], resolve)
        },
        {
            path: '/shenHe_jieguo',
            component: resolve => require(['../pages/humanManage/shenHe_jieguo.vue'], resolve)
        },
        {
            path: '/setPower', 
            component: resolve => require(['../pages/humanManage/setPower.vue'], resolve)
        },
        {
            path: '/setFanwei',
            component: resolve => require(['../pages/humanManage/setFanwei.vue'], resolve)
        },
        {
            path: '/setQuYu',
            component: resolve => require(['../pages/humanManage/setQuYu.vue'], resolve)
        },
        {
            path: '/workerDetail',
            component: resolve => require(['../pages/humanManage/workerDetail.vue'], resolve)
        },
        {
            path: '/searchNetPhone',
            component: resolve => require(['../pages/netPhone/searchNetPhone.vue'], resolve)
        },
        {
            path: '/userCenter',
            component: resolve => require(['../pages/userCenter/userCenter.vue'], resolve)
        },
        {
            path: '/userInfo',
            component: resolve => require(['../pages/userCenter/userInfo.vue'], resolve)
        },
        {
            path: '/userInfoEdit',
            component: resolve => require(['../pages/userCenter/userInfoEdit.vue'], resolve)
        },
        {
            path: '/userPwEdit',
            component: resolve => require(['../pages/userCenter/userPwEdit.vue'], resolve)
        },
        {
            path: '/userCount',
            component: resolve => require(['../pages/userCenter/userCount.vue'], resolve)
        },
        {
            path: '/addAccount',
            component: resolve => require(['../pages/userCenter/userCountAdd.vue'], resolve)
        },
        {
            path: '/userCountEdit',
            component: resolve => require(['../pages/userCenter/userCountEdit.vue'], resolve)
        },
        //工程管理
        {
            path: '/engineering',     //新建工程日志
            component: resolve => require(['../pages/engineering/engineering.vue'], resolve)
        },
        {
            path: '/writeEngineering',     //新建工程日志
            component: resolve => require(['../pages/engineering/writeEngineering.vue'], resolve)
        },
        {
            path: '/logDetail',       //日志详情
            component: resolve => require(['../pages/engineering/logDetail.vue'], resolve)
        },
        {
            path: '/maintenanceDetail',    //维护详情
            component: resolve => require(['../pages/engineering/maintenanceDetail.vue'], resolve)
        },
        //合同管理
        {
            path: '/contract',          //合同详情
            component: resolve => require(['../pages/contract/contract.vue'], resolve)
        },
        {
            path: '/contractList',      //合同列表
            component: resolve => require(['../pages/contract/contractList.vue'], resolve)
        },
        {
            path: '/contractDetail',      //合同列表
            component: resolve => require(['../pages/contract/contractDetail.vue'], resolve)
        },
        {
            path: '/addBilling',        //新增开票
            component: resolve => require(['../pages/contract/addBilling.vue'], resolve)
        },
        //软件安装
        {
            path: '/customerRegistration',    //维护详情
            component: resolve => require(['../pages/customerRegistration/customerRegistration.vue'], resolve)
        },
        {
            path: '/newdog',            //新建加密狗
            component: resolve => require(['../pages/customerRegistration/newdog.vue'], resolve)
        },
        {
            path: '/newmachine',        //新建机器码
            component: resolve => require(['../pages/customerRegistration/newmachine.vue'], resolve)
        },
        {
            path: '/newserver',         //新建云服务器
            component: resolve => require(['../pages/customerRegistration/newserver.vue'], resolve)
        },
        
    ]
});
route.beforeEach((to, from, next) => {
  next();
});
export default route