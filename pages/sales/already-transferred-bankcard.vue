<template>
	<!-- 已经转账到银行卡界面 -->
	<view>
		<view class="health-title">
			<view class="health-title-content">
				<view class="health-title-amount">{{money+'元'}}</view>
				<view class="health-title-detail">已转账金额</view>
			</view>
		</view>
		<view class="health-list">
			<view class="health-list-content">
				<view class="health-list-title">转账记录</view>
				<view class="health-item" v-for="(item,index) in listDatas" @click="select(item)">
					<view class="item-amount">{{item.money}}</view>
					<view class="item-time">{{item.createTime}}&nbsp;&nbsp;&nbsp;&nbsp;{{'来自'+item.name+'的购物订单'}}</view>
				</view>
			</view>

		</view>
		<view class="no-data-tips" v-if="listDatas.length == 0">暂无数据</view>
	</view>
</template>



<script>
	const app = getApp();
	export default {
		data() {
			return {
				listDatas: [],
				pageNo: 1,
				money: ''
			}
		},
		methods: {
			select(item) {
				uni.navigateTo({
					url: 'doctor-bill-detail?id=' + item.id
				});
			},
			getListData() {
				app.doctorGetDivide({
					pageNo: this.pageNo
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
			}
		},
		onShow() {
			this.pageNo = 1;
			this.getListData();
		},
		onPullDownRefresh() {
			this.pageNo = 1;
			this.getListData();
		},
		onReachBottom() {
			this.pageNo++;
			this.getListData();
		},
		onLoad(props) {
			this.money = props.money;
		}

	}
</script>

<style lang="scss">
	page {
		background-color: #F7F8F8;
		white-space: pre-wrap;
	}

	.health-title {
		background-color: white;
		height: 198rpx;

		.health-title-content {
			margin: 0 58rpx;

			.health-title-amount {
				color: #333333;
				font-size: 52rpx;
				padding-top: 35rpx;
			}

			.health-title-detail {
				color: #999999;
				font-size: 30rpx;
				padding-top: 10rpx;
			}
		}
	}

	.health-list {
		background-color: white;
		margin-top: 20rpx;

		.health-list-content {
			margin: 20rpx 58rpx 0;

			.health-list-title {
				padding-top: 39rpx;
				padding-bottom: 30rpx;
				color: #666666;
				font-size: 30rpx;
			}

			.health-item {
				height: 126rpx;
				border-bottom: 0.01rem #EEEEEE solid;

				.item-amount {
					padding-top: 25rpx;
					color: #333333;
					font-size: 34rpx;
				}

				.item-time {
					color: #999999;
					font-size: 24rpx;
				}
			}
		}
	}
	
	.no-data-tips{
		margin-top: 100rpx;
		text-align: center;
		font-size: 30rpx;
		color: #666666;
	}
</style>
