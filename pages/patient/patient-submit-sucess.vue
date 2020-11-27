<template>
 
 <view>
	 <view class="health-content">
		 <view class="health-image"> <image class="health-status-image" src="../../static/icon/submit_sucess_icon.png"></image></view>
		 <view class="health-result">提交成功</view>
		 <button class="health-confirm" @click="complete">完成</button>
	 </view>
 </view>
 
</template>

<script>
	export default {
		data() {
			return {
				type:1,//1跳回患者基本信息页面 2跳回患者营养界面
			}
		},
		methods: {
			complete(){
				if(this.type==1){
					uni.redirectTo({
						url:'./patient-basic-information'
					});
				}else{
					uni.redirectTo({
						url:'patient-nutrition-manage'
					});
				}
				
			}
		
		},
		onLoad(props){
			this.type = props.type ||1;
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