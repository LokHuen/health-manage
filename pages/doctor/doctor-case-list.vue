<template>
	<!-- 医生营养管理病例界面 -->
	<view class="container">
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
				
			}
		},
		created() {



		}

	}
</script>

<style lang="scss">
	.container {
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
					background-color: #D2D2D2;
				}
				.imagelist {
					margin-top: 20rpx;
					width: 200rpx;
					height: 200rpx;
					background-color: #D2D2D2;
					margin-left: 31rpx;
				}
			}

		}

	}
</style>
