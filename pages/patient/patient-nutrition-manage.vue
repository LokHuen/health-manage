<template>
	<!-- 患者营养管理界面 -->
	<view class="container">
		<view class="info-box">
			<image src="" mode="scaleToFill" class="avator"></image>
			<view class="user-msg-box">
				<view class="name">
					张小明
				</view>
				<view class="msg">
					男 56岁 乳腺癌
				</view>
			</view>
		</view>
		<view class="line-space"></view>
		<view class="content">
			<view class="function-box" >
			    <view class="function-item" v-for="(item,index) in list" :key="index">
			    	<image :src="item[0]" mode="widthFix" class="function-item-img"></image>
					<view class="function-item-title">{{item[1]}}</view>
			    </view>
			</view>
		</view>		
		<view class="health-msg-box">
			<view class="health-list-box">
				<view class="health-list-item">
					<view class="top-title">当前体重</view>
					<view class="health-detail">
						<text style="font-size: 23px;">55</text>KG
					</view>
				</view>
				<view class="health-list-item">
					<view class="top-title">
						<view class="">
							标准体重
						</view>
						<image src="../../static/icon/wenhaoIcon.png" mode="widthFix" class="askIcon" @click="showComputing"></image>
					</view>
					<view class="health-detail">
						<text style="font-size: 23px;">60</text>KG
					</view>
				</view>
				
				<view class="health-list-item">
					<view class="top-title">
						<view class="">
							BMI
						</view>
						<image src="../../static/icon/wenhaoIcon.png" mode="widthFix" class="askIcon" @click="showBMITips"></image>
					</view>
					<view class="health-detail">
						<text style="font-size: 23px;">20.2</text>
					</view>
					<view class="health-tips">
						属正常体重范围
					</view>
				</view>
				
			</view>
			<view class="tips-box">
				<view class="tips">
					指南建议每日总能量：1,800kcal
				</view>
				<image src="../../static/icon/wenhaoIcon.png" mode="widthFix" class="ask-icon"></image>
			</view>
			<view class="tips-detail">
				   脂肪60g，蛋白质90g，碳水化合物225g
			</view>
		</view>
		
		<view class="record-chart-box">
			<view class="record-chart-title">营养自测评分记录图</view>
			<view class="record-chart-subtitle">分值越小，营养状况约好</view>
			
			<!-- 折线Line纯数字-->
			<view class="line-chart-box">
				<line-chart class="line-chart" ref="lineData" canvasId="index_line_2" :dataAs="lineData" />
			</view>
			
		</view>
		
		<view class="last-one">最近一次评价</view>
		
		
		<view class="listContent">
			<view class="health-list-item">	
				<view class="health-list-item-avatar-content">
					<image class="health-list-item-avatar" src="../../static/icon/cry_icon.png"></image>
				</view>
				<view class="health-list-item-content">
					<view class="health-list-item-title">可疑或者中度营养不良</view>
					<view class="health-list-item-detail">免疫治疗后</view>
					<view class="health-list-item-time">测评时间：2020/12/12</view>
					<view class="line" v-if="showDetail"></view>
					<view class="advice-content" v-if="showDetail"> 建议： 由营养师、护师或医生进行患者或患者家庭教育，并可根据患者存在的症状和实验室检查的结果进行药物干预。</view>
				</view>
		        <image class="health-list-item-arrow" :src="showDetail?'../../static/icon/right_arrow_top.png':'../../static/icon/right_arrow.png'" mode="widthFix" @click="showDetailMessage"></image>
			</view>
		</view>
		
		<view class="button-box">
			<button type="default" class="button">营养测评</button>
		</view>
		<view style="height: 100px;"></view>
		<uni-popup ref="popup" type="bottom">
			<!-- 标准体重计算方法 -->
			<view class="white-background">
				<view class="white-background-title">标准体重计算方法</view>
				<view class="white-background-subtitle">标准体重=身高（cm）-105</view>
				<view class="white-background-line-space"></view>
				<view class="white-background-close" @click="closdComputing">关闭</view>
			</view>
		</uni-popup>
		
		<uni-popup ref="popup1" type="bottom">
			<!-- BMI -->
			<view class="white-background-BMI">
				<view class="white-background-BMI-title">BMI</view>
				<view class="white-background-BMI-des">BMI一般指身体质量指数，是目前国际上常用的衡量人体胖瘦程度以及是否健康的一个标准。</view>
				<view class="white-background-BMI-des2">BMI=体重（kg）除以身高（m）的平方</view>
				<view class="white-background-BMI-line-space"></view>
				<view class="white-background-BMI-close" @click="closeBMITips">关闭</view>
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	import LineChart from '@/components/stan-ucharts/LineChart.vue';
	export default {
		components: {
			LineChart,
		},
		data() {
			return {
				list:[["/static/icon/baseInfoicon.png","基础信息"],["/static/icon/bingliMangmenticon.png","病例管理"],["/static/icon/testRecordIcon.png","测评记录"]],
				lineData: {
					//数字的图--折线图数据
					categories: ['12月12日', '12月18日','12月24日'],
					series: [
						{ name: '', data: [3, 6, 2]},
					],
				},
				showDetail:false,
			}
		},
		methods: {
			showDetailMessage(){
				this.showDetail = !this.showDetail;
			},
			showComputing(){
				this.$refs.popup.open();
			},
			closdComputing(){
				this.$refs.popup.close();
			},
			showBMITips(){
				this.$refs.popup1.open();
				
			},
			closeBMITips(){
				this.$refs.popup1.close();
			}
		   
		},
		created() {
			this.$nextTick(() => {
				//折线图
				this.$refs['lineData'].showCharts();
			});


		}

	}
