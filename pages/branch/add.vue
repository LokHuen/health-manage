<template>
	<!--  -->
	<view class="container">
		<view style="padding-top:40rpx;">帐号设置</view>
		<view class="name-box">
			<view class="name-tips">账号：</view>
			<input class="name-input" :disabled="id?true:false" type="text" :value="form.accountCode" placeholder="用户名请输入4到10个字母或数字" v-model="form.accountCode" @input='inputcheck($event,"accountCode")'/>
		</view>

		<view class="nametext">用户名用于登录电脑端患者管理系统，设置成功后不可修改</view>

		<view class="name-box">
			<view class="name-tips">密码：</view>
			<input class="name-input" type="text" value="" placeholder="请输入6到14个字母或数字" v-model="form.passwd" />
		</view>
		<view class="name-box">
			<view class="name-tips">使用人：</view>
			<input class="name-input" type="text" value="" placeholder="请输入使用者的名字" v-model="form.accountName" />
		</view>

		<view class="button-box">
			<button type="default" class="button" @click="submit">保存</button>
		</view>


	</view>

</template>

<script>
	const app = getApp();
	export default {
		components: {

		},
		data() {
			return {
				id: "",
				form: {
					accountCode: '',
					passwd: "",
					accountName: "",
				},
				commiting: false,
			}
		},
		onLoad(props) {
			
		},
		onShow() {
			this.form={
				accountCode: '',
				passwd: "",
				accountName: "",
			};
			this.id = this.$route.query.id;
			if (this.id) this.getinfo(this.id);
		},
		methods: {
			inputcheck(val,name){
				console.log(val,name)
				
			},
			getinfo(id) {
				app.accountget({
					id
				}).then(res => {
					this.form = res.data;
					this.$set(this.form,"passwd","");
				})
			},
			submit() {
				if (!this.form.accountCode || !this.form.passwd || !this.form.accountName) {
					app.tip('请填写完整');
					return;
				}
				let nowcode = this.form.accountCode.replace(/[^0-9a-zA-Z]/g, '');
				if(nowcode!=this.form.accountCode){
					app.tip('用户名请输入4到10个字母或数字');this.form.accountCode=nowcode;
					return;
				}
				if (!(/[0-9a-zA-Z]{4,30}/g.test(this.form.accountCode))) {
					app.tip('用户名请输入4到10个字母或数字');
					return;
				}
				
				let nowpasswd = this.form.passwd.replace(/[^0-9a-zA-Z]/g, '');
				if(nowpasswd!=this.form.passwd){
					app.tip('密码请输入6到14个字母或数字');this.form.passwd=nowpasswd;
					return;
				}
				if (!(/[0-9a-zA-Z]{6,14}/g.test(this.form.passwd))) {
					app.tip('密码请输入6到14个字母或数字');
					return;
				}
				if (this.commiting) return;
				this.commiting = true;
				app.loading("保存中");
				app.accountsave(this.form).then(res => {
					app.loaded();
					this.commiting = false;
					this.form={
						accountCode: '',
						passwd: "",
						accountName: "",
					};
					uni.navigateBack();
				}).catch(res => {
					app.loaded();
					this.commiting = false;
				});
			},

		},

	}
</script>

<style lang="scss">
	.container {
		margin-left: 30rpx;
		font-size: 32rpx;
		margin-right: 30rpx;

		.nametext {
			padding: 20rpx 0 0 20rpx;
			color: rgba(151, 150, 150, 100);
			font-size: 26rpx;
		}

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
			margin-top: 32rpx;
			border-radius: 10rpx;
			box-sizing: border-box;
			padding-left: 26rpx;
			display: flex;
			background-color: rgba(248, 248, 248, 100);
			position: relative;

			.name-tips {
				color: #333333;
				font-size: 32rpx;
				min-width: 120rpx;
				text-align: center;
				height: 100rpx;
				line-height: 100rpx;
			}

			.name-input {
				margin-left: 30rpx;
				color: #333333;
				font-size: 32rpx;
				height: 100rpx;
				flex: 1;
				line-height: 100rpx;
				// border:1rpx solid #007AFF
			}

			.code-button {
				position: absolute;
				color: #FFFFFF;
				background-color: #52A29E !important;
				height: 60rpx;
				line-height: 60rpx;
				font-size: 13px;
				right: 10rpx;
				top: 20rpx;
			}
		}

		.button-box {
			position: fixed;
			bottom: 0;
			left: 0;
			height: 140rpx;
			width: 100%;

			.button {
				height: 90rpx;
				width: 81%;
				background-color: #52A29E !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 34rpx;
			}
		}

	}
</style>
