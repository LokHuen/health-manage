<template>
	<view class="container flexc">
		<turnback @back="backaction" :isback="bindchannel?'':1" :title="hio==1?'按组织架构查看院线业务':'按组织架构查看健康业务'"> </turnback>
		
		<view class="flexc head">
			<view class="organization-box flex">
				<text class="name">{{orgName}}</text>
				<view class="toggle-box flex" @click="toggleOrganize(true)">
					<text>切换部门</text>
					<image class="down-arrow" src="../../static/icon/right_arrow.png"></image>
				</view>
			</view>
			<view v-if="!showgetmoney" class="flexc order-count-box">
				<view class="content flex" @click="toOrder">
					<view class="head-item flexc">
						<text class="value">{{info.orderNum||0}}</text>
						<text class="key">订单数</text>
					</view>
					<view class="head-item flexc">
						<text class="value">{{info.orderMoney||0}}</text>
						<text class="key">订单总金额(元)</text>
					</view>
				</view>
				<text class="tip">统计范围：客户本月已付款订单</text>
			</view>
			<view v-if="showgetmoney" class="flexc order-count-box">
				<view class="content flex" @click="toOrder">
					<view class="head-item1 flexc">
						<text class="value">{{info.orderNum||0}}</text>
						<text class="key">订单数</text>
					</view>
					<view class="head-item1 flexc">
						<text class="value">{{info.orderMoney||0}}</text>
						<text class="key">订单总金额(元)</text>
					</view>
					<view class="head-item1 flexc">
						<text class="value">{{info.realIncome||0}}</text>
						<text class="key">实收总金额(元)</text>
					</view>
				</view>
				<text class="tip">统计范围：客户本月已付款订单</text>
			</view>
		</view>
		<view class="flexc">
			<view class="item-outer" @click="toOrganize">
				<view class="item flex">
					<text class="left-name">团队成员</text>
					<view class="flex">
						<text>{{teamNum||0}}</text>
						<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
					</view>
				</view>
			</view>
			<view class="item-outer" @click="toMonthOrderList">
				<view class="item flex">
					<text class="left-name">按月统计订单数据</text>
					<view class="flex">
						<text v-if="0"></text>
						<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
					</view>
				</view>
			</view>
		</view>
	
		<!-- 	<uni-popup ref="origanzePopup" type="bottom">
			<view class="origanzePopup flexc">
				<view class="head flex">
					<image src="../../static/icon_close.png" @click="toggleOrganize(false)"></image>
				</view>
				<tki-tree :range="organizeList" rangeKey="name" selectParent @treeItemSelect="treeItemSelect" />
			</view>
		</uni-popup> -->
	
		<view class="mask flexc"
			style="position: absolute;top: 0;right: 0;bottom: 0;left: 0; background-color: #333333; justify-content: flex-end; background-color: rgba(60,60,60,0.8);"
			v-show="isShow">
	
			<view class="origanzePopup flexc">
				<view class="head flex">
					<text class="tip">点击三角图标展开或关闭，点击文字选中</text>
					<image src="../../static/icon_close.png" @click="toggleOrganize(false)"></image>
				</view>
				<scroll-view scroll-y>
					<tki-tree :range="organizeList" rangeKey="name" selectParent @treeItemSelect="treeItemSelect" />
				</scroll-view>
			</view>
	
		</view>
		<!-- <view class="pageselect" v-show="showselet">
			<turnback > </turnback>
			<view class="flexc">
				<view class="item-outer" @click="selecttype(1)" >
					<view class="item flex">
						<text class="left-name">按组织架构查看——肿瘤营养与干预业务</text>
						<view class="flex">
							<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
						</view>
					</view>
				</view>
				<view class="item-outer" @click="selecttype(2)" >
					<view class="item flex">
						<text class="left-name">按组织架构查看——健康国际在线业务</text>
						<view class="flex">
							<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
						</view>
					</view>
				</view>
			</view>
		</view> -->
		<view class="pageselect" v-show="showselet">
			<turnback > </turnback>
			<view class="flex projectbox" >
				<view class="projectitem" @click="selecttype(1)">
					<image class="itemicon" src="../../static/haitao.png" mode="aspectFill"></image>
					<view>肿瘤营养与干预</view>
				</view>
				<view class="centerline"></view>
				<view class="projectitem" @click="selecttype(2)">
					<image class="itemicon" src="../../static/haitao1.png" mode="aspectFill" style="width:180rpx;"></image>
					<view>健康国际在线</view>
				</view>
			</view>
		</view>
	</view>
	
</template>

