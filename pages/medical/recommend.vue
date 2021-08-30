<template>
	<view class="containter">
		<turnback> </turnback>
		<view class="inputbox">
			<!-- :val="goodname" -->
			<uni-search-bar @confirm="search" @cancel="search" cancelButton="none" placeholder="搜索商品" bgColor="#fff" radius="20"></uni-search-bar>
		</view>

		<view class="category-box">
			<view :class="'category-item-notchose '+(choseCategory==index?'chose':'')" v-for="(item,index) in subCategoryItms"
			 @click="choseCate(index)" :key="index">
				<text :class="(choseCategory==index?'chose':'')">{{item.name}}</text>
			</view>
		</view>

		<view style="height: 20rpx; background-color: #F5F5F5;"></view>

		<view class="list-box">
			<view v-for="(item,index) in list" :key="index">
				<view v-if="choseCategory==0||choseCategory==1||choseCategory==2" class="list-content flex">
					<image class="goodsimg" :src="item.imgUrl" mode="aspectFit"></image>
					<view style="flex:1;word-break:break-all;">
						<view class="list-title">{{choseCategory==2?item.name:item.shortName}}</view>
						<view class="list-tag" v-if="item.promotion">
							{{item.promotion}}
						</view>
						<view class="mingoodname">{{choseCategory==2?item.adaptationDisease:item.name}}</view>
						<view class="list-price flex">
							<view class="price">{{(item.currencyType==2?'':'¥')}}<text style="font-size:30rpx;">{{item.price}}</text>{{(item.currencyType==2?'HKD':'')}}</view>
							<view class="originalPrice" v-if="item.originalPrice && item.originalPrice!=0">
								{{(item.currencyType==2?'':'¥')}}<text style="font-size:28rpx;">{{item.originalPrice}}</text>{{(item.currencyType==2?'HKD':'')}}
							</view>
							<view style="flex:1;"></view>
							<view v-show="!item.id" class="cardicon" @click="addrecommend(item)">添加</view>
							<view v-show="item.id" class="cardicon delete" @click="removerecommend(item)">已添加</view>
						</view>
					</view>

				</view>
				<view v-if="choseCategory==3">
					<view class="list-content " >
						<view class="enlisttitle">{{item.name}}</view>
						<view class="enlistitem">适应症：{{item.adaptationDisease||""}} </view>
						<view class="enlistitem">药物名称：{{item.medicine||""}} </view>
						<view class="enlistitem">药物类型：{{item.medicineType||""}} </view>
						<view class="enlistitem">试验分期：{{item.stage}}</view>
						<view class="flex">
							<text class="enliststatus">{{item.statusName}}</text>
							<view style="flex:1;"></view>
							<view v-show="!item.id" class="cardicon" @click="addrecommend(item)">添加</view>
							<view v-show="item.id" class="cardicon delete" @click="removerecommend(item)">已添加</view>
						</view>
					</view>
				</view>
				<view style="height: 20rpx; background-color: #F5F5F5;width:100%;"></view>
			</view>


		</view>
		<view class="nodatatips" v-if="list.length==0">暂无数据</view>
		<uni-popup type="bottom" ref='popup'>
			<view class="popup-content">
				<view class="popup-title">选择商品分类</view>

				<scroll-view scroll-y="true" style="max-height:500rpx;">
					<view class="popup-list" v-for="(item,index) in subCategoryItms" :key="index" @click="choseSubCate(item)">
						{{item.name}}
					</view>
				</scroll-view>
			</view>

		</uni-popup>
	</view>
</template>

<script>
	import turnback from "../../components/turnback.vue"
	const app = getApp();
	export default {
		components: {
			turnback
		},
		data() {
			return {
				baseUrl: app.globalData.baseUrl,
				pageCount: 1,
				pageNo: 1,
				goodname: "",
				categoryItems: ['默认', '新品', '销量', '分类'],
				choseCategory: 0,
				list: [],
				subCategoryItms: [{
					name: "营养补充剂",
					id: 1
				}, {
					name: "基因检测",
					id: 2
				}, {
					name: "海外药",
					id: 3
				}, {
					name: "免费用药项目",
					id: 4
				}],
				subCate: '',
				orderBy: 1, //排序方式 （1.按序列号 2.按上架时间 3：销量）
				classId: 1,
				id: '',
				title: '',
				subTitle: '',
				intro: '',
				myinfo: {},
				buyid: "",
				buyshow: false,
			}
		},
		onLoad(options) {
			//this.refreshData();
			// this.getAllClasses();
			this.id = options.id;
			this.goodname = options.name || "";
			uni.setNavigationBarTitle({
				title: options.title
			});
			this.title = options.title;
			this.subTitle = options.subTitle;
			this.intro = options.intro;
			this.getListData();

		},
		onShow() {
			// this.getmyinfo();
		},
		methods: {
			closepopup() {
				this.$refs.popup.close();
			},
			search(val) {
				// app.tip('搜索')
				this.goodname = val.value;
				this.refreshData();
				// uni.navigateTo({
				// 	url: '/pages/index/search'//?name=' + val.value
				// });
			},
			//          choseSubCate(item){
			// 	this.subCate = item.name;
			// 	this.classId = item.id;
			// 	// this.choseCategory = 3;
			// 	this.closepopup();
			// 	if(item.id){
			// 		this.orderBy = '';
			// 	}
			// 	this.refreshData();
			// },
			choseCate(index) {
				this.choseCategory = index;
				this.classId = this.subCategoryItms[index].id;
				// this.orderBy = index+1;
				this.refreshData();
				document.body.scrollIntoView();
			},
			refreshData() {
				this.pageNo = 1;
				this.getListData();
			},
			loadMoreDate() {
				this.pageNo++;
				this.getListData();
			},
			getListData() {
				if (this.pageCount < this.pageNo) return;
				app.loading("加载中")
				app.getRecommendPage({
					patientId: this.id,
					relateType: this.classId,
					name: this.goodname || "",
					pageNo: this.pageNo
				}).then(res => {
					app.loaded();
					this.pageCount = res.data.pageCount > 1 ? res.data.pageCount : 1;
					if (this.pageNo === 1) {
						this.list = res.data.list;
					} else {
						this.list = this.list.concat(res.data.list);
					}
					uni.stopPullDownRefresh();
				});
			},

			getAllClasses() {
				app.homeAllClasses({}).then(res => {
					if (res.status == 1) {
						this.subCategoryItms = this.subCategoryItms.concat(res.data);
						if (this.subCategoryItms[0]) {
							this.choseCategory = 0;
							this.classId = this.subCategoryItms[0].id;
							this.refreshData();
						}
					}
				});
			},
			getmyinfo() {
				if (app.getCache("token")) {
					app.mydata({}).then(res => {
						this.myinfo = res.data;
					});
				}
			},
			showbug(item) {
				this.buyshow = false;
				this.buyid = item.id;
				setTimeout(() => {
					this.buyshow = true;
				}, 200)
			},
			addrecommend(item) {
				app.loading("连接中");
				let data = {
					patientId: this.id,
					relateType: this.classId,
					relateId: item.relateId,
					...item
				}
				app.recommendsave(data).then(res => {
					app.tip("添加成功");
					setTimeout(()=>{this.refreshData();},1000);
					// setTimeout(()=>{uni.navigateBack();},1000);
				})
			},
			removerecommend(item) {
				app.loading("连接中");
				app.recommendremove({
					id: item.id
				}).then(res => {
					app.tip("删除成功");
					setTimeout(()=>{this.refreshData();},1000);
					// setTimeout(()=>{uni.navigateBack();},1000);
				})
			},
		},
		onReachBottom() {
			this.loadMoreDate();
		},

	}
