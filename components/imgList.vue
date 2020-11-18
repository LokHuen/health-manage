<template>
	<view>
		<view class="ccimgname">{{name}}</view>
		<view class="ccimglist">
			<image class="imagelist" v-for="(item,index) in list" :key="index" :src="item" mode="aspectFill" @click="previewImage(index)" ></image>
			<view v-if="!list[0]" class="nodata">无</view>
		</view>
	</view>
</template>

<script>
	export default {
		props:{
			name:{
				type:String,
				default:"影像图",
			},
			list:{
				type:Array,
				default:["/static/images/common/r1.png","/static/images/common/r2.png","/static/images/common/r1.png","/static/images/common/r2.png","/static/images/common/r1.png","/static/images/common/r2.png",],
			},
		},
		data() {
			return {
				
			};
		},
		methods:{
			previewImage(index){
				uni.previewImage({
					current:index,
				    urls: this.list,
				})
			},
		},
	}
</script>

<style scoped>
.ccimgname{padding:0 0 12rpx 0rpx;font-size:33rpx;color:#343434;}
.ccimglist{display:flex;flex-wrap:wrap;}
.ccimglist .nodata{
	font-size: 30rpx;
	color: #666666;
}
.ccimglist .imagelist{width:23%;height:20vw;margin:8rpx 1%;}
</style>
