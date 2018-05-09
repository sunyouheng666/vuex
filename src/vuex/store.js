import Vue from "vue"
import Vuex from "vuex"
import {moduleA }from './a'
Vue.use(Vuex);
export const store = new Vuex.Store({
  modules: {
    a: moduleA,
  }
})