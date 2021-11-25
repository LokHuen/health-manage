<template>
	<view class="content"><web-view :src="url"></web-view></view>
</template>

<script>
export default {
	data() {
		return {
			// pdf.js的viewer.htm所在路径
			// 注意：静态的html文件需要放在根路径下的 hybrid/html 文件夹中
			viewerUrl: '/static/pdf/web/viewer.html',
			// 要访问的pdf的路径
			fileUrl: '',
			// 最终显示在web-view中的路径
			url: ''
		};
	},
	onLoad(options) {
		this.fileUrl = options.url;
		this.url = `${this.viewerUrl}?file=${encodeURIComponent(this.fileUrl)}`;
	},
	methods: {}
};
</script>

<style>
</style>
