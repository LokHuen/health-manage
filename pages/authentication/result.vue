<template>
	<view class="">
		<view class="successbox">
			<image class="successimg" mode="widthFix" src="../../static/end.png"></image>
			<view class="keytext">信息已提交，等待平台审核</view>
			
		</view>
		<view class="successbt" @click="tomine">完 成</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				imgUrl:app.globalData.imageUrl,
				
			}
		},
		onLoad(options){
			
		},
		onShow(){
			
		},
		methods: {
			tomine(){
				uni.reLaunch({
					url:"/pages/mine/mine"
				})
			},
		}
	}
</script>

<style lang="scss">
	.successbox{margin:150rpx 0 0;text-align:center;
		.successimg{width:112rpx;height:auto;}
		.keytext{font-size: 36rpx;margin:50rpx 0 0rpx;color:#272727;}
	}
	.successbt{line-height: 88rpx;background: #E4E4E4;border-radius: 10rpx;font-size: 38rpx;color: #2FAF36;text-align:center;position:fixed;bottom:120rpx;left:50%;margin-left:-180rpx;width:360rpx;}
	page{border-top:1px solid #eee;}
</style>
