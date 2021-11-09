<template>
	<view class="">
		<turnback :url="backurl"> </turnback>
		<view class="lineblock"></view>
		<view class="boxlist">
			<view class="flex">
				<image class="userimg" :src="info.portrait" mode="aspectFill"></image>
				<view style="flex:1;font-size:34rpx;">
					<view class="flex">
						<text>{{info.patientName}}</text><text class="minfont">{{info.illness||""}}</text>
					</view>
					<view class="timefont">{{info.bindTime}} 加入</view>
				</view>
			</view>
			<view v-show="info.hasSurvey" class="userill flex">
				<view style="flex:1;">患者营养状况：{{info.surveyResult}}</view>
				<view class="towatch" @click="towatchhealth">查看详情 <uni-icons type="arrowright" size="14" color="#4774B6"></uni-icons>
				</view>
			</view>
		</view>
		<view class="flex projectbox">
			<view class="projectitem">
				<wx-open-launch-weapp username="gh_e44479db8d50" path="pages/index/goods.html" style="" class="otherbox">
					<script type="text/wxtag-template">
						<style>
							.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
						</style>
						<div class="otherbox"></div>
					</script>
				</wx-open-launch-weapp>
				<image class="itemicon" src="../../static/medical/7.png" mode="aspectFill"></image>
				<view>营养补充</view>
			</view>
			<view class="projectitem">
				<wx-open-launch-weapp username="gh_e44479db8d50" path="pages/index/check.html" style="" class="otherbox">
					<script type="text/wxtag-template">
						<style>
							.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
						</style>
						<div class="otherbox"></div>
					</script>
				</wx-open-launch-weapp>
				<image class="itemicon" src="../../static/medical/1.png" mode="aspectFill"></image>
				<view>基因检测</view>
			</view>
			<view class="projectitem" @click="tootherpage(1)">
				<image class="itemicon" src="../../static/medical/2.png" mode="aspectFill"></image>
				<view>海外药物</view>
			</view>
			<view class="projectitem" @click="tootherpage(2)">
				<image class="itemicon" src="../../static/medical/3.png" mode="aspectFill"></image>
				<view>临床招募</view>
			</view>
		</view>
		<view class="lineblock"></view>
		<view v-show="info.firstCate[0]||info.secondCate[0]||info.thirdCate[0]||info.fourCate[0]" class="tips">患者可能适用的产品</view>
		<view v-show="info.firstCate[0]" class="boxlist">
			<view class="boxtitle">口服营养补充剂</view>
			<view class="flex goodlistbox">
				<view class="goodlist" v-for="(item,index) in info.firstCate" :key="index">
					<image @click="tootherapp(item.relateId)" :src="item.imgUrl" mode="aspectFit" class="goodsimg"></image>
					<view @click="tootherapp(item.relateId)" style="padding:12rpx;">
						<view class="goodsname">{{item.name}}</view>
						<view class="flex">
							<view class="price">{{item.currencyType==1?"￥":""}}{{item.price}}{{item.currencyType==1?"":"HKD"}}</view>
						</view>
					</view>
					<wx-open-launch-weapp v-if="!isMiniProgram" username="gh_e44479db8d50" :path="'pages/index/detail.html?id='+item.relateId"
					 style="" class="otherbox">
						<script type="text/wxtag-template">
							<style>
								.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
							</style>
							<div class="otherbox"></div>
						</script>
					</wx-open-launch-weapp>
				</view>
			</view>
		</view>
		<view v-show="info.secondCate[0]" class="boxlist">
			<view class="boxtitle">基因检测</view>
			<view class="list-box">
				<view v-for="(item,index) in info.secondCate" :key="index">
					<view class="list-content flex">
						<image @click="tootherapp(item.relateId)" class="goodsimg" :src="item.imgUrl" mode="aspectFit"></image>
						<view @click="tootherapp(item.relateId)" style="flex:1;word-break:break-all;">
							<view class="list-title">{{item.name}}</view>
							<view class="list-price">
								<view class="price">
									{{item.currencyType==1?"￥":""}}{{item.price}}{{item.currencyType==1?"":"HKD"}}
								</view>
							</view>
						</view>
						<wx-open-launch-weapp v-if="!isMiniProgram" username="gh_e44479db8d50" :path="'pages/index/detail.html?id='+item.relateId"
						 style="" class="otherbox">
							<script type="text/wxtag-template">
								<style>
									.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
								</style>
								<div class="otherbox"></div>
							</script>
						</wx-open-launch-weapp>
					</view>
				</view>
			</view>
		</view>
		<view v-show="info.thirdCate[0]" class="boxlist">
			<view class="boxtitle">海外药</view>
			<view class="flex goodlistbox">
				<view class="goodlist" v-for="(item,index) in info.thirdCate" :key="index" @click="todetailpage(1,item)">
					<image :src="item.imgUrl" mode="aspectFit" class="goodsimg"></image>
					<view style="padding:12rpx;">
						<view class="goodsname">{{item.name}}</view>
						<view class="flex">
							<view class="price">{{item.currencyType==1?"￥":""}}{{item.price}}{{item.currencyType==1?"":"HKD"}}</view>
						</view>
					</view>

				</view>
			</view>
		</view>
		<view v-show="info.fourCate[0]" class="boxlist" style="padding:0;background:#F5F5F5;box-shadow:unset;">
			<view class="boxtitle" style="padding:30rpx 30rpx 30rpx 30rpx;background:#fff;box-shadow: 0 2rpx 10rpx #c4c4c4;">患者招募</view>
			<view v-for="(item,index) in info.fourCate" :key="index">
				<view class="enlistbox" @click="todetailpage(2,item)">
					<view class="enlisttitle">{{item.name}}</view>
					<view class="enlistitem">适应症：{{item.adaptationDisease||""}} </view>
					<view class="enlistitem">药物名称：{{item.medicine||""}} </view>
					<view class="enlistitem">药物类型：{{item.medicineType||""}} </view>
					<view class="enlistitem">试验分期：{{item.stage}}</view>
					<text class="enliststatus">{{item.statusName}}</text>
				</view>
			</view>

		</view>
		<view style="height:50rpx;"></view>
		<view v-show="!(info.firstCate[0]||info.secondCate[0]||info.thirdCate[0]||info.fourCate[0])" class="nogoods">暂无推荐的产品</view>
	</view>
