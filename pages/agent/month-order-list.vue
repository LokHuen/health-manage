<template>
	<view class="container">
		<view style="height: 10rpx;background-color: #F5F6F6;"></view>
		<view class="" v-for="(item,index) in list">
			<view class="time">
				{{item.month}}
			</view>
			<view class="flex numbox" @click="toOrder(item.month)">
				<!-- <view style="height: 20rpx; background-color: #007AFF;"></view> -->

				<view class="numitem">
					<view class="number">{{item.orderNum||0}}</view>
					<view>订单数</view>

				</view>
				<view class="numitem">
					<view class="number">{{item.money||0}}</view>
					<!-- <view>{{salesId||isAgent?'收益(元)':'订单总金额(元)'}}</view> -->
					<view>订单总金额(元)</view>
				</view>
			</view>
			<view>

			</view>

		</view>
		<view class="no-data-tips" v-if="list.length == 0">暂无数据</view>
		<view style="height: 1200rpx;background-color: #F5F6F6;" v-if="list.length == 0"></view>
		<view style="height: 1000rpx;background-color: #F5F6F6;" v-if="list.length == 1"></view>
		<view style="height: 700rpx;background-color: #F5F6F6;" v-if="list.length == 2"></view>
		<view style="height: 400rpx;background-color: #F5F6F6;" v-if="list.length == 3"></view>
		<view style="height: 200rpx;background-color: #F5F6F6;" v-if="list.length > 3"></view>
	</view>
</template>

<script>
	const app = getApp();
	export default {

		data() {
			return {
				list: [],
				pageNo: 1,
				salesId: '',
				isAgent: 0,
				isSalesPage: ''
			}
		},
		onLoad(props) {
			if (props.salesId) {
				this.salesId = props.salesId;
			}
			if (props.isSalesPage) {
				this.isSalesPage = props.isSalesPage
			}
			this.isAgent = props.isAgent
			this.refreshData();
		},
		onPullDownRefresh() {
			this.refreshData();
		},
		onReachBottom() {
			this.loadMoreData();
		},
		methods: {
			refreshData() {
				this.pageNo = 1;
				this.getListData();
			},
			loadMoreData() {
				this.pageNo++;
				this.getListData();
			},

			getListData() {
				let data = {
					pageNo: this.pageNo,
				};
				if (this.isSalesPage) {
					data.isSalesPage = this.isSalesPage
				}
				if (this.salesId) {
					data = {
						...data,
						salesId: this.salesId,
					}
				}
				app.agentOrderStatsList(data).then(res => {
					if (res.status == 1) {
						if (this.pageNo == 1) {
							this.list = res.data.list;
						} else {
							if (res.data.pageCount >= this.pageNo) {
								this.list = this.list.concat(res.data.list);
							}
						}
					}

					uni.stopPullDownRefresh();
				});
			},
			toOrder(month) {
				if (month) {
					month = month.replace('年', '-').replace('月', '')
				}
				if (this.salesId) {
					uni.navigateTo({
						url: 'order-list?salesId=' + this.salesId + '&isSalesPage=' + this.isSalesPage + '&month=' + month
					})
				} else {
					uni.navigateTo({
						url: 'order-list?' + '&isSalesPage=' + this.isSalesPage + '&month=' + month
					})
				}
			}

		},

	}
</script>

<style lang="scss">
	.container {
		background-color: #F5F6F6;

		.no-data-tips {
			margin-top: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: #666666;
		}

		.time {
			margin-top: 30rpx;
			padding-left: 20rpx;
			padding-top: 20rpx;
			background-color: #fff;
		}

		.numbox {

			padding: 60rpx 30rpx;
			background: #fff;

			.numitem {
				width: 50%;
				text-align: center;
				font-size: 30rpx;
				box-sizing: border-box;

				&:nth-child(1) {
					border-right: 2rpx solid #ddd;
				}

				.number {
					font-size: 52rpx;
					padding-bottom: 10rpx;
					color: #4B8BE8;
				}
			}

		}


	}
</style>
