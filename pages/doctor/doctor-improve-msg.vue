<template>
	<!-- 医生端信息完善界面 -->
	<view class="container">
		<view class="title">完善医生资料，开通患者管理功能。</view>
		<view class="line-space"></view>
		<view class="name-box">
			<view class="name-tips">* 医生姓名</view>
			<input class="name-input" type="text" value="" placeholder="请填写医生的真实名字" v-model="name" />
		</view>

		<view class="name-box">
			<view class="name-tips">* 技术职称</view>
			<input class="name-input" type="text" value="" placeholder="请填写职称" v-model="position" />
		</view>

		<view class="name-box">
			<view class="name-tips">* 所在医院</view>
			<input class="name-input" type="text" value="" placeholder="请填写医院名称" v-model="hospital" />
			<text @click="openOption(0)" style="flex: 1;" :class="{empty:!hospital,'no-empty':hospital}"
				v-if="false">{{hospital?hospital:'请选择医院'}}</text>
		</view>

		<view class="name-box">
			<view class="name-tips">* 科室名称</view>
			<input class="name-input" type="text" value="" placeholder="请填写科室名称" v-model="department" />
			<text @click="openOption(1)" style="flex: 1;" :class="{empty:!department,'no-empty':department}"
				v-if="false">{{department?department:'请选择科室'}}</text>
		</view>
		<view class="name-box">

			<view class="name-tips">* 手机号码</view>
			<input class="name-input" type="text" value="" placeholder="请填写手机号" v-model="mobile" />
		</view>
		<view class="name-box">
			<view class="name-tips">* 验证码</view>
			<input class="name-input" type="text" value="" placeholder="请填写手机验证码" v-model="code" />
			<button type="default" class="code-button" @click="getCode">{{codetext}}</button>
		</view>


		<view class="button-box">
			<button type="default" class="button" @click="submit">提交</button>
		</view>


		<uni-popup ref="hospitalPop" type="bottom">
			<view class="popup-box flexc">
				<view class="flexc head">
					<view class="flex title-box"><text class="popup-title">选择医院</text>
						<image src="../../static/icon_close.png" style="width: 32rpx;height: 32rpx;"
							@click="closeOption(0)">
						</image>
					</view>
					<view class="search-box flex">
						<image src="../../static/icon/incon_search.png" class="search-icon" mode="widthFix"></image>
						<input type="text" v-model="hospitalParams.name" class="search-input" placeholder="搜索"
							maxlength="10" @input="inputChange(0,$event)" />
					</view>
				</view>
				<scroll-view scroll-y="true" style="max-height: 750rpx;"
					@scrolltolower="getHospitals(hospitalParams.pageNo+1)">
					<view v-for="(item,idex) in hospitalList" :class="{'option-item':true,selected:item.name==hospital}"
						@click="selectHospital(item)">
						<text>{{item.name}}</text>
					</view>
				</scroll-view>
			</view>
		</uni-popup>

		<uni-popup ref="departPop" type="bottom">
			<view class="popup-box flexc">
				<view class="flexc head">
					<view class="flex title-box"><text class="popup-title">选择科室</text>
						<image src="../../static/icon_close.png" style="width: 32rpx;height: 32rpx;"
							@click="closeOption(1)">
						</image>
					</view>
					<view class="search-box flex">
						<image src="../../static/icon/incon_search.png" class="search-icon" mode="widthFix"></image>
						<input type="text" v-model="departParams.value" class="search-input" placeholder="搜索"
							maxlength="10" @input="inputChange(1,$event)" />
					</view>
				</view>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view v-for="(item,idex) in departList"
						:class="{'option-item':true,selected:item.value==department}" @click="selectDepart(item)">
						<text>{{item.value}}</text>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		components: {

		},
		data() {
			return {
				name: '',
				position: '', //职称
				hospital: '',
				department: '', //科室
				mobile: '',
				code: '',
				bindSale: 1, //	绑定销售id
				isSend: false, // 是否发送验证码
				codetext: '获取验证码',
				commiting: false,
				departParams: {
					code: 'depart',
					value: ''
				},
				hospitalParams: {
					pageNo: 1,
					name: ''
				},
				hospitalInfo: {
					pageCount: 1,
				},
				hospitalList: [],
				departList: []
			}
		},
		onLoad(props) {
			this.bindSale = props.bindSale || 1;
			this.getHospitals(1)
			this.getOptionList()
		},
		onShow() {
			if (app.getCache('uid')) {
				this.loadUserAuth();
			}
		},
		methods: {
			openOption(depart) {
				if (depart == 1) {
					this.$refs.departPop.open()
				} else {
					this.$refs.hospitalPop.open()
				}
			},
			closeOption(depart) {
				if (depart == 1) {
					this.$refs.departPop.close()
				} else {
					this.$refs.hospitalPop.close()
				}
			},
			selectHospital(item) {
				this.hospital = item.name
				this.closeOption(0)
			},
			selectDepart(item) {
				this.department = item.value
				this.closeOption(1)
			},
			inputChange(depart) {
				if (depart == 1) {
					this.getOptionList()
				} else {
					this.getHospitals(1)
				}
			},
			loadUserAuth() {
				app.judgeUserAuth({}).then(res => {
					if (res.status == 1) {
						if (res.data.perfect1 == true) {
							uni.redirectTo({
								url: 'doctor-center'
							});
						}
					}
				});
			},
			submit() {
				if (!this.name ||
					!this.position ||
					!this.hospital ||
					!this.department ||
					!this.mobile ||
					!this.code) {
					app.tip('请输入完整信息');
					return;
				}
				if (this.commiting) return;
				this.commiting = true;
				app.loading("保存中");
				app.saveDoctorInfo({
					doctorName: this.name,
					technicalTitle: this.position,
					hospital: this.hospital,
					department: this.department,
					mobile: this.mobile,
					verifyCode: this.code,
					bindSale: this.bindSale
				}).then(res => {
					app.loaded();
					this.commiting = false;
					if (res.status == 1) {
						if(res.data.closeDoctorAccount){
							uni.redirectTo({
								url: 'doctor-center'
							});
						}else{
							uni.navigateTo({
								url: 'doctor-submit-result'
							});
						}
						
					}
				}).catch(res => {
					app.loaded();
					this.commiting = false;
				});
			},
			getCode() {
				if (this.isSend) return;
				if (!this.mobile) {
					app.tip('请输入手机号码');
					return;
				} else if (!/^1[0-9]{10}$/.test(this.mobile)) {
					app.tip('请填写正确的手机号码')
					return;
				}
				app.getCode({
					mobile: this.mobile
				}).then(res => {
					if (res.status == 1) {
						app.tip(res.msg);
						this.isSend = true
						let ss = 60
						this.codeTimer = setInterval(() => { // 倒计时
							if (ss <= 1) {
								this.codetext = '重新获取'
								this.isSend = false
								clearInterval(this.codeTimer)
								this.isSend = false
							} else {
								ss--
								this.codetext = ss + 's'
							}
						}, 1000)
					}
				});
			},
			getHospitals(pageNo = 1) {
				if (this.hospitalInfo.pageCount >= pageNo) {
					this.hospitalParams.pageNo = pageNo
					app.hospitalList(this.hospitalParams).then((res) => {
						this.hospitalInfo = res.data
						if (pageNo == 1) {
							this.hospitalList = res.data.list
						} else {
							if (this.hospitalInfo.pageCount >= pageNo) {
								this.hospitalList = this.hospitalList.concat(res.data.list)
							}
						}
					})
				}
			},
			getOptionList() {
				app.getOptionList(this.departParams).then((res) => {
					this.departList = res.data
				})
			}
		},

	}
