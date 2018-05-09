<template>
  <div class="pageBox">
    <mt-header title="邮件详情" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <mailDetail :mailId="id" :boxId="boxId"></mailDetail>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        id: Number(this.$route.query.id),
        boxId: Number(this.$route.query.boxId)
      }
    },
    mounted: function() {
    },
    methods: {
      back: function() {
        this.$router.go(-1);
      },
    }
  }
</script>