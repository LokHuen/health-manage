<template>
	<view class="page">
			<!--滑动区-->
			<scroll-view scroll-y style="height: 300vh;" bindscroll="fnScrollEvent" bindscrolltoupper="fnScrollToupper">
					<view class="scroll-bg">
						<view class="box-container">
							
						</view>
					</view>
					
			</scroll-view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				}
			}
		},
		onLoad(){
			},
		beforeCreate() {
		},
		methods: {
		},
	}
</script>

<style lang="scss" scoped>
	.uni-forms-item {
		margin: 0;
	}
	/* #ifndef H5 */
	/* page {
		padding-top: 85px;
	} */
	/* #endif */
	.uni-group {
		display: flex;
		align-items: center;
	}
	.page {
	  height: 300vh;
	  width: 100vw;
	  display: flex;
	  flex-direction: column;
	  background: #F5F5F5;
	}
	.box-container{
	  height: 100%;
	  box-sizing: border-box;
	  padding: 40rpx 30rpx 0 40rpx;
	  background: #fff;
	  border-radius: 30rpx;
	  width: 100%;
	  font-size: 28rpx;
	  position: relative;
	  }
	  .update-btn {
		  border-radius: 45rpx;
		  background: #57C1BB;
		  position: fixed;
		  bottom: 111rpx;
		  width: 90%;
		  box-sizing: border-box;
	  }
	}
	.scroll-bg{
	  width: 100vw;
	  height: 300vh;
	 /* background-image: url(https://636c-cloud1-5gfii8jlc56b5045-1306536140.tcb.qcloud.la/wxfile/background.png?sign=6a62c2c13c024f0091a1f8034f4d6155&t=1627552695);
	  background-repeat: no-repeat; */
	  background: -webkit-linear-gradient(#4fbeb7, #F5F5F5);
	          /*  Safari 5.1 到 6.0 */
	  background: -o-linear-gradient(#4fbeb7, #F5F5F5);
	          /*  Opera 11.6 到 12.0 */
	  background: -moz-linear-gradient(#4fbeb7, #F5F5F5);
	          /*  Fx 3.6 到 15 */
	  background: linear-gradient(#4fbeb7, #F5F5F5);
	  background-size: contain;
	  /* background-position: 0 -10vh; */
	}/*背景*/
	.box {
		width: 690rpx;
		margin-bottom: 30rpx;
		background-color: #fff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		box-shadow: 0rpx 2rpx 10rpx rgba(0,0,0,0.05);
		box-sizing: border-box;
	}	
</style>
