<template>
	<!-- 患者病例管理界面 -->
	<view class="container">
		<view class="add-case-box">
			<view class="dashed-box" @click="addCase">+ 新增病例</view>
			<view class="add-bottom"></view>
		</view>
		<view class="pic-content-box" v-for="(item,indexItem) in itemList" :key="indexItem">
			<view class="pic-time">2022/12/12 21:09 添加</view>
			<view class="ccimglist">
				<image v-for="(item,index) in list" :key="index" src="" mode="aspectFill" @click="previewImage(index)" :class="(index%3==0)?'imagelistfirst':'imagelist'"></image>
			</view>
		</view>
		<view style="height: 100rpx;"></view>

	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			return {
				list: [1, 2, 3, 4, 5,6,7,8],
				itemList:[1,2,3]
			}
		},
		methods: {
			previewImage(index) {
				console.log(index);
			},
			addCase(){
				uni.navigateTo({
					url:'patient-add-case'
				});
			}
		},
		created() {



		}

	}
</script>

<style lang="scss">
	.container {

		.add-case-box {
			height: 200rpx;
			position: relative;

			.dashed-box {
				text-align: center;
				margin-top: 60rpx;
				margin-left: 85rpx;
				margin-right: 85rpx;
				height: 120rpx;
				line-height: 120rpx;
				border: 2rpx dashed #52A29E;
				color: #52A29E;
			}

			.add-bottom {
				position: absolute;
				bottom: 0rpx;
				left: 0rpx;
				right: 0rpx;
				height: 20rpx;
				background-color: #F7F8F8;
			}
		}

		.pic-content-box {
			.pic-time {
				font-size: 15px;
				color: #333333;
				padding-top: 40rpx;
				padding-left: 44rpx;
			}

			.ccimglist {
				display: flex;
				flex-wrap: wrap;
				// justify-content:space-between;
				margin-left: 44rpx;
				margin-right: 44rpx;
			   
				.imagelistfirst {
					margin-top: 20rpx;
					width: 200rpx;
					height: 200rpx;
					background-color: #999999;
				}
				.imagelist {
					margin-top: 20rpx;
					width: 200rpx;
					height: 200rpx;
					background-color: #999999;
					margin-left: 31rpx;
				}
			}


		}

	}
</style>