</script>

<style lang="scss">
	.container{
		
		.info-box{
			height: 198rpx;
			display: flex;
			.avator{
				margin-top: 40rpx;
				background-color: #909399;
				width: 128rpx;
				height: 128rpx;
				border-radius: 50%;
				margin-left: 50rpx;
			}
			.user-msg-box{
				padding-top: 40rpx;
				color: #333333;
				margin-left: 31rpx;
				.name{
					font-size: 20px;
				}
				.msg{
					font-size: 14px;
				}
			}
		}
		.line-space{
			background-color: #F7F8F8;
			height: 20rpx;
		}
		.content{
			.function-box{
				height: 209rpx;
				display: flex;
				align-items:center;
				justify-content:space-around;
				.function-item{
					.function-item-img{
						height: 92rpx;
						width: 96rpx;
					}
					.function-item-title{
						color:#333333;
						font-size: 26rpx;
					}
				}
			}
		}
		.health-msg-box{
			width: 650rpx;
			margin-left: 50rpx;
			box-shadow: 1px 1px 5px #999999;
			.health-list-box{
				text-align: center;
				display: flex;
				justify-content:space-around;
				height: 214rpx;
				border-bottom: 1px #EEEEEE solid;
				padding-bottom: 0.4rem;
				.health-list-item{
					color: #333333;
					.top-title{
						margin-top: 40rpx;
						display: flex;
						font-size: 13px;
						.askIcon{
							width: 22rpx;
							height: 22rpx;
						}
					}
					.health-detail{
						font-size: 13px;
					}
					.health-tips{
						font-size: 12px;
						color: #999999;
					}
				}
			}
			.tips-box{
				display: flex;
				.tips{
					color: #333333;
					font-size: 12px;
					margin-left: 40rpx;
					margin-top: 25rpx;
				}
				.ask-icon{
					margin-top: 32rpx;
					width: 24rpx;
					height: 24rpx;
				}
				
			}
			.tips-detail{
				margin-left: 40rpx;
				margin-top: 15rpx;
				padding-bottom: 48rpx;
				color: #999999;
				font-size: 12px;
			}
			
		}
		.record-chart-box{
			margin-top: 40rpx;
			width: 650rpx;
			height: 700rpx;
			margin-left: 50rpx;
			box-shadow: 1px 1px 5px #999999;
			color: #333333;
			text-align: center;
			.record-chart-title{
				padding-top: 49rpx;
				font-size: 15px;
			}
			.record-chart-subtitle{
				color: #59A29F;
				font-size: 12px;
				margin-top: 19rpx;
			}
			
		}
		.last-one{
			color: #333333;
			font-size: 15px;
			margin-left: 50rpx;
			margin-top: 60rpx;
		}
		
		.listContent {
			margin-top: 20rpx;
			margin-left: 50rpx;
			margin-right: 50rpx;
			background-color: #F7F8F8;
			.health-list-item {
				position: relative;
				margin-top: 30rpx;
				display: flex;
				.health-list-item-avatar-content{
					.health-list-item-avatar {
						margin-left: 20rpx;
						margin-top: 40rpx;
						width: 60rpx;
						height: 60rpx;
						border-radius: 50%;
					}
				}
				.health-list-item-content {
					margin-left: 15rpx;
					margin-top: 40rpx;
					padding-bottom: 40rpx;
		            width: 100%;
					.health-list-item-title {
						font-size: 30rpx;
						color: #52A29E;
					}
					
					.health-list-item-detail {
						color: #999999;
						font-size: 26rpx;
						margin-top: 20rpx;
					}
					
					.health-list-item-time {
						color: #666666;
						font-size: 26rpx;
						margin-top: 30rpx;
						padding-bottom: 10rpx;
					}
					.line{
						background-color: #CCCCCC;
						margin-top: 15rpx;
						height: 4rpx;
						margin-right: 20rpx;
					}
					.advice-content{
						font-size: 11px;
						color: #666666;
						margin-top: 20rpx;
		                padding-bottom: 10rpx;
					}
				}
				.health-list-item-arrow {
					position: absolute;
					width: 35rpx;
					height: 19rpx;
					right: 20rpx;
					top: 120rpx;
				
				}
			}
		}
	
		.button-box{
			position: fixed;
			bottom: 0;
			height: 140rpx;
			width: 100%;
			.button{
				height: 90rpx;
				width: 81%;
				background-color: #52A29E !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17px;
			}
		}
		
		.white-background{
			text-align: center;
			background-color: #FFFFFF;
			height: 350rpx;
			border-radius: 10px 10px 0px 0px;
			.white-background-title{
				font-size: 14px;
				color: #666666;
				padding-top: 35rpx;
			}
			.white-background-subtitle{
				font-size: 15px;
				color: #333333;
				margin-top: 40rpx;
			}
			.white-background-line-space{
				background-color: #F6F6F6;
				height: 20rpx;
				margin-top: 60rpx;
			}
			.white-background-close{
				font-size: 15px;
				color: #666666;
				height: 100rpx;
				line-height: 100rpx;
			}
		}
		.white-background-BMI{
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;
			.white-background-BMI-title{
				font-size: 14px;
				color: #666666;
				padding-top: 35rpx;
			}
			.white-background-BMI-des{
				font-size: 15px;
				color: #333333;
				margin-top: 40rpx;
				margin-left: 60rpx;
				margin-right: 60rpx;
				text-align: left;
			}
			.white-background-BMI-des2{
				font-size: 15px;
				color: #333333;
				margin-left: 60rpx;
				margin-right: 60rpx;
				text-align: left;
				height: 120rpx;
				line-height: 120rpx;
			}
			.white-background-BMI-line-space{
				background-color: #F6F6F6;
				height: 20rpx;
			}
			.white-background-BMI-close{
				height: 100rpx;
				line-height: 100rpx;
				font-size: 15px;
				color: #666666;
			}
		}
	}
	
</style>
