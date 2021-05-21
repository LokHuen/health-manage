<template>
	<view class="">
		<view class="successbox">
			<image class="successimg" mode="widthFix" src="../../static/icon/submit_sucess_icon.png"></image>
			<view class="keytext">操作成功，请留意邮件信息</view>
			
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
				uni.navigateBack({});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.successbox{margin:150rpx 0 0;text-align:center;
		.successimg{width:150rpx;height:auto;}
		.keytext{font-size: 36rpx;margin:50rpx 0 0rpx;color:#272727;}
	}
	.successbt{line-height: 88rpx;background:$maincolor;border-radius: 45rpx;font-size: 38rpx;color: #fff;text-align:center;position:fixed;bottom:200rpx;left:50%;margin-left:-200rpx;width:400rpx;}
	page{border-top:0px solid #eee;}
</style>
