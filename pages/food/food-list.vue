<template>
	<view class="">
	<!-- 添加食物列表界面 -->
	<view class="container">
		<view class="search-box">
			<image src="../../static/icon/incon_search.png" class="search-icon" style="height: 33rpx; width: 33rpx;" mode="widthFix"></image>
			<input type="text" v-model="searchtext" class="search-input" placeholder-style="color:#999999; font-size:28rpx; font-weight: 700; font-family: PingFang SC;" placeholder="搜索" maxlength="10" @input="change" />
		</view>

		<view class="condition-box" @click="choseFood" v-if="!searchtext">
			<view>{{foodType.name}}</view>
			<image src="../../static/icon/icon_arrow_open.png" mode="aspectFit" class="condition-arrow"></image>
		</view>
		<view class="box">
			<view class="list-content-box" v-for="(item,index) in listDatas" :key="index" @click="clickItem(item)">
				<image :src="item.pic" mode="widthFix" class="list-img"></image>
				<view class="list-msg">
					<view class="list-title">{{item.name}}</view>
					<view class="list-detail">
						<view class="list-detail-tip"> {{'每'+item.ediblePart+'克含'}} </view>
						<view class="list-detail-number">{{item.energy}}</view>
						<view class="list-detail-tip"> 千卡 </view>
						<view class="list-detail-number">{{item.carbohydrate?item.carbohydrate:0}} </view>
						<view class="list-detail-tip"> g碳水 </view>
					</view>
				</view>
			
			</view>
		</view>
		<view class="search-result" v-if="searchtext && listDatas.length>0">搜索结果</view>
		
		<view style="height: 200rpx;"></view>

		<uni-popup ref="popup" type="bottom">
			<view class="popup-bg">
				<view style="height: 40rpx;"></view>
				<view class="popup-title">
					选择食物类别
					<image src="../../static/icon/close_new.png" mode="widthFix" class="popup-close" @click="close"></image>
				</view>
				<view style="height: 5rpx;"></view>
				<scroll-view scroll-y="true" style="max-height: 750rpx;">
					<view class="food-item" v-for="(item,index) in foodTypeItems" :key="index" @click="selectFoodType(item)">
						{{item.name}}
					</view>
				</scroll-view>
				<view style="height: 50rpx;"></view>
			</view>
		</uni-popup>
		<uni-popup ref="motifyPopup" type="bottom">
			<view class="motifyPopup-bg">
				<view style="height: 40rpx;"></view>
				<view class="button-box" @click="closeMotifyPopup">
					取消
					<view class="sure-button" @click="sureAdd">确定</view>
				</view>
				<view class="input-box">
					<view class="motifyPopup-title">请填写摄入值</view>
					<view class="motifyPopup-catory">{{currentItem.name}}</view>
					
					<view class="motifyPopup-detail">
						<text class="motifyPopup-detail-tip">{{'每'+currentItem.ediblePart+'克含'}} </text>
						<text class="motifyPopup-detail-number">{{currentItem.energy}}</text>
						<text class="motifyPopup-detail-tip"> 千卡 </text>
						<text class="motifyPopup-detail-number">{{currentItem.carbohydrate}} </text>
						<text class="motifyPopup-detail-tip"> g碳水 </text>
					</view>
					<view class="motifyPopup-input-box">
						<input type="number" :value="currentItem.weight" class="motifyPopup-input"  placeholder-style="color: #999; font-size: 28rpx;" placeholder="摄入值" maxlength="5" @input="motifyInputChang" />
						<view class="motifyPopup-distance">克</view>
					</view>
				</view>
				
				<!-- <view style="height: 200rpx;"></view> -->
			</view>
		</uni-popup>

		<uni-popup ref="foodPopup" type="bottom">
			<view class="foodPopup-bg">
				<view style="height: 40rpx;"></view>
				<view class="foodPopup-box" @click="closeChoseFood">
					取消
					<view class="foodPopup-sure-button">确定</view>
				</view>
				<view class="foodPopup-title">已选食物</view>
				<scroll-view scroll-y="true" style="max-height: 700rpx;">
					<view class="foodPopup-list-box" v-for="(item,index) in selectItems" :key="index">
						<image :src="item.pic" mode="widthFix" class="foodPopup-img"></image>
						<view class="foodPopup-title">{{item.name}}</view>
						<input type="number" :value="item.weight" maxlength="5" class="foodPopup-input" @input="foodInputChange($event,item)" />
						<view class="foodPopup-distance">克</view>
						<image src="../../static/icon/icon_delete.png" mode="widthFix" class="foodPopup-delete" @click="deleteItem(index)"></image>
					</view>
				</scroll-view>


				<view style="height: 140rpx;"></view>
			</view>
		</uni-popup>
	</view>
	<view class="bottom-box">
		<view class="left" @click="openChoseFood">
			<image src="../../static/img/food.png" mode="widthFix" class="img"></image>
			<view class="chose-tip">已选食物</view>
			<view class="chose-number">{{selectItems.length}}</view>
		</view>
		<view class="right" @click="next">确定</view>
		</view>
	</view>
