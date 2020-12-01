<template>
	<!-- 医生名片界面 -->
	<view class="container">
		<view class="i-content-box" @longpress="saveQRCode" id="doctorcode"  click="saveimg">
			<image src="../../static/img/doctor_bg.png" mode="widthFix" class="content-bg"></image>
			<view class="content-info">
				<image :src="infoData.portrait" mode="widthFix" class="avator"></image>
				<view class="name">{{infoData.doctorName}}</view>
				<view class="technicalTitle">{{infoData.technicalTitle}}</view>
				<view class="department">{{infoData.hospital+infoData.department}} </view>
			</view>
			<view class="qrCode-box">
				<image :src="infoData.qrCode" mode="widthFix" class="qrcode"></image>
				<view class="qrCode-tips">患者院外营养管理平台</view>
			</view>
		</view>
		<view class="i-sava-tip">长按上方二维码，可以保存到手机相册</view>
		<!-- <image :src="imgUrl" mode="widthFix"></image> -->
	</view>
</template>

<script>
	// import html2canvas from "html2canvas"
	const app = getApp();
	export default {

		data() {
			return {
				infoData: {},
				id: '',
				imgUrl:""
			}
		},
		methods: {
			getData() {
				//{uid:app.getCache('uid')}
				app.doctorBusinessCard({
					// uid:43
					uid: this.id
				}).then(res => {
					console.log(res);
					if (res.status == 1) {
						this.infoData = res.data;
						// this.downImage(this.infoData.portrait, res => {
						// 	this.infoData.portrait = res;
						// })
						// this.downImage(this.infoData.qrCode, res => {
						// 	this.infoData.qrCode = res;
						// })
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
			},
			saveimg() {
				let qselect = document.querySelector("#doctorcode");
				var w = qselect.offsetWidth;
				var h = qselect.offsetHeight; //要将 canvas 的宽高设置成容器宽高的 2 倍
				var canvas = document.createElement("canvas");
				canvas.width = w * 2;
				canvas.height = h * 2;
				canvas.style.width = w + "px";
				canvas.style.height = h + "px";
				var context = canvas.getContext("2d"); //然后将画布缩放，将图像放大两倍画到画布上 
				// context.scale(2, 2);
				html2canvas(qselect, {
					canvas: canvas,
					allowTaint: false,
					taintTest: false,
					useCORS: true,
				}, {
					useCORS: true
				}).then(canvas => {
					let dataURL = canvas.toDataURL("image/png");
					this.imgUrl = dataURL;
					
				});
			},
			downImage(url, callback) {
				uni.getImageInfo({
					src: url,
					success: function(image) {
						callback(image.path);
					}
				});
			},
		},
		onLoad(props) {
			this.id = props.id;
			this.getData();
		}


	}
</script>

<style lang="scss" scoped>
	.container {

		.i-content-box {
			height: 920rpx;
			width: 648rpx;
			margin: 50rpx auto 0;
			position: relative;

			.content-bg {
				margin: 0;height: 920rpx;
			width: 648rpx;
			}

			.content-info {
				position: absolute;
				top: 0;
				right: 0;
				left: 0;
				height: 460rpx;
				text-align: center;

				.avator {
					margin-top: 82rpx;
					width: 132rpx;
					height: 132rpx;
					border-radius: 50%;
				}

				.name {
					font-size: 19px;
					color: #333333;
					margin-top: 5rpx;
				}

				.technicalTitle {
					margin-top: 10rpx;
					background-color: #55A29E;
					font-size: 13px;
					color: #FFFFFF;display: inline-block;
					line-height: 1.5;
					border-radius: 10.5px;
					padding: 0 15px;
				}

				.department {
					margin-top: 10rpx;
					color: #666666;
					font-size: 13px;
				}
			}

			.qrCode-box {
				position: absolute;
				bottom: 0;
				right: 0;
				left: 0;
				height: 490rpx;
				text-align: center;

				.qrcode {
					width: 263rpx;
					height: 263rpx;
					margin-top: 50rpx;
				}

				.qrCode-tips {
					font-size: 12px;
					color: #55A29E;
					margin-top: 0rpx;
				}
			}
		}

		.i-sava-tip {
			margin: 50rpx auto 10rpx;
			color: #999999;
			text-align: center;
		}

	}
</style>