</template>

<script>
	import setconfig from "../../common/wxconfig.js"
	import turnback from "../../components/turnback.vue"
	import wx from '../../plugins/jweixin.js'
	const app = getApp();
	export default {
		components: {
			turnback
		},
		data() {
			return {
				options: {},
				baseUrl: app.globalData.baseUrl,
				info: {
					firstCate: [],
					secondCate: [],
					thirdCate: [],
					fourCate: [],
				},
				isMiniProgram: false,
				backurl:sessionStorage.getItem("backurl"),
			}
		},
		onLoad(options) {
			this.options = options || {};
			this.init();
			if (!this.options.id && app.getCache('uid')) {
				this.judgeUserAuth();
			}
			setconfig().then(res => {
				var u = navigator.userAgent;
				if (/(iPhone|mac|iPod|iPad|iOS)/i.test(u)) {
					if (!sessionStorage.getItem("reloadperson")) {
						sessionStorage.setItem("reloadperson", 1);
						location.reload();
					}
				}
			});
			wx.miniProgram.getEnv((res) => {
				this.isMiniProgram = res.miniprogram ? true : false;
			})
		},
		onShow() {

		},
		methods: {
			init() {
				app.recommendProductList({
					patientId: this.options.id || app.getCache("uid")
				}).then(res => {
					this.info = res.data;
				});
			},
			towatchhealth() {
				if (!this.options.id && app.getCache('uid')) {
					uni.navigateTo({
						url: '/pages/patient/patient-nutrition-manage'
					});
				} else {
					uni.navigateTo({
						url: '/pages/doctor/doc-patient-nutrition?id=' + (this.options.id || app.getCache("uid"))
					});
				}
			},
			judgeUserAuth() {
				app.judgeUserAuth({}).then(res => {
					if (res.status == 1) {
						if (res.data.userType == 2) {
							//如果是医生，就跳过去医生
							uni.redirectTo({
								url: '/pages/medical/project'
							});
						}
					}
				});
			},
			todetailpage(index, item) {
				switch (index) {
					case 1:
						location.href = "http://gzh.healthme.cn/drug/orderDeail?id=" + item.relateId;
						break;
					case 2:
						location.href = "http://zhm.healthme.cn/clinicalTrialDeail?id=" + item.relateId;
						break;
				}
			},
			tootherapp(id) {
				wx.miniProgram.navigateTo({
					url: '/pages/minapp?id=' + id
				});
			},
			tootherpage(index){
				switch(index){
					case 1:
					location.href = "http://gzh.healthme.cn/drug/firstCancer?pid=0&id=45&name=%E6%B5%B7%E5%A4%96%E8%8D%AF";
					break;
					case 2:
					location.href = "http://zhm.healthme.cn/";
					break;
				}
			},
		}
	}
