<template>
	<!-- 运动记录反馈界面 -->
	<view class="container">
		<view class="info-box">
			<view class="tips">本次运动消耗热量</view>
			<view class="value">{{info.burnCalories}}</view>
			<view class="distance">千卡</view>
		</view>
		<view style="height: 20rpx; background-color: #F7F7F7;"></view>
		<view class="detail">
			{{info.result}}
		</view>
		<view class="button" @click="complete">完成</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				info:{}
			}
		},
		onLoad(options){
			this.info = JSON.parse(options.info);
			console.log(this.info)
		},
		methods: {
			complete(){
				uni.redirectTo({
					url:'../patient/patient-nutrition-manage?type=2'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		.info-box{
			height: 388rpx;
			text-align: center;
			color: #272727;
			font-size: 30rpx;
			border-top: 1rpx solid #CFCFCF;
			.tips{
				padding-top: 90rpx;
				color: #51CF50;
			}
			.value{
				font-size: 60rpx;
				margin-top: 60rpx;
			}
		}
		.detail{
		    margin-top: 30rpx;margin-left: 30rpx;margin-right: 30rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Light, PingFang SC;
			color: #272727;
		}
		.button{
			background: #52A29E;
			border-radius: 10rpx;
            height: 88rpx;line-height: 88rpx;
			margin-left: 74rpx;margin-right: 74rpx; margin-top: 150rpx;
			color: #FFFFFF; font-size: 38rpx;
			text-align: center;
		}
	}
</style>
