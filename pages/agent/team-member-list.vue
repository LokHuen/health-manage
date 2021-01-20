<template>
	<view class="container">
		<view style="height: 15rpx;background-color: #F5F6F6;"></view>
	   <view class="list-box" v-for="(item,index) in list" @click="selectItem(item)">
	   	   <view class="name">{{item.name}}</view>
		   <view class="desc">{{item.doctorNum+' 医生'+' '+item.patientNum+' 患者'}}</view>
	   </view>
	   <view class="no-data-tips" v-if="list.length == 0">暂无数据</view>
	   <view style="height: 1400rpx;background-color: #F5F6F6;" v-if="list.length == 0"></view>
	   <view style="height: 1200rpx;background-color: #F5F6F6;" v-if="list.length > 0"></view>
	</view>
</template>


<script>
	const app = getApp();
	export default {
	
		data() {
			return {
				list: [],
				pageNo:1
			}
		},
		onLoad() {
			this.refreshData();
		},
		onPullDownRefresh() {
			this.refreshData();
		},
		onReachBottom() {
			console.log(12)
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
				app.agentTeamList({
					pageNo: this.pageNo,
				}).then(res => {
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
			selectItem(item){
				uni.navigateTo({
					url:'member-detail?id='+item.id
				})
			}
			
		},

	}
</script>

<style lang="scss">
	.container{
		background-color: #F5F6F6;
		.no-data-tips {
			margin-top: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: #666666;
		}
		.list-box{
			height: 150rpx;
			margin-top: 20rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			background-color: #FFFFFF;
			.name{
				padding-top: 30rpx;
				margin-left: 20rpx;
				font-size: 32rpx;
				color: #333333;
			}
			.desc{
				margin-left: 20rpx;
				margin-top: 20rpx;
				font-size: 26rpx;
				color: #333333;
			}
		}
	}
	
</style>
