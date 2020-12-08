<template>
	<!-- 医生营养管理界面 -->
	<view class="container">
		<view class="top-box">

			<view class="info-box">
				<image :src="doctorInfo.portrait" mode="scaleToFill" class="avator"></image>
				<view class="user-msg-box">
					<view class="name-box">
						<view class="name">{{doctorInfo.doctorName}}</view>
						<view class="position">{{doctorInfo.technicalTitle}}</view>
					</view>
					<view class="msg">{{doctorInfo.hospital+doctorInfo.department}}</view>
				</view>

				<image src="../../static/icon/tishi.png" mode="widthFix" class="tips" @click="showTips"></image>

			</view>
			<view class="number-box">
				<view class="count-box">
					<view class="all-count">{{doctorInfo.patientCount}}</view>
					<view class="count-tip">总患者数</view>
				</view>

				<view class="line-vertical"></view>

				<view class="count-box">
					<view class="test-count">{{doctorInfo.surveyCount}}</view>
					<view class="count-tip">测评患者数</view>
				</view>
			</view>
			<view class="join-box" @click="joinTest">PG-SGA营养状况评量表></view>
		</view>


		<view class="fake-box" v-if="doctorInfo.showData==1">
			<image src="../../static/icon/remind_icon2.png" mode="widthFix" class="fake-icon"></image>
			<view class="fake-title">下方为演示数据，非真实患者，关闭请点击：</view>
			<view class="fake-close" @click="closeShowInfo">关闭</view>
		</view>

		<view class="fake-content-box" v-if="doctorInfo.showData==1">
			<view style="height: 25rpx; background-color: #F8F8F8;"></view>
			<view class="fakelistContent">
				<view class="fakemsg-box">
					<image class="fakeavator-box" :src="showInfo.portrait" mode="widthFix"></image>
					<view class="fakemsg-info-box">
						<view class="fakemsg-info-name">{{showInfo.patientName}}</view>
						<view class="fakemsg-info-detail">{{(showInfo.patientGender==1?'男':'女')+' '+(showInfo.age==0?'':(showInfo.age+'岁 '))+showInfo.illness}}</view>
					</view>
				</view>

				<view class="fakeline"></view>

				<!-- 健康信息 -->
				<view class="fakehealth-list-item">
					<view class="fakehealth-list-item-avatar-content">
						<image class="fakehealth-list-item-avatar" :src="showInfo.result=='营养良好'?'../../static/icon/smile.png':'../../static/icon/cry_icon.png'"></image>
					</view>
					<view class="fakehealth-list-item-content">
						<view class="fakehealth-list-item-title">{{showInfo.result}}</view>
						<view class="fakehealth-list-item-detail">{{showInfo.phase}}</view>
						<view class="fakehealth-list-item-time">{{'测评时间：'+showInfo.completeTime}}</view>

					</view>

				</view>
				<view class="fakeno-record-tips" v-if="!showInfo.result">暂无测评记录</view>
			</view>

		</view>

		<view class="line-space" v-if="listDatas.length>0"></view>
		<view class="screen-box" v-if="listDatas.length>0">
			<view class="all-patien-box" @click="patienScreen">
				<view class="all-patien">{{hasInfor==2?'全部患者':'资料已完善的患者'}}</view>
				<image class="all-arrow" src="../../static/icon/right_arrow.png" mode="widthFix"></image>
			</view>
			<view class="all-patien-box" @click="timeScreen">
				<view class="all-patien">{{orderBy==1?'按测评时间排序':'按患者加入时间排序'}}</view>
				<image class="all-arrow" src="../../static/icon/right_arrow.png" mode="widthFix"></image>
			</view>
		</view>

		<view class="listContent" v-for="(item,index) in listDatas" :key="index" @click="select(item)" v-if="listDatas.length>0">
			<view style="height: 30rpx; background-color: #FFFFFF;" v-if="index!=0"></view>
			<view class="msg-box">
				<image class="avator-box" :src="item.portrait" mode="widthFix"></image>
				<view class="msg-info-box">
					<view class="msg-info-name">{{item.patientName}}</view>
					<view class="msg-info-detail">{{(item.patientGender==1?'男':'女')+' '+(item.age==0?'':(item.age+'岁 '))+item.illness}}</view>
				</view>
			</view>

			<view class="line" v-if="listDatas.length>0"></view>


			<!-- 健康信息 -->
			<view class="health-list-item" v-if="item.result">
				<view class="health-list-item-avatar-content">
					<image class="health-list-item-avatar" :src="item.result=='营养良好'?'../../static/icon/smile.png':'../../static/icon/cry_icon.png'"></image>
				</view>
				<view class="health-list-item-content">
					<view class="health-list-item-title">{{item.result}}</view>
					<view class="health-list-item-detail">{{item.phase}}</view>
					<view class="health-list-item-time">{{'测评时间：'+item.completeTime}}</view>

				</view>

			</view>

			<view class="no-record-tips" v-if="!item.result">暂无测评记录</view>
		</view>
		<!-- <view class="no-data-tips" v-if="listDatas.length==0">暂无数据</view> -->
		<view style="height: 100px;" v-if="listDatas.length>0"></view>
		<view style="height: 200px; background-color: #F8F8F8; " v-if="listDatas.length==0"></view>

		<uni-popup ref="popupPatient" type="bottom">
			<!-- 选择患者 -->
			<view class="white-background-patient">
				<view class="first-item" @click="selecgtInfo(1)">资料已完善的患者</view>
				<view class="lines"></view>
				<view class="second-item" @click="selecgtInfo(2)">全部患者</view>
				<view class="liness"></view>
				<view class="cancel" @click="closePatienScreen">取消</view>
			</view>
		</uni-popup>

		<uni-popup ref="popupTime" type="bottom">
			<!-- 选择时间 -->
			<view class="white-background-patient">
				<view class="first-item" @click="selectOrderBy(2)">按患者加入时间排序</view>
				<view class="lines"></view>
				<view class="second-item" @click="selectOrderBy(1)">按测评时间排序</view>
				<view class="liness"></view>
				<view class="cancel" @click="closeTimeScreen">取消</view>
			</view>
		</uni-popup>

		<uni-popup ref="popupTips" type="center">
			<view class="tips-bg">
				<view style="height: 68rpx;"></view>
				<view class="tips-title">温馨提示</view>
				<view class="tips-sub">患者信息已经得到授权，您可以使用和建议。</view>
				<view class="tips-close" @click="closeTips">关闭</view>
				<view style="height: 60rpx;"></view>
			</view>

		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				hasInfor: 2, //是否完善资料（1：已经完善资料患者，2：全部患者）
				orderBy: 1, // 排序方式（测评时间排序 1，加入时间排序2）
				pageNo: 1,
				doctorInfo: {},
				listDatas: [],
				showInfo: {},
				show: true,
			}
		},
		methods: {
			judgeFirst() {
				//判断是不是首次进入这个页面，如果是的话，就弹出提示
				let frist = app.getCache('frist');
				if (!frist) {
					this.showTips();
					frist = 1;
					app.setCache('frist', frist);
				}
			},
			closeShowInfo() {
				app.closeShowData().then(res =>{
					if(res.status ==1 ){
						this.doctorInfo.showData = 0;
					}
				});
				
			},
			closeTips() {
				this.$refs.popupTips.close();
			},
			showTips() {
				this.$refs.popupTips.open();

			},
			joinTest() {
				uni.navigateTo({
					url: '../patient/nutritional-self-test'
				});
			},
			select(item) {
				console.log('uid==' + item.id);
				uni.navigateTo({
					//url:'patient-detail?uid='+item.id
					url: 'doc-patient-nutrition?uid=' + item.id
				});
			},
			patienScreen() {
				this.$refs.popupPatient.open();
			},
			closePatienScreen() {
				this.$refs.popupPatient.close();
			},
			timeScreen() {
				this.$refs.popupTime.open();
			},
			closeTimeScreen() {
				this.$refs.popupTime.close();
			},
			selecgtInfo(hasInfor) {
				//是否完善资料（1：已经完善资料患者，2：全部患者）
				this.closePatienScreen();
				if (this.hasInfor != hasInfor) {
					this.hasInfor = hasInfor;
					this.refreshData();
				}
			},
			selectOrderBy(orderBy) {
				//排序方式（测评时间排序 1，加入时间排序2）
				this.closeTimeScreen();
				if (this.orderBy != orderBy) {
					this.orderBy = orderBy;
					this.refreshData();
				}
			},
			getDoctorInfo() {
				app.doctorInfo({}).then(res => {
					if (res.status == 1) {
						this.doctorInfo = res.data;
					}
				});
			},
			getShowInfo() {
				app.doctorShowInfo().then(res => {
					if (res.status == 1) {
						this.showInfo = res.data;
					}
				});

			},
			refreshData() {
				this.pageNo = 1;
				this.getListData();
			},
			loadMoreData() {
				this.pageNo++;
				this.getListData();
			},
			getListData() {
				app.patientListInfo({
					pageNo: this.pageNo,
					hasInfor: this.hasInfor,
					orderBy: this.orderBy
				}).then(res => {
					if (res.status === 1) {
						if (this.pageNo === 1) {
							this.listDatas = res.data.list;
						} else {
							if (res.data.pageList.pageCount > this.pageNo) {
								this.listDatas = this.listDatas.concat(res.data.list);
							}
						}
					}
					uni.stopPullDownRefresh();
				});
			},


		},
		onShow() {
			this.$nextTick(() => {
				this.judgeFirst();
			})

		},
		onLoad() {
			this.getDoctorInfo();
			this.refreshData();
			this.getShowInfo();
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
	.container {
		.top-box {
			.info-box {
				display: flex;
				position: relative;

				.avator {
					margin-top: 40rpx;
					background-color: #909399;
					width: 128rpx;
					height: 128rpx;
					border-radius: 50%;
					margin-left: 50rpx;
				}

				.user-msg-box {
					padding-top: 50rpx;
					color: #333333;
					margin-left: 31rpx;

					.name-box {
						display: flex;

						.name {
							font-size: 20px;
						}

						.position {
							font-size: 14px;
							margin-left: 10rpx;
							margin-top: 13rpx;
						}

					}

					.msg {
						margin-top: 10rpx;
						font-size: 14px;
					}
				}

				.tips {
					position: absolute;
					right: 60rpx;
					top: 60rpx;
					width: 40rpx;
					height: 40rpx;

				}
			}

			.number-box {
				margin-top: 30rpx;
				margin-left: 50rpx;
				margin-right: 50rpx;
				height: 176rpx;
				box-shadow: 0px 0px 27px 0px rgba(0, 0, 0, 0.08);
				display: flex;

				.count-box {
					width: 49%;
					font-size: 13px;
					color: #333333;
					text-align: center;
					align-items: center;

					.all-count {
						padding-top: 30rpx;
						color: #52A29E;
						font-size: 25px;
					}

					.test-count {
						padding-top: 30rpx;
						color: #F8BD63;
						font-size: 25px;
					}

					.count-tip {}
				}

				.line-vertical {
					margin-top: 45rpx;
					width: 1rpx;
					height: 100rpx;
					background-color: #E5E5E5;
				}
			}

			.join-box {
				margin-top: 30rpx;
				text-align: center;
				color: #666666;
				font-size: 13px;
				margin-bottom: 30rpx;

			}

		}

		.fake-box {
			padding-top: 20rpx;
			background-color: #F7F8F8;
			padding-left: 50rpx;
			display: flex;

			.fake-icon {
				margin-top: 5rpx;
				width: 22rpx;
				height: 22rpx;
			}

			.fake-title {
				margin-left: 10rpx;
				color: #666666;
				font-size: 24rpx;
			}

			.fake-close {
				color: #3395E7;
				font-size: 24rpx;
			}
		}

		.line-space {
			background-color: #F7F8F8;
			height: 40rpx;
		}

		.screen-box {
			display: flex;
			height: 100rpx;
			color: #333333;
			font-size: 15px;

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

		.listContent {
			margin-left: 50rpx;
			margin-right: 50rpx;
			background-color: #F7F8F8;

			.msg-box {
				height: 170rpx;
				display: flex;

				.avator-box {
					width: 100rpx;
					height: 100rpx;
					margin-top: 40rpx;
					margin-left: 23rpx;
					border-radius: 50%;
					background-color: #CCCCCC;
				}

				.msg-info-box {
					margin-left: 27rpx;
					margin-top: 50rpx;
					color: #333333;

					.msg-info-name {
						font-size: 16px;
					}

					.msg-info-detail {
						font-size: 13px;
					}
				}
			}

			.line {
				background-color: #CCCCCC;
				height: 2rpx;
				margin-right: 20rpx;
				margin-left: 20rpx;
			}

			.no-record-tips {
				margin-top: 29rpx;
				margin-left: 20rpx;
				color: #999999;
				font-size: 13px;
				padding-bottom: 40rpx;
			}

			.health-list-item {
				position: relative;
				margin-top: 0rpx;
				display: flex;

				.health-list-item-avatar-content {
					.health-list-item-avatar {
						margin-left: 20rpx;
						margin-top: 25rpx;
						width: 45rpx;
						height: 45rpx;
						border-radius: 50%;
					}
				}

				.health-list-item-content {
					margin-left: 15rpx;
					margin-top: 25rpx;
					padding-bottom: 40rpx;
					width: 100%;

					.health-list-item-title {
						font-size: 30rpx;
						color: #52A29E;
					}

					.health-list-item-detail {
						color: #999999;
						font-size: 26rpx;
						margin-top: 15rpx;
					}

					.health-list-item-time {
						color: #666666;
						font-size: 26rpx;
						margin-top: 20rpx;
						padding-bottom: 10rpx;
					}

					.advice-content {
						font-size: 11px;
						color: #666666;
						margin-top: 20rpx;
						padding-bottom: 10rpx;
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

		.fake-content-box {
			background-color: #F7F8F8;
		}

		.fakelistContent {
			margin-left: 50rpx;
			margin-right: 50rpx;
			background-color: #FFFFFF;

			.fakemsg-box {
				height: 170rpx;
				display: flex;

				.fakeavator-box {
					width: 100rpx;
					height: 100rpx;
					margin-top: 40rpx;
					margin-left: 23rpx;
					border-radius: 50%;
					background-color: #CCCCCC;
				}

				.fakemsg-info-box {
					margin-left: 27rpx;
					margin-top: 50rpx;
					color: #333333;

					.fakemsg-info-name {
						font-size: 16px;
					}

					.fakemsg-info-detail {
						font-size: 13px;
					}
				}
			}

			.fakeline {
				background-color: #CCCCCC;
				height: 2rpx;
				margin-right: 20rpx;
				margin-left: 20rpx;
			}

			.fakeno-record-tips {
				margin-top: 29rpx;
				margin-left: 20rpx;
				color: #999999;
				font-size: 13px;
				padding-bottom: 40rpx;
			}

			.fakehealth-list-item {
				position: relative;
				margin-top: 0rpx;
				display: flex;

				.fakehealth-list-item-avatar-content {
					.fakehealth-list-item-avatar {
						margin-left: 20rpx;
						margin-top: 25rpx;
						width: 45rpx;
						height: 45rpx;
						border-radius: 50%;
					}
				}

				.fakehealth-list-item-content {
					margin-left: 15rpx;
					margin-top: 25rpx;
					padding-bottom: 40rpx;
					width: 100%;

					.fakehealth-list-item-title {
						font-size: 30rpx;
						color: #52A29E;
					}

					.fakehealth-list-item-detail {
						color: #999999;
						font-size: 26rpx;
						margin-top: 15rpx;
					}

					.fakehealth-list-item-time {
						color: #666666;
						font-size: 26rpx;
						margin-top: 20rpx;
						padding-bottom: 10rpx;
					}

					.fakeadvice-content {
						font-size: 11px;
						color: #666666;
						margin-top: 20rpx;
						padding-bottom: 10rpx;
					}
				}

				.fakehealth-list-item-arrow {
					position: absolute;
					width: 35rpx;
					height: 19rpx;
					right: 20rpx;
					top: 120rpx;

				}
			}
		}

		.no-data-tips {
			margin-top: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: #666666;
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

		.tips-bg {
			background-color: #FFFFFF;
			border-radius: 5px;
			width: 600rpx;

			.tips-title {
				text-align: center;
				font-size: 17px;
				color: #52A29E;
			}

			.tips-sub {
				margin-top: 40rpx;
				text-align: left;
				font-size: 16px;
				color: #333333;
				margin-left: 70rpx;
				margin-right: 70rpx;
			}

			.tips-close {
				margin-top: 100rpx;
				text-align: center;
				font-size: 17px;
				color: #FFFFFF;
				background-color: #52A29E;
				height: 90rpx;
				line-height: 90rpx;
				margin-left: 70rpx;
				margin-right: 70rpx;
				border-radius: 45rpx;
			}
		}

	}
</style>
