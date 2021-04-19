<template>
	<!-- 消息提醒界面 -->
	<view class="container">
		<view class="item-box">
			接收患者评估结果
			<switch :checked="isRcvSurveyResult==1" @change="switch1Change" color="#46918D" class="switch"/>
		</view>
		<view class="tip">
			开启此功能，患者做了评估后，您会收到公众号推送的消息通知，能够及时知道患者每次评估的结果。
		</view>
		
		<view class="item-box">
			接收重度营养不良患者提醒消息
			<switch :checked="isRcvSevereMalnutrition==1" @change="switch2Change" color="#46918D" class="switch"/>
		</view>
		<view class="tip">
			开启此功能，当前一天有重度营养不良的患者时，您会收到提醒消息。
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
			   isRcvSurveyResult:'',
			   isRcvSevereMalnutrition:''
			}
		},
		onLoad(props){
		    this.isRcvSurveyResult = props.isRcvSurveyResult;
			 this.isRcvSevereMalnutrition = props.isRcvSevereMalnutrition;
		},
		methods: {
			switch1Change(){
				let isRcvSurveyResult = this.isRcvSurveyResult==0?1:0;
				app.updateDoctorName({isRcvSurveyResult:isRcvSurveyResult}).then(res =>{
					if(res.status == 1){
						app.tip('设置成功');
						this.isRcvSurveyResult = isRcvSurveyResult;
					}
				})
			},
			switch2Change(){
				
				let isRcvSevereMalnutrition = this.isRcvSevereMalnutrition==0?1:0;
				app.updateDoctorName({isRcvSevereMalnutrition:isRcvSevereMalnutrition}).then(res =>{
					if(res.status == 1){
						app.tip('设置成功');
						this.isRcvSevereMalnutrition = isRcvSevereMalnutrition;
					}
				})
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F6F6;
	}
	.container{
	    .item-box{
			margin-top: 10rpx;
			height: 110rpx;
			line-height: 110rpx;
			background: #FFFFFF;
			padding-left: 50rpx;
			font-size: 32rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			position: relative;
			.switch{
				position: absolute;
				right: 50rpx;
				width: 80rpx;
				height: 48rpx;
			}
		}
		.tip{
			padding-left: 50rpx;
			padding-right: 50rpx;
			padding-top: 15rpx;
			padding-bottom: 15rpx;
			font-size: 24rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}
		
	}
</style>
