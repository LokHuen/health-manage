<template>
	<view class="container">
		<view class="line-space"></view>
		<view class="name-box">
			<view class="name-tips">* 住院号</view>
			<input class="name-input" type="text" value="" placeholder="请填写住院号" v-model="info.inHospitalNo" />
		</view>
		<view class="name-box">
			<view class="name-tips">* 姓名</view>
			<input class="name-input" type="text" value="" placeholder="请填写真实名字" v-model="info.patientName" />
		</view>
		<view class="sex-box" @click="selectSex(0)">
			<view class="sex-tips">* 性别</view>
			<view :class="info.patientGender==0?'sex-value':'has-value'">{{!info.patientGender?'点击选择':info.patientGender==1?'男':'女'}}</view>
		</view>
		<view class="sex-box">
			<view class="sex-tips">* 年龄</view>
			<picker @change="bindDateChange" :value="birthday" :range="array" style="flex: 1;">
				<view :class="info.age?'has-value':'sex-value'">{{info.age?info.age:'点击选择'}}</view>
			</picker>
		</view>

		<view class="name-box">
			<view class="name-tips">* 病区</view>
			<input class="name-input" type="text" value="" placeholder="请填写病区" v-model="info.icu" />
		</view>

		<view class="name-box">
			<view class="name-tips">* 床号</view>
			<input class="name-input" type="text" value="" placeholder="请填写床位号" v-model="info.bedNo" />
		</view>


		<view class="button-box">
			<button type="default" class="button" @click="submit">下一页</button>
		</view>

		<view style="height: 100rpx;"></view>

		<uni-popup ref="sexPop" type="bottom">
			<view class="i-sex-content">
				<text class="i-sex-title">性别选择</text>
				<text :class="info.patientGender==1?'i-sex-item line active':'i-sex-item line'" @click="selectSex(1)">男</text>
				<text :class="info.patientGender==2?'i-sex-item active':'i-sex-item'" @click="selectSex(2)">女</text>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	import http from '../../../common/http.js'
	export default {
		data() {
			return {
				surveyId: "",
				info: {
					"patientName": "", // "病患姓名",
					"patientGender": "", // "病患性别（1：男 2：女）",
					"age": "", // "病患年龄",
					"inHospitalNo": "", // "住院号",
					"icu": "", // "病区",
					"bedNo": "", // "床号"
				},
				patientName: '',
				patientGender: 0,
				array: [],
				birthday: -1,

				type: 1, //1表示点击更新信息进来，2表示用户未填写信息系统自动跳进来的


				formQrCode: '', //1表示患者扫描医生二维码后，点击公众号消息进入信息完善页 2从基础信息进入
				selfTest: '', //1表示从评估页面进来，完善信息后直接返回评估页面
				option:{},
			}
		},
		onLoad(props) {
			this.option = props||this.option;
			if (!app.getCache("uid")) return;
			this.type = props.type || 1;
			this.formQrCode = props.formQrCode || 1;
			this.selfTest = props.selfTest || 0;
			let num = [];
			for (var i = 1; i < 130; i++) {
				num.push(i);
			}
			this.array = num;
			this.getInfo();
		},
		computed: {
			startDate() {
				return this.getDate('start');
			},
			endDate() {
				return this.getDate('end');
			}
		},
		onShow() {
			if (!app.getCache("uid")) return;

		},
		methods: {
			selectmicResult(item) {
				this.illness = item;
				this.$refs.resultPop.close();
			},
			openSelectResult() {
				this.$refs.resultPop.open();
			},

			//单选
			openSingleChose(index) {
				this.currentProject = this.projectList[index];
				this.currentIndex = index;
				this.$refs.singleChoosePop.open();
			},
			selectSingle(index) {
				for (var i = 0; i < this.currentProject.detailList.length; i++) {
					var detail = this.currentProject.detailList[i];
					if (index == i) {
						detail.choose = 1;
						this.currentProject.choseContent = detail.content;
						this.currentProject.choseId = detail.id;
					} else {
						detail.choose = 0;
					}
					this.currentProject.detailList[i] = detail;
				}
				this.projectList[this.currentIndex] = this.currentProject;
				this.$refs.singleChoosePop.close();
			},
			//多选
			multipleChose(index) {
				this.currentProject = this.projectList[index];
				this.currentIndex = index;
				this.$refs.multipleChoosePop.open();
			},
			selectMultiple(index) {
				var detail = this.currentProject.detailList[index];
				if (detail.choose == 1) {
					detail.choose = 0;
				} else {
					detail.choose = 1
				}
				this.currentProject.detailList[index] = detail;
				this.projectList[this.currentIndex] = this.currentProject;

				for (var i = 0; i < this.projectList.length; i++) {
					var project = this.projectList[i];
					if (project.type == 3) {
						//多选
						var ids = [];
						var contents = [];
						var choseContent = '';
						for (var j = 0; j < project.detailList.length; j++) {
							if (project.detailList[j].choose == 1) {
								ids.push(project.detailList[j].id);
								contents.push(project.detailList[j].content);
								choseContent = choseContent + project.detailList[j].content + ','
							}
						}
						choseContent = choseContent.substring(0, choseContent.length - 1);
						project.ids = ids;
						project.contents = contents;
						project.choseContent = choseContent;
					}
					this.projectList[i] = project;
				}

			},
			sure() {
				this.$refs.multipleChoosePop.close();
			},
			disagree() {
				// uni.redirectTo({
				// 	url:'patient-nutrition-manage'
				// });
				app.tip('很抱歉，暂时无法为您提供服务，请关闭页面');
			},
			agree() {
				this.$refs.tipPopup.close();
			},
			showTipPopup() {
				this.$refs.tipPopup.open();
			},
			getIllnessList() {
				app.getIllnessSetting().then(res => {
					if (res.status == 1) {
						let hasother = false;
						for (let i = 0; i < res.data.illness.length; i++) {
							if (res.data.illness[i] == "其它疾病") hasother = true;
						}
						if (!hasother) res.data.illness.push("其它疾病");
						this.inllList = res.data.illness;
					}
				});
			},
			getInfo() {
				app.screeninroScreen({}).then(res => {
					if (res.data) {
						Object.assign(this.info,res.data);
						// this.info = res.data;
					}
				})
			},
			getInfo1() {
				app.patientBasicInfo({}).then(res => {
					if (res.status == 1) {
						if (res.data) {
							this.infoData = res.data;
							this.patientName = this.infoData.patientName;
							this.phone = this.infoData.phone;
							this.patientGender = this.infoData.patientGender ? (this.infoData.patientGender == '男' ? 1 : 2) : 0;
							this.cityId = this.infoData.cityId;
							this.provinceId = this.infoData.provinceId;
							this.illness = this.infoData.illness;
							this.height = this.infoData.height;
							this.weight = this.infoData.weight;
							if (this.infoData.birthday) {
								var year = this.infoData.birthday.split('年')[0];
								var month = this.infoData.birthday.split('年')[1].split('月')[0];
								var day = this.infoData.birthday.split('年')[1].split('月')[1].split('日')[0];
								this.birthday = year + '-' + month + '-' + day;
							}
						} else {
							this.showTipPopup();
						}

						this.projectList = res.data.projectList;
						if (this.projectList) {
							for (var i = 0; i < this.projectList.length; i++) {
								var project = this.projectList[i];
								if (project.type == 2) {
									//单选
									for (var j = 0; j < project.detailList.length; j++) {
										if (project.detailList[j].choose == 1) {
											project.choseId = project.detailList[j].id;
											project.choseContent = project.detailList[j].content;
										}
									}
								} else if (project.type == 3) {
									//多选
									var ids = [];
									var contents = [];
									var choseContent = '';
									for (var j = 0; j < project.detailList.length; j++) {
										if (project.detailList[j].choose == 1) {
											ids.push(project.detailList[j].id);
											contents.push(project.detailList[j].content);
											choseContent = choseContent + project.detailList[j].content + ','
										}
									}
									choseContent = choseContent.substring(0, choseContent.length - 1);
									project.ids = ids;
									project.contents = contents;
									project.choseContent = choseContent;
								}
								this.projectList[i] = project;
							}
						}

					}
				});
			},
			hideArea(cancel) {
				if (cancel) {} else {
					this.hasArea = true
				}
			},
			columnChange(e) {
				let column = e.detail.column
				let value = e.detail.value
				let obj = this.areaList[column][value]
				if (column == 0) {
					this.province = obj.name
					this.provinceId = obj.id
					http.get(http.urls.get_citys, {
						id: this.provinceId
					}).then((res) => {
						this.areaList[1] = res.data
						if (this.areaList[1] && this.areaList[1].length > 0) {
							let obj2 = this.areaList[1][0];
							this.city = obj2.name
							this.cityId = obj2.id
						}
						this.$forceUpdate();
					})
				} else if (column == 1) {
					this.city = obj.name
					this.cityId = obj.id
				}
			},
			bindDateChange(e) {
				this.birthday = e.target.value
				this.info.age = this.array[e.target.value];
			},
			getDate(type) {
				const date = new Date();
				let year = date.getFullYear();
				let month = date.getMonth() + 1;
				let day = date.getDate();

				if (type === 'start') {
					year = year - 150;
				} else if (type === 'end') {
					year = year;
				}
				month = month > 9 ? month : '0' + month;;
				day = day > 9 ? day : '0' + day;
				return `${year}-${month}-${day}`;
			},
			previewImage(index) {
				uni.previewImage({
					urls: this.imgList,
					current: index
				})
			},
			remove(index) {
				this.imgList.splice(index, 1);
			},
			choseImg() {
				if (this.imgList.length > 8) {
					app.tip('最多选取9张图片');
					return;
				}
				uni.chooseImage({
					count: 9 - this.imgList.length, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					// sourceType: ['album'], //从相册选择
					success: (res) => {
						this.imgList = this.imgList.concat(res.tempFilePaths);
					}
				});
			},
			submit() {
				if (!this.info.patientName||!this.info.age) {
					app.tip('请输入完整信息');
					return;
				}

				this.submitRequest();
			},
			uploadImg() {
				let uploadCount = 0;
				for (let i = 0; i < this.imgList.length; i++) {
					let formData = {
						'uid': uni.getStorageSync("uid")
					}
					uni.uploadFile({
						url: '/api' + '/wx/patient/bl/uploadPicture',
						filePath: this.imgList[i],
						name: 'file',
						formData: formData,
						success: (res) => {
							console.log(res.data);
							let data = JSON.parse(res.data);
							if (data.status == 1) {
								uploadCount++;
								this.pathologyUrl = this.pathologyUrl + data.data.pictureUrl + ',';
								console.log('uploadCount==' + uploadCount);
								if (uploadCount == this.imgList.length) {
									//移除最后的逗号
									this.pathologyUrl = this.pathologyUrl.substring(0, this.pathologyUrl.length - 1);
									this.submitRequest();
								}
							}

						},
					});
				}
			},
			submitRequest() {
				// return;
				app.loading("保存中");
				var data = JSON.parse(JSON.stringify(this.info));
				delete data.id;
				app.screensave(data).then(res => {
					app.getReplyRecord({surveyId:this.option.id,phase:"筛选"}).then(resq=>{
						app.loaded();
						uni.navigateTo({
							url:"/pages/patient/test-questions?id="+this.option.id
						})
					})
					// uni.navigateTo({
					// 	url: "/pages/doctor/select/result?id="+this.option.id
					// })
				});

			},
			selectSex(type) {
				if (type == 0) {
					this.$refs.sexPop.open();
				} else {
					this.info.patientGender = type;
					this.$refs.sexPop.close();
				}
			},

		},

	}
