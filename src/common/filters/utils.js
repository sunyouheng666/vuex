let timer = (value, type) => {
  let time_html = '';
  if (value==''||value==null) {
    return time_html
  }
  time_html = new Date(value);
  let y = time_html.getFullYear();
  let m = time_html.getMonth() + 1;
  m < 10 && (m = '0' + m);
  let d = time_html.getDate();
  d < 10 && (d = '0' + d);
  let h = time_html.getHours();
  let M = time_html.getMinutes();
  M < 10 && (M = '0' + M);
  var now = new Date();
  var nowY = now.getFullYear();
  var nowM = now.getMonth() + 1;
  nowM < 10 && (nowM = '0' + nowM);
  var nowD = now.getDate();
  nowD < 10 && (nowD = '0' + nowD);
  if ((y + "-" + m + "-" + d) == (nowY + "-" + nowM + "-" + nowD)) {
    time_html = h + ':' + M;
  } else {
    time_html = y + "-" + m + "-" + d;
  }
  if (type == 'sfm') {
    time_html = y + "-" + m + "-" + d + " " + h + ':' + M;
  }
  return time_html;
}
let showDate = (value, type) => {
  let time_html = '';
  if(value == null){
    return time_html = '无';
  }
  time_html = new Date(value);
  let y = time_html.getFullYear();
  let m = time_html.getMonth() + 1;
  m < 10 && (m = '0' + m);
  let d = time_html.getDate();
  d < 10 && (d = '0' + d);
  let h = time_html.getHours();
  let M = time_html.getMinutes();
  M < 10 && (M = '0' + M);
  var now = new Date();
  var nowY = now.getFullYear();
  var nowM = now.getMonth() + 1;
  nowM < 10 && (nowM = '0' + nowM);
  var nowD = now.getDate();
  nowD < 10 && (nowD = '0' + nowD); 
  time_html = y + "-" + m + "-" + d; 
  if (type == 'sfm') {
    time_html = y + "-" + m + "-" + d + " " + h + ':' + M;
  }
  return time_html;
}
let TimeCut = (value, type) => {
  let data_html = value;
  if(data_html == null || data_html == undefined){
    data_html = "无";
  }else{
    data_html = data_html.substr(0,10);
  }
  return data_html;
}
let  phoneSeconds=(value)=>{
  let seconds_html = Number(value);
  if(seconds_html<=60){
    value<10 && (value = '0' + value)
    seconds_html = '00`'+value+"``";
  }else if(seconds_html>60){
    let m1 = parseInt(seconds_html/60);
    m1 < 10 && (m1 = '0' + m1);
    let m2 = seconds_html%60;
    m2 < 10 && (m2 = '0' + m2);       
    seconds_html =m1+'`'+m2+"``";
  }
  return seconds_html;
}
let receiveStatus = (value) => {
  var status = '';
  switch (value) {
    case true:
      status = "已读";
      break;
    case false:
      status = "未读";
      break;
  }
  return status
}

let customerType = (value) => {
  var status = '';
  switch (value) {
    case null:
      status = "无";
      break;
    case '':
      status = "无";
      break;
    case 1:
      status = "公开客户";
      break;
    case 2:
      status = "保留客户";
      break;
    case 3:
      status = "合作客户";
      break;
    case 4:
      status = "热门客户";
      break;
    case 5:
      status = "市场保留";
      break;
  }
  return status
}
let mailStatue = (value) => {
  var status = '';
  switch (value) {
    case true:
      status = "已读";
      break;
    case false:
      status = "未读";
      break;
    case -1:
      status = "存草稿";
      break;
    case 0:
      status = "发送失败";
      break;
    case 1:
      status = "已提交发送";
      break;
    case 2:
      status = "发送成功";
      break;
  }
  return status
}
let companySize = (value) => {
  var status = '';
  switch (value) {
    case 0:
      status = "未填写";
      break;
    case 1:
      status = "1-20";
      break;
    case 2:
      status = "21-50";
      break;
    case 3:
      status = "51-100";
      break;
    case 4:
      status = "101-200";
      break;
    case 5:
      status = "201-500";
      break;
    case 6:
      status = "501-1000";
      break;
    case 7:
      status = "1001以上";
      break;
    case null:
      status = "无";
      break;
    case '':
      status = "无";
      break;
  }
  return status
}
let salesNum = (value) => {
  var status = '';
  switch (value) {
    case "":
      status = "无";
      break;
    case null:
      status = "无";
      break;
    case '1':
      status = "1-50万";
      break;
    case '2':
      status = "51-100万";
      break;
    case '3':
      status = "101-200万";
      break;
    case '4':
      status = "201-500万";
      break;
    case '5':
      status = "1001-5000万";
      break;
    case '6':
      status = "5001-10000万";
      break;
    case '7':
      status = "1亿及以上";
      break;
  }
  return status
}


let boxType = (value) => {
  var status = '全部';
  switch (value) {
    case -1:
      status = "收件箱";
      break;
    case -5:
      status = "发件箱";
      break;
    case -3:
      status = "草稿箱";
      break;
    case -101:
      status = "垃圾箱";
      break;
    case -11:
      status = "归并箱";
      break;
  }
  return status
}
 let feedBackStatus = (value) => {
  var status = ' ';
  switch (value) {  
    case 1:
      status = "未跟踪";
      break;
    case 2:
      status = "已跟踪";
      break;
    case 3:
      status = "已签约";
      break;
    
  }
  return status
}

 let changeTime = (value) => {
    var timeHaoMiao = '';
    if (value!='' && value!= null) {
      var time = value.replace(new RegExp("-","gm"),"/");
       timeHaoMiao = (new Date(time)).getTime(); //得到毫秒数
    }
    return timeHaoMiao 
}   
let getTimeStr = (value) => {
  var status = value.substr(0,10);
  return status
}
let getsex = (value) => {
  var status = '';
  switch (value) {
    case 1:
      status = "男";
      break;
    case 2:
      status = "女";
      break;
  }
  return status
}
let textCut = (value) => {
  let data_html = value;
    if(data_html == '' || data_html == null){
        data_html = "无";
    }else{
      data_html = data_html.substr(0,2);
    }
    return data_html;
}

let sliceProductsName = (value) => {
  let data_html = value;
    if(data_html == '' || data_html == null){
        data_html = "无";
    }else{
      if(data_html.length >= 80){
        data_html = data_html.substr(0,80)+'...';
      }
    }
    return data_html;
}
export {
  TimeCut,
  customerType,
  changeTime,
  feedBackStatus,
  salesNum,
  companySize,
  showDate,
  timer,
  getsex,
  receiveStatus, //收件箱，归并箱
  boxType,
  phoneSeconds,
  getTimeStr,//截取时间
  textCut,//字符串截取
  sliceProductsName,        //主营产品截取
  mailStatue // 垃圾箱（收件箱，发件箱）
}