<template>
	<view class="couponbox">
		<view v-if="couponList.length==0">
			<!-- 无优惠券 -->
			<view class="nocouponbox" style="">
				<image :src="imgurl+'/images/nocoupon.png'" style="" mode="widthFix"></image>
				<view class="textinfo" style="">暂无优惠券</view>
			</view>
		</view>
        <view class="" v-if="couponList.length>0" v-for="(coupon,index) in couponList" :key="index">
        	<!-- 未领 -->
        	<view class="notgetbox" style="" @click="clickNewCoupon(coupon)" v-if="coupon.status==0">
        		<image :src="imgurl+'/images/newcoupon.png'" style="" mode="widthFix"></image>
        		<view class="getbt" style="">立即领取</view>
        	</view>
			
			<!-- 已领优惠券 -->
			<view class="itemlist flex" v-if="coupon.status==1">
				<view class="leftmoney">￥<text>{{coupon.couponMoney}}</text></view>
				<view class="centerinfo flex">
					<view>
						<view class="infoone">{{coupon.remark}}</view>
						<view class="time">{{coupon.endTime+"到期"}} </view>
					</view>
				</view>
				<view class="rightstatus" @click="toindex">立即使用</view>
			</view>
			<!-- 已失效 -->
			<view class="itemlist flex outtime" v-if="coupon.status==2 || coupon.status==-1 ||coupon.status==-2">
				<view class="leftmoney">￥<text>10</text></view>
				<view class="centerinfo flex">
					<view>
						<view class="infoone">{{coupon.remark}}</view>
						<view class="time">{{coupon.endTime+"到期"}}</view>
					</view>
				</view>
				<view class="rightstatus">已失效</view>
			</view>
			
        </view> 
		<uni-popup ref="popup" type="dialog">
			<!-- 领取弹窗 -->
			<view style="" class="getframe">
				<uni-icons type="closeempty" size="25" class="closebt" color="#ccc" @click="$refs.popup.close()"></uni-icons>
				<view class="imgbox" style="">
					<image :src="imgurl+'/images/coupon.png'" style="width:100%;" mode="widthFix"></image>
					<view class="imginfo" style="">
						￥<text style="font-size:64rpx;">{{coupon.couponMoney}}</text>
					</view>
				</view>
				<view class="getbt" style="" @click="getCoupon">领取</view>
			</view>
		</uni-popup>
		</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl: app.globalData.baseUrl,
				imgurl:app.globalData.imageUrl,
				type: 1, //0无 1未领 2已领 优惠券状态 状态(0：未使用, 1：使用中, 2：已使用, -1：已失效, -2：已注销
				couponframe: false,
				couponList:[],
				coupon:{}
			}
		},
		onLoad() {
          this.getCouponList()
		},
		onShow() {

		},
		methods: {
           getCouponList(){
			   app.myCouponList({}).then(res=>{
				   console.log(res.data);
				   this.couponList = res.data.list;
				   console.log(this.couponList)
			   });
		   },
		   clickNewCoupon(coupon){
			   this.coupon = coupon
			   this.$refs.popup.open()
			   
		   },
		   getCoupon(){
			   //领取优惠券接口
			   app.drawCoupon({couponId:this.coupon.id}).then(res=>{
				   if(res.status==1){
					   app.tip('领取成功',1500);
					   this.$refs.popup.close();
					   this.getCouponList();
				   }
			   });
			   
		   },
		   toindex(){
		   	uni.switchTab({
		   		url:"/pages/index/index"
		   	})
		   },
		   
		}
	}
</script>

<style scoped lang="scss">
	.getframe {
		padding: 105rpx 34rpx 60rpx;
		border-radius: 8rpx;
		background: #fff;
		width: 86vw;
		box-sizing: border-box;

		.closebt {
			position: absolute;
			top: 20rpx;
			right: 20rpx;
		}

		.imgbox {
			position: relative;

			.imginfo {
				position: absolute;
				top: 50%;
				left: 26rpx;
				margin-top: -48rpx;
				color: #fff;
				font-size: 28rpx;
			}
		}

		.getbt {
			width: 260rpx;
			line-height: 78rpx;
			background: #2894EC;
			border-radius: 8rpx;
			font-size: 34rpx;
			color: #FFFFFF;
			margin: 56rpx auto 0;
			text-align: center;
		}
	}

	.notgetbox {
		position: relative;

		image {
			width: 100%;
			height: auto;
		}

		.getbt {
			color: #fff;
			font-size: 29rpx;
			position: absolute;
			top: 50%;
			right: 32rpx;
			margin-top: -20rpx;
		}
	}

	.nocouponbox {
		text-align: center;
		padding-top: 130rpx;

		image {
			width: 370rpx;
			height: auto;
		}

		.textinfo {
			font-size: 34rpx;
			color: #9A9A9A;
			padding-top: 20rpx;
		}
	}

	.couponbox {
		padding: 30rpx 36rpx;
	}

	.itemlist {
		position: relative;
		border-radius: 10rpx;
		overflow: hidden;
		box-shadow: 0rpx 0rpx 8rpx 1rpx #ccc;
		margin-bottom: 30rpx;

		::before {
			content: "";
			position: absolute;
			top: 50%;
			left: -18rpx;
			margin-top: -16rpx;
			width: 32rpx;
			height: 32rpx;
			border-radius: 50%;
			background: #F6F6F8;
		}

		::after {
			content: "";
			position: absolute;
			top: 50%;
			right: -18rpx;
			margin-top: -16rpx;
			width: 32rpx;
			height: 32rpx;
			border-radius: 50%;
			background: #F6F6F8;
		}

		.leftmoney {
			background: #FF713F;
			line-height: 180rpx;
			color: #fff;
			font-size: 28rpx;
			width: 166rpx;
			text-align: center;

			text {
				font-size: 64rpx;
			}
		}

		.centerinfo {
			flex: 1;
			justify-content: center;
			border-right: 1rpx dashed #ccc;
			height: 180rpx;

			.infoone {
				font-size: 28rpx;
			}

			.time {
				font-size: 26rpx;
				color: #999999;
				padding-top: 18rpx;
			}
		}

		.rightstatus {
			font-size: 26rpx;
			font-weight: 500;
			color: #FF713F;
			width: 30rpx;
			padding-left: 36rpx;
			box-sizing: border-box;
			padding-right: 64rpx;

		}
	}

	.outtime {
		.leftmoney {
			background: #DCDCDC;
		}

		.infoone {
			color: #999999;
		}

		.rightstatus {
			color: #999999;
		}
	}

	page {
		background: #F6F6F8;
	}

	.flex {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
</style>