</template>



<script>
	const app = getApp();
	export default {
		data() {
			return {
				listDatas: [],
				searchtext: '',
				foodTypeItems: [],
				foodType: {
					name: '全部',
					id: ''
				},
				currentItem: {},
				selectItems: [],
				page:1,
			}
		},
		methods: {
			choseFood() {
				this.$refs.popup.open();
			},
			close() {
				this.$refs.popup.close();
			},
			clickItem(item) {
				//先判断是否已经选择了该食物
				var isSelect = false
				var selectItem = {};
				for (var i = 0; i < this.selectItems.length; i++) {
					if (item.id == this.selectItems[i].id) {
						isSelect = true;
						selectItem = this.selectItems[i];
						break;
					}
				}
				if (isSelect == true) {
					this.currentItem = selectItem;
				} else {
					this.currentItem = item;
				}
				this.$refs.motifyPopup.open();
			},
			closeMotifyPopup() {
				this.$refs.motifyPopup.close();
			},
			openChoseFood() {
				if (this.selectItems.length == 0) {
					app.tip('您还没有选择食物')
					return
				}
				this.$refs.foodPopup.open();
			},
			closeChoseFood() {
				this.$refs.foodPopup.close();
			},
			change() {
				this.foodType = {
						name: '全部',
						id: ''
					},
					this.page = 1;
					this.getListData();
			},
			getType() {
				app.foodTypeList().then(res => {
					if (res.status == 1) {
						this.foodTypeItems.push({
							name: '全部',
							id: ''
						});
						this.foodTypeItems = this.foodTypeItems.concat(res.data);
					}
				});
			},
			getListData() {
				app.foodList({
					name: this.searchtext,
					type: this.foodType.id,
					genre:1,pageNo:this.page,
				}).then(res => {
					if (res.status == 1) {
						if(this.page!=1&&this.page>=res.data.pageCount) return;
						this.listDatas = this.page==1?res.data.list:this.listDatas.concat(res.data.list);
						if(this.page<res.data.pageCount) this.page++;
					}
				});
				
			},
			selectFoodType(item) {
				this.foodType = item;
				this.$refs.popup.close();
				this.page = 1;
				this.getListData();
			},
			motifyInputChang(e) {
				var weight = {
					weight: e.detail.value
				};
				this.currentItem = {
					...this.currentItem,
					weight: e.detail.value
				};
			},
			sureAdd() {
				//先判断是否已经选择了该食物
				var isSelect = false
				for (var i = 0; i < this.selectItems.length; i++) {
					if (this.currentItem.id == this.selectItems[i].id) {
						isSelect = true;
						 this.selectItems[i]= this.currentItem
						break;
					}
				}
				
				if (isSelect == false) {
					this.selectItems.push(this.currentItem);
				} 

				
			},
			foodInputChange(e, item) {
				item.weight = e.detail.value;
			},
            deleteItem(index){
				this.selectItems.splice(index,1);
				if(this.selectItems.length==0){
					this.closeChoseFood();
				}
				
			},
			next() {
				if (this.selectItems.length == 0) {
					app.tip('您还没有选择食物')
					return;
				}
				uni.navigateTo({
					url:'record-food?list='+JSON.stringify(this.selectItems)
				});
			}
		},
		onLoad() {
			this.getType();
			this.getListData();
		},
		onReachBottom() {
			this.getListData();
		}

	}
</script>

