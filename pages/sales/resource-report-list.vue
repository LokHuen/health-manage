<template>
	<view class="container">
		<view class="title">我的报备</view>
		<view class="list-box" v-for="(item,index) in list">
			<view class="list-title">医生</view>
			<view class="list-desc">中山医院</view>
			<view class="list-desc">内科</view>
			<view style="height: 20rpx;"></view>
			<view class="remove">移除</view>
		</view>
		
		<view class="button-box">
			<button type="default" class="button" @click="submit">报备资源</button>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
	
		data() {
			return {
			   list:[1,2,3]
			}
		},
		onLoad(){
			
		},
		onShow(){
			this.getData();
		},
		methods: {
			submit(){
				uni.navigateTo({
					url:'resource-report'
				})
			}
		
			
		},

	}
</script>

<style lang="scss">
	.container{
		height: 100vh;background-color: #F5F6F6;overflow-y: auto;
		.title{
			margin-top: 30rpx;
			margin-left: 50rpx;
			font-size: 26rpx;
		}
		.list-box{
			margin-top: 20rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			background-color: #FFFFFF;
			position: relative;
			.list-title{
				padding-top: 20rpx;
				margin-left: 20rpx;
				font-size: 26rpx;
				color: #666666;
			}
			.list-desc{
				margin-left: 20rpx;
				margin-top: 20rpx;
				color: #333333;
				font-size: 30rpx;
			}
			.remove{
				position: absolute;
				color: #4B8BE8;
				right: 20rpx;
				bottom: 20rpx;
				font-size: 26rpx;
			}
		}

		.button-box {
			position: fixed;
			bottom: 0;
			height: 140rpx;
			width: 100%;
		
			.button {
				height: 90rpx;
				line-height: 90rpx;
				width: 81%;
				background-color: #4B8BE8 !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17px;
			}
		}
	}
	
	
</style>
