<template>
	<view>
		<!-- 购买影像学解读页面 -->
		<imaging-report-infomation @selectImageType="selectImageType" @selectDate="selectDate" @agencyInput="agencyInput"
		 @nameInput="nameInput" @contentInput="contentInput" :imageType="imageType">
		</imaging-report-infomation>

		<imaging-report-pic @imageChange="imageChange"></imaging-report-pic>

		<imaging-report-address @backAddress="backAddress" @backUserName="backUserName" @backMobile="backMobile"></imaging-report-address>
		<view style="height: 20px;"></view>
		<service-appoint @appointHandle="appointHandle" :price="priceInfo.price" :discount="priceInfo.discount" :isActive="isActive"
		 :hasCoupon="priceInfo.hasCoupon"></service-appoint>
		<view style="height: 20px;"></view>
		<imaging-type @selectMriType="selectMriType" ref="imagingType"></imaging-type>

		<uni-popup ref="pay_popup" type="bottom" class="pay-poupu">
			<view class="white-background">
				<text>请选择付款方式</text>
				<text @click="wxHandle">微信支付</text>
				<text @click="codeHandle">使用兑换码兑换服务</text>
				<text @click="colsePayDialog">取消</text>
			</view>
		</uni-popup>
		<uni-popup ref="code_popup" type="bottom" class="code-poupu">
			<view class="white-background">
				<view class="title">
					<image :src="imageUrl+'/icon_close.png'" @click="colseCodeDialog"></image>
					<text>请输入兑换码</text>
					<text @click="confirmCode">确定</text>
				</view>
				<input placeholder="请输入兑换码" v-model="redeemCode"></input>
				<text class="re-input-text" v-if="redeemCode==''&&codeError">兑换码有误或已失效，请重新输入</text>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	const uploadImage = app.uploadImage
	import http from '../../common/http.js'
	import imagingReportInfomation from '../../components/imagingReport/imagingReportInfomation.vue'
	import imagingReportPic from '../../components/imagingReport/imageing-report-pic.vue'
	import imagingReportAddress from '../../components/imagingReport/imaging-report-address.vue'
	import serviceAppoint from '../../components/service-appoint/service-appoint.vue'
	import imagingType from '../../components/imagingReport/imaging-type.vue'
	export default {
		components: {
			imagingReportInfomation,
			imagingReportPic,
			imagingReportAddress,
			serviceAppoint,
			imagingType
		},
		onLoad() {
			http.get('/wx/interpret/mri/getPrice')
				.then((data) => {
					this.priceInfo = data.data
				})
		},
		computed: {
			isActive: function() {
				return this.mriType != 0 && this.mriOrg != '' && this.mriDate != '' && this.subjectName != '' && this.illness !=
					'' && this.rcvAddress != '' && this.rcvName != '' &&
					this.rcvTelephone != '' && this.mriUrl.length > 0
			}
		},
		data() {
			return {
				imageUrl: this.$imageUrl,
				mriType: 0,
				mriOrg: '',
				mriDate: '',
				subjectName: '',
				illness: '',
				rcvAddress: '',
				rcvName: '',
				rcvTelephone: '',
				priceInfo: {},
				redeemCode: '', //兑换码
				codeError: false,
				mriUrl: [],
				imageType: '请选择影像类型',
			}
		},
		methods: {
			selectMriType(data) {
				console.log(data)
				this.mriType = data.type
				this.imageType = data.text
			},
			selectImageType() {
				this.$refs.imagingType.shopView()
			},
			selectDate(e) {
				this.mriDate = e
				console.log(e)
			},
			agencyInput(e) {
				this.mriOrg = e
			},
			nameInput(e) {
				this.subjectName = e
			},
			contentInput(e) {
				this.illness = e
			},
			backAddress(e) {
				console.log('dizhi'+e)
				this.rcvAddress = e
			},
			backUserName(e) {
				this.rcvName = e
			},
			backMobile(e) {
				this.rcvTelephone = e
			},
			appointHandle() {
				this.$refs.pay_popup.open()
			},
			colsePayDialog() {
				this.$refs.pay_popup.close()
			},
			imageChange(images) {
				console.log(images.join(','))
				this.mriUrl = images.join(',')
			},
			wxHandle() {
				let data = {
					payWay: 1,
					mriType: this.mriType,
					mriOrg: this.mriOrg,
					mriDate: this.mriDate,
					subjectName: this.subjectName,
					illness: this.illness,
					mriUrl: this.mriUrl,
					rcvAddress: this.rcvAddress,
					rcvName: this.rcvName,
					rcvTelephone: this.rcvTelephone,
				}

				console.log(data)
				if (data.mriType == 0) {
					app.tip('请选择影像类型', 1500)
					return
				}

				if (!data.mriOrg) {
					app.tip('请填写影像出具机构名称', 1500)
					return
				}
				if (!data.mriDate) {
					app.tip('请选择体检日期', 1500)
					return
				}

				if (!data.subjectName) {
					app.tip('请填写体检人名字', 1500)
					return
				}

				if (!data.illness) {
					app.tip('请填写疾病描述信息', 1500)
					return
				}
				if (!data.rcvAddress) {
					app.tip('请填写收件人地址', 1500)
					return
				}
				if (!data.rcvName) {
					app.tip('请填写收件人名字', 1500)
					return
				}
				if (!data.rcvTelephone) {
					app.tip('请填写联系人电话', 1500)
					return
				}

				http.post('/wx/interpret/mri/save', data)
					.then((res) => {
						let data = JSON.parse(res.data.result)
						let info = {
							rcv_name: res.data.rcv_name,
							rcv_address: res.data.rcv_address,
							rcv_telephone: res.data.rcv_telephone
						}
						console.log(data.data, info)
						this.pay(data.data, info)
					})
			},
			pay(data, info) {
				let that = this
				uni.requestPayment({
					timeStamp: data.timeStamp,
					nonceStr: data.nonceStr,
					package: data.package,
					signType: data.signType,
					paySign: data.paySign,
					success: function(res) {
						console.log(res)
						that.paySuccess(3, info)
						console.log('success:' + JSON.stringify(res));
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
						app.tip('支付失败', 1500)
					}
				});
			},
			paySuccess(type, info) {
				uni.navigateTo({
					url: '../index/result?type=' + type + '&info=' + JSON.stringify(info)
				})
			},
			codeHandle() {
				this.$refs.pay_popup.close()
				this.$refs.code_popup.open()
			},
			colseCodeDialog() {
				this.$refs.code_popup.close()
			},
			confirmCode() {
				let data = {
					payWay: 2,
					mriType: this.mriType,
					mriOrg: this.mriOrg,
					mriDate: this.mriDate,
					subjectName: this.subjectName,
					illness: this.illness,
					mriUrl: this.mriUrl,
					rcvAddress: this.rcvAddress,
					rcvName: this.rcvName,
					rcvTelephone: this.rcvTelephone,
					redeemCode: this.redeemCode
				}
				console.log(data)
				if (data.mriType == 0) {
					app.tip('请选择影像类型', 1500)
					return
				}

				if (!data.mriOrg) {
					app.tip('请填写影像出具机构名称', 1500)
					return
				}
				if (!data.mriDate) {
					app.tip('请选择体检日期', 1500)
					return
				}

				if (!data.subjectName) {
					app.tip('请填写体检人名字', 1500)
					return
				}

				if (!data.illness) {
					app.tip('请填写疾病描述信息', 1500)
					return
				}
				if (!data.rcvAddress) {
					app.tip('请填写收件人地址', 1500)
					return
				}
				if (!data.rcvName) {
					app.tip('请填写收件人名字', 1500)
					return
				}
				if (!data.rcvTelephone) {
					app.tip('请填写联系人电话', 1500)
					return
				}

				http.post('/wx/interpret/mri/save', data)
					.then((res) => {
						console.log(res+'fdfdsfdsfdsf')
						uni.navigateTo({
							url: '../index/result?type=3' + '&info=' + JSON.stringify(res.data)
						})
					}).catch((res)=>{
						if (res.status == -1) {
							this.codeError = true
						}
					})
			}
		}
	}
