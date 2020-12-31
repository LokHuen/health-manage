<template>
	<!-- 营养品列表界面 -->
	<view class="container">
		<!-- <view style="height: 20rpx;"></view> -->
		<view class="list-content-box" v-for="(item,index) in listDatas" :key="index" @click="clickItem(item)">
			<image :src="item.pic" mode="widthFix" class="list-img"></image>
			<view class="list-msg">
				<view class="list-title">{{item.name}}</view>
				<view class="list-detail">
					<view class="list-detail-tip"> {{'每'+item.ediblePart+'克含'}} </view>
					<view class="list-detail-number">{{item.energy}}</view>
					<view class="list-detail-tip"> 千卡 </view>
					<view class="list-detail-number">{{(item.carbohydrate?item.carbohydrate:0)+'g'}} </view>
					<view class="list-detail-tip"> 碳水 </view>
				</view>
			</view>

		</view>
	</view>
</template>



<script>
	const app = getApp();
	export default {
		data() {
			return {
				listDatas: [],
				page:1,
			}
		},
		methods: {
			getListData() {
				app.foodList({
					genre:2,pageNo:this.page,
				}).then(res => {
					if (res.status == 1) {
						if(this.page!=1&&this.page>=res.data.pageCount) return;
						this.listDatas = this.page==1?res.data.list:this.listDatas.concat(res.data.list);
						if(this.page<res.data.pageCount) this.page++;
					}
				});
			},
			clickItem(item){
				uni.navigateTo({
					url:'nutrition-record?nutritionInfo='+JSON.stringify(item)
				})
			}
		
		},
		onLoad() {
			this.getListData();
		}

	}
</script>

<style lang="scss">
	.container {
		.list-content-box {
			display: flex;
			height: 152rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			border-bottom: 2rpx solid #CFCFCF;
		
			.list-img {
				width: 100rpx;
				height: 100rpx;
				background-color: #CFCFCF;
				margin-top: 30rpx;
			}
		
			.list-msg {
				margin-left: 30rpx;
				margin-top: 30rpx;
				height: 100rpx;
		
				.list-title {
					font-size: 34rpx;
					color: #272727;
				}
		
				.list-detail {
					margin-top: 10rpx;
					font-size: 30rpx;
					display: flex;
		
					.list-detail-number {
						color: #52A29E;
					}
		
					.list-detail-tip {
						color: #272727;
					}
				}
			}
		
		}
		
	}
</style>
