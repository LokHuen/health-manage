<template>
	
	<view>
		<view class="health-title-content">
			<view class="health-title">请根据自身健康情况如是天蝎以下数据，我们将根据您的数据分析出您的营养情况</view>
		</view>
		<view style="background-color: #F6F6F6;height: 20rpx;"></view>
		<view class="health-content">
			<view  v-for="(item,index) in listDatas" >
				<view class="health-item">
					<view class="health-item-title">{{item.title}}</view>
					<input class="health-item-input" placeholder-style="color:#999999;font-size:30rpx" :placeholder="112" />
					<!-- <view class="health-item-detail">{{item.detail}}</view>  {{item.placeholder}} -->
				</view>
			</view>
			<view class="health-item">
				<view class="health-item-title">5、最近2周内我的体重</view>
				<view class="health-item-detail">
					下降
					<checkbox value="cb" checked="true" color="#FFCC33" style="transform:scale(0.7)" />
				</view>
				<view class="health-item-detail">
					无改变
				</view>
				<view class="health-item-detail">
					增加
				</view>
			</view>
			
			<view class="health-update">
				<button class="health-update-button">确定</button>
			</view>
		</view>
		
		
	</view>
	
</template>

 
<script>
	export default {
		data() {
			return {
				listDatas:[{
						title:"1、我现在的体重是（单位：公斤）",
						detail:"",
						placeholder:"请填写公斤数"
					}, {
						title:"2、我的身高是（单位：米）",
						detail:"",
						placeholder:"请填写"
					}, {
						title:"3、1月前我的体重是（单位：公斤）",
						detail:"",
						placeholder:"请填写公斤数"
					}, {
						title:"4、6月前我的体重是（单位：公斤）",
						detail:"",
						placeholder:"请填写公斤数"
					}
				],
				current:0
			}
		},
		methods:{
			onClickItem(e) {
				this.current = e.currentIndex;
			}
		}
	}
	
</script>

<style lang="scss">
/* 	.navigationBar{
		position: absolute;
		height: 50px;
		width: 100%;
		background-color: #f2f2f2;
		margin: auto;
	}
 */
	.health-title {
		padding: 35rpx 38rpx 35rpx;
		line-height: 50rpx;
		font-size: 30rpx;
		color: #333333;
	}
	
	.health-content {
		background-color: white;
		.health-item {
			padding: 35rpx 38rpx 0rpx;
			.health-item-title {
				color: #333333;
				font-size: 30rpx;
			}
			.health-item-input {
				margin-top: 30rpx;
				padding-left: 40rpx;
				height: 76rpx;
				border: 0.5rpx #E5E5E5 solid;
			}
			.health-item-detail {
				height: 76rpx;
				margin-top: 21rpx;
				padding-left: 40rpx;
				color: #666666;
				font-size: 30rpx;
				border: 0.5rpx #E5E5E5 solid;
				display: flex;
				// justify-content: center;
				align-items: center;
			}
		}
		
		.health-update {
			  text-align: center;
			  margin-top: 70rpx;
			  margin-bottom: 50rpx;
			  width: 100%;
			  .health-update-button {
			  	 margin-left: 60rpx;
				 margin-right: 60rpx;
			  	 height: 90rpx;
			  	 font-size: 34rpx;
			  	 color: white;
			  	 background-color: #52A29E;
			  	 border-radius: 45rpx;
			  }
		}
	}
	
</style>
