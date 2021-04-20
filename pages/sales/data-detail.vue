<template>
	<view class="container">
		<turnback @back="back" v-if="isMiniProgram" style="position: sticky;top: 0;"> </turnback>
		<view v-for="(item,index) in commodityOrderList" :key="index" style="margin-top: 40rpx;">
			
			<view class="title">
				{{item.subtitle}}
			</view>
			<!-- 总订单数-->
			<view class="item-box flex">
				<view class="item-left">
					<view class="item-number">{{item.totalOrderCount||0}}</view>
					<view class="item-title">总订单数</view>
				</view>
				<view class="item-right">
					<view class="item-right-detail flex" v-for="(item1,index1) in item.orderList" :key="index1">       
						<view class="each1">{{item1.channelValue}}</view>
						<view class="each">{{item1.orderCount||0}}</view>
						<view class="each1">本月新增</view>
						<view class="each">{{item1.monthOrderCount||0}}</view>
					</view>
					
				</view>
				
			</view>
			
			<!-- 总盒数 -->
			<view class="item-box flex">
				<view class="item-left">
					<view class="item-number">{{item.totalQuantity||0}}</view>
					<view class="item-title">总盒数</view>
				</view>
				<view class="item-right">
					<view class="item-right-detail flex" v-for="(item2,index2) in item.orderQuantityList" :key ="index2">       
						<view class="each1">{{item2.channelValue}}</view>
						<view class="each">{{item2.quantity||0}}</view>
						<view class="each1">本月新增</view>
						<view class="each">{{item2.monthQuantity||0}}</view>
					</view>
				</view>
				
			</view>
			
			<!-- 订单总金额 -->
			<view class="item-box flex">
				<view class="item-left">
					<view class="item-number">{{item.totalMoney||0}}</view>
					<view class="item-title">订单总金额（元）</view>
				</view>
				<view class="item-right">
					<view class="item-right-detail flex" v-for="(item3,index3) in item.orderMoneyList" :key ="index3">       
						<view class="each1">{{item3.channelValue||0}}</view>
						<view class="each">{{item3.payAmonut||0}}</view>
					</view>
					
				</view>
				
			</view>
			
			
		</view>
		
		
		
		
		
	</view>
</template>

<script>
	const app = getApp();
	import wx from '../../plugins/jweixin.js'
	import turnback from "../../components/turnback.vue"
	export default{
		components: {
			turnback
		},
		data(){
			return{
				commodityOrderList:[],
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
			getData(){
				app.platformInfo().then(res =>{
					if(res.status == 1){
						this.commodityOrderList = res.data.commodityOrderList;
						
					}
				});
			}
		},
		onLoad(){
			this.getMiniProgramStatic();
			this.getData();
		},
	}
</script>

<style scoped lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}

	.container {
		
		.title{
			background-color: #FFFFFF;
			padding-top: 30rpx;
			padding-left: 50rpx;
			padding-right: 50rpx;
			color: rgba(16, 16, 16, 100);
			font-size: 24rpx;
			font-family: PingFangSC-regular;
			text-align: left;
			
		}
		.item-box{
			background-color: #FFFFFF;
			height: 200rpx;
			color: rgba(16, 16, 16, 100);
			font-size: 24rpx;
			font-family: PingFangSC-regular;
			text-align: center;
			.item-left{
				margin-top: 0rpx;
				height: 126rpx;
				width: 240rpx;
				border-right: 2rpx solid rgba(187, 187, 187, 100);
				.item-number{
					font-size: 36rpx;
				}
				.item-title{
					margin-top: 28rpx;
				}
				
			}
			.item-right{
				//text-align: left;
				flex: 1;
				margin-left: 40rpx;
				margin-right: 40rpx;
				//background-color: #4CD964;
				.item-right-detail{
					margin-top: 15rpx;
					&:nth-child(0){
						margin-top: 0rpx;
					}
					.each1{
						width: 30%;
					}
					.each{
						width: 20%;
					}
				}
			}
		}
		.tip{
			margin-top: 40rpx;
			margin-left: 50rpx;
			margin-right: 50rpx;
			color: rgba(106, 105, 105, 100);
			font-size: 24rpx;
			text-align: center;
			font-family: PingFangSC-regular;
			border-bottom: solid 2rpx rgba(187, 187, 187, 100);
			padding-bottom: 20rpx;
		}
		.order-tip{
			margin-top: 32rpx;
			margin-left: 50rpx;
			color: rgba(16, 16, 16, 100);
			font-size: 24rpx;
			text-align: left;
			font-family: PingFangSC-regular;
		}
		
	}
</style>
