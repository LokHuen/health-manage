<template>
	<view class="container">
		<view class="" v-for="(item,index) in list">
			<view class="time">
				2020年9月
			</view>
			<view class="flex numbox" @click="toOrder">
				<!-- <view style="height: 20rpx; background-color: #007AFF;"></view> -->
				
				<view class="numitem">
					<view class="number">{{info.orderNum||0}}</view>
					<view>订单数</view>
					
				</view>
				<view class="numitem">
					<view class="number">{{info.income||0}}</view>
					<view>订单总金额(元)</view>
				</view>
			</view>
			<view>
			
			</view>
			
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
		methods: {
			toOrder(){
				uni.navigateTo({
					url:'order-list'
				})
			}
			
		},

	}
</script>

<style lang="scss">
	.container{
		height: 100vh;background-color: #F5F6F6;overflow-y: auto;
		.time{
			margin-top: 30rpx;
			padding-left: 20rpx;
			padding-top: 20rpx;
			background-color: #fff;
		}
		.numbox{
			
			padding:60rpx 30rpx;
			background:#fff;
			.numitem{
				width:50%;text-align:center;font-size: 30rpx;box-sizing:border-box;
				&:nth-child(1){border-right:2rpx solid #ddd;}
				.number{
					font-size: 52rpx;padding-bottom:10rpx;
					color: #4B8BE8;
				}
			}
			
		}
		
		
	}
	
</style>
