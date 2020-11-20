<template>
 
 <view>
	 <view class="health-content">
		 <view class="health-image"> <image class="health-status-image" src="../../static/icon/submit_sucess_icon.png"></image></view>
		 <view class="health-result">提交成功</view>
		 <button class="health-confirm">完成</button>
	 </view>
 </view>
 
</template>

<script>
 
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