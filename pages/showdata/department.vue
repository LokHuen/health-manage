<template>
	<!-- 科室首页 -->
	<view class="container">
		<view class="top-tips">
			退出演示环境，回到我的页面
			<image src="../../static/tuichu.png" mode="aspectFill" class="tuichu"></image>
		</view>
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
		<tabbar :now="1" :real="false" :hide="2"></tabbar>
	</view>
</template>

<script>
	const app = getApp();
	import tabbar from "../../components/tabbar.vue"
	export default {
		components:{tabbar},
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
		.top-tips{
			margin-top: 38rpx;
			margin-left: 35rpx;
			margin-right: 35rpx;
			height: 86rpx;
			line-height: 86rpx;
			background: #52A29E;
			border-radius: 10rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			padding-left: 40rpx;
			position: relative;
			.tuichu{
				position: absolute;
				right: 40rpx;
				height: 26rpx;
				width: 26rpx;
				top: 30rpx;
				
			}
		}
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
