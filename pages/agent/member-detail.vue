<template>
	<view class="container">
	   <view class="welcome">张小明</view>
	   <view class="flex numbox">
	   	<view class="numitem">
	   		<view class="number">{{info.orderNum||0}}</view>
	   		<view>本月订单数</view>
	   		
	   	</view>
	   	<view class="numitem">
	   		<view class="number">{{info.income||0}}</view>
	   		<view>本月收益(元)</view>
	   	</view>
	   </view>
	   
	   <view class="item-list flex" @click="clickItem">
	   	<view class="left-name">绑定的医生</view>
	   	<view  style="padding-right:20rpx;">12</view>
	   	<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
	   </view>
	   
	</view>
</template>

<script>
	const app = getApp();
	export default {
	
		data() {
			return {
				list: [1,2,3],
				info:{}
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods: {
			clickItem(){
				uni.navigateTo({
					url:'doctor-list'
				})
			}
		
		},

	}
</script>

<style lang="scss">
	.container{
		height: 100vh;background-color: #F5F6F6;overflow-y: auto;
		.welcome{line-height:110rpx;padding-left:50rpx;}
		.numbox{
			padding:60rpx 30rpx;background:#fff;
			.numitem{
				width:50%;text-align:center;font-size: 30rpx;box-sizing:border-box;
				&:nth-child(1){border-right:2rpx solid #ddd;}
				.number{
					font-size: 52rpx;padding-bottom:10rpx;
					color: #4B8BE8;
				}
			}
			
		}
		
		.item-list{
			background-color: #FFFFFF;
			height: 108rpx;margin-top:10rpx;
			position: relative;padding-right:40rpx;
			.left-name{
				height: 106rpx;flex:1;
				line-height: 106rpx;
				font-size: 32rpx;
				color: #333333;
				padding-left: 60rpx;
			}
			.right-arrow{
				width: 18rpx;
			}
			.line{
				height: 6rpx;
				background-color: #F5F6F6;
			}
		}
	}
	
</style>
