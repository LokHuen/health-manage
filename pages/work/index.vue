<template>
	<view class="">
		<view class="worklist">
			<view class="title">健康体检报告解读（图文咨询）</view>
			<view class="flex numbox">
				<view class="numlist" @click="imageItemClick('../graphic-interpretation/graphic-interpretation?status=1')">
					<view>{{dataInfo.textForCount}}</view>
					<view>待解读</view>
				</view>
				<view class="numlist" >
					<view></view>
					<view></view>
				</view>
				<view class="numlist" @click="imageItemClick('../graphic-interpretation/graphic-interpretation?status=2')">
					<view>{{dataInfo.textOverCount}}</view>
					<view>解读完成</view>
				</view>
			</view>
		</view>
		<view class="worklist" v-show="false">
			<view class="title">健康体检报告解读（电话解读）</view>
			<view class="flex numbox">
				<view class="numlist" @click="imageItemClick('../work/phone?status=0')">
					<view>{{dataInfo.telephoneForCount}}</view>
					<view>待解读</view>
				</view>
				<view class="numlist" @click="imageItemClick('../work/phone?status=1')">
					<view>{{dataInfo.telephoneInCount}}</view>
					<view>解读中</view>
				</view>
				<view class="numlist" @click="imageItemClick('../work/phone?status=2')">
					<view>{{dataInfo.telephoneOverCount}}</view>
					<view>解读完成</view>
				</view>
			</view>
		</view>
		<view class="worklist">
			<view class="title">影像学报告解读</view>
			<view class="flex numbox">
				<view class="numlist" @click="imageItemClick('../work-image-read/work-image-read?status=0')">
					<view>{{dataInfo.mriForCount}}</view>
					<view>待解读</view>
				</view>
				<view class="numlist" @click="imageItemClick('../work-image-read/work-image-read?status=1')">
					<view>{{dataInfo.mriInCount}}</view>
					<view>解读中</view>
				</view>
				<view class="numlist" @click="imageItemClick('../work-image-read/work-image-read?status=2')">
					<view>{{dataInfo.mriOverCount}}</view>
					<view>解读完成</view>
				</view>
				<view class="numlist" @click="imageItemClick('../word-image-wait-back/word-image-wait-back')">
					<view>{{dataInfo.mriPostCount}}</view>
					<view>待回寄</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import http from "../../common/http.js";
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				dataInfo:{},
			}
		},
		onLoad(){
			
		},
		onShow(){
			this.getData();
		},
		methods: {
			imageItemClick(url){
				uni.navigateTo({
					url
				});
			},
			getData(){
			   app.interpretationConsole({}).then(res=>{
				   this.dataInfo = res.data;
				   console.log(this.dataInfo);
			   });
			}
		}
	}
</script>

<style scoped lang="scss">
	.worklist{margin:40rpx 40rpx 30rpx;box-shadow: 0px 0px 9rpx 2rpx rgba(0, 0, 0, 0.18);border-radius: 10rpx;padding:30rpx;box-sizing:border-box;
		.title{font-size: 32rpx;color: #343434;}
		.numbox{padding:0 20rpx;
			.numlist{width:33%;padding-top:50rpx;text-align:center;color: #343434;
				view:nth-child(1){font-size: 40rpx;padding-bottom:20rpx;}
				view:nth-child(2){font-size: 32rpx;}
			}
		}
	}
	.flex{display: flex;align-items:center;flex-wrap:wrap;}
</style>
