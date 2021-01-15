<template>
	<view>
		<view v-for="(item,index) in list" :key="index" @click="tootherpage(item.src)" class="itemlist flex">
			<view style="flex:1">{{item.name}}</view>
			<uni-icons type="arrowright" size="15"></uni-icons>
		</view>
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				list:[
					{name:"维新生物业务",src:"https://weixingzh.cvddr.com/pages/sales/index?isSales=1"},
					{name:"拓普健康业务",src:"https://jxgzh.healxin.com/pages/sales/register"},
				]
			}
		},
		onLoad(options){
			
		},
		onShow(){
			
		},
		methods: {
			tootherpage(src){
				console.log(src)
				window.location.href = src;
			}
		}
	}
</script>

<style lang="scss">
	.itemlist{padding:50rpx 40rpx;border-bottom:1rpx solid #ddd;}
</style>
