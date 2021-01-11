<template>
	<view class="container">
	   <view class="list-box" v-for="(item,index) in list">
		 <view style="height: 10rpx;"></view>
	   	 <view class="common">订单号:123456789</view>
		 <view class="common">商品名称:益爱宁</view>
		 <view class="common">下单时间:2020/09/01</view>
		 <view class="common">业务员:张敏</view>
		 <view class="common">实付款:100元</view>
		 <view style="height: 20rpx;"></view>
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
			
			
		},

	}
</script>

<style lang="scss">
	.container{
		height: 100vh;background-color: #F5F6F6;overflow-y: auto;
		.list-box{
			background-color: #fff;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-top: 20rpx;
            font-size: 26rpx;
			color: #666666;
			.common{
				margin-left: 30rpx;
				margin-top: 20rpx;
			}
		}
	}
	
</style>