<style lang="scss">
	/deep/.uni-popup__wrapper-box {
		padding-bottom: 0;
	}
	.bottom-box {
		position: fixed;
		bottom: 0;
		height: 110rpx;
		width: 100%;
		z-index: 9;
		display: flex;
		justify-content: space-around;
		box-shadow: 0px 2px 16px 0px rgba(0, 0, 0, 0.14);
	
		.left {
			width: 50%;
			font-size: 30rpx;
			background-color: #FFFFFF;
			display: flex;
	
			.img {
				//background-color: #707578;
				width: 40rpx;
				height: 40rpx;
				margin-left: 89rpx;
				margin-top: 35rpx;
			}
	
			.chose-tip {
				margin-left: 25rpx;
				height: 110rpx;
				line-height: 110rpx;
				color: #272727;
			}
	
			.chose-number {
				margin-left: 10rpx;
				height: 110rpx;
				line-height: 110rpx;
				color: #22AEE9;
			}
		}
	
		.right {
			width: 50%;
			font-size: 38rpx;
			color: #FFFFFF;
			line-height: 110rpx;
			background-color: #4CBDB6;
			text-align: center;
		}
	}
	.box {
		padding: 0 30rpx;
		margin-bottom: 30rpx;
		border-radius: 20rpx 20rpx 20rpx 20rpx;
		display: flex;
		flex-direction: column;
		box-shadow: 0rpx 2rpx 10rpx rgba(0,0,0,0.05);
		box-sizing: border-box;
	}
	.container {
		padding: 50rpx 30rpx;
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

		.list-content-box {
			padding: 40rpx 0rpx 23rpx 0;
			display: flex;
			border-bottom: 1rpx solid #EBECF2;

			.list-img {
				width: 100rpx;
				height: 100rpx;
				background-color: #CFCFCF;
			}

			.list-msg {
				padding-left: 30rpx;
				height: 100rpx;
				display: flex;
				flex-direction: column;
				position: relative;

				.list-title {
					font-size: 28rpx;
					font-weight: 700;
					color: #333333;
				}

				.list-detail {
					padding-top: 17rpx;
					font-size: 28rpx;
					font-weight: 700;
					color: #333333;
					display: flex;

					.list-detail-number {
						color: #22AEE9;
					}

					.list-detail-tip {
						color: #272727;
					}
				}
			}

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

		.food-item {
			font-size: 30rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			color: #272727;
			text-align: center;
			height: 96rpx;
			line-height: 96rpx;
			border-bottom: 1rpx solid #CFCFCF;
		}

		.motifyPopup-bg {
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 0px 0px;
			padding: 0rpx 30rpx 100rpx;

			.input-box {
				padding-top: 60rpx;
			}
			.button-box {
				font-size: 30rpx;
				color: #707578;
				display: flex;
				justify-content: space-between;

				.sure-button {
					color: #22AEE9;
					right: 40rpx;
					top: 0rpx;
				}
			}

			.motifyPopup-title {
				font-size: 26rpx;
				color: #333;
				text-align: center;
				margin-bottom: 70rpx;
			}

			.motifyPopup-catory {
				font-size: 28rpx;
				color: #333;
				text-align: center;
				margin-bottom: 20rpx;
			}

			.motifyPopup-detail {
				font-size: 30rpx;
				text-align: center;
				margin-bottom: 50rpx;

				.motifyPopup-detail-number {
					color: #22AEE9;
				}

				.motifyPopup-detail-tip {
					color: #272727;
				}
			}

			.motifyPopup-input-box {
				
				height: 52rpx;
				text-align: center;
				display: flex;
				justify-content: center;

				.motifyPopup-input {
					border-bottom: 1rpx solid #999;
					width: 84rpx;
				}

				.motifyPopup-distance {
					padding-left: 9rpx;
				}
			}
		}

		.foodPopup-bg {
			background: #FFFFFF;
			border-radius: 20rpx 20rpx 0px 0px;

			.foodPopup-box {
				font-size: 30rpx;
				padding-left: 40rpx;
				color: #707578;
				position: relative;

				.foodPopup-sure-button {
					position: absolute;
					color: #52A29E;
					right: 40rpx;
					top: 0rpx;
				}
			}

			.foodPopup-title {
				font-size: 30rpx;
				color: #272727;
				text-align: center;
				margin-top: 10rpx;
			}

			.foodPopup-list-box {
				height: 152rpx;
				margin-left: 30rpx;
				margin-right: 30rpx;align-items:center;padding-right:50rpx;
				border-bottom: 1rpx solid #CFCFCF;
				display: flex;
				color: #272727;
				position: relative;

				.foodPopup-img {
					width: 100rpx;
					height: 100rpx;
					// margin-top: 26rpx;
					background-color: #9A9A9A;
				}

				.foodPopup-title {
					font-size: 34rpx;
					margin-left: 30rpx;text-align: left;
					margin-top: 0rpx;
				}

				.foodPopup-input {
					width: 140rpx;
					height: 52rpx;
					background: #FFFFFF;
					border-radius: 11rpx;
					border: 1rpx solid #C3C3C3;
					// margin-top: 54rpx;
					margin-left: 40rpx;
					text-align: center;
				}

				.foodPopup-distance {
					// margin-top: 65rpx;
					font-size: 26rpx;
					margin-left: 15rpx;
				}

				.foodPopup-delete {
					width: 39rpx;
					height: 39rpx;
					position: absolute;
					right: 10rpx;
					top: 60rpx;
					//background-color: #999999;
				}
			}
		}
	}
</style>
