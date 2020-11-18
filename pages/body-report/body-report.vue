<template>
	<view class="container">
		<view class="content">
			<text class="read-way">解读方式</text>
			<view class="list-item" @click="itemClick(0)">
				<view class="right">
					<view class="top">
						<image :src="imageUrl+'/icon/icon_ask.png'"></image>
						<text>在线图文咨询</text>
						<text>¥{{data.consultPrice}}</text>
					</view>
					<text class="service-des">提交一个或多个问题，医生在线回复</text>
				</view>
				<image class="radio_image" :src="readType==0?imageUrl+'/icon/icon_radio_select.png':imageUrl+'/icon/icon_radio_normal.png'"></image>
			</view>
			<view class="list-item" @click="itemClick(1)" v-if="!isCloseMobileFunction">
				<view @click.stop.prevent="1"><button open-type="getPhoneNumber" plain class="get-phone" v-if="!hasMobile"
					 @getphonenumber='getMobileCallback' hover-stop-propagation></button></view>

				<view class="right">
					<view class="top">
						<image :src="imageUrl+'/icon/icon_phone.png'"></image>
						<text>电话解读</text>
						<text>¥{{data.telephonePrice}}</text>
					</view>
					<text class="service-des">医生给您拨打电话，服务时长5分钟</text>
				</view>
				<image class="radio_image" :src="readType==1?imageUrl+'/icon/icon_radio_select.png':imageUrl+'/icon/icon_radio_normal.png'"></image>
			</view>

			<view class="phone_box" v-if="readType==1">
				<view class="qst_des">
					<text>请描述你的问题</text>
					<textarea placeholder-class="placeholder" placeholder="方便医生在给您拨打电话前对问题有初步的评估" v-model="illness"></textarea>
				</view>
				<view class="image_box">
					<text>报告上传（可不传）</text>
					<text>上传您想解读内容的那一页，有助于医生给出合理的建 议。</text>
					<view class="image-list">
						<view class="image_item" v-for="(item,index) in imageList">
							<image :src="baseUrl+item"></image>
							<image :src="imageUrl+'/icon/icon_remove_pic.png'" @click="removeImg(inde)"></image>
						</view>
						<view class="image_item" @click="selectPhoto">
							<image :src="imageUrl+'/icon/icon_add_pic.png'"></image>
						</view>
					</view>
				</view>
			</view>
			<service-appoint @appointHandle="appointHandle" :price="data.price" :discount="data.discount" :isActive="true"
			 :hasCoupon="data.hasCoupon"></service-appoint>
		</view>
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
				<input placeholder="请输入兑换码" v-model="redeemCode" type="number"></input>
				<text class="re-input-text" v-if="codeError">兑换码有误或已失效，请重新输入</text>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	const uploadImage = app.uploadImage
	import serviceAppoint from '../../components/service-appoint/service-appoint.vue'
	import http from '../../common/http.js'
	export default {
		components: {
			serviceAppoint
		},
		data() {
			return {
				imageUrl: this.$imageUrl,
				baseUrl: app.globalData.baseUrl,
				data: {}, //请求道的价格数据
				readType: 0, //解读类型
				imageList: [],
				hasMobile: app.getCache('mobile'),
				redeemCode: '', //兑换码
				codeError: false,
				illness: '',
				isCloseMobileFunction:true
			}
		},
		onLoad() {
			let mobile = app.getCache('mobile')
			this.hasMobile = mobile && mobile != '' && mobile != 'null'
			console.log('this.hasMobile===' + this.hasMobile)
			console.log('mobile===' + mobile)
		},
		onShow() {
			this.getPrice(this.readType)
		},
		methods: {
			getPrice(readType) {
				let onlineUrl = '/wx/interpret/consult/getPrice'
				let phoneUrl = '/wx/interpret/telephone/getPrice'
				http.get(readType ? phoneUrl : onlineUrl)
					.then((data) => {
						this.data = data.data
						console.log(this.data)
					})
			},
			itemClick(readType) {
				this.readType = readType
				this.getPrice(readType)
			},
			uploadSuccess(data) {
				if (data.status == 1) {
					let url = data.data.pictureUrl
					this.imageList.push(url)
				} else {
					console.log('上传失败')
				}
			},
			selectPhoto() {
				uploadImage('/wx/interpret/telephone/uploadPicture', this.uploadSuccess);
			},
			appointHandle() {
				this.$refs.pay_popup.open()
			},
			colsePayDialog() {
				this.$refs.pay_popup.close()
			},
			wxHandle() {
				let data = {
					payWay: 1
				}
				if (this.readType == 1) {
					data['illness'] = this.illness
					data['mriUrl'] = this.imageList.join(',');
				}

				http.post(this.readType == 0 ? '/wx/interpret/consult/save' : '/wx/interpret/telephone/save', data)
					.then((res) => {
						console.log(res)
						if (this.readType == 0) {
							let payInfo = JSON.parse(res.data.result)
							let id = res.data.id
							this.pay(payInfo.data, this.readType == 1 ? 2 : 1, id)
						} else if (this.readType == 1) {
							let payInfo = JSON.parse(res.data)
							this.pay(payInfo.data, this.readType == 1 ? 2 : 1)
						}
					})
			},
			pay(info, type, id) {
				let that = this;
				uni.requestPayment({
					timeStamp: info.timeStamp,
					nonceStr: info.nonceStr,
					package: info.package,
					signType: info.signType,
					paySign: info.paySign,
					success: function(res) {
						that.paySuccess(type, id)
						console.log('type=' + type)
						console.log('success:' + JSON.stringify(res));
					},
					fail: function(err) {
						console.log('fail:' + JSON.stringify(err));
						app.tip('支付失败', 1500)
					}
				});
			},
			paySuccess(type, id) {
				uni.navigateTo({
					url: '../index/result?type=' + type + '&id=' + id
				})
			},
			codeHandle() {
				this.$refs.pay_popup.close()
				this.redeemCode = ''
				this.codeError = false
				this.$refs.code_popup.open()
			},
			colseCodeDialog() {
				this.$refs.code_popup.close()
			},
			confirmCode() {
				let redeemCode = this.redeemCode
				let data = {
					redeemCode,
					payWay: 2
				}
				if (this.readType == 1) {
					data['illness'] = this.illness
					data['mriUrl'] = this.imageList.join(',');
				}
				http.post(this.readType == 0 ? '/wx/interpret/consult/save' : '/wx/interpret/telephone/save', data)
					.then((res) => {
						console.log(res)
						if (this.readType == 0) {
							let id = res.data.id
							uni.navigateTo({
								url: '../index/result?type=1' + '&id=' + id
							})
							this.colseCodeDialog()
						} else if (this.readType == 1) {
							uni.navigateTo({
								url: '../index/result?type=2'
							})
							this.colseCodeDialog()
						}
					}).catch((res) => {
						if (res.status == -1) {
							this.codeError = true
						}
					})
			},
			getMobileCallback(response) {
				let that = this;
				console.log(response)
				let encryptedData = response.detail.encryptedData
				let iv = response.detail.iv
				if (!!encryptedData) {
					uni.login({
						success(res) {
							let code = res.code
							console.log('code = ' + code)
							that.postMobileData(encryptedData, iv, code)
						}
					})
				}
			},
			postMobileData(encryptedData, iv, code) {
				console.log({
					encryptedData,
					iv,
					code
				})
				http.get('/wx/member/getMobile', {
					encryptedData,
					iv,
					code
				}).then((data) => {
					console.log(data)
					if (data.status == 1) {
						let mobile = data.data.mobile
						if (!mobile) {
							console.log('获取手机号码失败!')
						} else {
							app.setCacheAsync('mobile', mobile)
							this.hasMobile = true
						}
					} else {
						console.log('获取手机号码失败')
					}
				})
			},
			removeImg(index) {
				this.imageList.splice(index, 1)
			}
		}
	}
