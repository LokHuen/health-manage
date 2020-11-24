<template>
	<!-- 医生名片界面 -->
	<view class="container">
		<view class="i-content-box">
			<view class="i-header">
				<image class="i-avatar" src="../../static/img/avator.png" style="width: 106rpx; height: 106rpx;"></image>
				<view class="i-text-box">
					<view>
						<text class="i-name">胡汉三</text>
						<text class="i-post">青山院长</text>
					</view>
					<text class="i-subjecj">中山一院乳腺内科</text>
				</view>
			</view>
			<view class="i-qr-code-box">
				<image class="i-qr-code" style="width: 360rpx; height: 360rpx;"></image>
				<text class="i-code_des">扫码加入医生的患者名单</text>
			</view>
		</view>
		<text class="i-sava-tip">长按上方图片，可以保存到手机相册</text>
	</view>
</template>

<script>
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
					border: 1rpx solid #007AFF;

				}
			}

		}
		.i-code_des {
			margin-top: 12rpx;
			font-size: 38rpx;
			color: #333333;
			margin-top: 12rpx;
		
		}
		.i-sava-tip{
			margin: 10rpx auto;
			color: #999999;
		}

	}
</style>
