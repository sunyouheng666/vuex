<template>
  <div class="pageBox">
    <workerInfo :id="idstr"></workerInfo>  
  </div>
</template>
<script>
import axios from 'axios';
export default {
  data() {
    return {
      idstr: String(this.$route.query.id), 
      shenQing:this.$route.query.shenQing,
    }
  },
  mounted: function() {
  },
  components: {
  },
  computed: {
  },
  methods: {
  }
}
</script>