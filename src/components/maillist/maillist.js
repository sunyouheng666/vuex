import Maillist from './maillist.vue'
const maillist = {
  install: function(Vue) {
    Vue.component('maillist', Maillist)
  }
}
export default maillist
