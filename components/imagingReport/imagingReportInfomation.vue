<template>
	<view>
		<view class="box">
			<view class="title">影像基本信息</view>
			<view class="sub-title">填写基本信息，便于专家评估病情</view>
			<view class="image-type" @click="selectImageType">{{imageType}}</view>
			<view class="line2"></view>
			<input class="agency-input" type="text" @input="agencyInput" placeholder="请填写影像出具机构名称" />
			<view class="line"></view>
			<picker mode="date" :value="date" :start="startDate" :end="endDate" @change="selectDate">
				<view class="date-type">{{date}}</view>
			</picker>
			<view class="line"></view>
			<input class="agency-input" type="text" @input="nameInput" placeholder="请填写体检人名字" />
			<view class="line"></view>
			<textarea class="textarea" placeholder="请描述您的问题或疾病信息" @input="contentInput" auto-height="true" />
			<view class="line"></view>
			<view class="" style="height: 30px;"></view>
			</view>
			
	</view>
</template>

<script>
	export default {
		data() {
			return {
				date:'请选择本次体检日期',
			};
		},
		props:{
			imageType:{
				type:String,
				default:'请选择影像类型'
			}
		},
		methods:{
			selectImageType(){
				this.$emit("selectImageType")
			},
			selectDate(e){
				this.date = e.target.value
				this.$emit("selectDate",this.date)
			},
			agencyInput(e){
				this.$emit("agencyInput",e.detail.value)
			},
			nameInput(e){
				this.$emit("nameInput",e.detail.value)
			},
			contentInput(e){
				this.$emit("contentInput",e.detail.value)
			}
		}
	}
</script>

<style>
	.box{
		margin-top: 10px;
		margin-left: auto;
		margin-right: auto;
		height: auto;
		width: 93%;
		background-color: #FFFFFF;
		color: #333333;
		border-radius: 5px;
		box-shadow: 1px 1px 5px #999999;
	}
	.title{
		font-size: 16px;
		color: #333333;
		margin-left: 15px;
		padding-top: 18px;
		height: 15.5px;
		line-height: 15.5px;
	}
	.sub-title{
		font-size: 13px;
		color: #999999;
		margin-left: 15px;
		margin-top: 10px;
		height: 13.5px;
		line-height: 13.5px;
	}
	.image-type{
		font-size: 16px;
		color: #666666;
		margin-left: 15px;
		padding-top: 33.5px;
		height: 15.5px;
		padding-bottom: 20px;
		line-height: 15.5px;
	}
	.line{
		background-color:#D2D2D2;
		margin-top: 19.5px;
		margin-left: 15px;
		margin-right: 15px;
		height: 1px;
	}
	.line2{
		background-color:#D2D2D2;
		margin-left: 15px;
		margin-right: 15px;
		height: 1px;
	}
	.agency-input{
		margin-top: 15px;
		margin-left: 15px;
		margin-right: 15px;
		font-size: 16px;
		color: #666666;
	}
	.date-type{
		font-size: 16px;
		color: #666666;
		margin-left: 15px;
		margin-top: 19.5px;
		height: 15.5px;
		line-height: 15.5px;
	}
	.textarea{
		margin-top: 15px;
		margin-left: 15px;
		margin-right: 15px;
		font-size: 16px;
		color: #666666;
		height: 90px;
		width: 250px;
		word-break: break-word;
		
	}
    
	
</style>
