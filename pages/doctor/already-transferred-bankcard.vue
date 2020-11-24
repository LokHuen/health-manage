<template>
	<!-- 已经转账到银行卡界面 -->
	<view>
		<view class="health-title">
			<view class="health-title-content">
				<view class="health-title-amount">666666600元</view>
				<view class="health-title-detail">已转账金额</view>
			</view>	
		</view>
		<view class="health-list">
			<view class="health-list-content">
				<view class="health-list-title">转账记录</view>
				<view class="health-item" v-for="(item,index) in listDatas">
					<view class="item-amount">{{item.amount}}</view>
					<view class="item-time">{{item.time}}&nbsp;&nbsp;&nbsp;&nbsp;{{item.from}}</view>
				</view>
			</view>
			
		</view>
	</view>
</template>

<script>
	export default {
	 	data() {
	 		return {
	 			listDatas:[{
						id:101,
						amount:"￥100",
						time:"2022/12/1 12:09",
						from:"来自李自强的购物订单"
					},{
						id:102,
						amount:"￥200",
						time:"2022/12/1 12:09",
						from:"来自李自强的购物订单"
					}
				]
			}
		}
	}
</script>

<style lang="scss">
	
	page {
		background-color: #F7F8F8;
		white-space: pre-wrap;
	}
.health-title {
	background-color: white;
	height: 198rpx;
	.health-title-content {
		margin: 0 58rpx;
		.health-title-amount {
			color: #333333;
			font-size: 52rpx;
			padding-top: 35rpx;
		}	
		.health-title-detail {
			color: #999999;
			font-size: 30rpx;
			padding-top: 10rpx;
		}
	}
}

.health-list {
	background-color: white;
	margin-top: 20rpx;
	.health-list-content {
		margin: 20rpx 58rpx 0;
		.health-list-title {
			padding-top: 39rpx;
			padding-bottom: 30rpx;
			color: #666666;
			font-size: 30rpx;
		}
		.health-item {
			height: 126rpx;
			border-bottom: 0.01rem #EEEEEE solid;
			.item-amount {
				padding-top: 25rpx;
				color: #333333;
				font-size: 34rpx;
			}
			.item-time {
				color: #999999;
				font-size: 24rpx;
			}
		}
	}
}
	
</style>
