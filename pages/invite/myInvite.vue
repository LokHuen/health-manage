<template>
	<view class="containter">
		<!-- <view class="category-box">
			<view :class="'category-item-notchose '+(choseCategory==index?'chose':'')" v-for="(item,index) in subCategoryItms" :key="index" @click="choseCate(index)">
				<text :class="(choseCategory==index?'chose':'')">{{item}}</text>
			</view>
		</view> -->
		
		<view style="height: 20rpx; background-color: #F5F5F5;"></view>

		<view class="list-box">
			<view v-for="(item,index) in list" :key="index" click="select(item)">
				<view class="list-content flex" >
					<image class="goodsimg" :src="item.portrait" mode="aspectFill"></image>
				
					<view style="flex:1;">
						<view class="list-title">{{item.name}}</view>
						<view class="list-tag" >
							邀请时间：{{item.createTime}}
						</view>
					</view>
					
				</view>
				<view style="height: 20rpx; background-color: #F5F5F5;width:100%;"></view>
			</view>
			

		</view>
		<view class="nodatatips" v-if="list.length==0">暂无数据</view>


	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl: app.globalData.baseUrl,
				imgUrl: app.globalData.imageUrl,
				pageCount:1,
				pageNo: 1,
				goodname: "",
				choseCategory: 0,
				list: [],
				subCategoryItms: ["全部","今日"],
				subCate: '',
				orderBy: 1, //排序方式 （1.按序列号 2.按上架时间 3：销量）
				classId: '',
				id: '',
				title: '',
				subTitle: '',
				intro: ''
			}
		},
		onLoad(options) {
			
			this.id = options.id;
			this.goodname = options.name;
			uni.setNavigationBarTitle({
				title: options.title
			});
			this.title = options.title;
			this.subTitle = options.subTitle;
			this.intro = options.intro;
			
			this.choseCategory = (options.type!==undefined)?parseInt(options.type):this.choseCategory;
			this.refreshData();
			
		},
		onShow() {
			
		},
		methods: {
			select(item) {
				uni.navigateTo({
					url: 'detail?id=' + item.id
				});
			},
			closepopup() {
				this.$refs.popup.close();
			},
			search(val) {
				app.tip('搜索')
				this.goodname = val.value;
				this.refreshData();
			},
			choseCate(index){
				this.choseCategory = index;
				this.orderBy = index+1;
				this.refreshData();

			},
			refreshData(){
				this.pageNo = 1;
				this.getListData();
			},
			loadMoreDate(){
				this.pageNo ++ ;
				this.getListData();
			},
			getListData(){
				if(this.pageCount<this.pageNo) return;
				app.loading("加载中")
				app.usermyInviteList({
					// orderBy:this.orderBy,
					// classId:this.classId,
					// choiceId:this.choseCategory+1,
					pageNo:this.pageNo
				}).then(res =>{
					app.loaded();
					this.pageCount = res.data.pageCount>1?res.data.pageCount:1;
					if(this.pageNo===1){
						this.list = res.data.list;
					}else{
						this.list = this.list.concat(res.data.list);
					}
				    uni.stopPullDownRefresh();
				});
			},

		},
		// onPullDownRefresh(){
		// 	this.refreshData();
		// },
		onReachBottom(){
			this.loadMoreDate();
		},

	}
</script>

