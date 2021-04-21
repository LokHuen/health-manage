<template>
	<!-- 团队成员 -->
	<view class="container">
		<turnback @back="back" v-if="isMiniProgram"> </turnback>
		<view class="list-box" v-for="(item,index) in list" :key="index">
			<view class="name">{{item.name}}</view>
			<view :class="item.isParent==0?'item-box':'item-box team'" @click="toBusiness(item)">
				个人业务情况
				<image src="../../static/right.png" mode="widthFix" class="right"></image>
			</view>

			<view class="item-box" v-if="item.isParent==1" @click="toTeamBusiness(item)">
				下属团队业务情况
				<image src="../../static/right.png" mode="widthFix" class="right"></image>
			</view>

		</view>

	</view>
</template>

<script>
	const app = getApp();
	import wx from '../../plugins/jweixin.js'
	import turnback from "../../components/turnback.vue"
	
	export default {
		components: {turnback},
		data() {
			return {
				list: [],
				salesId:'',
				isMiniProgram:false
			}
		},
		methods: {
			getMiniProgramStatic(){
			 wx.miniProgram.getEnv((res)=>{
			    this.isMiniProgram = res.miniprogram?true:false;
			 })
			},
			back(){
			  uni.navigateBack({
			   
			  })
			},
			
			getTeamMembers() {
				app.getTeamMembers({
					salesId:this.salesId
					}).then((res) => {
					this.list = res.data
				})
			},
			toBusiness(item) {
				uni.navigateTo({
					url: 'sales-business?salesId=' + item.id+'&salesName='+item.name
				})
			},
			toTeamBusiness(item) {
				uni.navigateTo({
					url: 'team-business?salesId=' + item.id+'&name='+item.name
				})
			}
		},
		onLoad(props) {
			if(props.salesId){
				this.salesId = props.salesId;
			}
			this.getTeamMembers()
			this.getMiniProgramStatic();
		}
	}
</script>

<style lang="scss">
	page {
		background-color: $uni-bg-color-grey;
	}

	.container {
		.list-box {
			margin-top: 20rpx;
			background: #FFFFFF;
			border-radius: 10rpx;
			margin-left: 20rpx;
			margin-right: 20rpx;

			.name {
				font-size: 32rpx;
				font-family: PingFang SC;
				font-weight: 500;
				color: #333333;
				line-height: 38rpx;
				padding-left: 50rpx;
				padding-top: 40rpx;

			}

			.item-box {
				height: 90rpx;
				background: #FFFFFF;
				font-size: 26rpx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #719CAA;
				line-height: 90rpx;
				padding-left: 50rpx;
				position: relative;

				.right {
					position: absolute;
					width: 15rpx;
					right: 38rpx;
					top: 40rpx;
				}

			}

			.team {
				border-bottom: 2rpx solid #EEEEEE;
				;
			}

		}

	}
</style>
