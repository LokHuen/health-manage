<template>
	<view class="contain">
		
		<!-- <view class="flex phonetab">
			<view class="itemlist" @click="tabClick(0)"><text :class="status==0?'on':''">待解读0</text></view>
			<view class="itemlist" @click="tabClick(1)"><text :class="status==1?'on':''">解读中0</text></view>
			<view class="itemlist" @click="tabClick(2)"><text :class="status==2?'on':''">解读完成0</text></view>
		</view> -->
		
		<view class="list" v-if="listData.length>0" v-for="(item,index) in listData" :key="index">
			<view class="creat-time">
				{{item.createTime}}
			</view>
			<view class="list-box" @click="open(item)">
				<view class="prelative">
					<image class="image" :src="item.portrait" mode="aspectFill"></image>
					<text class="pageredround" v-if="item.patientRead==0"></text>
				</view>
				<view class="content-box">
					<view class="name">{{item.modifier}}</view>
					<view class="content">{{item.title}}</view>
				</view>
				<view class="last-time">{{item.modifyTime}}</view>
			</view>
		</view>
		<view class="no-data-tip" v-if="listData.length==0">
			<image class="no-data-img" :src="imageUrl+'/image/no_data.png'"></image>
			<view>无数据</view>
		</view>
	</view>
</template>

<script>
	var app = getApp();
	export default {
		data() {
			return {
				imageUrl:this.$imageUrl,
				listData: [],
				consultCount:{},
			   
			}
		},
		onShow(){
			this.getListData();
		},
		methods: {
		   open(item){
			if(item.patientRead==0) app.replymessage();
		   	uni.navigateTo({
		   		url:'../chat/index?id='+item.id,
				// 用户聊天跳转pages/chat/index?id=咨询id
		   	});
		   },
		   getListData(){
		   	app.mineChatList({}).then(res=>{
		   		console.log(res)
		   		if(res.status===1){
		   			this.listData = res.data.list;
		   		}
		   		console.log(this.listData)
		   	});
		   },
		}
	}
</script>

<style lang="scss">
	.contain {
	 //    background-color: #F8F8F8;
		// min-height: 100vh;
	}
	.flex {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
	}
	.phonetab {
		width: 100%;
		position:sticky;
		z-index: 999;
		background: #FFFFFF;
		top: 0;
		height: 100rpx;
		.itemlist {
			width: 33%;
			text-align: center;
			text {
				font-size: 32rpx;
				color: #343434;
				border-bottom: 4rpx solid transparent;
				padding-bottom: 10rpx;
			}
	
			.on {
				color: #2894EC;
				border-color: #2894EC;
			}
		}
	}
	.pageredround{
		top: 15rpx;
		right: -8rpx;
	}
	.no-data-tip{
		padding-top: 65px;
		text-align: center;
		font-size: 17px;
		color: #9A9A9A;
	}
	.no-data-img{
		width: 185px;
		height: 120px;
	}
	.list{
		height: 100px;
	}
	.creat-time{
		font-size: 15px;
		height: 20px;
		line-height: 20px;
		margin-left: 15px;
		margin-top: 10px;
	}
	.list-box{
		position: relative;
		display: flex;
		margin-left: 15px;
		margin-top:10px;
		margin-right: 15px;
		height: 60px;
		font-size: 15px;
		background-color: #FFFFFF;
		color: #333333;
		border-radius: 5px;
		box-shadow: 1px 1px 5px #999999;
	}
	.image{
		width: 35px; height: 35px; margin-left: 10px;
		margin-top: 12.5px;
	}
	.content-box{
		margin-left: 7px;
		margin-top: 8px;
		flex: 1;
	}
	.name{
		font-size: 13px;
		margin-top: 1px;
		margin-left: 0px;
	}
	.content{
		font-size: 11px;
		margin-top: 5px;
		margin-left: 0px;
		margin-right: 10rpx;
	}
	.last-time{
		font-size: 11px;
		right: 10px;
		top: 10px;
		position: absolute;
	}
</style>
