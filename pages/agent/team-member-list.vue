<template>
	<view class="container">
	   <view class="list-box" v-for="(item,index) in list" @click="selectItem(item)">
	   	   <view class="name">张小明</view>
		   <view class="desc">52 医生 209 患者</view>
	   </view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
	
		data() {
			return {
				list: [1,2,3],
				info:{}
			}
		},
		onLoad(){
			
		},
		onShow(){
			
		},
		methods: {
			selectItem(item){
				uni.navigateTo({
					url:'member-detail'
				})
			}
		
		},

	}
</script>

<style lang="scss">
	.container{
		height: 100vh;background-color: #F5F6F6;overflow-y: auto;
		.list-box{
			height: 150rpx;
			margin-top: 20rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			background-color: #FFFFFF;
			.name{
				padding-top: 30rpx;
				margin-left: 20rpx;
				font-size: 30rpx;
				color: #333333;
			}
			.desc{
				margin-left: 20rpx;
				margin-top: 20rpx;
				font-size: 26rpx;
				color: #999999;
			}
		}
	}
	
</style>
