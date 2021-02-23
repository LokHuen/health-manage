<template>
	<view class="container">
		<view class="welcome">{{info.name}}</view>
		<view class="flex numbox" @click="toOrder">
			<view class="numitem">
				<view class="number">{{info.orderNum||0}}</view>
				<view>本月订单数</view>

			</view>
			<view class="numitem">
				<view class="number">{{info.income||0}}</view>
				<view>本月收益(元)</view>
			</view>
		</view>

		<view class="item-list flex" @click="clickOrder">
			<view class="left-name">按月统计订单数据</view>
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
		</view>

		<view class="item-list flex" @click="clickDoctor">
			<view class="left-name">绑定的医生</view>
			<view style="padding-right:20rpx;">{{info.bindDoctorCount||0}}</view>
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
		</view>

		<view class="item-list flex" @click="clickPatient">
			<view class="left-name">绑定的患者</view>
			<view style="padding-right:20rpx;">{{info.bindPatientCount||0}}</view>
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
		</view>

		<view class="item-list flex" @click="clickResource">
			<view class="left-name">资源报备</view>
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
		</view>

	</view>
</template>

<script>
	const app = getApp();
	export default {

		data() {
			return {
				info: {},
				id: 1,
			}
		},
		onLoad(props) {
			this.id = props.id
			this.getMemberInfo();
		},
		methods: {
			getMemberInfo() {
				app.salesmanDetail({
					salesManId: this.id
				}).then(res => {
					if (res.status == 1) {
						this.info = res.data;
					}
				})
			},
			clickResource() {
				uni.navigateTo({
					url: '../sales/resource-report-list?salesId=' + this.id
				})
			},
			clickOrder() {
				uni.navigateTo({
					url: 'month-order-list?salesId=' + this.id
				})
			},
			clickDoctor() {
				uni.navigateTo({
					url: '../sales/user?salesManId=' + this.id
				})
			},
			clickPatient() {
				uni.navigateTo({
					url: '../sales/patient-list?salesManId=' + this.id
				})
			},
			toOrder() {
				let date = new Date()
				let month = date.getFullYear() + '-' + (date.getMonth() + 1)
				uni.navigateTo({
					url: 'order-list?' + '&month=' + month+'&salesId='+this.id
				})
			}
		},

	}
</script>

<style lang="scss">
	.container {
		height: 100vh;
		background-color: #F5F6F6;
		overflow-y: auto;

		.welcome {
			line-height: 110rpx;
			padding-left: 50rpx;
		}

		.numbox {
			padding: 60rpx 30rpx;
			background: #fff;

			.numitem {
				width: 50%;
				text-align: center;
				font-size: 30rpx;
				box-sizing: border-box;

				&:nth-child(1) {
					border-right: 2rpx solid #ddd;
				}

				.number {
					font-size: 52rpx;
					padding-bottom: 10rpx;
					color: #4B8BE8;
				}
			}

		}

		.item-list {
			background-color: #FFFFFF;
			height: 108rpx;
			margin-top: 10rpx;
			position: relative;
			padding-right: 40rpx;

			.left-name {
				height: 106rpx;
				flex: 1;
				line-height: 106rpx;
				font-size: 32rpx;
				color: #333333;
				padding-left: 60rpx;
			}

			.right-arrow {
				width: 18rpx;
			}

			.line {
				height: 6rpx;
				background-color: #F5F6F6;
			}
		}
	}
</style>