<style  lang="scss">
	page{
		background-color:#f5f5f5;min-height: 100vh;
	}
	.inputbox{font-size: 28rpx;color: #fff;width: 100%;padding:0 20rpx;box-sizing:border-box;}
	.containter {
		.uni-searchbar {
			background-color: #F5F5F5 !important;
		}

		background-color: #F5F5F5;

		.tip-box {
			margin-top: 30rpx;
			background-color: #FFFFFF;
			margin-left: 30rpx;
			margin-right: 30rpx;
			text-align: center;
			padding-top: 30rpx;

			.title {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #199F90;
			}

			.subTitle {
				font-size: 22rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #199F90;
				margin-top: 15rpx;
			}

			.intro {
				margin-top: 20rpx;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				text-align: left;
				padding-left: 50rpx;
				padding-right: 50rpx;
				padding-bottom: 50rpx;
				line-height: 50rpx;
			}
		}

		.category-box {
			display: flex;padding:20rpx 40rpx 30rpx;box-sizing:border-box;
			z-index: 999;flex-wrap: nowrap;
			position: sticky;
			top: 0;
			background-color: #f5f5f5;align-items: flex-end;
		}

		.mingoodname {
			font-size: 26rpx;
			color: #272727;
			padding-top: 10rpx;
			margin-left: 30rpx;
		}

		.category-item-notchose {
			padding:0 40rpx 0 0;
			color: #333;font-size: 28rpx;
			&.chose {
				color: #333;font-size: 32rpx;font-weight:bold;
			}
			.chose {
				padding-bottom:10rpx;border-bottom:2rpx solid #ccc;
			}
		}

		.arrow {
			margin-left: 10rpx;
			width: 20rpx;
			height: 14rpx;
			margin-top: 40rpx;
		}

		.nodatatips {
			text-align: center;
			color: #666666;
			// height: calc(100vh-100);
			line-height: calc(100vh - 100rpx);
		}

		.list-box {
			background-color: #F5F5F5;

			.list-content {
				background-color: #FFFFFF;
				margin-left: 30rpx;
				margin-right: 30rpx;
				box-sizing:border-box;padding: 20rpx;
				border-radius: 5px 5px 0px 0px;
				.goodsimg{width:100rpx;height:100rpx;border-radius:50%;margin-right:20rpx;}

				.swiper-content {
					position: relative;

					.swiper {
						height: 420rpx;

						swiper-item {
							width: 100%;
							height: 100%;

							image {
								width: 100%;
								height: 420rpx;
								border-radius: 5px 5px 5px 5px;
							}
						}
					}

					.playbox {
						position: absolute;
						right: 30rpx;
						bottom: 18rpx;
						width: 84rpx;
						line-height: 46rpx;
						background: rgba(38, 42, 38, 0.4);
						border-radius: 22rpx;
						font-size: 22rpx;
						color: #fff;
						text-align: center;
					}
				}

				.list-title {
					font-size: 16px;
					color: #272727;
					overflow: hidden;
					    text-overflow: ellipsis;
					    display: -webkit-box;
					    -webkit-box-orient: vertical;
					    -webkit-line-clamp: 1;
				}
				.list-tag {
					// position: absolute;
					right: 50rpx;
					top: 10rpx;
					font-size: 13px;
					color: #666;
					border-radius: 19rpx;
					padding: 10rpx 0px 0;
				}

				.list-price {
					position: relative;
					color: #EA132D;
					font-size: 16px;
					margin-top: 15rpx;
					display: flex;

					

					.originalPrice {
						font-size: 14px;
						margin-left: 15rpx;
						margin-top: 4rpx;
						color: #666666;
						text-decoration: line-through;
					}

					.price {
						margin-left: 15rpx;
						color: #BF0909;
					}
				}

				.list-buybtn {
					margin-top: 40rpx;
					border-radius: 10rpx;
					margin-left: 55rpx;
					margin-right: 55rpx;
					background-color: #CC0000;
					color: #FFFFFF;
					font-size: 19px;
					height: 75rpx;
					line-height: 75rpx;
					text-align: center;
				}
			}
		}

		.popup-content {
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 12px 12px 0px 0px;

			.popup-title {
				font-size: 14px;
				color: #A7A7A7;
				height: 100rpx;
				line-height: 100rpx;
				border-bottom: 2rpx solid #F5F5F5;
			}

			.popup-list {
				font-size: 16px;
				color: #272727;
				height: 120rpx;
				line-height: 120rpx;
				border-bottom: 2rpx solid #F5F5F5;
			}

			.popup-close {
				font-size: 17px;
				color: #272727;
				height: 140rpx;
				line-height: 140rpx;
			}
		}
	}
</style>
