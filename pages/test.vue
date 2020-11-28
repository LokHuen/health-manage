<template>
	<view class="">
		uid:{{id}}
	<view @click="loginagain">重新登录</view>
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
				let windowUrl;
				windowUrl = window.location.href;
				
				window.location.href = this.baseUrl + '/wx/fwh/user/auth/index?returnUrl=' + encodeURIComponent(windowUrl);
			}
		}
	}
</script>

<style lang="scss">
	
</style>
