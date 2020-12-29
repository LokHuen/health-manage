<template>
	<!-- 饮食记录反馈界面 -->
	<view class="container">
		<view class="info-box">
			<view class="tips">{{info.resultTypeVaule}}</view>
			<view class="value-box">
				<view class="left">
					<view class="value">{{info.calories}}</view>
					<view class="distance">千卡</view>
				</view>
				<view class="right">
					<view class="value">{{info.carbohydrate}}</view>
					<view class="distance">克碳水</view>
				</view>
				
			</view>
			
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
		},
		methods: {
			complete(){
				uni.redirectTo({
					url:'../patient/patient-nutrition-manage?type=1'
				})
			}
		}
	}
</script>

<style lang="scss">
	.container{
		
		.value{
		 margin-top: 50rpx;
		 text-align: center;
		  font-size: 60rpx;	
		  color: #272727;
		}
		.distance{
			margin-top: 20rpx;
		  text-align: center;
		  font-size: 30rpx;
		  color: #272727;
		}
		.info-box{
			height: 426rpx;
			text-align: center;
			color: #272727;
			font-size: 30rpx;
			border-top: 1rpx solid #CFCFCF;
			.tips{
				padding-top: 92rpx;
				color: #51CF50;
			}
			.value-box{
				height: 290rpx;
				display: flex;
				.left{
					width: 50%;
				}
				.right{
					width: 50%;
				}
			}
			
		}
		.detail{
		    margin-top: 30rpx;margin-left: 30rpx;margin-right: 30rpx;
			font-size: 30rpx;
			font-family: PingFangSC-Light, PingFang SC;
			color: #272727;
		}
		.button{
			background: #FCA62B;
			border-radius: 10rpx;
            height: 88rpx;line-height: 88rpx;
			margin-left: 74rpx;margin-right: 74rpx; margin-top: 150rpx;
			color: #FFFFFF; font-size: 38rpx;
			text-align: center;
		}
	}
</style>
