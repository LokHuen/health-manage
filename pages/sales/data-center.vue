<template>
	<view class="container">
		<turnback @back="back" v-if="isMiniProgram"> </turnback>
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
		<view class="item-box flex">
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
		
		
		<!-- 总订单金额 -->
		<view class="item-box flex">
			<view class="item-left">
				<view class="item-number">{{payAmonutMap.totalMoney||0}}</view>
				<view class="item-title">总订单金额</view>
			</view>
			<view class="item-right">
				<view class="item-right-detail flex" v-for="(item,index) in payAmonutMap.payAmonutList" :key ="index">       
					<view class="each1">{{item.channelValue}}</view>
					<view class="each" style="margin-left: 30rpx;">{{item.payAmonut||0}}</view>
					
				</view>
				
			</view>
			
		</view>
		
		<!-- <view class="detail" @click="toDetail">
			按商品统计订单情况
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="detail-more"></image>
		</view> -->
		
		
		
	
		
		
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
				doctorList:[],
				totaldoctorNum:'',
				commodityOrderList:[],
				patientList:[],
				totalpatientNum:'',
				orderList:[],
				totalorderNum:'',
				payAmonutMap:'',
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
						this.doctorList = res.data.doctor.doctorList;
						this.totaldoctorNum = res.data.doctor.totaldoctorNum;
						this.commodityOrderList = res.data.commodityOrderList;
						this.patientList = res.data.patient.patientList;
						this.totalpatientNum = res.data.patient.totalpatientNum;
						this.orderList = res.data.order.orderList;
						this.totalorderNum = res.data.order.totalorderNum;
						this.payAmonutMap = res.data.payAmonutMap;
					}
				});
			},
			toDetail(){
				uni.navigateTo({
					url:'data-detail'
				})
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
		
		.detail{
			height: 100rpx;
			line-height: 100rpx;
			color: rgba(16, 16, 16, 100);
			font-size: 28rpx;
			font-family: PingFangSC-regular;
			text-align: left;
			margin-top: 40rpx;
			padding-left: 50rpx;
			background-color: #FFFFFF;
			margin-bottom: 60rpx;
			position: relative;
			.detail-more{
				position: absolute;
				width: 15rpx;
				right: 50rpx;
				top: 35rpx;
			}
		}
	}
</style>
