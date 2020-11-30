<template>
	<!-- 患者营养自测引导页 -->
	<view class="container">
		<view class="background-img-box">
			<view class="left-bg"></view>
			<view class="background-img">
				<image src="../../static/img/nutritional_self_test_bg.png" mode="widthFix" class=""></image>
			</view>
			<view class="content-box">
				<view class="title">PG-SGA营养状况评量表</view>
				<view class="desc">
					PG-SGA（患者主观整体评估）是临床上专门为肿瘤患者设计的营养状况评估方法，该评估方法得到美国营养师协会（ADA）等国际营养机构和中国抗癌协会肿瘤营养专业委员会（CSNO）大力推荐，是目前肿瘤患者营养评测的标准工具。
				</view>
			</view>
			
		</view>
		
		<view class="button-box">
			<button type="default" class="button" @click="test">开始测评</button>
		</view>
	</view>
	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods:{
			test(){
				uni.navigateTo({
					url:'../testIndex'
				});
			}
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
				left: 49rpx;
				right: 30rpx;
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
			position: fixed;
			bottom: 0;
			height: 140rpx;
			width: 100%;
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
