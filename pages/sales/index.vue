<template>
	<view class="container flexc">
		<view class="head">
			<text>欢迎您,{{user.name}}</text>
		</view>
		<view class="content flexc">

			<view class="item flexc">
				<view class="flex text-box" @click="toMybusiness">
					<text class="item-text">我开展的业务</text>
					<image src="../../static/icon/more_icon.png"></image>
				</view>
				<text class="item-subtext">我以业务员身份开展业务</text>
			</view>

			<view class="item flexc" v-if="user.isParent==1" @click="toSubordinate">
				<view class="flex text-box">
					<text class="item-text">下属团队业务情况</text>
					<image src="../../static/icon/more_icon.png"></image>
				</view>
				<text class="item-subtext">我的下级开展业务的情况</text>
			</view>

			<view class="item flexc" @click="toByorganization" v-if="user.isOrgManage==1">
				<view class="flex text-box">
					<text class="item-text">按组织架构查看业务情况 </text>
					<image src="../../static/icon/more_icon.png"></image>
				</view>
			</view>

			<view class="item flexc" style="margin-top: 30rpx;" v-if="user.isCrossPlatform==1">
				<view class="flex text-box" @click="toDataCenter">
					<text class="item-text">跨渠道数据中心</text>
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
				<view @click="judgeDoctorAuthenticationStatus">
					<view class="flex text-box border-bottom">
						<text class="item-text">身份认证</text>
						<image src="../../static/icon/more_icon.png"></image>
					</view>
				</view>
				<view @click="toModifyPsw">
					<view class="flex text-box">
						<text class="item-text">修改密码</text>
						<image src="../../static/icon/more_icon.png"></image>
					</view>
				</view>
			</view>
			<text class="login-out" @click="logOut">退出登录</text>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		data() {
			return {
				user: {
					name: '',
					isParent: 0,
					isOrgManage: 0,
					orgId: '',
					orgName: '',
					isCrossPlatform: 0,
				},
				info: {}

			}
		},
		onLoad() {
			this.user.isParent = app.getCache('isParent')
			this.user.isOrgManage = app.getCache('isOrgManage')
			this.user.isCrossPlatform = app.getCache('isCrossPlatform')
			this.user.name = app.getCache('name')
			this.user.orgId = app.getCache('orgId')
			this.user.orgName = app.getCache('orgName')
			console.log(this.user)
		},
		methods: {
			toMybusiness() {
				uni.navigateTo({
					url: 'sales-business'
				})
			},
			toSubordinate() {
				uni.navigateTo({
					url: 'by-subordinate'
				})
			},
			toByorganization() {
				uni.navigateTo({
					url: 'data-center'

				})
			},
			toByorganization() {
				uni.navigateTo({
					url: 'by-organization?orgId=' + this.user.orgId + '&orgName=' + this.user.orgName

				})
			},
			toDataCenter() {
				uni.navigateTo({
					url: 'data-center'

				})
			},
			toModifyPsw() {
				uni.navigateTo({
					url: '../sales/change-password'
				});
			},
			toAccount() {
				uni.navigateTo({
					url: 'sales-account-list'
				});
			},
			judgeDoctorAuthenticationStatus() {
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
			logOut() {
				// localStorage.removeItem("token");
				localStorage.removeItem("salesToken");
				localStorage.removeItem("isParent"); //是否有下级
				localStorage.removeItem("isOrgManage"); //是否有部门管理权限
				localStorage.removeItem("isCrossPlatform"); //是否有权限跨平台查看统计数据
				localStorage.removeItem("name"); //业务员名称
				localStorage.removeItem("orgId"); //业务id
				localStorage.removeItem("orgName"); //部门名称
				app.tip("退出成功");
				setTimeout(() => {
					uni.reLaunch({
						url: "/pages/sales/register?isSales=1"
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

	@mixin item-box() {
		padding: 0 50rpx;
		justify-content: space-between;
		align-items: center;
		height: 88rpx;
		background-color: #FFFFFF;

		.text {
			color: #333333;
			font-size: 30rpx;
		}

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
					@include item-box;
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
		}
	}
</style>
