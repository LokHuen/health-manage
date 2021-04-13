<template>
	<view class="container">
		<view class="pagebackground"></view>
		<view class="topbox">
			<view class="item-list unit" @click="clickItem(1)">
				<view class="left-name">PG-SGA 营养状况评估</view>
				<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
				
			</view>
			<view class="centerline"></view>
			<view class="item-list unit" @click="clickItem(2)">
				<view class="left-name">SGA 营养状况评估</view>
				<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
				
			</view>
		</view>
		<view class="item-list other" click="">
			<view class="left-name">演示数据</view>
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
			
		</view>
		<view class="minfont">查看演示数据，方便您对患者信息及医生端功能有个初步的了解</view>
		<view class="flex ct bottomtip" @click="showTips">
			<image src="../../static/icon/tishi.png" mode="widthFix" class="tips" ></image>患者信息授权告知
		</view>
		
		<uni-popup ref="popupTips" type="center">
			<view class="tips-bg">
				<view style="height: 68rpx;"></view>
				<view class="tips-title">温馨提示</view>
				<view class="tips-sub">患者信息已经得到授权，您可以使用和建议。</view>
				<view class="tips-close" @click="closeTips">关闭</view>
				<view style="height: 60rpx;"></view>
			</view>
		
		</uni-popup>
		
		<uni-popup ref="nutritioninfo1" type="center">
			<view class="nutritioninfo">
				<view style="height: 50rpx;"></view>
				<view class="tips-title">营养干预情况说明</view>
				<view class="tips-sub">
					<view class="list">
						<text class="main">未干预：</text>患者未在本平台上购买过ONS产品。
					</view>
					<view class="list">
						<text class="main">干预中：</text>患者在最近30天内有买过ONS产品。
					</view>
					<view class="list">
						<text class="main">已停止干预：</text>患者在30天前有买过ONS产品，但最近30天内未有购买记录。
					</view>
				</view>
				<view class="flex ct warnbox">
					<image class="warnimg" src="../../static/icon/remind_icon2.png" mode="widthFix" style=""></image>干预情况依据本平台数据判断，存在局限性
				</view>
				<view class="tips-close" @click="$refs.nutritioninfo1.close()">关闭</view>
				<view style="height: 50rpx;"></view>
			</view>
		
		</uni-popup>
		<uni-popup ref="nutritioninfo2" type="center">
			<view class="nutritioninfo">
				<view style="height: 50rpx;"></view>
				<view class="tips-title">患者营养状况说明</view>
				<view class="tips-sub">
					<view class="listother">依据PG-SGA营养状况评估体系，根据评估得分做判断：</view>
					<view class="listother">0-1分，无营养不良；</view>
					<view class="listother">2-3分，可疑营养不良；</view>
					<view class="listother">4-8分，中度营养不良；</view>
					<view class="listother">>=9分，重度营养不良。</view>
					<view class="listother">依据SGA营养状况评估体系，根据评分判断等级：</view>
					<view class="listother">营养良好、轻-中度营养不良、重度营养不良</view>
					
				</view>
				
				<view class="tips-close" @click="$refs.nutritioninfo2.close()">关闭</view>
				<view style="height: 50rpx;"></view>
			</view>
		
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	export default {
	
		data() {
			return {
				
			}
		},
		onShow(){
			this.$nextTick(()=>{
				this.$refs.nutritioninfo2.open();
			})
			
		},
		methods: {
			clickItem(index) {
				uni.navigateTo({
					url: '../patient/nutritional-self-test?id='+index
				});
			},
			showTips() {
				this.$refs.popupTips.open();
			},
			closeTips() {
				this.$refs.popupTips.close();
			},
		},

	}
</script>

<style lang="scss" scoped>
	.nutritioninfo{
		background-color: #FFFFFF;
		border-radius: 10rpx;
		width: 620rpx;
		.warnbox{
			padding-top:40rpx;font-size:26rpx;color:#999;
			.warnimg{width:24rpx;margin-right:6rpx;}
		}
			
		.tips-title {
			text-align: center;
			font-size: 34rpx;
			color: #333;
		}
			
		.tips-sub {
			margin-top: 40rpx;
			text-align: left;
			font-size: 28rpx;
			color: #555;
			margin-left: 50rpx;
			margin-right: 50rpx;
			.list{padding-top:8rpx;}
			.listother{padding-top:16rpx;color:#333;}
			.main{color:#000;}
		}
			
		.tips-close {
			margin-top: 50rpx;
			text-align: center;
			font-size: 34rpx;
			color: #FFFFFF;
			background-color: #52A29E;
			height: 90rpx;
			line-height: 90rpx;
			margin-left: 100rpx;
			margin-right: 100rpx;
			border-radius: 45rpx;
		}
	}
	.topbox{
		margin-top:24rpx;
		.centerline{margin:0 56rpx;border-top: 1px solid #E5E5E5;}
	}
	.bottomtip{padding-top:200rpx;font-size:30rpx;color:#52A29E;}
	.tips {
		width: 40rpx;
		height: 40rpx;
	}
	.minfont{color: rgba(106, 105, 105, 100);font-size:24rpx;margin-left:30rpx;}
	.container{

		.item-list{
			// background-color: #FFFFFF;
			height: 106rpx;margin:24rpx 30rpx;background:#fff;
			position: relative;border-radius:10rpx;
			.left-name{
				height: 106rpx;
				line-height: 106rpx;
				font-size: 15px;
				color: #333333;
				padding-left: 26rpx;
			}
			.right-arrow{
				position: absolute;
				right: 20rpx;
				width: 15rpx;
				height: 26rpx;
				top: 40rpx;
				
			}
			.line{
				height: 6rpx;
				background-color: #F5F6F6;
			}
			&.other{margin-top:60rpx;}
			&.unit{margin-top:0;margin-bottom:0;border-radius: 0;}
		}

	}
	.tips-bg {
		background-color: #FFFFFF;
		border-radius: 5px;
		width: 600rpx;
	
		.tips-title {
			text-align: center;
			font-size: 17px;
			color: #52A29E;
		}
	
		.tips-sub {
			margin-top: 40rpx;
			text-align: left;
			font-size: 16px;
			color: #333333;
			margin-left: 70rpx;
			margin-right: 70rpx;
		}
	
		.tips-close {
			margin-top: 100rpx;
			text-align: center;
			font-size: 17px;
			color: #FFFFFF;
			background-color: #52A29E;
			height: 90rpx;
			line-height: 90rpx;
			margin-left: 70rpx;
			margin-right: 70rpx;
			border-radius: 45rpx;
		}
	}
</style>
