<template>
	<view class="container">
		<view class="flex phonetab">
			<view class="itemlist" @click="tabClick(0)"><text :class="status==0?'on':''">待解读({{mriCount.forCount}})</text></view>
			<view class="itemlist" @click="tabClick(1)"><text :class="status==1?'on':''">解读中({{mriCount.inCount}})</text></view>
			<view class="itemlist" @click="tabClick(2)"><text :class="status==2?'on':''">解读完成({{mriCount.overCount}})</text></view>
		</view>
		<view class="list">
			<view class="item" v-for="item in listData" @click="itemClick(item)">
				<text>{{'体检人：'+item.subjectName}}</text>
				<text>{{'影像类型：'+(item.mriType==1?'X光':(item.mriType==2?'CT':(item.mriType==3?'磁共振':(item.mriType==4?'彩超':'核医学检查'))))}}</text>
				<text>{{'影像出具机构：'+item.mriOrg}}</text>
				<text> {{'出具时间：'+item.mriDate}}</text>
				<text>疾病信息或问题描述：</text>
				<text class="infor">{{item.illness?item.illness:'无'}}</text>
				<text class="time">{{item.createTime}}</text>
			</view>
		</view>
		<view class="empty-box" v-if="listData.length==0">
			<image :src="imageUrl+'/image/no_data.png'" mode="widthFix"></image>
			<text>无数据</text>
		</view>
		<view class="loadMore" v-if="listData.length>0 &&showMore">加载更多...</view>
	</view>
</template>

<script>
	var app = getApp();
	export default {
		data() {
			return {
				imageUrl:this.$imageUrl,
				listData: [{}],
				status: 0,
				pageNo: 1,
		        mriCount:{},
				showMore:false
			}
		},
		onShow(){
			this.getListData();
		},
		onLoad(props) {
			this.status = props.status
		},
		methods: {
			tabClick(status) {
				this.pageNo = 1;
				this.status = status;
				this.getListData();
			},
			itemClick(item){
				console.log(item);
				uni.navigateTo({
					url:'../work-image-detail/work-image-detail?id='+item.id
				})
			},
			getListData(){
				app.interpretList({interpretStatus:this.status,pageNo:this.pageNo,pageSize:10}).then(res=>{
					
					if(res.status===1){
						this.mriCount = res.data.mriCount;
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
		},
		onPullDownRefresh() {
			this.pageNo = 1;
			this.getListData();
		},
		onReachBottom() {
			this.pageNo ++;
			this.getListData();
		},
	}
</script>

<style lang="scss">
	page{
		background-color: #f8f8f8;
	},
	.loadMore {
		font-size: 30upx;
		color: #555;
		margin-bottom: 20upx;
		text-align: center;
	},
	.container {
		position: relative;
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

		.flex {
			display: flex;
			align-items: center;
			flex-wrap: wrap;
		}

		.phonetab {
			width: 100%;
			position:sticky;
			z-index: 999;
			background: #FFFFFF;
			top: 0;
			height: 100rpx;
			.itemlist {
				width: 33%;
				text-align: center;
				text {
					font-size: 32rpx;
					color: #343434;
					border-bottom: 4rpx solid transparent;
					padding-bottom: 10rpx;
				}

				.on {
					color: #2894EC;
					border-color: #2894EC;
				}
			}
		}

		.empty-box {
			display: flex;
			flex-direction: column;
			align-items: center;

			image {
				margin-top: 140rpx;
				width: 250rpx;
				height: 240rpx;
			}

			text {
				color: #999999;
				font-size: 34rpx;
			}
		}

	}
</style>
