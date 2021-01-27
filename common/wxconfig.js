import wx from '../plugins/jweixin.js'
import {api} from './api.js'

export default function setconfig() {
	return new Promise((resolve, reject) => {
		let localLink = location.href.split('#')[0];
		api.getWxConfig({url:localLink}).then(rs => {
			console.log("配置",rs.data)
			wx.config({
				debug: false, ////生产环境需要关闭debug模式
				appId: rs.data.appId, //appId通过微信服务号后台查看
				timestamp: rs.data.timestamp, //生成签名的时间戳
				nonceStr: rs.data.nonceStr, //生成签名的随机字符串
				signature: rs.data.signature, //签名
				jsApiList: ['updateAppMessageShareData', 'updateTimelineShareData', 'startRecord', 'stopRecord',
					'onVoiceRecordEnd', 'playVoice', 'pauseVoice', 'stopVoice', 'onVoicePlayEnd', 'uploadVoice',
					'downloadVoice', "onMenuShareTimeline",
					"onMenuShareAppMessage",
					"chooseImage",
					"previewImage",
					"uploadImage",
					"chooseWXPay",'wx-open-launch-weapp',
					"hideAllNonBaseMenuItem"
				], // 必填，需要使用的JS接口列表
				"openTagList": [
					"wx-open-launch-weapp"
				],
			});
			wx.ready(function() {
				console.log("config成功")
				resolve(wx)
			})
			wx.error(function(res) {
				console.log("config失败", res)
			})
		}).catch((err) => {
			throw new Error('签名出错', err);
		})
	})
}
