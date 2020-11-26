<template>
	
	<view>
		<view class="nodata-tips-box" v-if="listDatas.length==0">
			<image src="../../static/icon/icon_nodata.png" mode="aspectFit" class="nodata-img"></image>
			<view class="tip-title">暂无数据</view>
		</view>
        
		<view class="listContent" v-for="(item, index) in listDatas" :key="index" v-if="listDatas.length!=0">
			<view class="health-list-item">	
				<view class="health-list-item-avatar-content">
					<image class="health-list-item-avatar" src="../../static/icon/cry_icon.png"></image>
				</view>
				<view class="health-list-item-content">
					<view class="health-list-item-title">{{item.result}}</view>
					<view class="health-list-item-detail">{{item.phase}} </view>
					<view class="health-list-item-time">测评时间：{{item.completeTime}}</view>
					<view class="line" v-if="item.showDetail"></view>
					<view class="advice-content" v-if="item.showDetail">{{'建议：'+item.content}}</view>
				</view>
                <image class="health-list-item-arrow" :src="item.showDetail?'../../static/icon/right_arrow_top.png':'../../static/icon/right_arrow.png'" mode="widthFix" @click="onClickItem(item)"></image>
			</view>
		</view>
		<view style="height: 100px;"></view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				id:1,
				pageNo:1,
				listDatas:[]
			}
		},
		onLoad(props){
			this.id = props.id;
			this.pageNo = 1;
			this.getRecordData();
		},
		onPullDownRefresh() {
			this.pageNo = 1;
			this.getRecordData();
		},
		onReachBottom() {
			this.pageNo ++;
			this.getRecordData();
		},
		methods:{
			onClickItem(item) {
				item.showDetail = !item.showDetail;
				this.$forceUpdate();
			},
		    getRecordData(){
				app.memberReplyRecordList({surveyId:1,pageNo:this.pageNo,userId:this.id}).then(res =>{
					if(res.status===1){
						if(this.pageNo==1){
							this.listDatas = res.data;
						}else{
							if(res.data.pageList.pageCount>this.pageNo){
								this.listDatas = this.listDatas.concat(res.data);
							}
						}
					}
					for (var i = 0; i < this.listDatas.length; i++) {
						this.listDatas[i].showDetail = false;
					}
					uni.stopPullDownRefresh();
				});
			}
		}
	}
	
</script>


<style lang="scss">	
    .nodata-tips-box{
		margin-top: 80rpx;
		text-align: center;
		.nodata-img{
			width: 171rpx;
			height: 193rpx;
		}
	}
    
	.listContent {
		margin-top: 20rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
		background-color: #F7F8F8;
		.health-list-item {
			position: relative;
			margin-top: 30rpx;
			display: flex;
			.health-list-item-avatar-content{
				.health-list-item-avatar {
					margin-left: 20rpx;
					margin-top: 40rpx;
					width: 45rpx;
					height: 45rpx;
					border-radius: 50%;
				}
			}
			.health-list-item-content {
				margin-left: 15rpx;
				margin-top: 40rpx;
				padding-bottom: 40rpx;
                width: 100%;
				.health-list-item-title {
					font-size: 30rpx;
					color: #52A29E;
				}
				
				.health-list-item-detail {
					color: #999999;
					font-size: 26rpx;
					margin-top: 20rpx;
				}
				
				.health-list-item-time {
					color: #666666;
					font-size: 26rpx;
					margin-top: 30rpx;
					padding-bottom: 10rpx;
				}
				.line{
					background-color: #CCCCCC;
					margin-top: 15rpx;
					height: 2rpx;
					margin-right: 20rpx;
				}
				.advice-content{
					font-size: 11px;
					color: #666666;
					margin-top: 20rpx;
                    padding-bottom: 10rpx;
				}
			}
			.health-list-item-arrow {
				position: absolute;
				width: 35rpx;
				height: 19rpx;
				right: 20rpx;
				top: 120rpx;
			
			}
		}
	}
</style>
