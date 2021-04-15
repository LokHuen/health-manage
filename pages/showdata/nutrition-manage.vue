<template>
	<!-- 医生营养管理 2.0版本  4月13号-->
	<view class="container">
		<view class="top-tips" @click="turnback">
			退出演示环境，回到我的页面
			<image src="../../static/tuichu.png" mode="aspectFill" class="tuichu"></image>
		</view>
		<image src="../../static/warnshow.jpg" mode="widthFix" class="banner" @click="towarnpage"></image>
		<view class="condition-box flex">
			<view :class="selectIndex==1?'chose':'unchose'" @click="select(1)">
				我的患者
				<view :class="selectIndex==1?'bottomline':''"></view>
			</view>

			<view :class="selectIndex==2?'chose':'unchose'" @click="select(2)">
				科室患者
				<view :class="selectIndex==2?'bottomline':''"></view>
			</view>
		</view>
		<view class="count-box">
			<view class="count-item">
				<view class="count-item-number" @click="toPatientList(0,0)">
					{{selectIndex==1?doctorInfo.patientCount:doctorInfo.depPatientCount}}
				</view>
				<view class="">
					总患者数
				</view>
			</view>
			<view class="flex">
				<view class="count-item1" @click="toPatientList(0,1)">
					<text class="count-item1-tip">本月新增</text>
					<text class="count-item1-number">{{selectIndex==1?doctorInfo.monthPatientCount:doctorInfo.depPatientCountOfMonth}}</text>
				</view>
				
				<view class="count-item1" @click="toPatientList(0,2)">
					<text class="count-item1-tip">本周新增</text>
					<text class="count-item1-number">{{(selectIndex==1?doctorInfo.weekPatientCount:doctorInfo.depPatientCountOfWeek)||0}}</text>
				</view>
				
				<view class="count-item1" @click="toPatientList(0,3)">
					<text class="count-item1-tip">本日新增</text>
					<text class="count-item1-number">{{(selectIndex==1?doctorInfo.dayPatientCount:doctorInfo.depPatientCountOfDay)||0}}</text>
				</view>
			</view>
			
		</view>
		<view class="detail-box">
			<view class="detail-title">
				患者营养状况
				<image src="../../static/iconfontwenhao.png" mode="aspectFill" class="ask" @click="openNutritioninfo2"></image>
			</view>
			<view class="detali-list-box">
				<view class="detali-list-item" @click="toPatientList(1,0)">
					<view>
						<text class="detail1"><text class="detail1">{{selectIndex==1?doctorInfo.surveyResult4:doctorInfo.depSurveyReslt4}}</text></text>
						<text class="detail2">人</text>
					</view>
					<view class="detali-name">重度营养不良</view>
				</view>
				<view class="detali-list-item" @click="toPatientList(1,1)">
					<view>
						<text class="detail1">{{selectIndex==1?doctorInfo.surveyResult3:doctorInfo.depSurveyReslt3}}</text>
						<text class="detail2">人</text>
					</view>
					<view class="detali-name">中度营养不良</view>
				</view>

				<view class="detali-list-item" style="border-right: 0rpx solid #fff;" @click="toPatientList(1,2)">
					<view>
						<text class="detail1">{{selectIndex==1?doctorInfo.surveyResult2:doctorInfo.depSurveyReslt2}}</text>
						<text class="detail2">人</text>
					</view>
					<view class="detali-name">可疑营养不良</view>
				</view>
			</view>
		</view>


		<view class="detail-box">
			<view class="detail-title">
				营养干预情况
				<image src="../../static/iconfontwenhao.png" mode="aspectFill" class="ask" @click="openNutritioninfo1"></image>
			</view>
			<view class="detali-list-box">
				<view class="detali-list-item" @click="toPatientList(2,0)">
					<view>
						<text class="detail1">{{selectIndex==1?doctorInfo.noIntervene:doctorInfo.depNoIntervene}}</text>
						<text class="detail2">人</text>
					</view>
					<view class="detali-name">未干预</view>
				</view>
				
				<view class="detali-list-item" @click="toPatientList(2,2)">
					<view>
						<text class="detail1">{{selectIndex==1?doctorInfo.intervene:doctorInfo.depIntervene}}</text>
						<text class="detail2">人</text>
					</view>
					<view class="detali-name">干预中</view>
				</view>
				
				<view class="detali-list-item" style="border-right: 0rpx solid #fff;" @click="toPatientList(2,1)">
					<view>
						<text class="detail1">{{selectIndex==1?doctorInfo.intervened:doctorInfo.depIntervened}}</text>
						<text class="detail2">人</text>
					</view>
					<view class="detali-name">停止干预</view>
				</view>

				
			</view>
		</view>
		<view style="height: 100rpx;"></view>

		<uni-popup ref="nutritioninfo1" type="center">
			<view class="nutritioninfo">
				<view style="height: 50rpx;"></view>
				<!-- <view class="tips-title">营养干预情况说明</view>
				<view class="tips-sub">
					<view class="list">
						<text class="main">未干预：</text>患者未在本平台上购买过ONS产品。
					</view>
					<view class="list">
						<text class="main">干预中：</text>患者在最近30天内有买过ONS产品。
					</view>
					<view class="list">
						<text class="main">已停止干预：</text>患者在30天前有买过ONS产品，但最近30天内未有购买记录。
					</view>
				</view>
				<view class="flex ct warnbox">
					<image class="warnimg" src="../../static/icon/remind_icon2.png" mode="widthFix" style=""></image>
					干预情况依据本平台数据判断，存在局限性
				</view> -->
				<view class="tips-sub">
					患者营养干预信息，来自于患者日常饮食记录和随访专员定期回访，以患者口服营养产品（即ONS类产品）为主，如实记录。
				</view>
				<view class="tips-close" @click="$refs.nutritioninfo1.close()">关闭</view>
				<view style="height: 50rpx;"></view>
			</view>
		
		</uni-popup>
		
		
		
		<uni-popup ref="nutritioninfo2" type="center">
			<view class="nutritioninfo">
				<view style="height: 50rpx;"></view>
				<!-- <view class="tips-title">患者营养状况说明</view>
				<view class="tips-sub">
					<view class="listother">依据PG-SGA营养状况评估体系，根据评估得分做判断：</view>
					<view class="listother">0-1分，无营养不良；</view>
					<view class="listother">2-3分，可疑营养不良；</view>
					<view class="listother">4-8分，中度营养不良；</view>
					<view class="listother">>=9分，重度营养不良。</view>
					<view class="listother">依据SGA营养状况评估体系，根据评分判断等级：</view>
					<view class="listother">营养良好、轻-中度营养不良、重度营养不良</view>
		
				</view> -->
				<view class="tips-sub">患者营养状况信息，来自于患者进行PG-SGA营养状况评估或SGA营养状况评估结果。</view>
		
				<view class="tips-close" @click="$refs.nutritioninfo2.close()">关闭</view>
				<view style="height: 50rpx;"></view>
			</view>
		
		</uni-popup>
		<tabbar :now="0" :real="false" :hide="2"></tabbar>
	</view>
	
