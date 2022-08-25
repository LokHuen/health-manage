<template>
	<view class="page">
			<!--滑动区-->
			<scroll-view scroll-y bindscroll="fnScrollEvent" bindscrolltoupper="fnScrollToupper">
					<view class="scroll-bg">
						<view class="box-container">
							<view class="tips box">
								
								根据健康评估测试，你患有睡眠障碍症，入睡慢，长期失眠。所以接下来让我们一起记录每日睡眠状况，1个月后见证我们的改善效果！
							</view>
							<view class="box">
								<uni-forms class="status">
									<uni-forms-item class="status-item"  v-for="(item, index) in list" >
										<view class="title">{{ item.title }}</view>
										<checkbox-group name="心情" style="box-sizing: border-box; display: flex;flex-wrap: wrap; width: 100%;">
											<label  v-for="(qitem, i) in item.question"  style="width: 50%;display: flex;" >
												<checkbox :value="i" style="margin:0 20rpx 20rpx 0; " /><view style="color:#333;">{{ qitem }}</view>
											</label>
										</checkbox-group>
										<view class="input-box" v-show="item.question[4]=='其他'">
											<textarea class="feed-back" placeholder="我睡前..." placeholder-style="position: relative; color: #BDBDBD" auto-height="true"></textarea>
										</view>
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
				list:[
					{
						title: '昨天你几点睡的？',
						question: ['19:00-20:00', '21:00-22:00', '23:00-24:00', '01:00之后'],
					},
					{
						title: '今天你几点醒的？',
						question: ['07:00-08:00', '09:00-10:00', '11:00-12:00', '12:00之后'],
					},
					{
						title: '还记得昨天的你多长时间入睡的吗？',
						question: ['≤15分钟', '16-30分钟', '31-60分钟', '≥60分钟'],
					},
					{
						title: '睡前30分钟你在做什么？',
						question: ['看书', '玩手机', '看电视', '冥想','其他'],
					},
					
				],
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
	  padding: 40rpx 30rpx 50rpx 30rpx;
	  background: #fff;
	  border-radius: 30rpx;
	  width: 100%;
	  padding-bottom: 88rpx;
	  
	  .status {
		  width: 100%;

		  .status-item {
			  width: 100%;
			  margin: 0 auto;
			  display: flex;
			  box-sizing: border-box;
			  font-size: 28rpx;
			  justify-content: center;
			  padding: 22rpx;
			  
			  .feed-back {
				  margin: 0 auto;
				  width: 100%;
				  padding: 14rpx 24rpx;
				  box-sizing: border-box;
				  border-radius: 20rpx;
				  border: 1rpx solid rgba(0,0,0,0.09);
				  font-size: 28rpx;
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
			  margin-bottom: 30rpx;
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
