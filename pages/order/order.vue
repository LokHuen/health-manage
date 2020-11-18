<template>
	<view class="container">
		<view class="list">
			<view class="list-item" v-for="(item,index) in orderData" @click="itemClick(item)" :key="index">
				<view class="left">
					<text class="text">{{item.interpretTypeValue}}</text>
					<text class="order-no">{{'订单号'+' '+item.orderNumber}}</text>
					<text class="date">{{'日期 '+item.createTime}}</text>
					<text class="rate-text" v-if="!item.payStatusValue && item.appraiseStar!=0">{{'评价：'+item.appraiseStar+'星服务'}}</text>
					<view class="rate-box" v-if="item.appraiseVisible==1">
						<text>点击星星评价服务：</text>
						<uni-rate :max="5" :value="0" color="#FFBA00" :margin="2" coloactive-color="#FFBA00" class="rate" size="16"
						 :is-fill="false" @change="rateChange"/>
					</view>
				</view>
				<view class="right">
					<text class="price">{{'¥'+' '+(item.payAmount?item.payAmount:0)}}</text>
					<text class="refund">{{item.payStatusValue}}</text>
				</view>
			</view>
		</view>
		<view class="empty-box" v-if="orderData.length==0">
			<image :src="imageUrl+'/image/no_data.png'"></image>
			<text>无数据</text>
		</view>
		<view class="appraise_mask" @touchmove.stop.prevent="false" v-if="showSppraise">
			<view class="appraise_content">
				<image :src="imageUrl+'/icon_close.png'" @click="cancelSppraise"></image>
				<text>{{'我的评价：'+starValue+'星服务'}}</text>
				<text>星级越高代表服务满意度越高</text>
				<text @click="orderEvaluate">确定</text>
			</view>
		</view>
	</view>
</template>

<script>
	var app = getApp();
	export default {
		data() {
			return {
				imageUrl:this.$imageUrl,
				orderData: [],
				showSppraise: false,
                orderId:0,
				starValue:0
			}
		},
		onLoad(){
			this.getOrderList();
		},
		methods: {

			rateChange(e){
				this.starValue = e.value
				console.log(e.value)
			},
			getOrderList(){
				app.myOrderList({}).then(res=>{
					console.log(res.data);
					this.orderData = res.data.list;
				});
			},
			itemClick(item) {
				this.orderId = item.id;
				if(item.appraiseVisible==1){
					this.showSppraise = true;
				}
				
			},
			cancelSppraise() {
				this.showSppraise = false;
			},
	        orderEvaluate(){
				app.orderEvaluation({id:this.orderId,appraiseStar:this.starValue}).then(res=>{
					if(res.status==1){
						app.tip('评价成功',1500);
					    this.getOrderList();
					    this.cancelSppraise();
					}
				});
			}
			
		}
	}
</script>

<style lang="scss">
	.container {
		.appraise_mask {
			display: flex;
			justify-content: center;
			align-items: center;
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 2000;
			background: rgba(0, 0, 0, 0.4);

			.appraise_content {
				display: flex;
				flex-direction: column;
				background-color: #FFFFFF;
				border-radius: 8rpx;
				width: 100%;
				margin-left: 50rpx;
				padding-top: 30rpx;
				padding-right: 30rpx;
				padding-left: 30rpx;
				padding-bottom: 60rpx;
				margin-right: 50rpx;
				justify-content: center;
				align-items: center;

				image {
					margin-left: auto;
					width: 30rpx;
					height: 30rpx;
				}

				text:nth-child(2) {
					color: #333333;
					margin-top: 20rpx;
					font-size: 32rpx;
				}

				text:nth-child(3) {
					margin-top: 30rpx;
					color: #666666;
					font-size: 30rpx;
				}

				text:nth-child(4) {
					width: 260rpx;
					background-color: #2793EC;
					height: 78rpx;
					line-height: 78rpx;
					margin-top: 50rpx;
					border-radius: 8rpx;
					text-align: center;
					color: #ffffff;
					font-size: 30rpx;
				}
			}
		}

		.empty-box {
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			image {
				width: 370rpx;
				height: 240rpx;
			}

			text {
				color: #999999;
				font-size: 34rpx;
			}
		}

		.list {
			padding-top: 10rpx;
			padding-bottom: 164rpx;

			.list-item {
				display: flex;
				margin: 30rpx 40rpx 0rpx 40rpx;
				box-shadow: 0px 0px 9rpx 1rpx rgba(0, 0, 0, 0.18);
				padding: 30rpx 36rpx;

				.left {
					display: flex;
					flex: 1;
					flex-direction: column;

					.text {
						color: #333333;
						font-size: 32rpx;
					}

					.order-no {
						margin-top: 26rpx;
						color: #999999;
						font-size: 26rpx;
					}

					.date {
						margin-top: 18rpx;
						color: #999999;
						font-size: 26rpx;
					}

					.rate-text {
						margin-top: 30rpx;
						color: #999999;
						font-size: 26rpx;
					}

					.rate-box {
						align-items: center;
						display: flex;
						margin-top: 30rpx;

						text:nth-child(1) {
							font-size: 26rpx;
							color: #2793EC;
						}
					}
				}

				.right {
					display: flex;
					flex-direction: column;
					justify-content: center;
					align-items: center;

					.price {
						color: #333333;
						font-size: 36rpx;
					}

					.refund {
						margin-top: 10rpx;
						color: #E21313;
						font-size: 26rpx;
					}
				}
			}
		}
	}
</style>
