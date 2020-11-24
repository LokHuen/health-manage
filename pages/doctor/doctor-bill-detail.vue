<template>
	<!-- 医生账单详情 -->
	<view class="container">
		<view class="info">
			<image src="../../static/img/avator.png" mode="widthFix" class="avtor"></image>
			<view class="info-box">
				<view class="list-name-box">
					<view class="name">李小明</view>
					<view class="time">2022/12/1 12:09</view>
				</view>
				<view class="list-detail">购买益生菌益生菌益生菌火速回宿舍寒暑假</view>
			</view>
			<view class="list-money">￥100</view>
		</view>
		<view class="line"></view>
		<view class="list-item">
			<view class="item-name">我的收益</view>
			<view class="item-detail">100元</view>
		</view>
		
		<view class="list-item">
			<view class="item-name">转账时间</view>
			<view class="item-detail">2020/12/12 12:21:23</view>
		</view>
		
		<view class="list-item">
			<view class="item-name">账户名称</view>
			<view class="item-detail">张晓梅</view>
		</view>
		
		<view class="list-item">
			<view class="item-name">开户行</view>
			<view class="item-detail">中国银行广州天河支行</view>
		</view>
		
		<view class="list-item">
			<view class="item-name">账号</view>
			<view class="item-detail">6013821900098989999</view>
		</view>
		
	</view>
</template>

<script>
</script>

<style lang="scss">
	.container{
		.info {
			display: flex;
			margin-left: 50rpx;
			margin-right: 50rpx;
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
				margin-right: 0rpx;
				.list-name-box {
					display: flex;
					.name{
						font-size: 15px;
					}
					.time{
						font-size: 12px;
						color: #999999;
						margin-left: 15rpx;
						margin-top: 8rpx;
					}
				}
		
				.list-detail {
					font-size: 12px;
				}
		
			}
		
		}
		.line {
			height: 20rpx;
			background-color: #F5F6F6;
		}
		.list-item{
			height: 80rpx;
			font-size: 15px;
			position: relative;
			.item-name{
				line-height: 80rpx;
				margin-left: 50rpx;
				color: #333333;
			}
			.item-detail{
				color: #999999;
				position: absolute;
				right: 50rpx;
				top: 20rpx;
			}
		}
	}
</style>
