<template id="humanSearchWorker">
  <div class="humanSearchWorker">
    <mt-field label="办事处" placeholder="请选择" v-model="Banshichu" @click.native="tab1"  readonly>
    </mt-field>
    <mt-field label="部门" placeholder="请选择" v-model="Bumen" @click.native="tab2(BanshichuId)"  readonly>
    </mt-field>
    <mt-field label="岗位" placeholder="请选择" v-model="Gangwei" @click.native="tab3(BumenId)"  readonly>
    </mt-field>
    <mt-popup v-model="showBanshichuPop" position="bottom" style='width:100%'>
      <div class="title-pop">办事处选择</div>
      <mt-picker :slots="slotsBanshichu" ref="pickerBanshichu" @change="onValChangeBanshichu" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showBanshichuPop"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showBumenPop" position="bottom" style='width:100%'>
      <div class="title-pop">部门选择</div>
      <mt-picker :slots="slotsBumen" ref="pickerBumen" @change="onValChangeBumen" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showBumenPop"></mt-picker>
    </mt-popup>
    <mt-popup v-model="showGangweiPop" position="bottom" style='width:100%'>
      <div class="title-pop">岗位选择</div>
      <mt-picker :slots="slotsGangwei" ref="pickerGangwei" @change="onValChangeGangwei" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showGangweiPop"></mt-picker>
    </mt-popup>

    <div class="searchList" v-show="showSearch">
      <div style="padding-top:8px; padding-left:4px;background:#ddd; height:30px;margin-top:10px; line-height30px; text-align:center; font-size: 14px;background:#5e67fc;color:#fff;">
        查询结果
      </div>
      <ul class="searchList searchWorker" v-infinite-scroll="loadMore" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10">
        <li v-for="item in workerList" @click='goDetail(item.id)'>
          <div class="line"></div>
          <div class="head"><img :src="item.avatarUrl" width="100%" height="100%" style="vertical-align:middle;"></div>
          <div class="companyType">
            <label>姓名：</label>
            <span class="labelcss">{{item.name}}</span>
          </div>
          <div class="companyType">
            <label>电话：</label>
            <span class="labelcss">{{item.telephone}}</span>
          </div>
          <div class="companyType">
            <label>邮箱：</label>
            <span class="labelcss">{{item.email}}</span>
          </div>
          <div class="companyType">
            <label>办事处：</label>
            <span class="labelcss">{{item.officeName}}</span>
          </div>
          <div class="companyType">
            <label>部门：</label>
            <span class="labelcss">{{item.departmentName}}</span>
          </div>
          <div class="companyType">
            <label>岗位：</label>
            <span class="labelcss">{{item.postName}}</span>
          </div>
          <div class="companyType">
            <label>状态：</label>
            <span class="labelcss">{{item.flagName}}</span>
          </div>
          <div class="clear"></div>
        </li>
        <div style="margin:0 auto;width:60px" v-show='loading'>
          <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto">
          </mt-spinner>
        </div>
        <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>
          全部加载完毕
        </div>
        <div style="padding:20px; text-align:center; color:gray" v-show='noData'>
          查询暂无数据！
        </div>
      </ul>
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import { MessageBox } from 'mint-ui';
  import { Indicator } from 'mint-ui';
  export default {
    data() {
      return {
        noData:false,
        officeId: '',
        departmentId: '',
        GangweiId: "",
        loading: false,
        workerList: [],
        totalPage: 1,
        loadAll: false,
        currentPage: 1,
        pageSize: 10,
        showSearch: false,
        Banshichu: '',
        showGangweiPop: false,
        showBanshichuPop: false,
        showBumenPop: false,
        // ----------------------------------------
        Banshichu: '',
        BanshichuId: '',
        slotsBanshichu: [{
          flex: 1,
          values: [],
          className: 'slotsBanshichu',
          textAlign: 'center',
          defaultIndex: 1,
        }],
        // ----------------------------------------
        Bumen: '',
        BumenId: '',
        slotsBumen: [{
          flex: 1,
          values: [],
          className: 'slotsBumen',
          textAlign: 'center',
          defaultIndex: 1,
        }],
        // ----------------------------------------
        Gangwei: '',
        GangweiId: '',
        slotsGangwei: [{
          flex: 1,
          values: [],
          className: 'slotsGangwei',
          textAlign: 'center',
          defaultIndex: 1,
        }],
      }
    },
    props: {
      statusType: {
        type: Number,
        default: '1'
      },
    },
    mounted: function() {
    },
    methods: {
      onValChangeGangwei: function(picker, values) {
        if (values[0] == undefined) {
          return
        }
        this.Gangwei = values[0].name;
        this.GangweiId = values[0].id;
      },
      tab3: function(BumenId) {
        var self = this;
        if (BumenId == '') {
          MessageBox.alert( '请先选择部门！','提示');
          return
        } else {
          self.slotsGangwei[0].values = [];
          axios.post(self.html_url + self.Apilist.selectPostListPaging, { departmentId: self.BumenId }).then(function(data) {
            var listTemp = data.data.data;
            if (listTemp.length == 0) {
              MessageBox.alert('暂无选项！','提示');
              return
            }
            for (var i = 0; i < listTemp.length; i++) {
              self.slotsGangwei[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
            }
            self.showGangweiPop = true;
          }).catch(function(e) {});
        }
      },
      //---------------------------------------------------------------------------------------
      onValChangeBumen: function(picker, values) {
        if (values[0] == undefined) {
          return
        }
        this.Bumen = values[0].name;
        this.BumenId = values[0].id;
        this.Gangwei ='';
        this.GangweiId = '';
      },
      tab2: function(BanshichuId) {
        var self = this;
        if (BanshichuId == '') {
          MessageBox.alert( '请先选择办事处！','提示');
          return
        } else {
          self.slotsBumen[0].values = [];
          axios.post(self.html_url + self.Apilist.selectDepartmentListPaging, { officeId: self.BanshichuId }).then(function(data) {
            var listTemp = data.data.data;
            if (listTemp.length == 0) {
              MessageBox.alert('暂无选项！','提示');
              return
            }
            for (var i = 0; i < listTemp.length; i++) {
              self.slotsBumen[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
            }
            self.showBumenPop = true;
          }).catch(function(e) {});
        }
      },
      //---------------------------------------------------------------------------------------
      onValChangeBanshichu: function(picker, values) {
        if (values[0] == undefined) {
          return
        }
        this.Banshichu = values[0].name;
        this.BanshichuId = values[0].id; 
        this.Gangwei ='';
        this.GangweiId = '';
        this.Bumen = '';
        this.BumenId = '';
      },
      tab1: function() {
        var self = this;
        self.slotsBanshichu[0].values = [];
        axios.post(self.html_url + self.Apilist.selectEmployeeOffice, {}).then(function(data) {
          var listTemp = data.data.data;
          if (listTemp.length == 0) {
            MessageBox.alert('暂无选项！','提示');
            return
          }
          for (var i = 0; i < listTemp.length; i++) {
            self.slotsBanshichu[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
          }
          self.showBanshichuPop = true;
        }).catch(function(e) {});
      },
      //------------------------------------------------------------------------------------
      searchWorker: function() {      //查询
        this.currentPage=1;
        this.loadAll = false;
        this.noData = false;
        this.workerList = [];
        this.loadMore();
      },
      searchInit:function(){            //重置
        this.Banshichu = '';
        this.Bumen  = '';
        this.Gangwei  = '';
        this.BanshichuId='';
        this.BumenId='';
        this.GangweiId='';
        this.loadAll = false;
        this.noData = false;
        this.workerList = [];
        this.showSearch = false;
      },
      loadMore: function() {
        var self = this;
        var param = {
          officeId: self.BanshichuId,
          departmentId: self.BumenId,
          postId: self.GangweiId,
          pagingRequired: true,
          currenPage:self.currentPage,
          pageRows:10
        };
        if ((self.BanshichuId == '') && (self.BumenId == '') && (self.GangweiId == '')) {
          MessageBox.alert( '请选择查询条件！','提示');
          return
        }
        if (self.currentPage > self.totalPage) {
          return;
        }
        self.loading = true;
        Indicator.open({
          text: '加载中...',
          spinnerType: 'fading-circle'
        });
        axios.post(self.html_url + self.Apilist.selectEmployeeInfoPagingList, param).then(function(data) {
          Indicator.close();
          self.workerList = self.workerList.concat(data.data.data);
          self.loading = false;
          self.showSearch = true;
          if (data.data.totalPage == 0 || data.data.totalPage == null) {
            self.noData = true;
            return
          }
          self.totalPage = data.data.totalPage;
          if (self.currentPage == data.data.totalPage) {
            self.loadAll = true;
          }
          self.currentPage = self.currentPage + 1;
        }).catch(function(e) {});
      },
      back: function() {
        this.$router.go(-1);
      },
      goDetail: function(id) {              //查看员工详情
        this.$router.push({path: '/workerDetail',query: {id: id,}});
      }
    }
  }
</script>
<style scoped>
  .head {width: 70px;height: 80px;
 background: url("http://fttx-sale-staticsource.oss-cn-hangzhou.aliyuncs.com/test/mobile/static/image/head.png") no-repeat;position: absolute;right: 5px;top: 21px;}
  .searchWorker li {font-size: 14px;}
  .searchList ul li label{ color:#999;font-size: 14px; }
</style>
<style>
  .humanSearchWorker .mint-cell-wrapper{color: #5e67fc;text-align: left;font-size: 14px;height:36px;}
  .humanSearchWorker .mint-field .mint-cell-title {width: 60px;-webkit-box-flex: 0;-ms-flex: none;flex: none;text-align: left!important;color: #2894e5!important;}
</style>