</script>

<style lang="scss">
	.container {
		.popup-box {
			display: flex;
			flex-direction: column;
			background-color: #ffffff;
			border-radius: 16rpx 16rpx 0 0;
			padding-top: 32rpx;
			height: 720rpx;

			.head {
				.title-box {
					position: relative;
					justify-content: center;

					image {
						position: absolute;
						top: 0rpx;
						right: 40rpx;
					}
				}

				.popup-title {
					margin-bottom: 10rpx;
					font-size: 36rpx;
					color: #333333;
				}

				.search-box {
					background-color: #F7F7F7;
					border-radius: 38rpx;
					padding: 10rpx 24rpx;
					margin: 10rpx 32rpx;

					.search-icon {
						width: 32rpx;
						height: 32rpx;
						margin-right: 12rpx;
					}

					input {
						font-size: 32rpx;
						color: #333333;
						flex: 1;
					}
				}
			}

			.option-item {
				width: 100%;
				padding: 20rpx 0;
				font-size: 32rpx;
				color: #333333;
				text-align: center;
				border-bottom: 1rpx solid #eee;
			}

			.selected {
				background-color: #f7f7f7;
			}
		}

		.title {
			color: #333333;
			font-size: 34rpx;
			margin-left: 44rpx;
			margin-right: 44rpx;
			padding-top: 30rpx;
			padding-bottom: 30rpx;
		}

		.line-space {
			background-color: #F7F8F8;
			height: 20rpx;
		}

		.name-box {
			display: flex;
			margin-left: 43rpx;
			margin-right: 43rpx;
			height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;
			position: relative;
			align-items: center;

			.input-placeholder {
				color: #999999;
				font-size: 32rpx;
			}

			.empty {
				margin-left: 32rpx;
				font-size: 32rpx;
				color: #999999;
			}

			.no-empty {
				margin-left: 32rpx;
				font-size: 32rpx;
				color: #333333;
			}

			.name-tips {
				color: #333333;
				font-size: 32rpx;
				height: 100rpx;
				line-height: 100rpx;
			}

			.name-input {
				margin-left: 32rpx;
				color: #333333;
				font-size: 32rpx;
				height: 100rpx;
				flex: 1;
				line-height: 100rpx;
			}

			.code-button {
				position: absolute;
				color: #FFFFFF;
				background-color: #52A29E !important;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 13px;
				right: 10rpx;
				top: 20rpx;
			}
		}

		.button-box {
			// position: fixed;
			// bottom: 0;
			height: 140rpx;
			width: 100%;
			margin-top: 100rpx;

			.button {
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				width: 81%;
				background-color: #52A29E !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17px;
			}
		}

	}
</style>
