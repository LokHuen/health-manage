<template>
	<view class="container">
		<view class="pagebackground"></view>
		<view class="listitem">
			<view class="listhead">2021年2月1日 早餐 <view style="padding-top:8rpx;">共摄入 <text class="detail-number">1998.21千卡能量  21.2克碳水</text></view></view>
			<view class="list-content-box" v-for="(item,index) in listDatas" :key="index" @click="clickItem(item)">
				<image :src="item.pic" mode="widthFix" class="list-img"></image>
				<view class="list-msg">
					<view class="list-title flex">
						<view style="flex:1;">{{item.name}}</view>
						<view>800g</view>
					</view>
					<view class="list-detail">
						<view class="list-detail-tip"> {{'每'+item.ediblePart+'克含'}} </view>
						<view class="list-detail-number">{{item.energy}}</view>
						<view class="list-detail-tip"> 千卡 </view>
						<view class="list-detail-number">{{item.carbohydrate?item.carbohydrate:0}} </view>
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
		onLoad(props) {
			this.id = props.id;
			this.getListData();
		}

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
