<template>
	<view class="container flexc">
		<view class="head">
			<text>欢迎您,{{info.name}}</text>
		</view>
		<view class="content flexc">
			<view class="item flexc">
				<view class="flex text-box" @click="toMybusiness">
					<text class="item-text">我开展的业务</text>
					<image src="../../static/icon/more_icon.png"></image>
				</view>
				<text class="item-subtext">我以业务员身份开展业务</text>
			</view>
			<view class="item flexc" v-if="isParent==1">
				<view class="flex text-box">
					<text class="item-text">下属团队业务情况</text>
					<image src="../../static/icon/more_icon.png"></image>
				</view>
				<text class="item-subtext">我的下级开展业务的情况</text>
			</view>

			<view class="item flexc" @click="toByorganization"  v-if="isOrgManage">
				<view class="flex text-box">
					<text class="item-text">按组织架构查看业务情况 </text>
					<image src="../../static/icon/more_icon.png"></image>
				</view>
			</view>
			<view class="item flexc" style="margin-top: 30rpx;" v-if="isCrossPlatform">
				<view class="flex text-box">
					<text class="item-text">跨平台数据中心</text>
					<image src="../../static/icon/more_icon.png"></image>
				</view>
			</view>

			<view class="auth-box flexc" style="margin-top: 30rpx;">
				<view @click="toAccount">
					<view class="flex text-box border-bottom">
						<text class="item-text">账户</text>
						<image src="../../static/icon/more_icon.png"></image>
					</view>
				</view>
				<view @click="toAuth">
					<view class="flex text-box border-bottom">
						<text class="item-text">身份认证</text>
						<image src="../../static/icon/more_icon.png"></image>
					</view>
				</view>
				<view>
					<view class="flex text-box" @click="toModityPsw">
						<text class="item-text">修改密码</text>
						<image src="../../static/icon/more_icon.png"></image>
					</view>
				</view>
			</view>

			<text class="login-out" @click="loginOut">退出登录</text>

		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				isParent: 0,
				isOrgManage: 0,
				isCrossPlatform: 0,
				info:{}
				
			}
		},
		onLoad() {
			this.isParent = app.getCache('isParent')
			this.isOrgManage = app.getCache('isOrgManage')
			this.isCrossPlatform = app.getCache('isCrossPlatform')
		},
		methods: {
			toMybusiness() {
				uni.navigateTo({
					url: 'my-business'
				})
			},
			toByorganization() {
				uni.navigateTo({
					url: 'by-organization'
				})
			},
			toAccount() {
				uni.navigateTo({
					url: '../sales/sales-account-list'
				});
			},
			toAuth() {
				app.sale_authentication({}).then(res => {
					if (res.status == 1) {
						let url = "/pages/sales/authentication/index";
						if (res.data.status == -1) {
							//认证失败
							url = "/pages/sales/authentication/index";
						} else if (res.data.status == 0) {
							//未认证
							url = "/pages/sales/authentication/index";
						} else if (res.data.status == 1) {
							//认证中
							url = "/pages/sales/authentication/result";
						} else if (res.data.status == 2) {
							//已认证
							url = "/pages/sales/authentication/detail";
						}
						uni.navigateTo({
							url
						})
					}
				});
			},
			toModityPsw() {
				uni.navigateTo({
					url: 'change-password'
				});
			},
			loginOut() {
				localStorage.removeItem("token");
				app.tip("退出成功");
				setTimeout(() => {
					uni.reLaunch({
						url: "/pages/sales/register"
					})
				}, 1000)
			}
		}
	}
</script>

<style scoped lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}

	@mixin item {
		padding: 0 50rpx;
		justify-content: space-between;
		align-items: center;
		height: 90rpx;
		background-color: #FFFFFF;

		.text {
			color: #333333;
			font-size: 30rpx;
		}
	}

	@mixin item-box() {
		@include item;

		image {
			width: 15rpx;
			height: 27rpx;
		}
	}

	.container {
		.head {
			color: #333333;
			font-size: 32rpx;

			text {
				display: inline-block;
				padding: 36rpx 0 40rpx 50rpx;
			}
		}

		.item {
			.text-box {
				@include item-box;
			}

			.item-subtext {
				padding-left: 50rpx;
				color: #999999;
				font-size: 26rpx;
				height: 84rpx;
				padding-top: 20rpx;
			}
		}

		.auth-box {
			view {
				padding: 0 50rpx;
				background-color: #FFFFFF;

				.text-box {
					@include item;
					padding: 0 0;
				}
			}

			.border-bottom {
				border-bottom: 1rpx solid #EEEEEE;
			}
		}

		.login-out {
			margin: 0 auto;
			width: 628rpx;
			height: 88rpx;
			line-height: 88rpx;
			text-align: center;
			background-color: #4789EB;
			border-radius: 45rpx;
			color: #FFFFFF;
			margin-top: 80rpx;
			margin-bottom: 72rpx;
		}
	}
</style>
