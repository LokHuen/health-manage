<template>
	<view class="flexc container">
		<view class="flex search-box" @click="toSearch">
			<image src="../../static/icon/incon_search.png"></image>
			<text>请输入患者昵称或名字搜索</text>
		</view>
		<view class="flexc filter-box">
			<view class="flexc filter-list" v-if="filter">
				<view class="flex filter-item" @click="byDoctor(-1)" v-if="hasPermission">
					<text>{{paramTexts.bindDoctor?'paramTexts.bindDoctor':'按患者所属的医生筛选'}}</text>
					<image src="../../static/icon/right_arrow.png"></image>
				</view>
				<view class="flex filter-item" @click="byIlls(-1)">
					<text>{{params.illness?params.illness:'按病种筛选'}}</text>
					<image src="../../static/icon/right_arrow.png"></image>
				</view>
				<view class="flex filter-item" @click="byNutrition(-1)">
					<text>{{paramTexts.surveyResult?paramTexts.surveyResult:'按营养状况筛选'}}</text>
					<image src="../../static/icon/right_arrow.png"></image>
				</view>
				<view class="flex filter-item" @click="byIntervene(-1)">
					<text>{{paramTexts.isBuy?paramTexts.isBuy:'按营养干预情况筛选'}}</text>
					<image src="../../static/icon/right_arrow.png"></image>
				</view>
				<view class="flex filter-item" style="border: none;" @click="byTime(-1)">
					<text>{{params.orderBy==1?'按患者加入时间排序':'按患者和医生绑定的时间排序'}}</text>
					<image src="../../static/icon/right_arrow.png"></image>
				</view>
				<text class="close-filter" @click="filter=false">关闭</text>
			</view>
			<view class="flex toggle" @click="filter=!filter">
				<text>{{filter?'收起筛选条件':'展开筛选条件'}}</text>
				<image :src="filter?'../../static/icon/right_arrow_top.png':'../../static/icon/right_arrow.png'">
				</image>
			</view>
		</view>
		<view class="flexc list" v-if="list.length>0">
			<view class="flexc item" v-for="(item,index) in list">
				<view class="flex" style="align-items: flex-start;">
					<image class="avator" :src="item.portrait"></image>
					<view class="flexc">
						<text class="name">{{item.patientName}}</text>
						<text class="text">{{item.illness}} {{item.surveyResult}} {{item.isBuy}}</text>
						<text class="join-time" @click="getDepartmentAllIlls">加入时间：{{item.createTime}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="nodata flex" style="padding-top: 100rpx; color: #999999; justify-content: center;font-size: 30rpx;"
			v-if="list.length==0">
			<text>没找到相关数据</text>
		</view>

		<!-- 按医生 -->
		<uni-popup ref="doctor_pop" type="bottom">
			<view class="pop-container">
				<view class="pop-item" @click="byDoctor(item.id,item.doctorName)" v-for="(item,index) in doctorList">
					{{item.doctorName}}
				</view>
				<view class="pop-item" @click="byDoctor(-2)" style="border: none;">取消</view>
			</view>
		</uni-popup>

		<!-- 按病种 -->
		<uni-popup ref="ills_pop" type="bottom">
			<view class="pop-container">
				<view class="pop-item" @click="byIlls(item.illness)" v-for="(item,index) in ills">{{item.illness}}
				</view>
				<view class="pop-item" @click="byIlls(-2)" style="border: none;">取消</view>
			</view>
		</uni-popup>

		<!-- 按营养状况 -->
		<uni-popup ref="nutrition_pop" type="bottom">
			<view class="pop-container">
				<view class="pop-item" @click="byNutrition(item.value,item.text)" v-for="(item,index) in nuritions">
					{{item.text}}
				</view>
				<view class="pop-item" @click="byNutrition(-2)" style="border: none;">取消</view>
			</view>
		</uni-popup>

		<!-- 按营养干预情况 -->
		<uni-popup ref="intervene_pop" type="bottom">
			<view class="pop-container">
				<view class="pop-item" @click="byIntervene(item.value,item.text)" v-for="(item,index) in intervenes">
					{{item.text}}
				</view>
				<view class="pop-item" @click="byIntervene(-2)" style="border: none;">取消</view>
			</view>
		</uni-popup>

		<!-- 按时间 -->
		<uni-popup ref="time_pop" type="bottom">
			<view class="pop-container">
				<view class="pop-item" @click="byTime(1)">按患者最近一次测评时间排序</view>
				<view class="pop-item" @click="byTime(2)">按患者和医生绑定的时间排序</view>
				<view class="pop-item" @click="byTime(-2)" style="border: none;">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		onLoad(props) {
			if (props.isDepartmentIcu) {
				this.params.isDepartmentIcu = props.isDepartmentIcu
			}
			this.departPermission()
			this.getList(1)
			this.getManageDepartment()
			this.getDepartmentAllIlls()
		},
		data() {
			// let uid = uid:app.getCache('uid')
			let uid = 126
			return {
				uid,
				filter: false,
				list: [],
				doctorList: [],
				ills: [],
				nuritions: [{
						text: '全部患者',
						value: ''
					}, {
						text: '重度营养不良',
						value: 4
					},
					{
						text: '中度营养不良 / 轻-中度营养不良',
						value: 3
					}, {
						text: '可疑营养不良',
						value: 2
					}, {
						text: '营养良好',
						value: 5
					}, {
						text: '无营养不良',
						value: 1
					},
				],
				intervenes: [{
						text: '未干预',
						value: 1
					}, {
						text: '干预中',
						value: 2
					},
					{
						text: '已停止干预',
						value: 3
					}
				],
				params: {
					pageNo: 1,
					bindDoctor: uid,
					isDepartmentIcu: '',
					orderBy: 1,
					surveyResult: '',
					isBuy: 1,
					illness: ''
				},
				info: {},
				hasPermission: false,
				paramTexts: {
					bindDoctor: '',
					surveyResult: '',
					isBuy: '',
				}
			}
		},
		methods: {
			getList(pageNo = 1) {
				this.params.pageNo = pageNo
				app.getPatientList(this.params).then((res) => {
					this.info = res.data
					if (this.params.pageNo == 1) {
						this.list = res.data.list
						this.list = this.list.concat(res.data.list)
						this.list = this.list.concat(res.data.list)
						this.list = this.list.concat(res.data.list)
						this.list = this.list.concat(res.data.list)
						this.list = this.list.concat(res.data.list)
					} else {
						if (this.params.pageNo <= this.info.pageCount) {
							this.list = this.list.concat(res.data.list)
						}
					}
				})
			},
			getManageDepartment() {
				app.getManageDepartment({
					doctorId: this.uid
				}).then((res) => {
					this.doctorList = res.data
				})
			},
			departPermission() {
				app.departPermission().then((res) => {
					this.hasPermission = res.reultList && res.reultList.length > 1
				})
			},
			getDepartmentAllIlls() {
				app.getDepartmentAllIlls({
					isDept: this.params.isDepartmentIcu == 1 ? 1 : 0,
					doctorId: this.params.bindDoctor
				}).then((res) => {
					this.ills = res.data
				})
			},
			toSearch() {
				uni.navigateTo({
					url: 'search-patient-list?isDepartmentIcu=' + this.params.isDepartmentIcu
				})
			},
			byDoctor(id, doctorName) {
				switch (id) {
					case -2:
						this.$refs.doctor_pop.close()
						break;
					case -1:
						this.$refs.doctor_pop.open()
						break;
					default:
						this.params.bindDoctor = id
						this.paramTexts.bindDoctor = doctorName
						this.params.illness = ''
						this.byDoctor(-2)
						this.getList(1)
						break;
				}
			},
			byIlls(illness) {
				switch (illness) {
					case -2:
						this.$refs.ills_pop.close()
						break;
					case -1:
						this.$refs.ills_pop.open()
						break;
					default:
						this.params.illness = illness
						this.byIlls(-2)
						this.getList(1)
						break;
				}
			},
			byNutrition(status, text) {
				switch (status) {
					case -2:
						this.$refs.nutrition_pop.close()
						break;
					case -1:
						this.$refs.nutrition_pop.open()
						break;
					case '':
					case 1:
					case 2:
					case 3:
					case 4:
					case 5:
						this.params.surveyResult = status
						this.paramTexts.surveyResult = text
						this.byNutrition(-2)
						this.getList(1)
						break;
				}
			},
			byIntervene(status, text) {
				switch (status) {
					case -2:
						this.$refs.intervene_pop.close()
						break;
					case -1:
						this.$refs.intervene_pop.open()
						break;
					case 1:
					case 2:
					case 3:
						this.byIntervene(-2)
						this.params.isBuy = status
						this.paramTexts.isBuy = text
						this.getList(1)
						break;
				}
			},
			byTime(status) {
				switch (status) {
					case -2:
						this.$refs.time_pop.close()
						break;
					case -1:
						this.$refs.time_pop.open()
						break;
					case 1:
					case 2:
						this.byTime(-2)
						this.params.orderBy = status
						this.getList(1)
						break;

				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: $uni-defautt-bg-color;
	}

	.container {
		padding: 0 30rpx;
		color: $uni-text-color;

		.pop-container {
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 16rpx 16rpx 0 0;
			color: #333333;
			font-size: 30rpx;
			padding-top: 20rpx;

			.pop-item {
				padding: 24rpx 0;
				font-weight: bold;
				border-bottom: 1rpx solid #DCDCDC;
			}
		}


		.list {
			margin-top: 10rpx;

			.item {
				background-color: #FFFFFF;
				border-radius: 10rpx;
				margin-bottom: 12rpx;
				padding: 26rpx 20rpx;

				.avator {
					width: 80rpx;
					height: 80rpx;
					border-radius: 40rpx;
					margin-right: 20rpx;
				}

				.name {
					font-size: 32rpx;
					font-weight: bold;
				}

				.text {
					font-size: 26rpx;
					margin-top: 16rpx;
				}

				.join-time {
					margin-top: 20rpx;
					font-size: 22rpx;
					color: #999999;
				}
			}
		}

		.filter-box {
			background-color: #FFFFFF;
			border-radius: 10rpx;

			.filter-list {
				margin-top: 16rpx;

				.close-filter {
					color: #FFFFFF;
					width: 320rpx;
					height: 72rpx;
					line-height: 72rpx;
					text-align: center;
					background-color: #52A29E;
					border-radius: 36rpx;
					align-self: center;
					margin-top: 20rpx;
				}

				.filter-item {
					padding: 24rpx 0;
					margin: 0 40rpx;
					justify-content: space-between;
					border-bottom: 1rpx solid #efefef;

					text {
						font-size: 26rpx;
					}

					image {
						width: 18rpx;
						height: 10rpx;
						margin-left: 10rpx;
					}
				}
			}

			.toggle {
				justify-content: center;
				align-items: center;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				padding: 28rpx 0;

				text {
					font-size: 26rpx;
				}

				image {
					width: 18rpx;
					height: 10rpx;
					margin-left: 10rpx;
				}
			}

		}

		.search-box {
			justify-content: center;
			align-items: center;
			margin: 20rpx 0;
			background-color: #FFFFFF;
			padding: 16rpx 0;
			border-radius: 10rpx;
			position: sticky;
			top: 0;

			image {
				width: 24rpx;
				height: 26rpx;
			}

			text {
				width: 320rpx;
				font-size: 26rpx;
				color: #666666;
				margin-left: 15rpx;
			}
		}
	}
</style>
