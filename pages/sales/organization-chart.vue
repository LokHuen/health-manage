<template>
	<view class="container flexc">
		<view class="warn">点击三角图标展开或关闭，点击文字选中</view>
		
		<tki-tree :range="organizeList" rangeKey="name" selectParent @treeItemSelect="treeItemSelect"
			:isCheck="false" />
	</view>
</template>

<script>
	import tkiTree from "@/components/tki-tree/tki-tree.vue"
	const app = getApp();

	export default {
		comments: {
			tkiTree
		},
		data() {
			return {
				orgId: '',
				organizeList: []
			}
		},
		onLoad(props) {
			if (props.orgId) {
				this.orgId = props.orgId
			}
			this.getSalesManOrg()
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
		}
	}
</script>

<style scoped lang="scss">
	.container {
		height: 100vh;
		padding: 0 60rpx;
	}
	.warn{font-size: 28rpx;color:#888;padding:20rpx 0;}
</style>
