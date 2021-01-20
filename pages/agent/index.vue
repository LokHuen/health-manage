<template>
	<view class="container">
		<view class="welcome">欢迎您，代理商刘晓</view>
		<view class="flex numbox" @click="toOrder">
			<view class="numitem">
				<view class="number">{{info.orderNum||0}}</view>
				<view>本月订单数</view>
				<view class="tips">订单统计范围:客户已付款订单</view>
			</view>
			<view class="numitem">
				<view class="number">{{info.money||0}}</view>
				<view>本月订单总金额(元)</view>
			</view>
		</view>
		<view>
		<view class="item-list flex" v-for="(item,index) in list" :key="index" @click="clickItem(index)">
			<view class="left-name">{{item}}</view>
			<view v-if="index==0" style="padding-right:20rpx;">{{info.salesNum||0}}</view>
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
			<!-- <view class="line" ></view> -->
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
				list: ["团队成员","按月统计订单数据","我开展的业务","修改密码"],
				info:{}
			}
		},
		onLoad(){
			if(!app.getCache("salesToken")) uni.reLaunch({
				url:"/pages/agent/register",
			})
		},
		onShow(){
			this.getData();
		},
		methods: {
			clickItem(index){
				if(index==0){
					uni.navigateTo({
						url:'team-member-list'
					});
				}else if(index==1){
					uni.navigateTo({
						url:'month-order-list'
					});
				}else if(index==2){
					uni.navigateTo({
						url:'my-business'
					});
				}else if(index==3){
					uni.navigateTo({
						url:'change-password'
					});
				}
				
			},
			getData(){
				//
				app.agentInfo({}).then(res => {
					console.log(res);
					if (res.status == 1) {
						this.info = res.data;
					}
				});
			},
			toOrder(){
				uni.navigateTo({
					url:'order-list'
				})
			},
			cleartoken(){
				localStorage.removeItem("token");
				app.tip("退出成功");
				setTimeout(()=>{
					uni.reLaunch({
						url:"/pages/agent/register"
					})
				},1000)
			},
			
		},

	}
</script>

<style lang="scss">
	.container{
		height: 100vh;background-color: #F5F6F6;overflow-y: auto;
		.welcome{line-height:110rpx;padding-left:50rpx;}
		.numbox{
			padding:60rpx 30rpx;background:#fff;
			.numitem{
				width:50%;text-align:center;font-size: 30rpx;box-sizing:border-box;
			    position: relative;
				&:nth-child(1){border-right:2rpx solid #ddd;}
				.number{
					font-size: 52rpx;padding-bottom:10rpx;
					color: #4B8BE8;
				}
				.tips{
					font-size: 20rpx;  color: #999999;position: absolute;
					//margin-top: 20rpx;
					bottom: -40rpx;
					left: 40rpx;
				}
			}
			
		}
		.item-list{
			background-color: #FFFFFF;
			height: 108rpx;margin-top:10rpx;
			position: relative;padding-right:40rpx;
			.left-name{
				height: 106rpx;flex:1;
				line-height: 106rpx;
				font-size: 32rpx;
				color: #333333;
				padding-left: 60rpx;
			}
			.right-arrow{
				// position: absolute;
				// right: 60rpx;
				width: 18rpx;
				// height: 26rpx;
				// top: 40rpx;
				
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
		padding: 120rpx 0 100rpx;
		
		view {
			background: #4B8BE8;
			color: #fff;
			text-align: center;
			font-size: 34rpx;
			line-height: 88rpx;
			border-radius: 45rpx;
			margin: 0 60rpx 0 60rpx;
		}
	}
</style>
