<template>
	<view>
		<view class="health-content">
			<view class="health-result-title">提交成功，是否现在进行身份认证操作？</view>
			<view class="health-result-detail">身份认证成功后，收益会在第二天转入您的银行卡，建议立即提交认证信息。</view>
			<view class="health-result-confim">
				<button class="health-result-confim-button" @click="authenticate">立即认证</button>
			</view>
			<view class="health-result-cancel">
				<button class="health-result-cancel-button" @click="notAuthenticate">暂不认证</button>
			</view>
		</view>
	</view>
</template>

 
<script>
	export default {
		data() {
			return {
				
			}
		},
		methods:{
			authenticate(){
				uni.navigateTo({
					url:'../authentication/index'
				});
			},
			notAuthenticate(){
				uni.redirectTo({
					url:'doctor-center'
				});
			}
			
		}
	}
	
</script>

<style lang="scss">

.health-content {
	margin: 35rpx 60rpx 0;
	.health-result-title {
		color: #333333;
		font-size: 32rpx;
	}
	
	.health-result-detail {
		margin-top: 20rpx;
		color: #666666;
		font-size: 28rpx;
		line-height: 46rpx;
	}
	
	.health-result-confim {
		margin-top: 50rpx;
		width: 100%;
		text-align: center;
		.health-result-confim-button {
			line-height: 90rpx;
			height: 90rpx;
			margin-left: 110rpx;
			margin-right: 110rpx;
			background-color: #52A29E;
			color: white;
			font-size: 34rpx;
			border-radius: 45rpx;
		}
	}
	
	.health-result-cancel {
		text-align: center;
		.health-result-cancel-button {
			background-color: white;
			color: #666666;
			font-size: 32rpx;
			border-width: 0rpx;
		}
		
		
	}
	
	button::after { 
		border: none;
	}
}
	
	
</style>
