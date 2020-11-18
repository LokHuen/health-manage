<template>
	<view class="container">
		<!-- <view class="coupons_mask" @touchmove.stop.prevent="true"> -->
		<view class="coupons_mask" @touchmove.stop.prevent="true" v-if="coupon.couponId>0&&coupon.hadCoupon==0">
			<view class="coupons_content">
				<view class="coupons_box">
					<view class="img-box">
						<button v-if="!isLogin" open-type="getUserInfo" @getuserinfo="onGotUserInfo" class="coupon-login-btn"></button>
						<image class="coupons_image" mode="widthFix" :src="imageUrl+'/image/bg_coupons.png'"></image>
					</view>

					<text class="draw_btn" @click="drawCoupon">立即领取</text>
					<image mode="widthFix" :src="imageUrl+'/icon/icon_coupons_close.png'" @click="closeDrawCoupon"></image>
				</view>
			</view>
		</view>
		<view class="top_image_box">
			<image class="top_image" :src="imageUrl+'/image/bg_top_image.png'"></image>
		</view>
		<view class="content">
			<text class="top_title" v-if="0">首页</text>
			<view class="message_box">
				<image class="icon_horn" :src="imageUrl+'/icon/icon_horn.png'"></image>
				<swiper class="swiper-submit" autoplay :vertical="true">
					<swiper-item class="swiper-item" v-for="(item,index) in interpretList" :key="index">
						<text class="someone_submit">{{item.content}}申请</text>
					</swiper-item>
				</swiper>
			</view>
			<swiper :class="bannerIndex===bannerData.length-1?'swiper lastItem':'swiper firstItem'" :previous-margin="bannerIndex===bannerData.length-1?'90rpx':'0rpx'"
			 :next-margin="bannerIndex!=bannerData.length-1?'90rpx':'0rpx'" @change="swiperChange">
				<swiper-item v-for="(item,index) in bannerData" class="banner-swiper">

					<button v-if="!isLogin" open-type="getUserInfo" @getuserinfo="onGotUserInfo" class="i-login-btn"></button>

					<!-- <view class="banner_item" @click="clickBannerItem(index)"> -->
					<view class="banner_item">
						<image class="icon" :src="item.icon"></image>
						<view class="text_box">
							<view class="banner-title">{{item.title}}</view>
							<view class="sub_title">{{item.subTitle}}</view>
						</view>
					</view>
				</swiper-item>
			</swiper>
			<view class="intro">
				<image class="intro_image" mode="widthFix" :src="priceMap.consultPic" v-show="bannerIndex==0"></image>
				<image class="intro_image" mode="widthFix" :src="priceMap.mriPic" v-show="bannerIndex==1"></image>
				<view class="apponit_btn" @click="clickBannerItem(bannerIndex)">预约解读 ￥{{price}}
					<view @click.stop.prevent="true">
						<button v-if="!isLogin" open-type="getUserInfo" @getuserinfo="onGotUserInfo" class="i-login-btn"></button>
					</view>
				</view>
				<text class="refund_des">24小时内未解读或不满意，可申诉退款</text>
			</view>
		</view>
		<uni-popup ref="popup" type="bottom">
			<view class="white-background">
				<view class="title-box">
					<view class="" @click="closeTips">
						<image class="close" :src="imageUrl+'/icon_close.png'" mode="aspectFill"></image>
					</view>
					<view class="title">
						温馨提示
					</view>
				</view>
				<view class="remind">
					专家在查看影像报告的时候可能需要通过电话与您取得联系，获取更多的疾病信息。
				</view>
				<button class="agree" type="default" @click="sureClick">同意</button>
				<view class="white-bottom">

				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import http from "../../common/http.js";
	const app = getApp();
	const url = app.globalData.baseUrl
	export default {
		computed: {
			price: function() {
				return this.bannerIndex == 1 ? this.priceMap.telephonePrice : this.priceMap.consultPrice
			}
		},
		data() {
			return {
				imageUrl: this.$imageUrl,
				bannerData: [{
						icon: app.globalData.imageUrl + "/icon/body_report.png",
						title: "健康体检报告解读",
						subTitle: "上传体检报告并说明你的问题，医生在线解读。"
					},
					{
						icon: app.globalData.imageUrl + "/icon/image_report.png",
						title: "影像学报告解读",
						subTitle: "由知名专家对您的B超、CT等影像出具电子版解读报告"
					}
				],
				bannerIndex: 0,
				interpretList: [],
				coupon: {
					couponId: -1,
					hadCoupon: 1,
				},
				priceMap: {},
				isLogin: app.getCache('token'),
			}
		},
		onLoad() {
			this.getIndexData()
		},
		onShareAppMessage(res) {
			return {
				title: '报告结果解读',
				path: '/pages/index/index'
			}
		},
		onShareTimeline(){
			return {
				title: '报告结果解读',
				path: '/pages/index/index'
			}
		},
		onPullDownRefresh() {
			this.getIndexData()

		},
		onShow() {
			this.isLogin = app.getCache('token');
		},
		methods: {
			onGotUserInfo(res) {
				console.log(res)
				if (res.detail.iv) {
					this.login();
				} else {
					app.tip("取消登陆", 1500);
				}
			},
			login() {
				uni.login({
					success: (res) => {
						console.log(res.code)
						app.login({
							code: res.code
						}).then(res => {
							var token = res.data["tkbgjd-token"];
							app.setCache('token', token);
							console.log(token);
							this.isLogin = app.getCache('token');
							app.saveinfo();
							app.tip('登陆成功', 1500)
							this.getIndexData();
						});
					}
				});
			},
			getUserMessageInfo() {
				app.mine({}).then(res => {
					if (res.status == 1) {
						app.setCacheAsync('id', res.data.id);
						app.setCacheAsync('nickname', res.data.nickname);
						app.setCacheAsync('portrait', res.data.portrait);
						app.setCacheAsync('moblie', res.data.moblie);

					}
				});
			},
			swiperChange(e) {
				this.bannerIndex = e.detail.current
			},
			clickBannerItem(index) {
				if (index === 1) {
					uni.navigateTo({
						// this.$refs.popup.open()
						url: '../buy-imaging-report/buy-imaging-report',
					});
				} else {
					uni.navigateTo({
						url: '../body-report/body-report',
					});
				}
			},
			closeTips() {
				this.$refs.popup.close()
			},
			sureClick() {
				//同意

			},
			getIndexData() {
				http.get('/wx/common/index')
					.then((data) => {
						console.log(data)
						if (data.status == 1) {
							this.coupon = data.data.coupon
							this.interpretList = data.data.interpretList
							this.priceMap = data.data.priceMap
						}
						if (this.isLogin) {
							this.getUserMessageInfo();
						}
						uni.stopPullDownRefresh();
					})
			},
			drawCoupon() {
				let couponId = this.coupon.couponId
				console.log(couponId)
				http.get('/wx/coupon/draw', {
						couponId
					})
					.then((data) => {
						if (data.status == 1) {
							this.coupon.hadCoupon = 1
							app.tip('领取成功', 1500);
						}
					})
			},
			closeDrawCoupon() {
				this.coupon.couponId = -1
			}
		}
	}
