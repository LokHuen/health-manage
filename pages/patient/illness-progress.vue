<template>
	<view class="container">
		<view v-for="(item,index) in list" class="list-item">
         <view class="title">
			 主观感受：恶化
			 <view class="time">
			 	2021/01/09
			 </view>
		</view>
		<view class="deatil">
			<view class="left">治疗阶段</view>
			<view class="right">术后、化疗</view>
		</view>
		
		
		<view class="deatil1">
			<view class="left1">用药依从性</view>
			
			<view class="">
				<view v-for="(item1,index1) in list1">
					<view class="right1">药物：奥替尼</view>
					<view class="right1">用量：一天一次</view>
					<view style="height: 20rpx;"></view>
				</view>
			</view>
			
			
			
			
		</view>
		
		<view class="deatil">
			<view class="left">其它治疗方式</view>
			<view class="right">无</view>
		</view>

		</view>

	</view>

</template>

<script>
	let app = getApp();
	export default {
		data() {
			return {
				list: [1, 2, 3],
				list1: [1, 2]
			}
		},
		methods: {

		},
		onLoad(props) {

		}


	}
</script>


<style lang="scss">
	.container {
		background-color: #FFFFFF;
		padding-bottom: 50rpx;
        .list-item {
        	background-color: #F6F6F6;
        	border-radius: 10rpx;
        	margin-top: 20rpx;
        	margin-left: 20rpx;
        	margin-right: 20rpx;
        	.title {
				margin-left: 20rpx;
				margin-right: 20rpx;
				height: 100rpx;
				line-height: 100rpx;
				color: rgba(16, 16, 16, 100);
				font-size: 32rpx;
				text-align: left;
				font-family: PingFangSC-bold;
				padding-left: 20rpx;
				border-bottom: 2rpx solid rgba(187, 187, 187, 100);
				position: relative;
				.time{
					position: absolute;
					right: 0rpx;
					top: 10rpx;
					color: rgba(106, 105, 105, 100);
					font-size: 28rpx;
					text-align: right;
					font-family: PingFangSC-regular;
				}
			}
			
			.deatil{
				display: flex;
				padding-left: 40rpx;
				height: 80rpx;
				line-height: 80rpx;
				.left{
					width: 200rpx;
					color: rgba(16, 16, 16, 100);
					font-size: 28rpx;
					text-align: left;
					font-family: PingFangSC-bold;
				}
				.right{
					color: rgba(16, 16, 16, 100);
					font-size: 28rpx;
					text-align: left;
					font-family: PingFangSC-regular;
				}
			}
			
			.deatil1{
				display: flex;
				padding-left: 40rpx;
				.left1{
					width: 200rpx;
					color: rgba(16, 16, 16, 100);
					font-size: 28rpx;
					text-align: left;
					font-family: PingFangSC-bold;
					height: 50rpx;
					line-height: 50rpx;
				}
				.right1{
					color: rgba(16, 16, 16, 100);
					font-size: 28rpx;
					text-align: left;
					font-family: PingFangSC-regular;
					height: 50rpx;
					line-height: 50rpx;
				}
			}
        }
		
	}
	
</style>
