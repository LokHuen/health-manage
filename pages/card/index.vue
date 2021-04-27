<template>
	<view class="container">
		<turnback> </turnback>
		<view class="pagebackground"></view>
		<view class="headtips">请选择需要制作的卡片</view>
		<view class="topbox">
			<block v-for="(item,index) in cardlist" :key="index">
				<view class="item-list1 flex" @click="clickItem(item)">
					<view class="left-name">{{item.cardName}}</view>
					<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
				</view>
				<view class="centerline" v-show="(index+1)!=cardlist.length"></view>
			</block>
			
			<view class="item-list1 flex other" @click="torecord">
				<view class="left-name">制作记录</view>
				<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
			</view>
		</view>
		<uni-popup ref="pop1" type="bottom">
			<view class="white-background-pop1">
				<view class="white-background-pop1-title">
					请选择规格
					<image src="../../static/icon_close.png" mode="aspectFill" @click="closeMore" class="close"></image>
				</view>
				<view class="choosebtbox flex">
				<view v-for="(item,index) in typelist" :key="index" class="transferButton" @click="transfer(item)">{{item.templateName}}</view>
				</view>
			</view>
		</uni-popup>
		
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
				cardlist:[],
				typelist:[],
			}
		},
		onLoad(){
			this.getlist();
		},
		onShow(){
			
		},
		methods: {
			getlist(){
				app.cardlist().then(res=>{
					this.cardlist = res.data||[];
				});
				
			},
			clickItem(item) {
				app.cardinfo = {
					cardId:item.id,
					cardType:item.cardType,
				};
				app.loading("加载中");
				app.cardtemplateList({cardId:item.id}).then(res=>{
					app.loaded();
					this.typelist = res.data||[];
					this.$refs.pop1.open();
				});
				
			},
			torecord(){
				uni.navigateTo({
					url:"/pages/card/record"
				})
			},
			closeMore(){
				this.$refs.pop1.close();
			},
			transfer(item){
				let data = {
					...app.cardinfo,
					"templateId": item.id,//"模版id",
					"templateCode": item.templateCode,//"模版编码",
					"templateCardFront": item.templateCardFront,//"模版图正面url",
					"templateCardBack": item.templateCardBack,//"模版图背面url",
					"realCardFront": item.realCardFront,//"背景图正面url",
					"realCardBack": item.realCardBack,//"背景图背面url"
				};
				app.cardinfo = data;
				uni.navigateTo({
					url:"/pages/card/model"
				})
				
				// console.log("cardinfo",app.cardinfo)
				this.closeMore();
			},
		},

	}
</script>

<style lang="scss" scoped>
	.white-background-pop1 {
		text-align: center;
		background-color: #FFFFFF;padding:0 0 30rpx 0;
		border-radius: 10px 10px 0px 0px;min-height: 350rpx;max-height: 80vh;overflow-y: auto;
	
		.white-background-pop1-title {
			font-size: 30rpx;
			color: #333;
			padding-top: 35rpx;
			position: relative;
			.close{
				position: absolute;
				right: 50rpx;
				width: 30rpx;
				height: 30rpx;
				top: 40rpx;
			}
		}
	    .transferButton{
			padding:24rpx 40rpx;border: 1px solid #666;
			line-height: 1;box-sizing:border-box;
			border-radius: 6rpx;width:100%;
			font-size: 30rpx;
			color: #666666;
			margin: 30rpx 0rpx 0;
		}
		
	}
	.headtips{line-height: 110rpx;padding-left:56rpx;}
	.topbox{
		.centerline{margin:0 56rpx;border-top: 1px solid #E5E5E5;}
	}
	.bottomtip{padding-top:20rpx;font-size:24rpx;color:#52A29E;position: fixed;z-index: 9;left:0;right:0;bottom:250rpx;}
	.tips {
		width: 30rpx;
		height: 30rpx;
	}
	.minfont{color: rgba(106, 105, 105, 100);font-size:24rpx;margin-left:30rpx;}
	.container{

		.item-list1{
			// background-color: #FFFFFF;
			height: 106rpx;padding:24rpx 30rpx;background:#fff;
			position: relative;box-sizing:border-box;
			.left-name{
				font-size: 32rpx;flex:1;
				color: #333333;
				padding-left: 26rpx;
			}
			.right-arrow{
				width: 15rpx;margin-right:20rpx;
				height: 26rpx;
				
			}
			.line{
				height: 6rpx;
				background-color: #F5F6F6;
			}
			&.other{margin-top:40rpx;color:#4789EB;}
			
		}

	}
	.tips-bg {
		background-color: #FFFFFF;
		border-radius: 5px;
		width: 600rpx;
	
		.tips-title {
			text-align: center;
			font-size: 17px;
			color: #52A29E;
		}
	
		.tips-sub {
			margin-top: 40rpx;
			text-align: left;
			font-size: 16px;
			color: #333333;
			margin-left: 70rpx;
			margin-right: 70rpx;
		}
	
		.tips-close {
			margin-top: 100rpx;
			text-align: center;
			font-size: 17px;
			color: #FFFFFF;
			background-color: #52A29E;
			height: 90rpx;
			line-height: 90rpx;
			margin-left: 70rpx;
			margin-right: 70rpx;
			border-radius: 45rpx;
		}
	}
	.choosebtbox{
		margin:0 60rpx;min-height: 200rpx;
	}
</style>
