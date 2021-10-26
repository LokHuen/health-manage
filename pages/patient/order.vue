<template>
	<view class="">
		<!-- <view class="flex phonetab">
			<view class="itemlist" @click="clickthis(0)"><text :class="chooseindex==0?'on':''">全 部</text></view>
			<view class="itemlist" @click="clickthis(1)"><text :class="chooseindex==1?'on':''">待付款</text></view>
			<view class="itemlist" @click="clickthis(2)"><text :class="chooseindex==2?'on':''">待发货</text></view>
			<view class="itemlist" @click="clickthis(3)"><text :class="chooseindex==3?'on':''">待收货</text></view>
		</view> -->
		<view class="orderlist bbuttom" v-for="(item,index) in list" :key="index" click="toorderdetail(item.id)">
			<view class="flex ordernum">
				<view style="flex:1">订单编号：{{item.orderNumber}}</view>
				<view :style="item.status<3?'color:#EA132D;':''">{{item.statusValue}}</view>
			</view>
			<view class="flex shopinfo" v-if="!item.orderDetailList[1]">
				<image class="bugimg" :src="baseUrl+item.orderDetailList[0].coverUrl" mode="aspectFill"></image>
				<view class="buginfo">
					<view class="text_overflow_2">{{item.orderDetailList[0].commodity}}</view>
					<view class="flex bugnum">
						<view style="flex:1;color:#333;" >{{item.orderDetailList[0].specification||""}}</view>
						<view>x {{item.orderDetailList[0].quantity}}</view>
					</view>
					<view class="flex bugnum" >
						
						<view style="flex:1;">{{item.currencyType==2?'':'¥'}} {{item.orderDetailList[0].price}}{{item.currencyType==2?' HKD':''}}</view>
					</view>
				</view>
			</view>
			<view class="flex shopinfo1" v-if="item.orderDetailList[1]">
				<image v-for="item1 in item.orderDetailList" class="bugimg" :src="baseUrl+item1.coverUrl" mode="aspectFill"></image>
				等{{item.orderDetailList.length}}件商品
			</view>
			<view class="ordermoney">订单总金额：{{item.currencyType==2?'':'¥'}}{{item.payAmount}}{{item.currencyType==2?' HKD':''}}<text v-if="item.status==5">已退款</text></view>
		</view>
		<view v-show="!list[0]" class="hadnodata">暂无数据</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl: app.globalData.baseUrl,
				imgUrl:app.globalData.imageUrl,
				chooseindex:0,
				list:[],
				page:1,
				pageCount:1,
				pageback:false,
			}
		},
		onLoad(options){
			this.chooseindex = options.type||this.chooseindex;
			this.init();
		},
		onShow(){
			if(this.pageback) {this.clickthis(this.chooseindex);this.pageback=false;}
		},
		methods: {
			init(){
				if(this.page>this.pageCount) return;
				//0,"待支付" 1,"待发货 2,"待收货 3,"已完成 4,"已关闭 6,"退款中 5,"已完成（退款订单）"
				let data={
					pageNo:this.page,
				}
				data.status = 3;
				app.getorderlist(data).then(res => {
					this.pageCount = res.data.pageCount;
					if(this.page==1) this.list = res.data.list;
					else this.list = this.list.concat(res.data.list);
					if(res.data.list.length>0) this.page++; 
				});
			},
			clickthis(index){
				this.chooseindex = index;
				this.page=1;
				this.pageCount = 1;
				this.init();
				uni.pageScrollTo({
					scrollTop:0,
				})
			},
			toorderdetail(id){
				uni.navigateTo({
					url:"/pages/order/order?id="+id
				})
			},
		},
		onReachBottom(){
			this.init();
		},
		onHide(){
			this.pageback=true;
		},
	}
</script>

<style lang="scss">
	.text_overflow_2 {
	    overflow: hidden;
	    text-overflow: ellipsis;
	    display: -webkit-box;
	    -webkit-box-orient: vertical;
	    -webkit-line-clamp: 2;
	}
	.hadnodata{color:#888;padding-top:200rpx;text-align:center;}
	.orderlist{
		padding: 0 30rpx;border-bottom:1rpx solid #eee;
		.ordernum{padding:30rpx 0;}
		.shopinfo{
			padding:6rpx 0rpx;
			.bugimg{width: 180rpx;height: 180rpx;margin-right:30rpx;}
			.buginfo{font-size: 34rpx;color: #272727;flex:1;
				.bugnum{font-size: 30rpx;color: #EA132D;padding-top:16rpx;
					view:nth-child(2){font-size: 26rpx;color: #272727;}
				}
			}
		}
		.shopinfo1{
			padding:6rpx 0rpx;color:#555;
			.bugimg{width: 180rpx;height: 180rpx;margin:0 16rpx 10rpx 0;}
		}
		.ordermoney{font-size: 28rpx;line-height:100rpx;text-align: right;
			text{color:#EA132D;padding-left:30rpx;}
		}
	}
	.bbuttom{border-top:20rpx solid #F7F7F7;}
	.phonetab{position: sticky;top:0;padding:30rpx 50rpx;background: #fff;z-index: 9;border-bottom:1rpx solid #eee;
		.itemlist{width: 25%;text-align: center;
			text{font-size: 30rpx;color: #272727;border-bottom:4rpx solid transparent;padding-bottom:10rpx;}
			.on{color: #199F90;border-color:transparent;}
		}
	}
	page{border-top:1px solid #eee;}
</style>
