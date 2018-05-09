<template>
  <div class="pageBox">
    <mainheader  :titleName="titleName"></mainheader>
    <maillist :mails="maillist" :length="length" :totalPage="totalPage" :boxId="-101" @loadMore="loadMore" :loading="loading" :loadAll="loadAll"></maillist>
  </div>
</template>
<script>
export default {
  data() {
    return {
      titleName:'垃圾箱',
      loading: false,
      maillist: [],
      length: 0,
      totalPage: 1,
      loadAll: false,
      currentPage: 1,
      pageSize: 15
    }
  },
  mounted: function() {
  },
  methods: {
    loadMore() {
      this.loading = true;
      this.getReceiveList(this.pageSize, this.currentPage);
    },
    getReceiveList(pageSize, currentPage) { //收件箱列表
      let self = this;
      var param = {
        boxId: -101,
        subject: null,
        pageRows: pageSize,
        pagingRequired: true,
        currenPage: currentPage
      };
      let callback = function(data) {
        self.maillist = self.maillist.concat(data.body.data);
        self.length = self.maillist.length;
        self.loading = false;
        self.totalPage = data.body.totalPage;
        if (self.currentPage == data.body.totalPage) {
          self.loadAll = true;
        }
        self.currentPage = self.currentPage + 1;
      }
    }
  }
}
</script>