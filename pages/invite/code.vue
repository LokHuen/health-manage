<template>
	<view style="">
		<view class="container1" >
			<view :class="'i-content-box '+(create?'make':'')" @click="saveimg" id="doctorcode">
				<view class="flex userinfo">
					<image src="../../static/haitao.png" mode="widthFix" class="content-bg"></image>
					<view style="flex:1;">
						<view>{{infoData.ChannelVal}}</view>
						<!-- <view style="font-size:24rpx;">好物推荐</view> -->
					</view>
				</view>
				<view class="username">
					<view class="name">{{info.patientName}}</view>
					<view>邀请您一起加入</view>
					<view>{{infoData.upVal}}</view>
				</view>
				<image :src="'/api'+infoData.qrCode" mode="widthFix" class="usercode"></image>
				<view class="mintips">{{infoData.downVal}}</view>

			</view>
			<view class="i-sava-tip">点击上方二维码，保存或分享</view>
			 
			<uni-popup ref="imgbox" type="bottom">
				<scroll-view scroll-y="true"
					style="background:#eee;padding: 20rpx;border-radius:20rpx 20rpx 0 0;max-height:80vh;box-sizing:border-box;">
					<view style="line-height:3;text-align:center;">长按下方图片保存或发送给朋友</view>
					<view style="padding:0 30rpx 30px;">
						<image :src="imgUrl" mode="widthFix" style="width:100%;border-radius:18rpx;"></image>
					</view>
				</scroll-view>
			</uni-popup>
		</view>
		<view v-show="create" class="fullwhite"></view>
	</view>
</template>

<script>
	const app = getApp();
	import html2canvas from "plugins/html2canvas"
	export default {

		onLoad(props = {}) {

			this.id = props.id || app.getCache("uid");
			this.type = props.type || this.type;
			this.init();
		},
		computed: {},
		data() {
			return {
				type: 1,
				name: '',
				phone: "",
				regionId: '',
				city: '',
				provinceId: '',
				province: '',
				areaList: [
					[],
					[]
				],
				hasArea: false,
				info:"",

				infoData:{},
				id: '',
				imgUrl: "",
				create: false,
			}
		},
		onShow() {
		},
		methods: {
			
			init() {
				app.userinviteCode({}).then(res => {
					this.infoData = res.data;
				});
				app.patientBasicInfo({}).then(res =>{
					if(res.status==1){
						this.info = res.data;
					}
				});
			},
			saveimg() {
				this.create = true;
				app.loading("生成中");
				document.body.scrollTop = document.documentElement.scrollTop = 0;
				setTimeout(() => {
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
						// dpi: window.devicePixelRatio * 4,
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
					}).catch(res => {
						alert(JSON.stringify(res))
					});
				}, 500)
			},
			downImage(url, callback) {
				uni.getImageInfo({
					src: url,
					success: function(image) {
						callback(image.path);
					}
				});
			},
			
			hideArea(cancel) {
				if (cancel) {} else {
					this.hasArea = true
				}
			},
			
		},

	}
</script>

