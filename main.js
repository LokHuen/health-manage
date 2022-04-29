import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
Vue.prototype.$imageUrl = "https://bgjdapi.ttxyw.cn/upload/mini"
App.mpType = 'app'

const app = new Vue({
	...App
})
app.$mount()
