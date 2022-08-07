<template>
	<view class="page">
			<!--滑动区-->
			<scroll-view scroll-y style="height: 100vh;" bindscroll="fnScrollEvent" bindscrolltoupper="fnScrollToupper">
					<view class="scroll-bg">
						<view class="box-container">
							<view class="info">
								<view class="item">姓名</view>
								<view class="information">{{name}}</view>
							</view>
							<view class="info">
								<view class="item">性别</view>
								<view class="information">{{gender}}</view>
							</view>
							<view class="info">
								<view class="item">出生日期</view>
								<view class="information">{{birthDay}}</view>
							</view>
							<view class="info">
								<view class="item">所患疾病</view>
								<view class="information">{{disease}}</view>
							</view>
							<view class="info">
								<view class="item">所在城市</view>
								<view class="information">{{city}}</view>
							</view>
							<view class="info" >
								<view class="item">身高</view>
								<view class="information">{{hight}}</view>
							</view>
							<view class="info" >
								<view class="item">体重</view>
								<view class="information">{{weight}}</view>
							</view>
							<button class="update-btn" type="primary">更新信息</button>
						</view>
					</view>
					
			</scroll-view>
	</view>
</template>

<script>

	export default {
		data() {
			return {
				name: '张小明',
				gender: '男',
				birthDay: '1949年1月10日',
				disease: '乳腺癌',
				city: '湖北省武汉市',
				hight: '165cm',
				weight: '55kg',
			}
		},
		mounted() { 
			
		},
		filters: {

		  },
		components:{
		},
		methods: {
			
		},
	}
</script>

<style lang="scss" scoped>
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
	  .update-btn {
		  margin-top: 100rpx;
		  border-radius: 45rpx;
		  background: #57C1BB;
	  }
	  .info {
		  font-size: 28rpx;
		  width: 100%;
		  display: flex;
		  justify-content: space-between;
		  border-bottom: 1rpx solid #EBECF2;
		  padding:30rpx 0 ;
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
		margin-bottom: 30rpx;
		background-color: #fff;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		box-shadow: 0rpx 2rpx 10rpx rgba(0,0,0,0.05);
		box-sizing: border-box;
	}	
</style>
