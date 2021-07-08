<template>
	<view class="container">
		<view v-for="(item,index) in list" class="list-item">
         <view class="title">
			 {{'主观感受：'+(item.illnessFeeling?item.illnessFeeling:'无')}}
			 <view class="time">
			 	{{item.currentVisitTime}}
			 </view>
		</view>
		<view class="deatil">
			<view class="left">治疗阶段</view>
			<view class="right">{{item.phase?item.phase:'无'}}</view>
		</view>
		<view class="deatil1">
			<view class="left1">用药依从性</view>
			<view class="right1" style="white-space: pre-wrap;">{{item.dosageDependence?item.dosageDependence:'无'}}</view>
		</view>
		
		<view class="deatil">
			<view class="left">其它治疗方式</view>
			<view class="right">{{item.otherTreatement?item.otherTreatement:'无'}}</view>
		</view>

		</view>

	</view>

</template>

<script>
	let app = getApp();
	export default {
		data() {
			return {
				list: []
			}
		},
		methods: {
			getList(){
				app.feelingList().then(res =>{
					if(res.status == 1){
						this.list = res.data;
					}
				})
			}

		},
		onLoad(props) {
            this.getList();
		}


	}
</script>


<style lang="scss">
	.container {
		background-color: #FFFFFF;
		padding-bottom: 50rpx;
        .list-item {
        	background-color: #F6F6F6;
        	border-radius: 10rpx;
        	margin-top: 20rpx;
        	margin-left: 20rpx;
        	margin-right: 20rpx;
        	.title {
				margin-left: 20rpx;
				margin-right: 20rpx;
				height: 100rpx;
				line-height: 100rpx;
				color: rgba(16, 16, 16, 100);
				font-size: 32rpx;
				text-align: left;
				font-family: PingFangSC-bold;
				font-weight: 500;
				padding-left: 20rpx;
				border-bottom: 2rpx solid rgba(187, 187, 187, 100);
				position: relative;
				.time{
					position: absolute;
					right: 0rpx;
					top: 0rpx;
					color: rgba(106, 105, 105, 100);
					font-size: 28rpx;
					text-align: right;
					font-family: PingFangSC-regular;
				}
			}
			
			.deatil{
				margin-top: 20rpx;
				display: flex;
				padding-left: 40rpx;
				height: 60rpx;
				//line-height: 80rpx;
				.left{
					width: 200rpx;
					color: rgba(16, 16, 16, 100);
					font-size: 28rpx;
					text-align: left;
					font-family: PingFangSC-bold;
					font-weight: 500;
				}
				.right{
					color:#333333;
					font-size: 28rpx;
					text-align: left;
					font-family: PingFangSC-regular;
				}
			}
			
			.deatil1{
				display: flex;
				padding-left: 40rpx;
				//padding-bottom: 20rpx;
				.left1{
					width: 200rpx;
					color: rgba(16, 16, 16, 100);
					font-size: 28rpx;
					text-align: left;
					font-family: PingFangSC-bold;
					//height: 50rpx;
					//line-height: 50rpx;
					font-weight: 500;
				}
				.right1{
					color:#333333;
					font-size: 28rpx;
					text-align: left;
					font-family: PingFangSC-regular;
					//height: 50rpx;
					//line-height: 50rpx;
				}
			}
        }
		
	}
	
</style>
