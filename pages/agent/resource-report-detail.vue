<template>
	<view class="container">
		<view class="common-box">
			<view class="left">资源所在区域</view>
			<view class="right">广东省  广州市</view>
		</view>
		
		<view class="common-box">
			<view class="left">报备类型</view>
			<view class="right">医生</view>
		</view>
		
		<view class="common-box">
			<view class="left">医院名称</view>
			<view class="right">中山二院</view>
		</view>
		
		<view class="common-box">
			<view class="left">科室名称</view>
			<view class="right">内科</view>
		</view>
		
		<view class="common-box">
			<view class="left">医生名字</view>
			<view class="right">张大同</view>
		</view>
		
		<view class="common-box">
			<view class="left">医生职称</view>
			<view class="right">主任医师</view>
		</view>
		
		
		<view class="time-box">
			<view class="time-left">门诊时间</view>
			<view class="time-right">
				 <view>
				 	星期一 上午 下午
				 </view>
				 <view>
				 	星期二 上午 下午
				 </view>
				 <view>
				 	星期三 下午
				 </view>
				 <view>
				 	星期四 下午
				 </view>
			</view>
		</view>
		
		<view class="common-box">
			<view class="left">月门诊量预估（人）</view>
			<view class="right">68</view>
		</view>
		
		<view class="common-box">
			<view class="left">每周手术量（台）</view>
			<view class="right">9</view>
		</view>
		
		<view class="common-box">
			<view class="left">月手术量预估（台）</view>
			<view class="right">68</view>
		</view>
		
		<view class="common-box">
			<view class="left">主管床位数（张）</view>
			<view class="right">9</view>
		</view>
		
		<view class="common-box">
			<view class="left">主管床位周转天数（天）</view>
			<view class="right">9</view>
		</view>
		
		<view class="common-box">
			<view class="left">月住院病人数预估（人）</view>
			<view class="right">68</view>
		</view>
		
		<view class="common-box">
			<view class="left">月患者数量预估（人）</view>
			<view class="right">128</view>
		</view>
		
		<view class="common-box">
			<view class="left">客情关系程度</view>
			<view class="right">陌拜</view>
		</view>
		
		<view class="common-box">
			<view class="left">成交单数预估</view>
			<view class="right">127</view>
		</view>
		
		<view class="common-box">
			<view class="left">备注内容</view>
			<view class="right">未填写</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
	
		data() {
			return {
				info:{},
				id:''
			}
		},
		onLoad() {
		
		},
		methods: {
			
	
		},

	}
</script>

<style lang="scss">
	.container{
		.common-box{
			margin-top: 10rpx;
			padding-left: 30rpx;
			display: flex;
			height: 70rpx;
			line-height: 70rpx;
			font-family: PingFangSC-regular;
			text-align: left;
			font-size: 32rpx;
			.left{
				color: rgba(16, 16, 16, 100);
			}
			.right{
				margin-left: 35rpx;
				color: rgba(151, 150, 150, 100);
			}
			
		}
		.time-box{
			margin-top: 10rpx;
			padding-left: 30rpx;
			display: flex;
			//height: 70rpx;
			line-height: 70rpx;
			font-family: PingFangSC-regular;
			text-align: left;
			font-size: 32rpx;
			.time-left{
				color: rgba(16, 16, 16, 100);
			}
			.time-right{
				margin-left: 35rpx;
				color: rgba(151, 150, 150, 100);
			}
		}
	}
	
</style>