</script>

<style lang="scss">
	.coupon-login-btn {
		z-index: 2001;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border: none;
		opacity: 0;
	}

	.img-box {
		margin-top: 300rpx;
		width: 650rpx;
		margin-left: 50rpx;
		height: 600rpx;
		position: relative;
	}

	.i-login-btn {
		z-index: 99;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border: none;
		opacity: 0;
	}

	button::after {
		border: none !important;
	}

	.white-background {
		border-radius: 10px;
		height: 230px;
		background-color: #FFFFFF;
	}

	.white-bottom {
		height: 100px;
		background-color: #FFFFFF;
		margin-top: 5px;
	}

	.title {
		font-size: 21px;
		color: #333333;
		text-align: center;
		flex: 1;
		padding-right: 33px;
	}

	.remind {
		font-size: 16px;
		color: #666666;
		margin-top: 28px;
		margin-left: 30px;
		margin-right: 30px;
	}

	.agree {
		font-size: 18px;
		color: #FFFFFF !important;
		background-color: #2793EC !important;
		width: 120px;
		height: 40px;
		margin-top: 32px;
		border-radius: 4px;
	}

	.close {
		width: 13px;
		height: 13px;
		margin-left: 20px;
	}

	.title-box {
		display: flex;
		height: 20px;
		line-height: 20px;
		padding-top: 25px;
	}

	.container {
		position: relative;

		.coupons_mask {
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			background-color: rgba(0, 0, 0, 0.5);
			position: fixed;
			z-index: 2000;

			.coupons_content {
				position: relative;

				.coupons_image {
					padding: atuo;
					width: 100%;
				}

				.draw_btn {
					position: absolute;
					bottom: 20px;
					left: 50%;
					margin-left: -250rpx;
					width: 500rpx;
					height: 88rpx;
					line-height: 88rpx;
					color: #EE524A;
					font-size: 38rpx;
					text-align: center;
					background: linear-gradient(to top, #FFEEE8, #FBCCA2);
					border-radius: 44rpx;
				}

				image:nth-child(3) {
					width: 100rpx;
					position: absolute;
					bottom: -50px;
					left: 50%;
					margin-left: -50rpx;
				}
			}
		}

		.top_image_box {
			.top_image {
				width: 750rpx;
				height: 515rpx;
			}
		}

		.content {
			position: absolute;
			top: 0;
			display: flex;
			flex-direction: column;
			align-items: center;

			.top_title {
				position: absolute;
				width: 750rpx;
				margin-top: 56rpx;
				font-size: 36rpx;
				font-weight: bold;
				color: #333333;
				text-align: center;
			}

			.message_box {
				display: flex;
				flex-direction: row;
				justify-content: center;
				align-items: center;
				margin-top: 370rpx;
				line-height: 36rpx;
				height: 36rpx;
				width: 280rpx;

				.icon_horn {
					width: 30rpx;
					height: 25rpx;
				}

				.swiper-submit {
					height: 36rpx;
					line-height: 34rpx;
					width: 100%;

					.swiper-item {
						margin-left: 16rpx;
						width: 100%;
						text-align: left;

						.someone_submit {
							width: 100%;
							color: #FF711C;
							font-size: 26rpx;
						}
					}
				}
			}

			.swiper {
				padding: 0rpx;
				width: 710rpx;
				margin-top: 40rpx;
				height: 248rpx;

				.banner-swiper {
					.banner_item {
						padding-top: 62rpx;
						padding-bottom: 18rpx;
						background-color: #FFFFFF;
						display: flex;
						border-radius: 20rpx;
						width: 600rpx;
						height: 248rpx;
						position: relative;

						.icon {
							margin-left: 48rpx;
							width: 110rpx;
							height: 140rpx;
						}

						.text_box {
							display: flex;
							flex: 1;
							margin-left: 50rpx;
							flex-direction: column;

							.banner-title {
								font-size: 33rpx;
								font-weight: bold;
								color: #333333;
							}

							.sub_title {
								margin-top: 20rpx;
								font-size: 26rpx;
								color: #666666;
							}
						}
					}
				}
			}

			.firstItem {
				margin-left: 40rpx;
				margin-right: 0rpx;
			}

			.lastItem {
				margin-left: 0rpx;
				margin-right: 40rpx;
			}

			.intro {
				margin-left: 40rpx;
				margin-right: 40rpx;
				margin-bottom: 60rpx;
				padding-bottom: 70rpx;
				box-shadow: 0px 0px 9rpx 1rpx rgba(0, 0, 0, 0.18);
				border-radius: 15rpx;
				display: flex;
				flex-direction: column;
				width: 670rpx;
				margin-top: 20rpx;
				align-items: center;

				.intro_image {
					width: 100%;
				}

				.apponit_btn {
					margin-top: 34rpx;
					background-color: #007AFF;
					width: 540rpx;
					height: 82rpx;
					line-height: 82rpx;
					text-align: center;
					border-radius: 8rpx;
					font-size: 38rpx;
					color: #FFFFFF;
					position: relative;
				}

				.refund_des {
					font-size: 26rpx;
					margin-top: 20rpx;
					color: #666666;
				}
			}
		}
	}
</style>
