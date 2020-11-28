<template>
	<view class="contentbox">
		<view class="bigtitle">已认证</view>
		<view class="flex">
			<image :src="baseUrl+info.idCardFront" mode="aspectFill" class="imglist" @click="preview(baseUrl+info.idCardFront)"></image>
			<image :src="baseUrl+info.bankCardFront" mode="aspectFill" class="imglist" @click="preview(baseUrl+info.bankCardFront)"></image>
		</view>
		<view class="changecss" @click="toindex">修改身份信息</view>
		<view>备注：身份信息修改成功前，你的收益会继续入账修改前的账户。</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				imgUrl:app.globalData.imageUrl,
				info:{},
			}
		},
		onLoad(options){
			this.getinfo();
		},
		onShow(){
			
		},
		methods: {
			getinfo(){
				app.loading("连接中");
				app.authentication({id:app.getCache('uid')}).then(res => {
					if (res.data.idCardFront) res.data.idCardFront = res.data.idCardFront.split(",")[0]; // 身份证正面图片url
					if (res.data.bankCardFront) res.data.bankCardFront = res.data.bankCardFront.split(",")[0];
					this.info = res.data;
				    app.loaded();
				})
			},
			preview(url){
				uni.previewImage({
					current:url,
					urls:[this.baseUrl+this.info.idCardFront,this.baseUrl+this.info.bankCardFront]
				})
			},
			toindex(){
				uni.reLaunch({
					url:"/pages/authentication/index"
				})
			},
		}
	}
</script>

<style lang="scss">
	.contentbox{padding:0 30rpx;
		.bigtitle{font-size: 44rpx;line-height:142rpx;}
		.imglist{width:50%;height:207rpx;border-radius:10rpx;box-sizing: border-box;
			&:nth-child(1){margin-right:2%;width:48%;}
		}
		.changecss{color:#FF460A;padding:60rpx 0;}
	}
</style>
