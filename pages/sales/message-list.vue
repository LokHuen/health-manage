<template>
	<view class="container flexc">
		<view class="empty-msg" v-if="list.length==0">暂无消息</view>
		<view class="msg-item flexc" v-for="(item,index) in list">
			<text class="content">{{item.content}}</text>
			<view class="flex" style="justify-content: space-between;">
				<text class="time">{{item.sendTime}}</text>
				<view class="flex" style="margin-bottom: 20rpx;">
					<text v-if="item.status==0" class="to-read" @click="readMessage(index)">标注已读</text>
					<text v-if="item.status==1" class="has-read">已读</text>
				</view>
			</view>
			<view class="msg-point" v-if="item.status==0"></view>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	const testData = {
		"msg": "查询成功",
		"data": {
			"list": [{
				"statusName": "未读",
				"id": 3,
				"content": "资源报备审核已通过",
				"status": 0,
				"sendTime": "2021-03-24 11:15:17"
			}, {
				"statusName": "未读",
				"id": 2,
				"content": "医生资源报备审核没有通过，请修改内容医生资源报备审核没有通过，请修改内容医生资源报备审核没有通过，请修改内容医生资源报备审核没有通过，请修改内容",
				"status": 0,
				"sendTime": "2021-03-24 11:15:17"
			}, {
				"statusName": "未读",
				"id": 1,
				"content": "资源报备审核没有通过，请修改内容",
				"status": 0,
				"sendTime": "2021-03-24 11:15:17"
			}],
			"pageCount": 1,
			"pageNo": 1,
			"pageSize": 10,
			"recordCount": 3
		},
		"status": 1
	}
	export default {
		data() {
			return {
				list: [

				],
				params: {
					pageNo: 1
				},
				info: {
					pageCount: 1
				}
			}
		},
		onLoad() {
			this.getList(1)
		},
		methods: {
			getList(pageNo = 1) {
				if (pageNo <= this.info.pageCount) {
					this.params.pageNo = pageNo
					app.messageList().then((res) => {
						// res = testData
						if (pageNo == 1) {
							this.list = res.data.list
							// this.list = this.list.concat(this.list)
							// this.list = this.list.concat(this.list)
							// this.list = this.list.concat(this.list)
						} else {
							if (this.info.pageCount >= pageNo) {
								this.list = this.list.concat(res.data.list)
							}
						}
					})
				}
			},
			readMessage(index) {
				app.readMessage({
					id: this.list[index].id
				}).then((res) => {
					this.list[index].status = 1
					this.$forceUpdate()
				})
			}
		},
		onReachBottom() {
			let pageNo = this.params.pageNo + 1
			console.log(pageNo)
			if (pageNo <= this.info.pageCount) {
				this.getList(pageNo)
			}
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: $uni-defautt-bg-color;
	}

	.container {
		.empty-msg {
			font-size: 32rpx;
			text-align: center;
			padding-top: 200rpx;
			color: #999999;
		}

		.msg-item {
			position: relative;
			font-size: 30rpx;
			color: #999999;
			padding: 36rpx 30rpx;
			background-color: #FFFFFF;
			margin-top: 18rpx;

			.msg-point {
				position: absolute;
				width: 16rpx;
				height: 16rpx;
				border-radius: 8rpx;
				background-color: #DD524D;
				top: 15rpx;
				left: 15rpx;
			}

			.content {
				font-size: 32rpx;
				color: #333333;
			}

			.time {
				margin-top: 10rpx;
			}

			.to-read {
				color: #4B8BE8;
			}

			.has-read {
				color: #999999;
			}
		}
	}
</style>
