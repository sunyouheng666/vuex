import CustomerList from './customerList.vue'
const customerList = {
  install: function(Vue) {
    Vue.component('customerList', CustomerList)
  }
}
export default customerList
