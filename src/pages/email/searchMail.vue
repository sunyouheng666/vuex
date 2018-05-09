<template>
  <div class="pageBox">
    <mt-header title="邮件搜索" fixed>
      <mt-button icon="back" slot="left" @click.native="back">返回</mt-button>
    </mt-header>
    <mt-search v-model="searchvalue" style="margin-top:48px">
    </mt-search>
    <div class="searchContent">
      <mt-navbar v-model="selected" style='font-size:15px'>
        <mt-tab-item id="3" style='font-size:15px' @click.native="tabFn3">主题</mt-tab-item>
        <mt-tab-item id="1" style='font-size:15px' @click.native="tabFn1">发件人</mt-tab-item>
        <mt-tab-item id="2" style='font-size:15px' @click.native="tabFn2">收件人</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="3">
          <div v-if="showTab3">
            <maillist :boxId="all" :searchMail="true" :pageSize="15" :searchKeyWord="searchvalue" :searchType='searchTypeZhuti'></maillist>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="1">
          <div v-if="showTab1">
            <maillist :boxId="all" :searchMail="true" :pageSize="15" :searchKeyWord="searchvalue" :searchType='searchTypeFajian'></maillist>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <div v-if="showTab2">
            <maillist :boxId="all" :searchMail="true" :pageSize="15" :searchKeyWord="searchvalue" :searchType='searchTypeShoujian'></maillist>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchTypeShoujian:1,         //1收件人2发件人3主题（默认）（类型）
      searchTypeFajian:2,           //搜索发件（类型）
      searchTypeZhuti:3,            //搜索主体（类型）
      all: 0,                       //（）
      selected: '3',                //绑定tab标签页
      showTab1: false,              //
      showTab2: false,              //
      showTab3: false,              //
      searchvalue: '',              //搜索值
    }
  },
  mounted: function() {
  },
  watch: {
    searchvalue: {
      handler: function(val, oldval) {
        this['showTab' + this.selected] = true;
        this.searchvalue = val;
        if (val == "") {
          this.showTab3 = false;
          this.showTab2 = false;
          this.showTab1 = false;
        }
      },  
    },
  }, //以V-model绑定数据时使用的数据变化监测  
  methods: {
    tabFn1() {
      this.selected = "1";
      this.showTab1 = true;
      this.showTab2 = false;
      this.showTab3 = false;
    },
    tabFn2() {
      this.selected = "2";
      this.showTab1 = false;
      this.showTab2 = true;
      this.showTab3 = false;
    },
    tabFn3() {
      this.selected = "3";
      this.showTab1 = false;
      this.showTab2 = false;
      this.showTab3 = true;
    },
    back: function() {
      this.$router.go(-1);
    },
  }
}
</script>
<style scoped>
  .searchContent{position: relative;}
  .mint-search { height: 55px;}
</style>