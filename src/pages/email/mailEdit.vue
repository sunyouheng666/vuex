<template>
  <div class="pageBox">
    <mailEdit :mailId="id" :boxId="boxId" :operType='operType' :customerId="customerId" :from="from"></mailEdit>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: Number(this.$route.query.id),
      boxId: Number(this.$route.query.boxId),
      operType: String(this.$route.query.operType),
      customerId:String(this.$route.query.customerId),
      from:String(this.$route.query.from),
    }
  },
  mounted: function() {
  },
  methods: {
  }
}
</script>