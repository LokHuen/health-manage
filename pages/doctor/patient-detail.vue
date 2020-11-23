<template>
	<view class="container">
		<view class="info-box">
			<image src="" mode="scaleToFill" class="avator"></image>
			<view class="user-msg-box">
				<view class="name">张小明</view>
				<view class="msg">男 56岁 乳腺癌</view>
			</view>
			<view class="join-time">2020/12/1 加入</view>
		</view>
		<view class="line-space"></view>
		<view class="case-tips">病例</view>
		<view class="pic-content-box" v-if="hasCase">
			<view class="pic-time">2022/12/12 21:09 添加</view>
			<view class="ccimglist">
				<image v-for="(item,index) in list" :key="index" src="" mode="aspectFill" @click="previewImage(index)" :class="(index%3==0)?'imagelistfirst':'imagelist'"></image>
			</view>
		</view>
		<view class="more-case" v-if="hasCase">
			更多病例
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="more-icon"></image>
		</view>
		
		<view class="no-case" v-if="!hasCase">暂无病例</view>
		
		<view class="case-tips">营养评估</view>
		<view class="listContent" v-if="hasNutrition">
			<view class="health-list-item">	
				<view class="health-list-item-avatar-content">
					<image class="health-list-item-avatar" src="../../static/icon/cry_icon.png"></image>
				</view>
				<view class="health-list-item-content">
					<view class="health-list-item-title">可疑或者中度营养不良</view>
					<view class="health-list-item-detail">免疫治疗后</view>
					<view class="health-list-item-time">测评时间：2020/12/12</view>
					<view class="line" v-if="showDetail"></view>
					<view class="advice-content" v-if="showDetail"> 建议： 由营养师、护师或医生进行患者或患者家庭教育，并可根据患者存在的症状和实验室检查的结果进行药物干预。</view>
				</view>
		        <image class="health-list-item-arrow" :src="showDetail?'../../static/icon/right_arrow_top.png':'../../static/icon/right_arrow.png'" mode="widthFix" @click="showDetailMessage"></image>
			</view>
		</view>
		<view class="more-case" v-if="hasNutrition">
			更多记录
			<image src="../../static/icon/more_icon.png" mode="widthFix" class="more-icon"></image>
		</view>
		
		<view class="no-nutrition" v-if="!hasNutrition">暂无评估</view>
		<view style="height: 100rpx;"></view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				hasCase:true,
				hasNutrition:false,
				list: [1, 2, 3, 4, 5,6,7,8],
				showDetail:false,
			}
		},
		methods: {
			previewImage(index) {
				console.log(index);
			},
			showDetailMessage(){
				this.showDetail = !this.showDetail;
			},
		
		},
		created() {

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
