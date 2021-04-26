<template>
	<view class="container flexc">
		<turnback @back="back" v-if="isMiniProgram"> </turnback>

		<view class="flexc tab" v-if="!params.salesId">
			<view class="flex">
				<view :class="{'tab-item':true,active:params.status==1}" @click="tabClick(1)">
					<text>已报备({{info.successNum}})</text>
				</view>
				<view :class="{'tab-item':true,active:params.status==0}" @click="tabClick(0)">
					<text>待审核({{info.waittingAuditNum}})</text>
				</view>
				<view :class="{'tab-item':true,active:params.status==-1}" @click="tabClick(-1)">
					<text>未通过({{info.auditNoPassNum}})</text>
				</view>
				<view :class="{'tab-item':true,active:params.status==3}" @click="tabClick(3)">
					<text>系统移除({{info.delSysNum}})</text>
				</view>
			</view>
			<view class="tips">
				{{params.status==1?'注：如果最近60天内未有订单记录，该资源会被释放':''}}
			</view>
		</view>
		<scroll-view :class="{
			'self-min':!params.salesId&&isMiniProgram,
			'self-no-min':!params.salesId&&!isMiniProgram,
			'no-self-min':params.salesId&&isMiniProgram,
			'no-self-no-min':params.salesId&&!isMiniProgram,
		
		flexc:true,content:true}" scroll-y @scrolltolower="getList(params.pageNo+1)">
			<view
				style="justify-content: center;font-size: 32rpx; color: #999999;padding-top: 200rpx;text-align: center;"
				v-if="list.length==0">
				<text>暂无数据</text>
			</view>
			<view class="flexc list">
				<view class="item flex" v-for="(item,index) in list" @click="toDetail(item)">
					<view class="flexc left">
						<view class="flex" style="margin-bottom: 10rpx;" v-if="item.doctorNmae">
							<text class="doctor">{{item.doctorNmae}}</text>
							<text class="post">{{item.technicalTitle}}</text>
						</view>
						<text class="hospital">{{item.hospital}} {{item.deptName}}</text>
						<text style="margin-top: 20rpx;">月患者数量预估{{item.monthly_patient}}人</text>
						<text>月成交单数预估{{item.completed_order}}人</text>
					</view>
					<view class="flexc right">
						<text class="report-time">{{item.create_time.split(' ')[0]}} 报备</text>
						<text class="will-remove" v-if="info.release">即将被释放</text>
					</view>
					<view class="fix-box flex" v-if="!params.salesId">
						<text class="delete" @click.stop="askRemove(item)">删除</text>
						<text @click.stop="toUpdates(item)">更新信息</text>
					</view>
				</view>
			</view>
		</scroll-view>
		<view class="flex bottom">
			<text class="report-count">还能报备({{info.canApplyNum}})个客户</text>
			<text class="btn-report" @click="toReport" v-if="!params.salesId">报备资源</text>
		</view>

		<uni-popup ref="removePop">
			<view class="remove-pop flexc">
				<view>
					<text style="font-size: 34rpx; color: #333333;margin-left: 30rpx;">确定移除</text>
				</view>
				<view class="flex"
					style="margin-top: 100rpx;text-align: center;border-top: 1rpx solid #f7f7f7;height: 88rpx; font-size: 34rpx;">
					<text style="flex: 1;border-right: 1rpx solid #f7f7f7;height: 88rpx;line-height: 88rpx;"
						@click="closeRemove">取消</text>
					<text style="flex: 1;height: 88rpx;line-height: 88rpx; color: #4B8BE8;" @click="doRemove">确定</text>
				</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	const app = getApp();
	import wx from '../../plugins/jweixin.js'
	import turnback from "../../components/turnback.vue"

	export default {
		components: {
			turnback
		},

		data() {
			return {
				params: {
					pageNo: 1,
					salesId: '',
					status: 1,
				},
				list: [],
				info: {
					recordCount: 0,
					pageCount: 1
				},
				tempItem: {},
				isMiniProgram: false


			}
		},
		onLoad(props) {
			if (props.salesId) {
				this.params.salesId = props.salesId
			}
			this.getMiniProgramStatic();
		},
		onShow() {
			this.getList(1)
		},
		methods: {
			getMiniProgramStatic() {
				wx.miniProgram.getEnv((res) => {
					this.isMiniProgram = res.miniprogram ? true : false;
				})
			},
			back() {
				uni.navigateBack({

				})
			},

			tabClick(status) {
				this.params.status = status
				this.info.pageCount = 1
				this.getList(1)
			},
			toReport() {
				uni.navigateTo({
					url: 'resource-report'
				})
			},
			getList(pageNo = 1) {
				if (this.info.pageCount >= pageNo) {
					this.params.pageNo = pageNo
					app.resourceList(this.params).then(res => {
						if (res.status === 1) {
							this.info = res.data
							if (this.params.pageNo === 1) {
								this.list = res.data.list;
							} else {
								if (res.data.pageCount >= this.params.pageNo) {
									this.list = this.list.concat(res.data.list);
								}
							}
						}
					});
				}
			},
			toDetail(item) {
				uni.navigateTo({
					url: '../agent/resource-report-detail?id=' + item.id
				})
			},
			toUpdates(item) {
				uni.navigateTo({
					url: 'resource-report?id=' + item.id
				})
			},
			askRemove(item) {
				this.tempItem = item
				this.$refs.removePop.open()
			},
			closeRemove() {
				this.$refs.removePop.close()
			},
			doRemove() {
				app.removeResource({
					id: this.tempItem.id
				}).then(res => {
					if (res.status == 1) {
						app.tip('移除成功');
						this.closeRemove()
						this.getList(1)
					}
				});
			}
		}
	}
