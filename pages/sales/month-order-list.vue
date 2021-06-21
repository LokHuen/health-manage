<template>
	<view class="container flexc">
		<turnback @back="back" v-if="isMiniProgram"> </turnback>
		<view class="list-item" v-for="(item,index) in list">
			<view class="time">
				{{item.month}}
			</view>
			<view v-if="!orgId" class="flex numbox" @click="toOrder(item.month)">
				<view class="numitem">
					<view class="number">{{item.orderNum||0}}</view>
					<view>订单数</view>
				</view>
				<view class="numitem">
					<view class="number">{{item.money||0}}</view>
					<view>订单总金额(元)</view>
				</view>
			</view>
			<view v-if="orgId" class="flex numbox1" @click="toOrder(item.month)">
				<view class="numitem">
					<view class="number">{{item.orderNum||0}}</view>
					<view>订单数</view>
				</view>
				<view class="numitem">
					<view class="number">{{item.money||0}}</view>
					<view>订单总金额(元)</view>
				</view>
				<view class="numitem">
					<view class="number">{{item.realIncome||0}}</view>
					<view>实收总金额</view>
				</view>
			</view>
			<view>
			</view>
		</view>
		<view class="no-data-tips" v-if="list.length == 0">暂无数据</view>
	</view>
</template>

<script>
	const app = getApp();
	import wx from '../../plugins/jweixin.js'
	import turnback from "../../components/turnback.vue"
	export default {
        components: {
        	turnback
        },
		data() {
			return {
				list: [],
				params: {
					pageNo: 1,
					salesId: '',
					deptId: '',
					pageResource: 1
				},
				info: {
					pageCount: 1
				},
				isMiniProgram:false
			}
		},
		onLoad(props) {
			if (props.salesId) {
				this.params.salesId = props.salesId
			}
			if (props.pageResource) {
				this.params.pageResource = props.pageResource
			}
			if (props.orgId) {
				this.params.deptId = props.orgId;
				this.orgId = props.orgId;
			}
			this.refreshData();
			this.getMiniProgramStatic();
		},
		onPullDownRefresh() {
			this.refreshData();
		},
		onReachBottom() {
			this.loadMoreData();
		},
		methods: {
			getMiniProgramStatic(){
				wx.miniProgram.getEnv((res)=>{
				   this.isMiniProgram = res.miniprogram?true:false;
				})
			},
			back(){
			  uni.navigateBack({
			  	
			  })
			},
			refreshData() {
				this.params.pageNo = 1;
				this.getListData();
			},
			loadMoreData() {
				if (this.info.pageCount > this.params.pageNo) {
					this.params.pageNo++;
					this.getListData();
				}
			},

			getListData() {
				app.agentOrderStatsList(this.params).then(res => {
					this.info = res.data
					if (res.status == 1) {
						if (this.params.pageNo == 1) {
							this.list = res.data.list;
						} else {
							if (res.data.pageCount >= this.params.pageNo) {
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
				uni.navigateTo({
					url: 'order-list?month=' + month + '&pageResource=' + this.params.pageResource + '&salesId=' +
						this.params.salesId + '&orgId=' + this.params.deptId
				})
			}
		},
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: $uni-defautt-bg-color;
	}

	.container {
		.list-item {
			margin-top: 10rpx;
		}

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
		.numbox1 {
			padding: 60rpx 0rpx;
			background: #fff;
		
			.numitem {
				width: 33.2%;
				text-align: center;
				font-size: 24rpx;
				box-sizing: border-box;border-right: 2rpx solid #ddd;
		
				&:last-child {
					border-right: 0rpx solid #ddd;
				}
		
				.number {
					font-size: 38rpx;
					padding-bottom: 10rpx;
					color: #4B8BE8;
				}
			}
		}
	}
</style>
