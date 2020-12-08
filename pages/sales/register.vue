<template>
	<view class="contentbox">
		<view class="flex linebox">
			<view class="lefttext">帐号</view>
			<input class="rightarea" v-model="form.legalName" maxlength="20" placeholder="请输入" />
		</view>
		<view class="flex linebox">
			<view class="lefttext">密码</view>
			<input class="rightarea" password="true" v-model="form.legalIdCard" maxlength="20" placeholder="请输入" />
		</view>
	
		<view class="pagebottombt">
			<view @click="saveinfo">登 录</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				imgUrl:app.globalData.imageUrl,
				form:{
					
				},
				warn: {
					idCardFront: "请上传身份证人像面",
					idCardBack: "请上传身份证国徽面",
				},
			}
		},
		onLoad(options){
			
		},
		onShow(){
			
		},
		methods: {
			saveinfo() {
				for (let key in this.warn) {
					if (!this.form[key]) {
						app.tip(this.warn[key]);
						return;
					}
				}
				let data = JSON.parse(JSON.stringify(this.form));
			
				app.loading("保存中");
				app.salesregister(data).then(res => {
					app.loaded();
					uni.reLaunch({
						url: "",
					})
				})
			},
		}
	}
</script>

<style lang="scss">
	.contentbox {
		padding: 0 40rpx;
	
		.linebox {
			border-bottom: 1px solid #eee;
			min-height: 100rpx;
			font-size: 32rpx;
			padding: 0 0 0 6rpx;
	
			.lefttext {
				width: 120rpx;text-align:center;
				padding-right: 32rpx;
			}
	
			.rightarea {
				flex: 1;
				font-size: 32rpx;
				color: #888;
			}
		}
	
		.pagebottombt {
			padding: 100rpx 0;
	
			view {
				background: #52A29E;
				color: #fff;
				text-align: center;
				font-size: 34rpx;
				line-height: 88rpx;
				border-radius: 45rpx;
				margin: 0 20rpx 0 20rpx;
			}
		}
	}
</style>
