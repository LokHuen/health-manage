<template>
	<view class="container flexc">
		<view class="flex head" @click="toOrder">
			<view class="head-item flexc">
				<text class="value">{{info.orderNum||0}}</text>
				<text class="key">本月订单数</text>
			</view>
			<view class="head-item flexc">
				<text class="value">{{info.income||0}}</text>
				<text class="key">本月订单总金额（元）</text>
			</view>
		</view>
		<view class="flexc">
			<view class="item-outer" v-for="(item,index) in list" :key="index" @click="clickItem(index)">
				<view class="item flex">
					<text class="left-name">{{item}}</text>
					<view class="flex">
						<text
							v-if="index==2 ||index==3 ">{{index==2?(info.bindDoctorCount||0):(info.bindPatientCount||0)}}</text>
						<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	
	const app = getApp();
	export default {

		data() {
			return {
				list: ["按月统计订单数据", "名片码", "绑定的用户", "患者列表", "账户", "资源报备"],
				info: {}
			}
		},
		onLoad() {
			this.getData();
		},
		methods: {
			clickItem(index) {
				if (index == 0) {
					//订单
					uni.navigateTo({
						url: 'month-order-list?isAgent=1&isSalesPage=1'
					})

				} else if (index == 1) {
					uni.navigateTo({
						url: '../sales/sales-business-card?id=' + app.getCache('uid')
					});
				} else if (index == 2) {
					uni.navigateTo({
						url: '../sales/user'
					});
				} else if (index == 3) {
					//患者列表
					uni.navigateTo({
						url: '../sales/patient-list'
					})

				} else if (index == 6) {
					this.judgeDoctorAuthenticationStatus();
				} else if (index == 4) {
					uni.navigateTo({
						url: '../sales/sales-account-list'
					});
				} else if (index == 5) {
					//资源报备
					uni.navigateTo({
						url: '../sales/resource-report-list'
					});

				}
			},
			getData() {
				app.saleshomepage({}).then(res => {
					console.log(res);
					if (res.status == 1) {
						this.info = res.data;
					}
				});
			},
			toOrder() {
				let date = new Date()
				let month = date.getFullYear() + '-' + (date.getMonth() + 1)
				uni.navigateTo({
					url: 'order-list?pageResource=1' + '&month=' + month
				})
			}
		},

	}
</script>

<style lang="scss" scoped>
	.container {
		height: 100vh;
		background-color: #F5F6F6;

		.head {
			padding: 60rpx 30rpx;
			background: #FFFFFF;
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
