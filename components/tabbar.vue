<template>
	<view class="flex tabbar">
		<view class="tabitem" v-for="(item,index) in list" :key="index" v-if="hide!=index" @click="tootherpage(item.path)">
			<image :src="now==index?item.img:item.selected" class="img" mode="aspectFit"></image>
			<view :class="'text '+(now==index?'on':'')">{{item.name}}</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			hide:{
				default:10,
			},
			now:{
				default:0,
			},
		},
		data() {
			return {
				list:[
					{
						name:"首页",
						img:"../static/doctor/1.png",
						selected:"../static/doctor/11.png",
						path:"/",
					},
					{
						name:"科室",
						img:"../static/doctor/2.png",
						selected:"../static/doctor/22.png",
						path:"/",
					},
					{
						name:"服务",
						img:"../static/doctor/3.png",
						selected:"../static/doctor/33.png",
						path:"/",
					},
				]
			};
		},
		methods:{
			tootherpage(url){
				uni.redirectTo({
					url:url
				})
			}
		},
	}
</script>

<style scoped lang="scss">
.tabbar{
	position: fixed;bottom:0;right:0;left:0;z-index:999;background:#fff;border-top:1rpx solid #eee;padding:10rpx 30rpx 6rpx;box-sizing: border-box;justify-content: space-around;
	.tabitem{
		.img{width: 60rpx;height: 60rpx;}
		.text{
			font-size:30rpx;color:#999;text-align: center;
			&.on{color:#333;}
		}
	}
}
</style>
