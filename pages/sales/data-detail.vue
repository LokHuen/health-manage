<template>
	<view class="container">
		<view v-for="(item,index) in list" :key="index" style="margin-top: 40rpx;">
			
			<view class="title">
				【益爱宁】全面营养型，肿瘤肠内ONS剂，修复肠道功能，科学营养配方，全面符合指南推荐，1大盒42袋/疗程，21天装
			</view>
			<!-- 总订单数-->
			<view class="item-box flex">
				<view class="item-left">
					<view class="item-number">{{0}}</view>
					<view class="item-title">总订单数</view>
				</view>
				<view class="item-right">
					<view class="item-right-detail flex" v-for="(item,index) in doctorList" :key="index">       
						<view class="each1">{{"维新生物"}}</view>
						<view class="each">{{0}}</view>
						<view class="each1">本月新增</view>
						<view class="each">{{0}}</view>
					</view>
					
				</view>
				
			</view>
			
			<!-- 总盒数 -->
			<view class="item-box flex">
				<view class="item-left">
					<view class="item-number">{{0}}</view>
					<view class="item-title">总盒数</view>
				</view>
				<view class="item-right">
					<view class="item-right-detail flex" v-for="(item,index) in patientList" :key ="index">       
						<view class="each1">{{"维新生物"}}</view>
						<view class="each">{{0}}</view>
						<view class="each1">本月新增</view>
						<view class="each">{{0}}</view>
					</view>
				</view>
				
			</view>
			
			<!-- 订单总金额 -->
			<view class="item-box flex">
				<view class="item-left">
					<view class="item-number">{{0}}</view>
					<view class="item-title">订单总金额（元）</view>
				</view>
				<view class="item-right">
					<view class="item-right-detail flex" v-for="(item,index) in orderList" :key ="index">       
						<view class="each1">{{"维新生物"}}</view>
						<view class="each">{{0}}</view>
					</view>
					
				</view>
				
			</view>
			
			
		</view>
		
		
		
		
		
	</view>
</template>

<script>
	const app = getApp();
	export default{
		data(){
			return{
				doctorList:[1,2,3],
				totaldoctorNum:'',
				commodityOrderList:[1,2,3],
				patientList:[1,2,3],
				totalpatientNum:'',
				orderList:[1,2,3],
				totalorderNum:'',
				list:[1,2,3]
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
