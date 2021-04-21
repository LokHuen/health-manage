<template>
	<!-- 账户列表 -->
	<view class="container">
		<turnback @back="back" v-if="isMiniProgram"> </turnback>
		  
		<view class="not-received-item" @click="select(0)">
			<view class="money-box">
				<view class="money">{{data.online?data.online:'0'}}</view>
				<view class="yuan">元</view>
			</view>
			<view class="tips">累计转账到银行卡的金额</view>
			<view class="detail"></view>
		</view>
		<view class="line"> </view>
		
		<view class="received-item" @click="select(1)">
			<view class="received-money-box">
				<view class="received-money">{{data.offline?data.offline :'0'}}</view>
				<view class="received-yuan">元</view>
			</view>
			
			<view class="received-detail">线下结算累计金额</view>
		</view>
		<view class="line"> </view>
		
	</view>
</template>

<script>
	const app = getApp();
	import wx from '../../plugins/jweixin.js'
	import turnback from "../../components/turnback.vue"
	
	export default {
		components: {turnback},
		
	 	data() {
	 		return {
	 			data:{},
				isMiniProgram:false
				
				
			}
		},
		methods:{
			getMiniProgramStatic(){
			 wx.miniProgram.getEnv((res)=>{
			    this.isMiniProgram = res.miniprogram?true:false;
			 })
			},
			back(){
			  uni.navigateBack({
			   
			  })
			},
			
			doctorAccountInfo(){
				app.sale_settleInfo({}).then(res =>{
					if(res.status == 1){
						this.data = res.data;
					}
				});
			},
			select(index){
				if(index==0){
					uni.navigateTo({
						url:'already-transferred-bankcard?money='+(this.data.offline||0)
					});
				}else{
					uni.navigateTo({
						url:'offline-already?money='+(this.data.online||0)
					});
				}
			}
		},
		onLoad(){
			this.doctorAccountInfo();
			this.getMiniProgramStatic();
		}
	}
</script>

<style lang="scss">
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
				color: #4B8BE8;
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
