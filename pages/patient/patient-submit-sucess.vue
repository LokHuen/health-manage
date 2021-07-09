<template>
 
 <view>
	 <view class="health-content">
		 <view class="health-image"> <image class="health-status-image" src="../../static/icon/submit_sucess_icon.png"></image></view>

		 <view class="health-result">提交成功</view>
		 <button class="health-confirm" v-show="type!=1" @click="complete" style="width:600rpx;">去做{{changetext()}}</button
		 <button class="health-confirm" v-show="type==1" @click="complete">完成</button>
	 </view>
 </view>
 
</template>

<script>
	let app = getApp();
	export default {
		data() {
			return {
				info:'',
				type:1,//1跳回患者基本信息页面 2跳回患者营养界面
				testtype:1,
				age:''
			}
		},
		methods: {
			changetext(){
				if(this.testtype==1) return "PG-SGA营养状况评估";
				if(this.testtype==2) return "SGA营养状况评估";
				return "MMA营养状况评估";
			},
			complete(){
				if(this.type==1){
					uni.redirectTo({
						url:'./patient-basic-information'
					});
				}else{
					//surveyType  	问卷类型（0：评估，1：筛查）
					if(this.info.surveyType == 0){
						uni.redirectTo({
							url:'/pages/patient/nutritional-self-test'
						});
					}else{
						uni.redirectTo({
							url:'/pages/doctor/select/index?id='+this.info.surveyId+'&name='+this.info.surveyName
						});
						
					}
					
				}
				
			}
		
		},
		onLoad(props){
			this.type = props.type ||1;
			//this.age = props.age;
			app.getSgaType({age:props.age}).then(res => {
				if (res.status == 1) {
					this.testtype = res.data.sgaType;
					this.info = res.data;
				}
			});
		}
		

	}
</script>


<style lang="scss"> 

.health-image {
	text-align: center;
	.health-status-image {
		 margin-top: 80rpx;
		 width: 170rpx;
		 height: 194rpx;
	}
}
 
 .health-result {
	 // color: #333333;
	 font-size: 32rpx;
	 text-align: center;
	 margin-top: 25rpx;
 }
 
 .health-confirm {
	 top: 60rpx;
	 width: 400rpx;
	 height: 90rpx;
	 font-size: 34rpx;
	 color: white;
	 background-color: #52A29E;
	 border-radius: 45rpx;
 }
 
</style>