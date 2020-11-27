<template>
	<!-- 患者病例管理界面 -->
	<view class="container">
		<view class="add-case-box">
			<view class="dashed-box" @click="addCase">+ 新增病例</view>
			<view class="add-bottom"></view>
		</view>
		<view class="pic-content-box" v-for="(item,index) in list" :key="index">
			<view class="pic-time">{{item.createTime+'添加'}}</view>
			<view class="ccimglist">
				<image v-for="(imgItem,imgIndex) in item.pathologyUrl" :key="imgIndex" :src=imgItem mode="aspectFill" @click="previewImage(item,imgIndex)" :class="(imgIndex%3==0)?'imagelistfirst':'imagelist'"></image>
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
		onLoad(){
		     
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
							if(imgItems[j].indexOf(app.globalData.baseUrl) ==-1){
								pathologyUrl.push(app.globalData.baseUrl+imgItems[j]);
							}
						}
						this.list[i].pathologyUrl = pathologyUrl;
						console.log(this.list);
					}
					uni.stopPullDownRefresh();
				})
			}
		},

	}
</script>

<style lang="scss">
	.container {

		.add-case-box {
			height: 200rpx;
			position: relative;

			.dashed-box {
				text-align: center;
				margin-top: 60rpx;
				margin-left: 85rpx;
				margin-right: 85rpx;
				height: 120rpx;
				line-height: 120rpx;
				border: 2rpx dashed #52A29E;
				color: #52A29E;
			}

			.add-bottom {
				position: absolute;
				bottom: 0rpx;
				left: 0rpx;
				right: 0rpx;
				height: 20rpx;
				background-color: #F7F8F8;
			}
		}

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
					background-color: #999999;
				}
				.imagelist {
					margin-top: 20rpx;
					width: 200rpx;
					height: 200rpx;
					background-color: #999999;
					margin-left: 31rpx;
				}
			}


		}

	}
</style>
