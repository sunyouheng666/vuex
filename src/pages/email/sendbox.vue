<template>
  <div class="pageBox">
    <mainheader :titleName="titleName"></mainheader>
    <maillist :boxId="-5" :pageSize="15"></maillist>
  </div>
</template>
<script>
export default {
  data() {
    return {
      titleName:'发件箱'
    }
  },
  mounted: function() {},
  methods: {}
}
</script>