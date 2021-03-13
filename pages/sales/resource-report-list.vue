<template>
	<view class="container">
		<view class="title" v-if="!params.salesId">我的报备</view>
		<view class="list-box" v-for="(item,index) in list">
			<view class="list-title">{{item.type}}</view>
			<view class="list-desc">{{item.hospital}}</view>
			<view class="list-desc" v-if="item.type !='医院'">{{item.deptName}}</view>
			<view class="list-desc" v-if="item.type =='医生'">{{item.doctorNmae+' '+item.technicalTitle}}</view>
			<view style="height: 15rpx;"></view>
			<view class="list-desc" @click="cilckItem(item)">
				<text>{{"月患者数量预估 "}}</text>
				<text style="color: #A80003;">{{item.monthly_patient||0}}</text>
				<text>人</text>
			</view>
			<view class="list-desc" @click="cilckItem(item)">
				<text>{{"月销售潜力 "}}</text>
				<text style="color: #A80003;">{{item.completed_order||0}}</text>
				<text>单</text>
			</view>

			<view style="height: 40rpx;"></view>
			<view class="remove" @click="remove(index)" v-if="!params.salesId">移除</view>
		</view>
		<view class="no-data-tips" v-if="list.length == 0">暂无数据</view>
		<!-- <view style="height: 900rpx;" v-if="list.length <4"></view>
		<view style="height: 200rpx;"></view> -->


		<view class="button-box" v-if="!params.salesId">
			<button type="default" class="button" @click="submit">报备资源</button>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {

		data() {
			return {
				list: [],
				params: {
					pageNo: 1,
					salesId: ''
				}
			}
		},
		onShow() {
			this.params.pageNo = 1;
			this.getListData();
		},
		onLoad(props) {
			if (props.salesId) {
				this.params.salesId = props.salesId;
			}
		},
		onPullDownRefresh() {
			this.params.pageNo = 1;
			this.getListData();
		},
		onReachBottom() {
			this.params.pageNo++;
			this.getListData();
		},
		methods: {
			cilckItem(item) {
				if (this.params.salesId) {
					uni.navigateTo({
						url: '../agent/resource-report-detail?id=' + item.id
					})
				} else {
					uni.navigateTo({
						url: 'resource-report?id=' + item.id
					})
				}
			},
			remove(index) {
				var id = this.list[index].id;
				app.removeResource({
					id: id
				}).then(res => {
					if (res.status == 1) {
						app.tip('移除成功');
						this.list.splice(index, 1);
					}
				});
			},
			submit() {
				uni.navigateTo({
					url: 'resource-report'
				})

			},
			getListData() {
				app.resourceList(this.params).then(res => {
					if (res.status === 1) {
						if (this.params.pageNo === 1) {
							this.list = res.data.list;
						} else {
							if (res.data.pageCount >= this.params.pageNo) {
								this.list = this.list.concat(res.data.list);
							}
						}
					}
					uni.stopPullDownRefresh();
				});
			}

		},

	}
</script>

<style lang="scss">
	page {
		background-color: $uni-defautt-bg-color;
	}

	.container {
		// background-color: #F5F6F6;
		height: 1100vh;

		.no-data-tips {
			margin-top: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: #666666;
		}

		.title {
			background-color: #F5F6F6;
			padding-top: 30rpx;
			margin-left: 50rpx;
			font-size: 26rpx;
		}

		.list-box {
			margin-top: 20rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			background-color: #FFFFFF;
			position: relative;

			.list-title {
				padding-top: 20rpx;
				margin-left: 20rpx;
				font-size: 26rpx;
				color: #666666;
			}

			.list-desc {
				margin-left: 20rpx;
				margin-top: 20rpx;
				color: #333333;
				font-size: 30rpx;
			}

			.remove {
				position: absolute;
				color: #4B8BE8;
				right: 30rpx;
				top: 20rpx;
				font-size: 26rpx;
			}
		}

		.button-box {
			position: fixed;
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
	}
</style>
