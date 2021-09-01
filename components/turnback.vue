<template>
	<view class="containers" v-if="isMiniProgram">
		<view style="position: fixed;top: 0;left: 0;right: 0;background-color: #FFFFFF;">
			<image src="/static/icon/turnback_icon.png" mode="widthFix" class="img" @click="back"></image>
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
				var u = navigator.userAgent;
				let isios = /(iPhone|mac|iPod|iPad|iOS)/i.test(u);
				let iosjump = sessionStorage.getItem("iosjump");
				if(this.url&&isios&&iosjump){
					uni.redirectTo({
						url:this.url
					})
				}
				else uni.navigateBack({});
				// this.$emit('back')
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
			padding-top: 26rpx;
			margin-left: 25rpx;
		}
	}

</style>
