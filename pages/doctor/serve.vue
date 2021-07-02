<template>
	<view class="container">
		<view class="pagebackground"></view>
		
		<view class="item-list other" @click="tootherpage('/pages/doctor/serveList')">
			<view class="left-name">营养风险筛查工具</view>
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
			
		</view>
		<view class="item-list other" @click="tootherpage('/pages/doctor/serveList1')">
			<view class="left-name">营养状况评估工具</view>
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
			
		</view>
		<view class="item-list other" @click="toexport">
			<view class="left-name">患者营养状况评估数据导出</view>
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
			
		</view>
		<view class="minfont">可以导出您的患者做过的评估数据</view>
		<view class="item-list other" @click="toshowdata">
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

		<tabbar :now="2"></tabbar>
	</view>
</template>

<script>
	const app = getApp();
	import tabbar from "../../components/tabbar.vue"
	export default {
		components:{tabbar},
		data() {
			return {
				
			}
		},
		onShow(){
			
		},
		methods: {
			tootherpage(url){
				uni.navigateTo({
					url:url
				})
			},
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
			toshowdata(){
				uni.navigateTo({
					url: "/pages/showdata/nutrition-manage"
				});
			},
			toexport(){
				uni.navigateTo({
					url: "/pages/doctor/export/list"
				});
			},
		},

	}
</script>

<style lang="scss" scoped>
	
	.topbox{
		margin-top:24rpx;
		.centerline{margin:0 56rpx;border-top: 1px solid #E5E5E5;}
	}
	.bottomtip{padding-top:20rpx;font-size:24rpx;color:#52A29E;position: fixed;z-index: 9;left:0;right:0;bottom:250rpx;}
	.tips {
		width: 30rpx;
		height: 30rpx;
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
			&.other{margin-top:30rpx;}
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
