<template>
	<!-- 医生名片界面 -->
	<view class="container">
		<view class="i-content-box" @click="saveimg" id="doctorcode"  click="saveQRCode">
			<image src="../../static/img/doctor_bg.png" mode="widthFix" class="content-bg"></image>
			<view class="content-info">
				<image :src="infoData.portrait" mode="widthFix" class="avator"></image>
				<view class="name">{{infoData.doctorName}}</view>
				<view class="technicalTitle" :style="create?'':''"><text>{{infoData.technicalTitle}}</text></view>
				<view class="department">{{infoData.hospital+infoData.department}} </view>
			</view>
			<view class="qrCode-box">
				<image :src="infoData.qrCode" mode="widthFix" class="qrcode"></image>
				<view class="qrCode-tips">患者院外营养管理平台</view>
				<view class="line"></view>
				<view class="qrCode-subtips">中国健康促进基金会·肿瘤精准个体化防治公益项目·肿瘤营养教育专题</view>
			</view>
		</view>
		<view class="i-sava-tip">点击上方二维码，生成分享图</view>
		
		<uni-popup ref="imgbox" type="bottom" >
			<scroll-view scroll-y="true" style="background:#fff;padding: 20rpx;border-radius:20rpx 20rpx 0 0;max-height:80vh;box-sizing:border-box;">
				<view style="line-height:3;text-align:center;">长按下面图片，保存到手机</view>
				<view style="padding:0 30rpx 30px;">
					<image :src="imgUrl" mode="widthFix" style="width:100%;"></image>
				</view>
			</scroll-view>
		</uni-popup>
	</view>
</template>

<script>
	import html2canvas from "plugins/html2canvas"
	const app = getApp();
	export default {

		data() {
			return {
				infoData: {},
				id: '',
				imgUrl:"",
				create:false,
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
						this.downImage(this.infoData.portrait, res => {
							this.infoData.portrait = res;
						})
						if(this.infoData.qrCode.indexOf(app.globalData.baseUrl)!=-1){
							this.infoData.qrCode = this.infoData.qrCode.replace(app.globalData.baseUrl,"/api");
						}
						this.downImage(this.infoData.qrCode, res => {
							this.infoData.qrCode = res;
							
						})
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
				this.create = true;
				app.loading("生成中");
				let qselect = document.querySelector("#doctorcode");
				var w = qselect.offsetWidth;
				var h = qselect.offsetHeight; //要将 canvas 的宽高设置成容器宽高的 2 倍
				var canvas = document.createElement("canvas");
				canvas.width = w * 2;
				canvas.height = h * 2;
				canvas.style.width = w + "px";
				canvas.style.height = h + "px";
				var context = canvas.getContext("2d"); //然后将画布缩放，将图像放大两倍画到画布上 
				context.scale(2, 2);
				html2canvas(qselect, {
					canvas: canvas,
					scale: 1,
					width: w,
					height: h,
					dpi: window.devicePixelRatio * 4,
					allowTaint: false,
					taintTest: false,
					useCORS: true,
				}, {
					useCORS: true
				}).then(canvas => {
					let dataURL = canvas.toDataURL("image/png");
					this.imgUrl = dataURL;
					this.create = false;
					app.loaded();
					this.$refs.imgbox.open();
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
					color: #FFFFFF;
					display: inline-block;
					border-radius: 10.5px;
					padding: 2px 15px 4px;line-height: 1;
					>text{
						display: inline-block;
					}
				}

				.department {
					padding-top: 10rpx;
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
					margin-top: 40rpx;
				}

				.qrCode-tips {
					font-size: 12px;
					color: #55A29E;
					margin-top: 0rpx;
				}
				.line{
				background-color:#D2D2D2;
				height: 0.9rpx;
				margin-left: 100rpx;
				margin-right: 100rpx;
				margin-top: 10rpx;
				}
				.qrCode-subtips{
					margin-top: 10rpx;
					font-size: 10px;
					color: #666666;
					margin-left: 100rpx;
					margin-right: 100rpx;
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