</script>

<style lang="scss">
	.pay-poupu {
		.white-background {
			position: relative;
			display: flex;
			flex-direction: column;
			background-color: #FFFFFF;
			width: 100%;
			border-radius: 20rpx 20rpx 0 0;

			text:nth-child(1) {
				border-bottom: 1rpx solid #f6f6f6;
				width: 100%;
				height: 106rpx;
				line-height: 106rpx;
				text-align: center;
				font-size: 32rpx;
				color: #343434;
			}

			text:nth-child(2) {
				border-bottom: 1rpx solid #e5e5e5;
				width: 100%;
				height: 128rpx;
				line-height: 128rpx;
				text-align: center;
				font-size: 36rpx;
				color: #2894EC;
			}

			text:nth-child(3) {
				border-bottom: 20rpx solid #f6f6f6;
				width: 100%;
				height: 128rpx;
				line-height: 128rpx;
				text-align: center;
				font-size: 36rpx;
				color: #333333;
			}

			text:nth-child(4) {
				width: 100%;
				height: 112rpx;
				line-height: 112rpx;
				text-align: center;
				font-size: 36rpx;
				color: #666666;
			}
		}
	}

	.code-poupu {
		.white-background {
			padding-bottom: 100rpx;
			display: flex;
			flex-direction: column;
			background-color: #FFFFFF;
			width: 100%;
			border-radius: 20rpx 20rpx 0 0;

			.title {
				padding-top: 50rpx;
				padding-left: 40rpx;
				padding-right: 40rpx;
				justify-content: space-between;
				align-items: center;
				display: flex;

				image:nth-child(1) {
					width: 30rpx;
					height: 30rpx;
				}

				text:nth-child(2) {
					font-size: 32rpx;
					color: #343434;
				}

				text:nth-child(3) {
					font-size: 36rpx;
					color: #2894EC;
				}
			}

			input {
				height: 90rpx;
				margin-left: 40rpx;
				margin-right: 40rpx;
				margin-top: 60rpx;
				border: 1px solid #C9C9C9;
				border-radius: 4rpx;
				padding-left: 20rpx;
				margin-bottom: 20rpx;
				color: #333333;
			}

			.re-input-text {
				position: absolute;
				font-size: 30rpx;
				color: #666666;
				// margin-bottom: 110rpx;
				// margin-left: 40rpx;
				left: 40rpx;
				bottom: 50rpx;
			}
		}
	}
</style>
