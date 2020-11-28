<template>
	<!-- 医生名片界面 -->
	<view class="container">
		<view class="i-content-box">
			<view class="i-header">
				<image class="i-avatar" :src="infoData.portrait" style="width: 106rpx; height: 106rpx;"></image>
				<view class="i-text-box">
					<view>
						<text class="i-name">{{infoData.doctorName}}</text>
						<text class="i-post">{{infoData.technicalTitle}}</text>
					</view>
					<text class="i-subjecj">{{infoData.hospital+infoData.department}}</text>
				</view>
			</view>
			<view class="i-qr-code-box">
				<image class="i-qr-code" style="width: 360rpx; height: 360rpx;" :src="infoData.qrCode" @longtap="saveQRCode"></image>
				<text class="i-code_des">扫码加入医生的患者名单</text>
			</view>
		</view>
		<text class="i-sava-tip">长按上方图片，可以保存到手机相册</text>
	</view>
</template>

<script>
	const app = getApp();
	export default {

		data() {
			return {
				infoData: {},

			}
		},
		methods: {
			getData(){
				//
				app.doctorBusinessCard({uid:app.getCache('uid')}).then(res => {
					console.log(res);
					if (res.status == 1) {
						this.infoData = res.data;
					}
				});
			},
			saveQRCode() {
				let that = this;
				//console.log('保存二维码')
				uni.downloadFile({ //获得二维码的临时地址
					url: this.infoData.qrCode,
					success: (res) => {
						//console.log('获取url',res)
						if (res.statusCode == 200) {
							uni.saveImageToPhotosAlbum({
								filePath: res.tempFilePath, //传入临时地址
								success() {
									app.tip('保存成功') //封装的提示
								},
								fail() {
									app.tip('保存失败')
								}
							})
						}
					}
				})
			}

		},
		onLoad() {
			this.getData();
		}


	}
</script>

<style lang="scss" scoped>
	.container {
		display: flex;
		padding: 5rpx;
		flex-direction: column;

		.i-content-box {
			display: flex;
			flex-direction: column;
			height: 790rpx;
			background-image: url(../../static/img/bg_qr_code.png);
			background-size: 100% 100%;

			.i-header {
				display: flex;
				width: 100%;
				height: 190rpx;
				padding: 30rpx 0 0 60rpx;
				align-items: center;
				background-size: 100% 100%;

				.i-avatar {
					border-radius: 53rpx;
					margin-right: 22rpx;
				}

				.i-text-box {
					display: flex;
					flex-direction: column;

					.i-name {
						font-size: 40rpx;
						color: #333333;
					}

					.i-post {
						font-size: 28rpx;
						color: #333333;
						margin-left: 22rpx;
					}

					.i-subjecj {
						font-size: 28rpx;
						color: #333333;
						margin-top: 5rpx;
					}
				}

			}

			.i-qr-code-box {
				display: flex;
				flex-direction: column;
				align-items: center;
				margin-top: 64rpx;

				.i-qr-code {
				   
				}
			}

		}

		.i-code_des {
			margin-top: 12rpx;
			font-size: 30rpx;
			color: #333333;
			margin-top: 12rpx;

		}

		.i-sava-tip {
			margin: 10rpx auto;
			color: #999999;
		}

	}
</style>
