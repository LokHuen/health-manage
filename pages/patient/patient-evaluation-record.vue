<template>
	<view class="page">
			<!--滑动区-->
			<scroll-view scroll-y style="height: 100vh;" bindscroll="fnScrollEvent" bindscrolltoupper="fnScrollToupper">
					<view class="scroll-bg">
						<view class="box-container">
							<view class="box record-container" v-for="(item, index) in records" @click="showSuggestion(index)">
								<view class="up">
									<view class="left">
										<image :src="item.iconUrl" mode="aspectFill" style="width: 42rpx; height: 42rpx;"></image>
										<view class="record-box">
											<view class="evaluation">
												<text class="condition">{{item.condition}}</text>
												<text class="step">{{item.step}}</text>
												<text class="time">测评时间：{{item.time}}</text>
											</view>
										</view>
									</view>
									<image :src="downUrl" mode="aspectFit" style="width: 30rpx; height: 30rpx;" v-if = "suggestionShow == index"></image>
									<image :src="upUrl" mode="aspectFit" style="width: 30rpx; height: 30rpx;" v-else></image>
								</view>
								
								<view class="line" style="height: 1rpx; width: 100%; background: #EBECF2; display:none;"></view>
								<text class="suggestion" v-show = "suggestionShow == index">建议：{{item.suggestion}}</text>
							</view>
						</view>
					</view>
					
			</scroll-view>
	</view>
</template>

<script>
	var suggestion = document.getElementsByClassName("suggestion");
	var line = document.getElementsByClassName("line");
	const app = getApp();
	export default {
		data() {
			return {
				upUrl: require("../../static/icon/icon_arrow_open.png"),
				downUrl: require("../../static/icon/icon_arrow_close.png"),
				suggestionShow: -1,
				records: [
						{
							condition: '健康状况差',
							step: '免疫治疗后',
							time: '2022/12/02 12:31',
							suggestion: '由营养师、护师或医生进行患者或患者家庭教育，并可根据患者存在的症状和实验室检查的结果进行药物干预。',
							iconUrl: require("../../static/icon/cry_icon.png"),
							arrowIconUrl: require("../../static/icon/icon_arrow_open.png")
						},
						{
							condition: '健康状况一般',
							step: '放疗后',
							time: '2022/12/02 12:31',
							suggestion: '由营养师、护师或医生进行患者或患者家庭教育，并可根据患者存在的症状和实验室检查的结果进行药物干预。',
							iconUrl: require("../../static/icon/cry_icon.png"),
							arrowIconUrl: require("../../static/icon/icon_arrow_open.png")
						},
						{
							condition: '加纳坤宁宫状况良好',
							step: '手术后 化疗后',
							time: '2022/12/02 12:31',
							suggestion: '由营养师、护师或医生进行患者或患者家庭教育，并可根据患者存在的症状和实验室检查的结果进行药物干预。',
							iconUrl: require("../../static/icon/cry_icon.png"),
							arrowIconUrl: require("../../static/icon/icon_arrow_open.png")
						},
						{
							condition: '健康状况优',
							step: '手术前',
							time: '2022/12/02 12:31',
							suggestion: '由营养师、护师或医生进行患者或患者家庭教育，并可根据患者存在的症状和实验室检查的结果进行药物干预。',
							iconUrl: require("../../static/icon/smile.png"),
							arrowIconUrl: require("../../static/icon/icon_arrow_open.png")
						},
					],
				}
			},
		onLoad(){

			},
		beforeCreate() {
		},
		mounted() {
		},
		methods: {
			showSuggestion(i) {
				console.log(i);
				this.suggestionShow = this.suggestionShow == i ? -1 : i;
				// suggestion[i].style.display = "block";
				// suggestion[i].style.display = suggestion[i].style.display == "none" ? "block" : "none";
				line[i].style.display = line[i].style.display == "none" || line[i].style.display == "" ? "block" : "none";
				// this.arrowUrl = suggestion[i].style.display == "none" || suggestion[i].style.display == "" ? require("../../static/icon/icon_arrow_close.png") : require("../../static/icon/icon_arrow_open.png");
				suggestion[i].style.display = suggestion[i].style.display == "none" || suggestion[i].style.display == "" ? "block" : "none";
				// if(suggestion[i].style.display != "none"){
				// 	suggestion[i].style.display = "none";
				// }else{
				// 	suggestion[i].style.display = "block";
				// }
			}
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
	  font-size: 24rpx;
	  position: relative;
	  
	  .record-container {
		  display: flex;
		  padding: 24rpx;
		  flex-direction: column;
		  
		  
		  .suggestion {
		  	  padding: 30rpx 0 6rpx 44rpx;
			  text-align:justify;
			  text-justify:inter-word;
			  // display: none;
		  }
		  .up {
			  display: flex;
			  align-items: center;
			  justify-content: space-between;
			  
			  .left {
				  display: flex;
			  }
		  }
		  // .up::after {
			 //  content: "";
			 //  height: 24rpx;
			 //  width: 24rpx;
			 //  border-bottom: 2rpx solid #999999;
			 //  border-right: 2rpx solid #999999;
			 //  transform: rotate(45deg);
			 //  position: absolute;
			 //  top: 88rpx;
			 //  right: 30rpx;
		  // }
		  .record-box text {
			  margin-bottom: 20rpx;
		  }
		  .record-box {
			  display: flex;
			  flex-direction: column;
			  padding-left: 10rpx;
			  
			  .evaluation {
				  display: flex;
				  flex-direction: column;
				  
				  .step {
					  color: #bdbdbd;
				  }
			  }
			  
		  	  .condition {
				  color: #4CBDB6;
				  font-size: 28rpx;
			  }
		  }
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
