<template>
	<view class="appoint-box">
		<view>
			<label>请仔细阅读并同意</label>
			<text @click="toProtocol">《用户服务协议》</text>
		</view>
		<view>
			<label>同意请勾选：</label>
			<image @click="change" :src="agreen?imageUrl+'/icon/icon_check.png':imageUrl+'/icon/icon_uncheck.png'"></image>
		</view>
		<text :class="agreen&&isActive?'appoint-btn activite':'appoint-btn'" @click="toApoint">提交预约 ¥{{price}}</text>
		<text class="coupons-des" v-if="hasCoupon">已使用优惠券减免{{discount}}元</text>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		props: {
			price: {
				type: String,
				default: "0"
			},
			discount: {
				type: String,
				default: "0"
			},
			hasCoupon: {
				type: Boolean,
				default: false
			},
			isActive: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				imageUrl:this.$imageUrl,
				agreen: false,
			};
		},

		methods: {
			change() {
				this.agreen = !this.agreen
			},
			toProtocol() {
				uni.navigateTo({
					url:'../../pages/index/agreement'
				})({
					title: "跳转用户服务协议"
				})
			},
			toApoint() {
				if (this.agreen&&this.isActive) {
					this.$emit("appointHandle", {});
				} else {
					if(this.isActive&&!this.agreen){
						app.tip("未同意用户协议",2000)
					}
				}
			}
		}
	}
</script>

<style lang="scss">
	.appoint-box {
		display: flex;
		flex-direction: column;
		align-items: center;

		view:nth-child(1) {
			display: flex;
			justify-content: center;

			label {
				font-size: 28rpx;
				color: #666666;
			}

			text {
				font-size: 28rpx;
				color: #2793EC;
				margin-left: 8rpx;
			}
		}

		view:nth-child(2) {
			display: flex;
			justify-content: center;
			align-items: center;
			margin-top: 25rpx;

			label {
				font-size: 28rpx;
				color: #666666;
			}

			image {
				width: 30rpx;
				height: 30rpx;
			}
		}

		.appoint-btn {
			margin-top: 80rpx;
			background-color: #D2D2D2;
			font-size: 38rpx;
			width: 540rpx;
			height: 82rpx;
			line-height: 82rpx;
			text-align: center;
			color: #FFFFFF;
			border-radius: 8rpx;
		}

		.activite {
			background-color: #2793EC;
		}

		.coupons-des {
			font-size: 26rpx;
			color: #999999;
			margin-top: 19rpx;
			margin-bottom: 130rpx;
		}
	}
</style>
