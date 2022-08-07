<template>
	<view class="page">
			<!--滑动区-->
			<scroll-view scroll-y style="height: 100vh;" bindscroll="fnScrollEvent" bindscrolltoupper="fnScrollToupper">
					<view class="scroll-bg">
						<view class="box-container">
							<view class="tips box">
								根据您的健康信息报告，您目前还在进行疾病治疗，今天我们进一步了解一下您的身体状况！
							</view>
							<view class="box">
								<uni-forms class="status">
									<uni-forms-item class="status-item">
										<view class="title">您空腹的血糖在哪个范围？</view>
										<checkbox-group name="血糖范围" style="display: flex;flex-direction: column;padding: 23rpx;">
											<label>
												<checkbox :value="0" /><text>＜3.9mmol/L</text>
											</label>
											<label>
												<checkbox :value="1" /><text>＜3.9mmol/L</text>
											</label>
											<label>
												<checkbox :value="2" /><text>＜3.9mmol/L</text>
											</label>
										</checkbox-group>
									</uni-forms-item>
									<uni-forms-item class="status-item">
										<view class="title">您今天的血压是多少？</view>
										<view class="blood-presure">
											<view class="input-box">
												<view>高压：</view>
												<input type="number" class="uni-input"/>
											</view>
											<view class="input-box">
												<view>低压：</view>
												<input type="number" class="uni-input"/>
											</view>
										</view>
									</uni-forms-item>
									<uni-forms-item class="status-item">
										<view class="title2">最近有没有身体不舒服？是什么问题？进展到哪一步？有没有用药？</view>
										<input type="text" name="" class="feed-back" placeholder="我最近..." placeholder-style="position: relative; top: 14rpx; color: #BDBDBD">
									</uni-forms-item>
									<button class="submitbt" type="primary">提交</button>
								</uni-forms>
							</view>
							
						</view>
					</view>
			</scroll-view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				
			}
		},
		mounted() { 
			
		},
		filters: {

		  },
		methods: {
			
		},
	}
</script>

<style lang="scss" scoped>
	
	.page {
	  height: 100vh;
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
	  
	  .status {
		  width: 100%;
		  
		  .submitbt {
			  border-radius: 45rpx;
			  background: #57C1BB;
		  }
		  .status-item {
			  width: 100%;
			  margin: 0;
			  display: flex;
			  
			  .feed-back {
				  position: relative;
				  margin: 30rpx auto;
				  height: 212rpx;
				  width: 623rpx;
				  padding: 14rpx 24rpx;
				  box-sizing: border-box;
				  border-radius: 20rpx;
				  border: 1px solid rgba(0,0,0,0.09);
				  font-size: 28rpx;
			  }
			  .blood-presure {
				  padding: 22rpx;
				  
				  .input-box {
						display: flex;
				  		align-items: flex-end;
				  				
				  		.uni-input {
				  			width: 115rpx;
				  			border-bottom: 1rpx solid #000;
				  		}
				}
			  }
			  
		  }
		  .title {
			  text-align: center;
			  width: 100%;
			  padding: 30rpx 168rpx;
			  box-sizing: border-box;
			  border-bottom: 1rpx dashed #4BBDB6;
			  font-weight: 700;
		  }
		  .title2 {
		  	  text-align: left;
		  	  width: 100%;
		  	  padding: 30rpx 37rpx;
		  	  box-sizing: border-box;
		  	  border-bottom: 1rpx dashed #4BBDB6;
		  	  font-weight: 700;	
		  }
	  }
	  .tips {
		  background: #cff9f7;
		  border-radius: 0;
		  padding: 28rpx 24rpx;
		  font-size: 24rpx;
		  color: #333;
		  box-sizing: border-box;
		  width: 100%;
		  margin-bottom: 90rpx;
	  }
	}
	.scroll-bg{
	  width: 100vw;
	  height: 100vh;
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
		// margin-bottom: 30rpx;
		background-color: #fff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		box-shadow: 0rpx 2rpx 10rpx rgba(0,0,0,0.05);
		box-sizing: border-box;
	}	
</style>
