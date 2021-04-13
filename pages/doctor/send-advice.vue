<template>
	<!-- 发送医嘱界面 -->
	<view class="container">
		<textarea v-model="content" placeholder="请填写医嘱内容" class="textarea" :placeholder-class="placeholder" />
		<view class="button">确定发送</view>
		<view class="tip">
			点击“确定发送”后，不可撤回，患者会即时收到
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
			   content:''
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
	    .textarea{
			background-color: #fff;
			margin-left: 30rpx;
			//margin-right: 30rpx;
			width: 630rpx;
			margin-top: 20rpx;
			color: #333333;
            font-size: 30rpx;	
			border-radius: 10rpx;
			padding: 30rpx;
			//padding-right: 30rpx;
			
		}
		.placeholder{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
			
		}
		
		.button{
			height: 90rpx;
			line-height: 90rpx;
			background: #52A29E;
			border-radius: 45rpx;
			margin-left: 60rpx;
			margin-right: 60rpx;
			margin-top: 40rpx;
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
		}
		.tip{
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
			text-align: center;
			margin-top: 30rpx;
		}
		
	}
</style>
