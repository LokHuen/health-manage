<template>
	<view class="container">
		<view style="height: 10rpx; background-color: #F5F6F6;"></view>
		<view class="list-box" v-for="(item,index) in list">
			<view style="height: 10rpx;"></view>
			<view class="common">{{'订单号:'+item.order_number}}<text style="margin-left: 28rpx; color: #4B8BE8;" v-if="item.rePurchase">复购</text></view>
			<view class="common">{{'商品名称:'+item.commodity}}</view>
			<view class="common">{{'下单时间:'+item.create_time}}</view>
			<view class="common">{{'实付款:'+item.pay_amount+'元'}}</view>
			<view class="common">{{'患者名字:'+item.patient}}</view>
			<view class="common">{{'医生名字:'+item.doctorName}}</view>
			<view class="common">{{'业务员:'+item.sale}}</view>
			<view class="common">{{'业务员收益:'+item.salesMoney+'元'}}</view>

			<view style="height: 20rpx;"></view>
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
				isSalesPage: '',
				month: ''
			}
		},
		onLoad(props) {
			if (props.salesId) {
				this.salesId = props.salesId;
			}
			if (props.isSalesPage) {
				this.isSalesPage = props.isSalesPage
			}

			if (props.month) {
				this.month = props.month;
			}

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
					isSalesPage: this.isSalesPage,
					month: this.month
				};
				if (this.salesId) {
					data = {
						...data,
						salesId: this.salesId
					}
				}
				app.agentOrderList(data).then(res => {
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

		},

	}
</script>

<style lang="scss">
	.container {
		//height: 100vh;background-color: #F5F6F6;overflow-y: auto;
		background-color: #F5F6F6;

		.list-box {
			background-color: #fff;
			margin-left: 30rpx;
			margin-right: 30rpx;
			margin-top: 20rpx;
			font-size: 26rpx;
			color: #666666;

			.common {
				margin-left: 30rpx;
				margin-top: 20rpx;
			}
		}

		.no-data-tips {
			margin-top: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: #666666;
		}
	}
</style>
