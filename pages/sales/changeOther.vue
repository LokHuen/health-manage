<template>
	<view class="container">
		<turnback> </turnback>
		<view class="pagebackground"></view>
		
		<view class="topbox">
			<view class="item-list1 flex other" @click="torecord(1)">
				<view class="left-name">修改密码</view>
				<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
			</view>
			<view class="item-list1 flex other" @click="torecord(3)">
				<view class="left-name">肿瘤营养与干预——绑定微信</view>
				<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
			</view>
			<view class="item-list1 flex other" @click="torecord(4)">
				<view class="left-name">健康国际在线——绑定微信</view>
				<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
			</view>
			
			<view class="item-list1 flex other" @click="torecord(2)">
				<view class="left-name">工作照</view>
				<image src="../../static/icon/more_icon.png" mode="widthFix" class="right-arrow"></image>
			</view>
			<view class="imgtips">可上传上半身工作照，当患者在CNMI.CN网站上查询志愿者信息时，患者能看到此张照片</view>
		</view>
		
	</view>
</template>

<script>
	const app = getApp();
	import wx from '../../plugins/jweixin.js'
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
		onLoad(opt){
			if(opt.bind) app.tip("绑定成功");
			// this.getlist();
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
			torecord(index){
				let url = "/pages/sales/change-password";
				if(index==2) url = "/pages/sales/changeAvater";
				if(index==3) {
					wx.miniProgram.navigateTo({url:"/pages/right?t="+localStorage.getItem("salesToken")+"&c="+app.globalData.channel});
					return;
				}
				if(index==4) {
					wx.miniProgram.navigateTo({url:"/pages/right?t="+localStorage.getItem("salesToken")+"&c=6"});
					return;
				}
				uni.navigateTo({
					url:url
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
	.imgtips{padding:20rpx 56rpx;font-size:28rpx;color:#555;}
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
			&.other{margin-top:20rpx;color:#4789EB;}
			
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
