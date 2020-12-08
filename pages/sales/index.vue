<template>
	<view class="container">
		<view>
		<view class="item-list" v-for="(item,index) in list" :key="index" @click="clickItem(index)">
			<view class="left-name">{{item}}</view>
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
			<view class="line" ></view>
		</view>
		</view>
		<view class="pagebottombt">
			<view @click="cleartoken">退出登录</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
	
		data() {
			return {
				list: ["名片码","绑定的用户","账户","身份认证"],
				data:{}
			}
		},
		onLoad(){
			this.getData();
		},
		methods: {
			clickItem(index){
				if(index==0){
					uni.navigateTo({
						url:'sales-business-card?id='+app.getCache('uid')
					});
				}else if(index==1){
					uni.navigateTo({
						url:'user'
					});
				}else if(index==2){
					uni.navigateTo({
						url:'sales-account-list'
					});
				}else{
					this.judgeDoctorAuthenticationStatus();
				}
			},
			getData(){
				//
				app.doctorBusinessCard({uid:app.getCache('uid')}).then(res => {
					console.log(res);
					if (res.status == 1) {
						this.data = res.data;
					}
				});
			},
			judgeDoctorAuthenticationStatus(){
				app.authentication({id:app.getCache('uid')}).then(res =>{
					 if(res.status == 1){
						 let url = "/pages/authentication/index";
						 if(res.data.status==-1){
							 //认证失败
							 url = "/pages/authentication/index";
						 }else if(res.data.status==0){
							 //未认证
							 url = "/pages/authentication/index";
						 }else if(res.data.status==1){
							 //认证中
							 url = "/pages/authentication/result";
						 }else if(res.data.status==2){
							 //已认证
							 url = "/pages/authentication/detail";
						 }
						 uni.navigateTo({
						 	url
						 })
					 }
				});
			},
			cleartoken(){
				localStorage.removeItem("token");
				app.tip("退出成功");
				setTimeout(()=>{
					uni.reLaunch({
						url:"/pages/sales/register"
					})
				},1000)
			},
			
		},

	}
</script>

<style lang="scss">
	.container{
		height: 100vh;background-color: #F5F6F6;
		
		.item-list{
			// background-color: #FFFFFF;
			height: 106rpx;
			position: relative;
			.left-name{
				height: 106rpx;
				line-height: 106rpx;
				font-size: 15px;
				color: #333333;
				padding-left: 60rpx;
			}
			.right-arrow{
				position: absolute;
				right: 60rpx;
				width: 15rpx;
				height: 26rpx;
				top: 40rpx;
				
			}
			.line{
				height: 6rpx;
				background-color: #F5F6F6;
			}
		}
		.bottom{
			background-color: #F5F6F6;
			height: 400px;
		}
	}
	.pagebottombt {
		padding: 100rpx 0;
		
		view {
			background: #52A29E;
			color: #fff;
			text-align: center;
			font-size: 34rpx;
			line-height: 88rpx;
			border-radius: 45rpx;
			margin: 0 20rpx 0 20rpx;
		}
	}
</style>
