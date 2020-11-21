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
					患者主观整体评估(patient-generated subjective global assessment，PG-SGA)是在主观整体评估(sub-jective global assessment，SGA)的基础上发展起来的。最先由美国Ottery于1994年提出，是专门为肿瘤患者设计的营养状况评估方法。临床研究提示，PG-SGA是一种有效的肿瘤患者特异性营养状况评估工具，因而得到美国营养师协会(American Dietetic Association，ADA)等单位的广泛推广与应用。
				</view>
			</view>
			
		</view>
		
		<view class="button-box">
			<button type="default" class="button">开始测评</button>
		</view>
	</view>
	
</template>

<script>
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
				width: 81%;
				background-color: #52A29E !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17px;
			}
		}
	}
</style>
