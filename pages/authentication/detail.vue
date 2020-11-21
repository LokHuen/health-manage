<template>
	<view class="contentbox">
		<view class="bigtitle">已认证</view>
		<view class="flex">
			<image src="../../static/mine/code.png" mode="aspectFill" class="imglist" @click="preview()"></image>
			<image src="../../static/mine/code.png" mode="aspectFill" class="imglist" @click="preview()"></image>
		</view>
		<view class="changecss" @click="toindex">修改身份信息</view>
		<view>备注：身份信息修改成功前，你的收益会继续入账修改前的账户。</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				imgUrl:app.globalData.imageUrl,
				
			}
		},
		onLoad(options){
			
		},
		onShow(){
			
		},
		methods: {
			preview(url){
				uni.previewImage({
					current:[],
					urls:[]
				})
			},
			toindex(){
				uni.reLaunch({
					url:"/pages/authentication/index"
				})
			},
		}
	}
</script>

<style lang="scss">
	.contentbox{padding:0 30rpx;
		.bigtitle{font-size: 44rpx;line-height:142rpx;}
		.imglist{width:50%;height:207rpx;border-radius:10rpx;box-sizing: border-box;
			&:nth-child(1){margin-right:2%;width:48%;}
		}
		.changecss{color:#FF460A;padding:60rpx 0;}
	}
</style>
