<template>
	<view class="page">
			<!--滑动区-->
			<scroll-view scroll-y bindscroll="fnScrollEvent" bindscrolltoupper="fnScrollToupper">
					<view class="scroll-bg">
						<view class="box-container">
							<view class="tips box">
								根据健康评估测试，您的性格是乐观的，接下来让我们继续记录您每天的心情吧！把喜怒哀乐记录下来，生成属于你自己的心情卡！
							</view>
							<view class="box">
								<uni-forms class="status">
									<uni-forms-item class="status-item">
										<view class="title">今天的你心情如何？</view>
										<checkbox-group name="心情" style="box-sizing: border-box; display: flex;flex-wrap: wrap; width: 100%; padding: 23rpx;">
											<label v-for="(item, index) in list" style="width: 50%;display: flex;" >
												<checkbox :value="index" style="margin:0 20rpx 20rpx 0; " /><view style="color:#333;">{{ item }}</view>
											</label>
										</checkbox-group>
									</uni-forms-item>
									<uni-forms-item class="status-item">
										<view class="title">今天你的有没有遇到令你激动的事？</view>
										<view class="blood-presure">
											<view class="input-box">
												<input type="text" name="" class="feed-back" placeholder="我最近..." placeholder-style="position: relative; top: 14rpx; color: #BDBDBD">
											</view>
										</view>
									</uni-forms-item>
									<uni-forms-item class="status-item">
										<view class="title">今天你的有没有过情绪低落的时候？</view>
										<view class="blood-presure">
											<view class="input-box">
												<input type="text" name="" class="feed-back" placeholder="我最近..." placeholder-style="position: relative; top: 14rpx; color: #BDBDBD">
											</view>
										</view>
									</uni-forms-item>
									<uni-forms-item class="status-item">
										<view class="title">今天你是如何去调整你的情绪？</view>
										<checkbox-group name="心情" style="box-sizing: border-box; display: flex;flex-wrap: wrap; width: 100%; padding: 23rpx;">
											<label v-for="(item, index) in list" style="width: 50%;display: flex;" >
												<checkbox :value="index" style="margin:0 20rpx 20rpx 0; " /><view style="color:#333;">{{ item }}</view>
											</label>
										</checkbox-group>
									</uni-forms-item>
								</uni-forms>
							</view>
						</view>
						<button class="submitbt" type="primary">提交</button>
					</view>
			</scroll-view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				list:['开心', '难过', '激动', '郁闷', '平静', '愤怒'],
				list2:['出门散心', '与家人、邻居倾诉', '玩手机和看电视', '运动', '购物', '没有措施', '憋在心里', '其他'],
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
	  background: #fff;
	}
	.submitbt {
	  border-radius: 45rpx;
	  background: #57C1BB;
	  margin:0 30rpx;
	}
	.box-container{
	  box-sizing: border-box;
	  padding: 40rpx 30rpx 50rpx 40rpx;
	  background: #fff;
	  border-radius: 30rpx;
	  width: 100%;
	  padding-bottom: 88rpx;
	  
	  .status {
		  width: 100%;

		  .status-item {
			  width: 100%;
			  margin: 0;
			  display: flex;
			  box-sizing: border-box;
			  font-size: 28rpx;
			  
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
			  color: #333;
			  padding: 30rpx;
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
	  padding-bottom: 50rpx;
	  background: #FFF;
	 /* background-image: url(https://636c-cloud1-5gfii8jlc56b5045-1306536140.tcb.qcloud.la/wxfile/background.png?sign=6a62c2c13c024f0091a1f8034f4d6155&t=1627552695);
	  background-repeat: no-repeat; */
	  // background: -webkit-linear-gradient(#4fbeb7, #FFF);
	  //         /*  Safari 5.1 到 6.0 */
	  // background: -o-linear-gradient(#4fbeb7, #FFF);
	  //         /*  Opera 11.6 到 12.0 */
	  // background: -moz-linear-gradient(#4fbeb7, #FFF);
	  //         /*  Fx 3.6 到 15 */
	  // background: linear-gradient(#4fbeb7, #FFF);
	  // background-size: contain;
	  /* background-position: 0 -10vh; */
	}/*背景*/
	.box {
		width: 100%;
		background-color: #fff;
		border-radius: 20rpx;
		display: flex;
		box-shadow: 2rpx 0rpx 24rpx rgba(0,0,0,0.1);
		box-sizing: border-box;
	}	
</style>
