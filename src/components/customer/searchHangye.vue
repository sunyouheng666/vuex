<template id="searchHangye">
  <div class="searchHangye">
    <div class="e-nav">
      <span class="e-nav-item" :class="showHangye==true?'active':''" @click="tabHangye">精确查询</span>
      <span class="e-nav-item" :class="showMohu==true?'active':''" @click="tabMohu">模糊查询</span>
    </div>
    <div v-if="showHangye">
      <mt-field label="一级" placeholder="请选择" v-model="oneLevel" @click.native="showOne" readonly></mt-field>
      <mt-field label="二级" placeholder="请选择" v-model="twoLevel" @click.native="showTwo(oneLevelId)" readonly></mt-field>
      <mt-field label="三级" placeholder="请选择" v-model="threeLevel" @click.native="showThree(twoLevelId)" readonly></mt-field>
      <mt-field label="四级" placeholder="请选择" v-model="fourLevel" @click.native="showFour(threeLevelId)" readonly></mt-field>
      <mt-popup v-model="showOneLevelPop" position="bottom" style='width:100%'>
        <div class="title-pop">一级行业</div>
        <mt-picker :slots="slotsOneLevel" ref="pickerOneLevel" @change="onValChangeOneLevel" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showOneLevelPop"></mt-picker>
      </mt-popup>
      <mt-popup v-model="showTwoLevelPop" position="bottom" style='width:100%'>
        <div class="title-pop">二级行业</div>
        <mt-picker :slots="slotsTwoLevel" ref="pickerTwoLevel" @change="onValChangeTwoLevel" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showTwoLevelPop"></mt-picker>
      </mt-popup>
      <mt-popup v-model="showThreeLevelPop" position="bottom" style='width:100%'>
        <div class="title-pop">三级行业</div>
        <mt-picker :slots="slotsThreeLevel" ref="pickerThreeLevel" @change="onValChangeThreeLevel" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showThreeLevelPop"></mt-picker>
      </mt-popup>
      <mt-popup v-model="showFourLevelPop" position="bottom" style='width:100%'>
        <div class="title-pop">四级行业</div>
        <mt-picker :slots="slotsFourLevel" ref="pickerFourLevel" @change="onValChangeFourLevel" :visibleItemCount='3' valueKey="name" style='width:100%' :itemHeight='50' v-if="showFourLevelPop"></mt-picker>
      </mt-popup>
      <div class="searchList" >
        <div style="padding-top:8px; padding-left:4px;background:#5e67fc; height:30px;margin-top:10px; line-height:26px; text-align:center;color: #fff;" v-if="showSearchCustomer">查询结果</div>
        <div class="searchList">
          <ul class='shou-list' v-infinite-scroll="loadMoreHangye" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10" style="margin-top: 0px;">
            <li v-for="item in customerList" @click='goDetail(item)' style="padding:5px 0;">
              <div class="line"></div>
              <div class="companyName"> {{item.cName}}</div>
              <div class="companyType">  
                <span class="labelcss">网址：</span>
                {{item.homepage}}
              </div>
              <div class="companyType"> 
                <span class="labelcss">主营产品：</span>
                {{item.mainProductsName | sliceProductsName}}
              </div>
              <div class="companyType"> 
                <span class="labelcss">市场销售员：</span>
                {{item.salesmanName==null||item.salesmanName==''?'无':item.salesmanName}}
              </div>
              <div class="companyType"> 
                <span class="labelcss">外贸管理顾问：</span>
                {{item.saleManageName==null||item.saleManageName==''?'无':item.saleManageName}}
              </div>
              <div class="companyType" style="text-align: right;" v-show="item.isVisible == 0">
                没有访问权限！
              </div> 
              <div class="clear"></div>
            </li>
            <div style=" margin:0 auto;width:60px" v-show='loading'>
              <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto"></mt-spinner>
            </div>
            <div style="padding:20px; text-align:center; color:gray " v-show='loadAll'>
              全部加载完毕!
            </div>
            <div style="padding:20px; text-align:center; color:gray" v-show='noData1'>
              无符合条件的客户！
            </div>
          </ul>
        </div>
      </div>
    </div>
    <div v-if="showMohu">
      <div style="margin:5px 0;position: relative;" class="mhc" >
        <mt-field label="" placeholder="输入行业关键字" v-model="likeWord" style="background-image: none;border:none;width: 80%;" :attr="{ maxlength: 100 }"></mt-field>
        <mt-button type="primary" size="small" @click.native.stop='loadMoreHangyeLikeFn' style="position: absolute;top:11px;right: 8px;height:26px;background:#5e67fc;">   
          查询
        </mt-button>
      </div>
      <div class="searchList" >
        <div style="padding-top:8px; padding-left:4px;background:#5e67fc; height:30px;margin-top:10px; line-height:26px; text-align:center;color: #fff;" v-show="showSearchCustomer2">查询结果</div>
        <div class="searchList">
          <ul class='shou-list' v-infinite-scroll="loadMoreHangyeLike" infinite-scroll-immediate-check="true" infinite-scroll-disabled="loading" infinite-scroll-distance="10" style="margin-top: 0px;">
            <li v-for="item in customerListLike" @click='goDetail(item)' style="padding:5px 0;">
              <div class="line"></div>
              <div class="companyName"> {{item.cName}}</div>
              <div class="companyType">  
                <span class="labelcss">网址：</span>
                {{item.homepage}}
              </div>
              <div class="companyType"> 
                <span class="labelcss">主营产品：</span>
                {{item.mainProductsName | sliceProductsName}}
              </div>
              <div class="companyType"> 
                <span class="labelcss">市场销售员：</span>
                {{item.salesmanName==null||item.salesmanName==''?'无':item.salesmanName}}
              </div>
              <div class="companyType"> 
                <span class="labelcss">外贸管理顾问：</span>
                {{item.saleManageName==null||item.saleManageName==''?'无':item.saleManageName}}
              </div>
              <div class="companyType" style="text-align: right;" v-show="item.isVisible == 0">
                没有访问权限！
              </div> 
              <div class="clear"></div>
            </li>
            <div style=" margin:0 auto;width:60px" v-show='loading'>
              <mt-spinner type="fading-circle" :size="40" color="rgb(900, 100, 100)" style="padding:10px; margin:0 auto"></mt-spinner>
            </div>
            <div style="padding:20px; text-align:center; color:gray" v-show='loadAll'>全部加载完毕</div>
            <div style="padding:20px; text-align:center; color:gray" v-show='noData2'>查询暂无数据！</div>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';
