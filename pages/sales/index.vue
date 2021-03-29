<template>
	<view class="container flexc">
		<view>
			<image src="../../static/warnshow.jpg" style="width:100vw;display:block;" mode="widthFix"
				@click="towarnpage"></image>
		</view>
		<view class="head flexc">
			<view class="flex" style="justify-content: space-between;">
				<text class="username">欢迎您,{{user.name}}</text>
				<view style="padding: 10rpx;">
					<image style="width: 32rpx;height: 32rpx;" src="../../static/icon/tishi.png" @click="toMessages(false)">
					</image>
				</view>
				<view class="msg-point" v-if="msgInfo.status==0"></view>
			</view>
			<view class="msg-content flex" v-if="msgInfo.status==0" @click="toMessages(true)" style="flex-wrap: nowrap;">
				<image style="width: 32rpx;height: 32rpx;margin-right: 12rpx;" src="../../static/icon/tishi.png">
				</image>
				<text style="color: #DD524D;font-size: 30rpx;">{{msgInfo.content}}</text>
			</view>
		</view>
		<view class="content flexc" style="padding-bottom:20px;">
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
			
			<view class="item flexc" style="margin-top: 30rpx;">
				<view class="flex text-box" @click="toDatabase">
                     <view class="flex">
                     	<text >资料库</text>
						<view class="new" v-show="showNew">
							new
						</view>
                     </view>
					
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
				info: {},
				msgInfo: {
					id: '',
					content: '',
					status: 1
				},
				showNew:true
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
		onShow() {
		    this.judgeNew();
			this.hasMesage()
		},
		methods: {
			toMessages(needRead) {
				if (needRead) {
					app.readMessage({
						id: this.msgInfo.id
					}).then((res) => {
						this.msgInfo.status = 1
						uni.navigateTo({
							url: 'message-list'
						})
					}).catch((err) => {
						uni.navigateTo({
							url: 'message-list'
						})
					})
				} else {
					uni.navigateTo({
						url: 'message-list'
					})
				}
            },
			judgeNew(){
				if(app.getCache('dataBase')==1){
				   this.showNew = false;
				}

			},
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
			toDatabase(){
				app.setCache('dataBase',1);
				uni.navigateTo({
					url:'/pages/sales/database'
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
			},
			towarnpage() {
				uni.navigateTo({
					url: "/pages/doctor/warn"
				})
			},
			hasMesage() {
				app.hasMessage().then((res) => {
					this.msgInfo = res.data
				})
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
		.new{
			margin-left: 30rpx;
            height: 30rpx;
			line-height: 28rpx;
			margin-top: 10rpx;
			font-size: 25rpx;
			width: 55rpx;
			text-align: center;
			color: #FFFFFF;
			background-color: rgba(191, 9, 9, 100);
			border-radius: 5rpx;
		}
		.head {
			padding: 32rpx 50rpx;
			color: #333333;
			font-size: 32rpx;
			position: relative;

			.msg-box {
				width: 52rpx;
				height: 52rpx;
				margin-top: 10rpx;
			}

			.msg-point {
				position: absolute;
				top: 30rpx;
				right: 30rpx;
				width: 16rpx;
				height: 16rpx;
				background-color: #DD524D;
				border-radius: 8rpx;
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
