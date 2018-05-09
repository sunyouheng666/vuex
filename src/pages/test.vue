<template>
  <div class="mainbody" style="">
    <div>
      <p> **{{text}}**</p> 
      <p>{{changeText}}</p>
      <p>{{count}}</p>
    </div>
    <button @click="countAdd(2)">增加</button>
    <p>
      <!-- <button @click="getCountAdd">获取</button> -->
      <button @click="getSelectEmployeeList">获取</button>
    </p>
  </div>
</template>
<script>
  import { mapState } from 'vuex'
  import { mapGetters } from 'vuex'
  import { mapActions } from 'vuex'
  export default {
    computed:{
      ...mapState({
        text : state => state.text,
      }),
      ...mapGetters([
        'changeText',
        'count'
      ]),
    },
    methods:{
      countAdd(n){
        this.$store.commit('increment',n)
      },
      // getCountAdd(){      //Action 通过 store.dispatch 方法触发：
      //   let me = this;
      //   this.$store.dispatch("getSelectEmployeeList").then(() => {
      //     setTimeout(function() {
      //       me.countAdd(2);
      //     }, 2000);
      //   });  
      // }
      ...mapActions([
        "getSelectEmployeeList",
        // 'actionB'
      ]),
    } 
  }
</script>
<style scoped>
  .mainbody div{margin-top: 200px;}
</style>