<script>
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
    import wx from '../../plugins/jweixin.js'
	import turnback from "../../components/turnback.vue"
	const app = getApp();

	export default {
		components: {
			tkiTree,
			turnback
		},
		data() {
			return {
				orgName: '',
				orgId: '',
				organizeList: [],
				info: {},
				teamNum: 0,
				isShow: 0,
				isMiniProgram:false,
				showgetmoney:false,
				showselet:true,
				hio:1, //1维新 2hio
				bindchannel:false,
			}
		},
		onLoad(props) {
			if (props.orgId) {
				this.orgId = props.orgId||this.orgId
			}
			this.orgName = props.orgName
			if(app.getCache('bindchannel')){
				let bindchannel = app.getCache('bindchannel');
				if(bindchannel==1){
					this.bindchannel = true;
					this.selecttype(1);
				}else if(bindchannel==6){
					this.bindchannel = true;
					this.selecttype(2);
				}else if(bindchannel==16){
					this.bindchannel = false;
					this.showselet = true;
				}
			}
			// this.getSalesManOrg()
			// this.getOrgInfo(this.orgId)
			// this.getOrgMembers()
			this.getMiniProgramStatic();
		},
		methods: {
			backaction(){
				this.showselet = true;
			},
			selecttype(index){
				localStorage.setItem("hio",index);
				this.hio = index;
				this.getSalesManOrg()
				this.getOrgInfo(this.orgId)
				this.getOrgMembers()
				this.showselet = false;
			},
			getMiniProgramStatic(){
				wx.miniProgram.getEnv((res)=>{
				   this.isMiniProgram = res.miniprogram?true:false;
				})
			},
			back(){
			  uni.navigateBack({
			  	
			  })
			},
			toMonthOrderList() {
				uni.navigateTo({
					url: 'month-order-list?pageResource=3' + '&orgId=' + this.orgId
				})
			},
			toOrganize() {
				let hasOrganize = 1
				if (hasOrganize) {
					uni.navigateTo({
						url: 'organization-chart?orgId=' + this.orgId + '&orgName=' + this.orgName
					})
				} else {
					uni.navigateTo({
						url: 'sales-team?orgId=' + this.orgId
					})
				}

			},
			getOrgInfo(deptId = this.orgId) {
				app.getOrgInfo({
					deptId: deptId,channel:this.hio==1?1:6
				}).then(res => {
					if (res.status == 1) {
						this.info = res.data
					}
				});
				app.salesmangetIdentity({}).then(res => {
					if (res.status == 1) {
						this.showgetmoney = res.data.isAgent
					}
				});
			},
			getOrgMembers() {
				app.getOrgMembers({
					orgId: this.orgId
				}).then((res) => {
					this.teamNum = res.data.teamNum
				})
			},
			toOrder() {
				let date = new Date()
				let month = date.getFullYear() + '-' + (date.getMonth() + 1)
				uni.navigateTo({
					url: 'order-list?month=' + month + '&orgId=' + this.orgId +
						'&pageResource=3'
				})
			},
			toggleOrganize(show) {
				// this.isShow=show
				if (show) {
					// this.$refs.origanzePopup.open()
					this.isShow = show
				} else {
					setTimeout(() => {
						this.isShow = show
					}, 200)
					// this.$refs.origanzePopup.close()
				}
			},
			treeItemSelect(item) {
				this.orgId = item.id
				this.orgName = item.name
				this.getOrgInfo(this.orgId)
				this.getOrgMembers()
				this.toggleOrganize(false)
			},
			getSalesManOrg() {
				app.getSalesManOrg({
					orgId: this.orgId
				}).then((res) => {
					this.organizeList = res.data
				})
			},

		},

	}
</script>

<style lang="scss" scoped>
	.projectbox{
		padding:26rpx 0rpx 0;box-sizing:border-box;background:#fff;
		.projectitem{
			width:49%;padding:40rpx 0 60rpx;text-align:center;font-size:34rpx;position:relative;
			.itemicon{width:130rpx;height:130rpx;margin-bottom:10rpx;}
		}
		.centerline{width:2rpx;height:230rpx;background:#ccc;}
	}
	.pageselect{
		position:fixed;top:0;left:0;right:0;bottom:0;z-index:3;background:#f5f5f5;
	}
	.container {
		height: 100vh;
		background-color: #F5F6F6;
		position: relative;



		.origanzePopup {
			background-color: #FFFFFF;
			padding: 60rpx;

			.head {
				justify-content: space-between;
				.tip{
					color: #999999;
					font-size: 28rpx;
				}
				image {
					width: 24rpx;
					height: 24rpx;
				}

				margin-bottom: 30rpx;
			}

			scroll-view {
				height: 640rpx;
				background-color: #FFFFFF;
			}

			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;
			color: #333333;
			font-size: 15px;
		}

		.head {
			background: #FFFFFF;

			.organization-box {
				justify-content: space-between;
				padding: 0 44rpx;
				height: 98rpx;
				background-color: $uni-defautt-bg-color;

				.name {
					font-size: 32rpx;
					color: $uni-text-color;
				}

				.toggle-box {
					font-size: 28rpx;
					color: #666666;

					.down-arrow {
						width: 27rpx;
						height: 15rpx;
						margin-left: 10rpx;
					}
				}

			}

			.order-count-box {
				padding-bottom: 40rpx;

				.content {
					padding: 60rpx 0rpx;
					padding-bottom: 36rpx;
					flex-wrap: nowrap;

					.head-item {
						flex: 1;
						font-size: 28rpx;
						justify-content: center;
						align-items: center;border-right: 2rpx solid #ddd;

						&:last-child {
							border-right: 0rpx solid #ddd;
						}

						.value {
							font-size: 46rpx;
							padding-bottom: 10rpx;
							color: #4B8BE8;
						}
					}
					.head-item1 {
						flex: 1;
						font-size: 24rpx;
						justify-content: center;
						align-items: center;border-right: 2rpx solid #ddd;
					
						&:last-child {
							border-right: 0rpx solid #ddd;
						}
					
						.value {
							font-size: 38rpx;
							padding-bottom: 10rpx;
							color: #4B8BE8;
						}
					}
				}

				.tip {
					color: #999999;
					font-size: 26rpx;
					margin-left: 50rpx;
				}
			}


		}

		.item-outer {
			margin-top: 20rpx;

			.item {
				background-color: #FFFFFF;
				height: 90rpx;
				justify-content: space-between;
				align-items: center;
				padding: 0 50rpx;

				.left-name {
					font-size: 30rpx;
					color: #333333;
				}

				.right-arrow {
					width: 15rpx;
					height: 27rpx;
					margin-left: 20rpx;
				}
			}
		}
	}
</style>
