<template>
	<!-- 发送医嘱界面 -->
	<view class="container">
		<view class="condition-box">
			<view :class="selectIndex==0?'chose':'unchose'" @click="select(0)">选模版发送</view>
			<view style="width: 30rpx;"></view>
			<view :class="selectIndex==1?'chose':'unchose'" @click="select(1)">写医嘱</view>
		</view>
		<textarea v-model="advice" placeholder="请填写医嘱内容" class="textarea" :placeholder-class="placeholder" v-if="selectIndex==1"/>
		<view class="button" @click="writeAdvice" v-if="selectIndex==1">确定发送</view>
		<view class="tip" v-if="selectIndex==1">
			点击“确定发送”后，不可撤回，患者会即时收到
		</view>
		
		<view class="condition" v-if="selectIndex==0" @click="screen">
			{{templateType.typeName?templateType.typeName:'按分类筛选模版'}}
			<image class="img" src="../../static/icon/icon_arrow_open.png" mode="aspectFill"></image>
		</view>
		<view class="list-box" v-if="selectIndex==0">
			<view class="list-item" v-for="(item,index) in modalList" :key="index">
				<view class="type">
					模板类型：{{item.typeName}}
				</view>
				<view class="content-box">
					<view class="content-tip">
						模板内容：
					</view>
					<view class="content">
						{{item.templateName}}
					</view>
				</view>
				<view class="button-box">
					<view class="left-btn" @click="sendContent(item)">
						发送此内容
					</view>
					<view class="right-btn" @click="copyContent(item)">
						复制模板内容
					</view>
				</view>
			</view>
		</view>
		
		<uni-popup ref="screenPopup" type="bottom">
			<view class="white-background">
				<view class="title-box">
					选择筛选条件
					<view class="">
						<image class="close" src="../../static/icon/close_new.png" mode="aspectFill" @click="closeScreenPopup"></image>
					</view>
					<view class="title"></view>
				</view>
				<view v-for="(item,index) in screenList" :key="index">
					<view class="itemList" @click="selectType(item)">
						<view class="itemContent">{{item.typeName}}</view>
					</view>
					<view class="line" v-show="(index!=screenList.length-1)"></view>
				</view>
		
				<!-- <view class="white-bottom"></view> -->
			</view>
		</uni-popup>
		
		
		<uni-popup ref="contentPop" type="bottom">
			<view class="white-background1">
				<view class="content-title">
					将以下内容发送给患者：
					<image class="content-close" src="../../static/icon/close_new.png" mode="aspectFill" @click="closeContentPop"></image>
				</view>
				<view class="content-detail">
					{{template.templateName}}
				</view>
				<view class="send-btn" @click="send">确定发送</view>
				<view style="height: 40rpx;"></view>
			</view>
		</uni-popup>
		
		<uni-popup ref="sucessPop" type="center">
			<view class="white-background2">
				<image class="sucess-img" src="../../static/icon/submit_sucess_icon.png" mode="aspectFill"></image>
				<view class="sucess-tip">发送成功</view>
				<view class="sucess-btn" @click="finish">完成</view>
				<view style="height: 40rpx;"></view>
			</view>
		</uni-popup>
		
		
		
	</view>
</template>

<script>
	const app = getApp();
	export default {
		data() {
			return {
			   advice:'',
			   uid:'',
			  // adviceId:'',
			   capable:true,
			   selectIndex:0,
			   modalList:[],
			   screenList:[],
			   templateType:'',//选中的条件
			   template:''//当前的模版
			}
		},
		onLoad(props){
		    this.uid = props.id;
			if(localStorage.getItem("uid") !=props.doctor) this.capable = false;
			this.templateTypeList();
			this.templateList();
		},
		methods: {
			selectType(item){
				this.templateType = item;
				this.closeScreenPopup();
				this.templateList();
			},
			//医嘱模板分类列表
			templateTypeList(){
				app.templateTypeList().then(res =>{
					if(res.status == 1){
						this.screenList = res.data;
					}
				});
			},
			//
			templateList(){
				app.templateList({
					typeId:this.templateType.id
				}).then(res =>{
					if(res.status == 1){
						this.modalList = res.data;
					}
				});
			},
			closeScreenPopup(){
				this.$refs.screenPopup.close();
			},
			screen(){
				this.$refs.screenPopup.open();
			},
			sendContent(item){
				this.template = item;
				this.$refs.contentPop.open();
			},
			closeContentPop(){
				this.$refs.contentPop.close();
			},
			copyContent(item){
				this.template = item;
				app.tip('复制成功')
			},
			send(){
				this.closeContentPop();
				app.saveAdvice({advice:this.template.templateName,patientId:this.uid,creatorId:app.getCache('uid')}).then(res =>{
					if(res.status ==1){
						this.$refs.sucessPop.open();
					}
				});
				
			},
			finish(){
				this.$refs.sucessPop.close();
			},
			select(index){
				if(this.selectIndex != index){
					this.selectIndex = index;
				}
			},
			writeAdvice(){
				if(!this.capable){
					app.tip('您不是该患者所属医生');
					return;
				}
				if(!this.advice){
					app.tip('请填写建议');
					return;
				}
				app.saveAdvice({advice:this.advice,patientId:this.uid,creatorId:app.getCache('uid')}).then(res =>{
					if(res.status ==1){
						// app.tip('发送成功');
					 //    uni.navigateBack({
					    	
					 //    });
					 this.$refs.sucessPop.open();
					}
				});
			},
		}
	}
</script>

