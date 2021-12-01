<template>
	<view class="containter">
		<turnback> </turnback>
		<view class="inputbox">
			<!-- :val="goodname" -->
			<uni-search-bar @input="search" @cancel="search" cancelButton="none" placeholder="输入名字搜索
" bgColor="#fff" radius="20"></uni-search-bar>
		</view>

		<view class="category-box">
			<view :class="'category-item-notchose '+(choseCategory==index?'chose':'')"
				v-for="(item,index) in subCategoryItms" @click="choseCate(index)" :key="index">
				<text :class="(choseCategory==index?'chose':'')">{{item.name}}</text>
			</view>
		</view>

		<view style="height: 20rpx; background-color: #F5F5F5;"></view>

		<view class="list-box">
			<view v-show="choseCategory==0" v-for="(item,index) in list" :key="'a'+index">
				<view>
					<view class="list-content flex" @click="clickthis(index,1)">
						<view class="enlistitem">
							<view class="goods">{{item.name}}</view>
							<view class="flex">{{item.specifications}} <text class="pl30">单价：{{item.price}}元</text></view>
						</view>
						<view >
							<uni-icons type="circle" v-show="!item.checked" size="18" color="#ccc"></uni-icons>
							<uni-icons type="checkbox-filled" v-show="item.checked" size="18" color="#007AFF"></uni-icons>
						</view>
					</view>
				</view>
				<view style="height: 20rpx; background-color: #F5F5F5;width:100%;"></view>
			</view>
			<view v-show="choseCategory==1" v-for="(item,index) in list1" :key="'b'+index">
				<view>
					<view class="list-content flex" @click="clickthis(index,2)">
						<view class="enlistitem">
							<view class="goods">{{item.name}}</view>
							<view class="flex">{{item.specifications}} <text class="pl30">单价：{{item.price}}元</text></view>
						</view>
						<view >
							<uni-icons type="circle" v-show="!item.checked" size="18" color="#ccc"></uni-icons>
							<uni-icons type="checkbox-filled" v-show="item.checked" size="18" color="#007AFF"></uni-icons>
						</view>
					</view>
				</view>
				<view style="height: 20rpx; background-color: #F5F5F5;width:100%;"></view>
			</view>
		</view>
		<view class="nodatatips" v-if="list.length==0&&choseCategory==0">暂无数据</view>
		<view class="nodatatips" v-if="list1.length==0&&choseCategory==1">暂无数据</view>
		
		<view class="actionbox flex">
			<view class="actionitem other" @click="tootherpage(1)">申请记录</view>
			<view class="actionitem" @click="tootherpage(2)">下一步</view>
		</view>
		<view style="height:110rpx;"></view>
		<uni-popup ref="numpopup" type="bottom">
			<view class="bugbox prelative">
				<view class="boxhead">确认选择结果</view>
				<scroll-view scroll-y="true" style="max-height:70vh;">
				<view class="list-content flex" v-for="(item,index) in selectlist" :key="'a'+index">
					<view class="enlistitem">
						<view class="goods">{{item.name+" "+item.specifications}}</view>
						<view class="flex"><text class="">单价：{{item.price}}元</text></view>
					</view>
					<view class="flex bugnum">
						<view style="flex:1;">申请数量：</view>
						<uni-number-box :value="item.num" :min="1" :max="20" @change="changebugnum($event,index)" style="zoom:0.9;"></uni-number-box>
					</view>
				</view>
				</scroll-view>
				<view class="surebug" @click="bugcommit">确认无误</view>
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
				pageCount1: 1,
				pageNo1: 1,
				goodname: "",
				choseCategory: 0,
				list: [],
				list1: [],
				selectlist:[],
				subCategoryItms: [{
					name: "营养品样品",
					id: 1
				}, {
					name: "基因检测物料",
					id: 2
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
			if(app.reloadreplylist){
				app.reloadreplylist = false;
				this.pageCount=1;
				this.pageNo=1;
				this.pageCount1=1;
				this.pageNo1=1;
				this.list=[];
				this.list1=[];
				this.selectlist=[];
				this.getListData();
			}
		},
		methods: {
			clickthis(index,type){
				if(type==1) {
					this.$set(this.list[index],"checked",!this.list[index].checked);
					if(this.list[index].checked){
						this.selectlist.push({...this.list[index],num:1});
					}else{
						for (var i = 0; i < this.selectlist.length; i++) {
							if(this.list[index].id==this.selectlist[i].id) {this.selectlist.splice(i,1);return;}
						}
					}
				}
				if(type==2) {
					this.$set(this.list1[index],"checked",!this.list1[index].checked);
					if(this.list1[index].checked){
						this.selectlist.push({...this.list1[index],num:1});
					}else{
						for (var i = 0; i < this.selectlist.length; i++) {
							if(this.list1[index].id==this.selectlist[i].id) {this.selectlist.splice(i,1);return;}
						}
					}
				}
			},
			changebugnum(val,index) {
				val = parseInt(val);
				this.$set(this.selectlist[index],"num",val);
			},
			bugcommit(){
				app.replychooselist = this.selectlist;
				this.$refs.numpopup.close();
				uni.navigateTo({
					url:"/pages/sales/reply/input"
				})
			},
			search(val) {
				this.goodname = val.value;
				if(this.choseCategory==0) this.pageNo = 1;
				if(this.choseCategory==1) this.pageNo1 = 1;
				this.getListData();
			},
			choseCate(index) {
				this.choseCategory = index;
				this.classId = this.subCategoryItms[index].id;
				this.refreshData();
				document.body.scrollIntoView();
			},
			refreshData() {
				if(this.choseCategory==0&&this.list[0]) return;
				if(this.choseCategory==1&&this.list1[0]) return;
				if(this.choseCategory==0) this.pageNo = 1;
				if(this.choseCategory==1) this.pageNo1 = 1;
				this.getListData();
			},
			loadMoreDate() {
				if(this.choseCategory==0) this.pageNo++;
				if(this.choseCategory==1) this.pageNo1++;
				this.getListData();
			},
			getListData() {
				if(this.choseCategory==0){if (this.pageCount < this.pageNo) return;}
				if(this.choseCategory==1){if (this.pageCount1 < this.pageNo1) return;}
				app.loading("加载中")
				app.materiallist({
					type: this.classId,
					name: this.goodname || "",
					pageNo: this.choseCategory==0?this.pageNo:this.pageNo1
				}).then(res => {
					app.loaded();
					for (let i = 0; i < this.selectlist.length; i++) {
						for (let j = 0; j < res.data.list.length; j++) {
							if(res.data.list[j].id==this.selectlist[i].id) {
								res.data.list[j].checked = true;
							}
						}
					}
					if(this.choseCategory==0){
						this.pageCount = res.data.pageCount > 1 ? res.data.pageCount : 1;
						if (this.pageNo === 1) {
							this.list = res.data.list;
						} else {
							this.list = this.list.concat(res.data.list);
						}
					}
					if(this.choseCategory==1){
						this.pageCount1 = res.data.pageCount > 1 ? res.data.pageCount : 1;
						if (this.pageNo1 === 1) {
							this.list1 = res.data.list;
						} else {
							this.list1 = this.list1.concat(res.data.list);
						}
					}
					uni.stopPullDownRefresh();
				});
			},
			tootherpage(index){
				if(index==2){
					if(!this.selectlist[0]){app.tip("请选择产品");return;}
					this.$refs.numpopup.open();
				}else{
					uni.navigateTo({
						url:"/pages/sales/reply/list"
					})
				}
			},
		},
		onReachBottom() {
			this.loadMoreDate();
		},

	}
</script>

<style scoped lang="scss">
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
			background: #0aa1ff;
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
			background:#0aa1ff;border-radius:10rpx;

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
		font-size: 30rpx;flex:1;
		padding: 6rpx 0 10rpx;
		.goods{font-weight:bold;padding-bottom:16rpx;font-size: 32rpx;}
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
