<template>
	<!-- 医生营养管理界面 -->
	<view class="container">
		<view class="top-box">
			
			<view class="info-box">
				<image src="" mode="scaleToFill" class="avator"></image>
				<view class="user-msg-box">
					<view class="name-box">
						<view class="name">张小明</view>
						<view class="position">主任医师</view>
					</view>
					<view class="msg">中山一院乳腺内科</view>
				</view>
			</view>
			<view class="number-box">
				<view class="count-box">
					<view class="all-count">106</view>
					<view class="count-tip">总患者数</view>
				</view>
				
				<view class="line-vertical"></view>
				
				<view class="count-box">
					<view class="test-count">31</view>
					<view class="count-tip">测评患者数</view>
				</view>
			</view>
			
		</view>
		
		<view class="line-space"></view>
		<view class="screen-box">
			<view class="all-patien-box" @click="patienScreen">
				<view class="all-patien">全部患者</view>
				<image class="all-arrow" src="../../static/icon/right_arrow.png" mode="widthFix"></image>
			</view>
			<view class="all-patien-box" @click="timeScreen">
				<view class="all-patien">按测评时间排序</view>
				<image class="all-arrow" src="../../static/icon/right_arrow.png" mode="widthFix"></image>
			</view>
        </view>
		
		<view class="listContent" v-for="(item,index) in listDatas" :key="index">
			<view style="height: 30rpx; background-color: #FFFFFF;" v-if="index!=0"></view>
			<view class="msg-box">
				<image class="avator-box" src="" mode="widthFix"></image>
				<view class="msg-info-box">
					<view class="msg-info-name">{{item.name}}</view>
					<view class="msg-info-detail">{{item.msg}}</view>
				</view>
			</view>
			<view class="line"></view>
			
			<!-- 健康信息 -->
			<view class="health-list-item" v-if="item.showRecord">	
				<view class="health-list-item-avatar-content">
					<image class="health-list-item-avatar" src="../../static/icon/cry_icon.png"></image>
				</view>
				<view class="health-list-item-content">
					<view class="health-list-item-title">可疑或者中度营养不良</view>
					<view class="health-list-item-detail">免疫治疗后</view>
					<view class="health-list-item-time">测评时间：2020/12/12</view>
					
				</view>
		        
			</view>
			
			<view class="no-record-tips" v-if="!item.showRecord">暂无测评记录</view>
		</view>
		<view style="height: 100px;" ></view>
		
        <uni-popup ref="popupPatient" type="bottom">
        	<!-- 选择患者 -->
        	<view class="white-background-patient">
				<view class="first-item">资料已完善的患者</view>
				<view class="lines"></view>
				<view class="second-item">全部患者</view>
				<view class="liness"></view>
				<view class="cancel" @click="closePatienScreen">取消</view>
			</view>
        </uni-popup>
		
		<uni-popup ref="popupTime" type="bottom">
			<!-- 选择时间 -->
			<view class="white-background-patient">
				<view class="first-item">按患者加入时间排序</view>
				<view class="lines"></view>
				<view class="second-item">按测评时间排序</view>
				<view class="liness"></view>
				<view class="cancel" @click="closeTimeScreen">取消</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
    const app = getApp();
	export default {
		data() {
			return {
				doctorInfo:{},
				listDatas:[
					{
							id:101,
							title:"可疑或中度营养不良",
							detail:"免疫治疗后",
							time:"2020/12/1 12:23",
							showRecord:true,
							name:"张小名",
							msg:'男 56岁 乳腺癌'
						}, {
							id:102,
							title:"可疑或中度营养不良",
							detail:"免疫治疗后",
							time:"2020/12/2 12:23",
							showRecord:false,
							name:"小红花",
							msg:'男 56岁 乳腺癌'
						},{
							id:103,
							title:"可疑或中度营养不良",
							detail:"免疫治疗后",
							time:"2020/12/3 12:23",
							showRecord:true,
							name:"小哥哥",
							msg:'男 56岁 乳腺癌'
						}
				]
				
			}
		},
		methods: {
			patienScreen(){
				this.$refs.popupPatient.open();
			},
	        closePatienScreen(){
				this.$refs.popupPatient.close();
			},
			timeScreen(){
				this.$refs.popupTime.open();
			},
			closeTimeScreen(){
				this.$refs.popupTime.close();
			},
		    getDoctorInfo(){
				app.doctorInfo({}).then(res =>{
					if(res ==1){
						this.doctorInfo = res.data;
					}
				});
			}
		   
		},
		onLoad(){
			this.getDoctorInfo();
		}
		

	}
