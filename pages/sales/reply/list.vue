<template>
	<view class="containter">
		<turnback> </turnback>
		<view class="inputbox">
			<!-- :val="goodname" -->
			<uni-search-bar @confirm="search" @cancel="search" cancelButton="none" placeholder="按产品名搜索" bgColor="#fff" radius="20"></uni-search-bar>
		</view>

		<view class="category-box">
			<view :class="'category-item-notchose '+(choseCategory==index?'chose':'')"
				v-for="(item,index) in subCategoryItms" @click="choseCate(index)" :key="index">
				<text :class="(choseCategory==index?'chose':'')">{{item.name}}</text>
			</view>
		</view>

		<view style="height: 20rpx; background-color: #F5F5F5;"></view>

		<view class="list-box">
			<view v-for="(item,index) in list" :key="index">
				<view class="list-content ">
						<view class="flex ordernum">
							<view @click="showdetail(item)" style="flex:1">申请时间：{{item.createTime}}</view>
							<!-- <view v-show="item.statusName!='待审核'" style="">{{item.statusName}}</view> -->
							<view v-show="item.status=='0'" style="color:#007AFF;" class="flex">
								<!-- <view>{{item.statusName}}</view> -->
								<view style="padding-left:20rpx;" @click="alertdelete(item)">删除</view>
							</view>
						</view>
						<view class="enlistitem" v-for="(item1,index1) in item.detailList" :key="index1" @click="showdetail(item)">
							<view class="goods">{{item1.materailName+" "+item1.specifications}}</view>
							<view class="flex">数量：{{item1.amount}}<text class="pl30">金额：{{item1.money}}</text></view>
						</view>
						<view class="ordernum code" v-show="item.status==2">快递单号：{{item.expressCode}}</view>
					</view>
				<view style="height: 20rpx; background-color: #F5F5F5;width:100%;"></view>
			</view>
		</view>
		<view class="nodatatips" v-if="list.length==0">暂无数据</view>
		<uni-popup ref="numpopup" type="bottom">
			<view class="bugbox prelative">
				<view class="list-box">
					<view class="list-content ">
						<view class="enlistitem flex"><view class="title">申请理由：</view><view class="content">{{detailinfo.applyReason}}</view></view>
						<view class="enlistitem flex"><view class="title">寄送方式 ：</view><view class="content">{{detailinfo.sendType==1?"快递":"自提"}}</view></view>
						<view v-show="detailinfo.sendType==1">
						<view class="enlistitem flex"><view class="title">联系人：</view><view class="content">{{detailinfo.linkman}}</view></view>
						<view class="enlistitem flex"><view class="title">电话：</view><view class="content">{{detailinfo.phone}}</view></view>
						<view class="enlistitem flex"><view class="title">省市区域：</view><view class="content">{{detailinfo.region}}</view></view>
						<view class="enlistitem flex"><view class="title">寄送地址：</view><view class="content">{{detailinfo.address}}</view></view>
						<view class="enlistitem flex"><view class="title">邮寄的快递单号：</view><view class="content">{{detailinfo.expressCode}}</view></view>
						</view>
						<view class="enlistitem flex"><view class="title">合计金额：</view><view class="content">{{detailinfo.totalMoney}}</view></view>
					</view>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import turnback from "../../../components/turnback.vue"
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
				choseCategory: 0,
				list: [],
				subCategoryItms: [
				// {
				// 	name: "全部",
				// 	id: ""
				// },
				{
					name: "未审核",
					id: 0
				}, {
					name: "审核通过",
					id: 1
				}, {
					name: "已完结",
					id: 2
				}, {
					name: "审核不通过",
					id: 3
				}],
				subCate: '',
				orderBy: 1, //排序方式 （1.按序列号 2.按上架时间 3：销量）
				classId: 0,
				id: '',
				title: '',
				subTitle: '',
				intro: '',
				myinfo: {},
				buyid: "",
				buyshow: false,
				detailinfo:{},
			}
		},
		onLoad(options) {
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
			showdetail(item){
				this.detailinfo = item;
				this.$refs.numpopup.open();
			},
			alertdelete(item){
				uni.showModal({
				    content: '确定删除？',
				    success: (res)=>{
				        if (res.confirm) {
							app.materialdeleteApply({id:item.id}).then(res => {
								this.refreshData();
								document.body.scrollIntoView();
							});
				        }
				    }
				});
			},
			search(val) {
				this.goodname = val.value;
				this.refreshData();
			},
			choseCate(index) {
				this.choseCategory = index;
				this.classId = this.subCategoryItms[index].id;
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
				app.materialapplyList({
					status: this.classId,
					keyword: this.goodname || "",
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
		},
		onReachBottom() {
			this.loadMoreDate();
		},

	}
</script>

<style scoped lang="scss">
	.bugbox{
		padding:20rpx;background:#fff;
		.list-box {
			.list-content {
				background-color: #FFFFFF;
				margin-left: 30rpx;
				margin-right: 30rpx;
				box-sizing: border-box;
				padding: 20rpx 20rpx 80rpx 20rpx;
				border-radius: 5px 5px 0px 0px;
			}
		}
		.enlistitem {
			font-size: 30rpx;
			color: #333;
			padding: 10rpx 0 30rpx;
			.title{font-weight:bold;padding-right:24rpx;color:#000;font-size:32rpx;}
			.content{flex:1;}
		}
	}
	page {
		background-color: #f5f5f5;
	}
	.bugbox{
		padding:20rpx;background:#f5f5f5;
		.boxhead{padding:10rpx 0 30rpx;text-align:center;}
		.list-content{
			background-color: #FFFFFF;
			box-sizing: border-box;
			padding: 20rpx 0rpx 20rpx 20rpx;
			border-radius: 5px 5px 0px 0px;
			
		}
		.surebug {
			text-align: center;
			line-height: 2.3;
			font-size: 34rpx;
			color: #FFFFFF;border-radius:10rpx;margin:40rpx auto 10rpx;
			background: #EA132D;
		}
	}
	.choosebtbox{
		margin:0 60rpx;min-height: 200rpx;padding-bottom:10rpx;text-align: left;
	}
	.white-background-pop1 {
		text-align: center;
		background-color: #FFFFFF;padding:0 0 30rpx 0;
		border-radius: 10px 10px 0px 0px;min-height: 350rpx;max-height: 80vh;overflow-y: auto;
	
		.white-background-pop1-title {
			font-size: 30rpx;
			color: #333;
			padding-top: 35rpx;
			position: relative;
			.close{
				position: absolute;
				right: 50rpx;
				width: 30rpx;
				height: 30rpx;
				top: 40rpx;
			}
		}
		.transferButton{
			padding:24rpx 40rpx;border: 1px solid #ccc;
			line-height: 1;box-sizing:border-box;
			border-radius: 6rpx;width:100%;
			font-size: 30rpx;justify-content:left;
			color: #333;word-break: break-all;
			margin: 30rpx 0rpx 0;
		}
	}

	.actionbox {
		padding:20rpx 40rpx;position:fixed;z-index:9;bottom:0;left:0;right:0;background:#fff;justify-content: space-around;

		.actionitem {
			width: 38%;
			text-align: center;
			color: #fff;
			font-size: 34rpx;
			box-sizing: border-box;line-height:2.3;
			background:#007AFF;border-radius:10rpx;

			&.other {
				background:#0aa1ff;
			}
		}
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
			padding: 0 0rpx 0 0;
			font-size: 30rpx;
			color: #555;
			text-align: center;
			flex: 1 0 auto;

			&.chose {
				color: #007AFF;
				// font-size:32rpx;
				// font-weight:bold;
			}

			.chose {
				padding-bottom: 10rpx;
				border-bottom: 2rpx solid #007AFF;
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
				margin-left: 30rpx;
			}

			&.finish {
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
				.ordernum{
					padding:10rpx 0 20rpx;font-size:30rpx;
					&.code{padding:16rpx 0;}
				}

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

	.enliststatus {
		background: #FFC600;
		color: #fff;
		border-radius: 4rpx;
		font-size: 26rpx;
		line-height: 46rpx;
		padding: 0 24rpx;
		display: inline-block;
		margin-top: 10rpx;
	}

	.enlistitem {
		font-size: 30rpx;width:100%;
		padding: 6rpx 0 10rpx;color:#333;
		.goods{font-weight:bold;padding-bottom:16rpx;color:#000;}
	}
	.pl30{padding-left:40rpx;}

	.enlisttitle {
		font-size: 32rpx;
		font-weight: 500;
		padding-bottom: 26rpx;
		border-bottom: 2rpx solid #e5e5e5;
		margin-bottom: 24rpx;
	}
</style>
