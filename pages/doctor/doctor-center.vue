<template>
	<view class="container">
		<view class="message-box">
			<image src="../../static/img/doctor_center.png" mode="widthFix" class="background-img"></image>
			<view class="info-box">
				<view class="title">个人中心</view>
				<image :src="data.portrait" mode="widthFix" class="avator"></image>
				<view class="name">{{data.doctorName}}</view>
				<view class="position">{{data.technicalTitle}}</view>
				<view class="department">{{data.hospital+data.department}}</view>
			</view>
		</view>
		<view class="item-list" v-for="(item,index) in list" :key="index" @click="clickItem(index)">
			<view class="left-name">{{item}}</view>
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
			<view class="line" ></view>
		</view>
		<view class="bottom"></view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
	
		data() {
			return {
				list: ["名片码","账户","身份认证"],
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
						url:'doctor-business-card'
					});
				}else if(index==1){
					uni.navigateTo({
						url:'doctor-account-list'
					});
				}else{
					uni.navigateTo({
						url:'../authentication/index'
					});
				}
			},
			getData(){
				app.doctorBusinessCard({uid:app.getCache('uid')}).then(res => {
					console.log(res);
					if (res.status == 1) {
						this.data = res.data;
					}
				});
			},
			
		},

	}
</script>

<style lang="scss">
	.container{
		height: 100%;
		.message-box{
			height: 510rpx;
			position: relative;
			text-align: center;
			.background-img{
				height: 510rpx;
				width: 100%;
			}
			.info-box{
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				height: 510rpx;
				color: #FFFFFF;
				.title{
					padding-top: 25rpx;
					font-size: 17px;
				}
				.avator{
					width: 136rpx;
					height: 136rpx;
					margin-top: 66rpx;
					border-radius: 50%;
				}
				.name{
					font-size: 20px;
					margin-top: 15rpx;
				}
				.position{
					font-size: 14px;
					margin-top: 12rpx;
				}
				.department{
					font-size: 14px;
					margin-top: 12rpx;
				}
			}
			
			
		}
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
</style>
