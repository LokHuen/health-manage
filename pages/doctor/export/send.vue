<template>
	<view class="">
	<view>
		<view class="white-background-pop1">
			<view class="pageinfo">
				<view class="mintext">导出内容</view>
				<view>{{text}}</view>
			</view>
			<view>
				<input type="text" v-model="email" placeholder="请填写您的邮箱地址" class="emailinput">
				<view class="inputinfo">数据将以附件的形式发送到您的邮箱</view>
			</view>
			<view class="sendemail" @click="sendemail">确定</view>
		</view>
	</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				email:"",
				text:"",
				type:1,
			}
		},
		onLoad(opt) {
			this.email = localStorage.getItem("email")||"";
			this.text = opt.text;
			this.type = opt.type;
		},
		methods: {
			sendemail(){
				if(!this.email){app.tip("请输入邮箱");return;}
				localStorage.setItem("email",this.email);
				this.saveemail();
			},
			saveemail(cal){
				app.loading("发送中");
				let type = "replysendReply";
				if(this.type==2) type = "replysendReply1";
				app[type]({email:this.email}).then((res) => {
					app.tip("发送成功");
					setTimeout(()=>{
						uni.redirectTo({
							url:"/pages/doctor/export/finish",
						})
					},1000)
					if(cal) cal(res.data);
				})
			},
		},
		onShow() {
			
		},
	}
</script>

<style lang="scss" scoped>
	
	.white-background-pop1 {
		background-color: #FFFFFF;padding:30rpx 0 30rpx 0;
		border-radius: 10px;
	
		.white-background-pop1-title {
			font-size: 30rpx;
			color: #333;font-weight:bold;
			padding: 35rpx 0;
			position: relative;
			.close{
				position: absolute;
				right: 50rpx;
				width: 30rpx;
				height: 30rpx;
				top: 40rpx;
			}
		}
		.sendemail{
			line-height:1;padding:24rpx 0;
			border-radius: 60rpx;font-size: 32rpx;
			background:$maincolor;
			width: 74%;color:#fff;margin:80rpx auto 20rpx;
			text-align: center;
		}
		.emailinput{width: 80%;background: #F5F5F5;border-radius:8rpx;padding:18rpx 24rpx;text-align: left;margin:40rpx auto 20rpx;}
		.inputinfo{width: 85%;margin:0 auto 40rpx;text-align:left;color:#aaa;font-size:28rpx;}
		.pageinfo{
			width: 85%;margin:0 auto 80rpx;text-align:left;font-size:32rpx;
			.mintext{font-size:30rpx;color:#888;padding-bottom:16rpx;}
		}
	}
</style>
