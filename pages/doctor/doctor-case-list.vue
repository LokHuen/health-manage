<template>
	<!-- 医生营养管理病例界面 -->
	<view class="container">
		<view class="pic-content-box" v-for="(item,index) in list" :key="index">
			<view class="pic-time">{{item.createTime+' 添加'}}</view>
			<view class="ccimglist">
				<image v-for="(img,imgIndex) in item.pathologyUrl" :key="imgIndex" :src="img" mode="aspectFill" @click="previewImage(item,imgIndex)" :class="(imgIndex%3==0)?'imagelistfirst':'imagelist'"></image>
			</view>
		</view>
		<view style="height: 100rpx;"></view>

	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				list: [],
				pageNo: 1,
				patientId:1,
			}
		},
		methods: {
			previewImage(item,imgIndex) {
				uni.previewImage({
					urls:item.pathologyUrl,
					current:imgIndex
				})
			},
			addCase(){
				uni.navigateTo({
					url:'patient-add-case'
				});
			},
			getListData(){
				app.doctorBlList({pageNo:this.pageNo,patientId:this.patientId}).then(res =>{
					if(res.status===1){
						if(this.pageNo===1){
							for (var i = 0; i < res.data.list.length; i++) {
								let pathologyUrl = [];
								if(res.data.list[i].pathologyUrl){
									let imgItems = res.data.list[i].pathologyUrl.split(',');
									for(var j=0;j<imgItems.length;j++){
										pathologyUrl.push(app.globalData.baseUrl+imgItems[j]);
									}
									
								}
								res.data.list[i].pathologyUrl = pathologyUrl;
							}
							this.list = res.data.list;
							
						}else{
							if(res.data.pageCount>=this.pageNo){
								for (var i = 0; i < res.data.list.length; i++) {
									let pathologyUrl = [];
									if(res.data.list[i].pathologyUrl){
										let imgItems = res.data.list[i].pathologyUrl.split(',');
										for(var j=0;j<imgItems.length;j++){
											pathologyUrl.push(app.globalData.baseUrl+imgItems[j]);
										}
					
									}
									res.data.list[i].pathologyUrl = pathologyUrl;
								}
								this.list = this.list.concat(res.data.list);
							}
						}
					}
					console.log(this.list);
					uni.stopPullDownRefresh();
				})
			}
		},
		onPullDownRefresh() {
			this.pageNo = 1;
			this.getListData();
		},
		onReachBottom() {
			this.pageNo ++;
			this.getListData();
		},
		onLoad(props){
			this.patientId = props.patientId;
			this.getListData();		
		}

	}
</script>

<style lang="scss">
	.container {
		.pic-content-box {
			.pic-time {
				font-size: 15px;
				color: #333333;
				padding-top: 40rpx;
				padding-left: 44rpx;
			}

			.ccimglist {
				display: flex;
				flex-wrap: wrap;
				// justify-content:space-between;
				margin-left: 44rpx;
				margin-right: 44rpx;
			   
				.imagelistfirst {
					margin-top: 20rpx;
					width: 200rpx;
					height: 200rpx;
					background-color: #D2D2D2;
				}
				.imagelist {
					margin-top: 20rpx;
					width: 200rpx;
					height: 200rpx;
					background-color: #D2D2D2;
					margin-left: 31rpx;
				}
			}

		}

	}
</style>
