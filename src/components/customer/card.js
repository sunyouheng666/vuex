import Card from './card.vue'
const card = {
  install: function(Vue) {
    Vue.component('card', Card)
  }
}
export default card