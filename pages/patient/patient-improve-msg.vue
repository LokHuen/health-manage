<template>
	<!-- 患者完善界面 -->
	<view class="container">
		<view class="title">完善患者资料，医生才能及时掌握您的营养状况和给予康复指导。</view>
		<view class="line-space"></view>
		<view class="name-box">
			<view class="name-tips">* 患者姓名</view>
			<input class="name-input" type="text" value="" placeholder="请填写患者的真实名字" v-model="name" />
		</view>
		<view class="sex-box" @click="selectSex">
			<view class="sex-tips">* 患者性别</view>
			<view class="sex-value">点击选择</view>
		</view>
		<view class="sex-box" @click="selectDate">
			<view class="sex-tips">* 出生日期</view>
			<view class="sex-value">点击选择</view>
		</view>
		<view class="sex-box" @click="selectCity">
			<view class="sex-tips">* 所在城市</view>
			<view class="sex-value">点击选择</view>
		</view>
		<view class="name-box">
			<view class="name-tips">* 所患疾病</view>
			<input class="name-input" type="text" value="" placeholder="请填写疾病名称" v-model="ill" />
		</view>
		<view class="name-box">
			<view class="name-tips">* 当前身高</view>
			<input class="name-input" type="text" value="" placeholder="请填写身高" v-model="height" />
			<view class="right-tip">cm</view>
		</view>
		<view class="name-box">
			<view class="name-tips">* 当前体重</view>
			<input class="name-input" type="text" value="" placeholder="请填写体重" v-model="weight" />
			<view class="right-tip">kg</view>
		</view>
		<view class="pic-title">病历照片</view>
		<view class="pic-tip">上传出院小结（重要）、影像报告等内容，方便医生 评估病情</view>
		<view class="pic-content-box">
			<view class="ccimglist">
				<view v-for="(item,index) in files" :key="index" :class="(index%3==0)?'img-box-first':'img-box'">
					<image src="" mode="aspectFill" @click="previewImage(index)" class="imagelist"></image>
					<image src="../../static/icon/icon_remove.png" mode="aspectFill" class="remove-icon" @click="remove(index)"></image>
				</view>
			</view>
		</view>
		<view class="upload-box" @click="upload">点击上传</view>
		<view style="height: 200rpx;"></view>

		<view class="button-box">
			<button type="default" class="button">提交</button>
		</view>

		<picker-view v-if="isPicker" :indicator-style="indicatorStyle" :value="value" @change="bindChange">
			<picker-view-column>
				<view class="item" v-for="(item,index) in years" :key="index">{{item}}年</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item,index) in months" :key="index">{{item}}月</view>
			</picker-view-column>
			<picker-view-column>
				<view class="item" v-for="(item,index) in days" :key="index">{{item}}日</view>
			</picker-view-column>
		</picker-view>
	</view>
</template>

<script>
	export default {
		components: {

		},
		data() {
			const date = new Date()
			const years = []
			const year = date.getFullYear()
			const months = []
			const month = date.getMonth() + 1
			const days = []
			const day = date.getDate()
			for (let i = 1990; i <= date.getFullYear(); i++) {
				years.push(i)
			}
			for (let i = 1; i <= 12; i++) {
				months.push(i)
			}
			for (let i = 1; i <= 31; i++) {
				days.push(i)
			}
			return {
				patientName: '',
				patientGender: 1,
				birthday: '',
				cityId: '',
				provinceId: '',
				illness: '',
				height: '',
				weight: '',
				files: [],


				isPicker: false,
				value: [9999, month - 1, day - 1],
				indicatorStyle: `height: ${Math.round(uni.getSystemInfoSync().screenWidth/(750/100))}px;`,
				months: [],
				month: [],
				days: [],
			}
		},
		methods: {
			previewImage(index) {
				console.log(index);
			},
			remove(index) {
				this.list.splice(index, 1);
			},
			upload() {

			},
			selectSex() {
				console.log('selectSex');
			},
			selectDate() {
				this.isPicker = !this.isPicker
				console.log(this.isPicker)
			},
			bindChange(e) {
				const val = e.detail.value
				this.year = this.years[val[0]]
				this.month = this.months[val[1]]
				this.day = this.days[val[2]]
			},
			selectCity() {
				console.log('selectCity');
			}
		},
		created() {

		}

	}
</script>

<style lang="scss">
	.imagelist {
		width: 175rpx;
		height: 175rpx;
		margin-top: 12.5rpx;
		margin-left: 12.5rpx;
		background-color: #D2D2D2;
	}

	.remove-icon {
		position: absolute;
		width: 25rpx;
		height: 25rpx;
		right: 0;
		top: 0;
	}

	.container {
		.title {
			color: #333333;
			font-size: 15px;
			margin-left: 44rpx;
			margin-right: 44rpx;
			padding-top: 40rpx;
			padding-bottom: 40rpx;
		}

		.line-space {
			background-color: #F7F8F8;
			height: 20rpx;
		}

		.name-box {
			display: flex;
			margin-left: 43rpx;
			margin-right: 43rpx;
			height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;
			position: relative;

			.name-tips {
				color: #333333;
				font-size: 15px;
				height: 100rpx;
				line-height: 100rpx;
			}

			.name-input {
				margin-left: 30rpx;
				color: #333333;
				font-size: 15px;
				height: 100rpx;
				line-height: 100rpx;
			}

			.right-tip {
				position: absolute;
				color: #333333;
				font-size: 15px;
				right: 0;
				top: 30rpx;
			}
		}

		.sex-box {
			display: flex;
			margin-left: 43rpx;
			margin-right: 43rpx;
			height: 100rpx;
			border-bottom: 2rpx solid #EEEEEE;

			.sex-tips {
				color: #333333;
				font-size: 15px;
				height: 100rpx;
				line-height: 100rpx;
			}

			.sex-value {
				margin-left: 30rpx;
				padding-right: 0;
				color: #999999;
				font-size: 15px;
				height: 100rpx;
				line-height: 100rpx;
			}
		}

		.pic-title {
			color: #333333;
			font-size: 15px;
			padding-left: 43rpx;
			padding-top: 30rpx;
		}

		.pic-tip {
			font-size: 14px;
			color: #999999;
			padding-top: 20rpx;
			padding-left: 40rpx;
			padding-right: 40rpx;
		}

		.pic-content-box {
			.ccimglist {
				display: flex;
				flex-wrap: wrap;
				// justify-content:space-between;
				margin-left: 44rpx;
				margin-right: 44rpx;

				.img-box-first {
					margin-top: 5rpx;
					width: 200rpx;
					height: 200rpx;
					position: relative;
				}

				.img-box {
					margin-top: 5rpx;
					width: 200rpx;
					height: 200rpx;
					margin-left: 31rpx;
					position: relative;
				}

			}

		}

		.upload-box {
			margin-top: 40rpx;
			margin-left: 44rpx;
			height: 60rpx;
			width: 210rpx;
			color: #59A29F;
			border: 2rpx solid #52A29E;
			text-align: center;
			line-height: 60rpx;
		}

		.button-box {
			position: fixed;
			bottom: 0;
			height: 140rpx;
			width: 100%;

			.button {
				height: 90rpx;
				width: 81%;
				background-color: #52A29E !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17px;
			}
		}
	}
</style>
