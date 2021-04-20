<template>
	<view class="container flexc">
		<view class="back" v-if="isMiniProgram" style="position: sticky;top: 0;z-index: 999;">
			<image src="/static/icon/turnback_icon.png" mode="widthFix" class="img" @click="back"></image>
		</view>
		<view class="warn">点击三角图标展开或关闭，点击文字选中</view>
		
		<tki-tree :range="organizeList" rangeKey="name" selectParent @treeItemSelect="treeItemSelect"
			:isCheck="false" />
	</view>
</template>

<script>
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	import wx from '../../plugins/jweixin.js'
	import turnback from "../../components/turnback.vue"
	
	const app = getApp();
	export default {
		comments: {
			tkiTree,
			turnback
		},
		
		data() {
			return {
				orgId: '',
				organizeList: [],
				isMiniProgram:false
				
				
			}
		},
		onLoad(props) {
			if (props.orgId) {
				this.orgId = props.orgId
			}
			this.getSalesManOrg()
			this.getMiniProgramStatic();
		},
		methods: {
			treeItemSelect(item) {
				uni.navigateTo({
					url:'team-member-list?orgId='+item.id+'&orgName='+item.name
				})
			},
			getSalesManOrg() {
				app.getSalesManOrg({
					orgId: this.orgId
				}).then((res) => {
					this.organizeList = res.data
					this.$forceUpdate()
				})
			},
			getMiniProgramStatic(){
			 wx.miniProgram.getEnv((res)=>{
			    this.isMiniProgram = res.miniprogram?true:false;
			 })
			},
			back(){
			  uni.navigateBack({
			   
			  })
			}
			
		}
	}
</script>

<style scoped lang="scss">
	.container {
		height: 100vh;
		padding: 0 60rpx;
		.back{
			height: 90rxp;
			.img{
				width: 25rpx;
				margin-left: -20rpx;
			}
		}
	}
	.warn{font-size: 28rpx;color:#888;padding:20rpx 0;}
</style>
