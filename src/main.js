import Vue from 'vue'
import {Tree} from 'element-ui'
import 'element-ui/lib/theme-default/index.css'
import App from './App'
import router from './router'
import apilist from './api/apiList';
import VueResource from 'vue-resource';
import MintUI from 'mint-ui';
import 'mint-ui/lib/style.css';
import axios from './api/http';
// import store from "./vuex/store";  会报错
import { store } from './vuex/store'
Vue.use(apilist);
Vue.use(MintUI);
Vue.use(VueResource);
Vue.use(Tree);
import * as custom from './common/filters/utils'
// 导出的是对象，可以直接通过 key 和 value 来获得 过滤器 的名 和 过滤器的方法
Object.keys(custom).forEach(key => {
    Vue.filter(key, custom[key])
})
import contactswidget from './components/saler/contactswidget.js'             //新建联系人
Vue.use(contactswidget)
import accompanywidget from './components/saler/accompanywidget.js'             //新建联系人
Vue.use(accompanywidget)
import seachcustomwidget from './components/saler/seachcustomwidget.js'       //新建日志查询客户
Vue.use(seachcustomwidget)
import mainheader from './components/header/mainheader.js'
Vue.use(mainheader)
import maillist from './components/maillist/maillist.js'
Vue.use(maillist)
import mailDetail from './components/maillist/mailDetail.js'
Vue.use(mailDetail)
import mailDetailTab from './components/maillist/mailDetailTab.js'
Vue.use(mailDetailTab)
import mailEdit from './components/maillist/mailEdit.js'
Vue.use(mailEdit)
import baseInfo from './components/customer/baseInfo.js'// 用户基本信息
Vue.use(baseInfo)
import contacter from './components/customer/contacter.js'// 用户基本信息
Vue.use(contacter)
import card from './components/customer/card.js'// 用户基本信息
Vue.use(card)
import saleJournal from './components/customer/saleJournal.js'// 用户基本信息
Vue.use(saleJournal)
import marketJournal from './components/customer/marketJournal.js'// 用户基本信息
Vue.use(marketJournal)
import wanglaiMail from './components/customer/wanglaiMail.js'// 用户基本信息
Vue.use(wanglaiMail)
import phone from './components/customer/phone.js'// 用户基本信息
Vue.use(phone)
import editHistory from './components/customer/editHistory.js'// 用户基本信息
Vue.use(editHistory)
import banshichu from './components/customer/banshichu.js'// 用户基本信息
Vue.use(banshichu) 
import humanShenHe from './components/humanManage/humanShenHe.js'// 用户基本信息
Vue.use(humanShenHe) 
import humanSearchWorker from './components/humanManage/humanSearchWorker.js'// 用户基本信息
Vue.use(humanSearchWorker)
import workerInfo from './components/humanManage/workerInfo.js'// 用户基本信息
Vue.use(workerInfo) 
//--------------------------------------------------------------------------------
import searchTiaojian from './components/customer/searchTiaojian.js'// 客户户搜索
Vue.use(searchTiaojian) 
import searchHangye from './components/customer/searchHangye.js'// 客户搜索
Vue.use(searchHangye) 
import shenpi from './components/customer/shenpi.js'// 客户搜索
Vue.use(shenpi) 
import searchRecently from './components/customer/searchRecently.js'// 客户搜索
Vue.use(searchRecently) 
import searchJournal from './components/saler/searchJournal.js'// 销售日志搜索
Vue.use(searchJournal) 
import searchNotVisit from './components/saler/searchNotVisit.js'// 销售日志搜索
Vue.use(searchNotVisit) 
import addJournalwidget from './components/saler/addJournalwidget.js'// 销售日志添加
Vue.use(addJournalwidget) 
import addJournal from './components/saler/addJournal.js'// 市场日志添加
Vue.use(addJournal) 
import searchMarkfeedback from './components/saler/searchMarkfeedback.js'// 市场日志查询
Vue.use(searchMarkfeedback) 
import tongxunlu from './components/maillist/tongxunlu.js'// 销售日志搜索
Vue.use(tongxunlu) 
import customerList from './components/netPhone/customerList.js'// 销售日志搜索
Vue.use(customerList)
import timeRun from './components/util/timeRun.js'// 销售日志搜索
Vue.use(timeRun)  
import employeeOfficeTree from './components/util/employeeOfficeTree.js'// 销售日志搜索
Vue.use(employeeOfficeTree) 
import gbcustomer from './components/maillist/gbcustomer.js'// 归并
Vue.use(gbcustomer) 
Vue.config.productionTip = false
new Vue({
    store: store,
    el: '#app',
    router,
    template: '<App/>',
    components: { App }
})
var defines = {
    EventTemp: new Vue(),
}
if(process.env.NODE_ENV == 'production'){
    defines.html_url = 'https://sale.joinf.com:8080';
    defines.img_url = "https://fttx-sale-staticsource.oss-cn-hangzhou.aliyuncs.com/prod/app"; 
}
if(process.env.NODE_ENV == 'development'){
    defines.html_url = 'https://salecn.joinf.com:8080'
    // defines.html_url = 'http://192.168.0.135:8080',
    defines.img_url = ".."; 
}
if(process.env.NODE_ENV == 'fev'){
    defines.html_url = 'https://salecn.joinf.com:8080';
    defines.img_url = "https://fttx-sale-staticsource.oss-cn-hangzhou.aliyuncs.com/test/2.0/mobile"; 
}
Object.keys(defines).forEach((key)=>{
    Vue.prototype[key] = defines[key];
})
// router.afterEach((to, from, next) => {
//     window.scrollTo(0, 0);
// })