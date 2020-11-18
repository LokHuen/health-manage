<template>
	<view>
		<view class="box">
			<view class="title">影像图上传</view>
			<view class="sub-title">填写基本信息，便于专家评估病情</view>
			<view style="height: 15px;"></view>
			<view class="ccimglist">
				<view class="imagelist" v-for="(item,index) in list" :key="index">
					<image class="image" :src="baseUrl+item" mode="aspectFill" @click="previewImage(index)"></image>
					<image class="imaged" :src="imageUrl+'/icon/icon_remove_pic.png'" mode="widthFix" @click="removeImage(index)"></image>
				</view>
				<view class="imagelist" v-if="showAdd">
					<image class="image" :src="imageUrl+'/icon/icon_add_pic.png'" mode="aspectFit" @click="addImage"></image>
				</view>
			</view>
			<view class="bottom-blank"></view>

		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				imageUrl: this.$imageUrl,
				baseUrl: app.globalData.baseUrl,
				list: [],
				showAdd: true
			};
		},
		methods: {
			previewImage(res) {
				uni.previewImage({
					current: res,
					urls: this.list,
				})
			},
			addImage() {
				console.log("添加图片")
				let baseUrl = app.globalData.baseUrl
				let that = this
				uni.chooseImage({
					count: 8 - this.list.length, //默认9
					sizeType: ['original', 'compressed'],
					success: res => {
						const paths = res.tempFilePaths;
						for (let i = 0; i < paths.length; i++) {
							uni.uploadFile({
								url: baseUrl + '/wx/interpret/mri/uploadPicture',
								filePath: paths[i],
								name: 'file',
								formData: {
									'tkbgjd-token': uni.getStorageSync("token")
								},
								success: (res) => {
									that.uploadSuccess(JSON.parse(res.data))
								}
							});
						}
					}
				});
			},
			uploadSuccess(data) {
				if (data.status == 1) {
					let url = data.data.pictureUrl
					this.list.push(url)
					this.showAdd = this.list.length > 7 ? false : true
					this.$emit("imageChange", this.list)
				} else {
					console.log('上传失败')
				}
			},
			removeImage(res) {
				this.list.splice(res, 1)
				this.showAdd = this.list.length > 7 ? false : true
			}
		}
	}
</script>

<style>
	.box {
		margin-top: 10px;
		margin-left: auto;
		margin-right: auto;
		height: auto;
		width: 93%;
		background-color: #FFFFFF;
		color: #333333;
		border-radius: 5px;
		box-shadow: 1px 1px 5px #999999;
	}

	.title {
		font-size: 16px;
		color: #333333;
		margin-left: 15px;
		padding-top: 18px;
		height: 15.5px;
		line-height: 15.5px;
	}

	.sub-title {
		font-size: 13px;
		color: #9A9A9A;
		margin-left: 15px;
		margin-top: 14.5px;
		height: 12.5px;
		line-height: 12.5px;
	}

	.bottom-blank {
		padding-bottom: 15px;
	}

	.ccimglist {
		display: flex;
		flex-wrap: wrap;
	}

	/* .ccimglist .imagelist{width:67px;height:67px;margin:10rpx 8px;} */
	.ccimglist .imagelist {
		width: 23%;
		height: 20vw;
		margin: 8rpx 1%;
	}

	.imagelist {
		position: relative;
	}

	.imagelist .image {
		width: 100%;
		height: 100%;
	}

	.imagelist .imaged {
		position: absolute;
		right: -10rpx;
		top: -10rpx;
		width: 30rpx;
	}
</style>
