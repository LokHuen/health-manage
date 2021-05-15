<template>
	<view class="container">
		<turnback> </turnback>
		<view class="imagebox" @click="chooseimg(1)">
			<view v-if="!headimg" class="flex upimgbox ct"><uni-icons type="plusempty" size="50" color="#ccc"></uni-icons></view>
			<image v-if="headimg" class="upimgbox" :src="headimg" mode="aspectFit"></image>
			<view class="uptext">上传照片</view>
		</view>
		
		<view v-if="preimg" style="position: fixed;left:0;right:0;top:0;bottom:0;">
			<avatar selWidth="280px" selHeight="280px" ref='avatar' @upload="myUpload" :avatarSrc="preimg" fileType='png' avatarStyle="width: 280px; height: 280px; margin: 40px;"></avatar>
		</view>
		
	</view>
</template>

<script>
	const app = getApp();
	import avatar from "../../components/yq-avatar/yq-avatar.vue";
	import turnback from "../../components/turnback.vue"
	export default {
		components: {
			avatar,turnback
		},
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				preimg:"",
				headimg:"",
			}
		},
		onLoad(props) {
			app.salesmangetOne({}).then(res => {
				if (res.status == 1) {
					if(res.data.workPhoto) this.headimg = this.baseUrl + res.data.workPhoto;
				}
			});
		},
		onShow() {
			
		},
		methods: {
			chooseimg(index){
				this.imgindex = index;
				uni.chooseImage({
				    count: 1, //默认1
				    success: (res)=>{
					    this.preimg = res.tempFilePaths[0];
				    }
				});
			},
			myUpload(rsp) {
				this.preimg = "";
				if(rsp.path){
					this.headimg = rsp.path;
					// console.log(this.headimg)
					this.uploadimg();
				}
				else this.preimg = "";
				
			},
			uploadimg(){
				app.loading("上传中");
				uni.uploadFile({
				    url: "/api/wx/salesman/uploadPic",
				    filePath: this.headimg,
				    name: 'file',
				    formData: {},
				    header: {
					  'salesToken':localStorage.getItem("salesToken"),
					  'uid': localStorage.getItem("uid"),
					  'channel':app.globalData.channel,
				    },
				    success: (rq)=>{
						app.tip("上传成功");
				    },
					fail:()=>{app.tip("上传失败");}
				})
			},

		},

	}
</script>

<style lang="scss" scoped>
	.uptext{
		color:#333;padding-top:50rpx;font-size:36rpx;
		&.other{color:#aaa;font-size:28rpx;}
	}
	.upimgbox{
		border:2rpx solid #ccc;width:400rpx;height:400rpx;margin:auto;
	}
	.imagebox{
		padding:100rpx 0 0 0;text-align:center;
	}
</style>
