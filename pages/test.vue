<template>
	<view class="" style="text-align:center;padding-top:40vh;" @click="loginagain">
		uid:{{id}}
	<view >点击重新登录</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				id:app.getCache("uid"),
				baseUrl:app.globalData.baseUrl,
				imgUrl:app.globalData.imageUrl,
				
			}
		},
		onLoad(options){
			
		},
		onShow(){
			
		},
		methods: {
			loginagain(){
				localStorage.removeItem("uid");
				localStorage.removeItem("salesToken");
				let windowUrl;
				windowUrl = window.location.href;
				
				window.location.href = this.baseUrl + '/wx/fwh/user/auth/index?returnUrl=' + encodeURIComponent(windowUrl)+"&channel=1";
			}
		}
	}
</script>

<style lang="scss">
	
</style>
