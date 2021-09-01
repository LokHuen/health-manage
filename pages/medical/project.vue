<template>
	<view class="">
		<swiper v-if="imglist[0]" class="swiper" indicator-dots autoplay interval="3600" current="0" >
			<swiper-item v-for="(item,index) in imglist" :key="index">
				<view @click="tooterurl(item.url)">
					<image :src="baseUrl+item.filePath" mode="aspectFill"  ></image>
				</view>
			</swiper-item>
			<!-- <swiper-item >
				<view>
					<image src="../../static/warnshow.jpg" mode="aspectFill"  @click="towarnpage"></image>
				</view>
			</swiper-item> -->
		</swiper>
		<view class="lineblock"></view>
		<view class="flex projectbox">
			<view class="projectitem">
				<wx-open-launch-weapp username="gh_e44479db8d50" path="pages/index/goods.html" style="" class="otherbox">
					<script type="text/wxtag-template">
						<style>
							.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
						</style>
						<div class="otherbox"></div>
					</script>
				</wx-open-launch-weapp>
				<image class="itemicon" src="../../static/medical/7.png" mode="aspectFill"></image>
				<view>营养补充</view>
			</view>
			<view class="projectitem">
				<wx-open-launch-weapp username="gh_e44479db8d50" path="pages/index/check.html" style="" class="otherbox">
					<script type="text/wxtag-template">
						<style>
							.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
						</style>
						<div class="otherbox"></div>
					</script>
				</wx-open-launch-weapp>
				<image class="itemicon" src="../../static/medical/1.png" mode="aspectFill"></image>
				<view>基因检测</view>
			</view>
			<view class="projectitem" @click="tootherpage(2)">
				<image class="itemicon" src="../../static/medical/3.png" mode="aspectFill"></image>
				<view>临床招募</view>
			</view>
			<view class="projectitem" @click="tootherpage(1)">
				<image class="itemicon" src="../../static/medical/2.png" mode="aspectFill"></image>
				<view>海外药物</view>
			</view>
			
			<!-- <view class="projectitem">
				<image class="itemicon" src="../../static/medical/4.png" mode="aspectFill"></image>
				<view>科研支持</view>
			</view>
			<view class="projectitem">
				<image class="itemicon" src="../../static/medical/5.png" mode="aspectFill"></image>
				<view>海外研学</view>
			</view>
			<view class="projectitem">
				<image class="itemicon" src="../../static/medical/6.png" mode="aspectFill"></image>
				<view>医疗保险</view>
			</view> -->
		</view>
		<view class="lineblock"></view>
		<view v-show="list[0]" class="tips">患者可能适用的产品</view>
		<view class="boxlist" v-for="(item,index) in list" :key="index" @click="topersondetail(item)">
			<view class="flex">
				<image class="userimg" :src="item.portrait" mode="aspectFill"></image>
				<view style="flex:1;">
					<view class="flex">
						<text>{{item.patientName}}</text><text class="minfont">{{item.illness}}</text>
					</view>
					<view class="timefont">{{item.bindTime}} 加入我的患者名单</view>
				</view>
			</view>
			<view class="goodsbox">
				<view class="goodsname">{{item.productDetail}}</view>
				<view class="minname">等{{item.productNum}}款产品</view>
			</view>
		</view>
		<view v-show="!list[0]" class="nogoods">暂无推荐的患者产品</view>
	</view>
</template>

<script>
	import setconfig from "../../common/wxconfig.js"
	const app = getApp();
	export default {
		data() {
			return {
				options:{},
				baseUrl:app.globalData.baseUrl,
				page:1,
				pageCount:1,
				list:[],
				imglist:[],
			}
		},
		onLoad(options){
			this.options = options||{};
			this.init();
			setconfig().then(res => {
				var u = navigator.userAgent;
				if(/(iPhone|mac|iPod|iPad|iOS)/i.test(u)){
					if (!sessionStorage.getItem("reloadpage")) {
							sessionStorage.setItem("reloadpage", 1);
							location.reload();
					}
				}
			});
			this.getimglist();
		},
		onShow(){
			
		},
		methods: {
			init(){
				if(this.page>this.pageCount) return;
				app.recommendPatientPage({uid:app.getCache('uid'),pageNo:this.page}).then(res => {
					this.pageCount = res.data.pageCount;
					if(this.page==1) this.list = res.data.list;
					else this.list = this.list.concat(res.data.list);
					if(res.data.list.length>0) this.page++; 
				});
			},
			getimglist(){
				app.gallerylist({goalType:2}).then(res => {
					this.imglist = res.data;
				});
			},
			towarnpage(){
				uni.navigateTo({
					url:"/pages/doctor/warn"
				})
			},
			topersondetail(item){
				uni.navigateTo({
					url:"/pages/medical/detail?id="+item.patientId
				})
			},
			tootherpage(index){
				switch(index){
					case 1:
					location.href = "http://gzh.healthme.cn/drug/firstCancer?pid=0&id=45&name=%E6%B5%B7%E5%A4%96%E8%8D%AF";
					break;
					case 2:
					location.href = "http://zhm.healthme.cn/";
					break;
				}
			},
			tooterurl(url){
				if(url) location.href = url;
			},
		},
		onReachBottom(){
			this.init();
		},
	}
</script>

<style scoped lang="scss">
	.nogoods{color:#888;padding-top:200rpx;text-align:center;}
	.boxlist{
		margin:0 30rpx 30rpx;background:#fff;border-radius:12rpx;padding:30rpx;box-sizing:border-box;
		.userimg{width:80rpx;height:80rpx;margin-right:20rpx;border-radius:50%;}
		.minfont{font-size:28rpx;color:#888;padding-left:20rpx;}
		.timefont{font-size:28rpx;color:#888;padding-top:6rpx;}
		.goodsbox{padding:20rpx;border-radius:10rpx;background:#f5f5f5;margin-top:26rpx;}
		.goodsname{overflow: hidden;text-overflow: ellipsis;white-space: nowrap;font-size:30rpx;}
		.minname{font-size:28rpx;color:#888;padding-top:6rpx;}
	}
	.tips{line-height:80rpx;padding-left:30rpx;}
	.projectbox{
		padding:30rpx 56rpx 0;box-sizing:border-box;background:#fff;
		.projectitem{
			width:50%;padding-bottom:30rpx;text-align:center;font-size:32rpx;position:relative;
			.itemicon{width:80rpx;height:80rpx;padding:20rpx 20rpx 16rpx;}
		}
	}
	
	.headbg{width:100%;height:260rpx;display:block;}
	.lineblock{height: 20rpx; background-color: #F5F5F5;}
	page{
		background:#F5F5F5;
	}
	.otherbox{position: absolute;top:0;left:0;right:0;bottom:0;z-index: 9;}
	swiper {
		height: 270rpx;
	
		swiper-item {
			width: 100%;
			height: 100%;
	
			image {
				width: 100%;
				height: 270rpx;
			}
		}
	}
</style>
