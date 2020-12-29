<template>
	<!-- 记录营养品界面 -->
	<view class="container">
		<view class="all-count">
			<view class="tips">本次合计</view>
			<view class="all-count-detail">
				<view class="left">
					<view class="value">{{allEnergy}}</view>
					<view class="distance">千卡</view>
				</view>
				<view class="right">
					<view class="value">{{allCarbohydrate}}</view>
					<view class="distance">克碳水</view>
				</view>
			</view>
		</view>
		<view style="height: 20rpx; background-color: #F7F7F7;"></view>
		<view class="time">
			<biaofun-datetime-picker :defaultValue="defaultTime" placeholder="选择" start="2000-02-03 02:08" end="2100-10-28 22:58"
			 fields="minute" @change="changeDatetimePicker"></biaofun-datetime-picker>

			<image src="../../static/icon/more_icon.png" mode="widthFix" class="more"></image>
		</view>

		<view style="height: 200rpx;"></view>

		<view class="bottom-box">
			<view class="button" @click="save">保存</view>
		</view>

		
	</view>
</template>

<script>
	const app = getApp();
	import biaofunDatetimePicker from '@/components/biaofun-datetime-picker/biaofun-datetime-picker.vue';
	export default {
		components: {
			biaofunDatetimePicker
		},
		data() {
			return {
				defaultTime: '',
				allCarbohydrate: 0,
				allEnergy: 0,
				nutritionInfo:{}

			}
		},
		methods: {
			getTime() {
				var date = new Date(),
					year = date.getFullYear(),
					month = date.getMonth() + 1,
					day = date.getDate(),
					hour = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
					minute = date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
					second = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
				month >= 1 && month <= 9 ? (month = "0" + month) : "";
				day >= 0 && day <= 9 ? (day = "0" + day) : "";
				var timer = year + '-' + month + '-' + day + ' ' + hour + ':' + minute;
				this.defaultTime = timer;
				this.$forceUpdate();
			},		
			changeDatetimePicker(date) {
				this.defaultTime = date.f3;
			},
			save() {
				uni.navigateTo({
					url:'nutrition-record-feedback'
				})

			}


		},
		onLoad(props) {
			this.getTime();
            this.nutritionInfo =  JSON.parse(props.nutritionInfo);

		}

	}
</script>

<style lang="scss">
	.container {
		.value {
			margin-top: 50rpx;
			text-align: center;
			font-size: 60rpx;
			color: #272727;
		}

		.distance {
			margin-top: 20rpx;
			text-align: center;
			font-size: 30rpx;
			color: #272727;
		}

		.all-count {
			color: #272727;
			height: 300rpx;
			border-top: 1rpx solid #CFCFCF;

			.tips {
				font-size: 30rpx;
				margin-top: 30rpx;
				margin-left: 30rpx;
			}

			.all-count-detail {
				display: flex;
				height: 270rpx;

				.left {
					width: 50%;
				}

				.right {
					width: 50%;
				}

			}
		}

		.time {
			height: 96rpx;
			line-height: 96rpx;
			color: #272727;
			margin-left: 30rpx;
			margin-right: 30rpx;
			border-bottom: 1rpx solid #CFCFCF;
			position: relative;

		}

		.type {
			height: 96rpx;
			line-height: 96rpx;
			color: #272727;
			margin-left: 30rpx;
			margin-right: 30rpx;
			position: relative;

		}

		.more {
			position: absolute;
			width: 12rpx;
			height: 24rpx;
			right: 0;
			top: 36rpx;
		}

		.food-list-tips {
			margin-top: 40rpx;
			margin-left: 30rpx;
			font-size: 30rpx;
			color: #272727;
		}

		.list-content-box {
			display: flex;
			height: 152rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			border-bottom: 2rpx solid #CFCFCF;
			position: relative;

			.list-msg-right {
				position: absolute;
				right: 0;
				font-size: 36rpx;
				color: #272727;
				top: 50rpx;
			}

			.list-img {
				width: 100rpx;
				height: 100rpx;
				background-color: #CFCFCF;
				margin-top: 30rpx;
			}

			.list-msg {
				margin-left: 30rpx;
				margin-top: 30rpx;
				height: 100rpx;

				.list-title {
					font-size: 34rpx;
					color: #272727;
				}

				.list-detail {
					margin-top: 10rpx;
					font-size: 30rpx;
					display: flex;

					.list-detail-number {
						color: #52A29E;
					}

					.list-detail-tip {
						color: #272727;
					}
				}

			}

		}

		.bottom-box {
			position: fixed;
			bottom: 0;
			height: 128rpx;
			width: 100%;

			.button {
				margin-left: 74rpx;
				margin-right: 74rpx;
				height: 88rpx;
				background: #52A29E;
				border-radius: 10rpx;
				line-height: 88rpx;
				font-size: 38rpx;
				color: #FFFFFF;
				text-align: center;
			}
		}

		.popup-bg {
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 0px 0px;

			.popup-title {
				height: 50rpx;
				font-size: 30rpx;
				color: #707578;
				text-align: center;
				position: relative;

				.popup-close {
					position: absolute;
					width: 36rpx;
					height: 36rpx;
					right: 30rpx;
				}
			}
		}

		.food-item {
			font-size: 30rpx;
			color: #272727;
			text-align: center;
			height: 96rpx;
			line-height: 96rpx;
			border-bottom: 1rpx solid #DDDDDD;
		}
	}
</style>
