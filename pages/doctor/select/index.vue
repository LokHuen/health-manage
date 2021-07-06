<template>
	<!-- 患者营养自测引导页 -->
	<view class="container">
		<view class="pagetitle">{{option.name}}</view>
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
				option:{},
				testtype:''
			}
		},
		methods:{
			test(){
				uni.navigateTo({
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
			}else{
												
			}
		},
		
	}
	
</script>

<style lang="scss">
	.container{
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
