<template>
	<view class="contentbox">
		<view class="bigtitle">欢迎登录业务管理系统</view>
		<view class="flex linebox">
			<view class="lefttext flex"><image src="../../static/sales/user.png" mode="widthFix"></image>帐号</view>
			<input class="rightarea" v-model="form.username" maxlength="20" placeholder="请输入" />
		</view>
		<view class="flex linebox">
			<view class="lefttext flex"><image src="../../static/sales/lock.png" mode="widthFix"></image>密码</view>
			<input class="rightarea" password="true" v-model="form.password" maxlength="20" placeholder="请输入" />
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
					username:"",
					password:""
				},
				warn: {
					username: "请输入账号",
					password: "请输入密码",
				},
			}
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
			
				app.loading("登录中");
				app.salesregister(data).then(res => {
					app.loaded();
					app.setCache("salesToken",res.data.salesToken);
					
					app.setCache("isParent",res.data.isParent);//是否有下级
					app.setCache("isOrgManage",res.data.isOrgManage);//是否有部门管理权限
					app.setCache("isCrossPlatform",res.data.isCrossPlatform);//是否有权限跨平台查看统计数据
					
					
					console.log(res.data.isAgent)
					
					uni.reLaunch({
						url: "/pages/sales/index",
					})
					// if(res.data.isAgent==1){
					// 	uni.reLaunch({
					// 		url: "/pages/agent/index",
					// 	})
					// }else{
					// 	uni.reLaunch({
					// 		url: "/pages/sales/index?isSales=1",
					// 	})
					// }
					
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
				width: 130rpx;text-align:center;
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
