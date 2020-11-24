<template>
	
	<view class="edit">
		<view class="health-title-content">
			<view class="health-title">请根据自身健康情况如是天蝎以下数据，我们将根据您的数据分析出您的营养情况</view>
		</view>
		<view style="background-color: #F6F6F6;height: 20rpx;"></view>
		<view class="health-content">
			<view  v-for="(item,index) in listDatas" >
				<view class="health-item">
					<view class="health-item-title">{{item.title}}</view>
					<input class="health-item-input" placeholder-style="color:#999999;font-size:30rpx" :placeholder="112" />
				</view>
			</view>
			<view class="health-item">
				<view class="health-item-title">5、最近2周内我的体重</view>
				<view class="i-checked-item">
					<text class="i-checked-label">下降</text>
					<checkbox></checkbox>
				</view>
				<view class="i-checked-item">
					<text class="i-checked-label">下降</text>
					<checkbox></checkbox>
				</view>
				<view class="i-checked-item">
					<text class="i-checked-label">下降</text>
					<checkbox></checkbox>
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
	.edit{
		uni-checkbox .uni-checkbox-input {
		    border: 1px solid #26c39c;
		    background-color: #21803c;
		}
		uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		    color: #007aff!important;
		}
	}
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
				border: 1rpx #E5E5E5 solid;
				border-radius: 4rpx;
			}
			.i-checked-item {
				height: 76rpx;
				margin-top: 22rpx;
				padding: 0 40rpx;
				color: #666666;
				justify-content: space-between;
				font-size: 30rpx;
				border: 1rpx #E5E5E5 solid;
				border-radius: 4rpx;
				display: flex;
				align-items: center;
				.uni-checkbox-input{
					border: 1rpx solid #999999;
				}
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
