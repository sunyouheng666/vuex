/**
 * http配置
 */
import axios from 'axios'
import { Toast } from 'mint-ui'
axios.defaults.timeout = 500000
axios.defaults.withCredentials = true
axios.defaults.headers.contentType = 'application/json'
// http请求拦截器
axios.interceptors.request.use(config => {
	return config;
}, error => {
	Toast('加载超时');
	return Promise.reject(error);
})
// http响应拦截器
window.isOut = false
axios.interceptors.response.use(data => { // 响应成功关闭loading
	if(!data.data.success){
		if(data.data.data != null && data.data.data.redirectUrl== ""){
			if (!window.isOut) {
				window.isOut = true;
				Toast('登录状态已过期或用户权限已经更改！请重新登录。');
			}
            window.location.href="/login";
        }else{
			Toast(data.data.errMsg);
			return Promise.reject(data);
		}
	}
	return data;
}, error => {
	Toast('网络无连接或加载失败');
	return Promise.reject(error);
})
export default axios