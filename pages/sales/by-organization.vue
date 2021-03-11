<template>
	<view class="container flexc">
		<view class="flexc head">
			<view class="organization-box flex">
				<text class="name">{{orgName}}</text>
				<view class="toggle-box flex" @click="toggleOrganize(true)">
					<text>切换部门</text>
					<image class="down-arrow" src="../../static/icon/right_arrow.png"></image>
				</view>
			</view>
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
			<view class="item-outer" @click="toOrganize">
				<view class="item flex">
					<text class="left-name">团队成员</text>
					<view class="flex">
						<text>{{info.teamNum||0}}</text>
						<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
					</view>
				</view>
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

		<uni-popup ref="origanzePopup" type="bottom">
			<view class="origanzePopup flexc">
				<view class="head flex">
					<image src="../../static/icon_close.png" @click="toggleOrganize(false)"></image>
				</view>
				<tki-tree :range="organizeList" rangeKey="name" selectParent @treeItemSelect="treeItemSelect" />
			</view>
		</uni-popup>
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
				orgName: '',
				orgId: '',
				organizeList: [],
				info: {teamNum:0},
			}
		},
		onLoad(props) {
			this.orgName = props.orgName
			this.orgId = props.orgId
			this.getSalesManOrg()
			this.getOrgInfo(this.orgId)
			this.getOrgMembers()
		},
		methods: {
			toMonthOrderList() {
				uni.navigateTo({
					url: 'month-order-list?pageResource=3' + '&orgId=+' + this.orgId
				})
			},
			toOrganize() {
				let hasOrganize = 1
				if (hasOrganize) {
					uni.navigateTo({
						url: 'organization-chart?orgId=' + this.orgId+'&orgName='+this.orgName
					})
				} else {
					uni.navigateTo({
						url: 'sales-team?orgId=' + this.orgId
					})
				}

			},
			getOrgInfo(deptId = this.this.orgId) {
				app.getOrgInfo({
					deptId: deptId
				}).then(res => {
					if (res.status == 1) {
						this.info.orderNum = res.data.orderNum;
						this.info.orderMoney = res.data.orderMoney
					}
				});
			},
			toOrder() {
				let date = new Date()
				let month = date.getFullYear() + '-' + (date.getMonth() + 1)
				uni.navigateTo({
					url: 'order-list?isSalesPage=1' + '&month=' + month + '&orgId=' + this.orgId +
						'&pageResource=3'
				})
			},
			toggleOrganize(open) {
				if (open) {
					this.$refs.origanzePopup.open()
				} else {
					this.$refs.origanzePopup.close()
				}
			},
			treeItemSelect(item) {
				this.orgId = item.id
				this.orgName = item.name
				this.getOrgInfo(this.orgId)
				this.getOrgMembers()
				this.toggleOrganize(false)
				console.log('by-org')
				// console.log(item)
			},
			getSalesManOrg() {
				app.getSalesManOrg({orgId:this.orgId}).then((res) => {
					this.organizeList = res.data
				})
			},
			getOrgMembers(){
				app.getOrgMembers({orgId:this.orgId}).then((res) => {
					this.info.teamNum = res.data.teamNum
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
