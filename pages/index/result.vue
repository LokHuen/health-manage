<template>
	<view class="">
		<block v-if="type==2">
			<view class="successbox">
				<image class="successimg" mode="widthFix" :src="imgurl+'/images/common/success.png'"></image>
				<view class="keytext">预约成功</view>
				<view class="keyinfo">医生将在24小时内拨打您的电话，请留意接听。</view>
				<view class="successbt" @click="phonesuccess">确定</view>
			</view>
		</block>
		<block v-if="type==3">
			<view class="reportsuccess">
				<view class="flex title">
					<image mode="widthFix" :src="imgurl+'/images/common/win.png'"></image>预约成功
				</view>
				<view class="sendto">请将影像报告寄送到以下地址</view>
				<view class="textinfo">
					<view class="flex" style="align-items:unset;"><text space="emsp" class="infohead">地  址：</text><text style="flex:1;">{{photoinfo.rcv_address}}</text></view>
					<view><text class="infohead">收 件 人：</text>{{photoinfo.rcv_name}}</view>
					<view><text class="infohead">联系电话：</text>{{photoinfo.rcv_telephone}} </view>                      
				</view>
				<view class="copy" @click="copytext">复制邮寄信息</view>
				<view class="successbt" @click="reportsuccess">完成</view>
			</view>
		</block>
		<block v-if="type==1">
			<view class="successbox">
				<image class="successimg" mode="widthFix" :src="imgurl+'/images/common/success.png'"></image>
				<view class="keytext">付款成功</view>
				<view class="successbt otherw" @click="toaskdoctor">立即去提问</view>
			</view>
		</block>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				imgurl:app.globalData.imageUrl,
				type:1, //2 电话解读 3影像地址寄回 1在线咨询
				id:1,
				photoinfo:{},
			}
		},
		onLoad(options){ // /pages/index/result?type=1
			this.type = options.type||1;
			this.id = options.id||1;
			if(options.info) this.photoinfo = JSON.parse(options.info);
		},
		onShow(){
			
		},
		methods: {
			phonesuccess(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
			toaskdoctor(){
				app.replymessage();
				uni.navigateTo({
					url:"/pages/chat/index?id="+this.id+"&close=1"
				})
			},
			copytext(){
				uni.setClipboardData({
				    data: `${this.photoinfo.rcv_address} ${this.photoinfo.rcv_name} ${this.photoinfo.rcv_telephone}`,
				    success: function () {
				        app.tip("复制成功");
				    }
				});
			},
			reportsuccess(){
				uni.switchTab({
					url:"/pages/index/index"
				})
			},
		}
	}
</script>

<style scoped lang="scss">
	.reportsuccess{
		padding:10rpx 40rpx 0;
		.title{font-size: 36rpx;color: #333333;
			image{width:36rpx;padding:6rpx 10rpx 0 0;height:auto;}
		}
		.sendto{font-size: 28rpx;color: #E21313;padding:33rpx 0 58rpx;}
		.textinfo{
			font-size: 30rpx;color: #333333;
			text{display:inline-block;}
			.infohead{min-width:160rpx;}
		}
		.copy{font-size: 28rpx;color: #2793EC;padding:35rpx 0 20rpx;}
	}
	.successbox{margin:70rpx 0 0;text-align:center;
		.successimg{width:142rpx;height:auto;}
		.keytext{line-height:86rpx;font-size: 34rpx;color: #343434;}
		.keyinfo{font-size: 28rpx;color: #343434;}
	}
	.successbt{width: 280rpx;line-height: 82rpx;background: #2894EC;border-radius: 8rpx;color:#fff;margin:60rpx auto;text-align:center;}
	.otherw{width: 460rpx;}
	.flex{display: flex;align-items:center;flex-wrap:wrap;}
</style>
