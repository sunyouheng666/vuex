<template>
  <div class="pageBox">
    <mailEdit :mailId="id" :boxId="boxId" :operType='operType'></mailEdit>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        id: Number(this.$route.query.id),
        boxId: Number(this.$route.query.boxId),
        operType: String(this.$route.query.operType)
      }
    },
    mounted: function() {
    },
    methods: {
    }
  }
</script>