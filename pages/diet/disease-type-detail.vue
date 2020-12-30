<template>
	<view class="container">
		<text class="i-title">食谱 | {{diseaseName}}患者</text>
		<text class="i-content" v-html="info.foodPairing"></text>
	</view>
</template>

<script>
	import http from '../../common/http.js'
	export default {
		data() {
			return {
				id: '',
				diseaseName:'',
				info: ''
			};
		},
		onLoad(options) {
			this.id = options.id
			this.diseaseName = options.diseaseName
			http.get(http.urls.get_catering_detail, {
				id: this.id
			}).then((res) => {
				this.info = res.data
			})
		},
	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		flex-direction: column;
		padding: 42rpx 50rpx;
		padding-bottom: 90rpx;

		.i-title {
			color: #333333;
			font-size: 32rpx;
			font-weight: bold;
		}

		.i-content {
			margin-top: 24rpx;
			color: #666666;
			font-size: 26rpx;
			line-height: 42rpx;
		}
	}
</style>
