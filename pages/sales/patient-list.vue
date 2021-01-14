<template>
	<!-- 医生营养管理界面 -->
	<view class="container">
		
		<view class="screen-box">
			<view class="all-patien-box" @click="patienScreen">
				<view class="all-patien">{{orderBy==1?'按患者和医生绑定的时间顺序':'按患者最近一次测评时间顺序'}}</view>
				<image class="all-arrow" src="../../static/icon/right_arrow.png" mode="widthFix"></image>
			</view>
		</view>
        <view class="list-box" v-for="(item,index) in list">
			<view class="name">张小明</view>
        	<view class="desc">男 88岁 乳腺癌</view>
			<view class="desc">医生名字：黄利（广东省人民医院内科）</view>
			<view class="desc">最近一次测评结果：中度营养不良（4分）</view>
			<view class="desc">最近一次测评时间：2020年2月1日 12:09</view>
			<view class="desc">暂无营养评估记录</view>
			<view class="desc">订单数：2 （最近一次下单时间：2020年2月1日）</view>
			<view style="height: 20rpx;"></view>
			<view class="desc">和医生绑定时间：2020年1月2日 12:09</view>
			<view style="height: 40rpx;"></view>
        </view>
		<view style="height: 100rpx;"></view>
		
		<uni-popup ref="popupPatient" type="bottom">
			<!-- 选择患者 -->
			<view class="white-background-patient">
				<view class="first-item" @click="selecgtInfo(1)">按患者和医生绑定的时间顺序</view>
				<view class="lines"></view>
				<view class="second-item" @click="selecgtInfo(2)">按患者最近一次测评时间顺序</view>
				<view class="liness"></view>
				<view class="cancel" @click="closePatienScreen">取消</view>
			</view>
		</uni-popup>

	
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				orderBy: 1, // 排序方式（测评时间排序 1，加入时间排序2）
				pageNo: 1,
				list:[1,2,3]
			}
		},
		methods: {
            selecgtInfo(index){
				if(this.orderBy!=index){
					this.orderBy = index;
					this.refreshData();
				}
				this.closePatienScreen();
			},
			patienScreen() {
				this.$refs.popupPatient.open();
			},
			closePatienScreen() {
				this.$refs.popupPatient.close();
			},
			
			refreshData() {
				this.pageNo = 1;
				this.getListData();
			},
			loadMoreData() {
				this.pageNo++;
				this.getListData();
			},
			getListData() {
				
			},


		},
		onShow() {
			// this.$nextTick(() => {
			// 	this.judgeFirst();
			// })

		},
		onLoad() {
			this.refreshData();
		},
		onPullDownRefresh() {
			this.refreshData();
		},
		onReachBottom() {
			this.loadMoreData();
		},


	}
</script>

<style lang="scss">
	.container {
	     height: 100vh;background-color: #F5F6F6;overflow-y: auto;
		 
		.screen-box {
			display: flex;
			height: 100rpx;
			color: #333333;
			font-size: 15px;
            background-color: #FFFFFF;
			z-index: 999;
			position: sticky;
			top: 0;
			
			.all-patien-box {
				display: flex;
				height: 100rpx;
				align-items: center;
				margin-left: 50rpx;

				.all-patien {
					line-height: 100rpx;
				}

				.all-arrow {
					margin-left: 10rpx;
					width: 27rpx;
					height: 15rpx;
				}

			}
		}

		.no-data-tips {
			margin-top: 100rpx;
			text-align: center;
			font-size: 30rpx;
			color: #666666;
		}
		
		.list-box{
			margin-top: 30rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			background-color: #FFFFFF;
			.name{
				color: #333333;
				//margin-top: 40rpx;
				padding-top: 40rpx;
				margin-left: 30rpx;
				font-size: 40rpx;
			}
			.desc{
				color: #666666;
				margin-top: 20rpx;
				margin-left: 30rpx;
				font-size: 26rpx;
			}
		}

		.white-background-patient {
			text-align: center;
			background-color: #FFFFFF;
			border-radius: 10px 10px 0px 0px;
			color: #333333;
			font-size: 15px;

			.first-item {
				height: 120rpx;
				line-height: 120rpx;
			}
			.lines {
				height: 2rpx;
				margin-left: 200rpx;
				margin-right: 200rpx;
				background-color: #DCDCDC;
			}
			.second-item {
				height: 128rpx;
				line-height: 128rpx;
			}

			.liness {
				height: 20rpx;
				background-color: #F6F6F6;
			}

			.cancel {
				height: 100rpx;
				line-height: 100rpx;
			}
		}

	}
</style>
