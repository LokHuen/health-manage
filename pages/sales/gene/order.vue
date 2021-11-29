<template>
	<view class="containter">
		<turnback> </turnback>
		<view @click="$refs.tipsframe.open()" class="headtips">样本寄送地址，点击查看>></view>
		<view class="inputbox">
			<!-- :val="goodname" -->
			<uni-search-bar @confirm="search" @cancel="search" cancelButton="none" placeholder="按医生/患者/检测产品等查找"
				bgColor="#fff" radius="20"></uni-search-bar>
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
				<view>
					<view class="list-content ">
						<!-- <view class="enlisttitle">{{item.name}}</view> -->
						<view class="enlistitem">订单号：{{item.orderNumber||""}} </view>
						<view class="enlistitem">产品：{{item.commodity||""}} </view>
						<view class="enlistitem">业务来源：{{item.doctorName||""}} </view>
						<view class="enlistitem">下单时间：{{item.createTime}}</view>
						<view class="enlistitem" v-show="item.patientName">患者姓名：{{item.patientName}}</view>
						<view class="enlistitem" v-show="item.mobile">联系方式：{{item.mobile}}</view>
						<view class="flex" style="margin-top:6rpx;">
							<!-- <text class="enliststatus">{{item.statusName}}</text> -->
							<view style="flex:1;"></view>
							<view v-show="choseCategory==0" class="cardicon" @click="addrecommend(1,item)">新增样本</view>
							<view v-show="choseCategory==1" class="cardicon" @click="addrecommend(2,item)">查看样本信息</view>
							<view v-show="choseCategory==2" class="cardicon" @click="addrecommend(3,item)">查看报告</view>
							<view v-show="choseCategory==2&&!item.isFinished" class="cardicon delete" @click="removerecommend(item)">确认报告
							</view>
							<view v-show="choseCategory==2&&item.isFinished" class="cardicon delete finish">已确认</view>
						</view>
						<!-- <view class="actionbox flex">
							<view class="actionitem other" @click="tootherpage(1,item)">添加推荐</view>
							<view class="actionitem" @click="tootherpage(2,item)">推荐详情</view>
						</view> -->
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
					<view class="popup-list" v-for="(item,index) in subCategoryItms" :key="index"
						@click="choseSubCate(item)">
						{{item.name}}
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup ref="pop1" type="bottom">
			<view class="white-background-pop1">
				<view class="white-background-pop1-title">
					请选择报告
					<image src="../../../static/icon_close.png" mode="aspectFill" @click="$refs.pop1.close()" class="close"></image>
				</view>
				<scroll-view scroll-y="true" style="max-height:75vh;">
					<view class="choosebtbox flex">
						<view v-for="(item,index) in reportlist" :key="index" class="transferButton flex" @click="transfer(item.reportUrl)">
							<view style="flex:1;">{{item.reportFile}}</view><uni-icons type="arrowright" size="18"></uni-icons>
						</view>
						
					</view>
				</scroll-view>
			</view>
		</uni-popup>
		<uni-popup ref="tipsframe" type="bottom">
			<view class="white-background-pop1 tipsframe" style="" >
				<view @click="copytext(1)">
					<view class="tipshead">拓普【实验室收件地址】</view>
					广东省广州市海珠区官洲国际生物岛标产三期2栋802单元   拓普基因样本组    18022423929
				</view>
				<view @click="copytext(2)">
					<view class="tipshead">允英【实验室收件地址】</view>
					浙江省嘉兴市南湖区汇信路153号允英医学检验所三楼  夏路平收  15751725877
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
				categoryItems: ['默认', '新品', '销量', '分类'],
				choseCategory: 0,
				list: [],
				subCategoryItms: [{
					name: "待送样",
					id: 1
				}, {
					name: "检测中",
					id: 2
				}, {
					name: "已出报告",
					id: 3
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
				reportlist:[],
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
			copytext(index){
				let text = "拓普【实验室收件地址】 广东省广州市海珠区官洲国际生物岛标产三期2栋802单元  拓普基因样本组 18022423929";
				if(index==2) text="允英【实验室收件地址】 浙江省嘉兴市南湖区汇信路153号允英医学检验所三楼  夏路平收 15751725877";
				let oInput = document.createElement('input');
				oInput.value = text;
				document.body.appendChild(oInput);
				oInput.select(); // 选择对象;
				document.execCommand("Copy"); // 执行浏览器复制命令
				oInput.remove();
				app.tip("复制成功");
			},
			transfer(url){
				let phone = uni.getSystemInfoSync();
				if(phone.platform == "ios"){
					location.href = this.baseUrl+url;
				}else{
					uni.navigateTo({
						url: '/pages/pdf?url='+"/api"+url,
					});
				}
				this.$refs.pop1.close();
			},
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
				app.ordermyList({
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
			addrecommend(index,item) {
				switch (index) {
					case 1:
						let phone = uni.getSystemInfoSync();
						if(phone.platform == "ios"){
							sessionStorage.removeItem("reloadgenepage");
						}
						uni.navigateTo({
							url: "/pages/sales/gene/new?orderid=" + item.orderId+"&name="+item.commodity
						})
						break;
					case 2:
						uni.navigateTo({
							url: "/pages/sales/gene/detail?id=" + item.orderId+"&back=1"
						})
						break;
					case 3:
						app.orderreportList({
							geneOrderId: item.geneOrderId
						}).then(res => {
							this.reportlist = res.data;
							this.$refs.pop1.open();
						})
						
						break;
				}
			},
			removerecommend(item) {
				uni.showModal({
					content: '是否确认报告正确无误',
					success: (res) => {
						if (res.confirm) {
							app.loading("确认中");
							app.orderconfirmReport({
								geneOrderId: item.geneOrderId
							}).then(res => {
								app.tip("确认成功");
								setTimeout(() => {
									this.refreshData();
								}, 1000);
							})
						}
					}
				});

			},
		},
		onReachBottom() {
			this.loadMoreDate();
		},

	}
</script>

<style scoped lang="scss">
	.tipsframe{
		padding:10rpx 30rpx 40rpx 30rpx!important;font-size:30rpx;
		.tipshead{padding:50rpx 0 16rpx;}
	}
	page {
		background-color: $uni-bg-color;
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
		border-top: 2rpx solid #ddd;
		padding: 20rpx 0 30rpx;

		.actionitem {
			width: 50%;
			text-align: center;
			color: #2894EC;
			font-size: 28rpx;
			box-sizing: border-box;

			&.other {
				border-right: 2rpx solid #ddd;
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
		font-size: 30rpx;
		color: #333;
		padding: 6rpx 0 10rpx;
	}

	.enlisttitle {
		font-size: 32rpx;
		font-weight: 500;
		padding-bottom: 26rpx;
		border-bottom: 2rpx solid #e5e5e5;
		margin-bottom: 24rpx;
	}
	.headtips{text-align:center;font-size:28rpx;color:#888;padding:20rpx 0 0rpx;color:#007AFF;}
</style>
