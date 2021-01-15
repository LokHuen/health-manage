<template>
	<view class="container">
		<view class="title-box">
			<view class="left">资源所在区域：</view>

			<picker mode="multiSelector" :range="areaList" :range-key="'name'" @columnchange="columnChange" @cancel="hideArea(1)"
			 @change="hideArea(0)" style="flex: 1;">
				<view class="right">
					{{(province&&city&&hasArea)?(province+city):'请选择地区'}}
				</view>
			</picker>
		</view>

		<view class="list-content" @click="selectType">
			报备类型
			<view :class="type==4?'list-content-right-novalue':'list-content-right'">{{type==0?'医院':(type==1?'科室':(type==2?'医生':'请选择'))}}</view>
		</view>

		<view class="list-content" v-if="type==0||type==1||type==2" @click="selectHospital">
			医院名称
			<view :class="chooseHospital.id?'list-content-right':'list-content-right-novalue'">{{chooseHospital.id?chooseHospital.name:'请选择'}}</view>
		</view>

		<view class="remind" v-if="errMsgInfo.isError==1 &&errMsgInfo.errorType==0">{{errMsgInfo.errMsg}}</view>

		<view class="list-content" v-if="type==1||type==2" @click="fetctOptionList">
			科室名称
			<view :class="Option.code?'list-content-right':'list-content-right-novalue'">{{Option.code?Option.value:'请选择'}}</view>
		</view>

		<view class="remind" v-if="errMsgInfo.isError==1 &&errMsgInfo.errorType==1">{{errMsgInfo.errMsg}}</view>

		<view class="list-content" v-if="type==2">
			医生名字
			<input type="text" class="list-content-input" placeholder="请填写" v-model="doctorName" @input="input" />
		</view>

		<view class="remind" v-if="errMsgInfo.isError==1 &&errMsgInfo.errorType==2">{{errMsgInfo.errMsg}}</view>

		<view class="list-content" v-if="type==0||type==1||type==2">
			备注内容
			<input type="text" class="list-content-input" placeholder="选填项" v-model="remark" />

		</view>
		<view class="button-box">
			<button type="default" class="button" @click="submit">提交</button>
		</view>

		<uni-popup ref="popup" type="bottom">
			<view class="popup-bg">
				<view style="height: 40rpx;"></view>
				<view class="popup-title">
					选择报备类别
					<image src="../../static/icon/close_new.png" mode="widthFix" class="popup-close" @click="close"></image>
				</view>
				<view style="height: 5rpx;"></view>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view class="sport-item" v-for="(item,index) in types" :key="index" @click="selectsportType(index)">
						{{item}}
					</view>
				</scroll-view>
				<view style="height: 20rpx;"></view>
			</view>
		</uni-popup>

		<uni-popup ref="sucesPpopup" type="center">
			<view class="suc-popup-bg">
				<image src="../../static/end.png" class="suc-img"></image>
				<view class="suc-title">报备成功</view>
				<view class="btn-box">
					<view class="btn" @click="close">
						关闭
					</view>
					<view style="width: 30rpx;"></view>
					<view class="btn" @click="contentin">
						继续添加
					</view>
				</view>
			</view>
		</uni-popup>

		<uni-popup ref="hospitalPop" type="bottom" @change="hospitalPopChange">
			<view class="i-sex-content">
				<text class="i-sex-title">医院选择</text>
				<view class="search-box">
					<image src="../../static/icon/incon_search.png" class="search-icon" mode="widthFix"></image>
					<input type="text" v-model="searchHospital" class="search-input" placeholder="搜索" maxlength="10" @input="searchHospitalChange" />
				</view>
				<view style="height: 20rpx;"></view>
				<scroll-view scroll-y="true" style="height: 750rpx;" @scrolltolower="loadmore">
					<view>
						<view v-for="(item,index) in hospitalItems" :key="index" :class="chooseHospital.id==item.id?'i-sex-item line active':'i-sex-item line'"
						 @click="selectHospitalItem(item)">{{item.name}}</view>
					</view>
				</scroll-view>

			</view>
		</uni-popup>

		<uni-popup ref="optionPop" type="bottom" @change="optionPopChange">
			<view class="i-sex-content">
				<text class="i-sex-title">科室选择</text>
				<view class="search-box">
					<image src="../../static/icon/incon_search.png" class="search-icon" mode="widthFix"></image>
					<input type="text" v-model="searchOption" class="search-input" placeholder="搜索" maxlength="10" @input="searchOptionChange" />
				</view>
				<view style="height: 20rpx;"></view>
				<scroll-view scroll-y="true" style="height: 750rpx;">
					<view>
						<view v-for="(item,index) in OptionList" :key="index" :class="Option.code==item.code?'i-sex-item line active':'i-sex-item line'"
						 @click="selectOptionItem(item)">{{item.value}}</view>
					</view>
				</scroll-view>

			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	import http from '../../common/http.js'
	export default {

		data() {
			return {
				searchHospital: '',
				searchOption: '',
				types: ['医院', '科室', '医生'],
				type: 4,
				hasArea: false,
				cityId: '',
				city: '',
				provinceId: '',
				province: '',
				areaList: [
					[],
					[]
				],
				hospitalItems: [],
				chooseHospital: {},
				OptionList: [],
				Option: {},
				doctorName: '',
				remark: '',
				errMsgInfo: {
					errMsg: '',
					isError: 0,
					errorType: 4
				},
				dpageno: 1,
			}
		},
		onLoad(props) {

			http.get(http.urls.get_all_province).then((res) => {
				this.areaList[0] = res.data;
				if (this.areaList[0] && this.areaList[0].length > 0) {
					let obj = this.areaList[0][0];
					this.province = obj.name
					this.provinceId = obj.id
					http.get(http.urls.get_citys, {
						id: obj.id
					}).then((res) => {
						this.areaList[1] = res.data
						if (this.areaList[1] && this.areaList[1].length > 0) {
							let obj2 = this.areaList[1][0];
							this.city = obj2.name
							this.cityId = obj2.id

						}
						this.$forceUpdate();
					})
				}
			})


		},
		onShow() {

		},
		methods: {
			loadmore() {
				this.dpageno++;
				this.fetchHospitalList(this.dpageno);
			},
			hospitalPopChange(e) {
				if (e.show == false) {
					this.searchHospital = '';
				}
			},
			optionPopChange(e) {
				if (e.show == false) {
					this.searchOption = '';
				}
			},
			searchHospitalChange(e) {
				this.fetchHospitalList();
			},
			searchOptionChange(e) {
				this.fetctOptionList();
			},
			input() {
				this.errMsgInfo.isError = 0;
			},
			selectType() {
				if (!this.hasArea) {
					app.tip('请选择地区')
					return
				}
				this.$refs.popup.open();
			},
			selectsportType(index) {
				if (index == 0) {
					this.doctorName = '';
					this.Option = {};
				}
				if (index == 1) {
					this.doctorName = '';
				}
				this.type = index;
				this.$refs.popup.close();
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
							this.chooseHospital = {};
						}
						this.$forceUpdate();
					})
				} else if (column == 1) {
					this.city = obj.name
					this.cityId = obj.id
					this.chooseHospital = {};
				}
			},
			submit() {
				if (!this.hasArea) {
					app.tip('请先填好报备资料');
					return;
				}
				if (this.type == 4) {
					app.tip('请先填好报备资料');
					return;
				}

				if (this.type == 0) {
					if (!this.chooseHospital.id) {
						app.tip('请先填好报备资料');
						return;
					}
				}
				if (this.type == 1) {
					if (!this.chooseHospital.id || !this.Option.code) {
						app.tip('请先填好报备资料');
						return;
					}
				}
				if (this.type == 2) {
					if (!this.chooseHospital.id || !this.Option.code || !this.doctorName) {
						app.tip('请先填好报备资料');
						return;
					}
				}
				let data = {
					hospitalId: this.chooseHospital.id,
					provinceId: this.provinceId,
					cityId: this.cityId,
					area: this.province + this.city,
					type: this.type + 1
				}
				if (this.remark) {
					data = {
						...data,
						remark: this.remark
					}
				}
				if (this.type == 1) {
					data = {
						...data,
						departId: this.Option.code,
					}
				}
				if (this.type == 2) {
					data = {
						...data,
						departId: this.Option.code,
						doctorName: this.doctorName,
					}
				}
				app.saveResource(
					data
				).then(res => {
					if (res.status == 1) {
						this.$refs.sucesPpopup.open();
					} else if (res.status == -103) {
						if (this.type == 0) {
							this.errMsgInfo.errMsg = '该医院已存在报备记录'
						} else if (this.type == 1) {
							this.errMsgInfo.errMsg = '该科室已存在报备记录'
						} else {
							this.errMsgInfo.errMsg = '该医生已存在报备记录'
						}
						this.errMsgInfo.isError = 1;
						this.errMsgInfo.errorType = this.type;
					}
				})


			},
			close() {
				uni.navigateBack({

				})

			},
			contentin() {
				this.remark = '';
				this.doctorName = '';
				this.Option = {};
				this.chooseHospital = {};
				this.$refs.sucesPpopup.close();

			},
			selectHospital() {
				if (!this.hasArea) {
					app.tip('请选择地区');
					return;
				}
				this.fetchHospitalList();
			},
			fetchHospitalList(page=1) {
				app.hospitalList({
					provinceId: this.provinceId,
					cityId: this.cityId,
					name: this.searchHospital,
					pageNo: page,
				}).then(res => {
					if (res.status == 1) {
						if (page > res.data.pageCount) return;
						this.hospitalItems = page == 1 ? res.data.list : this.hospitalItems.concat(res.data.list);
						this.$refs.hospitalPop.open();
						this.errMsgInfo.isError = 0;
					}

				})
			},
			selectHospitalItem(item) {
				this.chooseHospital = item;
				this.$refs.hospitalPop.close();
			},
			fetctOptionList() {
				if (!this.chooseHospital.id) {
					app.tip('请先选择医院');
					return;
				}
				app.getOptionList({
					code: 'depart',
					value: this.searchOption
				}).then(res => {
					if (res.status == 1) {
						this.OptionList = res.data;
						this.$refs.optionPop.open();
						this.errMsgInfo.isError = 0;
					}
				});
			},
			selectOptionItem(item) {
				this.Option = item;
				this.$refs.optionPop.close();
			}

		},

	}