<style lang="scss">
	page{
		background-color: #F5F6F6;
	}
	.container{
		.condition-box{
			display: flex;
			height: 100rpx;
			line-height: 100rpx;
			padding-left: 30rpx;
			text-align: center;
			.chose{
				color: #333333;
				font-size: 30rpx;
			}
			.unchose{
				color: #999999;
				font-size: 24rpx;
			}
		}
	    .textarea{
			background-color: #fff;
			margin-left: 30rpx;
			//margin-right: 30rpx;
			width: 630rpx;
			margin-top: 20rpx;
			color: #333333;
            font-size: 30rpx;	
			border-radius: 10rpx;
			padding: 30rpx;
			//padding-right: 30rpx;
			
		}
		.placeholder{
			font-size: 28rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
			
		}
		
		.button{
			height: 90rpx;
			line-height: 90rpx;
			background: #52A29E;
			border-radius: 45rpx;
			margin-left: 60rpx;
			margin-right: 60rpx;
			margin-top: 40rpx;
			font-size: 34rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
		}
		.tip{
			font-size: 22rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
			text-align: center;
			margin-top: 30rpx;
		}
		.condition{
			height: 80rpx;
			line-height: 80rpx;
			border-radius: 10rpx;
			border: 2rpx solid #999999;
			background-color: #fff;
			color: #333333;
			padding-left: 15rpx;
			margin-left: 30rpx;
			margin-right: 30rpx;
			font-size: 25rpx;
			position: relative;
			.img{
				position: absolute;
				width: 20rpx;
				height: 10rpx;
				right: 20rpx;
				top: 32rpx;
			}
		}
		.list-box{
			margin-top: 30rpx;
			padding-bottom: 50rpx;
			.list-item{
				background-color: #fff;
				border: 10rpx;
				margin-top: 20rpx;
				font-size: 25rpx;
				margin-left: 30rpx;
				margin-right: 30rpx;
				color: #333333;
				.type{
					padding-left: 20rpx;
					padding-top: 20rpx;
				}
				.content-box{
					padding-top: 20rpx;
					display: flex;
					line-height: 40rpx;
					.content-tip{
						padding-left: 20rpx;
					}
					.content{
						flex: 1;
						padding-right: 30rpx;
					}
				}
				
				.button-box{
					height: 60rpx;
					line-height: 60rpx;
					margin-top: 50rpx;
					display: flex;
					color: #333333;
					font-size: 25rpx;
					padding-left: 132rpx;
					text-align: center;
					padding-bottom: 50rpx;
					.left-btn{
						width: 150rpx;
						border-radius: 10rpx;
						border: 2rpx solid #999999;
					}
					.right-btn{
						width: 200rpx;
						border-radius: 10rpx;
						border: 2rpx solid #999999;
						margin-left: 30rpx;
					}
				}
			}
		}
		
		
		.white-background {
			border-radius: 20rpx 20rpx 0rpx 0rpx;
			//height: 660rpx;
			background-color: #FFFFFF;
		}
		
		.white-bottom {
			height: 200rpx;
			background-color: #FFFFFF;
			margin-top: 10rpx;
		}
		
		.close {
			width: 35rpx;
			height: 35rpx;
		    position: absolute;
			right: 80rpx;
			top: 40rpx;
			
		}
		
		.title-box {
			height: 40rpx;
			line-height: 20rpx;
			padding-top: 50rpx;
		    text-align: center;
			position: relative;
			font-size: 36rpx;
		}
		
		.itemList {
			font-size: 30rpx;
			text-align: center;
			color: #666666;
			height: 106rpx;
		}
		
		.line {
			width: 100%;
			height: 2rpx;
			background-color: #F6F6F6;
		}
		
		.itemContent {
			padding-top: 36rpx;
			height: 34rpx;
			line-height: 34rpx;
		}
		
		.white-background1{
			border-radius: 22rpx 22rpx 0px 0px;
			background-color: #FFFFFF;
		}
		
		.content-title{
			color: #007AFF;
			font-size: 24rpx;
			height: 70rpx;
			line-height: 100rpx;
			padding-left: 30rpx;
			position: relative;
			.content-close{
				position: absolute;
				right: 80rpx;
				top: 35rpx;
				width: 35rpx;
				height: 35rpx;
			}
		}
		.content-detail{
			padding-top: 50rpx;
			padding-left: 30rpx;
			padding-right: 30rpx;
			font-size: 28rpx;
			color: #666666;
			line-height: 45rpx;
		}
		
		.send-btn{
			height: 90rpx;
			line-height: 90rpx;
			background: #52A29E;
			border-radius: 45rpx;
			margin-left: 60rpx;
			margin-right: 60rpx;
			margin-top: 40rpx;
			font-size: 30rpx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #FFFFFF;
			text-align: center;
	
		}
		
		.white-background2{
			border-radius: 20rpx;
			background-color: #FFFFFF;
			width: 500rpx;
			.sucess-img{
				margin-left: 200rpx;
				width: 128rpx;
				height: 145rpx;
				margin-top: 30rpx;
			}
			.sucess-tip{
				text-align: center;
			    color: #333333;
				font-size: 30rpx;
				margin-top: 30rpx;
			}
			.sucess-btn{
				height: 90rpx;
				line-height: 90rpx;
				background: #52A29E;
				border-radius: 45rpx;
				margin-left: 60rpx;
				margin-right: 60rpx;
				margin-top: 40rpx;
				font-size: 30rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				text-align: center;
			}
		}
		
		
	}
</style>
