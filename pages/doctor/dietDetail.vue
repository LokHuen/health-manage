<template>
	<view class="container">
		<view class="pagebackground"></view>
		<view class="listitem" v-for="(item,index) in listDatas" :key="index">
			<view class="listhead">{{item.startTime}} {{item.durationValue}} <view style="padding-top:8rpx;">共摄入 <text class="detail-number">{{item.calories}}千卡能量  {{item.carbohydrate}}克碳水</text></view></view>
			<view class="list-content-box" v-for="(item1,index1) in item.detailList" :key="index1">
				<image :src="item1.pic" mode="widthFix" class="list-img"></image>
				<view class="list-msg">
					<view class="list-title flex">
						<view style="flex:1;">{{item1.food_name}}</view>
						<view>{{item1.weight}}g</view>
					</view>
					<view class="list-detail">
						<view class="list-detail-tip"> {{'每'+item1.edible_part+'克含'}} </view>
						<view class="list-detail-number">{{item1.energy}}</view>
						<view class="list-detail-tip"> 千卡 </view>
						<view class="list-detail-number">{{item1.carbohydrate?item1.carbohydrate:0}} </view>
						<view class="list-detail-tip"> g碳水 </view>
					</view>
				</view>
			
			</view>
		</view>
		<view v-if="!listDatas.length" class="pagenodata">暂无数据</view>
	</view>
</template>



<script>
	const app = getApp();
	export default {
		data() {
			return {
				id:"",
				listDatas: [],
				page:1,
			}
		},
		methods: {
			getListData(page) {
				app.recorddietList({
					pageNo:page,patientId:this.id,
				}).then(res => {
					if (res.status == 1) {
						if(page!=1&&page>=res.data.pageCount) return;
						this.listDatas = page==1?res.data.list:this.listDatas.concat(res.data.list);
						if(page<=res.data.pageCount) this.page++;
					}
				});
			},
			clickItem(item){
				uni.navigateTo({
					url:'nutrition-record?nutritionInfo='+JSON.stringify(item)
				})
			}

		},
		onLoad(props) {
			this.id = props.id;
			this.getListData(this.page);
		},
		onReachBottom(){
			this.getListData(this.page);
		},

	}
</script>

<style lang="scss" scoped>
	.listitem{
		margin: 24rpx;background:#fff;border-radius: 8rpx;padding:24rpx;font-size: 28rpx;
		.listhead{padding-bottom:16rpx;}
	}
	.container {
		.list-content-box {
			display: flex;
			height: 152rpx;
			border-bottom: 2rpx solid #CFCFCF;
			&:last-child{border:none;}
			.list-img {
				width: 100rpx;
				height: 100rpx;
				background-color: #CFCFCF;
				margin-top: 30rpx;
			}

			.list-msg {
				margin-left: 30rpx;
				margin-top: 30rpx;
				height: 100rpx;flex:1;

				.list-title {
					font-size: 30rpx;
					color: #272727;
				}

				.list-detail {
					margin-top: 10rpx;
					font-size: 28rpx;
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
	.detail-number {
		color: #52A29E;
	}
</style>