</template>

<script>
	const app = getApp();
	import tabbar from "../../components/tabbar.vue"
	export default {
		components:{tabbar},
		data() {
			return {
				selectIndex: 1,
				doctorInfo:''
			}
		},
		onLoad() {
			this.getDoctorInfo();
		},
		methods: {
			toPatientList(index,secondIndex){
				
				// surveyResultText：重度营养不良，中度营养不良，可疑营养不良
				// surveyResult：4，3，2
				// isBuyText：未干预，干预中，停止干预
				// isBuy：1，2，3
				//queryType;// 1本周  0本日
			  let queryType = ''
			  let isDepartmentIcu = 1;
			  let isDept = this.selectIndex==1?0:1;
			  let month = '';
			  let surveyResultText ='';
			  let surveyResult ='';
			  let isBuyText ='';
			  let isBuy = '';
			  if(index==0){
				  if(secondIndex == 1){
					  //月份
					 let nowDate = new Date();
					 month = nowDate.getFullYear()+'-'+(nowDate.getMonth()>8?(nowDate.getMonth()+1):('0'+(nowDate.getMonth()+1)))
				  }else if(secondIndex == 2){
					  queryType = 'week';
				  }else if(secondIndex == 3){
					  queryType = 'day';
				  }
			  }else if(index == 1){
				  if(secondIndex==0){
					  surveyResultText = '重度营养不良';
					  surveyResult = 4;
				  }else if(secondIndex==1){
					  surveyResultText = '中度营养不良';
					  surveyResult = 3;
				  }else{
					  surveyResultText = '可疑营养不良';
					  surveyResult = 2;
				  }
			  }else{
				  if(secondIndex==0){
					  isBuyText ='未干预';
				      isBuy = 1;	  
				  }else if(secondIndex==1){
				  			isBuyText ='停止干预';
				  			isBuy = 3;			  
				  }else{
				  		
						 isBuyText ='干预中';
						 isBuy = 2;	
				  }
			  }
			  
				uni.navigateTo({
					url:'../doctor/patient-list?isDepartmentIcu='+isDepartmentIcu+'&month='+month+'&surveyResultText='+surveyResultText+
					'&surveyResult='+surveyResult+'&isBuyText='+isBuyText+'&isBuy='+isBuy+'&queryType='+queryType+'&selfName='+this.doctorInfo.doctorName+
					'&isDept='+isDept
				})
			},
			select(index) {
				!this.selectIndex == index ? '' : this.selectIndex = index;
			},
			openNutritioninfo1(){
				this.$refs.nutritioninfo1.open();
			},
			openNutritioninfo2(){
				this.$refs.nutritioninfo2.open();
			},
			getDoctorInfo(){
				app.doctorShowInfo().then(res =>{
					if(res.status == 1){
						this.doctorInfo = res.data;
					}
				})
			},
			towarnpage(){
				uni.navigateTo({
					url:"/pages/doctor/warn"
				})
			},
			turnback(){
				uni.navigateBack({
					
				})
			}

		}
	}
