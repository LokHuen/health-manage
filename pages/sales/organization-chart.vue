<template>
	<view class="container flexc">
		<tki-tree :range="list" rangeKey="name" selectParent @treeItemSelect="treeItemSelect" :isCheck="false"/>
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
				list: [{
					id: 1,
					name: '题库',
					children: [{
						id: 11,
						name: '语文',
						children: [{
							id: 111,
							name: '高一卷',
						}, {
							id: 112,
							name: '高二卷',
						}]
					}, {
						id: 12,
						name: '数学',
					}]
				}, {
					id: 2,
					name: '高考',
					children: [{
						id: 21,
						name: '高考1',
					}, {
						id: 22,
						name: '高考2',
					}, {
						id: 23,
						name: '高考3',
					}, ]
				}, {
					id: 3,
					name: '课程'
				}, {
					id: 4,
					name: '论文',
					children: [{
						id: 41,
						name: '论文分享',
					}]
				}]
			}
		},
		methods: {
			treeItemSelect(item) {
				console.log(item)
			},
		}
	}
</script>

<style scoped lang="scss">
	.container{
		padding: 0 60rpx;
	}
</style>
