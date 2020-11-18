<template>
	<view>
		<view class="box">
			<view class="title">影像报告回寄信息</view>
			<view class="sub-title">专家看完报告后会把报告回寄给您</view>
			<input class="agency-input" type="text" @input="backAddress" placeholder="请填写收件地址" />
			<view class="line"></view>
			<input class="agency-input" type="text" @input="backUserName" placeholder="收件人名字" />
			<view class="line"></view>
			<input class="agency-input" type="text" @input="backMobile" placeholder="联系电话" />
			<view class="line"></view>
			<view class="bottom-blank"></view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			};
		},
		methods: {
			backAddress(e) {
				this.$emit("backAddress", e.detail.value)
			},
			backUserName(e) {
					console.log("hha")
				this.$emit("backUserName", e.detail.value)
			},
			backMobile(e) {
				this.$emit("backMobile", e.detail.value)
			}
		}

	}
</script>

<style>
	.box {
		margin-top: 10px;
		margin-left: auto;
		margin-right: auto;
		height: auto;
		width: 93%;
		background-color: #FFFFFF;
		color: #333333;
		border-radius: 5px;
		box-shadow: 1px 1px 5px #999999;
	}

	.title {
		font-size: 16px;
		color: #333333;
		margin-left: 15px;
		padding-top: 18px;
		height: 15.5px;
		line-height: 15.5px;
	}

	.sub-title {
		font-size: 13px;
		color: #999999;
		margin-left: 15px;
		margin-top: 10px;
		height: 13.5px;
		line-height: 13.5px;
	}

	.line {
		background-color: #D2D2D2;
		margin-top: 10px;

		margin-left: 15px;
		margin-right: 15px;
		height: 1px;
	}

	.agency-input {
		margin-top: 15px;
		margin-left: 15px;
		margin-right: 15px;
		font-size: 16px;
		color: #666666;
	}

	.bottom-blank {
		padding-bottom: 20px;
	}
</style>
