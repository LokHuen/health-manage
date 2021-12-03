<template>
	<view class="">
		<view class="info-box">
			<image :src="infoData.portrait" mode="scaleToFill" class="avator"></image>
			<view class="user-msg-box">
				<view class="name">
					{{infoData.patientName||"游客"}}
				</view>
				<view class="msg">{{(infoData.patientGender||"")+' '+((infoData.age || infoData.age!=0)?(infoData.age+'岁 '):'')+(infoData.illness||"")}}
		
				</view>
			</view>
		</view>
		<view class="line-space"></view>
		<view class="flex areabox bbuttom" v-for="(item,index) in pitem" @click="topage(index)">
			<view style="flex:1;">{{item}}</view>
			<uni-icons type="arrowright" size="18"></uni-icons>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				infoData:{},
				pitem:["基础信息","营养评估记录","营养干预记录","基因检测报告查询","免费用药匹配结果","海外用药评估结果"],
				info:{},
			}
		},
		onLoad(options){
			
		},
		onShow(){
			if(app.getCache('uid')){
				this.judgeUserAuth();
			}
		},
		methods: {
			topage(index){
				switch(index){
					case 0:
						uni.navigateTo({
							url:"/pages/patient/patient-basic-information"
						})
						break;
					case 1:
						uni.navigateTo({
							url:"/pages/patient/evaluation-record"
						})
						break;
					case 2:
						uni.navigateTo({
							url:"/pages/patient/order"
						})
						break;
					case 3:
						// location.href = "http://gzh.healthme.cn/reportLogin";
						uni.navigateTo({
							url:"/pages/patient/report"
						})
						break;
					case 4:
						location.href = "http://zhm.healthme.cn/jumpLogin?id="+app.getCache('uid')+"&p="+this.info.phone+"&url="+encodeURIComponent("http://zhm.healthme.cn/mineIndex");
						break;
					case 5:
						location.href = "http://gzh.healthme.cn/jumpLogin?id="+app.getCache('uid')+"&p="+this.info.phone+"&url="+encodeURIComponent("http://gzh.healthme.cn/drug/myDrugs");
						break;
				}
			},
			getInfo(){
				app.patientNutrition({}).then(res => {
					if (res.status == 1) {
						this.infoData = res.data;
					}
				});
				app.patientBasicInfo({}).then(res =>{
					if(res.status==1){
						this.info = res.data;
					}
				});
			},
			judgeUserAuth(){
				app.judgeUserAuth({}).then(res =>{
					if(res.status ==1){
						// app.setCache('userType',res.data.userType);
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
									url:'patient-improve-msg?type=2&formQrCode=1'
								});
							}
			
						}
					}
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.info-box {
		height: 198rpx;
		display: flex;
	
		.avator {
			margin-top: 40rpx;
			background-color: #909399;
			width: 128rpx;
			height: 128rpx;
			border-radius: 50%;
			margin-left: 50rpx;
		}
	
		.user-msg-box {
			padding-top: 50rpx;
			color: #333333;
			margin-left: 31rpx;
	
			.name {
				font-size: 20px;
			}
	
			.msg {
				font-size: 14px;
			}
		}
	}
	
	.line-space {
		background-color: #F7F8F8;
		height: 20rpx;
	}
	.areabox{
		padding:0 40rpx 0 40rpx;background:#fff;height:126rpx;
	}
	.bbuttom{
		border-bottom:2rpx solid #efefef;
	}
</style>