</script>

<style scoped lang="scss">
	.nogoods {
		color: #888;
		padding-top: 200rpx;
		text-align: center;
	}

	.enliststatus {
		background: #FFC600;
		color: #fff;
		border-radius: 4rpx;
		font-size: 26rpx;
		line-height: 46rpx;
		padding: 0 24rpx;
		display: inline-block;
		margin-top: 10rpx;
	}

	.enlistbox {
		background: #fff;
		padding: 30rpx 30rpx 30rpx;
		box-shadow: 0 2rpx 10rpx #c4c4c4;
		border-radius: 10rpx;
		margin-bottom: 26rpx;

		&:last-child {
			padding-bottom: 30rpx;
		}
	}

	.enlistitem {
		font-size: 26rpx;
		color: #666666;
		padding-bottom: 8rpx;
	}

	.enlisttitle {
		font-size: 32rpx;
		font-weight: 500;
		padding-bottom: 26rpx;
		border-bottom: 2rpx solid #e5e5e5;
		margin-bottom: 24rpx;
	}

	.goodlistbox {
		padding: 0 0 0rpx 0;
		margin: 0 -10rpx 0 -10rpx;
		align-items: stretch;

		.goodlist {
			width: 50%;
			margin: 8rpx 0rpx 8rpx 0;
			padding: 0 10rpx;
			box-sizing: border-box;
			position: relative;

			.goodsimg {
				width: 100%;
				height: 300rpx;
				display: block;
			}

			.goodsname {
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
				font-size: 26rpx;
				margin-bottom: 10rpx;
				color: #333333;
			}

			.price {
				font-size: 26rpx;
				flex: 1;
				color: #C10000;
			}
		}
	}

	.userill {
		padding-top: 26rpx;
		font-size: 30rpx;

		.towatch {
			font-size: 28rpx;
			color: #4774B6;
		}
	}

	.boxlist {
		box-shadow: 0 2rpx 10rpx #c4c4c4;
		margin: 0 30rpx 30rpx;
		background: #fff;
		border-radius: 12rpx;
		padding: 30rpx;
		box-sizing: border-box;

		.userimg {
			width: 90rpx;
			height: 90rpx;
			margin-right: 20rpx;
			border-radius: 50%;
		}

		.minfont {
			font-size: 28rpx;
			color: #888;
			padding-left: 20rpx;
		}

		.timefont {
			font-size: 28rpx;
			color: #888;
			padding-top: 6rpx;
		}

		.boxtitle {
			font-size: 32rpx;
			font-weight: bold;
			padding-bottom: 28rpx;
		}
	}

	.tips {
		padding: 10rpx 30rpx 30rpx 50rpx;
		font-size: 30rpx;
		color: #888;
	}

	.lineblock {
		height: 20rpx;
		background-color: #F5F5F5;
	}

	page {
		background: #F5F5F5;
	}

	.list-box {

		.list-content {
			position: relative;

			.goodsimg {
				width: 200rpx;
				height: 200rpx;box-sizing:border-box;padding:10rpx;
				margin-right: 10rpx;
			}

			.list-title {
				font-size: 28rpx;
				color: #272727;
				margin-bottom: 42rpx;
				padding-left: 16rpx;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 2;
			}

			.list-price {
				color: #C10000;
				font-size: 26rpx;
				margin-top: 15rpx;
				display: flex;

				.price {
					margin-left: 15rpx;
					color: #C10000;
				}
			}
		}
	}

	.otherbox {
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		z-index: 9;
	}
	.projectbox{
		padding:26rpx 0rpx 0;box-sizing:border-box;background:#fff;
		.projectitem{
			width:25%;padding-bottom:30rpx;text-align:center;font-size:28rpx;position:relative;
			.itemicon{width:70rpx;height:70rpx;padding:20rpx 20rpx 16rpx;}
		}
	}
</style>
