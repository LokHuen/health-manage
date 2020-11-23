<template>
	<!-- 医生账户列表 -->
	<view class="container">
		<view class="not-received-item">
			<view class="money-box">
				<view class="money">6800</view>
				<view class="yuan">元</view>
			</view>
			<view class="tips">待转账到银行卡</view>
			<view class="detail">用户确认收货后，收益会即时转账到银行卡</view>
		</view>
		<view class="line"> </view>
		
		<view class="received-item">
			<view class="received-money-box">
				<view class="received-money">6800</view>
				<view class="received-yuan">元</view>
			</view>
			
			<view class="received-detail">已转账到银行卡</view>
		</view>
		<view class="line"> </view>
		
	</view>
</template>

<script>
</script>

<style lang="scss">
	.container{
		.not-received-item{
			height: 230rpx;
			margin-left: 60rpx;
			.money-box{
				color: #333333;
				padding-top: 45rpx;
				height: 39rpx;
				line-height: 39rpx;
				display: flex;
				.money{
					font-size: 24px;
				}
				.yuan{
					font-size: 13px;
					margin-top: 6rpx;
				}
			}
			.tips{
				color: #52A29E;
				font-size: 15px;
				margin-top: 25rpx;
			}
			.detail{
				color: #999999;
				font-size: 13px;
				margin-top: 10rpx;
			}
		}
		.line{
			height: 6rpx;
			background-color: #F5F6F6;
		}
		
		.received-item{
			height: 180rpx;
			margin-left: 60rpx;
			.received-money-box{
				color: #333333;
				padding-top: 45rpx;
				height: 39rpx;
				line-height: 39rpx;
				display: flex;
				.received-money{
					font-size: 24px;
				}
				.received-yuan{
					font-size: 13px;
					margin-top: 6rpx;
				}
			}
			.received-detail{
				font-size: 13px;
				color: #999999;
				margin-top: 13rpx;
			}
		}
	}
</style>