</script>

<style lang="scss" scoped>
	.i-sex-content {
		display: flex;
		flex-direction: column;
		background-color: #FFFFFF;
		align-items: center;
		padding-top: 30rpx;
		border-radius: 20rpx 20rpx 0rpx 0rpx;

		.i-sex-title {
			color: #272727;
			font-size: 32rpx;
			font-weight: bold;
			text-align: center;
			padding-bottom: 20rpx;

		}

		.i-sex-title1 {
			color: #272727;
			font-size: 32rpx;
			//font-weight: bold;
			text-align: center;
			padding-bottom: 20rpx;
			width: 100%;
			position: relative;

			.i-sex-title-close {
				position: absolute;
				left: 40rpx;
				top: -10rpx;
				font-size: 26rpx;
				color: #999999;
			}

			.i-sex-title-sure {
				position: absolute;
				right: 40rpx;
				top: -10rpx;
				font-size: 26rpx;
				color: #333333;
			}
		}

		.i-sex-item {
			color: #272727;
			font-size: 32rpx;
			padding: 20rpx;
			text-align: center;
			position: relative;

			.img {
				position: absolute;
				width: 26rpx;
				height: 26rpx;
				right: 80rpx;
				top: 30rpx;
			}
		}

		.line {
			border-bottom: 1rpx solid #DDDDDD;
		}

		.active {
			background-color: #F7F7F7;
		}
	}

	.i-picker-container {
		background-color: #FFFFFF;

		.uni-padding-wrap {
			display: flex;
			justify-content: space-between;
			padding: 15rpx 30rpx;
			border-bottom: 1rpx solid #cfcfcf;
			color: #52A29E;
			font-size: 32rpx;
		}

		.i-picker-content {
			height: 450rpx;
			text-align: center;
		}
	}

	.imagelist {
		width: 175rpx;
		height: 175rpx;
		margin-top: 12.5rpx;
		margin-left: 12.5rpx;
		background-color: #D2D2D2;
	}

	.remove-icon {
		position: absolute;
		width: 25rpx;
		height: 25rpx;
		right: 0;
		top: 0;
	}

	.container {
		.title {
			color: #333333;
			font-size: 30rpx;
			margin-left: 44rpx;
			margin-right: 44rpx;
			padding-top: 40rpx;
			padding-bottom: 40rpx;
		}

		.line-space {
			background-color: #F7F8F8;
			height: 20rpx;
		}

		.name-box {
			display: flex;
			margin-left: 43rpx;
			margin-right: 43rpx;
			flex-wrap: wrap;
			// height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;
			position: relative;

			.name-tips {
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				min-width: 130rpx;
			}

			.name-input {
				flex: 1;
				margin-left: 30rpx;
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
			}

			.name-novalue-input {
				margin-left: 30rpx;
				color: #b2b2b2;
				font-size: 15px;
				height: 100rpx;
				line-height: 100rpx;
			}



			.right-tip {
				position: absolute;
				color: #333333;
				font-size: 30rpx;
				right: 0;
				top: 30rpx;
			}
		}

		.sex-box {
			display: flex;
			margin-left: 43rpx;
			margin-right: 43rpx;
			height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;

			.sex-tips {
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				min-width: 130rpx;
			}

			.sex-value {
				margin-left: 30rpx;
				padding-right: 0;
				color: #999999;
				font-size: 15px;
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;
				// border: 1rpx solid #007AFF;
			}

			.has-value {
				margin-left: 30rpx;
				padding-right: 0;
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				// border: 1rpx solid #4CD964;
			}
		}

		.pic-title {
			color: #333333;
			font-size: 30rpx;
			padding-left: 43rpx;
			padding-top: 30rpx;
		}

		.pic-tip {
			font-size: 28rpx;
			color: #999999;
			padding-top: 20rpx;
			padding-left: 40rpx;
			padding-right: 40rpx;
		}

		.pic-content-box {
			.ccimglist {
				display: flex;
				flex-wrap: wrap;
				// justify-content:space-between;
				margin-left: 44rpx;
				margin-right: 44rpx;

				.img-box-first {
					margin-top: 5rpx;
					width: 200rpx;
					height: 200rpx;
					position: relative;
				}

				.img-box {
					margin-top: 5rpx;
					width: 200rpx;
					height: 200rpx;
					margin-left: 31rpx;
					position: relative;
				}

			}

		}

		.upload-box {
			margin-top: 40rpx;
			margin-left: 44rpx;
			height: 60rpx;
			width: 210rpx;
			color: #59A29F;
			border: 2rpx solid #52A29E;
			text-align: center;
			line-height: 60rpx;
		}

		.button-box {
			margin-top: 100px;
			height: 140rpx;
			width: 100%;

			.button {
				height: 90rpx;
				line-height: 90rpx;
				width: 81%;
				background-color: #52A29E !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 34rpx;
			}
		}

		.popup-content {
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;
			font-size: 26rpx;

			.tips-title {
				margin-top: 60rpx;
				text-align: center;
				font-size: 34rpx;
				color: #333333;
			}

			.tips-common {
				margin-left: 50rpx;
				margin-right: 50rpx;
				color: #666666;
			}

			.tips-remind {
				margin-left: 50rpx;
				margin-right: 50rpx;
				color: #EA132D;
			}

			.agree-btn {
				text-align: center;
				background-color: #59A29F;
				color: #FFFFFF;
				font-size: 30rpx;
				height: 90rpx;
				line-height: 90rpx;
				margin-top: 20rpx;
				margin-left: 50rpx;
				margin-right: 50rpx;
			}

			.disagree-btn {
				text-align: center;
				background-color: #999999;
				color: #FFFFFF;
				font-size: 30rpx;
				height: 90rpx;
				line-height: 90rpx;
				margin-top: 30rpx;
				margin-left: 50rpx;
				margin-right: 50rpx;

			}
		}
	}

	.otherinput {
		width: 400rpx;
		flex: unset !important;
	}
</style>
