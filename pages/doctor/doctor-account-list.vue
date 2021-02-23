<template>
	<!-- 医生账户列表 -->
	<view class="container">
		<view class="not-received-item prelative" @click="select(0)">
			<view class="money-box">
				<view class="money">{{eye?star:(data.waitIncome||0)}}</view>
				<view class="yuan">元</view>
			</view>
			<view class="tips">待结算金额</view>
			<view class="detail"></view>
			<image @click.stop="changeeye" class="eyeimg" mode="widthFix" :src="'../../static/eye'+(eye?2:1)+'.png'"></image>
		</view>
		<view class="line"> </view>
		
		<view class="received-item" @click="select(1)">
			<view class="received-money-box">
				<view class="received-money">{{eye?star:(data.realIncome||0)}}</view>
				<view class="received-yuan">元</view>
			</view>
			
			<view class="received-detail">已结算金额
				<view ></view>
			</view>
			
		</view>
		<view class="line"> </view>
		
	</view>
</template>

<script>
	const app = getApp();
	export default {
	 	data() {
	 		return {
				eye:app.getCache("eye"),
	 			data:{},
				star:"*",
			}
		},
		methods:{
			doctorAccountInfo(){
				app.doctorAccountInfo({}).then(res =>{
					if(res.status == 1){
						this.data = res.data;
						this.data.waitIncome = this.data.waitIncome?(this.data.waitIncome+''):"0";
						this.star = new Array((this.data.waitIncome.length||1)+1).join("*");
					}
				});
			},
			select(index){
				if(index==0){
					uni.navigateTo({
						url:'transferred-bankcard?money='+(this.data.waitIncome||0)
					});
				}else{
					uni.navigateTo({
						// url:'already-transferred-bankcard?money='+(this.data.realIncome||0)
						url:'doctor-already?money='+(this.data.realIncome||0)
					});
				}
			},
			changeeye(){
				this.eye = !this.eye;
				if(this.eye) app.setCache("eye",true);
				else app.setCache("eye",false);
			}
		},
		onLoad(){
			this.doctorAccountInfo();
		}
	}
</script>

<style lang="scss">
	.eyeimg{position:absolute;right:50rpx;top:70rpx;width:50rpx;z-index:3;}
	.container{
		.not-received-item{
			margin-left: 60rpx;
			.money-box{
				color: #333333;
				padding-top: 45rpx;
				height: 39rpx;
				line-height: 39rpx;
				display: flex;
				.money{
					font-size: 24px;
				}
				.yuan{
					font-size: 13px;
					margin-top: 6rpx;
				}
			}
			.tips{
				color: #52A29E;
				font-size: 15px;
				margin-top: 25rpx;
			}
			.detail{
				color: #999999;
				font-size: 13px;
				margin-top: 10rpx;
				padding-bottom: 35rpx;
				margin-right: 40rpx;
			}
		}
		.line{
			height: 6rpx;
			background-color: #F5F6F6;
		}
		
		.received-item{
			
			margin-left: 60rpx;
			.received-money-box{
				color: #333333;
				padding-top: 45rpx;
				height: 39rpx;
				line-height: 39rpx;
				display: flex;
				.received-money{
					font-size: 24px;
				}
				.received-yuan{
					font-size: 13px;
					margin-top: 6rpx;
				}
			}
			.received-detail{
				font-size: 13px;
				color: #999999;
				margin-top: 13rpx;
				padding-bottom: 35rpx;
			}
		}
	}
</style>
