<template>
	<view class="container">
		<view class="pagebackground"></view>
		<view class="item-list other" v-for="(item,index) in list" :key="index" @click="clickItem(item)">
			<view class="left-name flex">{{item.surveyName}}</view>
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
		</view>

	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				list:["河南省住院成人患者营养风险筛查表（试行）","河南省住院儿童患者营养不良评估筛查表（试行）"],
			}
		},
		onLoad() {
			app.questionnairelist({surveyType:1}).then(res => {
				if (res.data) {
					this.list = res.data;
				}
			})
		},
		onShow(){
			
		},
		methods: {
			clickItem(item) {
				uni.navigateTo({
					url: '/pages/doctor/select/index?id='+item.id+'&name='+item.surveyName
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
				// line-height: 106rpx;
				font-size: 15px;
				color: #333333;
				padding:0 20rpx 0 26rpx;
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
			&.other{margin-top:20rpx;}
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