<style lang="scss" scoped>
	.container1 {
	
		.i-content-box {
			width: 648rpx;
			box-sizing: border-box;
			margin: 50rpx auto 0;
			padding: 36rpx 36rpx 60rpx 36rpx;
			background: #fff;
			border-radius: 20rpx;box-shadow: 0px 0px 16rpx #ddd;
			font-size: 30rpx;
			position: relative;
	
			.userinfo {
				.content-bg {
					margin-right: 16rpx;
					height: 80rpx;
					font-size: 30rpx;
					width: 80rpx;
				}
			}
	
			.usercode {
				width: 400rpx;
				height: 400rpx;
				margin: 0rpx auto 10rpx;
				display: block;
			}
			.username{
				text-align:center;padding:30rpx 0 20rpx;line-height:2;color: #666666;font-size: 26rpx;
				.name{font-size:38rpx;color: #333333;}
			}
			.mintips{font-size: 24rpx;color: #55A29E;text-align:center;}
	
			.imglist {
				justify-content: space-around;
			}
	
			.imglistitem {
				font-size: 26rpx;
				color: #008ED8;
	
				.listimg {
					width: 66rpx;
					height: 66rpx;
					margin: 0rpx auto 10rpx;
					display: block;
				}
			}
			&.make{
				width: 648*3rpx;
				margin: 50*3rpx auto 0;
				padding: 36*3rpx 36*3rpx 60*3rpx 36*3rpx;
				border-radius: 20*3rpx;box-shadow: 0px 0px 16*3rpx #ddd;
				font-size: 30*3rpx;
				.userinfo {
					.content-bg {
						margin-right: 16*3rpx;
						height: 80*3rpx;
						font-size: 30*3rpx;
						width: 80*3rpx;
					}
				}
				.usercode {
					width: 400*3rpx;
					height: 400*3rpx;
					margin: 0*3rpx auto 10*3rpx;
				}
				.username{
					padding:30*3rpx 0 20*3rpx;font-size: 26*3rpx;
					.name{font-size:38*3rpx;}
				}
				.mintips{font-size:24*3rpx;}
			}
		}
	
		.i-sava-tip {
			margin: 50rpx auto 50rpx;
			color: #999999;
			text-align: center;
		}
	
	}
	.fullwhite{position:fixed;top:0;left:0;right:0;bottom:0;background:#fff;z-index:2;}
	page {
		background: #F8F8F8;
	}

	.i-sex-content {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		align-items: center;
		padding-top: 30rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;

		.i-sex-title {
			color: #272727;
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			padding-bottom: 20rpx;

		}

		.i-sex-title1 {
			color: #272727;
			font-size: 32rpx;
			//font-weight: bold;
			text-align: center;
			padding-bottom: 20rpx;
			width: 100%;
			position: relative;

			.i-sex-title-close {
				position: absolute;
				left: 40rpx;
				top: -10rpx;
				font-size: 26rpx;
				color: #999999;
			}

			.i-sex-title-sure {
				position: absolute;
				right: 40rpx;
				top: -10rpx;
				font-size: 26rpx;
				color: #333333;
			}
		}

		.i-sex-item {
			color: #272727;
			font-size: 32rpx;
			padding: 20rpx;
			text-align: center;
			position: relative;

			.img {
				position: absolute;
				width: 26rpx;
				height: 26rpx;
				right: 80rpx;
				top: 30rpx;
			}
		}

		.line {
			border-bottom: 1rpx solid #DDDDDD;
		}

		.active {
			background-color: #F7F7F7;
		}
	}

	.i-picker-container {
		background-color: #FFFFFF;

		.uni-padding-wrap {
			display: flex;
			justify-content: space-between;
			padding: 15rpx 30rpx;
			border-bottom: 1rpx solid #cfcfcf;
			color: #52A29E;
			font-size: 32rpx;
		}

		.i-picker-content {
			height: 450rpx;
			text-align: center;
		}
	}

	.imagelist {
		width: 175rpx;
		height: 175rpx;
		margin-top: 12.5rpx;
		margin-left: 12.5rpx;
		background-color: #D2D2D2;
	}

	.remove-icon {
		position: absolute;
		width: 25rpx;
		height: 25rpx;
		right: 0;
		top: 0;
	}

	.container {
		background: #fff;
		min-height: 100vh;

		.title {
			color: #333333;
			font-size: 30rpx;
			margin-left: 44rpx;
			margin-right: 44rpx;
			padding-top: 40rpx;
			padding-bottom: 40rpx;
		}

		.line-space {
			background-color: #F7F8F8;
			height: 20rpx;
		}

		.name-box {
			display: flex;
			margin-left: 43rpx;
			margin-right: 43rpx;
			flex-wrap: wrap;
			// height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;
			position: relative;

			.name-tips {
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				min-width: 146rpx;
			}

			.name-input {
				flex: 1;
				margin-left: 30rpx;
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
			}

			.name-novalue-input {
				margin-left: 30rpx;
				color: #b2b2b2;
				font-size: 15px;
				height: 100rpx;
				line-height: 100rpx;
			}



			.right-tip {
				position: absolute;
				color: #333333;
				font-size: 30rpx;
				right: 0;
				top: 30rpx;
			}
		}

		.sex-box {
			display: flex;
			margin-left: 43rpx;
			margin-right: 43rpx;
			height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;

			.sex-tips {
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				min-width: 130rpx;
			}

			.sex-value {
				margin-left: 30rpx;
				padding-right: 0;
				color: #999999;
				font-size: 15px;
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;
				// border: 1rpx solid #007AFF;
			}

			.has-value {
				margin-left: 30rpx;
				padding-right: 0;
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				// border: 1rpx solid #4CD964;
			}
		}

		.pic-title {
			color: #333333;
			font-size: 30rpx;
			padding-left: 43rpx;
			padding-top: 30rpx;
		}

		.pic-tip {
			font-size: 28rpx;
			color: #999999;
			padding-top: 20rpx;
			padding-left: 40rpx;
			padding-right: 40rpx;
		}

		.pic-content-box {
			.ccimglist {
				display: flex;
				flex-wrap: wrap;
				// justify-content:space-between;
				margin-left: 44rpx;
				margin-right: 44rpx;

				.img-box-first {
					margin-top: 5rpx;
					width: 200rpx;
					height: 200rpx;
					position: relative;
				}

				.img-box {
					margin-top: 5rpx;
					width: 200rpx;
					height: 200rpx;
					margin-left: 31rpx;
					position: relative;
				}

			}

		}

		.upload-box {
			margin-top: 40rpx;
			margin-left: 44rpx;
			height: 60rpx;
			width: 210rpx;
			color: #59A29F;
			border: 2rpx solid #52A29E;
			text-align: center;
			line-height: 60rpx;
		}

		.button-box {
			margin-top: 100px;
			height: 140rpx;
			width: 100%;

			.button {
				height: 90rpx;
				line-height: 90rpx;
				width: 81%;
				background-color: #008ED8 !important;
				border-radius: 10rpx;
				color: #FFFFFF;
				font-size: 34rpx;
			}
		}

		.popup-content {
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;
			font-size: 26rpx;

			.tips-title {
				margin-top: 60rpx;
				text-align: center;
				font-size: 34rpx;
				color: #333333;
			}

			.tips-common {
				margin-left: 50rpx;
				margin-right: 50rpx;
				color: #666666;
			}

			.tips-remind {
				margin-left: 50rpx;
				margin-right: 50rpx;
				color: #EA132D;
			}

			.agree-btn {
				text-align: center;
				background-color: #59A29F;
				color: #FFFFFF;
				font-size: 30rpx;
				height: 90rpx;
				line-height: 90rpx;
				margin-top: 20rpx;
				margin-left: 50rpx;
				margin-right: 50rpx;
			}

			.disagree-btn {
				text-align: center;
				background-color: #999999;
				color: #FFFFFF;
				font-size: 30rpx;
				height: 90rpx;
				line-height: 90rpx;
				margin-top: 30rpx;
				margin-left: 50rpx;
				margin-right: 50rpx;

			}
		}
	}

	.otherinput {
		width: 400rpx;
		flex: unset !important;
	}
	.item-tip{
		color: #333333;
		font-size: 25rpx;
		padding-left: 40rpx;
		padding-right: 40rpx;
		padding-top: 15rpx;
		padding-bottom: 40rpx;
		line-height: 40rpx;
	}

	.item-list {
		height: 106rpx;
		margin: 0rpx 30rpx;
		background: #fff;
		position: relative;padding-right:50rpx;
		border-radius: 10rpx;
		border-bottom: 2rpx solid #eee;

		.left-name {
			height: 106rpx;
			line-height: 106rpx;
			font-size: 15px;
			color: #333333;flex:1;
			padding-left: 36rpx;
		}

		.right-arrow {
			position: absolute!important;
			right: 20rpx;
			width: 15rpx;
			height: 26rpx;
			top: 44rpx;

		}
		&.mbt{margin-bottom:4rpx;}
	}
	.bigwhite{height:20rpx;}
</style>
