<template>
	<view class="container" v-html="richText"></view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
				id: '',
				richText: ''
			}
		},
		onLoad(props) {
			this.id = props.id
			// this.id = 23
			this.getFwhMessage()
		},
		methods: {
			getFwhMessage() {
				app.getFwhMessage({
					id: this.id
				}).then((res) => {
					this.richText = res.data.richText
				})
			}
		}

	}
</script>

<style scoped lang="scss">
	.container {
		height: 100vh;
		width: 100vw;
	}
</style>
