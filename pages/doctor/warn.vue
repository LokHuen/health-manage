<template>
	<view class="">
		<image src="../../static/warn.jpg" style="width: 100vw;" mode="widthFix"></image>
	</view>
</template>

<script>
	let app = getApp();
	export default {
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				imgUrl:app.globalData.imageUrl,
				
			}
		},
		onLoad(options){
			
		},
		onShow(){
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	
</style>
