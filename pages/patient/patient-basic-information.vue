<template>

	<view>
		<view class="health-content" v-for="(item,index) in listDatas">
			<view class="health-item">
				<view class="health-item-title">{{item.title}}</view>
				<view class="health-item-detail">{{item.detail}}</view>
			</view>
		</view>

		<view class="health-update">
			<button class="health-update-button">更新信息</button>
		</view>

	</view>

</template>

<script>
	export default {
		data() {
			return {
				listDatas: [{
					id: 101,
					title: "患者姓名",
					detail: "张小明",
				}, {
					id: 101,
					title: "患者性别",
					detail: "男",
				}, {
					id: 101,
					title: "出生日期",
					detail: "1949年1月10日",
				}, {
					id: 101,
					title: "所患疾病",
					detail: "乳腺癌",
				}, {
					id: 101,
					title: "所在城市",
					detail: "湖北省武汉市",
				}, {
					id: 101,
					title: "身高",
					detail: "165cm",
				}, {
					id: 101,
					title: "体重",
					detail: "55kg",
				}]
			}
		}
	}
</script>

<style lang="scss">
	.health-content {
		margin: 0 44rpx;

		.health-item {
			border-bottom: 0.01rem #EEEEEE solid;
			padding-bottom: 0.4rem;
			display: block;
			height: 96rpx;
			text-align: center;

			.health-item-title {
				font-size: 30rpx;
				color: #333333;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				float: left;
			}

			.health-item-detail {
				font-size: 30rpx;
				color: #333333;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				float: right;
			}
		}
	}

	.health-update {
		text-align: center;
		position: absolute;
		bottom: 50rpx;
		width: 100%;

		.health-update-button {
			width: 85%;
			height: 90rpx;
			font-size: 34rpx;
			color: white;
			background-color: #52A29E;
			border-radius: 45rpx;
		}
	}
</style>
