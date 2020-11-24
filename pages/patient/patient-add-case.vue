<template>
	<!-- 新增病例界面 -->
	<view class="container">
          <view class="title">请上传出院小结（尽可能提供）、病理报告、影像 检查单等内容</view>
		  <view class="pic-content-box">
		  	<view class="ccimglist">
				<view v-for="(item,index) in list" :key="index" :class="(index%3==0)?'img-box-first':'img-box'">
					<image  :src="item" mode="aspectFit" @click="previewImage(index)" class="imagelist"></image>
					<image src="../../static/icon/icon_remove.png" mode="aspectFill" class="remove-icon" @click="remove(index)"></image>
				</view>
		  	</view>
		  </view>
		  <view class="upload-box" @click="chosePic">点击上传</view>
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
			previewImage(index) {
				uni.previewImage({
					urls:this.list,
					current:index
				})
			},
			remove(index){
				this.list.splice(index,1);
			},
			chosePic(){
				if(this.list.length>8){
					app.tip('最多选取9张图片');
					return;
				}
				uni.chooseImage({
				    count: 9-this.list.length, //默认9
				    sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				    // sourceType: ['album'], //从相册选择
				    success: (res)=>{
					    this.list = this.list.concat(res.tempFilePaths);
				    }
				});
			},
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
							console.log(res.data);
							let data = JSON.parse(res.data);
							if(data.status==1){
								uploadCount ++;
								this.pathologyUrl = this.pathologyUrl+data.data.pictureUrl+',';
								console.log('uploadCount=='+uploadCount);
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
					}
				});
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
