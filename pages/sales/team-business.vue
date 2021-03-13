<template>
	<view class="container flexc">
		<view class="" style="padding-top: 30rpx;padding-left: 50rpx;padding-bottom: 20rpx;">
			{{name}}的团队
		</view>
		<view class="flexc head">
			<view class="flexc order-count-box">
				<view class="content flex" @click="toOrder">
					<view class="head-item flexc">
						<text class="value">{{info.orderNum||0}}</text>
						<text class="key">本月订单数</text>
					</view>
					<view class="head-item flexc">
						<text class="value">{{info.orderMoney||0}}</text>
						<text class="key">本月订单总金额（元）</text>
					</view>
				</view>
				<text class="tip">统计范围：客户已付款订单</text>
			</view>
		</view>
		<view class="flexc">
			<view class="item-outer">
				<view class="item flex" @click="toTeamMember">
					<text class="left-name">团队成员</text>
					<view class="flex">
						<text>{{info.salesNum}}</text>
						<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
					</view>
				</view>
				<text class="item-subtext">统计数据包括直属和所有间接下级</text>
			</view>
			<view class="item-outer" @click="toMonthOrderList">
				<view class="item flex">
					<text class="left-name">按月统计订单数据</text>
					<view class="flex">
						<text v-if="0"></text>
						<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	const app = getApp();

	export default {
		components: {
			tkiTree
		},
		data() {
			return {
				info: {},
				name: '',
				salesId: ''
			}
		},
		onLoad(props) {
			if (props.salesId) {
				this.salesId = props.salesId;
				this.name = props.name;
			}

			this.getAgentInfo()
		},
		methods: {
			toMonthOrderList() {
				uni.navigateTo({
					url: 'month-order-list?pageResource=2' + '&salesId=' + this.salesId
				})
			},
			toTeamMember() {
				uni.navigateTo({
					url: 'team-member?salesId=' + this.salesId
				})

			},
			toOrder() {
				let date = new Date()
				let month = date.getFullYear() + '-' + (date.getMonth() + 1)
				uni.navigateTo({
					url: 'order-list?month=' + month +
						'&pageResource=2'+'&salesId='+this.salesId
				})
			},
			getAgentInfo() {
				app.agentInfo({
					agentId: this.salesId
				}).then((res) => {
					this.info = res.data
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100vh;
		background-color: #F5F6F6;

		.origanzePopup {
			padding: 60rpx;

			.head {
				justify-content: flex-end;

				image {
					width: 24rpx;
					height: 24rpx;
				}

				margin-bottom: 30rpx;
			}

			text-align: center;
			height: 655rpx;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;
			color: #333333;
			font-size: 15px;
		}

		.head {
			background: #FFFFFF;

			.organization-box {
				justify-content: space-between;
				padding: 0 44rpx;
				height: 98rpx;
				background-color: $uni-defautt-bg-color;

				.name {
					font-size: 32rpx;
					color: $uni-text-color;
				}

				.toggle-box {
					font-size: 28rpx;
					color: #666666;

					.down-arrow {
						width: 27rpx;
						height: 15rpx;
						margin-left: 10rpx;
					}
				}

			}

			.order-count-box {
				padding-bottom: 40rpx;

				.content {
					padding: 60rpx 30rpx;
					padding-bottom: 36rpx;
					flex-wrap: nowrap;

					.head-item {
						flex: 1;
						font-size: 30rpx;
						justify-content: center;
						align-items: center;

						&:nth-child(1) {
							border-right: 2rpx solid #ddd;
						}

						.value {
							font-size: 52rpx;
							padding-bottom: 10rpx;
							color: #4B8BE8;
						}
					}
				}

				.tip {
					color: #999999;
					font-size: 26rpx;
					margin-left: 50rpx;
				}
			}


		}

		.item-outer {
			margin-top: 20rpx;

			.item-subtext {
				padding-left: 50rpx;
				color: #999999;
				font-size: 26rpx;
				height: 84rpx;
				line-height: 84rpx;
				padding-top: 20rpx;
			}

			.item {
				background-color: #FFFFFF;
				height: 90rpx;
				justify-content: space-between;
				align-items: center;
				padding: 0 50rpx;

				.left-name {
					font-size: 30rpx;
					color: #333333;
				}

				.right-arrow {
					width: 15rpx;
					height: 27rpx;
					margin-left: 20rpx;
				}
			}

		}
	}
</style>
