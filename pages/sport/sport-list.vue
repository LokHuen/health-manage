<template>
	<!-- 运动列表界面 -->
	<view class="container">
		<view class="search-box">
			<image src="../../static/icon/incon_search.png" class="search-icon" mode="widthFix" ></image>
			<input type="text" v-model="searchtext" class="search-input" placeholder="搜索" maxlength="10" @input="seatchTextChange"/>
		</view>
		
		<view class="condition-box" @click="chosesport" v-if="!searchtext">
			{{sportType.name}}
		    <image src="../../static/icon/right_arrow.png" mode="widthFix" class="condition-arrow"></image>
		</view>
		
		<view class="search-result" v-if="searchtext && listDatas.length>0">搜索结果</view>
		
		<view class="box">
			<view class="list-content-box" v-for="(item,index) in listDatas" :key = "index" @click="select(item)">
				<image :src="item.pic" mode="widthFix" class="list-img"></image>
				<view class="list-msg">
					<view class="list-title">{{item.name}}</view>
					<view class="list-detail">
						<view class="list-detail-number">{{item.calorie}}</view>
						<view class="list-detail-tip"> 千卡/ </view>
						<view class="list-detail-number">{{item.exerciseTime}} </view>
						<view class="list-detail-tip"> 分钟 </view>
					</view>
				</view>
				
			</view>
		</view>
		
		
		<uni-popup ref="popup" type="bottom">
			<view class="popup-bg">
				<view style="height: 40rpx;"></view>
				<view class="popup-title">
					选择运动类别
					<image src="../../static/icon/close_new.png" mode="widthFix" class="popup-close" @click="close"></image>
				</view>
				<view style="height: 5rpx;"></view>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view class="sport-item" v-for="(item,index) in sportTypeItems" :key="index" @click="selectsportType(item)">
						{{item.name}}
					</view>
				</scroll-view>
				<view style="height: 20rpx;"></view>
			</view>
		</uni-popup>
	</view>
</template>



<script>
	const app = getApp();
	export default {
		data() {
			return {
				listDatas: [],
				searchtext:'',
				sportTypeItems: [],
				sportType: {
					name: '全部',
					id: ''
				},
				
			}
		},
		methods: {
			getType(){
				app.sportType().then(res =>{
					if (res.status == 1) {
						this.sportTypeItems.push({
							name: '全部',
							id: ''
						});
						this.sportTypeItems = this.sportTypeItems.concat(res.data);
					}
				})
			},
			chosesport() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			},
			seatchTextChange() {
				console.log("change=====")
				this.sportType = {
						name: '全部',
						id: ''
				},
				this.getListData();
			},
			selectsportType(item) {
				this.sportType = item;
				this.close();
				this.getListData();
			},
			getListData(){
				console.log('searchtext==='+this.searchtext)
				app.sportList({
					name:this.searchtext,
				    type:this.sportType.id
				}).then( res=>{
					if(res.status ==1){
						// for (var i = 0; i < res.data.length; i++) {
						// 	//图片如果没有包含域名，就把域名加上去
						// 	if(!res.data[i].pic.match(app.globalData.baseUrl)){
						// 		res.data[i].pic = app.globalData.baseUrl+res.data[i].pic;
						// 	}
							
						// }
						this.listDatas = res.data;
					}
				});
			},
			select(item){
				uni.navigateTo({
					url:'record-sport?info='+JSON.stringify(item)
				})
			}
			
		},
		onLoad(){
			this.getType();
			this.getListData();
		}
		

	}
</script>

 <style lang="scss">
  .container{
	  padding: 50rpx 30rpx;
	  .box {
	  	padding: 0 30rpx;
	  	margin-bottom: 30rpx;
	  	border-radius: 20rpx 20rpx 20rpx 20rpx;
	  	display: flex;
	  	flex-direction: column;
	  	box-shadow: 0rpx 2rpx 10rpx rgba(0,0,0,0.05);
	  	box-sizing: border-box;
	  }
	  .search-box {
	  	height: 73rpx;
	  	background-color: #fff;
	  	border-radius: 20rpx;
	  	display: flex;
	  	align-items: center;
	  	box-shadow: 0 2rpx 10rpx rgba(0,0,0,0.05);
	  
	  	.search-icon {
	  		margin-left: 20rpx;
	  		height: 45rpx;
	  		width: 45rpx;
	  	}
	  
	  	.search-input {
	  		margin-left: 10rpx;
	  		height: 78rpx;
	  		line-height: 78rpx;
	  		flex: 1;
	  	}
	  }
	 .condition-box {
	 	margin-top: 20rpx;
	 	width: 100%;
	 	height: 80rpx;
	 	line-height: 80rpx;
	 	color: #22AEE9;
	 	text-align: center;
	 	font-size: 28rpx;
	 	font-weight: 700;
	 	display: flex;
	 	align-items: center;
	 	justify-content: center;
	 
	 	.condition-arrow {
	 		position: relative;
	 		margin-left: 6rpx;
	 		width: 24rpx;
	 		height: 24rpx;
	 	}
	 }
	  .search-result {
	  	color: #707578;
	  	font-size: 30rpx;
	  	margin-left: 30rpx;
	  	margin-top: 30rpx;
	  }
	  .sport-item {
	  	font-size: 30rpx;
	  	margin-left: 30rpx;
	  	margin-right: 30rpx;
	  	color: #272727;
	  	text-align: center;
	  	height: 96rpx;
	  	line-height: 96rpx;
	  	border-bottom: 1rpx solid #CFCFCF;
	  }
	  
	  
	  .popup-bg {
	  	background: #FFFFFF;
	  	border-radius: 20rpx 20rpx 0px 0px;
	  
	  	.popup-title {
	  		height: 50rpx;
	  		font-size: 30rpx;
	  		color: #707578;
	  		text-align: center;
	  		position: relative;
	  
	  		.popup-close {
	  			position: absolute;
	  			width: 36rpx;
	  			height: 36rpx;
	  			//background-color: #343434;
	  			right: 30rpx;
	  		}
	  	}
	  }
	 .list-content-box {
	 	padding: 40rpx 0rpx 23rpx 0;
	 	display: flex;
	 	border-bottom: 1rpx solid #EBECF2;
	 
	 	.list-img {
	 		width: 100rpx;
	 		height: 100rpx;
	 		background-color: #fff;
	 	}
	 
	 	.list-msg {
	 		padding-left: 30rpx;
	 		height: 100rpx;
	 		display: flex;
	 		flex-direction: column;
	 		position: relative;
	 
	 		.list-title {
	 			width: 56rpx;
	 			height: 40rpx;
	 			font-size: 28rpx;
	 			font-family: PingFang SC;
	 			font-weight: bold;
	 			line-height: 40rpx;
	 			color: #333333;
	 			opacity: 1;
	 		}
	 
			.list-detail {
				padding-top: 17rpx;
				font-size: 28rpx;
				font-weight: 700;
				color: #333333;
				display: flex;
				font-family: PingFang SC;
			
				.list-detail-number {
					color: #22AEE9;
				}
			
				.list-detail-tip {
					color: #272727;
				}
			}
		  }
	  }
  }
 </style>
