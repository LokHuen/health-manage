<template>
	<!-- 医生营养管理界面 -->
	<view class="container">

		<view class="screen-box">
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
				{{(item.patientGender || item.age || item.illness)?((item.patientGender?(item.patientGender+' '):'')+(item.age?(item.age+' '):'')+(item.illness?item.illness:'')):'患者未完善资料'}}
			</view>
			<view class="desc">{{'医生名字：'+item.docotorName+' ('+item.hospital+' '+item.department+')'}}</view>
			<view class="desc" v-if="item.surveyResult">{{'最近一次测评结果：'+item.surveyResult}}
				{{item.surveyId==1?(' ('+item.surveyScore+'分)'):""}}
			</view>
			<view class="desc" v-if="item.lastSurveyTime">{{'最近一次测评时间：'+item.lastSurveyTime}}</view>
			<view class="desc" v-if="!item.surveyResult">暂无营养评估记录</view>
			<view class="desc">{{'订单数：'+item.orderCount+(item.orderTime?(' ('+'最近一次下单时间：'+item.orderTime+')'):'')}}
			</view>
			<view style="height: 20rpx;"></view>
			<view class="desc">{{'和医生绑定时间：'+item.bindTime}}</view>
			<view style="height: 40rpx;"></view>
		</view>
		<view class="no-data-tips" v-if="list.length == 0">暂无数据</view>
		<!-- <view style="height: 30rpx;"></view> -->

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
	const app = getApp();
	export default {
		data() {
			return {
				list: [],
				params: {
					orderBy: 2, // 	//排序方式（1测评时间排序 ，2绑定时间））
					pageNo: 1,
					salesManId: ''
				},
				pageCount: 1
			}
		},
		onLoad(props) {
			this.params.salesManId = props.salesManId;
			this.refreshData();
		},
		methods: {
			selecgtInfo(index) {
				if (this.params.orderBy != index) {
					this.params.orderBy = index;
					this.refreshData();
				}
				this.closePatienScreen();
			},
			patienScreen() {
				this.$refs.popupPatient.open();
			},
			closePatienScreen() {
				this.$refs.popupPatient.close();
			},

			refreshData() {
				this.params.pageNo = 1;
				this.getListData();
			},
			loadMoreData() {
				if (this.pageCount > this.params.pageNo) {
					this.params.pageNo++;
					this.getListData();
				}
			},
			getListData() {
				app.salesmanPatientList(this.params).then(res => {
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
				});
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
			}

		},

		onPullDownRefresh() {
			this.refreshData();
		},
		onReachBottom() {
			this.loadMoreData();
		},


	}
</script>

<style lang="scss">
	page {
		background-color: $uni-defautt-bg-color;
	}

	.container {
		// height: 100vh;
		background-color: #F5F6F6;
		// overflow-y: auto;

		.screen-box {
			display: flex;
			height: 100rpx;
			color: #333333;
			font-size: 15px;
			background-color: #FFFFFF;
			z-index: 999;
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

		.no-data-tips {
			margin-top: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: #666666;
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

	}
</style>
