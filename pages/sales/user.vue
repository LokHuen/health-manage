<template>
	<view class="listbox">
		<view class="pagebackground"></view>
		<view>
			<view class="flex userlist" v-for="(item,index) in list" :key="index" @click="toDoctor(item)">
				<image :src="item.wx_portrait" mode="aspectFill" class="userhead"></image>
				<view style="flex:1;">
					<view class="username">{{item.doctor_name}}</view>
					<view class="userinfo">{{item.hospital}}</view>
				</view>
				<view class="flex usernum">
					<text>{{item.bind_patient||0}}</text>患者
				</view>
			</view>
		</view>
		<view v-show="!list[0]" class="hadnodata">暂无数据</view>

	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl: app.globalData.baseUrl,
				imgUrl: app.globalData.imageUrl,
				list: [],
				pageCount: 1,
				params:{
					page: 1,
					salesManId: ''
				}
			}
		},
		onLoad(options) {
			this.params.salesManId = options.salesManId;
			this.init();
		},
		
		methods: {
			init() {
				if (this.params.page > this.pageCount) return;
				app.salesuserlist(this.params).then(res => {
					this.pageCount = res.data.pageCount;
					this.list = this.params.page == 1 ? res.data : this.list.concat(res.data);
					if (res.data.length > 0) this.params.page++;
				});
			},
			toDoctor(item) {
				uni.navigateTo({
					url: '../doctor/doctor-patient-list?doctorId=' + item.id+'&dortorName='+item.doctor_name+'&qrCode='+item.qrCode
				})
			},
			showcode(item) {
				uni.previewImage({
					current: 0,
					urls: [item.qrCode],
				})
			},
		},
	}
</script>

<style lang="scss">
	.userlist {
		background: #fff;
		padding: 28rpx 50rpx;
		margin-top: 10rpx;
	}

	.listbox {
		.userhead {
			width: 100rpx;
			height: 100rpx;
			border-radius: 50%;
			margin-right: 20rpx;
		}

		.username {
			font-weight: 600;
			padding-bottom: 6rpx;
		}

		.userinfo {
			font-size: 26rpx;
		}

		.usernum {
			font-size: 26rpx;
			color: #666666;

			text {
				font-size: 42rpx;
				padding-right: 10rpx;
				color: #4B8BE8;
			}
		}
	}

	.hadnodata {
		color: #888;
		padding-top: 200rpx;
		text-align: center;
	}
</style>
