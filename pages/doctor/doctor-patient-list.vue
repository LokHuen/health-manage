<template>
	<view class="container flexc">
		<view class="flex head" @click="showQrCode">
			<text>医生名片码</text>
			<image style="width: 12rpx; height: 24rpx;" src="../../static/icon/more_icon.png"></image>
		</view>
		<view class="list-box" v-for="(item,index) in list">
			<view class="name">
				{{item.patientName}}
				<view class="photo-box" v-if="item.phone" @click="call(item)">
					<image src="../../static/mine/choose.png" class="photo-num" v-if="false"></image>
					<view class="photo-tip">电话联系</view>
				</view>
			</view>
			<view class="desc">{{(item.patientGender || item.age || item.illness)?((item.patientGender==1?('男 '):'女 ')+(item.age?(item.age+' '):'')+(item.illness?item.illness:'')):'患者未完善资料'}}</view>
			<view class="desc">{{'医生名字：'+item.docotorName+' ('+item.hospital+' '+item.department+')'}}</view>
			<view class="desc" v-if="item.surveyResult && item.surveyScore">{{'最近一次测评结果：'+item.surveyResult+' ('+item.surveyScore+'分)'}}</view>
			<view class="desc" v-if="item.lastSurveyTime">{{'最近一次测评时间：'+item.lastSurveyTime}}</view>
			<view class="desc" v-if="!item.surveyResult">暂无营养评估记录</view>
			<view class="desc">{{'订单数：'+item.orderCount+(item.orderTime?(' ('+'最近一次下单时间：'+item.orderTime+')'):'')}}</view>
			<view style="height: 20rpx;"></view>
			<view class="desc">{{'和医生绑定时间：'+item.bindTime}}</view>
			<view style="height: 40rpx;"></view>
		</view>
		<view class="no-data-tips" v-if="list.length == 0">暂无患者</view>
		<uni-popup ref="qrPopup">
			<view>
				<image style="width: 480rpx;height: 480rpx;" :src="qrCode"></image>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		created() {
			uni.setNavigationBarTitle({
				title: this.dortorName
			})
		},
		data() {
			return {
				dortorName: '',
				doctorId: '',
				list: [],
				qrCode: ''
			}
		},
		methods: {
			showQrCode() {
				this.$refs.qrPopup.open()
			}
		},
		onLoad(props) {
			this.qrCode = props.qrCode
			this.doctorId = props.doctorId
			this.dortorName = props.dortorName
			app.getDoctorPatients({
				bindDoctor: this.doctorId
			}).then((res) => {
				this.list = res.data.list
			})
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
		height: 100vh;

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
	}
</style>
