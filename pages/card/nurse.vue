<template>
	<view class="container">
		<turnback></turnback>
		<view class="headtips">
			请填写护士资料
		</view>
		<view class="name-box">
			<view class="name-tips">护士名字：</view>
			<input class="name-input" type="text" value="" placeholder="请填写" v-model="nurseName" />
		</view>

		<view class="name-box">
			<view class="name-tips">所在医院：</view>
			<!-- <input class="name-input" type="text" value="" placeholder="请填写医院名称" v-model="hospital" /> -->
			<text @click="openOption(0)" style="flex: 1;" :class="{empty:!hospital,'no-empty':hospital}">{{hospital?hospital:'请选择医院'}}</text>
		</view>

		<view class="name-box">
			<view class="name-tips">所在科室：</view>
			<!-- <input class="name-input" type="text" value="" placeholder="请填写科室名称" v-model="department" /> -->
			<text @click="openOption(1)" style="flex: 1;" :class="{empty:!department,'no-empty':department}" >{{department?departmentname:'请选择科室'}}</text>
		</view>
		

		<view class="button-box">
			<button type="default" class="button" @click="submit">确认无误</button>
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
							maxlength="30" @input="inputChange(0,$event)" />
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
							maxlength="30" @input="inputChange(1,$event)" />
					</view>
				</view>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view v-for="(item,idex) in departList" :class="{'option-item':true,selected:item.value==department}" @click="selectDepart(item)">
						<text>{{item.value}}</text>
					</view>
				</scroll-view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	import turnback from "../../components/turnback.vue"
	export default {
		components: {
			turnback
		},
		data() {
			return {
				nurseName: '',
				position: '', //职称
				hospital: '',
				hospitalId: '',
				hospitalCode:"",
				departmentname: '',
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
				this.hospital = `${item.name}（${item.hospitalCode}）`;
				this.hospitalCode = item.hospitalCode;
				if(!item.hospitalCode) this.hospitalCode = ""
				this.hospitalId = item.id;
				this.closeOption(0)
			},
			selectDepart(item) {
				this.departmentname = `${item.value}（${item.code}）`;
				this.department = item.value;
				this.closeOption(1)
			},
			inputChange(depart) {
				if (depart == 1) {
					this.getOptionList()
				} else {
					this.getHospitals(1)
				}
			},
			submit() {
				if (!this.nurseName ||
					!this.hospitalId ||
					!this.department) {
					app.tip('请输入完整信息');
					return;
				}
				if(!this.hospitalCode){
					app.tip('该医院暂无编码，请选择其他医院');
					return;
				}
				if (this.commiting) return;
				this.commiting = true;
				
				app.loading("保存中");
				app.cardapplysave({
					templateId:app.cardinfo.templateId,
					templateCode:app.cardinfo.templateCode,//模版编码
					cardType:app.cardinfo.cardType,//卡片用户类型 1 医生 2护士 3 业务员
					userName: this.nurseName,
					userHospitalId: this.hospitalId,
					userDepartment: this.department,
				}).then(res => {
					app.loaded();
					this.commiting = false;
					let data = {
						...app.cardinfo,
						userName:this.nurseName,
						userDepartment:this.department,
						userHospitalId:this.hospitalId,
						hospital:this.hospital,
					};
					app.cardinfo = data;
					if (res.status == 1) {
						uni.navigateTo({
							url: '/pages/card/create?mid='+res.data.makeId
						});
					}
				}).catch(res => {
					app.tip("保存失败");
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

<style lang="scss" scoped>
	.mintips{font-size: 26rpx;color: #333333;padding: 30rpx 34rpx 20rpx;}
	.headtips{
		padding:34rpx 0 34rpx 34rpx;font-size: 32rpx;color: #333333;
		.mini{font-size: 26rpx;color: #999999;padding-top:16rpx;}
	}
	page{background:#F7F8F8;}
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
			padding:30rpx;
			border-radius: 10rpx;
			height: 100rpx;background:#fff;box-sizing: border-box;
			position: relative;margin:0 34rpx 16rpx;
			align-items: center;

			.input-placeholder {
				color: #999999;
				font-size: 32rpx;
			}

			.empty {
				// margin-left: 32rpx;
				font-size: 32rpx;
				color: #999999;
			}

			.no-empty {
				// margin-left: 32rpx;
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
				// margin-left: 32rpx;
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
			margin-top: 150rpx;

			.button {
				height: 90rpx;
				line-height: 90rpx;
				text-align: center;
				width: 81%;
				background-color: #4789EB !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17px;
			}
		}

	}
</style>
