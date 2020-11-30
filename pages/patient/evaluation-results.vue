<template>
	<view>
		<view class="listContent">
			<view class="health-list-item" @click="toanswerlist(info.id)">	
				<view class="health-list-item-avatar-content">
					<image class="health-list-item-avatar" src="../../static/icon/cry_icon.png"></image>
				</view>
				<view class="health-list-item-content">
					<view class="health-list-item-title">{{info.result}}</view>
					<view class="health-list-item-detail">
						{{info.phase}}
					</view>
					<view class="health-list-item-time">测评时间：{{info.completeTime}}</view>
					<view class="line" v-if="showDetail"></view>
					<view class="advice-content">
						<rich-text v-show="showDetail" :nodes="info.content" ></rich-text>
					</view>
					
				</view>
                <image class="health-list-item-arrow" :src="showDetail?'../../static/icon/right_arrow_top.png':'../../static/icon/right_arrow.png'" mode="widthFix" @click.stop="onClickItem" v-show="false"></image>
			</view>
		</view>
		
		<view class="button-box">
			<button type="default" class="button" @click="tootherpage">完成</button>
		</view>
	</view>
</template>

<script>
	let app = getApp();
	export default {
		data() {
			return {
				id:1,
				showDetail:true,
				info:{},
			}
		},
		onLoad(options){
			this.id = options.id||1;
			this.getinfo();
		},
		methods:{
			getinfo(){
				app.loading("加载中")
				app.questiongetScore({surveyId:this.id}).then(res=>{
					app.loaded();
					this.info = res.data;
					if(this.info.content) this.info.content=this.info.content.replace(/\<span/gi, '<span class="richtext"');
				})
			},
			onClickItem() {
				this.showDetail = !this.showDetail;
			},
			tootherpage(){
				uni.reLaunch({
					url:app.topageurl?app.topageurl:"/pages/patient/nutritional-self-test",
				})
				if(app.topageurl) app.topageurl = "";
			},
			toanswerlist(id){
				uni.navigateTo({
					url:"/pages/patient/answer?id="+id
				})
			},
		}
	}
	
</script>


<style lang="scss">	
.button-box{
			position: fixed;
			bottom: 0;
			height: 140rpx;
			width: 100%;
			.button{
				height: 90rpx;
				width: 81%;
				background-color: #52A29E !important;
				border-radius: 45rpx;
				color: #FFFFFF;
				font-size: 17px;
			}
		}

	.listContent {
		margin-top: 20rpx;
		margin-left: 50rpx;
		margin-right: 50rpx;
		background-color: #F7F8F8;
		.health-list-item {
			position: relative;
			margin-top: 30rpx;
			display: flex;
			.health-list-item-avatar-content{
				.health-list-item-avatar {
					margin-left: 20rpx;
					margin-top: 40rpx;
					width: 45rpx;
					height: 45rpx;
					border-radius: 50%;
				}
			}
			.health-list-item-content {
				margin-left: 15rpx;
				margin-top: 40rpx;
				padding-bottom: 40rpx;
                width: 100%;
				.health-list-item-title {
					font-size: 30rpx;font-weight:600;
					color: #52A29E;
				}
				
				.health-list-item-detail {
					color: #999999;
					font-size: 26rpx;
					margin-top: 20rpx;
				}
				
				.health-list-item-time {
					color: #666666;
					font-size: 26rpx;
					margin-top: 30rpx;
					padding-bottom: 10rpx;
				}
				.line{
					background-color: #CCCCCC;
					margin-top: 15rpx;
					margin-bottom: 15rpx;
					height: 2rpx;
					margin-right: 20rpx;
				}
				img{max-width: 100%;}
				.advice-content{
                    padding-right: 10px;color: #666666;
				}
			}
			.health-list-item-arrow {
				position: absolute;
				width: 35rpx;
				height: 19rpx;
				right: 20rpx;
				top: 120rpx;
			
			}
		}
	}
</style>
