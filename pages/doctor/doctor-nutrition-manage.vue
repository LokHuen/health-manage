<template>
	<!-- 医生营养管理界面 -->
	<view class="container">
		<view class="top-box">
			
			<view class="info-box">
				<image :src="doctorInfo.portrait" mode="scaleToFill" class="avator"></image>
				<view class="user-msg-box">
					<view class="name-box">
						<view class="name">{{doctorInfo.doctorName}}</view>
						<view class="position">{{doctorInfo.technicalTitle}}</view>
					</view>
					<view class="msg">{{doctorInfo.hospital+doctorInfo.department}}</view>
				</view>
			</view>
			<view class="number-box">
				<view class="count-box">
					<view class="all-count">{{doctorInfo.patientCount}}</view>
					<view class="count-tip">总患者数</view>
				</view>
				
				<view class="line-vertical"></view>
				
				<view class="count-box">
					<view class="test-count">{{doctorInfo.surveyCount}}</view>
					<view class="count-tip">测评患者数</view>
				</view>
			</view>
			
		</view>
		
		<view class="line-space"></view>
		<view class="screen-box">
			<view class="all-patien-box" @click="patienScreen">
				<view class="all-patien">{{hasInfor==2?'全部患者':'资料已完善的患者'}}</view>
				<image class="all-arrow" src="../../static/icon/right_arrow.png" mode="widthFix"></image>
			</view>
			<view class="all-patien-box" @click="timeScreen">
				<view class="all-patien">{{orderBy==1?'按测评时间排序':'按患者加入时间排序'}}</view>
				<image class="all-arrow" src="../../static/icon/right_arrow.png" mode="widthFix"></image>
			</view>
        </view>
		
		<view class="listContent" v-for="(item,index) in listDatas" :key="index" @click="select(item)">
			<view style="height: 30rpx; background-color: #FFFFFF;" v-if="index!=0"></view>
			<view class="msg-box">
				<image class="avator-box" :src="item.portrait" mode="widthFix"></image>
				<view class="msg-info-box">
					<view class="msg-info-name">{{item.patientName}}</view>
					<view class="msg-info-detail">{{item.patientGender==1?'男':'女'+' '+item.age+'岁'+item.illness}}</view>
				</view>
			</view>
			<view class="line"></view>
			
			<!-- 健康信息 -->
			<view class="health-list-item" v-if="item.result">	
				<view class="health-list-item-avatar-content">
					<image class="health-list-item-avatar" :src="item.portrait"></image>
				</view>
				<view class="health-list-item-content">
					<view class="health-list-item-title">{{item.result}}</view>
					<view class="health-list-item-detail">{{item.phase}}</view>
					<view class="health-list-item-time">{{'测评时间：'+item.completeTime}}</view>
					
				</view>
		        
			</view>
			
			<view class="no-record-tips" v-if="!item.result">暂无测评记录</view>
		</view>
		<view style="height: 100px;" ></view>
		
        <uni-popup ref="popupPatient" type="bottom">
        	<!-- 选择患者 -->
        	<view class="white-background-patient">
				<view class="first-item" @click="selecgtInfo(1)">资料已完善的患者</view>
				<view class="lines"></view>
				<view class="second-item" @click="selecgtInfo(2)">全部患者</view>
				<view class="liness"></view>
				<view class="cancel" @click="closePatienScreen">取消</view>
			</view>
        </uni-popup>
		
		<uni-popup ref="popupTime" type="bottom">
			<!-- 选择时间 -->
			<view class="white-background-patient">
				<view class="first-item" @click="selectOrderBy(2)">按患者加入时间排序</view>
				<view class="lines"></view>
				<view class="second-item" @click="selectOrderBy(1)">按测评时间排序</view>
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
				hasInfor:2,//是否完善资料（1：已经完善资料患者，2：全部患者）
				orderBy:1,// 排序方式（测评时间排序 1，加入时间排序2）
				pageNo:1,
				doctorInfo:{},
				listDatas:[]
				
			}
		},
		methods: {
			select(item){
				uni.navigateTo({
					url:'patient-detail?id='+item.id
				});
			},
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
			selecgtInfo(hasInfor){
				//是否完善资料（1：已经完善资料患者，2：全部患者）
				this.closePatienScreen();
			    if(this.hasInfor != hasInfor){
					this.hasInfor = hasInfor;
					this.refreshData();
				}
			},
			selectOrderBy(orderBy){
				//排序方式（测评时间排序 1，加入时间排序2）
				this.closeTimeScreen();
				if(this.orderBy != orderBy){
					this.orderBy = orderBy;
					this.refreshData();
				}
			},
		    getDoctorInfo(){
				app.doctorInfo({}).then(res =>{
					if(res.status ==1){
						this.doctorInfo = res.data;
					}
				});
			},
			refreshData(){
			    this.pageNo = 1;
				this.getListData();
			},
			loadMoreData(){
			    this.pageNo ++;	
				this.getListData();
			},
			getListData(){
				app.patientListInfo({
					pageNo:this.pageNo,
					hasInfor:this.hasInfor,
					orderBy:this.orderBy
				}).then(res =>{
					if(res.status===1){
						if(this.pageNo===1){
							this.listDatas = res.data.list;
						}else{
							if(res.data.pageList.pageCount>this.pageNo){
								this.listDatas = this.listDatas.concat(res.data.list);
							}
						}
					}
					uni.stopPullDownRefresh();
				});
			}
		   
		},
		onLoad(){
			this.getDoctorInfo();
			this.refreshData();
		},
		onPullDownRefresh() {
			this.refreshData();
		},
		onReachBottom() {
			this.loadMoreData();
		},
		

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
