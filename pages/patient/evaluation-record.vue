<template>
	
	<view>
		<view class="flex tips">
			<image src="../../static/icon/remind_icon.png" mode="widthFix" class="remind"></image> 
			<view class="remind-tips">根据患者膳食营养处方专家共识说明，建议您每周进行一次营养状况评估。<image src="../../static/icon/wenhaoIcon.png" class="question" mode="widthFix" @click="$refs.popup.open()"></image></view>
		</view>
		
		<view class="nodata-tips-box" v-if="listDatas.length==0">
			<image src="../../static/icon/icon_nodata.png" mode="aspectFit" class="nodata-img"></image>
			<view class="tip-title">暂无数据</view>
		</view>
        
		<view class="listContent" v-for="(item, index) in listDatas" :key="index" v-if="listDatas.length!=0">
			<view class="health-list-item" @click="toanswerlist(item)">
				<view class="health-list-item-avatar-content">
					<image class="health-list-item-avatar" :src="item.result=='营养良好'?'../../static/icon/smile.png':'../../static/icon/cry_icon.png'"></image>
				</view>
				<view class="health-list-item-content">
					<view class="health-list-item-title">{{item.result}}</view>
					<view class="health-list-item-time">{{(item.surveyType==0?'评估工具：':'筛查工具')+item.surveyName}}</view>
					<view class="health-list-item-time">{{(item.surveyType==0?'评估时间：':'筛查时间')+item.completeTime}}</view>
					<view class="health-list-item-detail" v-if="item.surveyType==0">治疗阶段：{{item.phase}} </view>
					
					<view class="line" v-if="item.showDetail"></view>
					<view class="advice-content">
						<view style="width: 140rpx;">
							建议内容：
						</view>
						<rich-text :nodes="item.content"  v-if="item.showDetail" style="line-height: 40rpx;"></rich-text>
					</view>
					
				</view>
                <image class="health-list-item-arrow" :src="item.showDetail?'../../static/icon/right_arrow_top.png':'../../static/icon/right_arrow.png'" mode="widthFix" @click.stop="onClickItem(item)" v-show="false"></image>
			</view>
		</view>
		<view style="height: 100px;"></view>
		<uni-popup ref="popup" type="bottom">
			<view class="testbox" style="padding-top:30rpx;background:#fff;border-radius:20rpx 20rpx 0 0;">
			<view >建议测评周期</view>
			<view >重度营养不良：1次/1周</view>
			<view >中度营养不良：1次/1-2周</view>
			<view >可疑或轻度营养不良： 1次/2周-4周</view>
			<view >无营养不良： 1次/4周-12周</view>
			</view>
		</uni-popup>
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
				app.loading();
				app.memberReplyRecordList({pageNo:this.pageNo,userId:this.id}).then(res =>{
					app.loaded();
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
						this.listDatas[i].showDetail = true;
						if(this.listDatas[i].content) this.listDatas[i].content=this.listDatas[i].content.replace(/\<span/gi, '<span class="richtext"');
					}
					uni.stopPullDownRefresh();
				});
			},
			toanswerlist(item){
				uni.navigateTo({
					url:"/pages/patient/answer?id="+item.id+'&surveyId='+item.surveyId
				})
			},
		}
	}
	
</script>


<style lang="scss">	
	.testbox{padding:40rpx 40rpx;}
	.question{width:30rpx;}
    .tips{
		margin-left: 50rpx;
		margin-right: 50rpx;
		display: flex;align-items:unset;
		padding-top: 35rpx;
		.remind{
			width: 35rpx;
			height: 35rpx;
			margin-top: 10rpx;
		}
		.remind-tips{
			margin-left: 10rpx;flex:1;
			color: #333333;
			font-size: 15px;
			line-height: 50rpx;
		}
		
	}
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
					color: #52A29E;font-weight:600;
				}
				
				.health-list-item-detail {
					color: #999999;
					font-size: 26rpx;
					margin-top: 10rpx;
					padding-bottom: 10rpx;
				}
				
				.health-list-item-time {
					color: #666666;
					font-size: 26rpx;
					margin-top: 10rpx;
					padding-bottom: 0rpx;
				}
				.line{
					background-color: #CCCCCC;
					height: 2rpx;
					margin-right: 20rpx;
				}
				.advice-content{
					display: flex;
					font-size: 24rpx!important;
					color: #666666;
					padding: 20rpx 20rpx 0 0;
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
