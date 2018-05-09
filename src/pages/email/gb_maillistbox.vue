<template>
  <div class="pageBox">
    <mainheader  :titleName="titleName"></mainheader>
    <maillist :boxId="-11" :pageSize="15" :customerId='customerId'></maillist>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        customerId: String(this.$route.query.customerId),
        titleName:'归并箱'
      }
    },
    mounted: function() {},
    methods: {}
  }
</script>