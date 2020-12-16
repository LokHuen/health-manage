<template>
	<!-- 待结算 -->
	<view class="container">
		<!-- <view class="not-received-item">
			<view class="money-box">
				<view class="money">{{money}}</view>
				<view class="yuan">元</view>
			</view>
			<view class="tips">待转账到银行卡</view>
			<view class="detail">收益会在第二天转入您的银行卡</view>
		</view>
		<view class="line"> </view>
		<view class="list-tips">收益待转账的订单</view> -->
		<!-- <view class="list-item" v-for="(item,index) in list" :key="index" @click="select(item)">
			<view class="info-box">
				<view class="list-name">来自于{{item.name}}</view>
				<view class="list-detail">{{item.createTime}}</view>
			</view>
			<view class="list-money">{{'¥'+item.money}}</view>
		</view> -->
		<view class="health-list">
			<view class="health-list-content">
				<view class="health-item" v-for="(item,index) in list" @click="select(item)">
					<view class="item-amount">￥{{item.money}}</view>
					<view class="item-time">{{item.createTime}}&nbsp;&nbsp;&nbsp;&nbsp;{{'来自于'+item.name}}</view>
				</view>
			</view>
		
		</view>
		<view class="no-data-tips" v-if="list.length == 0">暂无数据</view>

	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				list: [],
				pageNo:1,
				money:''
			}
		},
		methods: {
			select(item){
				// uni.navigateTo({
				// 	url:'doctor-bill-detail?id='+item.id
				// });
			},
            getListData(){
				app.doctorWaitDivide({pageNo:this.pageNo}).then(res =>{
					if(res.status===1){
						if(this.pageNo===1){
							this.list = res.data.list;
						}else{
							if(res.data.pageList.pageCount>this.pageNo){
								this.list = this.list.concat(res.data.list);
							}
						}
					}
					uni.stopPullDownRefresh();
				});
			}
		},
		onShow(){
			this.pageNo = 1;
		    this.getListData();		
		},
		onPullDownRefresh() {
			this.pageNo = 1;
			this.getListData();
		},
		onReachBottom() {
			this.pageNo ++;
			this.getListData();
		},
		onLoad(props){
			this.money = props.money;
		}

	}
</script>

<style lang="scss">
	.container {
		.not-received-item {
			height: 230rpx;
			margin-left: 60rpx;

			.money-box {
				color: #333333;
				padding-top: 45rpx;
				height: 39rpx;
				line-height: 39rpx;
				display: flex;

				.money {
					font-size: 24px;
				}

				.yuan {
					font-size: 13px;
					margin-top: 6rpx;
				}
			}

			.tips {
				color: #52A29E;
				font-size: 15px;
				margin-top: 25rpx;
			}

			.detail {
				color: #999999;
				font-size: 13px;
				margin-top: 10rpx;
			}
		}

		.line {
			height: 20rpx;
			background-color: #F5F6F6;
		}

		.list-tips {
			font-size: 14px;
			margin-top: 30rpx;
			margin-left: 50rpx;
		}
		.no-data-tips{
			margin-top: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: #666666;
		}

		.list-item {
			display: flex;
			margin-left: 50rpx;
			margin-right: 50rpx;
			border-bottom: 2rpx solid #DCDCDC;
            position: relative;
			.avtor {
				margin-top: 30rpx;
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
			}

			.info-box {
				margin-top: 30rpx;
				margin-left: 20rpx;
				color: #333333;
				margin-bottom: 25rpx;
				margin-right: 100rpx;
				.list-name {
					font-size: 15px;
				}

				.list-detail {
					font-size: 12px;
				}

			}

		}

		.list-money {
			position: absolute;
			font-size: 14px;
			right: 0;
			top: 40rpx;
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
</style>
