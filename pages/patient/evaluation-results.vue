<template>
	<view>
		<view class="resultbox">
			<view class="flex">
				<image src="../../static/resulticon.png" class="imageicon" mode="widthFix"></image>
				<view style="flex:1;">
					<view class="resultname" style="">{{info.result}}</view>
					<view class="resultpath" style="">{{info.phase}}</view>
					<view style="font-size:26rpx;color: #666;">测评时间：{{info.completeTime}}</view>
				</view>
			</view>
			<view class="advicetext">指南建议：</view>
			<view class="richtextarea">
				<rich-text v-show="showDetail" :nodes="info.content"></rich-text>
			</view>


		</view>
		<view class="infobox">
			<view style="text-align:center;">
				<!-- <wx-open-launch-weapp username="gh_e44479db8d50" path="pages/index/detail.html?id=1" style="width:100vw;">
					<script type="text/wxtag-template">
						<style>
							.jumpimg{
								width:100vw;height:auto;display:block;
							}
						</style>
						<div>
					    <img src='' alt="" class="jumpimg"/>
						
						</div>
					  </script>
				</wx-open-launch-weapp> -->
			</view>
			<!--  -->
			<view class="backgroung">
				<image :src="background" mode="widthFix"></image>
			</view>

			<div>
				<div class="banner">
					<image :src="banner" mode="widthFix"></image>
					<div class="banner-content">{{banner_intro}}</div>
					<wx-open-launch-weapp username="gh_e44479db8d50" path="pages/index/home.html" style="" class="otherbox">
						<script type="text/wxtag-template">
							<style>
								.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
							</style>
							<div class="otherbox"></div>
						</script>
					</wx-open-launch-weapp>
				</div>
			</div>



			<view class="first-box">
				<div class="first-item">
					<img class="first-item-img" :src="nutrition" mode="widthFix"></img>
					<div class="first-item-title">
						{{nutritionItem.name}}
					</div>
					<div class="first-item-subtitle">
						{{nutritionItem.subTitle}}
					</div>

					<div class="first-item-change-box">
						<div class="first-item-change">
							<div>{{nutritionItem.memo}}</div>
							<img src="../../static/index/blue_more.png"
							 class="first-item-rightImg"></img>
						</div>

					</div>
					<wx-open-launch-weapp username="gh_e44479db8d50" :path="'pages/index/goods.html?id='+nutritionItem.id" class="otherbox">
						<script type="text/wxtag-template">
							<style>
								.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
							</style>
							<div class="otherbox"></div>
								  </script>
					</wx-open-launch-weapp>
				</div>
				<div class="first-item">
					<img class="first-item-img" :src="energy" mode="widthFix"></img>
					<div class="first-item-title">
						{{energyItem.name}}
					</div>
					<div class="first-item-subtitle">
						{{energyItem.subTitle}}
					</div>

					<div class="first-item-change-box">
						<div class="first-item-change">
							<div>{{energyItem.memo}}</div>
							<img src="../../static/index/blue_more.png"
							 class="first-item-rightImg"></img>
						</div>

					</div>
					<wx-open-launch-weapp username="gh_e44479db8d50" :path="'pages/index/goods.html?id='+energyItem.id" class="otherbox">
						<script type="text/wxtag-template">
							<style>
								.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
							</style>
							<div class="otherbox"></div>
					</script>
					</wx-open-launch-weapp>
				</div>

				<div class="first-item">
					<img class="first-item-img" :src="immunity" mode="widthFix"></img>
					<div class="first-item-title">
						{{immunityItem.name}}
					</div>
					<div class="first-item-subtitle">
						{{immunityItem.subTitle}}
					</div>

					<div class="first-item-change-box">
						<div class="first-item-change">
							<div>{{immunityItem.memo}}</div>
							<img src="../../static/index/blue_more.png" class="first-item-rightImg"></img>
						</div>

					</div>
					<wx-open-launch-weapp username="gh_e44479db8d50" :path="'pages/index/goods.html?id='+immunityItem.id" class="otherbox">
						<script type="text/wxtag-template">
							<style>
								.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
							</style>
							<div class="otherbox"></div>
					</script>
					</wx-open-launch-weapp>
				</div>
			</view>
			<view class="second-box">
				
				<div class="second-item">
					<img class="second-item-img" :src="muscle" mode="widthFix"></img>
					<div class="second-item-title">
						{{muscleItem.name}}
					</div>
					<div class="second-item-subtitle">
						{{muscleItem.subTitle}}
					</div>

					<div class="second-item-change-box">
						<div class="second-item-change">
							<div>{{muscleItem.memo}}</div>
							<img src="../../static/index/icon_more_black.png"
							 class="second-item-rightImg"></img>
						</div>

					</div>
					<wx-open-launch-weapp username="gh_e44479db8d50" :path="'pages/index/goods.html?id='+muscleItem.id" class="otherbox">
						<script type="text/wxtag-template">
							<style>
								.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
							</style>
							<div class="otherbox"></div>
						</script>
						</wx-open-launch-weapp>

				</div>
				
				<div class="second-item">
					<img class="second-item-img" :src="sleep" mode="widthFix"></img>
					<div class="second-item-title" style="color: #0398AF;">
						{{sleepItem.name}}
					</div>
					<div class="second-item-subtitle" style="color: #0398AF;">
						{{sleepItem.subTitle}}
					</div>

					<div class="second-item-change-box">
						<div class="second-item-change">
							<div>{{sleepItem.memo}}</div>
							<img src="../../static/index/icon_more_black.png"
							 class="second-item-rightImg"></img>
						</div>

					</div>
					<wx-open-launch-weapp username="gh_e44479db8d50" :path="'pages/index/goods.html?id='+sleepItem.id" class="otherbox">
						<script type="text/wxtag-template">
							<style>
								.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
							</style>
							<div class="otherbox"></div>
						</script>
						</wx-open-launch-weapp>

				</div>
				
				<div class="second-item">
					<img class="second-item-img" :src="blood" mode="widthFix"></img>
					<div class="second-item-title" style="color: #AF1D03;">
						{{bloodItem.name}}
					</div>
					<div class="second-item-subtitle" style="color: #AF1D03;">
						{{bloodItem.subTitle}}
					</div>

					<div class="second-item-change-box">
						<div class="second-item-change">
							<div>{{bloodItem.memo}}</div>
							<img src="../../static/index/icon_more_black.png"
							 class="second-item-rightImg"></img>
						</div>

					</div>
					<wx-open-launch-weapp username="gh_e44479db8d50" :path="'pages/index/goods.html?id='+bloodItem.id" class="otherbox">
						<script type="text/wxtag-template">
							<style>
								.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
							</style>
							<div class="otherbox"></div>
						</script>
						</wx-open-launch-weapp>

				</div>
				
				<div class="second-item">
					<image class="second-item-img" :src="metabolism" mode="widthFix"></image>
					<div class="second-item-title" style="color: #6747BE;">
						{{metabolismItem.name}}
					</div>
					<div class="second-item-subtitle" style="color: #6747BE;">
						{{metabolismItem.subTitle}}
					</div>

					<div class="second-item-change-box">
						<div class="second-item-change">
							<div>{{metabolismItem.memo}}</div>
							<img src="../../static/index/icon_more_black.png"
							 class="second-item-rightImg"></img>
						</div>
					</div>
					<wx-open-launch-weapp username="gh_e44479db8d50" :path="'pages/index/goods.html?id='+metabolismItem.id" class="otherbox">
						<script type="text/wxtag-template">
							<style>
								.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
							</style>
							<div class="otherbox"></div>
						</script>
						</wx-open-launch-weapp>
				</div>
			</view>
		</view>
	</view>
