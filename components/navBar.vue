<template>
	<view>
		<view class="navbar-fixed" :style="{background: params.navColor}">
			<!-- 状态栏小程序撑起高度 -->
			<view :style="{ height: statusBarHeight + 'px' }"></view>
			<view class="cu-bar"  :style="{ height:navBarHeight + 'px',background: params.navColor}">
				<view class="action" @click="returnPage" v-if="params.return==1">
					<text class="iconfont icon-Arrow-1 f-35 fw-700"></text>
					<text style='margin-left: 10upx;'>{{ params.lefTitle}}</text>
					</view>
				<view class="content text-bold">{{ params.title }}</view>
			</view>
		</view>
		<view :style="{ height: statusBarHeight + navBarHeight + 'px' }"></view>
	</view>
</template>

<script> 
export default {
	/*  导航的背景色，左侧图标的文字
		params.navColor  导航的背景颜色
		params.lefTitle  左侧图标的文字
		params.title    导航的标题
	*/ 
	props: {
		params: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {
			statusBarHeight: 20 /* 状态栏高度 */,
			navBarHeight: 45 /* 导航栏高度 */,
			windowWidth: 375 /* 窗口宽度 */,
			/* 设定状态栏默认高度 */
			val: '' /* 导航栏搜索框的值 */
		};
	},
	created() {
		// 获取手机系统信息
		const info = uni.getSystemInfoSync();
		// 设置状态栏高度（H5顶部无状态栏小程序有状态栏需要撑起高度）
		this.statusBarHeight = info.statusBarHeight;
		this.windowWidth = info.windowWidth;
		// 除了h5 app mp-alipay的情况下执行
		// #ifndef H5 || APP-PLUS || MP-ALIPAY
		// 获取胶囊的位置
		const menuButtonInfo = uni.getMenuButtonBoundingClientRect();
		console.log(menuButtonInfo);
		// (胶囊底部高度 - 状态栏的高度) + (胶囊顶部高度 - 状态栏内的高度) = 导航栏的高度
		this.navBarHeight = menuButtonInfo.bottom - info.statusBarHeight + (menuButtonInfo.top - info.statusBarHeight);
		this.windowWidth = menuButtonInfo.left;
		// #endif
	},
	methods: {
		returnPage() {
			uni.navigateBack();
		}
	}
};
</script>

<style scoped lang="scss">
.navbar-fixed {
	position: fixed;
	top: 0;
	left: 0;
	z-index: 99;
	width: 100%;
	background-color: #4fbeb7;
	box-sizing: border-box;
}
.cu-bar {
	background-color: #4fbeb7;
	min-height: 0;
}
</style>