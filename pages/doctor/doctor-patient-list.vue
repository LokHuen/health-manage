<template>
	<view class="container flexc">
		<turnback @back="back" v-if="isMiniProgram"> </turnback>
		
		<view class="screen-box">
			<view class="flex head" @click="showQrCode">
				<text>医生名片码</text>
				<image style="width: 12rpx; height: 24rpx;" src="../../static/icon/more_icon.png"></image>
			</view>
			<view class="all-patien-box" @click="patienScreen">
				<view class="all-patien">{{params.orderBy==1?'按患者最近一次测评时间排序':'按患者和医生绑定的时间排序'}}</view>
				<image class="all-arrow" src="../../static/icon/right_arrow.png" mode="widthFix"></image>
			</view>
		</view>

		<view class="list-box" v-for="(item,index) in list">
			<view class="name">
				{{item.patientName}}
				<view class="photo-box" v-if="item.phone" @click="call(item)">
					<image src="../../static/mine/choose.png" class="photo-num" v-if="false"></image>
					<view class="photo-tip">电话联系</view>
				</view>
			</view>
			<view class="desc">
				{{(item.patientGender || item.age || item.illness)?((item.patientGender==1?('男 '):'女 ')+(item.age?(item.age+' '):'')+(item.illness?item.illness:'')):'患者未完善资料'}}
			</view>
			<view class="desc">{{'医生名字：'+item.docotorName+' ('+item.hospital+' '+item.department+')'}}</view>
			<view class="desc" v-if="item.surveyResult && item.surveyScore">
				{{'最近一次测评结果：'+item.surveyResult+' ('+item.surveyScore+'分)'}}
			</view>
			<view class="desc" v-if="item.surveyResult && !item.surveyScore">
				{{'最近一次测评结果：'+item.surveyResult}}
			</view>
			<view class="desc" v-if="item.lastSurveyTime">{{'最近一次测评时间：'+item.lastSurveyTime}}</view>
			<view class="desc" v-if="!item.surveyResult">暂无营养评估记录</view>
			<view class="desc">{{'订单数：'+item.orderCount+(item.orderTime?(' ('+'最近一次下单时间：'+item.orderTime+')'):'')}}
			</view>
			<view style="height: 20rpx;"></view>
			<view class="desc">{{'和医生绑定时间：'+item.bindTime}}</view>
			<view style="height: 40rpx;"></view>
		</view>
		<view class="no-data-tips" v-if="list.length == 0">暂无患者</view>
		<uni-popup ref="qrPopup" @change="qrPopupChange">
			<view>
				<image style="width: 480rpx;height: 480rpx;" :src="qrCode"></image>
			</view>
		</uni-popup>

		<uni-popup ref="popupPatient" type="bottom">
			<!-- 选择患者 -->
			<view class="white-background-patient">
				<view class="first-item" @click="selecgtInfo(1)">按患者最近一次测评时间排序</view>
				<view class="lines"></view>
				<view class="second-item" @click="selecgtInfo(2)">按患者和医生绑定的时间排序</view>
				<view class="liness"></view>
				<view class="cancel" @click="closePatienScreen">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp()
	import wx from '../../plugins/jweixin.js'
	 import turnback from "../../components/turnback.vue"
	
	export default {
		created() {
			uni.setNavigationBarTitle({
				title: this.dortorName
			})
		},
		components: {turnback},
		data() {
			return {
				dortorName: '',
				list: [],
				qrCode: '',
				//排序方式（1测评时间排序 ，2绑定时间）
				openQrCode: false,
				params: {
					bindDoctor: '',
					orderBy: 2,
					pageNo:1
				},
				pageCount: 1,
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
			showQrCode() {
				if (this.openQrCode) {
					this.$refs.qrPopup.close()
				} else {
					this.$refs.qrPopup.open()
				}
			},
			selecgtInfo(index) {
				if (this.params.orderBy != index) {
					this.params.orderBy = index;
					this.getListData();
				}
				this.closePatienScreen();
			},
			patienScreen() {
				this.$refs.popupPatient.open();
			},
			closePatienScreen() {
				this.$refs.popupPatient.close();
			},
			getListData() {
				app.getDoctorPatients(this.params).then((res) => {
					if (res.status == 1) {
						this.pageCount = res.data.pageCount
						if (this.params.pageNo == 1) {
							this.list = res.data.list;
						} else {
							if (this.pageCount >= this.params.pageNo) {
								this.list = this.list.concat(res.data.list);
							}
						}
					}
					uni.stopPullDownRefresh();
				})
			},
			refreshData() {
				this.params.pageNo = 1;
				this.getListData();
			},
			qrPopupChange(e) {
				// console.log(e)
				this.openQrCode = e.show
			},
			call(item) {
				uni.makePhoneCall({
					phoneNumber: item.phone, //仅为示例
					success: (res) => {

					},
					fail: (res) => {
						app.tip('调用失败');
					}
				});
			},
			onPullDownRefresh() {
				this.refreshData();
			},
			onReachBottom() {
				this.loadMoreData();
			},
			loadMoreData() {
				if (this.pageCount > this.params.pageNo) {
					this.params.pageNo++;
					this.getListData();
				}
			},
		},
		onLoad(props) {
			this.qrCode = app.globalData.baseUrl+props.qrCode
			this.params.bindDoctor = props.doctorId
			this.dortorName = props.dortorName
			this.getListData()
			this.getMiniProgramStatic();
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background: #F5F6F6;
	}

	.flex {
		display: flex;
	}

	.flexc {
		display: flex;
		flex-direction: column;
	}

	.container {
		// height: 100vh;

		.head {
			font-weight: bold;
			color: #333333;
			font-size: 32rpx;
			padding-bottom: 16rpx;
			padding-top: 40rpx;
			justify-content: space-between;
			align-items: center;
			border-bottom: 1rpx solid #EEEEEE;
			margin: 0 24rpx;
		}

		.no-data-tips {
			margin-top: 40rpx;
			color: #999999;
			text-align: center;
		}

		.list-box {
			margin-top: 30rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			background-color: #FFFFFF;

			.name {
				color: #333333;
				//margin-top: 40rpx;
				padding-top: 40rpx;
				margin-left: 30rpx;
				font-size: 40rpx;
				position: relative;

				.photo-box {
					position: absolute;
					display: flex;
					top: 50rpx;
					right: 50rpx;

					.photo-num {
						width: 30rpx;
						height: 30rpx;
					}

					.photo-tip {
						color: #333333;
						font-size: 28rpx;
						margin-left: 10rpx;
					}

				}
			}

			.desc {
				color: #666666;
				margin-top: 20rpx;
				margin-left: 30rpx;
				font-size: 26rpx;
			}
		}


		.white-background-patient {
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;
			color: #333333;
			font-size: 15px;

			.first-item {
				height: 120rpx;
				line-height: 120rpx;
			}

			.lines {
				height: 2rpx;
				margin-left: 200rpx;
				margin-right: 200rpx;
				background-color: #DCDCDC;
			}

			.second-item {
				height: 128rpx;
				line-height: 128rpx;
			}

			.liness {
				height: 20rpx;
				background-color: #F6F6F6;
			}

			.cancel {
				height: 100rpx;
				line-height: 100rpx;
			}
		}

		.screen-box {
			display: flex;
			flex-direction: column;
			// height: 100rpx;
			color: #333333;
			font-size: 15px;
			background-color: #FFFFFF;
			//z-index: 999;
			position: sticky;
			top: 0;

			.all-patien-box {
				display: flex;
				height: 100rpx;
				align-items: center;
				margin-left: 50rpx;

				.all-patien {
					line-height: 100rpx;
				}

				.all-arrow {
					margin-left: 10rpx;
					width: 27rpx;
					height: 15rpx;
				}

			}
		}
	}
</style>
