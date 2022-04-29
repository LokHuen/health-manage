<template>
	<view class="container flexc">
		<turnback @back="backaction" :isback="bindchannel?'':1" :title="hio==1?'下属团队开展的院线业务':'下属团队开展的健康业务'"> </turnback>
		<view class="flexc head">
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
			<view class="item-outer">
				<view class="item flex" @click="toTeamMember">
					<text class="left-name">团队成员</text>
					<view class="flex">
						<text>{{info.salesNum}}</text>
						<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
					</view>
				</view>
				<text class="item-subtext">统计数据包括直属和所有间接下级</text>
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
		<!-- <view class="pageselect" v-show="showselet">
			<turnback > </turnback>
			<view class="flexc">
				<view class="item-outer" @click="selecttype(1)" >
					<view class="item flex">
						<text class="left-name">肿瘤营养与干预——下属团队业务</text>
						<view class="flex">
							<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
						</view>
					</view>
				</view>
				<view class="item-outer" @click="selecttype(2)" >
					<view class="item flex">
						<text class="left-name">健康国际在线——下属团队业务</text>
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
				salesId:'',
				info: {},
				isMiniProgram:false,
				showgetmoney:false,
				showselet:true,
				hio:1, //1维新 2hio
				bindchannel:false,
			}
		},
		onLoad(props) {
			if(props.salesId){
				this.salesId = props.salesId
			}
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
			this.getAgentInfo();
			this.getMiniProgramStatic();
		},
		methods: {
			backaction(){
				this.showselet = true;
			},
			selecttype(index){
				localStorage.setItem("hio",index);
				this.hio = index;
				this.getAgentInfo();
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
					url: 'month-order-list?pageResource=2'+'&salesId='+this.salesId
				})
			},
			toTeamMember() {
				uni.navigateTo({
					url: 'team-member'
				})
			},

			toOrder() {
				let date = new Date()
				let month = date.getFullYear() + '-' + (date.getMonth() + 1)
				uni.navigateTo({
					url: 'order-list?' + '&month=' + month+
						'&pageResource=2'+'&salesId='+this.salesId
				})
			},
			getAgentInfo() {
				app.agentInfo({channel:this.hio==1?1:6}).then((res) => {
					this.info = res.data
				})
				app.salesmangetIdentity({}).then(res => {
					if (res.status == 1) {
						this.showgetmoney = res.data.isAgent
					}
				});
			}
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

		.origanzePopup {
			padding: 60rpx;

			.head {
				justify-content: flex-end;

				image {
					width: 24rpx;
					height: 24rpx;
				}

				margin-bottom: 30rpx;
			}

			text-align: center;
			height: 655rpx;
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
						font-size: 30rpx;
						justify-content: center;
						align-items: center;

						&:nth-child(1) {
							border-right: 2rpx solid #ddd;
						}

						.value {
							font-size: 52rpx;
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

			.item-subtext {
				padding-left: 50rpx;
				color: #999999;
				font-size: 26rpx;
				height: 84rpx;
				line-height: 84rpx;
				padding-top: 20rpx;
			}

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