</template>

<script>
	import setconfig from "../../common/wxconfig.js"
	import wx from '../../plugins/jweixin.js'
	let app = getApp();
	export default {
		data() {
			return {
				baseUrl: app.globalData.baseUrl,
				id: 1,
				showDetail: true,
				info: {},
				wxHtml: "",
				listData: [],
				banner: app.globalData.baseUrl+'/info/common/img/zhongliu1.png?1',
				background: app.globalData.baseUrl + '/info/common/img/backgroud2.png?0',
				img1: app.globalData.baseUrl + '/info/common/img/module1.png?2',
				img2: app.globalData.baseUrl + '/info/common/img/module2.png?2',
				img3: app.globalData.baseUrl + '/info/common/img/module3.png?2',
				img4: app.globalData.baseUrl + '/info/common/img/module4.png?2',
				nutrition: app.globalData.baseUrl + '/info/common/img/nutrition.png?2', //提高营养
				sleep: app.globalData.baseUrl + '/info/common/img/sleep.png?2', //帮助睡眠
				metabolism: app.globalData.baseUrl + '/info/common/img/metabolism.png?2', //代谢调理
				immunity: app.globalData.baseUrl + '/info/common/img/immunity.png?2', //增强免疫
				energy: app.globalData.baseUrl + '/info/common/img/energy.png?2', //补充能量
				blood: app.globalData.baseUrl + '/info/common/img/blood.png?2', //稳定血压
				muscle: app.globalData.baseUrl + '/info/common/img/muscle.png?2', //增强肌肉
				bannerItem: '',
				nutritionItem: '',
				sleepItem: '',
				metabolismItem: '',
				immunityItem: '',
				energyItem: '',
				bloodItem: '',
				muscleItem: '',
				banner_intro: '',
			}
		},
		onLoad(options) {
			this.id = options.id || 1;
			this.getinfo();
			this.getData();
		},
		methods: {

			getinfo() {
				app.loading("加载中")
				app.questiongetScore({
					surveyId: this.id
				}).then(res => {
					app.loaded();
					this.info = res.data;
					if (this.info.content) this.info.content = this.info.content.replace(/\<span/gi, '<span class="richtext"');
				})
			},
			getData() {
				app.homepage().then(res => {
					if (res.status == 1) {
						this.listData = res.data;
						this.banner_intro = this.listData[0].intro.replace(/\+/g, "<sup>+</sup>");
						for (var i = 0; i < this.listData.length; i++) {
							if (this.listData[i].locate == 1) {
								this.bannerItem = this.listData[i];
							} else if (this.listData[i].locate == 2) {
								this.nutritionItem = this.listData[i];
							}
							if (this.listData[i].locate == 3) {
								this.energyItem = this.listData[i];
							}
							if (this.listData[i].locate == 4) {
								this.immunityItem = this.listData[i];
							}
							if (this.listData[i].locate == 5) {
								this.muscleItem = this.listData[i];
							}
							if (this.listData[i].locate == 6) {
								this.sleepItem = this.listData[i];
							}
							if (this.listData[i].locate == 8) {
								this.metabolismItem = this.listData[i];
							}
							if (this.listData[i].locate == 7) {
								this.bloodItem = this.listData[i];
							}
						}
						setconfig().then(res => {

							if (!localStorage.getItem("reloadpage")) {
								localStorage.setItem("reloadpage", 1);
								location.reload();
							}
						});
					}
				})
			},
			onClickItem() {
				this.showDetail = !this.showDetail;
			},
			tootherpage() {
				uni.reLaunch({
					url: app.topageurl ? app.topageurl : "/pages/patient/patient-nutrition-manage",
				})
				if (app.topageurl) app.topageurl = "";
			},
			toanswerlist(id) {
				uni.navigateTo({
					url: "/pages/patient/answer?id=" + id
				})
			},

		}
	}

	function getBase64(imgUrl) {
		window.URL = window.URL || window.webkitURL;
		var xhr = new XMLHttpRequest();
		xhr.open("get", imgUrl, true);
		// 至关重要
		xhr.responseType = "blob";
		xhr.onload = function() {
			if (this.status == 200) {
				//得到一个blob对象
				var blob = this.response;
				// 至关重要
				let oFileReader = new FileReader();
				oFileReader.onloadend = function(e) {
					let base64 = e.target.result;
					console.log("base64", base64)
				};
				oFileReader.readAsDataURL(blob);
				return window.URL.createObjectURL(blob);
			}
		}
		xhr.send();
	}
