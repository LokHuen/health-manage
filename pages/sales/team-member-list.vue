<template>
	<view class="container">
		<view class="list flexc">
			<view class="list-item" v-for="(item,index) in list" @click="selectItem(item)">
				<view class="name">{{item.name}}</view>
				<view class="desc">{{item.hasDoctors+' 医生'+' '+item.hasPatients+' 患者'}}</view>
			</view>
		</view>
		<view class="no-data-tips" v-if="list.length == 0">暂无数据</view>
	</view>
</template>


<script>
	const app = getApp();
	export default {

		data() {
			return {
				list: [],
				orgName: '',
				params: {
					orgId: '',
				}
			}
		},
		onLoad(props) {
			if (props.orgId) {
				this.params.orgId = props.orgId
			}
			if (props.orgName) {
				this.orgName = props.orgName
			}

			this.refreshData();
		},
		onReady() {
			if (this.orgName) {
				uni.setNavigationBarTitle({
					title: this.orgName
				})
			}
		},

		onPullDownRefresh() {
			this.refreshData();
		},
		methods: {
			refreshData() {
				this.params.pageNo = 1;
				this.getListData();
			},


			getListData() {
				app.getSalesList(this.params).then(res => {
					if (res.status == 1) {
						this.list = res.data
					}
					uni.stopPullDownRefresh();
				});
			},
			selectItem(item) {
				console.log(item.name)
				uni.navigateTo({
					url: 'sales-business?salesId=' + item.id + '&salesName=' + item.name
				})
			}

		},

	}
</script>

<style lang="scss" scoped>
	page {
		background-color: $uni-defautt-bg-color;
	}

	.container {
		height: 100vh;

		.no-data-tips {
			margin-top: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: #666666;
		}

		.list {
			padding: 20rpx;
			padding-top: 0;

			.list-item {
				margin-top: 20rpx;
				background-color: #FFFFFF;
				border-radius: 12rpx;
				padding: 40rpx 30rpx;

				.name {
					font-size: 32rpx;
					color: #333333;
				}

				.desc {
					margin-top: 20rpx;
					font-size: 26rpx;
					color: #666666;
				}
			}

		}

	}
</style>
