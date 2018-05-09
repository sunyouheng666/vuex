exports.install = function (Vue) {
    Vue.prototype.Apilist={
        //操作员管理
        'getOperator': '/runpos/operator/list',
    };
    Vue.prototype.apiName = {
        
        'something':'something',
    };
    Vue.prototype.getApiList=function(_this, type){
        return Vue.prototype.Apilist[type];
    };
};