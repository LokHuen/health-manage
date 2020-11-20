<template>
	<view>
		<view class="top">
			<view @click.stop.prevent="blank">
				<button v-if="!isLogin" open-type="getUserInfo" @getuserinfo="onGotUserInfo" class="login-top"
				 hover-stop-propagation></button>
			</view>
			<image class="avator" :src="isLogin?userInfo.portrait:imageUrl+'/mine/icon_avator.png'" mode="widthFix"></image>
			<view class="name">
				{{isLogin?userInfo["nickname"]:"点击登录"}}
				
			</view>
		</view>
		<view style="height: 10px;"> </view>
		<view class="itemList" v-for="(item,index) in list" :key="index" @click="goDetail(index)">
			<view @click.stop.prevent="blank">
				<button v-if="!isLogin" open-type="getUserInfo" @getuserinfo="onGotUserInfo" class="i-login-btn"></button>
			</view>
			<image class="listIcon" :src="item[1]" mode="widthFix" ></image>
			<view class="listText">
				<text>{{item[0]}}<text class="red-point" v-show="index==0 && userInfo.healthDialogue==1 && isLogin"></text></text>
			</view>

			<view class="order-tip" v-show="index==2 && userInfo.unreadOrder==1 && isLogin">有待评价订单</view>
		</view>

	</view>
</template>

<script>
	const app = getApp();
	export default {
		props: ["userInfo", "list"],
		data() {
			return {
				imageUrl:this.$imageUrl,
				isLogin: app.getCache('token')
			};
		},
		methods: {
			goDetail(e) {
				let index = encodeURIComponent(JSON.stringify(e))
				this.$emit("clikeIndex", index)
			},
			onGotUserInfo(res) {
				if(res.detail.iv){
					this.loginClick();
				}else{
					app.tip("取消登陆",1500);
				}
			},
			loginClick(){
				this.$emit("loginClick")
			},
			blank(){
				
			}
		},
	
	}
</script>

<style>
	.top {
		display: flex;
		background-color: #FFFFFF;
		height: 45px;
		margin-top: 15px;
		position: relative;
	}

	.avator {
		height: 60px;
		width: 60px;
		border-radius: 50%;
		margin-left: 20px;
	}

	.name {
		font-size: 21px;
		height: 60px;
		line-height: 60px;
		margin-left: 5px;
	}

	.itemList {
		display: flex;
		margin-left: 20px;
		margin-right: 20px;
		margin-top: 20px;
		height: 54px;
		font-size: 15px;
		background-color: #FFFFFF;
		color: #333333;
		border-radius: 5px;
		box-shadow: 1px 1px 5px #999999;
		position: relative;
	}

	.i-login-btn {
		z-index: 9999;
		position: absolute;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		border: none;
		opacity: 0;
		
	}
	.plain {
	  border: none;
	  border-color: transparent;
	}
	button::after{border: none!important;}
	.login-top{
		z-index: 9999;
		position: absolute;
		left: 50rpx;
		top: 10rpx;
		width: 500rpx;
		height: 120%;
		border: none;
		opacity: 0;
	}
	

	.listIcon {
		height: 48rpx;
		width: 48rpx;
		margin-top: 15px;
		margin-left: 15px;
	}

	.listText {
		height: 54px;
		font-size: 15px;
		line-height: 54px;
		margin-left: 12.5px;
		flex: 1;
		/* text{} */
		position: relative;
	}

	.red-point {
		width: 5px;
		height: 5px;
		position: absolute;
		border-radius: 50%;
		background-color: #E21414;
		margin-top: 18px;
		margin-left: 3px;
	}

	.order-tip {
		color: #E21414;
		font-size: 14px;
		height: 54px;
		line-height: 54px;
		padding-right: 10px;
	}
</style>
