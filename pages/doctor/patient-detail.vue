<template>
	<view class="container">
		<view class="info-box">
			<image :src="infoData.portrait" mode="scaleToFill" class="avator"></image>
			<view class="user-msg-box">
				<view class="name">{{infoData.patientName}}</view>
				<view class="msg">{{infoData.patientGender+' '+infoData.age+'岁 '+infoData.illness}}</view>
			</view>
			<view class="join-time">{{infoData.bindTime+'加入'}}</view>
		</view>
		<view class="line-space"></view>
		<view class="case-tips">病例</view>
		<view class="pic-content-box" v-if="infoData.pathologyUrl">
			<view class="pic-time">{{infoData.blTime+' 添加'}}</view>
			<view class="ccimglist">
				<image v-for="(item,index) in this.infoData.pathologyUrl" :key="index" :src="item" mode="aspectFill" @click="previewImage(index)" :class="(index%3==0)?'imagelistfirst':'imagelist'"></image>
			</view>
		</view>
		<view class="more-case" v-if="infoData.pathologyUrl" @click="moreCase">
			更多病例
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="more-icon"></image>
		</view>
		
		<view class="no-case" v-if="!infoData.pathologyUrl">暂无病例</view>
		
		<view class="case-tips">营养评估</view>
		<view class="listContent" v-if="recordData.id">
			<view class="health-list-item">	
				<view class="health-list-item-avatar-content">
					<image class="health-list-item-avatar" src="../../static/icon/cry_icon.png"></image>
				</view>
				<view class="health-list-item-content">
					<view class="health-list-item-title">{{recordData.result}}</view>
					<view class="health-list-item-detail">{{recordData.phase}}</view>
					<view class="health-list-item-time">{{'测评时间：'+recordData.completeTime}}</view>
					<view class="line" v-if="showDetail"></view>
					<view class="advice-content" v-if="showDetail"> {{'建议： '+recordData.content}}</view>
				</view>
		        <image class="health-list-item-arrow" :src="showDetail?'../../static/icon/right_arrow_top.png':'../../static/icon/right_arrow.png'" mode="widthFix" @click="showDetailMessage"></image>
			</view>
		</view>
		<view class="more-case" v-if="recordData.id" @click="moreRecord">
			更多记录
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="more-icon"></image>
		</view>
		
		<view class="no-nutrition" v-if="!recordData.id">暂无评估</view>
		<view style="height: 100rpx;"></view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				hasCase:true,
				hasNutrition:false,
				list: [1, 2, 3, 4, 5,6,7,8],
				showDetail:false,
				id:1,
				infoData:{},
				recordData:{}
			}
		},
		methods: {
			moreCase(){
				uni.navigateTo({
					url:'doctor-case-list?patientId='+this.id
				})
			},
			moreRecord(){
				uni.navigateTo({
					url:'../patient/evaluation-record?id='+this.id
				})
			},
			previewImage(index) {
				uni.previewImage({
					urls:this.infoData.pathologyUrl,
					current:index
				});
			},
			showDetailMessage(){
				this.showDetail = !this.showDetail;
			},
			//头部信息f
			getDetailInfo(){
				app.patientDetailInfo({id:this.id}).then(res =>{
					if(res.status == 1){
					  this.infoData = res.data;	
					  if(this.infoData.pathologyUrl){
						let pathologyUrl = [];
						let imgItems = this.infoData.pathologyUrl.split(',');
						for(var j=0;j<imgItems.length;j++){
							pathologyUrl.push(app.globalData.baseUrl+imgItems[j]);
						}
						this.infoData.pathologyUrl = pathologyUrl;  
					  }
					  
					}
				});
			},
			//最近一次的记录
			getNearRecord(){
				app.patientNearlyRecord({surveyId:1,userId:this.id}).then(res =>{
					if (res.status == 1){
						this.recordData = res.data;
					}
				});
			}
			
		
		},
		onLoad(props){
			this.id = props.id;
			this.getDetailInfo();
			this.getNearRecord();
		}

	}
</script>

<style lang="scss">
	.container{
		.info-box{
			height: 198rpx;
			display: flex;
			position: relative;
			.avator{
				margin-top: 40rpx;
				background-color: #909399;
				width: 128rpx;
				height: 128rpx;
				border-radius: 50%;
				margin-left: 50rpx;
			}
			.user-msg-box{
				padding-top: 50rpx;
				color: #333333;
				margin-left: 31rpx;
				.name{
					font-size: 20px;
				}
				.msg{
					font-size: 14px;
				}
			}
			.join-time{
				position: absolute;
				right: 50rpx;
				top: 60rpx;
				font-size: 13px;
				color: #999999;
			}
		}
		.line-space{
			background-color: #F7F8F8;
			height: 20rpx;
		}
		.case-tips{
			height: 50rpx;
			padding-top: 20rpx;
			color: #333333;
			font-size: 15px;
			padding-left: 50rpx;
		}
		.pic-content-box {
			.pic-time {
				font-size: 14px;
				color: #666666;
				padding-top: 10rpx;
				padding-left: 44rpx;
			}
			.ccimglist {
				display: flex;
				flex-wrap: wrap;
				margin-left: 44rpx;
				margin-right: 44rpx;
				.imagelistfirst {
					margin-top: 20rpx;
					width: 200rpx;
					height: 200rpx;
					background-color: #D2D2D2;
				}
				.imagelist {
					margin-top: 20rpx;
					width: 200rpx;
					height: 200rpx;
					background-color: #D2D2D2;
					margin-left: 31rpx;
				}
			}
		}
		.more-case{
			font-size: 14px;
			color: #666666;
			margin-left: 50rpx;
			margin-right: 50rpx;
			height: 90rpx;
			line-height: 90rpx;
			border-bottom: 1rpx #DCDCDC solid;
			position: relative;
			.more-icon{
				position: absolute;
				width: 15rpx;
				height: 26rpx;
				right: 0;
				bottom: 35rpx;
			}
		}
		.no-case{
			font-size: 14px;
			color: #666666;
			margin-left: 50rpx;
			margin-right: 50rpx;
			height: 60rpx;
			border-bottom: 1rpx #DCDCDC solid;
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
		.no-nutrition{
			font-size: 14px;
			color: #666666;
			margin-left: 50rpx;
			margin-right: 50rpx;
			height: 60rpx;
		}
	}
</style>
