<template>
	<view class="flexc container">
		<turnback></turnback>
		<view class="headtips">请选择一位医生</view>
		<view class="search-out-box">
			<view class="flex search-box">
				<image src="../../static/icon/incon_search.png"></image>
				<input placeholder="输入医生名字搜索" v-model="params.keyword" @input="getList(1)" />
			</view>
		</view>
		<view class="flexc list" v-if="list.length>0">
			<view class="flexc item" v-for="(item,index) in list" @click="toPatient(item)" :key="index">
				<view class="flex namebox" style="align-items: flex-end;">
					<view class="dname">{{item.doctorName}}</view><view style="padding-left:4rpx;">{{item.technicalTitle}}</view>
				</view>
				<view class="flex infobox" style="">
					<view style="padding-right:20rpx;">{{item.hospital}}</view>{{item.department}}
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
	import turnback from "../../components/turnback.vue"
	export default {
		components: {
			turnback
		},
		onLoad(props) {
			if (props.isDepartmentIcu) {
				this.params.isDepartmentIcu = props.isDepartmentIcu
			}
			this.getList();
		},
		data() {
			let uid = app.getCache('uid')
			return {
				list: [],
				pageCount: 1,
				params: {
					pageNo: 1,
					keyword: '',
					isDepartmentIcu: '',
					bindDoctor: uid
				}
			}
		},
		onReachBottom() {
			// this.getList();
		},
		methods: {
			getList(page) {
				if(page) this.params.page = page;
				if (this.params.page > this.pageCount) return;
				app.salesuserlist(this.params).then((res) => {
					this.info = res.data
					this.pageCount = res.data.pageCount;
					this.list = this.params.page == 1 ? res.data : this.list.concat(res.data);
					if (res.data.length > 0) this.params.page++;
				})
			},
			toPatient(item) {
				let data = {
					...app.cardinfo,
					userId:item.id,
					userName:item.doctorName,
					userTitle:item.technicalTitle,
					userDepartment:item.department,
					userHospitalId:item.technicalTitle,
					hospital:item.hospital,
				};
				app.cardinfo = data;
				uni.navigateTo({
					url:"/pages/card/input"
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
			.namebox{
				font-size: 28rpx;color: #666666;
				.dname{font-size: 34rpx;font-weight: 600;color: #333333;padding-right:20rpx;}
			}
			.infobox{font-size: 26rpx;color: #666666;padding-top:16rpx;}

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
			position: sticky;
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
	.headtips{line-height: 110rpx;margin-bottom:-20rpx;}
</style>