</script>

<style lang="scss">
	.container{
		.top-box{
			.info-box{
				display: flex;
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
					.name-box{
						display: flex;
						.name{
							font-size: 20px;
						}
						.position{
							font-size: 14px;
							margin-left: 10rpx;
							margin-top: 13rpx;
						}
						
					}
					.msg{
						margin-top: 10rpx;
						font-size: 14px;
					}
				}
			}
			.number-box{
				margin-top: 30rpx;
				margin-left: 50rpx;
				margin-right: 50rpx;
				margin-bottom: 40rpx;
				height: 176rpx;
                box-shadow: 0px 0px 27px 0px rgba(0, 0, 0, 0.08);
				display: flex;
				.count-box{
					width: 49%;
					font-size: 13px;
                    color: #333333;
					text-align: center;
					align-items: center;
					.all-count{
						padding-top: 30rpx;
						color: #52A29E;
						font-size: 25px;
					}
					.test-count{
						padding-top: 30rpx;
						color: #F8BD63;
						font-size: 25px;
					}
					.count-tip{
						
					}
				}
				.line-vertical{
					margin-top: 45rpx;
					width: 1rpx;
					height: 100rpx;
					background-color: #E5E5E5;
				}
			}
			
		}
		
		.line-space{
			background-color: #F7F8F8;
			height: 20rpx;
		}
		.screen-box{
			display: flex;
			height: 100rpx;
			color: #333333;
			font-size: 15px;
			.all-patien-box{
				display: flex;
				height: 100rpx;
				align-items: center;
				margin-left: 50rpx;
				.all-patien{
					line-height: 100rpx;
				}
				.all-arrow{
					margin-left: 10rpx;
					width: 27rpx;
					height: 15rpx;
				}
				
			}
		}
		
		.listContent {
			margin-left: 50rpx;
			margin-right: 50rpx;
			background-color: #F7F8F8;
			.msg-box{
				height: 170rpx;
				display: flex;
				.avator-box{
					width: 100rpx;
					height: 100rpx;
					margin-top: 40rpx;
					margin-left: 23rpx;
					border-radius: 50%;
					background-color: #CCCCCC;
				}
				.msg-info-box{
					margin-left: 27rpx;
					margin-top: 50rpx;
					color: #333333;
					.msg-info-name{
						font-size: 16px;
					}
					.msg-info-detail{
						font-size: 13px;
					}
				}
			}
			.line{
				background-color: #CCCCCC;
				height: 2rpx;
				margin-right: 20rpx;
				margin-left: 20rpx;
			}
			.no-record-tips{
				margin-top: 29rpx;
				margin-left: 20rpx;
				color: #999999;
				font-size: 13px;
				padding-bottom: 40rpx;
			}
			.health-list-item {
				position: relative;
				margin-top: 0rpx;
				display: flex;
				.health-list-item-avatar-content{
					.health-list-item-avatar {
						margin-left: 20rpx;
						margin-top: 25rpx;
						width: 45rpx;
						height: 45rpx;
						border-radius: 50%;
					}
				}
				.health-list-item-content {
					margin-left: 15rpx;
					margin-top: 25rpx;
					padding-bottom: 40rpx;
		            width: 100%;
					.health-list-item-title {
						font-size: 30rpx;
						color: #52A29E;
					}
					
					.health-list-item-detail {
						color: #999999;
						font-size: 26rpx;
						margin-top: 15rpx;
					}
					
					.health-list-item-time {
						color: #666666;
						font-size: 26rpx;
						margin-top: 20rpx;
						padding-bottom: 10rpx;
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
	
		.white-background-patient{
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;
			color: #333333;
			font-size: 15px;
			.first-item{
				height: 120rpx;
				line-height: 120rpx;
			}
			.lines{
				height: 2rpx;
				margin-left: 200rpx;
				margin-right: 200rpx;
				background-color: #DCDCDC;
			}
			.second-item{
				height: 128rpx;
				line-height: 128rpx;
			}
			.liness{
				height: 20rpx;
				background-color: #F6F6F6;
			}
			.cancel{
				height: 100rpx;
				line-height: 100rpx;
			}
		}

	}
	
</style>
