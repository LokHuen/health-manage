<template>
	<view class="flexc container">
		<view class="flex search-box">
			<image src="../../static/icon/incon_search.png"></image>
			<input placeholder="请输入患者昵称或名字搜索" v-model="params.patientName" @input="getList(1)" />
		</view>
		<view class="flexc list" v-if="list.length>0">
			<view class="flexc item" v-for="(item,index) in list">
				<view class="flex" style="align-items: flex-start;">
					<image class="avator" :src="item.portrait"></image>
					<view class="flexc">
						<text class="name">{{item.patientName}}</text>
						<text class="text">{{item.illness}} {{item.surveyResult}} {{item.isBuy}}</text>
						<text class="join-time">加入时间：{{item.createTime}}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="nodata flex" style="padding-top: 100rpx; color: #999999; justify-content: center;font-size: 30rpx;"
			v-if="list.length==0">
			<text>没找到相关数据</text>
		</view>
	</view>
</template>

<script>
	const app = getApp()
	export default {
		onLoad(props) {
			if (props.isDepartmentIcu) {
				this.params.isDepartmentIcu = props.isDepartmentIcu
			}
			this.getList(1)
		},
		data() {
			// let uid=app.getCache('uid')
			let uid = 129
			return {
				list: [],
				params: {
					pageNo: 1,
					patientName: '',
					isDepartmentIcu: '',
					bindDoctor: uid
				}
			}
		},
		methods: {
			getList(pageNo = 1) {
				this.params.pageNo = pageNo
				app.getPatientList(this.params).then((res) => {
					this.info = res.data
					if (this.params.pageNo == 1) {
						this.list = res.data.list
					} else {
						if (this.params.pageNo <= this.info.pageCount) {
							this.list = this.list.concat(res.data.list)
						}
					}
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
	page {
		background-color: $uni-defautt-bg-color;
	}

	.container {
		padding: 0 30rpx;
		color: $uni-text-color;

		.list {
			margin-top: 10rpx;

			.item {
				background-color: #FFFFFF;
				border-radius: 10rpx;
				margin-bottom: 10rpx;
				padding: 26rpx 20rpx;

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
				width: 320rpx;
				font-size: 26rpx;
				margin-left: 15rpx;
			}
		}
	}
</style>
