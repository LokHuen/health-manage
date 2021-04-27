<template>
	<view class="">
		<turnback></turnback>
		<view class="headtips">模板图案</view>
		<view>
			<swiper class="swiperbox" next-margin="10px" previous-margin="20px">
				<swiper-item v-if="info.templateCardFront">
					<image :src="baseUrl+info.templateCardFront" class="swiperimg" mode="widthFix"></image>
				</swiper-item>
				<swiper-item v-if="info.templateCardBack">
					<image :src="baseUrl+info.templateCardBack" class="swiperimg" mode="widthFix"></image>
				</swiper-item>
			</swiper>
		</view>
		<view class="footerbt flex">
			<view class="btitem" @click="back">返回</view>
			<view class="btitem other" @click="userthis">使用此模板</view>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	import turnback from "../../components/turnback.vue"
	export default {
		components: {
			turnback
		},
		data() {
			return {
				baseUrl: app.globalData.baseUrl,
				imgUrl: app.globalData.imageUrl,
				info:app.cardinfo,
			}
		},
		onLoad(options) {

		},
		onShow() {

		},
		methods: {
			back(){
				uni.navigateBack({});
			},
			userthis(){
				if(app.cardinfo.cardType==1){
					uni.navigateTo({
						url:"/pages/card/doctorList"
					})
				}else if(app.cardinfo.cardType==2){
					uni.navigateTo({
						url:"/pages/card/nurse"
					})
				}else if(app.cardinfo.cardType==3){
					app.loading("保存中");
					app.cardapplysave({
						templateId:app.cardinfo.templateId,
						templateCode:app.cardinfo.templateCode,//模版编码
						cardType:3,//卡片用户类型 1 医生 2护士 3 业务员
					}).then(res => {
						app.loaded();
						uni.navigateTo({
							url: '/pages/card/create?mid='+res.data.makeId
						});
					}).catch(res=>{
						app.tip(res.msg);
					})
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	.swiperbox{height:77vh;}
	.swiperimg{width:calc(100% - 13px);}
	.footerbt {
		padding: 50rpx 30rpx 30rpx;
		box-sizing: border-box;
		justify-content: space-around;

		.btitem {
			line-height: 80rpx;font-size:30rpx;
			border-radius: 60rpx;
			background:#B5B5B5;
			width: 34%;color:#fff;
			text-align: center;

			&.other {width: 50%;background:#4789EB;}
		}
	}

	.headtips {
		padding: 30rpx 0 30rpx 42rpx;
		line-height: 1;
	}
</style>
