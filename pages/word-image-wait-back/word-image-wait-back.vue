<template>
	<view>
		<view class="list">
			<view class="item" v-for="item in listData" @click="itemClick(item)">
				<text>{{'体检人：'+item.subjectName}}</text>
				<text>{{'影像类型：'+(item.mriType==1?'X光':(item.mriType==2?'CT':(item.mriType==3?'磁共振':(item.mriType==4?'彩超':'核医学检查'))))}}</text>
				<text>{{'影像出具机构：'+item.mriOrg}}</text>
				<text>{{'出具时间：'+item.mriDate}}</text>
				<text>疾病信息或问题描述：</text>
				<text class="infor">{{item.illness?item.illness:'无'}}</text>
				<text class="time">{{item.createTime}}</text>
			</view>
		</view>
		
		<view class="empty-box" v-if="listData.length==0">
			<image :src="imageUrl+'/image/no_data.png'"></image>
			<text>无数据</text>
		</view>
		<view class="loadMore" v-if="listData.length>0 && showMore">加载更多...</view>
	</view>
</template>

<script>
	var app = getApp();
	export default {
		data() {
			return {
				imageUrl:this.$imageUrl,
				listData: [],
				pageNo: 1,
				showMore:false
			}
		},
		onLoad() {
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
		methods: {
			itemClick(item){
				console.log(item);
				uni.navigateTo({
					url:'../work-image-detail/work-image-detail?id='+item.id
				})
			},
			getListData(){
				app.interpretList({pageNo:this.pageNo,pageSize:10,postBackStatus:0,interpretStatus:2}).then(res=>{
					
					if(res.status===1){
						if(this.pageNo===1){
							this.listData = res.data.pageList.list;
						}else{
							if(res.data.pageList.pageCount>this.pageNo){
								this.listData = this.listData.concat(res.data.pageList.list);
							}
						}
						this.showMore = res.data.pageList.pageNo < res.data.pageList.pageCount;
					}
					console.log(this.listData)
					uni.stopPullDownRefresh();
				});
			}
		}
	}
</script>

<style lang="scss">
	.loadMore {
		font-size: 30upx;
		color: #555;
		margin-bottom: 20upx;
		text-align: center;
	}
	.empty-box {
		display: flex;
		flex-direction: column;
		align-items: center;
	
		image {
			margin-top: 140rpx;
			width: 370rpx;
			height: 240rpx;
		}
	
		text {
			color: #999999;
			font-size: 34rpx;
		}
	}
.list {
			padding-top: 40rpx;
			.item {
				position: relative;
				display: flex;
				flex-direction: column;
				background-color: #FFFFFF;
				border-radius: 10rpx;
				margin: 0rpx 40rpx 40rpx 40rpx;
				padding: 30rpx 30rpx 40rpx 30rpx;
				box-shadow: 0px 0px 9px 1px rgba(0, 0, 0, 0.18);

				text {
					font-size: 30rpx;
					color: #333333;
					margin-top: 10rpx;
				}

				.infor {
					color: #999999;
				}

				.time {
					position: absolute;
					right: 30rpx;
					font-size: 26rpx;
					color: #666666;
				}
			}
		}
</style>
