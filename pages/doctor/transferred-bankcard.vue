<template>
	<!-- 待转账到银行卡 -->
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
		<view class="list-tips">收益待转账的订单</view>
		<view class="list-item" v-for="(item,index) in list" :key="index">
			<image src="../../static/img/avator.png" mode="widthFix" class="avtor"></image>
			<view class="info-box">
				<view class="list-name">张小明</view>
				<view class="list-detail">2022/12/1 12:09 购买益生菌益生菌益生菌火速回宿舍寒暑假</view>
			</view>
			<view class="list-money">￥100</view>
		</view>

	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				list: [1, 2, 3]
			}
		},
		methods: {

		},
		created() {}

	}
</script>

<style lang="scss">
	.container {
		.not-received-item {
			height: 230rpx;
			margin-left: 60rpx;

			.money-box {
				color: #333333;
				padding-top: 45rpx;
				height: 39rpx;
				line-height: 39rpx;
				display: flex;

				.money {
					font-size: 24px;
				}

				.yuan {
					font-size: 13px;
					margin-top: 6rpx;
				}
			}

			.tips {
				color: #52A29E;
				font-size: 15px;
				margin-top: 25rpx;
			}

			.detail {
				color: #999999;
				font-size: 13px;
				margin-top: 10rpx;
			}
		}

		.line {
			height: 20rpx;
			background-color: #F5F6F6;
		}

		.list-tips {
			font-size: 14px;
			margin-top: 30rpx;
			margin-left: 50rpx;
		}

		.list-item {
			display: flex;
			margin-left: 50rpx;
			margin-right: 50rpx;
			border-bottom: 2rpx solid #DCDCDC;
            position: relative;
			.avtor {
				margin-top: 30rpx;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
			}

			.info-box {
				margin-top: 30rpx;
				margin-left: 20rpx;
				color: #333333;
				margin-bottom: 25rpx;
				margin-right: 100rpx;
				.list-name {
					font-size: 15px;
				}

				.list-detail {
					font-size: 12px;
				}

			}

		}

		.list-money {
			position: absolute;
			font-size: 14px;
			right: 0;
			top: 40rpx;
		}


	}
</style>
