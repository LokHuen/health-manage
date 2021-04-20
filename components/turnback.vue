<template>
	<view class="containers">
		<image src="/static/icon/turnback_icon.png" mode="widthFix" class="img" @click="back"></image>
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
