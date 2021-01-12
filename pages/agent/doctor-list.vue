<template>
	<view class="container">
	   <view class="list-box" v-for="(item,index) in list" @click="selectItem(item)">
	   	   <image src="" mode="widthFix" class="img"></image>
		   <view class="info-box">
		   	<view class="name">张医生</view>
			<view class="hospital">中山医院</view>
		   </view>
		   <view class="number-box">
		   <text style="color: #007AFF;">78 </text>
		   <text>患者 </text>
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
		onShow(){
			
		},
		methods: {
			
		
		},

	}
</script>

<style lang="scss">
	.container{
		height: 100vh;background-color: #F5F6F6;overflow-y: auto;
		.list-box{
			height: 200rpx;
			margin-top: 20rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			background-color: #FFFFFF;
			display: flex;
			position: relative;
			.img{
				width: 140rpx;
				height: 140rpx;
				background-color: #999999;
				margin-left: 30rpx;
				margin-top: 30rpx;
				border-radius: 50%;
				
			}
			.info-box{
				margin-top: 45rpx;
				margin-left: 15rpx;
				.name{
					margin-left: 20rpx;
					font-size: 34rpx;
					color: #333333;
				}
				.hospital{
					margin-left: 20rpx;
					margin-top: 20rpx;
					font-size: 28rpx;
					color: #999999;
				}
				
			}
			.number-box{
				position: absolute;
				bottom: 40rpx;
				right: 20rpx;
			}
			
		}
	}
	
</style>
