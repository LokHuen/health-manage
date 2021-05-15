<template>
	<!--  -->
	<view class="container">
		<view style="padding-top:40rpx;">帐号设置</view>
		<view class="name-box">
			<view class="name-tips">账号：</view>
			<input class="name-input" :disabled="id?true:false" type="text" placeholder="用户名请输入4到10个字母或数字" v-model="form.accountCode" @input='inputcheck($event,"accountCode")'/>
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

		<uni-popup type="bottom" ref="tipPopup" :maskClick="false">
			<view class="popup-content">
				<view class="frametitle">
					创建帐号前，请您仔细阅读以下内容
				</view>
				<view>
					<view>您创建的帐号可以用于登录电脑端患者管理系统，使用该帐号登录系统的人可以进行但不限于以下操作：</view>
					<view>1、查看您名下所有的患者及患者详细资料；</view>
					<view>2、将您名下的患者转移给同科室的其他医生。</view>
					<view>如您同意授权使用该帐号登录系统的用户行使上述权利，请点击同意按钮继续创建帐号。</view>
				</view>
				<view class="flex ct" style="padding-top:40rpx;">
					<view class="pagebottombt" @click="agreeaction(1)">同意授权</view>
					<view class="pagebottombt btdisagree"  @click="agreeaction()">不同意</view>
				</view>
			</view>
		</uni-popup>

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
		mounted(){
			if(!this.id) this.$refs.tipPopup.open();
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
					uni.reLaunch({
						url:"/pages/branch/list"
					})
				}).catch(res => {
					app.loaded();
					this.commiting = false;
				});
			},
			agreeaction(type){
				if(type){
					this.$refs.tipPopup.close();
				}else{
					uni.navigateBack({});
				}
			},
		},

	}
</script>

<style lang="scss">
	.popup-content{
		background-color: #FFFFFF;
		border-radius: 10px 10px 0px 0px;
		font-size: 32rpx;padding:50rpx;box-sizing: border-box;
		.frametitle{padding-bottom:50rpx;font-weight:bold;text-align:center;font-size:36rpx;}
		.pagebottombt{width:40%;color:#fff;text-align:center;font-size: 34rpx;line-height:80rpx;background: #52A29E;border-radius: 45rpx;}
		.btdisagree{background:#aaa;margin-left:10%;}
	}
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
