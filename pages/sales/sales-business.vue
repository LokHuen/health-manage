<template>
	<view class="container flexc">
		<view class="head flexc">
			<text class="sales-name" v-if="sales.salesName">{{sales.salesName}}</text>
			<view class="flex head-data" @click="toOrder">
				<view class="head-item flexc">
					<text class="value">{{info.orderNum||0}}</text>
					<text class="key">本月订单数</text>
				</view>
				<view class="head-item flexc">
					<text class="value">{{info.income||0}}</text>
					<text class="key">本月订单总金额（元）{{sales.salesName}}</text>
				</view>
			</view>
		</view>

		<view class="flexc">
			<view class="item-outer" v-for="(item,index) in list" :key="index" @click="clickItem(index)" v-if="item">
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
			let that = this
			return {
				sales: {
					salesId: '',
					salesName: ''
				},
				info: {},
			}
		},
		onLoad(props) {
			if (props.salesId) {
				this.sales.salesId = props.salesId
			}
			this.sales.salesName = props.salesName
			this.getData();
		},
		onReady() {
			if (this.sales.salesId) {
				uni.setNavigationBarTitle({
					title: '个人业务情况'
				})
			}
		},
		computed: {
			list: function() {
				return ["按月统计订单数据", this.sales.salesId ? "" : '名片码', "绑定的用户", "患者列表", "资源报备"]
			}
		},
		methods: {
			clickItem(index) {
				if (index == 0) {
					uni.navigateTo({
						url: 'month-order-list?pageResource=1' + '&salesId=' + this.sales.salesId
					})
				} else if (index == 1) {
					uni.navigateTo({
						url: '../sales/sales-business-card?id=' + this.sales.salesId ? this.sales.salesId : app
							.getCache('uid')
					});
				} else if (index == 2) {
					uni.navigateTo({
						url: '../sales/user?salesManId=' + this.sales.salesId
					});
				} else if (index == 3) {
					uni.navigateTo({
						url: '../sales/patient-list?salesManId=' + this.sales.salesId
					})
				} else if (index == 4) {
					uni.navigateTo({
						url: '../sales/resource-report-list?salesId=' + this.sales.salesId
					});
				}
			},
			getData() {
				app.saleshomepage({
					salesManId: this.sales.salesId
				}).then(res => {
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
			.sales-name {
				color: #333333;
				font-size: 32rpx;
				padding: 36rpx 0 40rpx 50rpx;
			}

			.head-data {

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
