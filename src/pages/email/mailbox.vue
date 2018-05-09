<template>
  <div class="pageBox">
    <mainheader :titleName="titleName"></mainheader>
    <maillist :boxId="-1" :pageSize="15"></maillist>
  </div>
</template>
<script>
  export default {
    data() {
      return { 
        titleName:'收件箱'
      }
    },
    mounted: function() {

    },
    methods: {
     
    }
  }
</script>