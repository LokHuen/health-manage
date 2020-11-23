<template>
	<view class="testbox">
		<view class="flex">治疗阶段，请选择一个<image src="../static/icon/wenhaoIcon.png" class="question" mode="widthFix" @click="$refs.popup.open()"></image></view>
		<view class="mintext">系统会帮您记录好每一个时间节点的营养状况，助您掌控营养变化趋势。</view>
		<view class="flex chooselist" v-for="(item,index) in chooselist" :key="index">
			<view class="title">{{item.name}}</view>
			<view class="flex" style="flex:1;justify-content:flex-end;">
				<view v-for="(item1,index1) in item.list" :key="index1" :class="'itemlist '+(chooseitem[index].choose==item1?'on':'')" @click="chooseindex(index,index1)">{{item1}}</view>
			</view>
		</view>
		<view class="pagebottombt">确定</view>
		
		<uni-popup ref="popup" type="bottom">
			<view class="testbox" style="padding-top:30rpx;background:#fff;border-radius:20rpx 20rpx 0 0;">
			<view class="flex">治疗阶段选择指引</view>
			<view class="mintext">系统会帮您记录好每一个时间节点的营养状况，助您掌控营养变化趋势。</view>
			<view class="flex frameinfo" v-for="(item,index) in frameinfo" :key="index">
				<view class="infoleft">{{item.name}}：</view>
				<view class="inforight">{{item.text}}</view>
			</view>
			<view style="padding:60rpx 0rpx 50rpx;"><view class="pagebottombt1" @click="$refs.popup.close()">确定</view></view>
			</view>
		</uni-popup>
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
				chooseitem:[
					{choose:""},
					{choose:""},
					{choose:""},
					{choose:""},
					{choose:""},
					{choose:""},
				],
				frameinfo:[
					{name:'前',text:"代表您将要进行的下一个治疗阶段，例:您准备进行化疗，选择化疗前。"},
					{name:'中',text:"代表您现在正在进行的治疗阶段，例:您正在进行靶向治疗，选择靶向中。"},
					{name:'后',text:"代表您已结束当前治疗阶段，后续没有安排治疗方案，例:您已完成化疗，没有安排后续的治疗方案，选择化疗后。"},
					{name:'未确诊',text:"疑似，尚未确诊。"},
					{name:'已确诊',text:"刚刚确诊，尚未制定任何治疗方案。"},
					{name:'康复期',text:"您已出院，在家进行家庭康复。"},
				],
			}
		},
		onLoad(options){
			this.$nextTick(()=>{
				this.$refs.popup.open();
			})
		},
		onShow(){
			
		},
		methods: {
			chooseindex(index,index1){
				this.chooseitem[index].choose = this.chooselist[index].list[index1];
			},
		}
	}
</script>

<style lang="scss">
	.testbox{padding:0 60rpx;
		.question{width:30rpx;}
		.mintext{font-size:28rpx;color: #666666;padding:20rpx 0 60rpx;}
		.chooselist{
			padding-bottom:40rpx;
			.title{margin-right:42rpx;font-size: 30rpx;}
			.itemlist{line-height:68rpx;min-width:142rpx;box-sizing:border-box;padding:0 10rpx;margin:4rpx 20rpx 0rpx 0;color: #666666;border: 1rpx solid #ddd;border-radius: 6rpx;font-size: 30rpx;text-align:center;}
			.itemlist:last-child{margin-right:0;}
			.itemlist.on{color:#fff;background: #52A29E;border-color:#52A29E;}
		}
		.frameinfo{align-items:unset;font-size: 28rpx;padding-bottom:28rpx;
			.infoleft{color: #52A29E;}
			.inforight{color: #666666;flex:1;}
		}
		.pagebottombt{position:fixed;bottom:60rpx;left:62rpx;right:62rpx;color:#fff;text-align:center;font-size: 38rpx;line-height:88rpx;background: #52A29E;border-radius: 45rpx;}
		.pagebottombt1{color:#fff;text-align:center;font-size: 38rpx;line-height:88rpx;background: #52A29E;border-radius: 45rpx;}
	}
</style>
