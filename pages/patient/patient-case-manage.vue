<template>
	<!-- 患者病例管理界面 -->
	<view class="container">
		<view class="add-case-box">
			<view class="dashed-box" @click="addCase">+ 新增病例</view>
			<view class="add-bottom"></view>
		</view>
		<view class="pic-content-box" v-for="(item,index) in list" :key="index" v-if="item.pathologyUrl.length>0">
			
			<view class="title">
				<view class="pic-time">{{'于' + item.createTime +'时添加'}}</view>
				<view class="deleteBtn" @click="deleteList(index)">删除</view>
			</view>
			
			<view class="ccimglist">
				<image v-for="(imgItem,imgIndex) in item.pathologyUrl" :key="imgIndex" :src=imgItem mode="aspectFill" @click="previewImage(item,imgIndex)" :class="(imgIndex%3==0)?'imagelistfirst':'imagelist'"></image>
			</view>
		</view>

		<view class="no-data-tips" v-if="list.length ==0">暂无数据</view>
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
			deleteList(index) {
				this.list.splice(index,1);
			},
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

	}
</script>

<style lang="scss">
	.container {
		padding:0 30rpx;
		
		.add-case-box {
			position: relative;
			padding: 50rpx 157rpx;
			.dashed-box {
				text-align: center;
				margin: 0 auto;
				width: 436rpx;
				height: 104rpx;
				line-height: 120rpx;
				border: 2rpx dashed #52A29E;
				color: #52A29E;
			}

			.add-bottom {
				position: absolute;
				bottom: 0rpx;
				left: 0rpx;
				right: 0rpx;
				height: 1rpx;
				background-color: #EBECF2;
			}
		}

		.pic-content-box {
			padding: 40rpx 0 30rpx 0;
			border-bottom: 1rpx solid #EBECF2;
			.title {
				font-size: 28rpx;
				display: flex;
				justify-content: space-between;
			}
			.deleteBtn {
				color: #52A29E;
			}
			.pic-time {
				font-size: 28rpx;
				color: #333333;
				
			}

			.ccimglist {
				display: flex;
				flex-wrap: wrap;
				// justify-content:space-between;
			   
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
		.no-data-tips{
			margin-top: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: #666666;
		}

	}
</style>
