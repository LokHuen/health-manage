<template>
	<view class="container">
		<view class="message-box">
			<image src="../../static/img/doctor_center.png" mode="widthFix" class="background-img"></image>
			<view class="info-box">
				<view class="title"> </view>
				<image :src="data.portrait" mode="aspectFill" class="avator"></image>
				<view class="name">{{data.doctorName}}</view>
				<view class="position">{{data.technicalTitle}}</view>
				<view class="department">{{data.hospital+data.department}}</view>
			</view>
		</view>
		<view class="item-list" v-for="(item,index) in list1" :key="index" @click="clickItem(0,index)">
			<view class="left-name">{{item}}</view>
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
			<view class="line" ></view>
		</view>
		
		 <view style="height: 30rpx;background-color: #F5F6F6;"></view> 
		<view class="item-list" v-for="(item,index) in list2" :key="8+index" v-if="index==2 ||(index>=0 && index<=1 && data.showAccount==1)" @click="clickItem(1,index)">
			<view class="left-name">{{item}}</view>
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
			<view class="line" ></view>
		</view>
		<view style="height: 30rpx;background-color: #F5F6F6;"></view>
		<view class="item-list" data-src="/pages/doctor/changeData" @click="tootherpage">
			<view class="left-name">个人资料</view>
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
				list1:["名片码","医嘱署名","电脑端患者管理权限配置"],
				list2:["账户","身份认证","消息提醒"],
				data:{}
			}
		},
		onShow(){
			this.getData();
		},
		methods: {
			clickItem(index,secondIndex){
				if(index == 0){
					
					if(secondIndex==0){
						uni.navigateTo({
							url:'doctor-business-card?id='+app.getCache('uid')
						});
					}else if(secondIndex==1){
						uni.navigateTo({
							url:'doctor-signature?name='+this.data.adviceName
						});
					}else{
						uni.navigateTo({
							url:'/pages/branch/list'
						});
					}
				}else{
					if(secondIndex==0){
						uni.navigateTo({
							url:'doctor-account-list'
						});
						
					}else if(secondIndex==1){
						this.judgeDoctorAuthenticationStatus();
					}else{
						uni.navigateTo({
							url:'message-remind?isRcvSurveyResult='+this.data.isRcvSurveyResult+'&isRcvSevereMalnutrition='+this.data.isRcvSevereMalnutrition
						})
					}
				}
				
			},
			getData(){
				// 34是医生
				app.doctorBusinessCard({uid:app.getCache('uid')}).then(res => {
					console.log(res);
					if (res.status == 1) {
						this.data = res.data;
					}
				});
			},
			judgeDoctorAuthenticationStatus(){
				//34
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
			tootherpage(e){
				uni.navigateTo({
					url:e.currentTarget.dataset.src
				})
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
			height: 30px;
		}
	}
</style>