</script>


<style lang="scss">
	.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
	.backgroung {
		width: 100%;
		z-index: -10;
		top: 0;
		position: fixed;

		image {
			width: 100%;
		}
	}

	.banner {
		width: 100%;min-height: 200rpx;

		image {
			width: 100%;
		}

		position: relative;

		.banner-content {
			text-align: center;
			padding-bottom: 0rpx;
			bottom: 50rpx;
			width: 650rpx;
			font-size: 24rpx;
			color: #666666;
			padding-left: 50rpx;
			position: relative;
			margin-top: -110rpx;
			// margin-right: 100rpx;
		}
	}

	.first-box {
		display: flex;
		margin-left: 15px;
		margin-right: 15px;
		justify-content: space-around;
		height: 110px;
	}

	.first-box .first-item {
		width: 110px;
		height: 110px;
		position: relative;
	}

	.first-box .first-item .first-item-img {
		width: 110px;
		height: 110px;
	}

	.first-box .first-item .first-item-title {
		font-size: 13px;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		top: 20px;
		left: 0px;
		right: 0px;
	}

	.first-box .first-item .first-item-subtitle {
		font-size: 8px;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		text-align: center;
		position: absolute;
		top: 42.5px;
		left: 0px;
		right: 0px;
	}

	.first-box .first-item .first-item-change-box {
		position: absolute;
		right: 10px;
		bottom: 10px;


	}

	.first-box .first-item .first-item-change-box .first-item-change {
		font-size: 9px;
		font-family: PingFang SC;
		font-weight: 500;
		color: #fff;
		display: flex;
	}

	.first-box .first-item .first-item-change-box .first-item-rightImg {
		width: 5px;
		height: 5px;
		margin-top: 5px;
		margin-left: 2.5px;
	}

	.second-box{
		margin-top: 60rpx;
		display: flex;padding-bottom: 35px;
		flex-wrap:wrap;
		justify-content:space-between;
		margin-left: 50rpx;
		margin-right: 50rpx;
		height: 461rpx;
		.second-item{
			width: 310rpx;
			height: 212rpx;
			position: relative;
			.second-item-img{
				width: 310rpx;
				height: 212rpx;
			}
			.second-item-title{
				position: absolute;
				top: 97rpx;
				left: 0rpx;right: 0rpx;
				text-align: center;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #AE6C46;
			}
			.second-item-subtitle{
				position: absolute;
				top: 135rpx;
				left: 0rpx;right: 0rpx;
				text-align: center;
				font-size: 16rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #AE6C46;
			}
			
			.second-item-change-box{
				position: absolute;
				right: 40rpx;
				bottom: 20rpx;
				.second-item-change{
					display: flex;
					font-size: 18rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #666666;
					
					 .second-item-rightImg{
						 width: 7px;
						 height: 12rpx;
						 margin-top: 8rpx;
						 margin-left: 8rpx;
					 }
					
				}
			}
			
		}
	}

	.item-box {
		width: 205rpx;
		height: 348rpx;
		border-radius: 6rpx;
		border: 2rpx solid #FFFFFF;
		margin-left: 30rpx;
		position: relative;
		padding-bottom: 50rpx;
		box-shadow: 2rpx 1rpx 10rpx #ccc;

		.title-box {
			margin-top: 15rpx;
			color: #FFFFFF;
			height: 72rpx;
			text-align: center;
			background-color: #192E71;

			.title {
				padding-top: 4rpx;
				font-size: 26rpx;
			}

			.subtitle {
				font-size: 14rpx;

			}
		}

		.detail {
			padding-top: 20rpx;
			padding-left: 15rpx;
			padding-right: 15rpx;
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			display: -webkit-box;
			-webkit-box-orient: vertical;
			-webkit-line-clamp: 8;
			overflow: hidden;
		}

		.change-box {
			position: absolute;
			right: 20rpx;
			bottom: 10rpx;

			.change {
				font-size: 18rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #0086DB;
				display: flex;

				.rightImg {
					width: 5px;
					height: 10rpx;
					margin-top: 10rpx;
					margin-left: 5rpx;
				}
			}
		}
	}

	.item-box1 {
		width: 310rpx;
		height: 335rpx;
		box-shadow: 2rpx 1rpx 10rpx #ccc;
		margin-left: 50rpx;
		box-sizing: border-box;
		padding-bottom: 42rpx;
		position: relative;
		border: 4rpx solid #fff;
		border-radius: 0 0 10rpx 10rpx;
		border-color: transparent #e9f1f6 #e9f1f6 #e9f1f6;

		.bg1 {
			width: 100%;
			position: absolute;
			top: -43rpx;
			left: -4rpx;
			right: 0;
			// height: 100%;
		}

		.change-box1 {
			position: absolute;
			right: 20rpx;
			bottom: 10rpx;

			.change1 {
				font-size: 18rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #0086DB;
				display: flex;

				.rightImg1 {
					width: 5px;
					height: 10rpx;
					margin-top: 10rpx;
					margin-left: 5rpx;
				}
			}
		}

		.content1 {
			// background-color: #007AFF;
			position: relative;
			// height: 250rpx;
			width: 100%;
			margin-top: 58rpx;
			bottom: 0rpx;
			left: 0rpx;

			.title1 {
				text-align: center;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #AE6C46;
			}

			.subtitle1 {
				text-align: center;
				font-size: 16rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #AE6C46;
			}

			.detail1 {
				padding-top: 15rpx;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				padding-left: 30rpx;
				padding-right: 30rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 5;
				overflow: hidden;
			}

		}
	}

	.item-box2 {
		width: 310rpx;
		height: 335rpx;
		box-shadow: 2rpx 1rpx 10rpx #ccc;
		margin-left: 30rpx;
		box-sizing: border-box;
		padding-bottom: 42rpx;
		position: relative;
		border: 4rpx solid #fff;
		border-radius: 0 0 10rpx 10rpx;
		border-color: transparent #e9f1f6 #e9f1f6 #e9f1f6;

		.bg2 {
			width: 100%;
			position: absolute;
			top: -43rpx;
			left: -4rpx;
			right: 0;
			// height: 100%;
		}

		.change-box2 {
			position: absolute;
			right: 20rpx;
			bottom: 10rpx;

			.change2 {
				font-size: 18rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #0086DB;
				display: flex;

				.rightImg2 {
					width: 5px;
					height: 10rpx;
					margin-top: 10rpx;
					margin-left: 5rpx;
				}

			}
		}

		.content2 {
			// background-color: #007AFF;
			position: relative;
			// height: 250rpx;
			width: 100%;
			margin-top: 58rpx;
			bottom: 0rpx;
			left: 0rpx;

			.title2 {
				text-align: center;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #0398AF;
			}

			.subtitle2 {
				text-align: center;
				font-size: 16rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #0398AF;
			}

			.detail2 {
				padding-top: 15rpx;
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				padding-left: 30rpx;
				padding-right: 30rpx;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 5;
				overflow: hidden;
			}
		}
	}

	.infobox {
		border-top: 20rpx solid #EFEFEF;
		box-sizing: border-box;
	}

	.resultbox {
		padding: 45rpx 60rpx;
		font-size: 30rpx;
		background: #fff;

		.imageicon {
			width: 139rpx;
			height: 150rpx;
			margin-right: 40rpx;
		}

		.resultname {
			font-weight: 600;
			color: #4EA29F;
			padding-bottom: 12rpx;
		}

		.resultpath {
			font-size: 26rpx;
			color: #666;
			padding-bottom: 12rpx;
		}

		.advicetext {
			font-size: 26rpx;
			color: #666;
			padding: 35rpx 0 13rpx;
		}



		.textbox1 {
			font-size: 26rpx;
			color: #52A29E;
		}

		.textbox2 {
			font-size: 22rpx;
			color: #999999;
			margin: 32rpx 0;
		}

		.logoicon {
			width: 70rpx;
			height: 70rpx;
			margin-right: 20rpx;
		}
	}

	.button-box {
		position: fixed;
		bottom: 0;
		padding: 0 0 30rpx;
		width: 100%;

		.button {
			height: 90rpx;
			margin-top: 30rpx;
			width: 81%;
			background-color: #52A29E !important;
			border-radius: 45rpx;
			color: #FFFFFF;
			font-size: 17px;
		}
	}

	.listContent {
		margin-top: 20rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
		background-color: #F7F8F8;

		.health-list-item {
			position: relative;
			margin-top: 30rpx;
			display: flex;

			.health-list-item-avatar-content {
				.health-list-item-avatar {
					margin-left: 20rpx;
					margin-top: 40rpx;
					width: 45rpx;
					height: 45rpx;
					border-radius: 50%;
				}
			}

			.health-list-item-content {
				margin-left: 15rpx;
				margin-top: 40rpx;
				padding-bottom: 40rpx;
				width: 100%;

				.health-list-item-title {
					font-size: 30rpx;
					font-weight: 600;
					color: #52A29E;
				}

				.health-list-item-detail {
					color: #999999;
					font-size: 26rpx;
					margin-top: 20rpx;
				}

				.health-list-item-time {
					color: #666666;
					font-size: 26rpx;
					margin-top: 30rpx;
					padding-bottom: 10rpx;
				}

				.line {
					background-color: #CCCCCC;
					margin-top: 15rpx;
					margin-bottom: 15rpx;
					height: 2rpx;
					margin-right: 20rpx;
				}

				img {
					max-width: 100%;
				}

				.advice-content {
					padding-right: 10px;
					color: #666666;
				}
			}

			.health-list-item-arrow {
				position: absolute;
				width: 35rpx;
				height: 19rpx;
				right: 20rpx;
				top: 120rpx;

			}
		}
	}
</style>
