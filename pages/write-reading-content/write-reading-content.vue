<template>
	<view class="container">
		<textarea placeholder="请在此输入内容" v-model="content"></textarea>
		<view class="btn-box">
			<text @click="save">保存</text>
			<text @click="submit">提交</text>
		</view>
	</view>
</template>

<script>
	var app = getApp();
	export default {
		data() {
			return {
				id:0,
				content:'',
				type:0,
			}
		},
		methods: {
			submit(){
				this.type=1;
				this.saveRequest();
			},
			save(){
				this.type=0;
				this.saveRequest();
			},
			saveRequest(){
				if(this.content.length===0){
					app.tip('内容不能为空',1500);
					return;
				}
				app.saveInterpret({id:this.id,interpretContent:this.content,type:this.type}).then(res=>{
					if(res.status===1){
						app.tip('提交成功',1500);
						uni.navigateBack({
							
						});
					}
				});
			}
			
		},
		onLoad(props){
			this.id = props.id;
			this.content = props.content||'';
			
		}
	}
</script>

<style lang="scss">
	.container{
		display: flex;
		flex-direction: column;
		textarea{
			width: 610rpx;
			height: 680rpx;
			border: 1px solid #BFBFBF;
			margin: 30rpx auto;
			border-radius: 10px;
			padding: 30rpx;
			color: #333333;
			font-size: 30rpx;
		}
		.btn-box{
			display: flex;
			justify-content: center;
			text{
				width: 280rpx;
				color: #FFFFFF;
				height: 78rpx;
				line-height: 78rpx;
				font-size: 34rpx;
				background-color: #2793EC;
				text-align: center;
				border-radius: 8rpx;
			}
			text:nth-child(1){
				margin-right: 60rpx;
			}
		}
		
	}

</style>
