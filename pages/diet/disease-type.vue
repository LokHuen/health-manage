<template>
	<view class="container">
		<text class="i-item" v-for="(item,index) in typeData" @click="clickHandler(item)">{{item.diseaseName}}</text>
	</view>
</template>

<script>
	import http from '../../common/http.js'
	export default {
		data() {
			return {
				typeData:[]
			};
		},
		onLoad() {
			http.get(http.urls.get_disease_list).then((res)=>{
				this.typeData = res.data
			})
		},
		methods:{
			clickHandler(item){
				uni.navigateTo({
					url:'disease-type-detail?id='+item.id+'&diseaseName='+item.diseaseName
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
.container{
	display: flex;
	flex-direction: column;
	padding: 0 50rpx;
	padding-top: 10rpx;

	.i-item{
		height: 72rpx;
		line-height: 72rpx;
		padding-left: 40rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10rpx 0rpx rgba(0, 0, 0, 0.08);
		border-radius: 4rpx;
		margin-top: 20rpx;
	}
}
</style>
