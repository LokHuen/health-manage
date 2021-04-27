<template>
	<view class="flexc container">
		<turnback></turnback>
		<view class="headtips flex">
			<view :class="'tabitem '+(now==0?'on':'')" @click="choosetab(0)">电子版</view>
			<view :class="'tabitem '+(now==1?'on':'')" @click="choosetab(1)">实物制作</view>
		</view>
		<view class="search-out-box">
			<view class="flex search-box">
				<image src="../../static/icon/incon_search.png"></image>
				<input placeholder="输入医生护士业务员名字搜索" v-model="params.keyword" @input="getList(1)" />
			</view>
		</view>
		<view class="flexc list" v-if="list.length>0">
			<view class="flexc item" v-for="(item,index) in list" @click.stop="toPatient(item)" :key="index">
				<view class="flex headcss">
					<view>{{item.cardName}}</view><view v-show="now==1" class="makenum">{{item.quantity+item.productionUnit}}</view>
					<view v-show="now==1" class="status">{{item.statusName}}</view>
				</view>
				<view class="flex namebox" v-if="item.cardType!=3" style="align-items: flex-end;">
					<view class="dname">{{item.userName}}</view><view v-show="item.userTitle" style="padding-left:4rpx;">{{item.userTitle}}</view>
				</view>
				<view class="flex namebox" v-if="item.cardType==3" style="">
					<view class="dname">{{item.userName}}</view>
					<view v-if="now==1" @click.stop="arrowshow(item)" style="flex:1;text-align:right;">
						<image mode="widthFix" :src="'../../static/icon/'+(item.show?'right_arrow_top.png':'right_arrow.png')" class="arrow"></image>
					</view>
				</view>
				<view class="flex infobox" v-if="item.cardType!=3">
					<view v-show="item.userHospital" style="padding-right:20rpx;">{{item.userHospital}}</view>
					<view v-show="item.userDepartment" style="flex:1;" @click.stop="arrowshow(item)">{{item.userDepartment}}</view>
					<image v-show="now==1&&item.cardType!=3" @click.stop="arrowshow(item)" mode="widthFix" :src="'../../static/icon/'+(item.show?'right_arrow_top.png':'right_arrow.png')" class="arrow"></image>
				</view>
				<view v-show="item.show&&now==1" class="addressbox">
					<view>{{item.receiveType==1?"快递":"到公司领取"}}</view>
					<view v-show="item.receiveType==1">{{item.receiver}} {{item.receiverPhone}}</view>
					<view v-show="item.receiveType==1">{{item.region+" "+item.address}}</view>
					<view>申请日期：{{item.createTime}}</view>
				</view>
			</view>
		</view>
		<view class="nodata flex" style="padding-top: 100rpx; color: #999999; justify-content: center;font-size: 30rpx;"
			v-if="list.length==0&&requested">
			<text>没找到相关数据</text>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	import turnback from "../../components/turnback.vue"
	export default {
		components: {
			turnback
		},
		onLoad(props) {
			this.getList(1)
		},
		data() {
			return {
				now:0,
				info:{pageCount:1},
				list: [],
				requested:false,
				params: {
					pageNo: 1,
					keyword: '',
				}
			}
		},
		onReachBottom() {
			this.params.pageNo++;
			this.getList(this.params.pageNo);
		},
		methods: {
			arrowshow(item){
				item.show = !item.show;
			},
			choosetab(index){
				this.now = index;
				this.params.pageNo = 1;
				this.getList(this.params.pageNo);
			},
			getList(pageNo = 1) {
				if (pageNo > this.info.pageCount) return;
				app.getRecordPage({...this.params,applyType:this.now==0?2:1}).then((res) => {
					for (let i = 0; i < res.data.list.length; i++) {
						res.data.list[i].show = false;
					}
					res.data.pageCount = res.data.pageCount||1;
					this.info = res.data;
					this.list = res.data.list;
					this.requested=true;
					if (pageNo == 1) {
						this.list = res.data.list
					} else {
						if (pageNo <= this.info.pageCount) {
							this.list = this.list.concat(res.data.list)
						}
					}
				})
			},
			toPatient(item) {
				uni.navigateTo({
					url: '/pages/card/create?mid=' + item.makeId
				});
			},
		}
	}
</script>

<style lang="scss" scoped>
	.addressbox{
		padding-top:24rpx;font-size: 26rpx;color: #999999;
	}
	.headcss{
		font-size: 30rpx;color: #999999;padding-bottom:20rpx;border-bottom:2rpx solid #DCDCDC;margin-bottom:20rpx;
		.makenum{flex:1;padding-left:16rpx;}
		.status{font-size: 26rpx;color: #4789EB;}
		
	}
	page {
		background-color: $uni-defautt-bg-color;
	}
	.arrow{width: 20rpx;}

	.container {
		padding: 0 30rpx;
		color: $uni-text-color;

		.list {
			margin-top: 10rpx;
			.namebox{
				font-size: 28rpx;color: #666666;
				.dname{font-size: 34rpx;font-weight: 600;color: #333333;padding-right:20rpx;}
			}
			.infobox{
				font-size: 26rpx;color: #666666;padding-top:16rpx;
				
			}

			.item {
				background-color: #FFFFFF;
				border-radius: 10rpx;
				margin-bottom: 10rpx;
				padding: 34rpx 34rpx;

				.avator {
					width: 80rpx;
					height: 80rpx;
					border-radius: 40rpx;
					margin-right: 20rpx;
				}

				.name {
					font-size: 32rpx;
					font-weight: bold;
				}

				.text {
					font-size: 26rpx;
					margin-top: 16rpx;
				}

				.join-time {
					margin-top: 20rpx;
					font-size: 22rpx;
					color: #999999;
				}
			}
		}

		.search-out-box {
			// position: sticky;
			top: 0;
			background-color: $uni-defautt-bg-color;
			z-index: 10;
		}

		.search-box {
			justify-content: center;
			align-items: center;
			margin-top: 20rpx;
			margin-bottom: 10rpx;
			background-color: #FFFFFF;
			padding: 16rpx 0;
			border-radius: 10rpx;
			position: sticky;
			top: 0;

			image {
				width: 24rpx;
				height: 26rpx;
			}

			input {
				width: 260rpx;
				font-size: 26rpx;
				margin-left: 15rpx;
			}
		}
	}
	.headtips{
		padding:30rpx 80rpx 10rpx;justify-content:space-around;position: sticky;top: 0;background:#fff;z-index:20;
		.tabitem{
			font-size: 32rpx;
			color: #333333;
			&.on{font-weight: bold;position: relative;}
			&.on::after{position: absolute;bottom:-6rpx;content:"";left:20rpx;right:20rpx;height: 4rpx;background:#4789EB;}
		}
	}
</style>
