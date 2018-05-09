import WorkerInfo from './workerInfo.vue'
const workerInfo = {
	install: function(Vue) {
		Vue.component('workerInfo', WorkerInfo)
	}
}
export default workerInfo