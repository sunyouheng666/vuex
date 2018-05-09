<template>
  <div id="app">
    <router-view></router-view>
  </div> 
</template>
<script>
  export default { 
    methods:{ 

    }, 
    components:{ 
       
    } 
  } 
</script>
<style>
  @import "../static/css/content.css";
  .user{
    width:20px;
    height:20px;
    display: inline-block;
    background: gray;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }
</style>