</script>

<style lang="scss">
	page {
		background-color: #F5F6F6;
	}

	.container {
		.top-tips {
			margin-top: 38rpx;
			margin-left: 35rpx;
			margin-right: 35rpx;
			height: 86rpx;
			line-height: 86rpx;
			background: #52A29E;
			border-radius: 10rpx;
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			padding-left: 40rpx;
			position: relative;

			.tuichu {
				position: absolute;
				right: 40rpx;
				height: 26rpx;
				width: 26rpx;
				top: 30rpx;

			}
		}

		.banner {
			margin-top: 83rpx;
			width: 100%;
		}

		.condition-box {
			height: 107rpx;
			line-height: 107rpx;
			margin-left: 200rpx;
			margin-right: 200rpx;
			text-align: center;

			.chose {
				width: 175rpx;
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				position: relative;
			}

			.unchose {
				width: 175rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}

			.bottomline {
				position: absolute;
				bottom: 25rpx;
				left: 55rpx;
				right: 55rpx;
				height: 4rpx;
				background-color: #F8BD63;
			}
		}

		.count-box{
			background-color: #fff;
			margin-left: 35rpx;
			margin-right: 35rpx;
			font-size: 26rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			text-align: center;
			box-shadow: 0px 0px 27rpx 0px rgba(0, 0, 0, 0.08);
			border-radius: 10rpx;
			height: 260rpx;
			.count-item{
				padding-top: 20rpx;
				height: 145rpx;
				margin-left: 40rpx;
				margin-right: 40rpx;
				border-bottom: #E5E5E5 solid 2rpx;
				.count-item-number{
					font-size: 50rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #52A29E;
				}
				
			}
			.count-item1{
				width: 226.6rpx;
				height: 115rpx;
				line-height: 85rpx;
				.count-item1-tip{
					font-size: 29rpx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}
				.count-item1-number{
					font-size: 38rpx;
					font-family: PingFang SC;
					font-weight: 500;
					color: #F8BD63;
					margin-left: 10rpx;
				}
				
			}
			
			
		}

		.detail-box {
			margin-top: 20rpx;
			background: #FFFFFF;
			box-shadow: 0px 0px 27rpx 0px rgba(0, 0, 0, 0.08);
			border-radius: 10rpx;
			height: 250rpx;
			margin-left: 35rpx;
			margin-right: 35rpx;
			color: #333333;

			.detail-title {
				padding-left: 39rpx;
				padding-top: 39rpx;
				font-size: 28rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				position: relative;

				.ask {
					position: absolute;
					width: 26rpx;
					height: 26rpx;
					top: 45rpx;
					right: 49rpx;
				}
			}

			.detali-list-box {
				display: flex;
				margin-top: 30rpx;

				.detali-list-item {
					text-align: center;
					width: 226rpx;
					border-right: #E5E5E5 solid 2rpx;

					.detail1 {
						font-size: 46rpx;
						font-family: PingFang SC;
						font-weight: 500;
					}

					.detail2 {
						font-size: 26rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;
					}

					.detali-name {
						font-size: 24rpx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
					}
				}
			}
		}


       .nutritioninfo{
       		background-color: #FFFFFF;
       		border-radius: 10rpx;
       		width: 620rpx;
       		.warnbox{
       			padding-top:40rpx;font-size:26rpx;color:#999;
       			.warnimg{width:24rpx;margin-right:6rpx;}
       		}
       			
       		.tips-title {
       			text-align: center;
       			font-size: 34rpx;
       			color: #333;
       		}
       			
       		.tips-sub {
       			margin-top: 40rpx;
       			text-align: left;
       			font-size: 28rpx;
       			color: #555;
       			margin-left: 50rpx;
       			margin-right: 50rpx;
       			.list{padding-top:8rpx;}
       			.listother{padding-top:16rpx;color:#333;}
       			.main{color:#000;}
       		}
       			
       		.tips-close {
       			margin-top: 50rpx;
       			text-align: center;
       			font-size: 34rpx;
       			color: #FFFFFF;
       			background-color: #52A29E;
       			height: 90rpx;
       			line-height: 90rpx;
       			margin-left: 100rpx;
       			margin-right: 100rpx;
       			border-radius: 45rpx;
       		}
       	}
	}
</style>
