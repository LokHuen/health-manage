<template>
	<view class="listbox">
		<view class="pagebackground"></view>
		<view >
			<view class="flex userlist">
				<image src="../../static/img/avator.png" mode="aspectFill" class="userhead"></image>
				<view style="flex:1;">
					<view class="username">陈聪</view>
					<view class="userinfo">来看书到付款时间的</view>
				</view>
				<view class="flex usernum">
					<text>80</text>患者
				</view>
			</view>
		</view>
		<view v-show="!list[0]" class="hadnodata">暂无数据</view>
		
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				imgUrl:app.globalData.imageUrl,
				list:[],
				page:1,
				pageCount:1,
			}
		},
		onLoad(options){
			this.init();
		},
		onShow(){
			
		},
		methods: {
			init(){
				if(this.page>this.pageCount) return;
				let data={
					pageNo:this.page,
				}
				app.salesuserlist(data).then(res => {
					this.pageCount = res.data.pageCount;
					if(this.page==1) this.list = res.data.list;
					else this.list = this.list.concat(res.data.list);
					if(res.data.list.length>0) this.page++; 
				});
			},
		},
		onReachBottom(){
			this.init();
		},
	}
</script>

<style lang="scss">
	.userlist{
		background:#fff;padding:34rpx 50rpx;margin-top:10rpx;
	}
	.listbox{
		.userhead{width:100rpx;height:100rpx;border-radius:50%;margin-right:20rpx;}
		.username{
			font-weight: 600;padding-bottom:6rpx;
		}
		.userinfo{font-size: 26rpx;}
		.usernum{
			font-size: 26rpx;
			color: #666666;
			text{
				font-size: 42rpx;padding-right:10rpx;
				color: #4B8BE8;
			}
		}
	}
	.hadnodata{color:#888;padding-top:200rpx;text-align:center;}
</style>
