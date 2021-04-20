<template>
	<!-- 医生名片界面 -->
	<view class="container">
		<turnback @back="back" v-if="isMiniProgram" style="position: sticky;top: 0;"> </turnback>
		<view class="i-content-box" @click="saveimg" id="doctorcode"  click="saveQRCode">
			<image src="../../static/sales/codebg.png" mode="widthFix" class="content-bg"></image>
			<view class="content-info">
				<image :src="infoData" mode="widthFix" class="qrcode"></image>
			</view>
			<view class="lineshow"></view>
			<view class="qrCode-box">
				<view class="qrCode-tips">
					<view style="padding-bottom:10rpx;">微信扫一扫</view>
					<view>开通肿瘤患者营养管理平台</view>
				</view>
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
	import wx from '../../plugins/jweixin.js'
	import turnback from "../../components/turnback.vue"
	const app = getApp();
	export default {
        components: {turnback},
		data() {
			return {
				infoData:"",
				id: '',
				imgUrl:"",
				create:false,
				isMiniProgram:false
			}
		},
		methods: {
			getMiniProgramStatic(){
			 wx.miniProgram.getEnv((res)=>{
			    this.isMiniProgram = res.miniprogram?true:false;
			 })
			},
			back(){
			  uni.navigateBack({
			   
			  })
			},
			
			getData() {
				app.sale_doctorBusinessCard({}).then(res => {
					console.log(res);
					if (res.status == 1) {
						this.infoData = res.data;
						if(this.infoData.indexOf(app.globalData.baseUrl)!=-1){
							this.infoData = this.infoData.replace(app.globalData.baseUrl,"/api");
						}else{
							this.infoData = "/api"+this.infoData;
						}
						this.downImage(this.infoData, res => {
							this.infoData = res;
							
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
			this.getMiniProgramStatic();
		}


	}
</script>

<style lang="scss" scoped>
	.container {

		.i-content-box {
			width: 648rpx;
			margin: 50rpx auto 0;
			position: relative;

			.content-bg {
				margin: 0;height: 920rpx;
			width: 648rpx;
			}

			.content-info {
				position: absolute;
				top: 90rpx;
				right: 0;
				left: 0;
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
			.qrcode {
				width: 342rpx;
				height: 342rpx;
				margin-top: 0rpx;
			}
			.lineshow{
				background: #E5E5E5;height:2rpx;position: absolute;
				top: 510rpx;
				right: 70rpx;
				left: 70rpx;
			}
			.qrCode-box {
				position: absolute;
				bottom: 80rpx;
				right: 0;
				left: 0;
				text-align: center;

				.qrCode-tips {
					font-size: 28rpx;
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
