<template>
	<view class="container">
		<scroll-view class="i-scroll-view" scroll-y="">
			<view class="flex i-content">
				<image class="i-head-img" style="width: 100vh;height: 420rpx;" src="../../static/img/head_diet_catering.png"></image>
				<text class="i-head-tip">均衡饮食是基于中国居民膳食指南建议，最大程度上满足人体各类营养需求的饮食计划。合理饮食的基础上，应保证膳食多样性，每日食物摄入12种以上，平均每周25种以上。
				</text>
				<view class="flex i-target-box">
					<view class="flexc i-left">
						<text style="font-weight: bold;color: #333333;">营养目标</text>
						<view class="flex i-target-item" style="align-items: center;margin-top: 22rpx;">
							<image class="i-dot"></image>
							<text>脂肪{{info.fat?info.fat:0}}g</text>
						</view>
						<view class="flex i-target-item" style="align-items: center;">
							<image class="i-dot"></image>
							<text>蛋白质{{info.protein?info.protein:0}}g</text>
						</view>
						<view class="flex i-target-item" style="align-items: center;">
							<image class="i-dot"></image>
							<text>碳水化合物{{info.carbohydrate?info.carbohydrate:0}}g</text>
						</view>
					</view>
					<view class="i-space-line"></view>
					<view class="flexc i-right">
						<view style="margin: 0 auto;">
							<view class="flex">
								<text style="font-size: 46rpx; align-self: flex-start;">{{info.calories?info.calories:0}}</text>
								<text style="align-self: flex-end; margin-left: 10rpx;margin-right: 5rpx;">kcal</text>
								<image style="width: 22rpx; height: 22rpx;" src="../../static/icon/wenhaoIcon.png"></image>
							</view>
							<text>每日总能量</text>
						</view>
					</view>
				</view>
				<view class="flexc i-text-box" v-if="info.diseaseName">
					<view class="flex i-title-box">
						<text style="font-size: 28rpx; color: #333333;font-weight: bold;flex: 1;">食谱 | 乳腺癌患者</text>
						<view class="flex" style="align-items: center;justify-content: center;" @click="toMore">
							<text>全部食谱</text>
							<image style="width: 12rpx; height: 22rpx;margin-left: 10rpx;" src="../../static/icon/more_icon.png"></image>
						</view>
					</view>
					<view class="i-text" v-html="info.foodPairing"></view>
				</view>

				<view class="flexc i-type-box" v-if="!info.diseaseName">
					<text class="i-type-title">食谱 | 按照病种查看</text>
					<view class="flexc i-type-list">
						<text class="i-item" v-for="(item,index) in info.diseaseList" @click="clickHandler(item)">{{item.diseaseName}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import http from '../../common/http.js'
	export default {
		data() {
			return {
				patientId: '',
				info: {}
			}
		},
		onLoad(options) {
			this.patientId = options.id
			http.get(http.urls.get_catering_data, {
				patientId: this.patientId
			}).then((res) => {
				this.info = res.data
			})
		},
		methods: {
			toMore() {
				uni.navigateTo({
					url: 'disease-type'
				})
			},
			clickHandler(item) {
				uni.navigateTo({
					url: 'disease-type-detail?id=' + item.id + '&diseaseName=' + item.diseaseName
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.flex {
		display: flex;
		flex-direction: row;
	}

	.flexc {
		display: flex;
		flex-direction: column;
	}

	.container {
		font-size: 26rpx;
		color: #666666;

		.i-scroll-view {
			height: 100vh;

			.i-content {

				.i-head-tip {
					background-color: #FFFFFF;
					padding: 32rpx 36rpx 36rpx 36rpx;
					margin: 0 50rpx;
					margin-top: -100rpx;
					box-shadow: 0px 0px 27px 0px rgba(0, 0, 0, 0.08);
					z-index: 9999;
					border-radius: 4rpx;
				}


				.i-target-box {
					border-radius: 4rpx;
					background-color: #FFFFFF;
					margin: 0 50rpx;
					margin-top: 30rpx;
					width: 100%;
					padding: 34rpx 52rpx;
					box-shadow: 0px 0px 27px 0px rgba(0, 0, 0, 0.08);
					position: relative;

					.i-left {
						flex: 1;

						.i-target-item {
							margin-top: 18rpx;

							.i-tab {}

							.i-dot {
								width: 16rpx;
								height: 16rpx;
								background: #F6BC6A;
								border-radius: 8rpx;
								margin-right: 6rpx;
							}
						}
					}

					.i-space-line {
						border-left: 1rpx solid #EEEEEE;
						position: absolute;
						top: 70rpx;
						bottom: 34rpx;
						left: 50%;
					}

					.i-right {
						flex: 1;
						box-sizing: border-box;

					}
				}

				.i-text-box {
					padding-top: 50rpx;
					background-color: #FFFFFF;

					.i-title-box {
						justify-content: space-between;
						padding: 0 50rpx;
					}

					.i-text {
						padding: 0 50rpx;
						margin-top: 32rpx;
						line-height: rpx;
						padding-bottom: 36rpx;
					}
				}

				.i-type-box {
					padding: 0 50rpx;
					padding-bottom: 108rpx;
					width: 100%;
					margin-top: 50rpx;

					.i-type-title {
						color: #333333;
						font-size: 32rpx;
						font-weight: bold;
					}

					.i-type-list {
						padding-top: 10rpx;

						.i-item {
							height: 72rpx;
							line-height: 72rpx;
							padding-left: 40rpx;
							background: #FFFFFF;
							box-shadow: 0px 0px 10rpx 0rpx rgba(0, 0, 0, 0.08);
							border-radius: 4rpx;
							margin-top: 20rpx;
						}
					}

				}
			}
		}
	}
</style>
