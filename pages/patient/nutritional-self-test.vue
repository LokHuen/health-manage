<template>
	<!-- 患者营养自测引导页 -->
	<view class="container">
		<view class="background-img-box">
			<view class="left-bg"></view>
			<view class="background-img">
				<image src="../../static/img/nutritional_self_test_bg.png" mode="widthFix" class=""></image>
				<view @click="videobox">测评前，建议您观看一次演示视频》</view>
			</view>
			<view class="content-box">
				<view class="title">PG-SGA营养状况评量表</view>
				<view class="desc">
					PG-SGA（患者主观整体评估）是临床上专门为肿瘤患者设计的营养状况评估方法，该评估方法得到美国营养师协会（ADA）等国际营养机构和中国抗癌协会肿瘤营养专业委员会（CSNO）大力推荐，是目前肿瘤患者营养评测的标准工具。
				</view>
				<view class="desc">
					建议测评周期
					<view>重度营养不良：1次/1周</view>
					<view>中度营养不良：1次/1-2周</view>
					<view>可疑或轻度营养不良： 1次/2周-4周</view>
					<view>无营养不良： 1次/4周-12周</view>
				</view>
			</view>
			
		</view>
		<view v-if="showvideo" style="padding:200rpx 30rpx 200rpx;">
			<video id="myVideo" autoplay :src="baseUrl+'/yindao.mp4'" controls style="width:100%;"></video>
		</view>
		<view class="button-box">
			<button type="default" class="button" @click="test">开始测评</button>
		</view>
	</view>
	
</template>

<script>
	let app = getApp();
	export default {
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				showvideo:false,
				videoContext:"",
			}
		},
		methods:{
			test(){
				uni.navigateTo({
					url:'../testIndex'
				});
			},
			videobox(){
				if(this.showvideo) {this.showvideo = false;return;}
				this.showvideo = true;
				setTimeout(()=>{
					this.videoContext = uni.createVideoContext('myVideo');
					this.videoContext.requestFullScreen();
					setTimeout(()=>{this.videoContext.play();},300)
				},300)
			},
		}
	}
	
</script>

<style lang="scss">
	.container{
		.background-img-box{
			position: relative;
			padding-top: 30rpx;
			width: 750rpx;
			.left-bg{
				background-color: #DCECEC;
				width: 375rpx;
				height: 860rpx;
			}
			.background-img{
				position: absolute;
				top: 66rpx;
				left: 55rpx;
				right: 55rpx;
				image{width: 100%;}
			}
			.content-box{
				position: absolute;
				color: #FFFFFF;
				top: 146rpx;
				left: 95rpx;
				right: 80rpx;
				.title{
					font-size: 18px;
				}
				.desc{
					margin-top: 30rpx;
					font-size: 13px;
					line-height:45rpx;
					
				}
			}
			
			
			
		}
		
		.button-box{
			position: fixed;padding-top: 26rpx;
			bottom: 0;background: #fff;
			height: 130rpx;
			width: 100%;z-index:9;
			.button{
				height: 90rpx;
				line-height: 90rpx;
				width: 81%;
				background-color: #52A29E !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17px;
			}
		}
	}
</style>
