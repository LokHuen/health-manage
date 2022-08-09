<template>
	<!-- 新增病例界面 -->
	<view class="container">
          <view class="title">上传加体检报告图片、医院诊断病例、出院小结等内容</view>
<!-- 		  <view class="pic-content-box">
		  	<view class="ccimglist">
				<view v-for="(item,index) in list" :key="index" :class="(index%3==0)?'img-box-first':'img-box'">
					<image  :src="item" mode="aspectFill" @click="previewImage(index)" class="imagelist"></image>
					<image src="../../static/icon/icon_remove.png" mode="aspectFill" class="remove-icon" @click="remove(index)"></image>
				</view>
		  	</view>
		  </view> -->
		  
		  <view class="info-box">
			  <text>{{ list }}</text>
		  	<!-- <view class="title">*上传体检报告照片/病例照片</view> -->
		  	<view class="example-body" style="display: flex;">
		  		<uni-file-picker 
					:auto-upload="false"
					ref="files"
					mode="grid" 
					v-model="list" 
					file-extname="png,jpg"
					fileMediatype="image"
					:limit="9" 
					title="最多选择9张图片"
					@select="selectPic">
				</uni-file-picker>
		  	</view>
		  </view>
		  
		  <!-- <view class="upload-box" @click="chosePic">点击上传</view> -->
		  <view class="button-box">
		  	<button type="default" class="button" @click="uploadPic">提交</button>
		  </view>
	</view>
	
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				list: [],
				pathologyUrl:''
			}
		},
		methods: {
			
			selectPic(res){
				console.log(res);
				this.list = this.list.concat(res.tempFilePaths);
			},
			//上传图片
			uploadPic(){
				if(this.list.length==0){
					app.tip('请选择照片');
					return;
				}
				let uploadCount = 0;
				for (let i = 0; i < this.list.length; i++) {
					let formData = {'uid':uni.getStorageSync("uid")}
					uni.uploadFile({
						url: '/api' + '/wx/patient/bl/uploadPicture',
						filePath: this.list[i],
						name: 'file',
						formData:formData,
						success:(res)=>{
							let data = JSON.parse(res.data);
							if(data.status==1){
								uploadCount ++;
								this.pathologyUrl = this.pathologyUrl + data.data.pictureUrl + ',';
								console.log('uploadCount ==' + uploadCount);
								if(uploadCount == this.list.length){
									//移除最后的逗号
									this.pathologyUrl = this.pathologyUrl.substring(0, this.pathologyUrl.length - 1);
									this.submit();
									console.log('pathologyUrl==='+this.pathologyUrl);
								}
							}
						    
						},
					});
				}
			},
			
			submit(){
				app.savePatientCase({pathologyUrl:this.pathologyUrl}).then(res =>{
					if(res.status == 1){
						app.tip('上传成功');
						this.list = [];
						this.pathologyUrl = '';
						uni.navigateBack({
							
						});
					}
				});
			}
		}
	}
</script>

<style lang="scss">
	.imagelist {
		width: 175rpx;
		height: 175rpx;
		margin-top: 12.5rpx;
		margin-left: 12.5rpx;
	}
	.remove-icon{
		position: absolute;
		width: 25rpx;
		height: 25rpx;
		right: 0;
		top: 0;
	}
	.container{
		padding: 50rpx 30rpx;
		position: relative;
		
		.title{
			font-size: 28rpx;
			font-weight: 600;
			color: #333333;
		}
		
		.pic-content-box {
			.ccimglist {
				display: flex;
				flex-wrap: wrap;
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
		}
		.button-box{
			position: fixed;
			bottom: 100rpx;
			width: 690rpx;
			
			.button{
				height: 100rpx;
				margin: 0 auto;
				background-color: #57C1BB !important;
				border-radius: 50rpx;
				color: #FFFFFF;
				font-size: 28rpx;
				line-height: 100rpx;
			}
		}
	}
</style>