import axios from 'axios';
export default {
  data() {
    return {
      // selectedHangye: 'jcx',          //tab页ID
      showSearchCustomer: false,      //精确查询结果
      showSearchCustomer2: false,     //模糊查询结果
      noData1:false,                  //精确查询暂无数据！
      customerList:[],                //精确查询结果
      currentPage: 1,                 //精确查询当前页
      totalPage:0,                    //精确查询总页数
      noData2:false,                  //模糊查询暂无数据！
      customerListLike:[],            //模糊查询结果
      currentPageLike:1,              //模糊查询当前页
      totalPageLike:1,                //模糊查询总页数
      loading:false,                  //加载中
      loadAll:false,                  //全部加载完毕
      showMohu: false,                //显示模糊查询
      showHangye: true,               //显示精确查询
      likeWord: '',                   //模糊搜索
      oneLevel: '',                   //一级行业名称
      oneLevelId: '',                 //一级行业ID
      slotsOneLevel: [{
        flex: 1,
        values: [],
        className: 'slotsOneLevel',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showOneLevelPop: false,         //一级行业弹窗
      twoLevel: '',                   //二级行业名称
      twoLevelId: '',                 //二级行业ID
      slotsTwoLevel: [{
        flex: 1,
        values: [],
        className: 'slotsTwoLevel',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showTwoLevelPop: false,         //二级行业弹窗
      threeLevel: '',                 //三级行业名称
      threeLevelId: '',               //三级行业ID
      slotsThreeLevel: [{
        flex: 1,
        values: [],
        className: 'slotsThreeLevel',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showThreeLevelPop: false,       //三级行业弹窗
      fourLevel: '',                  //四级行业名称
      fourLevelId: '',                //四级行业名称
      slotsFourLevel: [{
        flex: 1,
        values: [],
        className: 'slotsFourLevel',
        textAlign: 'center',
        defaultIndex: 1,
      }],
      showFourLevelPop: false,        //四级行业弹窗
    }
  },
  props: {

  },
  watch:{
    // 'selectedHangye':function(n,o){
    //   this.loadAll = false;
    //   this.noData1 = false;
    //   this.noData2 = false;
    //   this.showSearchCustomer = false;
    //   this.showSearchCustomer2 = false;
    // },
    'showHangye':function(n,o){
      this.loadAll = false;
      this.noData1 = false;
      this.noData2 = false;
      this.showSearchCustomer = false;
      this.showSearchCustomer2 = false;
    },
    // 'showMohu':function(n,o){
    //   this.loadAll = false;
    //   this.noData1 = false;
    //   this.noData2 = false;
    //   this.showSearchCustomer = false;
    //   this.showSearchCustomer2 = false;
    // } 
  },
  mounted: function() {
  },
  methods: {
    getLevelId: function() {                  //获得行业ID
      var productId = '';
      if (this.fourLevelId != '') {
        productId = this.fourLevelId;
        return productId;
      } else if (this.threeLevelId != '') {
        productId = this.threeLevelId;
        return productId;
      } else if (this.twoLevelId != '') {
        productId = this.twoLevelId;
        return productId;
      } else {
        productId = this.oneLevelId;
        return productId;
      }
    },
    tabMohu: function() {                     //点击模糊查询
      this.showHangye = false;
      this.showMohu = true;
      this.customerListLike = [];
      this.noData1 = false;
      this.noData2 = false;
      this.likeWord = '';
      this.$emit('showHangyeChange',this.showHangye);
    },
    tabHangye: function() {                   //点击精确查询
      this.showHangye = true;
      this.$emit('showHangyeChange',this.showHangye);
      this.oneLevel = '';
      this.oneLevelId = '';
      this.twoLevel = '';
      this.twoLevelId = '';
      this.threeLevel = '';
      this.threeLevelId = '';
      this.fourLevel = '';
      this.fourLevelId = '';
      this.showMohu = false;
      this.customerList = [];
      this.noData1 = false;
      this.noData2 = false;
    },
    loadMoreHangyeLikeFn: function() {        //模糊查询
      this.customerListLike = [];
      this.currentPage = 1;
      this.totalPage = 1;
      this.currentPageLike = 1;
      this.totalPageLike = 1;
      this.noData2 = false;
      this.noData1 = false;
      this.loadMoreHangyeLike();
    },
    loadMoreHangyeLike: function() {          //执行模糊查询
      var self = this;
      var pId_temp = self.likeWord;
      if (pId_temp == '') {
        MessageBox.alert('请输入查询条件！','提示');
        return
      }
      if (self.currentPageLike > self.totalPageLike) {
        return;
      }
      var param = {
        productName: pId_temp, 
        pagingRequired: true,
        pageRows:10,
        currenPage: self.currentPageLike
      };
      self.loading = true;
      axios.post(self.html_url + self.Apilist.AccurateVague, param).then(function(data) {
        self.loading = false;
        if (data.data.totalPage == 0 || data.data.totalPage == null) {
          self.noData2 = true;
        }
        self.customerListLike = self.customerListLike.concat(data.data.data);
        self.totalPageLike = data.data.totalPage;
        if (self.currentPageLike == self.totalPageLike) {
          self.loadAll = true;
        }
        self.currentPageLike = self.currentPageLike + 1;
        self.showSearchCustomer2 = true;
      }).catch(function(e) {
        self.loading = false;
      }); 
    },
    searchCustomerHangye: function() {        //按行业精确查询      
      var self = this;
      self.showHangye = true;
      self.showMohu = false;
      self.doSearch = true;
      self.customerList = [];
      self.currentPage = 1;
      self.totalPage = 1;
      self.loadMoreHangye()
    },
    loadMoreHangye: function() {              //执行精确查询
      if (!this.doSearch) {
        return
      }
      var self = this;
      var pId_temp = this.getLevelId();
      if (pId_temp == '') {
        MessageBox.alert('请选择行业！','提示');
        return
      }
      var param = {
        productId: pId_temp, 
        pagingRequired: true,
        pageRows:10,
        currenPage: self.currentPage
      };
      if (this.currentPage > this.totalPage) {
        return;
      }
      self.loading = true;
      axios.post(self.html_url + self.Apilist.AccurateIndustry,param).then(function(data) {
        if (data.data.totalPage == 0 || data.data.totalPage == null) {
          self.noData1 = true;
        }
        self.showSearchCustomer = true;
        self.customerList = self.customerList.concat(data.data.data);
        self.loading = false;
        if (self.customerList.length == 0) {
          MessageBox.alert( '暂无查询结果！','提示');
          return
        }
        self.totalPage = data.data.totalPage;
        if (self.currentPage == data.data.totalPage) {
          self.loadAll = true;
        }
        self.currentPage = self.currentPage + 1;
        

      }).catch(function(e) {
        self.loading = false;
      });
    },
    onValChangeFourLevel: function(picker, values) {  //四级行业选择
      if (values[0] == undefined) {
        return
      }
      this.fourLevel = values[0].name;
      this.fourLevelId = values[0].id;
      this.customerList = [] 
    },
    showFour: function(threeId) {                     //四级行业弹框
      var self = this;
      if (threeId == '') {
        MessageBox.alert('请先选择三级行业！','提示');
        return
      }
      self.slotsFourLevel[0].values = [];
      axios.post(self.html_url + self.Apilist.selectProductList, { pId: threeId }).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox.alert( '暂无选项！','提示');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsFourLevel[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
        }
        self.showFourLevelPop = true;
      }).catch(function(e) {});
    },
    onValChangeThreeLevel: function(picker, values) { //三级行业选择
      if (values[0] == undefined) {
        return
      }
      this.threeLevel = values[0].name;
      this.threeLevelId = values[0].id;
      this.fourLevel = '';
      this.fourLevelId = '';
      this.customerList = []
    },
    showThree: function(twoId) {                     //三级行业弹框
      var self = this;
      if (twoId == '') {
        MessageBox.alert( '请先选择二级行业！','提示');
        return
      }
      self.slotsThreeLevel[0].values = [];
      axios.post(self.html_url + self.Apilist.selectProductList, { pId: twoId }).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox.alert( '暂无选项！','提示');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsThreeLevel[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
        }
        self.showThreeLevelPop = true;
      }).catch(function(e) {});
    },
    onValChangeTwoLevel: function(picker, values) { //二级行业选择
      if (values[0] == undefined) {
        return
      }
      this.twoLevel = values[0].name;
      this.twoLevelId = values[0].id;
      this.threeLevel = '';
      this.threeLevelId = '';
      this.fourLevel = '';
      this.fourLevelId = '';
      this.customerList = []
    },
    showTwo: function(oneId) {                      //二级行业弹框
      var self = this;
      if (oneId == '') {
        MessageBox.alert('请先选择一级行业！','提示');
        return
      }
      self.slotsTwoLevel[0].values = [];
      axios.post(self.html_url + self.Apilist.selectProductList, { pId: oneId }).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox.alert( '暂无选项！','提示');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsTwoLevel[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
        }
        self.showTwoLevelPop = true;
      }).catch(function(e) {});
    },
    onValChangeOneLevel: function(picker, values) { //一级行业选择
      if (values[0] == undefined) {
        return
      }
      this.oneLevel = values[0].name;
      this.oneLevelId = values[0].id;
      this.twoLevel = '';
      this.twoLevelId = '';
      this.threeLevel = '';
      this.threeLevelId = '';
      this.fourLevel = '';
      this.fourLevelId = '';
      this.customerList = []
    },
    showOne: function() {                           //一级行业弹窗
      var self = this;
      self.slotsOneLevel[0].values = [];
      axios.post(self.html_url + self.Apilist.selectProductList, {}).then(function(data) {
        var listTemp = data.data.data;
        if (listTemp.length == 0) {
          MessageBox.alert( '暂无选项！','提示');
          return
        }
        for (var i = 0; i < listTemp.length; i++) {
          self.slotsOneLevel[0].values.push({ id: listTemp[i].id, name: listTemp[i].name });
        }
        self.showOneLevelPop = true;
      }).catch(function(e) {});
    },
    goDetail(obj){                                  //查看详情
      if(obj.isVisible == 0){
        MessageBox.alert('没有访问权限！','提示');
        return false; 
      }else{
        this.$router.push({ path: '/customerDetail',query: {'customerId': obj.id, 'pageType':'2' }});
      } 
    }
  }
}
</script>
<style>
  .mhc .mint-cell-value input{border:1px solid #999;border-radius: 4px; font-size: 14px;}
  .searchHangye .mint-cell-wrapper{background-image: none;text-align: left;font-size: 14px;}
  .searchHangye .mint-cell-wrapper .mint-cell-title{width: 60px;}
  .searchHangye .mint-field .mint-cell-title{width: 60px!important;}
</style>