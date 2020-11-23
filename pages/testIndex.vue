<template>
	<view class="testbox">
		<view class="flex">治疗阶段，请选择一个<image src="../static/icon/wenhaoIcon.png" class="question" mode="widthFix"></image></view>
		<view class="mintext">系统会帮您记录好每一个时间节点的营养状况，助您掌控营养变化趋势。</view>
		<view class="flex chooselist" v-for="(item,index) in chooselist" :key="index">
			<view class="title">{{item.name}}</view>
			<view class="flex" style="flex:1;justify-content:flex-end;">
				<view class="itemlist" v-for="(item1,index1) in item.list" :key="index1">{{item1}}</view>
			</view>
		</view>
		<view class="pagebottombt">确定</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				baseUrl:app.globalData.baseUrl,
				imgUrl:app.globalData.imageUrl,
				chooselist:[
					{name:'手术治疗',list:["手术前","手术后"]},
					{name:'放疗治疗',list:["放疗前","放疗中","放疗后"]},
					{name:'化疗治疗',list:["化疗前","化疗中","化疗后"]},
					{name:'靶向治疗',list:["治疗前","治疗中","治疗后"]},
					{name:'免疫治疗',list:["治疗前","治疗中","治疗后"]},
					{name:'康复治疗',list:["康复期"]},
				],
			}
		},
		onLoad(options){
			
		},
		onShow(){
			
		},
		methods: {
			
		}
	}
</script>

<style lang="scss">
	.testbox{padding:0 60rpx;
		.question{width:30rpx;}
		.mintext{font-size:28rpx;color: #666666;padding:20rpx 0 60rpx;}
		.chooselist{
			.title{margin-right:42rpx;}
			.itemlist{line-height:68rpx;min-width:142rpx;box-sizing:border-box;padding:0 10rpx;margin-right:22rpx;color: #666666;border: 1rpx solid #898989;border-radius: 4rpx;}
			.itemlist:last-child{margin-right:0;}
			.itemlist.on{color:#fff;background: #52A29E;border-color:#52A29E;}
		}
		.pagebottombt{position:fixed;bottom:74rpx;left:74rpx;right:74rpx;color:#fff;text-align:center;font-size: 38rpx;line-height:88rpx;background: #52A29E;border-radius: 45rpx;}
	}
</style>
