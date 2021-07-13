<template>
	<view class="container">
		<view class="background-img-box">
			<view class="left-bg"></view>
			<view class="background-img">
				<image src="../../../static/img/nutritional_self_test_bg.png" mode="widthFix" class=""></image>
			</view>
			<view class="content-box">
				<view class="title" >{{info.surveyName}}</view>
				<view class="desc" >
					{{info.description}}
				</view>
			</view>
			
		</view>
		<view class="button-box">
			<button type="default" class="button" @click="test">进入筛查</button>
		</view>
	</view>
	
</template>

<script>
	let app = getApp();
	export default {
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				info:{},
				option:{},
				testtype:''
			}
		},
		methods:{
			test(){
				uni.redirectTo({
					url:'/pages/doctor/select/data?id='+this.testtype
				});
			},
			getSgaType(){
			    app.getSgaType().then(res =>{
					if(res.status == 1){
						this.testtype = res.data.sgaType;
					}
				});	
			},
			
		},
		onLoad(option){
			this.option = option||this.option;
			if(option.id){
				this.testtype = option.id;
				app.questionnaireget({id:option.id}).then(res =>{
					this.info = res.data;
				});
			}else{
												
			}
		},
		
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
					font-size: 13px;word-break: break-all;
					line-height:45rpx;
					
				}
			}
			
		}
		.pagetitle{
			font-size:50rpx;text-align:center;padding:30rpx 30rpx 0;
		}
		
		.button-box{
			position: fixed;padding-top: 26rpx;
			bottom: 15px;background: #fff;
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
