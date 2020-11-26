<template>
	<!-- 医生营养管理病例界面 -->
	<view class="container">
		<view class="pic-content-box" v-for="(item,index) in list" :key="index">
			<view class="pic-time">2022/12/12 21:09 添加</view>
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
				app.patientCaseList({pageNo:this.pageNo}).then(res =>{
					console.log(res);
					if(res.status===1){
						if(this.pageNo===1){
							this.list = res.data.list;
						}else{
							if(res.data.pageList.pageCount>this.pageNo){
								this.list = this.list.concat(res.data.list);
							}
						}
					}
					
					for (var i = 0; i < this.list.length; i++) {
						let pathologyUrl = [];
						let imgItems = this.list[i].pathologyUrl.split(',');
						for(var j=0;j<imgItems.length;j++){
							pathologyUrl.push(app.globalData.baseUrl+imgItems[j]);
						}
						this.list[i].pathologyUrl = pathologyUrl;
					}
					uni.stopPullDownRefresh();
				})
			}
		},
		onShow(){
			this.pageNo = 1;
		    this.getListData();		
		},
		onPullDownRefresh() {
			this.pageNo = 1;
			this.getListData();
		},
		onReachBottom() {
			this.pageNo ++;
			this.getListData();
		},

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