</script>

<style scoped lang="scss">
	page {
		background-color: $uni-bg-color;
	}

	.inputbox {
		font-size: 28rpx;
		color: #fff;
		width: 100%;
		padding: 0 20rpx;
		box-sizing: border-box;
		position: relative;

		.boxcover {
			position: absolute;
			top: 0;
			left: 0;
			right: 0;
			bottom: 0;
			z-index: 5;
		}
	}

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
			display: flex;
			padding: 20rpx 40rpx 20rpx 50rpx;
			box-sizing: border-box;
			z-index: 9;
			flex-wrap: nowrap;
			align-items: flex-end;
			position: sticky;
			top: 0;
			overflow-x: auto;
			background-color: #F5F5F5;
		}

		.mingoodname {
			font-size: 26rpx;
			color: #272727;
			padding-top: 10rpx;
			// margin-left: 30rpx;
		}

		.category-item-notchose {
			padding: 0 40rpx 0 0;
			font-size: 30rpx;
			color: #555;
			flex: 1 0 auto;

			&.chose {
				color: #C10000;
				// font-size:32rpx;
				// font-weight:bold;
			}

			.chose {
				padding-bottom: 10rpx;
				// border-bottom:2rpx solid #C10000;
			}
		}

		.arrow {
			margin-left: 10rpx;
			width: 20rpx;
			height: 14rpx;
			margin-top: 40rpx;
		}
		.cardicon {
			font-size: 26rpx;
			padding: 12rpx 26rpx;
			color: #fff;
			background: #2894EC;
			border-radius: 6rpx;
			line-height: 1;
		
			&.delete {
				background: #ccc;
			}
		}

		.nodatatips {
			text-align: center;
			color: #666666;
			line-height: calc(100vh - 200rpx);
		}

		.list-box {
			background-color: #F5F5F5;

			.list-content {
				background-color: #FFFFFF;
				margin-left: 30rpx;
				margin-right: 30rpx;
				box-sizing: border-box;
				padding: 20rpx;
				border-radius: 5px 5px 0px 0px;

				.goodsimg {
					width: 260rpx;
					height: 260rpx;
					margin-right: 20rpx;
				}

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
					font-size: 30rpx;
					color: #272727;
					margin-bottom: 2rpx;
					overflow: hidden;
					text-overflow: ellipsis;
					display: -webkit-box;
					-webkit-box-orient: vertical;
					-webkit-line-clamp: 2;
				}

				.list-tag {
					// position: absolute;
					right: 50rpx;
					top: 10rpx;
					font-size: 13px;
					color: #C10000;
					border-radius: 19rpx;
					padding: 10rpx 0px 0;
				}

				.list-price {
					position: relative;
					color: #C10000;
					font-size: 16px;
					margin-top: 15rpx;
					display: flex;



					.originalPrice {
						font-size: 26rpx;
						margin-left: 15rpx;
						margin-top: 4rpx;
						color: #666666;
						text-decoration: line-through;
					}

					.price {
						margin-left: 15rpx;
						color: #C10000;
						font-size: 26rpx;
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
	.enliststatus{background: #FFC600;color:#fff;border-radius: 4rpx;font-size: 26rpx;line-height:46rpx;padding:0 24rpx;display: inline-block;margin-top:10rpx;}
	.enlistitem{font-size: 26rpx;color: #666666;padding-bottom:8rpx;}
	.enlisttitle{
		font-size: 32rpx;font-weight: 500;padding-bottom:26rpx;border-bottom:2rpx solid #e5e5e5;margin-bottom:24rpx;
	}
</style>
