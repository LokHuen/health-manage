<template>
	<view class="container">
		<!-- 总医生数 -->
		<view class="item-box flex">
			<view class="item-left">
				<view class="item-number">{{totaldoctorNum||0}}</view>
				<view class="item-title">总医生数</view>
			</view>
			<view class="item-right">
				<view class="item-right-detail flex" v-for="(item,index) in doctorList" :key="index">       
					<view class="each1">{{item.channelValue}}</view>
					<view class="each">{{item.doctorNum||0}}</view>
					<view class="each1">本月新增</view>
					<view class="each">{{item.monthdoctorNum||0}}</view>
				</view>
				
			</view>
			
		</view>
		
		<!-- 总患者数 -->
		<view class="item-box flex">
			<view class="item-left">
				<view class="item-number">{{totalpatientNum||0}}</view>
				<view class="item-title">总患者数</view>
			</view>
			<view class="item-right">
				<view class="item-right-detail flex" v-for="(item,index) in patientList" :key ="index">       
					<view class="each1">{{item.channelValue}}</view>
					<view class="each">{{item.patientNum||0}}</view>
					<view class="each1">本月新增</view>
					<view class="each">{{item.monthpatientNum||0}}</view>
				</view>
				
				
			</view>
			
		</view>
		
		<!-- 总订单数 -->
		<view style="background-color: #FFFFFF;">
			<view class="item-box flex" style="height: auto;padding-top: 60rpx;">
				<view class="item-left">
					<view class="item-number">{{totalorderNum||0}}</view>
					<view class="item-title">总订单数</view>
				</view>
				<view class="item-right">
					<view class="item-right-detail flex" v-for="(item,index) in orderList" :key ="index">       
						<view class="each1">{{item.channelValue}}</view>
						<view class="each">{{item.orderNum||0}}</view>
						<view class="each1">本月新增</view>
						<view class="each">{{item.monthorderNum||0}}</view>
					</view>
					
					
				</view>
				
			</view>
			<view class="tip">订单统计范围：3个小程序上客户已付款的所有商品订单数据</view>
			<view class="order-tip">按商品统计订单数（3个小程序合计）</view>
			
			
			<!-- item -->
			<view style="margin-left: 50rpx;margin-right: 50rpx;background-color: #FFFFFF;" v-for="(item,index) in commodityOrderList" :key="index">
				<view class="item-box" style="background-color: #F6F6F6;padding-bottom: 60rpx;">
					<view style="font-size: 28rpx;color: rgba(16, 16, 16, 100); text-align: left; margin-left: 50rpx; padding-top: 50rpx;">{{item.commodityPlatformName}}</view>
					<view class="flex" style="margin-top: 40rpx;">
						<view class="item-left" style="width: 180rpx;">
							<view class="item-number">{{item.totalOrderCount||0}}</view>
							<view class="item-title">总订单数</view>
						</view>
						<view class="item-right" style="margin-left: 20rpx;margin-right: 20rpx;">
							<view class="item-right-detail flex" v-for="(detailItem,detailIndex) in item.commodityList">       
								<view class="each1">{{detailItem.channelValue}}</view>
								<view class="each">{{detailItem.orderCount||0}}</view>
								<view class="each1">本月新增</view>
								<view class="each">{{detailItem.monthOrderCount||0}}</view>
							</view>
							
							
						</view>
					</view>
					
				</view>
			</view>
			
			 <view style="height: 60rpx;"></view> 
			
		</view>
	
		
		
	</view>
</template>

<script>
	const app = getApp();
	export default{
		data(){
			return{
				doctorList:[],
				totaldoctorNum:'',
				// commodityList:[],
				// totalOrderCount:'',
				commodityOrderList:[],
				patientList:[],
				totalpatientNum:'',
				orderList:[],
				totalorderNum:''
				
			}
		},
		methods:{
			getData(){
				app.platformInfo().then(res =>{
					if(res.status == 1){
						this.doctorList = res.data.doctor.doctorList;
						this.totaldoctorNum = res.data.doctor.totaldoctorNum;
						this.commodityOrderList = res.data.commodityOrderList;
						this.patientList = res.data.patient.patientList;
						this.totalpatientNum = res.data.patient.totalpatientNum;
						this.orderList = res.data.order.orderList;
						this.totalorderNum = res.data.order.totalorderNum;
					}
				});
			}
		},
		onLoad(){
			this.getData();
		},
	}
</script>

<style scoped lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}

	.container {
		.item-box{
			background-color: #FFFFFF;
			margin-top: 26rpx;
			height: 266rpx;
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
