<template>
	<!-- 解读内容页面 -->
	<view class="textarea-box">
		<textarea class="textarea" placeholder="请在此输入内容"/>
		<view class="button-box">
		     <button class="button" type="default">保存</button>
			 <button class="button" type="default">提交</button>
		</view>
	</view>
	
	
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>

<style>
	.textarea-box{
		height: auto;
		align-items: center;
	}
	.textarea{
		height: 340px;
		border-radius: 5px;
		font-size: 15px;
		color: #333333;
		word-break: break-word;
		margin-left: auto;
		margin-right: auto;
		width: 85%;
		border:1px solid #BFBFBF;
		margin-top: 10px;
		line-height: 18px;
		padding: 10px;
	}
	.button-box{
		margin-top: 30px;
		height: 40px;
		display: flex;
	}
	.button{
		background-color: #2793EC !important;
		color: #FFFFFF !important;
        border-radius: 4px;
		width: 38%;
	}
	

</style>