</script>

<style lang="scss">
	.container {
		height: 100vh;
		background-color: #F5F6F6;
		overflow-y: auto;

		.title-box {
			margin-top: 30rpx;
			margin-left: 30rpx;
			font-size: 26rpx;
			display: flex;

			.left {
				color: #333333;
			}

			.right {
				color: #4B8BE8;
			}

			.sex-value {
				padding-right: 0;
				color: #999999;
				font-size: 15px;
				flex: 1;
				height: 100rpx;
				line-height: 100rpx;
				// border: 1rpx solid #007AFF;
			}

			.has-value {
				padding-right: 0;
				color: #333333;
				font-size: 30rpx;
				height: 100rpx;
				line-height: 100rpx;
				// border: 1rpx solid #4CD964;
			}
		}

		.list-content {
			margin-top: 20rpx;
			padding-left: 30rpx;
			height: 90rpx;
			line-height: 90rpx;
			position: relative;
			background-color: #FFFFFF;
			font-size: 28rpx;
			color: #333333;

			.list-content-right {
				position: absolute;
				color: #333333;
				right: 30rpx;
				top: 0;
			}

			.list-content-right-novalue {
				position: absolute;
				color: #999999;
				right: 30rpx;
				top: 0;
			}

			.list-content-input {
				position: absolute;
				color: #333333;
				right: 30rpx;
				top: 26rpx;
				text-align: right;
				font-size: 28rpx;
				width: 500rpx;
			}
		}

		.remind {
			font-size: 26rpx;
			margin-top: 10rpx;
			margin-left: 30rpx;
			color: #E21414;
		}

		.button-box {
			//position: fixed;
			margin-top: 100rpx;
			bottom: 0;
			height: 140rpx;
			width: 100%;

			.button {
				height: 90rpx;
				line-height: 90rpx;
				width: 81%;
				background-color: #4B8BE8 !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17px;
			}
		}

		.popup-bg {
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 0px 0px;

			.popup-title {
				height: 50rpx;
				font-size: 30rpx;
				color: #707578;
				text-align: center;
				position: relative;

				.popup-close {
					position: absolute;
					width: 36rpx;
					height: 36rpx;
					//background-color: #343434;
					right: 30rpx;
				}
			}

			.sport-item {
				font-size: 30rpx;
				margin-left: 30rpx;
				margin-right: 30rpx;
				color: #272727;
				text-align: center;
				height: 96rpx;
				line-height: 96rpx;
				border-bottom: 1rpx solid #CFCFCF;
			}
		}

		.suc-popup-bg {
			background-color: #FFFFFF;
			border: 10rpx;
			height: 450rpx;
			width: 500rpx;

			.suc-img {
				width: 150rpx;
				height: 150rpx;
				margin-top: 40rpx;
				margin-left: 175rpx;
			}

			.suc-title {
				text-align: center;
				margin-top: 20rpx;
				color: #333333;
			}

			.btn-box {
				margin-top: 30rpx;
				margin-left: 30rpx;
				margin-right: 30rpx;
				display: flex;
				height: 70rpx;
				line-height: 70rpx;

				.btn {
					border: 2rpx solid #666666;
					width: 200rpx;
					text-align: center;
					color: #666666;
				}
			}
		}


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

		.search-box {
			margin-left: 0rpx;
			margin-right: 0rpx;
			height: 78rpx;
			background-color: #F7F7F7;
			border-radius: 39rpx;
			display: flex;
			align-items: center;
			width: 85%;

			.search-icon {
				margin-left: 20rpx;
				height: 42rpx;
				width: 42rpx;
			}

			.search-input {
				margin-left: 0rpx;
				height: 78rpx;
				line-height: 78rpx;
				margin-right: 0rpx;
				flex: 1;
			}
		}

	}
</style>
