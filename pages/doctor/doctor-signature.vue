<template>
	<!-- 医嘱署名界面-->
	<view class="container">
		<view class="name-box">
			<view class="name-tips">* 医嘱署名</view>
			<input class="name-input" type="text" value="" placeholder="请填写医嘱署名" v-model="name"/>
		</view>
		<view class="save" @click="save">保存</view>
	</view>
</template>



<script>
	const app = getApp();
	export default {
		data() {
			return {
				name:'',
			}
		},
		methods: {
			save(){
				if(!this.name){
					app.tip('请输入医生名字')
					return;
				}
				app.updateDoctorName({adviceName:this.name}).then(res =>{
					if(res.status ==1){
						uni.navigateBack({
							
						});
					}
				});
				
				
			}
		},
		onLoad(props) {
			this.name = props.name;
		},
	

	}
</script>

<style lang="scss">
	.container{
		.name-box{
			display: flex;
			margin-left: 43rpx;
			margin-right: 43rpx;
			height: 100rpx;
			border-bottom:  2rpx solid #EEEEEE;
			position: relative;
			//background-color: #DDDDDD;
			.name-tips{
				color: #333333;
				font-size: 15px;
				height: 100rpx;
				line-height: 100rpx;
			}
			.name-input{
				margin-left: 30rpx;
				color: #333333;
				font-size: 15px;
				height: 100rpx;
				flex: 1;
				line-height: 100rpx;
				// border:1rpx solid #007AFF
			}
			.code-button{
				position: absolute;
				color: #FFFFFF;
				background-color: #52A29E !important;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 13px;
				right: 10rpx;
				top: 20rpx;
			}
		}
		.save{
			margin-top: 100rpx;
			margin-left: 220rpx;
			margin-right: 220rpx;
			height: 80rpx;
			line-height: 80rpx;
			color: #FFFFFF;
			background-color: #52A29E;
			text-align: center;
			border-radius: 10rpx;
			font-size: 30rpx;
		}
		
	}
	
</style>
