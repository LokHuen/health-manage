<template>
	<view class="">
	<image :src="img" style="width:100%;display:block;" mode="widthFix"></image>
	<wx-open-launch-weapp username="gh_e44479db8d50" :path='"pages/invite.html?type="+type' style="" class="otherbox">
		<script type="text/wxtag-template">
			<style>
				.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
			</style>
			<div class="otherbox"></div>
		</script>
	</wx-open-launch-weapp>
	</view>
</template>

<script>
	import setconfig from "../common/wxconfig.js"
	import wx from '../plugins/jweixin.js'
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				type:1,
				img:"",
			}
		},
		onLoad(opt={}){
			this.type = opt.type||1;
			this.img = this.baseUrl + "/info/common/invite"+this.type+".jpg";
			setconfig().then(res => {
				// if (!localStorage.getItem("reloadpage")) {
				// 	localStorage.setItem("reloadpage", 1);
				// 	location.reload();
				// }
			});
		},
		onShow(){
			
		},
		methods: {
			
		}
	}
</script>

<style scoped lang="scss">
	.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
	.flex{display: flex;align-items:center;flex-wrap:wrap;}
</style>
