<template>
	<!-- 科室首页 -->
	<view class="container">
		<view class="title">潮州市红山医院  营养科</view>
		<view class="list-box">
			<view class="list-item flex" v-for="(item,index) in list" :key="index">
				<view class="name">
					吴卫东
				</view>
				<view class="detail">
					主任医师 
				</view>
				<view class="detail">
					患者数:9
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				list:[1,2,3]
			}
		},
		onLoad(){
		
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F6F6;
	}
	.container{
	    .title{
			height: 100rpx;
			line-height: 120rpx;
			padding-left: 30rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
		}
		.list-box{
			.list-item{
				margin-left: 30rpx;
				margin-right: 30rpx;
				padding-left: 40rpx;
				background-color: #fff;
				margin-top: 20rpx;
				height: 110rpx;
				line-height: 110rpx;
				.name{
					font-size: 32rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
				.detail{
					margin-left: 20rpx;
					font-size: 26rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #666666;
				}
				
			}
		}
	}
</style>
