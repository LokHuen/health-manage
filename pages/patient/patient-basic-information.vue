<template>

	<view>
		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">患者姓名</view>
				<view class="health-item-detail">{{data.patientName}}</view>
			</view>
		</view>
		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">患者性别</view>
				<view class="health-item-detail">{{data.patientGender}}</view>
			</view>
		</view>
		
		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">出生日期</view>
				<view class="health-item-detail">{{data.birthday}}</view>
			</view>
		</view>
		
		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">所患疾病</view>
				<view class="health-item-detail">{{data.illness}}</view>
			</view>
		</view>
		
		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">所在城市</view>
				<view class="health-item-detail">{{data.region}}</view>
			</view>
		</view>
		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">身高</view>
				<view class="health-item-detail">{{(data.height?data.height:'')+'cm'}}</view>
			</view>
		</view>
		
		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">体重</view>
				<view class="health-item-detail">{{(data.weight?data.weight:'')+'kg'}}</view>
			</view>
		</view>

		<view class="health-update">
			<button class="health-update-button" @click="updateInfo">更新信息</button>
		</view>

	</view>

</template>

<script>
	const app = getApp();
	export default {
		onShow() {
			if(app.getCache('userType')==2){
				//如果是医生，就跳过去医生的个人中心页面
				uni.redirectTo({
					url:'../doctor/doctor-center'
				});
			}else{
				this.judgeUserAuth();
			}
			
		},
		data() {
			return {
				data:{},
			}
		},
		methods:{
			updateInfo(){
				uni.navigateTo({
					url:'patient-improve-msg'
				})
				
			},
			getInfo(){
				app.patientBasicInfo({}).then(res =>{
					if(res.status==1){
						this.data = res.data;
					}
				});
			},
			judgeUserAuth(){
				app.judgeUserAuth({}).then(res =>{
					if(res.status ==1){
						app.setCache('userType',res.data.userType);
						if(res.data.userType == 2){
							//如果是医生，就跳过去医生的个人中心页面
							uni.redirectTo({
								url:'../doctor/doctor-center'
							});
						}else{
							if(res.data.perfect==true){
								this.getInfo();
							}else{
								uni.redirectTo({
									url:'patient-improve-msg'
								});
							}
							
						}
					}
				});
			},
			
		}
	}
</script>

<style lang="scss">
	.health-content {
		margin: 0 44rpx;

		.health-item {
			border-bottom: 0.01rem #EEEEEE solid;
			padding-bottom: 0.4rem;
			display: block;
			height: 96rpx;
			text-align: center;

			.health-item-title {
				font-size: 30rpx;
				color: #333333;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				float: left;
			}

			.health-item-detail {
				font-size: 30rpx;
				color: #333333;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				float: right;
			}
		}
	}

	.health-update {
		text-align: center;
		position: absolute;
		bottom: 50rpx;
		width: 100%;

		.health-update-button {
			width: 85%;
			height: 90rpx;
			font-size: 34rpx;
			color: white;
			background-color: #52A29E;
			border-radius: 45rpx;
		}
	}
</style>
