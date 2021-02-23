<template>
	<view class="contentbox">
		<view class="bigtitle">修改密码</view>
		<view class="flex linebox">
			<view class="lefttext flex">原密码</view>
			<input class="rightarea" password="true" v-model="form.oldPass" maxlength="20" placeholder="请输入" />
		</view>
		<view class="flex linebox">
			<view class="lefttext flex">新密码</view>
			<input class="rightarea" password="true" v-model="form.newPass" maxlength="20" placeholder="请输入" />
		</view>
	    <view class="flex linebox">
	    	<view class="lefttext flex">确认新密码</view>
	    	<input class="rightarea" password="true" v-model="form.comfirmPass" maxlength="20" placeholder="请输入" />
	    </view>
		<view class="pagebottombt">
			<view @click="saveinfo">提 交</view>
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
					oldPass:"",
					newPass:"",
					comfirmPass:"",
				},
				warn: {
					oldPass: "请输入原始密码",
					newPass: "请输入新的密码",
					comfirmPass: "请再次输入新密码",
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
			
				app.loading("提交中");
				app.sales_changepassword(data).then(res => {
					app.loaded();
					localStorage.removeItem("token");
					app.tip("密码修改成功，请重新登录");
					setTimeout(()=>{
						uni.reLaunch({
							url:"/pages/agent/register"
						})
					},1000)
				}).catch((res)=>{
					app.tip(res);
				})
			},
		}
	}
</script>

<style lang="scss">
	.contentbox {
		padding: 0 60rpx;
		.bigtitle{
			font-size: 44rpx;padding:56rpx 0 80rpx;
			font-weight: 600;
			color: #333333;
		}
		.linebox {
			border-bottom: 1px solid #eee;
			min-height: 110rpx;
			font-size: 34rpx;
			padding: 0 0 0 6rpx;
	
			.lefttext {
				width: 180rpx;text-align:center;
				padding: 0 32rpx 0 20rpx;
				image{
					width:32rpx;margin-right:15rpx;
				}
			}
	
			.rightarea {
				flex: 1;
				font-size: 32rpx;
				color: #888;
			}
		}
	
		.pagebottombt {
			padding: 150rpx 0;
	
			view {
				background: #4B8BE8;
				color: #fff;
				text-align: center;
				font-size: 34rpx;
				line-height: 88rpx;
				border-radius: 45rpx;
				margin: 0 0rpx 0 0rpx;
			}
		}
	}
</style>
