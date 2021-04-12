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
					主任医师   患者数：9
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
			line-height: 100rpx;
			padding-left: 50rpx;
		}
		.list-box{
			.list-item{
				margin-left: 50rpx;
				margin-right: 50rpx;
				padding-left: 20rpx;
				background-color: #fff;
				margin-top: 10rpx;
				height: 100rpx;
				line-height: 100rpx;
			}
		}
	}
</style>
