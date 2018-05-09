<template>
  <div class="pageBox">
    <gbcustomer :customType='customType'></gbcustomer>
  </div>
</template>
<script>
export default {
  data() {
    return {
      customType: String(this.$route.query.mergeType)
    }
  },
  mounted: function() { 
  },
  methods: {
  }
}
</script>
<style scoped>
</style>