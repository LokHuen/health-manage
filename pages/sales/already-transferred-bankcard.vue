<template>
	<!-- 已经转账到银行卡界面 -->
	<view>
		<!-- <view class="health-title">
			<view class="health-title-content">
				<view class="health-title-amount">{{money+'元'}}</view>
				<view class="health-title-detail">已转账金额</view>
			</view>
		</view> -->
		<turnback @back="back" v-if="isMiniProgram" style="position: sticky;top: 0;"> </turnback>
		<view class="health-list">
			<view class="health-list-content">
				<!-- <view class="health-list-title">转账记录</view> -->
				<view class="health-item" v-for="(item,index) in listDatas" @click="select(item)">
					<view class="item-amount">￥{{item.money}}</view>
					<view class="item-time">{{item.createTime}}&nbsp;&nbsp;&nbsp;&nbsp;{{'来自于'+item.name}}</view>
				</view>
			</view>

		</view>
		<view class="no-data-tips" v-if="listDatas.length == 0">暂无数据</view>
	</view>
</template>



<script>
	const app = getApp();
	import wx from '../../plugins/jweixin.js'
	import turnback from "../../components/turnback.vue"
	export default {
		components:{turnback},
		data() {
			return {
				listDatas: [],
				pageNo: 1,
				money: '',
				isMiniProgram:false
			}
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
			select(item) {
				uni.navigateTo({
					url: 'sales-bill-detail?id=' + item.id
				});
			},
			getListData() {
				app.sale_doctorGetDivide({
					pageNo: this.pageNo,type:1,
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
			this.getMiniProgramStatic();
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
