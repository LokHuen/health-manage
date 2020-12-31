<template>
	<view class="container">
		<text class="i-title">食谱 | {{diseaseName}}患者</text>
		<view class="i-content" v-html="info.foodPairing"></view>
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
				res.data.foodPairing = res.data.foodPairing.replace(/<img /g,"<img class='htmlimg' ");
				this.info = res.data;
				this.$nextTick(()=>{
					var imglist = document.getElementsByClassName("htmlimg");
					for (var i = 0; i < imglist.length; i++) {
						imglist[i].onclick=function(res){
							uni.previewImage({
								current:res.target.src,
								urls:[res.target.src],
							})
						}
					}
				})
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
			width: 100%;
			margin-top: 24rpx;
			color: #666666;
			font-size: 26rpx;
			line-height: 42rpx;
		}
	}
</style>
