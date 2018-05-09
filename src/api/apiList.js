export default {
      install(Vue) {
            Vue.prototype.Apilist = {
                  "selectEmployeeTreeByManage":"/systemSettings/selectEmployeeTreeByManage",      //获取员工通讯录
                  "selectContractAmountPagingList": "/custom/selectContractAmountPagingList",       //合同款项查询（客户详情）
                  "selectAccompayTree": "/systemSettings/selectAccompanyTree",                     //陪访人
                  /*
                  **工程管理（14）
                  */ 
                  "customMaintain":"/engineering/insertLog/customMaintain",                      //新增工程日志客户维护
                  "dailyWork":"/engineering/insertLog/dailyWork",                                //新增工程日志日常工作
                  "querycustomMaintain":"/engineering/selectLogListPaging/customMaintain",       //工程日志查询
                  "querydailyWork":"/engineering/selectLogListPaging/dailyWork",                 //日常工作查询
                  "deletecustomMaintain":"/engineering/deleteLog/customMaintain",                //删除工程日志
                  "deletedailyWork":"/engineering/deleteLog/dailyWork",                          //删除日常工作
                  "selectLogCommentStat":"/engineering/selectLogCommentStat",                    //工程管理-批注统计接口
                  "exportLogCommentStatExcel":"/engineering/exportLogCommentStatExcel",          //工程管理-批注统计导出接口
                  "updateLogComment":"/engineering/updateLogComment",                            //工程管理-主管批注更新接口
                  "insertLogComment":"/engineering/insertLogComment",                            //工程管理-主管批注新增接口
                  "deleteLogComment":"/engineering/deleteLogComment",                            //工程管理-主管批注删除接口
                  "selectMaintainListPaging":"/engineering/selectMaintainListPaging",            //维护查询
                  "sendMailWithMaintainList":"/engineering/sendMailWithMaintainList",            //维护查询（发送邮件） 
                  "selectContractCustomListPaging":"/engineering/selectContractCustomListPaging",//客户维护日志-查询客户信息列表接口
                  /*
                  **客户注册文件(14)
                  */
                 "batchDeleteCustomerSign":"/customerSignUpFile/batchDelete",                    //批量删除列表数据接口
                  //客户注册
                  "selectSustomerSignUpFile":"/customerSignUpFile/select",                        //客户注册文件查询
                  "exportSignUpFileExcel":"/customerSignUpFile/exportSignUpFileExcel",            //下载客户注册文件-导出Excel接口
                  //云服务器
                  "insertCloudServer":"/customerSignUpFile/cloudServer/insert",                   //新增客户云服务器接口
                  "selectCloudServer":"/customerSignUpFile/cloudServer/select",                   //客户云服务器查询列表接口
                  "updateCloudServer":"/customerSignUpFile/cloudServer/update",                   //修改客户云服务器接口
                  "selectModifyHistory":"/customerSignUpFile/modifyHistory/select",               //查询修改记录列表接口
                  //加密狗
                  "selectDongle":"/customerSignUpFile/dongle/select",                             //客户加密狗查询列表接口
                  "insertDongle":"/customerSignUpFile/dongle/insert",                             //新增客户加密狗接口
                  "updateDongle":"/customerSignUpFile/dongle/update",                             //修改客户加密狗接口
                  //机器码
                  "insertMachine":"/customerSignUpFile/machine/insert",                           //新增客户机器码接口
                  "selectMachine":"/customerSignUpFile/machine/select",                           //客户机器码查询列表接口
                  "updateMachine":"/customerSignUpFile/machine/update",                           //修改客户机器码接口
                  "updateAuditStatus":'/customerSignUpFile/updateAuditStatus',                    //修改审核状态接口
                  /*
                  **合同管理
                  */
                  //发票查询与开票申请
                  "contractTypes":"/contract/types",                                              //合同类型查询
                  "selectBillApply":"/contract/billApply/select",                                 //开票申请-开票列表接口
                  "selectInvoicePagingList":"/contract/billApply/selectInvoicePagingList",        //开票申请-发票列表接口
                  "exportInvoiceListExcel":"/contract/billApply/exportInvoiceListExcel",          //开票申请-发票列表导出接口
                  "getBillApplyInvoiceDetail":"/contract/billApply/getBillApplyInvoiceDetail",    //开票申请-发票详情接口
                  "sendBillApply":"/contract/billApply/send",                                     //开票申请-发送申请接口
                  "updateBillApply":"/contract/billApply/update",                                 //开票申请-更新接口
                  "insertBillApply":"/contract/billApply/insert",                                 //开票申请-新增接口
                  "insertInvoice":"/contract/billApply/insertInvoice",                            //开票申请-发票新增接口
                  "customcontractAmount":"/contract/custom/contractAmount",                       //合同-查询客户合同总金额等相关信息接口
                  "selectEontractPayment":"/contract/contractPayment/selectContractPagingList",   //款项查询-列表接口
                  "batchSendReview":"/contract/select/batchSendReview",                           //合同查询-批量发送审核接口
                  "sendMailPaymentRecruit":"/contract/paymentRecruit/sendMail",                   //到款招领申领接口     
                  "selectPagingList":"/contract/paymentRecruit/selectPagingList",                 //到款招领查询列表接口
                  "recruitImport":"/contract/contractPayment/recruitImport",                      //合同-到款招领导入接口
                  "selectContractPagingList":"/contract/paymentInsert/selectContractPagingList",  //到款录入-合同支付信息列表接口
                  "acceptanceSelect":"/contract/selectAcceptance",                                //待验收合同-列表查询接口
                  "contractSelect":"/contract/select",                                            //合同（6种类型合同列表查询接口
                  "deleteRemittanceVoucher":"/contract/contractPayment/remittanceVoucher/delete", //删除合同付款记录中的付款凭证接口
                  "insertRemittanceVoucher":"/contract/contractPayment/remittanceVoucher/insert", //新增合同付款记录中的付款凭证接口
                  "endReceivables":"/contract/endReceivables",                                    //合同结束收款接口
                  "deleteEndReceivables":"/contract/endReceivables/delete",                       //删除合同结束收款接口
                  "reviewContract":"/contract/review",                                            //合同审核接口
                  "sendReviewContract":"/contract/sendReview",                                    //合同发送审核接口
                  "typesContractPayment":"/contract/contractPayment/types",                       //合同付款记录类型列表接口
                  "insertContractPayment":"/contract/contractPayment/insert",                     //新增合同付款接口
                  "deleteContractPayment":"/contract/contractPayment/delete",                     //删除合同付款记录接口
                  "batchDelete":"/contract/batchDelete",                                          //批量删除合同接口
                  "insertContractAttachment":"/contract/contractAttachment/insert",               //新增合同附件（合同原件）接口
                  "deleteContractAttachment":"/contract/contractAttachment/delete",               //删除合同附件接口
                  //实施验收
                  "selectAcceptance":"/contract/acceptance/select",                               //起草合同-实施验收合同查询列表接口
                  "updateStatus":"/contract/acceptance/updateStatus",                             //起草合同-实施验收合同验收状态变更接口
                  "insertAward":"/contract/acceptance/insertAward",                               //起草合同-实施验收合同-奖金新增接口
                  "deleteAward":"/contract/acceptance/deleteAward",                               //起草合同-实施验收合同-奖金批量删除接口
                  "uploadFileAcceptance":"/contract/acceptance/uploadFile",                       //实施验收文件上传
                  "deleteFileAcceptance":"/contract/acceptance/deleteFile",                       //实施验收文件上传删除接口
                  //维护
                  "insertContractMaintain":"/contract/maintainContract/insert",                   //新增维护合同接口
                  "selectContractMaintain":"/contract/maintainContract/select",                   //维护合同列表查询接口
                  "updateContractMaintain":"/contract/maintainContract/update",                   //修改维护合同信息接口
                  //设备
                  "insertContractEquipment":"/contract/equipmentContract/insert",                 //新增设备合同接口
                  "selectContractEquipment":"/contract/equipmentContract/select",                 //设备合同列表查询接口
                  "updateContractEquipment":"/contract/equipmentContract/update",                 //修改设备合同信息接口
                  //移动APP
                  "insertMobileAppContract":"/contract/mobileAppContract/insert",                 //新增移动APP合同接口
                  "selectMobileAppContract":"/contract/mobileAppContract/select",                 //移动APP合同列表查询接口
                  "updateMobileAppContract":"/contract/mobileAppContract/update",                 //修改移动APP合同信息接口
                  "insertMobileAppEquipment":"/contract/mobileAppContract/insertMobileAppEquipment",  //新增移动APP合同-合同设备接口
                  "updateMobileAppEquipment":"//contract/mobileAppContract/updateMobileAppEquipment", //移动APP合同-合同设备，设备延期接口
                  "deleteMobileAppEquipment":"/contract/mobileAppContract/deleteMobileAppEquipment", //删除移动APP合同-合同设备接口
                  //cs
                  "insertContract":"/contract/cs/insert",                                         //起草合同-新增cs软件合同接口
                  "selectContract":"/contract/cs/select",                                         //cs合同查询列表接口
                  "updateContract":"/contract/cs/update",                                         //cs合同修改列表接口
                  "calcAmountRateCS":"/contract/cs/calcAmountRate",                               //起草合同-新增cs软件-计算金额比例接口
                  //saas
                  "insertContractSaas":"/contract/saasContract/insert",                           //新增saas软件合同接口
                  "selectSaasContract":"/contract/saasContract/select",                           //saas软件合同查询接口
                  "updateContractSaas":"/contract/saasContract/update",                           //修改saas软件合同信息接口
                  "saasContractTerms":"/contract/saasContract/terms",                             //saas软件合同服务条款查询接口
                  //定制开发
                  "insertContractCustomDevelopment":"/contract/customDevelopmentContract/insert", //新增定制开发合同接口
                  "selectContractCustomDevelopment":"/contract/customDevelopmentContract/select ",//定制开发合同列表查询接口
                  "updateContractCustomDevelopment":"/contract/customDevelopmentContract/update", //修改定制开发合同信息接口
                  //发票查询
                  "selectContractInvoicePagingList":"/contract/selectContractInvoicePagingList",  //发票列表
                  "uploadInvoiceReturnReceipt":"/contract/uploadInvoiceReturnReceipt",            //发票上传回执单
                  "selectInvoiceItemList":"/dictionaries/contract/selectInvoiceItemList",         //发票项目列表接口
                  "insertContractInvoice":"/contract/insertContractInvoice",                      //新增发票
                  "deleteInvoice":"/contract/deleteInvoice",                                      //合同-发票批量删除接口
                  //合同设置
                  "selectAccountSettingList":"/contract/setting/selectAccountSettingList",        //合同设置-账户设置列表接口
                  "insertAccountSetting":"/contract/setting/insertAccountSetting",                //合同设置-账户设置新增接口
                  "updateAccountSetting":"/contract/setting/updateAccountSetting",                //合同设置-账户设置更新接口
                  "deleteAccountSetting":"/contract/setting/deleteAccountSetting",                //合同设置-账户设置批量删除接口
                  "detailAccountSetting":"/contract/setting/detailAccountSetting",                //合同设置-账户设置详情接口
                  "selectSoftModuleParentList":"/contract/setting/selectSoftModuleParentList",    //合同设置-父级软件模块列表接口
                  "deleteSoftModule":"/contract/setting/deleteSoftModule",                        //合同设置-软件模块批量删除接口
                  "detailSoftModule":"/contract/setting/detailSoftModule",                        //合同设置-软件模块详情接口
                  "insertSoftModule":"/contract/setting/insertSoftModule",                        //合同设置-软件模块新增接口
                  "selectSoftModulePagingList":"/contract/setting/selectSoftModulePagingList",    //合同设置-软件模块列表接口
                  "updateSoftModule":"/contract/setting/updateSoftModule",                        //合同设置-软件模块修改接口
                  "updateSoftModuleQuick":"/contract/setting/updateSoftModuleQuick",              //合同设置-模块快捷设置更新接口
                  "selectSoftModuleQuickPagingList":"/contract/setting/selectSoftModuleQuickPagingList",//合同设置-模块快捷设置列表接口
                  "insertSoftModuleQuick":"/contract/setting/insertSoftModuleQuick",              //合同设置-模块快捷设置新增接口
                  "detailSoftModuleQuick":"/contract/setting/detailSoftModuleQuick",              //合同设置-模块快捷设置详情接口
                  "deleteSoftModuleQuick":"/contract/setting/deleteSoftModuleQuick",              //合同设置-模块快捷设置批量删除接口
                  "selectSoftModulePriceList":"/contract/setting/selectSoftModulePriceList",      //合同设置-合同模块标准价格设置列表接口
                  "updateSoftModulePriceList":"/contract/setting/updateSoftModulePriceList ",     //合同设置-合同模块标准价格设置更新接口
                  "getContractPermissionPrice":"/contract/setting/getContractPermissionPrice ",   //合同设置-合同权限价格设置接口
                  "updateContractPermissionPrice":"/contract/setting/updateContractPermissionPrice",//合同设置-合同权限标准价格更新接口
                  "selectCsContractPagingList":"/contract/setting/selectCsContractPagingList",    //合同设置-实施工程师调整-cs合同列表接口
                  "changeImplementation":"/contract/setting/changeImplementation",                //合同设置-实施工程师调整接口 
                  //---mobile
                  'loading': '/systemSettings/loading',
                  'getReceiveList': '/mail/selectMailPagingList',
                  'getMailDetail': '/mail/selectMailDetail', //邮件 详情
                  'replayMail': '/mail/replyMail', //回复
                  'getSender': '/mail/selectAccountPagingList', //获取发邮件列表
                  'updateEmail': '/mail/updateMailStatus', //删除邮件 更新状态
                  'clearEmail': '/mail/deleteMail',
                  'getRecipients': '/mail/selectRecipientsMailContactsList', //邮件获取收件人客户列表
                  'guiBingCustomType': '/custom/selectCustomListPagingByCustomType', // -归并邮箱客户类型
                  'getUnReadMailCount': '/mail/getUnReadMailCount', // - 邮箱 未读数量
                  'wechatLoginQuery': '/systemSettings/wechatLoginQueryMobile', // - 手机端微信验证反馈
                  "selectCustomLatestLevelRates":"/custom/selectCustomLatestLevelRates",           //客户最新级别占比情况
                  "selectMarketActivityList":"/dictionaries/selectMarketActivityList",    //市场活动
                  "selectFeedbackTypeList":"/dictionaries/selectFeedbackTypeList",
                  "selectCustomTypeList":"/dictionaries/selectCustomTypeList",    //市场和销售客户类型
                  "selectCustomListByFeedback":"/custom/selectCustomListByFeedback",    //市场反馈 查询客户
                  "importCustomAndLogList":"/log/importCustomAndLogList",    //市场反馈 导入
                  "insertFeedback":"/log/insertFeedback",    //市场反馈  添加
                  "selectEmployeeList":"/systemSettings/selectEmployeeList",    //市场反馈  添加
                  "assignFeedback":"/log/assignFeedback",    //市场反馈  添加
                  "selectProvinceCityAreaTree":"/dictionaries/selectProvinceCityAreaTree",                 //城市树形结构
                  /*
                  **数据统计 
                  */
                  //------------------------------------------------------------------------------------
                  "selectFeedbackListPaging": "/log/selectFeedbackListPaging",                    //市场反馈查询
                  "selectUnderstandWayList": "/dictionaries/selectUnderstandWayList",             //了解途径
                  "assignFeedback":"/log/assignFeedback",                                         //市场日志转移
                  "deleteFeedback":"/log/deleteFeedback",                                         //市场日志删除
                  "feedbackDetail":"/log/feedbackDetail",                                         //市场详情
                  "insertFeedbackFollow":"/log/insertFeedbackFollow",                             //快速跟进提交
                  "updateFeedback":"/log/updateFeedback",                                         //修改市场反馈
                  //------------------------------------------------------------------------------------
                  'selectAreaTree': '/dictionaries/selectAreaTree',
                  'selectAccountPagingList': '/mail/selectAccountPagingList', //邮件账号管理
                  'updateAccountFlag': '/mail/updateAccountFlag', //邮件账号管理
                  'updateAccountDefaultSort': '/mail/updateAccountDefaultSort', //邮件账号管理
                  'updateAccount':'/mail/updateAccount', //邮件账号管理
                  'insertAccount': '/mail/insertAccount', //邮件账号添加
                  'deleteAccount': '/mail/deleteAccount', //邮件账号删除
                  'selectAccountDetail': '/mail/selectAccountDetail', //邮件账号编辑
                  'WechatLogin': '/common/WechatLogin', //微信登录
                  //------客户邮件列表------------------------------------------------------------------------------------
                  'selectContactsMailListPaging': '/mail/selectContactsMailListPaging',
                  'selectEmployeeMailContactsList': '/mail/selectEmployeeMailContactsList',
                  //-------------------------------------------------------
                  "selectEmployeePagingListBySaleManage": "/systemSettings/selectEmployeePagingListBySaleManage",
                  // 销售人员(没有使用)
                  "selectEmployeePagingListByConsultantManage": "/systemSettings/selectEmployeePagingListByConsultantManage",
                  // 外贸顾问(没有使用)
                  "selectEmployeePagingListByMaintain": "/systemSettings/selectEmployeePagingListByMaintain",
                  // 维护工程师(没有使用)
                  "selectEmployeePagingListByImplementation": "/systemSettings/selectEmployeePagingListByImplementation",
                  // 实施工程师(没有使用)
                  "selectCustomPostListPaging": "/custom/selectCustomPostListPaging",                 //客户岗位查询
                  "selectCustomListPagingByCheck": "/custom/selectCustomListPagingByCheck",           //申请删除审批
                  "VisitingCustom": "/log/selectVisitingCustomListPaging",                            //最近访问分页查询
                  "selectProductTree": "/dictionaries/selectProductTree",                             //主营产品
                  "selectProductList": "/dictionaries/selectProductList",                             //产品下来查询
                  "selectProductTreeByName": "/dictionaries/selectProductTreeByName",                 //产品树-查询
                  "selectSourceList": "/dictionaries/selectSourceList",                               //客户来源加载
                  "selectUseSoftList": "/dictionaries/selectUseSoftList",                             //使用状态
                  "selectPurchaseTree": "/dictionaries/selectPurchaseTree",                           //购买树
                  "selectProvinceList": "/dictionaries/selectProvinceList",                           //省份加载
                  "selectCityList": "/dictionaries/selectCityList",                                   //城市加载
                  "selectAreaList": "/dictionaries/selectAreaList",                                   //区县加载
                  "insertCustom": "/custom/insertCustom",                                             //添加客户基础信息
                  "updateCustom": "/custom/updateCustom",                                             //修改客户基础信息
                  "selectCustomListPaging": "/custom/selectCustomListPaging",                         //查询客户
                  "selectCustomByParam": "/custom/selectCustomByParam",                               //根据id查询客户（申请删除客户的详情）
                  "deleteSignCustom": "/custom/deleteSignCustom",                                     //申请删除客户信息
                  "updateCheckCustom": "/custom/updateCheckCustom",                                   //申请删除客户信息审核
                  "selectContactsListPaging": "/custom/selectContactsListPaging",                     //查询联系人
                  "deleteContacts": "/custom/deleteContacts",                                         //删除联系人
                  "insertContacts": "/custom/insertContacts",                                         //新增联系人
                  "updateContacts": "/custom/updateContacts",                                         //修改联系人
                  "detailContacts": "/custom/detailContacts",                                         //联系人详情
                  "insertOffice": "/custom/insertCustomOffice",                                       //新增办事处
                  "updateOffice": "/custom/updateCustomOffice",                                       //修改办事处
                  "deleteOffice": "/custom/deleteCustomOffice",                                       //删除办事处
                  "detailCustomOffice": "/custom/detailCustomOffice",                                 //办事处详情
                  "checkRepeatContactByPhoneEmail":"/custom/checkRepeatContactByPhoneEmail",          //添加联系人验证
                  "selectCustomOfficeListPaging": "/custom/selectCustomOfficeListPaging",             //查询办事处(分页)
                  "AccurateIndustry": "/custom/selectCustomListByAccurateIndustry",                   //按行业精确查询
                  "AccurateVague": "/custom/selectCustomListByAccurateVague",                         //按行业模糊查询
                  "selectEmployeeByDepartmentIdListPaging": "/systemSettings/selectEmployeeByDepartmentIdListPaging",
                  //转移人查询(没有使用)
                  "distributionCustom": "/custom/distributionCustom", //执行转移分配
                  "getContactEmailByCustomId":"/custom/getContactEmailByCustomId",
                  "selectCustomListPagingByAll": "/custom/selectCustomListPagingByAll", //客户新建搜索
                  "insertCard": "/custom/insertCard", //新增名片
                  "deleteCard": "/custom/deleteCard", //删除名片
                  "selectCardListPaging": "/custom/selectCardListPaging", //查询名片
                  "selectProvinceDetail": "/custom/selectProvinceDetail", //查询省名称
                  "selectCityDetail": "/custom/selectCityDetail", //查询市名称
                  "selectAreaDetail": "/custom/selectAreaDetail", //查询区县名称
                  "selectOperatorListPaging": "/custom/selectOperatorListPaging", //客户修改记录查询
                  "selectMailPagingListByCustom": "/mail/selectMailPagingListByCustom", //往来邮件查询                                     
                  "selectVoIpListPaging": "/custom/selectVoIpListPaging", //网络电话查询
                  "updateEmployee": "/systemSettings/updateEmployee", //编辑个人信息
                  /************用户权限设置*************/
                  "selectDepartmentTree": "/systemSettings/selectEmployeeOfficeTree",           //公司组织结构
                  "selectProvinceCityAreaTree": "/dictionaries/selectProvinceCityAreaTree",     //公司组织结构树(区域设置)
                  "saveAreaRole":"/systemSettings/saveAreaRole",                           //设置员工管理区域
                  "selectMenuTree": "/systemSettings/selectMenuTree",                     //功能权限树
                  "insertEmployeeOffice": "/systemSettings/insertEmployeeOffice",         //员工办事处新增
                  "updateEmployeeOffice": "/systemSettings/updateEmployeeOffice",         //员工办事处修改
                  "selectEmployeeOfficeListPaging": "/systemSettings/selectEmployeeOfficeListPaging", //员工办事处查询
                  "detailEmployeeOffice": "/systemSettings/detailEmployeeOffice",         //员工办事处详情
                  "deleteEmployeeOffice": "/systemSettings/deleteEmployeeOffice",         //员工办事处删除
                  "insertDepartment": "/systemSettings/insertDepartment",                 //员工部门添加
                  "saveMenuRole": "/systemSettings/saveMenuRole",                         //员工权限保存
                  "saveManageRole": "/systemSettings/saveManageRole",                     //员工权限保存
                  "updateEmployeeInfo": "/systemSettings/updateEmployeeInfo",             //驳回员工修改
                  "updateDepartment": "/systemSettings/updateDepartment",                 //员工部门修改
                  "deleteDepartment": "/systemSettings/deleteDepartment",                 //员工部门修改
                  "deletePost": "/systemSettings/deletePost",                             //删除岗位
                  "insertEmployee": "/systemSettings/insertEmployee",                     //新建员工信息(用户注册)
                  "updateEmployee": "/systemSettings/updateEmployee",                     //修改员工信息
                  "updateEmployeeInfor": "/systemSettings/updateEmployeeInfor",           //驳回员工修改
                  "detailEmployee": "/common/detailEmployee",                             //员工详细信息/common/detailEmployee
                  "deleteEmployee": "/systemSettings/deleteEmployee", //删除员工
                  "login": "/common/login", //用户登录
                  "updateEmployeePassword": "/systemSettings/updateEmployeePassword", //修改密码
                  "selectEmployeePagingList": "/systemSettings/selectEmployeePagingList", //用户注册审核分页查询
                  "selectEmployeeInfoPagingList": "/systemSettings/selectEmployeeInfoPagingList", //用户注册审核分页查询
                  "checkEmployeeByParam": "/systemSettings/checkEmployeeByParam", //判断同一部门下用户是否唯一
                  "checkEmployee": "/systemSettings/checkEmployee", //用户审核提交
                  "selectEmployeeOffice": "/systemSettings/selectEmployeeOfficeListPaging", //查询办事处
                  "selectDepartmentListPaging": "/systemSettings/selectDepartmentListPaging", //查询部门
                  "selectPostListPaging": "/systemSettings/selectPostListPaging", //查询岗位
                  "employeePasswordReset": "/systemSettings/employeePasswordReset", //密码重置
                  "quit": "/common/quit", //用户退出
                  "getPassword": "/systemSettings/getPassword", //获得登陆密码
                  /**********************************数据统计*****************************************/
                  "selectStatisticsList": "/statistics/selectStatisticsList", //业务统计
                  "dialVoIp": "/custom/dialVoIp", //打电话
                  /**********************************销售管理*****************************************/
                  "insertLog": '/log/insertLog', // 新增销售日志
                  "selectEmployeePagingListByPost": "/systemSettings/selectEmployeePagingListByPost", 
                  //获取业务员列表没有使用(没有使用)
                  "selectCustomListPagingByLog": "/custom/selectCustomListPagingByLog", // 获取客户列表
                  "selectUseSoftList": "/dictionaries/selectUseSoftList", // 获取软件列表
                  "selectEmployeeTree": "/systemSettings/selectEmployeeTree", // 获取人员树结构
                  "selectHighestLevelList": "/dictionaries/selectHighestLevelList", //获取最高级别，
                  "selectLatestLevelList": "/dictionaries/selectLatestLevelList", // 获取最新级别
                  "selectLogListPaging": "/log/selectLogListPaging", // 销售日志查询
                  "selectMarketLogListPaging": "/log/selectMarketLogListPaging", //销售日志查询
                  "deleteLog": "/log/deleteLog", // 删除销售日志
                  "selectNotVisitingCustomListPaging": "/log/selectNotVisitingCustomListPaging",  //未拜访客户
                  "selectCustomListBySystemTask":"/log/selectCustomListBySystemTask",             //系统任务查询客户列表
                  "selectMySystemTaskList":"/log/selectMySystemTaskList",                         //系统任务我的任务列表
                  "assignSaleSystemTask":"/log/assignSaleSystemTask",                             //系统任务销售分配
                  "assignMarketSystemTask":"/log/assignMarketSystemTask",                         //系统任务市场分配
                  "selectMySystemTaskRates":"/log/selectMySystemTaskRates",                       //系统任务我的任务完成情况
                  "selectAllSystemTaskRates":"/log/selectAllSystemTaskRates",                     //系统任务下属任务完成情况
                  /**********************************微信登陆*******************************/
                  /****************************拨打电话******************************/
                  "selectCustomListByVoIp": "/custom/selectCustomListByVoIp", //查询客户(暂无使用)
                  "selectContactsListPagingByVoIp": "/custom/selectContactsListPagingByVoIp", //查询对应联系人
            };
            Vue.prototype.getApiList = function(_this, type) {
                  return Vue.prototype.Apilist[type];
            };
            Vue.prototype.getApiList2 = function(aa) {
                  return false;
            };
      }
};