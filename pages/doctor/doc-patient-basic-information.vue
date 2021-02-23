<template>

	<view>
		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">姓名</view>
				<view class="health-item-detail">{{infoData.patientName}}</view>
			</view>
		</view>
		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">性别</view>
				<view class="health-item-detail">{{infoData.patientGender}}</view>
			</view>
		</view>

		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">出生日期</view>
				<view class="health-item-detail">{{infoData.birthday}}</view>
			</view>
		</view>

		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">疾病诊断</view>
				<view class="health-item-detail">{{infoData.illness}}</view>
			</view>
		</view>

		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">所在城市</view>
				<view class="health-item-detail">{{infoData.region}}</view>
			</view>
		</view>
		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">身高</view>
				<view class="health-item-detail">{{(infoData.height?infoData.height:'')+'cm'}}</view>
			</view>
		</view>

		<view class="health-content">
			<view class="health-item">
				<view class="health-item-title">体重</view>
				<view class="health-item-detail">{{(infoData.weight?infoData.weight:'')+'kg'}}</view>
			</view>
		</view>


	</view>

</template>

<script>
	const app = getApp();
	export default {
		onShow() {
			this.getInfo();

		},
		data() {
			return {
				infoData:{},
				id:1
			}
		},
		onLoad(props){
			this.id = props.id ||1;
		},
		methods:{
			getInfo(){
				app.basicInfox({id:this.id}).then(res =>{
					if(res.status==1){
						this.infoData = res.data;
					}
				});
			},


		}
	}
</script>

<style lang="scss">
	.health-content {
		margin: 0 44rpx;

		.health-item {
			border-bottom: 0.01rem #EEEEEE solid;
			padding-bottom: 0.4rem;
			display: block;
			height: 96rpx;
			text-align: center;

			.health-item-title {
				font-size: 30rpx;
				color: #333333;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				float: left;
			}

			.health-item-detail {
				font-size: 30rpx;
				color: #333333;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				float: right;
			}
		}
	}

	.health-update {
		text-align: center;
		position: absolute;
		bottom: 50rpx;
		width: 100%;

		.health-update-button {
			width: 85%;
			height: 90rpx;
			font-size: 34rpx;
			color: white;
			background-color: #52A29E;
			border-radius: 45rpx;
		}
	}
</style>
