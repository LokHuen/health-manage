<template>
	<view class="">
		<turnback @back="back" v-if="isMiniProgram" style="position: sticky;top: 0;"> </turnback>
		<view class="successbox">
			<image class="successimg" mode="widthFix" src="../../../static/sales/finish.png"></image>
			<view class="keytext">提交成功</view>
			
		</view>
		<view class="successbt" @click="tomine">完 成</view>
	</view>
</template>

<script>
	const app = getApp();
	import wx from '../../../plugins/jweixin.js'
	import turnback from "../../../components/turnback.vue"
	
	export default {
		components: {turnback},
		
		data() {
			return {
				imgUrl:app.globalData.imageUrl,
				isMiniProgram:false
			}
		},
		onLoad(options){
			
		},
		onShow(){
			this.getMiniProgramStatic();
		},
		methods: {
			getMiniProgramStatic(){
			 wx.miniProgram.getEnv((res)=>{
			    this.isMiniProgram = res.miniprogram?true:false;
			 })
			},
			back(){
			  uni.navigateBack({
			   
			  })
			},
			
			tomine(){
				uni.reLaunch({
					url:"/pages/sales/index?isSales=1"
				})
			},
		}
	}
</script>

<style lang="scss">
	.successbox{margin:150rpx 0 0;text-align:center;
		.successimg{width:150rpx;height:auto;}
		.keytext{font-size: 36rpx;margin:50rpx 0 0rpx;color:#272727;}
	}
	.successbt{line-height: 88rpx;background: #4B8BE8;border-radius: 45rpx;font-size: 38rpx;color: #fff;text-align:center;position:fixed;bottom:120rpx;left:50%;margin-left:-180rpx;width:400rpx;}
	page{border-top:1px solid #eee;}
</style>
