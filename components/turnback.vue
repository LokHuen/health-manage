<template>
	<view class="containers">
		<view style="position: fixed;top: 0;left: 0;right: 0;background-color: #FFFFFF;">
			<image src="/static/icon/turnback_icon.png" mode="widthFix" class="img" @click="back"></image>
		</view>
		<view style="height: 30rpx;"></view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			back(){
				this.$emit('back')
			}
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
