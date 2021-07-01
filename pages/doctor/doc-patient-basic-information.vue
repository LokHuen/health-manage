<template>
	<view>
		
		<view class="condition-box">
			<view :class="type1==0?'item-chose':'item-unchose'" @click="selectType(0)">基础资料</view>
			<view :class="type1==1?'item-chose':'item-unchose'" @click="selectType(1)">病例管理</view>
		</view>
		
		<view v-if="type1==0">
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">姓名</view>
					<view class="health-item-detail">{{infoData.patientName}}</view>
				</view>
			</view>
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">性别</view>
					<view class="health-item-detail">{{infoData.patientGender}}</view>
				</view>
			</view>
			
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">出生日期</view>
					<view class="health-item-detail">{{infoData.birthday}}</view>
				</view>
			</view>
			
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">联系电话</view>
					<view class="health-item-detail">13800138000</view>
				</view>
			</view>
			
			
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">疾病诊断</view>
					<view class="health-item-detail">{{infoData.illness}}</view>
				</view>
			</view>
			
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">所在城市</view>
					<view class="health-item-detail">{{infoData.region}}</view>
				</view>
			</view>
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">身高</view>
					<view class="health-item-detail">{{(infoData.height?infoData.height:'')+'cm'}}</view>
				</view>
			</view>
			
			<view class="health-content">
				<view class="health-item">
					<view class="health-item-title">体重</view>
					<view class="health-item-detail">{{(infoData.weight?infoData.weight:'')+'kg'}}</view>
				</view>
			</view>
			
		</view>
		
		
		<view v-if="type1==1">
			
			<view class="pic-content-box" v-for="(item,index) in list" :key="index" v-if="item.pathologyUrl.length>0">
				<view class="pic-time">{{item.createTime+'添加'}}</view>
				<view class="ccimglist">
					<image v-for="(imgItem,imgIndex) in item.pathologyUrl" :key="imgIndex" :src=imgItem mode="aspectFill" @click="previewImage(item,imgIndex)" :class="(imgIndex%3==0)?'imagelistfirst':'imagelist'"></image>
				</view>
			</view>
			<view class="no-data-tips" v-if="list.length ==0">暂无数据</view>
			<view style="height: 100rpx;"></view>
			
		</view>
		
		


	</view>

</template>

<script>
	const app = getApp();
	export default {
		onShow() {
			this.getInfo();

		},
		data() {
			return {
				infoData:{},
				id:1,
				type1:0,
				list: [],
				pageNo: 1,
				patientId:1
			}
		},
		onLoad(props){
			this.id = props.id ||1;
			this.patientId = props.id||1;
			this.getListData();
		},
		onPullDownRefresh() {
			if(this.type==0)return;
			this.pageNo = 1;
			this.getListData();
		},
		onReachBottom() {
			if(this.type==0)return;
			this.pageNo ++;
			this.getListData();
		},
		methods:{
			getInfo(){
				app.basicInfox({id:this.id}).then(res =>{
					if(res.status==1){
						this.infoData = res.data;
					}
				});
			},
			selectType(type1){
				if(this.type1 != type1){
					this.type1 = type1;
				}
			},
			previewImage(item,imgIndex) {
				uni.previewImage({
					urls:item.pathologyUrl,
					current:imgIndex
				})
			},
					
			getListData(){
				app.patientBlListx({pageNo:this.pageNo,patientId:this.patientId}).then(res =>{
					if(res.status===1){
						if(this.pageNo===1){
							for (var i = 0; i < res.data.list.length; i++) {
								let pathologyUrl = [];
								if(res.data.list[i].pathologyUrl){
									let imgItems = res.data.list[i].pathologyUrl.split(',');
									for(var j=0;j<imgItems.length;j++){
										pathologyUrl.push(app.globalData.baseUrl+imgItems[j]);
									}
									
								}
								res.data.list[i].pathologyUrl = pathologyUrl;
							}
							this.list = res.data.list;
							
						}else{
							if(res.data.pageCount>=this.pageNo){
								for (var i = 0; i < res.data.list.length; i++) {
									let pathologyUrl = [];
									if(res.data.list[i].pathologyUrl){
										let imgItems = res.data.list[i].pathologyUrl.split(',');
										for(var j=0;j<imgItems.length;j++){
											pathologyUrl.push(app.globalData.baseUrl+imgItems[j]);
										}
			
									}
									res.data.list[i].pathologyUrl = pathologyUrl;
								}
								this.list = this.list.concat(res.data.list);
							}
						}
					}
					console.log(this.list);
					uni.stopPullDownRefresh();
				})
			}


		}
	}
</script>

<style lang="scss">
	
	
	
	.add-case-box {
		height: 200rpx;
		position: relative;
	
		.dashed-box {
			text-align: center;
			margin-top: 60rpx;
			margin-left: 85rpx;
			margin-right: 85rpx;
			height: 120rpx;
			line-height: 120rpx;
			border: 2rpx dashed #52A29E;
			color: #52A29E;
		}
	
		.add-bottom {
			position: absolute;
			bottom: 0rpx;
			left: 0rpx;
			right: 0rpx;
			height: 20rpx;
			background-color: #F7F8F8;
		}
	}
	
	.pic-content-box {
		.pic-time {
			font-size: 15px;
			color: #333333;
			padding-top: 40rpx;
			padding-left: 44rpx;
		}
	
		.ccimglist {
			display: flex;
			flex-wrap: wrap;
			// justify-content:space-between;
			margin-left: 44rpx;
			margin-right: 44rpx;
		   
			.imagelistfirst {
				margin-top: 20rpx;
				width: 200rpx;
				height: 200rpx;
				background-color: #999999;
			}
			.imagelist {
				margin-top: 20rpx;
				width: 200rpx;
				height: 200rpx;
				background-color: #999999;
				margin-left: 31rpx;
			}
		}
	
	
	}
	.no-data-tips{
		margin-top: 100rpx;
		text-align: center;
		font-size: 30rpx;
		color: #666666;
	}
	
	.condition-box{
		height: 120rpx;
		display: flex;
	    justify-content:space-between;
		padding-left: 100rpx;
		padding-right: 100rpx;
		.item-chose{
			margin-top: 20rpx;
			width: 250rpx;
			height: 70rpx;
			line-height: 70rpx;
			background-color: #52A29E;
			color: #fff;
			font-size: 26rpx;
			border: 2rpx solid #52A29E;
			border-radius: 10rpx;
			text-align: center;
		}
		.item-unchose{
			margin-top: 20rpx;
			width: 250rpx;
			height: 70rpx;
			line-height: 70rpx;
			color: #999999;
			font-size: 26rpx;
			border: 2rpx solid #999999;
			border-radius: 10rpx;
			text-align: center;
		}
		
	}
	.health-content {
		margin: 0 44rpx;

		.health-item {
			border-bottom: 0.01rem #EEEEEE solid;
			padding-bottom: 0.4rem;
			display: block;
			height: 96rpx;
			text-align: center;

			.health-item-title {
				font-size: 30rpx;
				color: #333333;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				float: left;
			}

			.health-item-detail {
				font-size: 30rpx;
				color: #333333;
				height: 100%;
				display: flex;
				justify-content: center;
				align-items: center;
				float: right;
			}
		}
	}

	.health-update {
		text-align: center;
		position: absolute;
		bottom: 50rpx;
		width: 100%;

		.health-update-button {
			width: 85%;
			height: 90rpx;
			font-size: 34rpx;
			color: white;
			background-color: #52A29E;
			border-radius: 45rpx;
		}
	}
</style>
