<template>
	<!-- 新增病例界面 -->
	<view class="container">
          <view class="title">请上传出院小结（尽可能提供）、病理报告、影像 检查单等内容</view>
		  <view class="pic-content-box">
		  	<view class="ccimglist">
				<view v-for="(item,index) in list" :key="index" :class="(index%3==0)?'img-box-first':'img-box'">
					<image  src="" mode="aspectFill" @click="previewImage(index)" class="imagelist"></image>
					<image src="../../static/icon/icon_remove.png" mode="aspectFill" class="remove-icon" @click="remove(index)"></image>
				</view>
		  	</view>
		  </view>
		  <view class="upload-box" @click="upload">点击上传</view>
		  <view class="button-box">
		  	<button type="default" class="button">提交</button>
		  </view>
	</view>
	
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				list: [1, 2, 3, 4, 5,6,7,8],
			}
		},
		methods: {
			previewImage(index) {
				console.log(index);
			},
			remove(index){
				this.list.splice(index,1);
			},
			upload(){
				
			}
		},
		created() {
			
		}

	}
</script>

<style lang="scss">
	.imagelist {
		width: 175rpx;
		height: 175rpx;
		margin-top: 12.5rpx;
		margin-left: 12.5rpx;
		background-color: #D2D2D2;
	}
	.remove-icon{
		position: absolute;
		width: 25rpx;
		height: 25rpx;
		right: 0;
		top: 0;
	}
	.container{
		.title{
			font-size: 15px;
			color: #333333;
			padding-top: 40rpx;
			padding-left: 40rpx;
			padding-right: 40rpx;
		}
		
		.pic-content-box {
			.ccimglist {
				display: flex;
				flex-wrap: wrap;
				// justify-content:space-between;
				margin-left: 44rpx;
				margin-right: 44rpx;
                .img-box-first{
					margin-top: 20rpx;
					width: 200rpx;
					height: 200rpx;
					position: relative;
				}
				.img-box{
					margin-top: 20rpx;
					width: 200rpx;
					height: 200rpx;
					margin-left: 31rpx;
					position: relative;
				}
				
			}
		
		}
		.upload-box{
			margin-top: 40rpx;
			margin-left: 44rpx;
			height: 60rpx;
			width: 210rpx;
			color: #59A29F;
			border: 2rpx solid #52A29E;
			text-align: center;
			line-height: 60rpx;
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
