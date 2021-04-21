<template>
	<!-- 账单详情 -->
	<view class="container">
		<turnback @back="back" v-if="isMiniProgram"> </turnback>
		  
		<!-- <view class="info">
			<image :src="data.portrait" mode="widthFix" class="avtor"></image>
			<view class="info-box">
				<view class="list-name-box">
					<view class="name">来自{{data.name}}的订单</view>
					<view class="time"></view>
				</view>
				<view class="list-detail time">{{data.createTime}}</view>
			</view>
			<view class="list-money">{{'¥'+data.money}}</view>
		</view> -->
		<view class="line"></view>
		<view class="list-item">
			<view class="item-name">收益来源</view>
			<view class="item-detail">{{data.name}}</view>
		</view>
		<view class="list-item">
			<view class="item-name">收益金额</view>
			<view class="item-detail">{{data.money+'元'}}</view>
		</view>
		
		<view class="list-item">
			<view class="item-name">转账时间</view>
			<view class="item-detail">{{data.transTime}}</view>
		</view>
		
		<view class="list-item">
			<view class="item-name">账户名称</view>
			<view class="item-detail">{{data.accountName}}</view>
		</view>
		
		<view class="list-item">
			<view class="item-name">开户行</view>
			<view class="item-detail">{{data.bankName}}</view>
		</view>
		
		<view class="list-item">
			<view class="item-name">账号</view>
			<view class="item-detail">{{data.bankNo}}</view>
		</view>
		
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
				id:"",
				data:{
					
				},
				isMiniProgram:false
				
				
			}
		},
		methods: {
			getMiniProgramStatic(){
			 wx.miniProgram.getEnv((res)=>{
			    this.isMiniProgram = res.miniprogram?true:false;
			 })
			},
			back(){
			  uni.navigateBack({
			   
			  })
			},
			
			getDetail(){
				app.sale_divideRecord({id:this.id}).then(res =>{
					if(res.status ==1){
						this.data = res.data;
					}
				});
			}
			
		},
		onLoad(props){
			this.id = props.id;
			this.getDetail();
			this.getMiniProgramStatic();
		}

	}
</script>

<style lang="scss">
	.container{
		.info {
			display: flex;
			margin-left: 50rpx;
			margin-right: 50rpx;
		    position: relative;
			.avtor {
				margin-top: 30rpx;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
			}
		
			.info-box {
				margin-top: 30rpx;
				margin-left: 20rpx;
				color: #333333;
				margin-bottom: 25rpx;
				margin-right: 0rpx;
				.list-name-box {
					display: flex;
					.name{
						font-size: 15px;
					}
					.time{
						font-size: 12px;
						color: #999999;
					}
				}
		
				.list-detail {
					font-size: 12px;
				}
		
			}
			.list-money{
				position: absolute;
			    top: 30rpx;
				right: 0rpx;
			}
		
		}
		.line {
			height: 20rpx;
			background-color: #F5F6F6;
		}
		.list-item{
			height: 80rpx;
			font-size: 15px;
			position: relative;
			.item-name{
				line-height: 80rpx;
				margin-left: 50rpx;
				color: #333333;
			}
			.item-detail{
				color: #999999;
				position: absolute;
				right: 50rpx;
				top: 20rpx;
			}
		}
	}
</style>
