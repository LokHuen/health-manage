<template>
	<!-- 团队成员 -->
	<view class="container">
		<view class="list-box" v-for="(item,index) in list" :key="index">
			<view class="name">{{item.name}}</view>
			<view :class="item.team==0?'item-box':'item-box team'">
				个人业务情况
				<image src="../../static/right.png" mode="widthFix" class="right"></image>
			</view>
			
			<view class="item-box" v-if="item.team==1">
				下属团队业务情况
				<image src="../../static/right.png" mode="widthFix" class="right"></image>
			</view>
			
		</view>
		
	</view>
</template>

<script>
	const app = getApp();
	export default {
	 	data() {
	 		return {
	 			list:[{name:'曲筱绡',team:0},{name:'张晓敏',team:1}]
			}
		},
		methods:{
			
		},
		onLoad(){
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: $uni-bg-color-grey;
	}
	.container{
		.list-box{
			margin-top: 20rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;
			.name{
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 38rpx;
				padding-left: 50rpx;
				padding-top: 40rpx;
				
			}
			
			.item-box{
				height: 90rpx;
				background: #FFFFFF;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #666666;
				line-height: 90rpx;
				padding-left: 50rpx;
				position: relative;
				.right{
					position: absolute;
					width: 15rpx;
					right: 38rpx;
					top: 40rpx;
				}

			}
			.team{
				border-bottom:  2rpx solid #EEEEEE;;
			}
			
			

		}
		
	}
</style>
