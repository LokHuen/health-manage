<template>
	<view class="containers" v1-if="isMiniProgram">
		<view style="position: fixed;top: 0;left: 0;right: 0;background-color: #FFFFFF;height:90rpx;" class="flex">
			<image src="/static/icon/turnback_icon.png" mode="widthFix" class="img" @click="back"></image>
			<view v-if="title" style="color:#333;text-align:center;flex:1;margin-right:46rpx;">{{title}}</view>
		</view>
		<view style="height: 30rpx;"></view>
	</view>
</template>

<script>
	import wx from '../plugins/jweixin.js'
	export default {
		props:{
			url:{
				default:"",
			},
			title:{
				default:"",
			},
			isback:{
				default:"",
			}
		},
		data() {
			return {
				isMiniProgram:false
			};
		},
		created(){
			this.getMiniProgramStatic();
		},
		methods:{
			back(){
				if(this.isback){
					this.$emit('back')
				}else{
					var u = navigator.userAgent;
					let isios = /(iPhone|mac|iPod|iPad|iOS)/i.test(u);
					let iosjump = sessionStorage.getItem("iosjump");
					if(this.url&&isios&&iosjump){
						uni.redirectTo({
							url:this.url
						})
					}
					else uni.navigateBack({});
				}
				
			},
			getMiniProgramStatic(){
				wx.miniProgram.getEnv((res)=>{
				   this.isMiniProgram = res.miniprogram?true:false;
				})
			},
		},
	}
</script>

<style scoped lang="scss">
	.containers{
		height: 90rpx;
		background-color: #fff;
		.img{
			width: 25rpx;
			// padding-top: 26rpx;
			margin-left: 25rpx;
		}
	}

</style>