</script>

<style lang="scss" scoped>
	$tab-height:120rpx;
	$return-height:90rpx;
	$bottom-height:88rpx;
	$main-color:#4B8BE8;

	.container {
		.remove-pop {
			padding-top: 30rpx;
			background-color: #FFFFFF;
			border-radius: 12rpx;
			width: 680rpx;
			margin: 0 auto;
		}

		.tab {
			height: $tab-height;
			background-color: $uni-defautt-bg-color;
			padding-top: 24rpx;
			box-sizing: border-box;

			.tab-item {
				flex: 1;
				justify-content: center;
				font-size: 30rpx;
				text-align: center;
				font-weight: bold;
			}

			.active {
				color: $main-color;
			}

			.tips {
				height: 32rpx;
				font-size: 22rpx;
				color: #999999;
				margin-left: 30rpx;
				margin-top: 10rpx;
			}
		}

		.content {
			// height: calc(100vh - #{$tab-height} - #{$bottom-height});
			background-color: $uni-defautt-bg-color;
			padding-bottom: 18rpx;
			box-sizing: border-box;

			.list {
				padding: 0 30rpx;

				.item {
					color: #333333;
					font-size: 30rpx;
					position: relative;
					align-items: flex-start;
					padding: 24rpx;
					padding-bottom: 32rpx;
					background-color: #FFFFFF;
					border-radius: 12rpx;
					margin-top: 18rpx;

					.left {
						flex: 1;

						.doctor {
							font-size: 32rpx;
							font-weight: bold;
							margin-right: 12rpx;
						}
					}

					.right {
						.report-time {
							color: #999999;
						}

						.will-remove {
							color: #999999;
							text-align: right;
							margin-top: 15rpx;
						}
					}

					.fix-box {
						position: absolute;
						right: 24rpx;
						bottom: 32rpx;
						color: $main-color;
						font-size: 30rpx;

						.delete {
							margin-right: 12rpx;
						}
					}
				}
			}
		}

		// .self {
		// 	height: calc(100vh - #{$tab-height} - #{$bottom-height});
		// }

		// .no-self {
		// 	height: calc(100vh - #{$bottom-height});
		// }

		.self-min {
			height: calc(100vh - #{$tab-height} - #{$bottom-height} - #{$return-height});
		}

		.self-no-min {
			height: calc(100vh - #{$tab-height} - #{$bottom-height});
		}

		.no-self-min {
			height: calc(100vh - #{$bottom-height} - #{$return-height});
		}

		.no-self-no-min {
			height: calc(100vh - #{$bottom-height});
		}

		.bottom {
			height: $bottom-height;
			justify-content: space-between;
			padding: 0 24rpx;

			.report-count {
				font-size: 30rpx;
				color: #999999;
			}

			.btn-report {
				font-size: 32rpx;
				color: #FFFFFF;
				padding: 15rpx 40rpx;
				background-color: $main-color;
				border-radius: 10rpx;
			}
		}
	}
</style>
