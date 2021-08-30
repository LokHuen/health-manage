<template>
	<view class="">
		<view class="richtextarea">
			<view v-html="info.content"></view>
		</view>
		<view class="phonecall" @click="callnow">电话咨询</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				info:{},
			}
		},
		onLoad(options){
			// this.getFwhMessage();
		},
		onShow(){
			
		},
		methods: {
			getFwhMessage() {
				app.getFwhMessage({
					id: this.id
				}).then((res) => {
					this.info = res.data
				})
			},
			callnow(){
				uni.makePhoneCall({
				    phoneNumber: '18816850080'
				});
			},
		}
	}
</script>

<style scoped lang="scss">
	.richtextarea{padding:20rpx 20rpx 100rpx 20rpx;box-sizing:border-box;}
	.phonecall{position:fixed;bottom:0;left:0;right:0;text-align:center;line-height:100rpx;color:#fff;background:#2A87EE;}
</style>