</script>

<style lang="scss">
	.container {
		.content {
			padding-left: 40rpx;
			padding-right: 40rpx;

			.read-way {
				color: #343434;
				font-size: 34rpx;
				font-weight: bold;
			}

			.list-item {
				padding: 35rpx 40rpx 35rpx 30rpx;
				box-shadow: 0px 0px 9rpx 1rpx rgba(0, 0, 0, 0.18);
				border-radius: 10rpx;
				margin-top: 30rpx;
				align-items: center;
				position: relative;
				display: flex;

				.get-phone {
					z-index: 999;
					left: 0;
					position: absolute;
					width: 100%;
					height: 100%;
					border: none;
				}

				.right {
					flex: 1;

					.top {
						display: flex;

						image {
							width: 40rpx;
							height: 40rpx;
						}

						text:nth-child(2) {
							color: #333333;
							margin-left: 14rpx;
							font-size: 32rpx;
						}

						text:nth-child(3) {
							color: #2793EC;
							font-size: 32rpx;
							margin-left: 30rpx;
						}
					}

					.service-des {
						font-size: 26rpx;
						color: #999999;
						margin-left: 54rpx;
					}
				}

				.radio_image {
					width: 36rpx;
					height: 36rpx;
				}
			}

			.phone_box {
				display: flex;
				flex-direction: column;

				.qst_des {
					flex: 1;
					display: flex;
					flex-direction: column;
					box-shadow: 0px 0px 9rpx 1rpx rgba(0, 0, 0, 0.18);
					border-radius: 10rpx;
					margin-top: 30rpx;
					box-sizing: border-box;
					padding: 36rpx 28rpx;

					text {
						font-size: 32rpx;
						color: #333333;
					}

					textarea {
						width: 100%;
						font-size: 26rpx;
						color: #333333;
						box-sizing: border-box;
						padding: 20rpx;
						border: 1px solid #D2D2D2;
						margin-top: 20rpx;
						border-radius: 4rpx;

						.placeholder {
							color: #999999;
						}
					}
				}

				.image_box {
					display: flex;
					flex-direction: column;
					box-shadow: 0px 0px 9rpx 1rpx rgba(0, 0, 0, 0.18);
					border-radius: 10rpx;
					margin-top: 30rpx;
					box-sizing: border-box;
					padding: 36rpx 28rpx;

					text:nth-child(1) {
						font-size: 32rpx;
						color: #333333;
					}

					text:nth-child(2) {
						font-size: 26rpx;
						margin-top: 24rpx;
						color: #999999;
					}

					.image-list {
						display: flex;
						flex-wrap: wrap;

						.image_item {
							width: 23%;
							margin-right: 2%;
							height: 134rpx;
							position: relative;
							margin-top: 36rpx;

							image:nth-child(1) {
								width: 100%;
								height: 100%;
							}

							image:nth-child(2) {
								position: absolute;
								width: 25rpx;
								height: 25rpx;
								top: -10rpx;
								right: -10rpx;
							}
						}
					}
				}
			}

			.appoint-box {
				margin-top: 60rpx;
			}

		}

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
					;
					left: 40rpx;
					bottom: 50rpx;
				}
			}
		}
	}
</style>
